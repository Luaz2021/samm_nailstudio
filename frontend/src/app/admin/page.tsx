"use client";

import { useState } from "react";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Phone, 
  User, 
  Search, 
  Filter, 
  DollarSign, 
  Check, 
  X, 
  Trash2, 
  MessageCircle, 
  RefreshCw, 
  Plus, 
  SlidersHorizontal, 
  ChevronRight, 
  TrendingUp, 
  ShieldAlert,
  Sparkles,
  ArrowUpRight,
  Wallet,
  Receipt,
  Sun,
  ShieldCheck,
  CalendarCheck2
} from "lucide-react";

interface AdminBooking {
  id: string;
  code: string;
  clientName: string;
  clientPhone: string;
  service: string;
  extras: string[];
  date: string;
  timeSlot: string; // ej "11:30 - 14:00"
  durationMinutes: number;
  totalPrice: number;
  deposit20: number;
  remaining80: number;
  status: "pre_reserva" | "confirmada" | "cancelada"; // Naranja | Verde | Gris
  paymentMethod: "Yape" | "Plin" | "Transferencia" | "Pendiente";
  receiptNote?: string;
}

const INITIAL_BOOKINGS: AdminBooking[] = [
  {
    id: "b-1",
    code: "PRE-4821",
    clientName: "Valeria Montes",
    clientPhone: "+51 984 123 456",
    service: "Manicura Rusa Anatómica Combinada (2h)",
    extras: ["Retirada de Acrílico Ajeno (+30m)"],
    date: "2026-10-27",
    timeSlot: "11:30 - 14:00",
    durationMinutes: 150,
    totalPrice: 100,
    deposit20: 20,
    remaining80: 80,
    status: "pre_reserva",
    paymentMethod: "Pendiente",
    receiptNote: "Esperando captura de Yape por WhatsApp"
  },
  {
    id: "b-2",
    code: "PRE-8910",
    clientName: "Carla Mendoza",
    clientPhone: "+51 977 456 789",
    service: "Esculpidas en Acrílico Premium con Molde (2h)",
    extras: ["French Micro-Line (+30m)", "Reconstrucción Uña Rota (+30m)"],
    date: "2026-10-27",
    timeSlot: "14:00 - 17:00",
    durationMinutes: 180,
    totalPrice: 170,
    deposit20: 34,
    remaining80: 136,
    status: "pre_reserva",
    paymentMethod: "Pendiente",
    receiptNote: "Preguntó número de Yape titular"
  },
  {
    id: "b-3",
    code: "SN-1044",
    clientName: "Lucía Paredes",
    clientPhone: "+51 912 345 678",
    service: "Esmaltado Semipermanente Summer Glazed (2h)",
    extras: [],
    date: "2026-10-27",
    timeSlot: "09:00 - 11:00",
    durationMinutes: 120,
    totalPrice: 60,
    deposit20: 12,
    remaining80: 48,
    status: "confirmada",
    paymentMethod: "Yape",
    receiptNote: "Yape confirmado op. #839210 (Pasa a Verde)"
  },
  {
    id: "b-4",
    code: "SN-9302",
    clientName: "Elena Barreda",
    clientPhone: "+51 999 888 777",
    service: "Pedicura Clínica Rusa & Esmaltado (2h)",
    extras: ["Nutrición Térmica Argán (+30m)"],
    date: "2026-10-28",
    timeSlot: "16:00 - 18:30",
    durationMinutes: 150,
    totalPrice: 100,
    deposit20: 20,
    remaining80: 80,
    status: "confirmada",
    paymentMethod: "Plin",
    receiptNote: "Plin verificado en cuenta BCP"
  }
];

