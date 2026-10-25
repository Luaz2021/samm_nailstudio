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
  ShieldAlert
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
    service: "Manicura Rusa Anatómica",
    extras: ["Retirada de Acrílico Ajeno (+30m)"],
    date: "2026-10-27",
    timeSlot: "11:30 - 14:00",
    durationMinutes: 150,
    totalPrice: 48,
    deposit20: 9.6,
    status: "pre_reserva", // Naranja
    paymentMethod: "Pendiente",
    receiptNote: "Esperando captura de Yape por WhatsApp"
  },
  {
    id: "b-2",
    code: "PRE-8910",
    clientName: "Carla Mendoza",
    clientPhone: "+51 977 456 789",
    service: "Nail Art Amber & Cromo Glazed",
    extras: ["French Micro-Line (+30m)", "Reconstrucción Uña Rota (+30m)"],
    date: "2026-10-27",
    timeSlot: "14:00 - 17:00",
    durationMinutes: 180,
    totalPrice: 59,
    deposit20: 11.8,
    status: "pre_reserva", // Naranja
    paymentMethod: "Pendiente",
    receiptNote: "Preguntó número de Yape"
  },
  {
    id: "b-3",
    code: "SN-1044",
    clientName: "Lucía Paredes",
    clientPhone: "+51 912 345 678",
    service: "Semipermanente Nude & Clean",
    extras: [],
    date: "2026-10-27",
    timeSlot: "09:00 - 11:00",
    durationMinutes: 120,
    totalPrice: 28,
    deposit20: 5.6,
    status: "confirmada", // Verde
    paymentMethod: "Yape",
    receiptNote: "Yape confirmado operacion #83921"
  },
  {
    id: "b-4",
    code: "SN-9302",
    clientName: "Elena Barreda",
    clientPhone: "+51 999 888 777",
    service: "Pedicura Spa Jelly Relax",
    extras: ["Masaje Térmico con Vela (+30m)"],
    date: "2026-10-28",
    timeSlot: "16:00 - 18:30",
    durationMinutes: 150,
    totalPrice: 51,
    deposit20: 10.2,
    status: "confirmada", // Verde
    paymentMethod: "Plin",
    receiptNote: "Plin verificado"
  }
];