export default function AdminPage() {
  const [bookings, setBookings] = useState<AdminBooking[]>(INITIAL_BOOKINGS);
  const [filterStatus, setFilterStatus] = useState<string>("todos");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Métricas financieras en Soles
  const totalIncome = bookings
    .filter(b => b.status === "confirmada")
    .reduce((acc, b) => acc + b.totalPrice, 0);

  const totalDeposits = bookings
    .filter(b => b.status === "confirmada")
    .reduce((acc, b) => acc + b.deposit20, 0);

  const pendingPreReservations = bookings.filter(b => b.status === "pre_reserva").length;
  const confirmedCount = bookings.filter(b => b.status === "confirmada").length;

  const handleConfirmYape = (id: string) => {
    setBookings(prev => prev.map(b => {
      if (b.id === id) {
        return {
          ...b,
          status: "confirmada",
          paymentMethod: "Yape",
          receiptNote: "Adelanto 20% verificado en Yape (Casilla Verde asegurada)"
        };
      }
      return b;
    }));
  };

  const handleCancelBooking = (id: string) => {
    setBookings(prev => prev.map(b => {
      if (b.id === id) {
        return { ...b, status: "cancelada", receiptNote: "Liberado por tiempo de espera excedido" };
      }
      return b;
    }));
  };

  const handleCreateMockPreReservation = () => {
    const newId = "b-" + Date.now();
    const newCode = "PRE-" + Math.floor(1000 + Math.random() * 9000);
    const mockItem: AdminBooking = {
      id: newId,
      code: newCode,
      clientName: "Camila Salcedo",
      clientPhone: "+51 945 999 111",
      service: "Nail Art Verano Lima & Glow Solar (2h)",
      extras: ["French Micro-Line (+30m)"],
      date: "2026-10-27",
      timeSlot: "11:30 - 14:00",
      durationMinutes: 150,
      totalPrice: 115,
      deposit20: 23,
      remaining80: 92,
      status: "pre_reserva",
      paymentMethod: "Pendiente",
      receiptNote: "Ingresó desde la web interactiva · Esperando Yape"
    };
    setBookings([mockItem, ...bookings]);
  };

  const filteredBookings = bookings.filter(b => {
    const matchesStatus = filterStatus === "todos" ? true : b.status === filterStatus;
    const matchesSearch = b.clientName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          b.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.clientPhone.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FBF8F6] text-[#231C1A] flex flex-col font-sans">
      
      {/* 1. TOP STATUS BAR CON IDENTIDAD DE MARCA */}
      <div className="bg-[#231C1A] text-white/90 py-2 px-6 text-[11px] tracking-widest uppercase border-b border-[#C8927B]/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-semibold text-[#C8927B]">
              <Sparkles className="w-3.5 h-3.5" /> CABINA DE CONTROL SAMM
            </span>
            <span className="hidden sm:inline-block text-white/60">
              Sincronización en Vivo de Turnos (2 Horas Cerradas)
            </span>
          </div>
          <div className="flex items-center gap-4 text-[10px]">
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Servidor Conectado
            </span>
            <a href="/" className="text-[#C8927B] hover:text-white transition-colors underline font-semibold">
              ← Ir a Web Clienta
            </a>
          </div>
        </div>
      </div>

      {/* 2. HEADER ELEGANTE CON LOGO OFICIAL SVG Y BOTÓN DE SIMULACIÓN */}
      <header className="bg-white/95 backdrop-blur-md border-b border-[#EFE2DC] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 min-h-20 flex flex-col md:flex-row md:items-center justify-between gap-3 py-3">
          
          <div className="flex items-center gap-3">
            <img 
              src="/samm-nailstudio-wordmark.svg" 
              alt="samm. NAIL STUDIO" 
              className="h-9 sm:h-11 w-auto object-contain"
            />
            <div className="border-l border-[#EFE2DC] pl-3">
              <span className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-bold text-[#7A3E48] block">
                ADMINISTRATION DASHBOARD
              </span>
              <span className="text-[11px] sm:text-xs text-[#8d7e78] font-medium block">
                Recepción & Gestión Miraflores
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1 md:pt-0">
            <button
              onClick={handleCreateMockPreReservation}
              className="bg-[#7A3E48] hover:bg-[#5E2F37] text-white text-[11px] sm:text-xs font-semibold px-3.5 py-2 rounded-full transition-all shadow-xs flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5 text-[#C8927B]" /> 
              Simular Pre-Reserva
            </button>
            <a 
              href="/"
              className="bg-[#FBF8F6] hover:bg-[#EFE2DC] text-[#231C1A] text-[11px] sm:text-xs px-3.5 py-2 rounded-full transition-all font-semibold border border-[#EFE2DC]"
            >
              Web Pública
            </a>
          </div>

        </div>
      </header>

      {/* 3. CONTENIDO PRINCIPAL */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full space-y-8">
        
        {/* BANNER INFORMATIVO CON ESTILO EDITORIAL */}
        <div className="bg-gradient-to-r from-[#7A3E48] via-[#8C4A56] to-[#C8927B] text-white p-6 sm:p-8 rounded-3xl shadow-md relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#EFE2DC] font-bold block mb-1">
              Flujo Operativo de Cabina
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
              Control de Casillas & Anticipos en Tiempo Real
            </h2>
            <p className="text-xs text-white/90 leading-relaxed mt-2">
              Cuando una clienta solicita su cita en la web, el sistema bloquea <strong>2 horas completas</strong> en color naranja de pre-reserva. Al verificar su captura de <strong>Yape o Plin del 20%</strong>, apruebas la cita para que pase a verde permanente.
            </p>
          </div>
          <div className="absolute right-0 bottom-0 translate-x-8 translate-y-8 opacity-15 pointer-events-none">
            <CalendarCheck2 className="w-64 h-64 text-white" />
          </div>
        </div>

        {/* 4. TARJETAS DE MÉTRICAS EJECUTIVAS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Pre-Reservas Naranja */}
          <div className="bg-white p-6 rounded-2xl border border-[#EFE2DC] shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider font-bold text-amber-700 block">
                Pre-Reservas (Naranja)
              </span>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <AlertCircle className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <span className="font-serif text-3xl font-bold text-[#231C1A] block">
                {pendingPreReservations}
              </span>
              <span className="text-[11px] text-[#8d7e78] mt-0.5 block">
                Esperando comprobante de Yape
              </span>
            </div>
            <div className="w-full bg-amber-100 h-1 rounded-full mt-4 overflow-hidden">
              <div className="bg-amber-500 h-full w-2/3 animate-pulse"></div>
            </div>
          </div>

          {/* Confirmadas Verde */}
          <div className="bg-white p-6 rounded-2xl border border-[#EFE2DC] shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-700 block">
                Citas Confirmadas (Verde)
              </span>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <span className="font-serif text-3xl font-bold text-[#231C1A] block">
                {confirmedCount}
              </span>
              <span className="text-[11px] text-[#8d7e78] mt-0.5 block">
                20% de anticipo pagado y validado
              </span>
            </div>
            <div className="w-full bg-emerald-100 h-1 rounded-full mt-4 overflow-hidden">
              <div className="bg-emerald-600 h-full w-full"></div>
            </div>
          </div>

          {/* Anticipos 20% Yape */}
          <div className="bg-white p-6 rounded-2xl border border-[#EFE2DC] shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider font-bold text-[#C8927B] block">
                Anticipos en Cuenta (20%)
              </span>
              <div className="w-10 h-10 rounded-xl bg-[#C8927B]/15 text-[#C8927B] flex items-center justify-center">
                <Wallet className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <span className="font-serif text-3xl font-bold text-[#7A3E48] block">
                S/ {totalDeposits}
              </span>
              <span className="text-[11px] text-[#8d7e78] mt-0.5 block">
                Recaudado vía Yape / Plin
              </span>
            </div>
            <div className="w-full bg-[#EFE2DC] h-1 rounded-full mt-4 overflow-hidden">
              <div className="bg-[#C8927B] h-full w-4/5"></div>
            </div>
          </div>

          {/* Facturación Total de Cabina */}
          <div className="bg-white p-6 rounded-2xl border border-[#EFE2DC] shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider font-bold text-[#231C1A] block">
                Facturación Citas (100%)
              </span>
              <div className="w-10 h-10 rounded-xl bg-[#231C1A]/10 text-[#231C1A] flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <span className="font-serif text-3xl font-bold text-[#231C1A] block">
                S/ {totalIncome}
              </span>
              <span className="text-[11px] text-[#8d7e78] mt-0.5 block">
                Total estimado al cobrar en cabina
              </span>
            </div>
            <div className="w-full bg-black/10 h-1 rounded-full mt-4 overflow-hidden">
              <div className="bg-[#231C1A] h-full w-full"></div>
            </div>
          </div>

        </div>

        {/* 5. BARRA DE FILTROS & BUSCADOR */}
        <div className="bg-white p-5 rounded-2xl border border-[#EFE2DC] shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {[
              { id: "todos", label: "Todas las Citas" },
              { id: "pre_reserva", label: "🟠 Pre-Reservas (Por Aprobar)" },
              { id: "confirmada", label: "🟢 Confirmadas (Verde)" },
              { id: "cancelada", label: "⚪ Canceladas" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterStatus(tab.id)}
                className={`text-xs font-semibold px-4 py-2.5 rounded-full border transition-all ${
                  filterStatus === tab.id 
                    ? "bg-[#7A3E48] text-white border-[#7A3E48] shadow-xs" 
                    : "bg-[#FBF8F6] text-[#5a4f4b] border-[#EFE2DC] hover:border-[#C8927B]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#8d7e78] absolute left-3.5 top-3" />
            <input 
              type="text"
              placeholder="Buscar por clienta, teléfono o código..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-[#FBF8F6] border border-[#EFE2DC] rounded-xl focus:outline-none focus:border-[#C8927B] text-[#231C1A]"
            />
          </div>

        </div>

        {/* 6. LISTADO DE CITAS Y APROBACIÓN DE YAPE */}
        <div className="bg-white rounded-3xl border border-[#EFE2DC] shadow-xs overflow-hidden">
          
          <div className="px-6 py-4 border-b border-[#EFE2DC] flex items-center justify-between bg-[#FBF8F6]">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#231C1A]">
                Gestión de Turnos y Validación de Anticipos
              </h3>
              <p className="text-[11px] text-[#8d7e78]">
                Aprueba el 20% para asegurar la casilla en la agenda de Sam
              </p>
            </div>
            <span className="text-xs font-semibold text-[#7A3E48] bg-[#EFE2DC] px-3 py-1 rounded-full">
              {filteredBookings.length} citas registradas
            </span>
          </div>

          <div className="divide-y divide-[#EFE2DC]">
            {filteredBookings.length === 0 ? (
              <div className="p-12 text-center text-xs text-[#8d7e78]">
                No se encontraron citas con ese criterio de búsqueda.
              </div>
            ) : (
              filteredBookings.map(booking => {
                const isPending = booking.status === "pre_reserva";
                const isConfirmed = booking.status === "confirmada";
                const isCancelled = booking.status === "cancelada";

                return (
                  <div key={booking.id} className="p-6 transition-colors hover:bg-[#FBF8F6]/80 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                    
                    {/* Columna Izquierda: Información de la clienta y servicio */}
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-mono text-xs font-bold text-[#7A3E48] bg-[#EFE2DC] px-2.5 py-0.5 rounded-lg border border-[#C8927B]/30">
                          #{booking.code}
                        </span>

                        <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full flex items-center gap-1.5 ${
                          isPending 
                            ? "bg-amber-50 text-amber-800 border border-amber-300" 
                            : isConfirmed 
                              ? "bg-emerald-50 text-emerald-800 border border-emerald-300" 
                              : "bg-gray-100 text-gray-600 border border-gray-300"
                        }`}>
                          <span className={`w-2 h-2 rounded-full ${
                            isPending ? "bg-amber-500 animate-pulse" : isConfirmed ? "bg-emerald-600" : "bg-gray-400"
                          }`}></span>
                          {isPending ? "Pre-Reserva (Pendiente Yape)" : isConfirmed ? "Confirmada (Verde)" : "Cancelada"}
                        </span>

                        <span className="text-xs text-[#8d7e78] flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#C8927B]" />
                          {booking.date} · {booking.timeSlot} ({booking.durationMinutes} min totales)
                        </span>
                      </div>

                      <h4 className="font-serif text-2xl font-bold text-[#231C1A]">
                        {booking.clientName}
                      </h4>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-[#5a4f4b]">
                        <span className="flex items-center gap-1 font-semibold text-[#7A3E48]">
                          <Phone className="w-3.5 h-3.5 text-[#C8927B]" /> {booking.clientPhone}
                        </span>
                        <span>
                          <strong>Servicio:</strong> {booking.service}
                        </span>
                        {booking.extras.length > 0 && (
                          <span className="text-[#8d7e78]">
                            <strong>Extras:</strong> {booking.extras.join(", ")}
                          </span>
                        )}
                      </div>

                      {booking.receiptNote && (
                        <p className="text-[11px] text-[#7A3E48] italic bg-[#FBF8F6] px-3 py-1.5 rounded-lg border border-[#EFE2DC] inline-block">
                          💬 {booking.receiptNote}
                        </p>
                      )}
                    </div>

                    {/* Columna Central: Desglose en Soles */}
                    <div className="text-left lg:text-right shrink-0 space-y-1 bg-[#FBF8F6] lg:bg-transparent p-4 lg:p-0 rounded-2xl border lg:border-0 border-[#EFE2DC] w-full lg:w-auto">
                      <div className="text-xs text-[#8d7e78]">
                        Total Servicio: <span className="font-serif text-xl font-bold text-[#231C1A]">S/ {booking.totalPrice}</span>
                      </div>
                      <div className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 inline-block">
                        Adelanto 20%: S/ {booking.deposit20}
                      </div>
                      <div className="text-[11px] text-[#8d7e78] block">
                        Saldo en Cabina (80%): <strong>S/ {booking.remaining80}</strong>
                      </div>
                    </div>

                    {/* Columna Derecha: Acciones Rápidas */}
                    <div className="flex flex-wrap items-center gap-2.5 shrink-0 w-full lg:w-auto justify-end">
                      {isPending && (
                        <>
                          <button
                            onClick={() => handleConfirmYape(booking.id)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-full transition-all shadow-sm flex items-center gap-1.5"
                          >
                            <Check className="w-4 h-4 stroke-[3]" />
                            Aprobar Yape (Pasar a Verde)
                          </button>
                          
                          <a
                            href={`https://api.whatsapp.com/send?phone=${booking.clientPhone.replace(/\D/g, '')}&text=Hola%20${encodeURIComponent(booking.clientName)},%20te%20saludamos%20de%20samm.%20NAIL%20STUDIO%20Lima.%20Vemos%20tu%20pre-reserva%20%23${booking.code}%20para%20el%20${booking.date}.%20¿Llegaste%20a%20realizar%20el%20Yape%20del%2020%25%20(S/%20${booking.deposit20})?`}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold px-4 py-2.5 rounded-full transition-colors flex items-center gap-1.5 shadow-sm"
                          >
                            <MessageCircle className="w-4 h-4" />
                            WhatsApp
                          </a>

                          <button
                            onClick={() => handleCancelBooking(booking.id)}
                            className="text-xs text-rose-600 hover:bg-rose-50 p-2.5 rounded-full border border-rose-200 transition-colors"
                            title="Liberar casilla"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      )}

                      {isConfirmed && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3.5 py-2 rounded-full flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Casilla Confirmada
                          </span>
                          <button
                            onClick={() => handleCancelBooking(booking.id)}
                            className="text-xs text-[#8d7e78] hover:text-rose-600 p-2"
                            title="Liberar turno"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}

                      {isCancelled && (
                        <span className="text-xs text-gray-500 bg-gray-100 px-3.5 py-1.5 rounded-full">
                          Turno Cancelado
                        </span>
                      )}
                    </div>

                  </div>
                );
              })
            )}
          </div>

        </div>

      </main>

    </div>
  );
}