export default function AdminPage() {
  const [bookings, setBookings] = useState<AdminBooking[]>(INITIAL_BOOKINGS);
  const [filterStatus, setFilterStatus] = useState<string>("todos");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedDateFilter, setSelectedDateFilter] = useState<string>("2026-10-27");

  // Métricas rápidas
  const totalIncome = bookings
    .filter(b => b.status === "confirmada")
    .reduce((acc, b) => acc + b.totalPrice, 0);

  const totalDeposits = bookings
    .filter(b => b.status === "confirmada")
    .reduce((acc, b) => acc + b.deposit20, 0);

  const pendingPreReservations = bookings.filter(b => b.status === "pre_reserva").length;

  // Acciones de administración
  const handleConfirmYape = (id: string) => {
    setBookings(prev => prev.map(b => {
      if (b.id === id) {
        return {
          ...b,
          status: "confirmada",
          paymentMethod: "Yape",
          receiptNote: "Adelanto 20% verificado en Yape (Pasa a Verde)"
        };
      }
      return b;
    }));
  };

  const handleCancelBooking = (id: string) => {
    setBookings(prev => prev.map(b => {
      if (b.id === id) {
        return { ...b, status: "cancelada", receiptNote: "Liberado por falta de pago" };
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
      service: "Manicura Rusa Anatómica",
      extras: ["Nail Art Personalizado (+30m)"],
      date: selectedDateFilter,
      timeSlot: "10:00 - 12:30",
      durationMinutes: 150,
      totalPrice: 47,
      deposit20: 9.4,
      status: "pre_reserva",
      paymentMethod: "Pendiente",
      receiptNote: "Ingresó desde la web interactiva"
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
    <div className="min-h-screen bg-[#FDFBF7] text-[#3B332C] flex flex-col font-sans">
      
      {/* HEADER PANEL DE CONTROL */}
      <header className="bg-[#5C5046] text-white py-4 px-6 border-b border-black/15 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#AB9677] text-white flex items-center justify-center font-serif text-xl font-bold shadow-xs">
              S
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-xl tracking-wider font-bold">SAMM NAIL STUDIO</span>
                <span className="bg-[#AB9677] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                  Admin Cabina
                </span>
              </div>
              <span className="text-xs text-[#E0D5C1] tracking-wide block">
                Panel de Gestión de Pre-Reservas & Yape en Tiempo Real
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCreateMockPreReservation}
              className="bg-[#AB9677] hover:bg-[#978163] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Simular Llegada de Pre-Reserva Web
            </button>
            <a 
              href="/"
              className="bg-white/10 hover:bg-white/20 text-white text-xs px-3.5 py-2 rounded-xl transition-colors font-medium border border-white/20"
            >
              Ver Web Cliente
            </a>
          </div>
        </div>
      </header>

      {/* CUERPO DEL PANEL */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full space-y-8">
        
        {/* 1. TARJETAS DE MÉTRICAS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <div className="bg-white p-5 rounded-2xl border border-[#EAE6DF] shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-wider font-bold text-orange-600 block">
                Pre-Reservas en Naranja
              </span>
              <span className="font-serif text-3xl font-bold text-[#3B332C] mt-1 block">
                {pendingPreReservations}
              </span>
              <span className="text-[11px] text-[#8A8177]">Esperando comprobante Yape</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
              <AlertCircle className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#EAE6DF] shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-700 block">
                Citas Confirmadas en Verde
              </span>
              <span className="font-serif text-3xl font-bold text-[#3B332C] mt-1 block">
                {bookings.filter(b => b.status === "confirmada").length}
              </span>
              <span className="text-[11px] text-[#8A8177]">Adelanto 20% verificado</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#EAE6DF] shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-wider font-bold text-[#AB9677] block">
                Adelantos Recibidos (20%)
              </span>
              <span className="font-serif text-3xl font-bold text-[#3B332C] mt-1 block">
                {totalDeposits.toFixed(1)}€
              </span>
              <span className="text-[11px] text-[#8A8177]">o S/. {(totalDeposits * 4).toFixed(0)} en cuenta</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#AB9677]/15 text-[#AB9677] flex items-center justify-center font-bold">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#EAE6DF] shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-wider font-bold text-[#5C5046] block">
                Facturación Estimada Total
              </span>
              <span className="font-serif text-3xl font-bold text-[#3B332C] mt-1 block">
                {totalIncome}€
              </span>
              <span className="text-[11px] text-[#8A8177]">Citas cerradas en cabina</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#5C5046]/10 text-[#5C5046] flex items-center justify-center font-bold">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>

        </div>

        {/* 2. BARRA DE FILTROS Y BÚSQUEDA */}
        <div className="bg-white p-5 rounded-2xl border border-[#EAE6DF] shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Selector de Estado */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {[
              { id: "todos", label: "Todas las Citas" },
              { id: "pre_reserva", label: "🟠 Pre-Reservas (Naranja)" },
              { id: "confirmada", label: "🟢 Confirmadas (Verde)" },
              { id: "cancelada", label: "⚪ Canceladas / Liberadas" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterStatus(tab.id)}
                className={`text-xs font-semibold px-4 py-2 rounded-xl border transition-all ${
                  filterStatus === tab.id 
                    ? "bg-[#5C5046] text-white border-[#5C5046]" 
                    : "bg-[#FAF7F2] text-[#55504A] border-[#EAE6DF] hover:border-[#AB9677]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Campo de Búsqueda */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-black/40 absolute left-3.5 top-3" />
            <input 
              type="text"
              placeholder="Buscar por clienta, teléfono o código..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF7F2] border border-[#D1D5DB] rounded-xl focus:outline-none focus:border-[#AB9677]"
            />
          </div>

        </div>

        {/* 3. LISTADO Y GESTIÓN DE CITAS */}
        <div className="bg-white rounded-2xl border border-[#EAE6DF] shadow-xs overflow-hidden">
          <div className="px-6 py-4 border-b border-[#EAE6DF] flex items-center justify-between bg-[#FAF8F5]">
            <h3 className="font-serif text-lg font-bold text-[#3B332C]">
              Listado de Turnos y Validación de Anticipos
            </h3>
            <span className="text-xs text-[#8A8177]">
              Mostrando {filteredBookings.length} registros
            </span>
          </div>

          <div className="divide-y divide-[#EAE6DF]">
            {filteredBookings.length === 0 ? (
              <div className="p-12 text-center text-xs text-[#8A8177]">
                No se encontraron citas con ese criterio de búsqueda.
              </div>
            ) : (
              filteredBookings.map(booking => {
                const isPending = booking.status === "pre_reserva";
                const isConfirmed = booking.status === "confirmada";
                const isCancelled = booking.status === "cancelada";

                return (
                  <div key={booking.id} className="p-6 transition-colors hover:bg-[#FAF8F5]/60 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                    
                    {/* Datos de la Cita */}
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-mono text-xs font-bold text-[#AB9677] bg-[#FAF7F2] px-2.5 py-0.5 rounded border border-[#EAE6DF]">
                          #{booking.code}
                        </span>

                        <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full flex items-center gap-1.5 ${
                          isPending 
                            ? "bg-orange-100 text-orange-800 border border-orange-300" 
                            : isConfirmed 
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-300" 
                              : "bg-gray-100 text-gray-600 border border-gray-300"
                        }`}>
                          <span className={`w-2 h-2 rounded-full ${
                            isPending ? "bg-orange-500 animate-pulse" : isConfirmed ? "bg-emerald-600" : "bg-gray-400"
                          }`}></span>
                          {isPending ? "Pre-Reserva (Naranja)" : isConfirmed ? "Confirmada (Verde)" : "Cancelada"}
                        </span>

                        <span className="text-xs text-[#8A8177]">
                          📅 {booking.date} · ⏰ {booking.timeSlot} ({booking.durationMinutes} min)
                        </span>
                      </div>

                      <h4 className="font-serif text-xl font-bold text-[#3B332C]">
                        {booking.clientName}
                      </h4>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-[#666059]">
                        <span className="flex items-center gap-1 font-medium">
                          <Phone className="w-3.5 h-3.5 text-[#AB9677]" /> {booking.clientPhone}
                        </span>
                        <span>
                          <strong>Servicio:</strong> {booking.service}
                        </span>
                        {booking.extras.length > 0 && (
                          <span className="text-black/60">
                            <strong>Extras:</strong> {booking.extras.join(", ")}
                          </span>
                        )}
                      </div>

                      {booking.receiptNote && (
                        <p className="text-[11px] text-[#8A8177] italic pt-1">
                          Nota: {booking.receiptNote}
                        </p>
                      )}
                    </div>

                    {/* Precios e Importes */}
                    <div className="text-left lg:text-right shrink-0 space-y-1 bg-[#FAF7F2] lg:bg-transparent p-4 lg:p-0 rounded-xl border lg:border-0 border-[#EAE6DF] w-full lg:w-auto">
                      <div className="text-xs text-[#8A8177]">
                        Total: <span className="font-serif text-lg font-bold text-[#3B332C]">{booking.totalPrice}€</span>
                      </div>
                      <div className="text-xs font-bold text-orange-800">
                        Adelanto 20%: {booking.deposit20}€ (S/. {Math.round(booking.deposit20 * 4)})
                      </div>
                      <div className="text-[11px] text-[#8A8177]">
                        Método: <strong>{booking.paymentMethod}</strong>
                      </div>
                    </div>

                    {/* Botones de Acción */}
                    <div className="flex flex-wrap items-center gap-2.5 shrink-0 w-full lg:w-auto justify-end">
                      {isPending && (
                        <>
                          <button
                            onClick={() => handleConfirmYape(booking.id)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
                          >
                            <Check className="w-4 h-4 stroke-[3]" />
                            Aprobar Yape (Pasar a Verde)
                          </button>
                          
                          <a
                            href={`https://api.whatsapp.com/send?phone=${booking.clientPhone.replace(/\D/g, '')}&text=Hola%20${encodeURIComponent(booking.clientName)},%20te%20saludamos%20de%20Samm%20Nail%20Studio.%20Vemos%20tu%20pre-reserva%20%23${booking.code}%20para%20el%20${booking.date}.%20¿Llegaste%20a%20realizar%20el%20Yape%20del%2020%25%20(${booking.deposit20}€)?`}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold px-3.5 py-2.5 rounded-xl transition-colors flex items-center gap-1.5"
                          >
                            <MessageCircle className="w-4 h-4" />
                            WhatsApp
                          </a>

                          <button
                            onClick={() => handleCancelBooking(booking.id)}
                            className="text-xs text-red-600 hover:bg-red-50 p-2.5 rounded-xl border border-red-200 transition-colors"
                            title="Liberar casilla"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      )}

                      {isConfirmed && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Cita Asegurada
                          </span>
                          <button
                            onClick={() => handleCancelBooking(booking.id)}
                            className="text-xs text-[#8A8177] hover:text-red-600 p-2"
                            title="Anular"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}

                      {isCancelled && (
                        <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-xl">
                          Casilla Liberada
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
