"use client";

import { useState, useMemo } from "react";
import { 
  Sparkles, 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  Award,
  Leaf,
  Check,
  Eye,
  User, 
  Phone,
  MessageCircle,
  ShieldCheck,
  Info,
  X
} from "lucide-react";

// Tipos
interface ServiceItem {
  id: string;
  name: string;
  category: "manicura" | "pedicura" | "nailart" | "tratamientos";
  price: number;
  duration: number; // minutos base (120 min = 2 hrs estándar cerrado)
  desc: string;
  tag?: string;
  imgUrl: string;
}

interface ExtraItem {
  id: string;
  name: string;
  price: number;
  duration: number; // 30 min cada bloque de extra/limpieza
  desc: string;
}

interface PreReservation {
  id: string;
  code: string;
  clientName: string;
  clientPhone: string;
  service: string;
  extras: string[];
  date: string;
  startTime: string;
  endTime: string;
  totalDuration: number;
  totalPrice: number;
  advanceDeposit: number; // 20%
  remainingBalance: number; // 80%
  status: "disponible" | "pre_reserva" | "confirmada"; // blanco | naranja | verde
  createdAt: string;
}

// Catálogo de Servicios con fotos referenciales en cada tarjeta
const SERVICES: ServiceItem[] = [
  {
    id: "mani-rusa",
    name: "Manicura Rusa Anatómica",
    category: "manicura",
    price: 38,
    duration: 120, // 2 horas cerrado
    desc: "Limpieza anatómica milimétrica con torno, retiro impecable de cutícula y esmaltado nivelado de alta precisión.",
    tag: "Top Ventas",
    imgUrl: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "mani-semi",
    name: "Semipermanente Nude & Clean",
    category: "manicura",
    price: 28,
    duration: 120,
    desc: "Limado armónico, base rubber de refuerzo y esmalte 20-Free con acabado cerámico duradero (21+ días).",
    tag: "Clásico",
    imgUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "nailart-glazed",
    name: "Nail Art Glazed & Cromo Editorial",
    category: "nailart",
    price: 46,
    duration: 120,
    desc: "Efecto Hailey Bieber nacarado, polvo de hadas, trazos micro-franceses o acentos minimalistas a mano alzada.",
    tag: "Tendencia",
    imgUrl: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "pedi-spa",
    name: "Pedicura Spa Jelly Hidratante",
    category: "pedicura",
    price: 42,
    duration: 120,
    desc: "Inmersión exfoliante en gelatina de aromas naturales, tratamiento de talones secos y esmaltado impecable.",
    tag: "Wellness",
    imgUrl: "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "soft-gel",
    name: "Extensiones Soft Gel / Press-On",
    category: "manicura",
    price: 54,
    duration: 120,
    desc: "Alargamiento con cápsulas orgánicas de gel flexible que no liman ni erosionan la uña natural.",
    tag: "Largo Pro",
    imgUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "trata-ibx",
    name: "Tratamiento Reparador Molecular IBX",
    category: "tratamientos",
    price: 24,
    duration: 120,
    desc: "Penetración profunda en la queratina para rescatar uñas delgadas, abiertas en capas o quebradizas.",
    tag: "Clínico",
    imgUrl: "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=700&q=80"
  }
];

// Extras dinámicos (añaden media hora para limpieza técnica y aplicación)
const EXTRAS: ExtraItem[] = [
  { 
    id: "retirada-previa", 
    name: "Retirada de Acrílico o Gel de Otro Salón", 
    price: 10, 
    duration: 30, 
    desc: "Retiro sin torno invasivo + desinfección preventiva." 
  },
  { 
    id: "french-micro", 
    name: "French Micro-Line en las 10 uñas", 
    price: 8, 
    duration: 30, 
    desc: "Trazado milimétrico ultra-fino a pincel." 
  },
  { 
    id: "reparacion-una", 
    name: "Reconstrucción de Uña Rota (Fibra / Gel)", 
    price: 5, 
    duration: 30, 
    desc: "Reparación sin tener que cortar el resto de uñas." 
  },
  { 
    id: "nailart-mano", 
    name: "Nail Art Complejo a Mano Alzada", 
    price: 12, 
    duration: 30, 
    desc: "Diseños botánicos, degradados cromados o pedrería fina." 
  }
];

// Semana completa de Lunes a Lunes
const FULL_WEEK = [
  { day: "Lunes", dateNum: "26", month: "Oct", fullDate: "2026-10-26" },
  { day: "Martes", dateNum: "27", month: "Oct", fullDate: "2026-10-27" },
  { day: "Miércoles", dateNum: "28", month: "Oct", fullDate: "2026-10-28" },
  { day: "Jueves", dateNum: "29", month: "Oct", fullDate: "2026-10-29" },
  { day: "Viernes", dateNum: "30", month: "Oct", fullDate: "2026-10-30" },
  { day: "Sábado", dateNum: "31", month: "Oct", fullDate: "2026-10-31" },
  { day: "Domingo", dateNum: "01", month: "Nov", fullDate: "2026-11-01" },
  { day: "Lunes", dateNum: "02", month: "Nov", fullDate: "2026-11-02" },
];

// Franjas de 9:00 am a 6:00 pm (intervalos de 30 minutos para acomodar horas enteras y medias horas de extras)
const ALL_SLOTS = [
  "09:00", "09:30",
  "10:00", "10:30",
  "11:00", "11:30",
  "12:00", "12:30",
  "13:00", "13:30",
  "14:00", "14:30",
  "15:00", "15:30",
  "16:00", "16:30",
  "17:00", "17:30",
  "18:00"
];

// Simulación de estados en la Base de Datos:
// status: "disponible" (blanco) | "pre_reserva" (naranja) | "confirmada" (verde)
const INITIAL_DB_SCHEDULE: Record<string, { time: string; status: "pre_reserva" | "confirmada"; client: string }[]> = {
  "2026-10-27": [
    { time: "09:00", status: "confirmada", client: "Lucía P. (Pagado 20%)" },
    { time: "09:30", status: "confirmada", client: "Lucía P." },
    { time: "10:00", status: "confirmada", client: "Lucía P." },
    { time: "10:30", status: "confirmada", client: "Lucía P." },
    { time: "11:00", status: "confirmada", client: "Limpieza / Cabina" },
    { time: "14:00", status: "pre_reserva", client: "Carla M. (Pendiente Yape)" },
    { time: "14:30", status: "pre_reserva", client: "Carla M." },
    { time: "15:00", status: "pre_reserva", client: "Carla M." },
    { time: "15:30", status: "pre_reserva", client: "Carla M." },
  ],
  "2026-10-28": [
    { time: "11:00", status: "pre_reserva", client: "Sofi R. (Esperando adelanto)" },
    { time: "11:30", status: "pre_reserva", client: "Sofi R." },
    { time: "12:00", status: "pre_reserva", client: "Sofi R." },
    { time: "12:30", status: "pre_reserva", client: "Sofi R." },
  ],
  "2026-10-29": [
    { time: "16:00", status: "confirmada", client: "Elena B. (Pagado)" },
    { time: "16:30", status: "confirmada", client: "Elena B." },
    { time: "17:00", status: "confirmada", client: "Elena B." },
    { time: "17:30", status: "confirmada", client: "Elena B." },
    { time: "18:00", status: "confirmada", client: "Elena B. (Extra)" },
  ]
};

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"salon" | "reserva" | "iframe-hello">("reserva");

  // Selección de servicio y extras
  const [selectedService, setSelectedService] = useState<ServiceItem>(SERVICES[0]);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  
  // Selección de agenda
  const [selectedDate, setSelectedDate] = useState<string>("2026-10-27");
  const [selectedStartTime, setSelectedStartTime] = useState<string>("12:00");

  // Datos cliente
  const [clientName, setClientName] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");

  // Base de datos local de citas activas
  const [dbSchedule, setDbSchedule] = useState(INITIAL_DB_SCHEDULE);
  const [activePreReservation, setActivePreReservation] = useState<PreReservation | null>(null);

  // Cálculos dinámicos
  const totalDurationMinutes = useMemo(() => {
    const base = selectedService.duration; // 120 min
    const extrasDuration = selectedExtras.reduce((acc, id) => {
      const ex = EXTRAS.find(e => e.id === id);
      return acc + (ex ? ex.duration : 0);
    }, 0);
    return base + extrasDuration;
  }, [selectedService, selectedExtras]);

  const totalDurationHours = useMemo(() => {
    const hrs = Math.floor(totalDurationMinutes / 60);
    const mins = totalDurationMinutes % 60;
    if (mins === 0) return `${hrs} horas cerradas`;
    return `${hrs} h ${mins} min (con tiempo de limpieza y extras)`;
  }, [totalDurationMinutes]);

  const totalPrice = useMemo(() => {
    const base = selectedService.price;
    const extrasPrice = selectedExtras.reduce((acc, id) => {
      const ex = EXTRAS.find(e => e.id === id);
      return acc + (ex ? ex.price : 0);
    }, 0);
    return base + extrasPrice;
  }, [selectedService, selectedExtras]);

  // Regla del 20% de anticipo para confirmar
  const advanceDeposit = useMemo(() => {
    return Math.round(totalPrice * 0.20 * 10) / 10;
  }, [totalPrice]);

  const remainingBalance = useMemo(() => {
    return Math.round((totalPrice - advanceDeposit) * 10) / 10;
  }, [totalPrice, advanceDeposit]);

  // Cálculo de hora de fin aproximada
  const calculatedEndTime = useMemo(() => {
    const [h, m] = selectedStartTime.split(":").map(Number);
    const startMinutes = h * 60 + m;
    const endMinutes = startMinutes + totalDurationMinutes;
    const endH = Math.floor(endMinutes / 60);
    const endM = endMinutes % 60;
    return `${String(endH).padStart(2, "0")}:${String(endM).padStart(2, "0")}`;
  }, [selectedStartTime, totalDurationMinutes]);

  // Alternar extras
  const toggleExtra = (id: string) => {
    setSelectedExtras(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Helper de estado de casilla
  const getSlotStatus = (date: string, time: string): "disponible" | "pre_reserva" | "confirmada" => {
    const dayBookings = dbSchedule[date] || [];
    const found = dayBookings.find(b => b.time === time);
    if (!found) return "disponible";
    return found.status;
  };

  // Enviar a WhatsApp con pre-reserva (Naranja) y solicitar Yape / Transferencia
  const handlePreReserve = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim()) return;

    const reservationCode = "PRE-" + Math.floor(1000 + Math.random() * 9000);

    const newPreRes: PreReservation = {
      id: "res-" + Date.now(),
      code: reservationCode,
      clientName,
      clientPhone,
      service: selectedService.name,
      extras: selectedExtras.map(id => EXTRAS.find(e => e.id === id)?.name || ""),
      date: selectedDate,
      startTime: selectedStartTime,
      endTime: calculatedEndTime,
      totalDuration: totalDurationMinutes,
      totalPrice,
      advanceDeposit,
      remainingBalance,
      status: "pre_reserva", // Siempre entra en NARANJA hasta el Yape
      createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    // Bloquear franjas en la BD simulada como "pre_reserva" (Naranja)
    const [startH, startM] = selectedStartTime.split(":").map(Number);
    const startTotal = startH * 60 + startM;
    const slotsToBlock: { time: string; status: "pre_reserva"; client: string }[] = [];

    for (let t = 0; t < totalDurationMinutes; t += 30) {
      const curM = startTotal + t;
      const hStr = String(Math.floor(curM / 60)).padStart(2, "0");
      const mStr = String(curM % 60).padStart(2, "0");
      slotsToBlock.push({
        time: `${hStr}:${mStr}`,
        status: "pre_reserva",
        client: `${clientName} (Pre-reserva)`
      });
    }

    setDbSchedule(prev => ({
      ...prev,
      [selectedDate]: [...(prev[selectedDate] || []), ...slotsToBlock]
    }));

    setActivePreReservation(newPreRes);

    // Preparar mensaje de WhatsApp profesional para la clienta / dueña del estudio
    const extrasText = newPreRes.extras.length > 0 
      ? `\n✨ *Extras:* ${newPreRes.extras.join(", ")}` 
      : "";

    const waMessage = encodeURIComponent(
      `💅 *SOLICITUD DE PRE-RESERVA · SAMM NAIL STUDIO*\n` +
      `-----------------------------------------\n` +
      `📌 *Código:* #${reservationCode}\n` +
      `👤 *Clienta:* ${clientName}\n` +
      `📞 *Teléfono:* ${clientPhone}\n` +
      `🌸 *Servicio:* ${selectedService.name} (${selectedService.duration} min)${extrasText}\n` +
      `📅 *Fecha:* ${selectedDate}\n` +
      `⏰ *Horario bloqueado:* ${selectedStartTime} hrs a ${calculatedEndTime} hrs (${totalDurationMinutes} min totales con limpieza)\n` +
      `💰 *Total Presupuesto:* ${totalPrice}€ / S/. ${totalPrice * 4}\n` +
      `🟠 *Adelanto 20% para Confirmar:* ${advanceDeposit}€ / S/. ${Math.round(advanceDeposit * 4)}\n` +
      `-----------------------------------------\n` +
      `Hola Samm! Ya registré mi pre-reserva en la web. ¿Me facilitas tu Yape / Plin / Cuenta para transferir el 20% de adelanto y pasar mi cita a verde confirmada? Gracias!`
    );

    // Abrir WhatsApp directo (reemplazable por el teléfono de la clienta)
    const waUrl = `https://api.whatsapp.com/send?phone=51999999999&text=${waMessage}`;
    window.open(waUrl, "_blank");
  };

  // Simular cuando la dueña del salón recibe el Yape y pasa la cita a VERDE
  const handleMarkAsPaidYape = () => {
    if (!activePreReservation) return;

    setActivePreReservation(prev => prev ? { ...prev, status: "confirmada" } : null);

    // Actualizar los bloques en dbSchedule a "confirmada" (Verde)
    setDbSchedule(prev => {
      const currentList = prev[activePreReservation.date] || [];
      const updated = currentList.map(item => {
        if (item.status === "pre_reserva" && item.client.includes(activePreReservation.clientName)) {
          return { ...item, status: "confirmada" as const, client: `${activePreReservation.clientName} (Yape Confirmado)` };
        }
        return item;
      });
      return { ...prev, [activePreReservation.date]: updated };
    });
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#221F1D] flex flex-col selection:bg-[#AB9677] selection:text-white">
      
      {/* 1. BARRA SUPERIOR DE PROMOCIÓN & COMPROMISOS */}
      <div className="bg-[#221F1D] text-[#F9F6F0] py-2 px-4 text-xs tracking-wider border-b border-black/10">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 font-medium">
              <Leaf className="w-3.5 h-3.5 text-[#AB9677]" /> 
              Fórmulas 20-Free & Veganas
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-white/70">
              <ShieldCheck className="w-3.5 h-3.5 text-[#AB9677]" />
              Esterilización con Autoclave Hospitalario
            </span>
          </div>

          <button 
            onClick={() => setActiveTab("iframe-hello")}
            className="text-xs px-2.5 py-0.5 rounded border border-white/20 hover:border-[#AB9677] text-white/90 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <Eye className="w-3 h-3 text-[#AB9677]" />
            Ver Iframe Hello Nails
          </button>
        </div>
      </div>

      {/* 2. HEADER CON NAVEGACIÓN */}
      <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#221F1D]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab("salon")}>
            <div className="w-10 h-10 rounded-full bg-[#AB9677] text-white flex items-center justify-center font-serif text-xl font-bold shadow-sm">
              S
            </div>
            <div>
              <span className="block font-serif text-2xl tracking-[0.18em] uppercase font-medium leading-none">
                SAMM
              </span>
              <span className="block text-[10px] tracking-[0.3em] uppercase text-[#AB9677] font-semibold mt-1">
                NAIL STUDIO · ATELIER
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.18em] font-medium text-[#221F1D]/80">
            <button 
              onClick={() => setActiveTab("salon")}
              className={`transition-colors py-2 border-b-2 ${
                activeTab === "salon" 
                  ? "border-[#AB9677] text-[#221F1D] font-bold" 
                  : "border-transparent hover:text-[#AB9677]"
              }`}
            >
              Tratamientos & Carta
            </button>
            <button 
              onClick={() => setActiveTab("reserva")}
              className={`transition-colors py-2 border-b-2 ${
                activeTab === "reserva" 
                  ? "border-[#AB9677] text-[#221F1D] font-bold" 
                  : "border-transparent hover:text-[#AB9677]"
              }`}
            >
              Agenda Online
            </button>
            <button 
              onClick={() => setActiveTab("iframe-hello")}
              className={`transition-colors py-2 border-b-2 flex items-center gap-1 ${
                activeTab === "iframe-hello" 
                  ? "border-[#AB9677] text-[#221F1D] font-bold" 
                  : "border-transparent hover:text-[#AB9677]"
              }`}
            >
              Inspiración (Iframe)
            </button>
          </nav>

          <button
            onClick={() => setActiveTab("reserva")}
            className="bg-[#AB9677] hover:bg-[#978163] text-white text-xs uppercase tracking-[0.16em] font-semibold px-5 py-3 rounded-full transition-all shadow-sm flex items-center gap-2"
          >
            <CalendarIcon className="w-3.5 h-3.5" />
            Reservar Cita
          </button>
        </div>
      </header>

      {/* 3. VISTA IFRAME HELLO NAILS */}
      {activeTab === "iframe-hello" && (
        <section className="max-w-7xl mx-auto w-full px-4 py-8 flex-1 flex flex-col">
          <div className="bg-white rounded-2xl border border-black/10 shadow-lg overflow-hidden flex flex-col flex-1 min-h-[750px]">
            <div className="bg-[#221F1D] text-white px-6 py-4 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#AB9677] font-semibold">Referencia Visual de Diseño</p>
                <h3 className="font-serif text-lg tracking-wide text-[#FDFBF7]">Hello Nails Oficial (En vivo en Iframe)</h3>
              </div>
              <div className="flex items-center gap-3">
                <a 
                  href="https://hellonails.com/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-colors"
                >
                  Abrir pestaña externa <ExternalLink className="w-3 h-3" />
                </a>
                <button 
                  onClick={() => setActiveTab("reserva")}
                  className="text-xs bg-[#AB9677] hover:bg-[#978163] text-white px-4 py-1.5 rounded-full font-medium transition-colors"
                >
                  Volver a la Agenda
                </button>
              </div>
            </div>
            
            <div className="w-full flex-1 bg-[#F9F9F9]">
              <iframe 
                src="https://hellonails.com/" 
                title="Hello Nails Reference" 
                className="w-full h-full min-h-[700px] border-0"
                loading="lazy"
              />
            </div>
          </div>
        </section>
      )}

      {/* 4. VISTA CATALOGO RESUMIDO */}
      {activeTab === "salon" && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 flex-1">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#AB9677]">
              Atelier Samm Nails
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-light mt-2 text-[#221F1D]">
              Tratamientos Exclusivos de Uñas
            </h1>
            <p className="text-xs text-[#221F1D]/70 mt-3 leading-relaxed">
              Cada servicio cuenta con fotos reales tomadas en cabina, productos 20-Free y esterilización hospitalaria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map(s => (
              <div key={s.id} className="bg-white rounded-2xl border border-black/8 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
                <div className="h-60 relative overflow-hidden bg-[#F6F1E7]">
                  <img src={s.imgUrl} alt={s.name} className="w-full h-full object-cover" />
                  {s.tag && (
                    <span className="absolute top-3 left-3 bg-white/95 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                      {s.tag}
                    </span>
                  )}
                  <span className="absolute bottom-3 right-3 bg-[#221F1D]/80 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#AB9677]" /> {s.duration / 60}h cerradas
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-baseline mb-2">
                      <h3 className="font-serif text-xl font-medium">{s.name}</h3>
                      <span className="font-serif text-xl font-bold text-[#AB9677]">{s.price}€</span>
                    </div>
                    <p className="text-xs text-[#221F1D]/70 leading-relaxed">{s.desc}</p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedService(s);
                      setActiveTab("reserva");
                    }}
                    className="mt-6 w-full bg-[#221F1D] hover:bg-black text-white text-xs uppercase tracking-wider font-semibold py-3 rounded-xl transition-colors"
                  >
                    Seleccionar y Agendar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* 5. VISTA DE RESERVA INTERACTIVA CON SEMANA COMPLETA Y TICKET */}
      {activeTab === "reserva" && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex-1 w-full">

          {/* BANNER INFORMATIVO: REGLA DE LOS 3 COLORES (BLANCO, NARANJA, VERDE) */}
          <div className="mb-8 bg-white border border-black/10 rounded-2xl p-5 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#AB9677]/15 text-[#AB9677] flex items-center justify-center shrink-0 mt-0.5">
                  <Info className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#221F1D]">
                    Sistema de Pre-Reserva Inteligente · Política de Anticipo
                  </h4>
                  <p className="text-xs text-[#221F1D]/70 mt-0.5">
                    Las citas se registran inicialmente como <strong>Pre-Reserva (Naranja)</strong> y se bloquean en el calendario. 
                    Se confirman de forma definitiva en <strong>Verde</strong> al abonar el <strong>20% de adelanto</strong> vía Yape, Plin o Transferencia.
                  </p>
                </div>
              </div>

              {/* Leyenda Visual de los 3 Colores */}
              <div className="flex items-center gap-3 shrink-0 text-xs font-medium">
                <span className="flex items-center gap-1.5 bg-[#F9F9F9] border border-black/20 px-3 py-1.5 rounded-lg text-[#221F1D]">
                  <span className="w-3 h-3 rounded-full bg-white border-2 border-black/40"></span>
                  Disponible (Blanco)
                </span>
                <span className="flex items-center gap-1.5 bg-orange-50 border border-orange-300 px-3 py-1.5 rounded-lg text-orange-800">
                  <span className="w-3 h-3 rounded-full bg-orange-500 animate-pulse"></span>
                  Pre-Reserva (Naranja)
                </span>
                <span className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-300 px-3 py-1.5 rounded-lg text-emerald-800">
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                  Confirmada (Verde)
                </span>
              </div>
            </div>
          </div>

          {/* MODAL DE CONFIRMACIÓN / SIMULACIÓN DE YAPE SI HAY PRE-RESERVA ACTIVA */}
          {activePreReservation && (
            <div className="mb-8 bg-gradient-to-r from-orange-50 via-[#FFF9F2] to-emerald-50 border-2 border-orange-400 rounded-2xl p-6 shadow-md">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[11px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full ${
                      activePreReservation.status === "pre_reserva" 
                        ? "bg-orange-500 text-white" 
                        : "bg-emerald-600 text-white"
                    }`}>
                      {activePreReservation.status === "pre_reserva" ? "🟠 Pre-Reserva Registrada en Agenda" : "🟢 Cita 100% Confirmada"}
                    </span>
                    <span className="text-xs font-semibold text-black/60">Código: #{activePreReservation.code}</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#221F1D] mt-2">
                    {activePreReservation.clientName} · {activePreReservation.service}
                  </h3>
                  <p className="text-xs text-[#221F1D]/80 mt-1">
                    📅 {activePreReservation.date} | ⏰ {activePreReservation.startTime} hrs a {activePreReservation.endTime} hrs ({activePreReservation.totalDuration} min reservados)
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {activePreReservation.status === "pre_reserva" ? (
                    <button
                      onClick={handleMarkAsPaidYape}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-all flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Simular Recepción de Yape 20% ({activePreReservation.advanceDeposit}€)
                    </button>
                  ) : (
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-2 rounded-xl flex items-center gap-1.5">
                      <Check className="w-4 h-4 stroke-[3]" /> Adelanto recibido en Yape. Turno asegurado.
                    </span>
                  )}

                  <button 
                    onClick={() => setActivePreReservation(null)}
                    className="text-xs text-black/50 hover:text-black p-2"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* COLUMNA IZQUIERDA: 1. SERVICIOS CON FOTOS, 2. EXTRAS EN TEXTO, 3. CALENDARIO SEMANAL */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* 1. SELECCIONA TRATAMIENTO CON FOTOS REFERENCIALES */}
              <div className="bg-white rounded-2xl border border-black/8 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-serif text-lg font-medium text-[#221F1D]">
                      1. Selecciona Tratamiento Base
                    </h3>
                    <p className="text-xs text-[#221F1D]/60 mt-0.5">
                      Servicio cerrado estándar de ~2 horas de duración.
                    </p>
                  </div>
                  <span className="text-[11px] font-semibold text-[#AB9677] uppercase tracking-wider bg-[#AB9677]/10 px-2.5 py-1 rounded-full">
                    Obligatorio
                  </span>
                </div>

                {/* Grid con fotos referenciales */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SERVICES.map(s => {
                    const isSelected = selectedService.id === s.id;
                    return (
                      <div
                        key={s.id}
                        onClick={() => setSelectedService(s)}
                        className={`group cursor-pointer rounded-2xl border overflow-hidden transition-all flex flex-col justify-between ${
                          isSelected 
                            ? "border-[#AB9677] ring-2 ring-[#AB9677]/60 shadow-md bg-[#FAF7F2]" 
                            : "border-black/10 hover:border-black/25 bg-white"
                        }`}
                      >
                        {/* Foto Referencial */}
                        <div className="h-36 relative overflow-hidden bg-black/5">
                          <img 
                            src={s.imgUrl} 
                            alt={s.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {s.tag && (
                            <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-xs">
                              {s.tag}
                            </span>
                          )}
                          <span className="absolute bottom-2 right-2 bg-black/75 text-white text-[10px] px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#AB9677]" /> 2 horas cerrado
                          </span>
                        </div>

                        {/* Contenido */}
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-baseline justify-between">
                              <h4 className="font-serif font-medium text-base text-[#221F1D] group-hover:text-[#AB9677] transition-colors">
                                {s.name}
                              </h4>
                              <span className="font-serif text-lg font-bold text-[#AB9677]">
                                {s.price}€
                              </span>
                            </div>
                            <p className="text-xs text-[#221F1D]/70 mt-1 leading-relaxed">
                              {s.desc}
                            </p>
                          </div>

                          <div className="mt-3 pt-2.5 border-t border-black/5 flex items-center justify-between">
                            <span className="text-[10px] text-black/50 font-medium">Protocolo médico</span>
                            <span className={`text-[11px] font-semibold flex items-center gap-1 ${
                              isSelected ? "text-[#AB9677]" : "text-black/40"
                            }`}>
                              {isSelected ? "✓ Seleccionado" : "Elegir"}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 2. EXTRAS EN LETRAS NORMALES (Sin fotos para no saturar) */}
              <div className="bg-white rounded-2xl border border-black/8 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-serif text-lg font-medium text-[#221F1D]">
                      2. Extras & Añadidos
                    </h3>
                    <p className="text-xs text-[#221F1D]/60 mt-0.5">
                      Cada extra suma <strong>media hora (+30 min)</strong> para dar margen de esterilización y limpieza de cabina.
                    </p>
                  </div>
                  <span className="text-xs text-black/50 font-medium">
                    Opcional
                  </span>
                </div>

                <div className="space-y-2.5">
                  {EXTRAS.map(extra => {
                    const isSelected = selectedExtras.includes(extra.id);
                    return (
                      <div
                        key={extra.id}
                        onClick={() => toggleExtra(extra.id)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                          isSelected 
                            ? "border-[#AB9677] bg-[#FAF7F2] ring-1 ring-[#AB9677]" 
                            : "border-black/10 hover:border-black/20 bg-white"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
                            isSelected ? "bg-[#AB9677] text-white" : "border border-black/20"
                          }`}>
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <div>
                            <span className="text-xs font-semibold text-[#221F1D] block">
                              {extra.name}
                            </span>
                            <span className="text-[11px] text-black/50 block">
                              {extra.desc}
                            </span>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-xs font-bold text-[#221F1D]">+{extra.price}€</span>
                          <span className="text-[10px] text-[#AB9677] font-semibold block">
                            +{extra.duration} min limpieza
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 3. CALENDARIO SEMANAL DE LUNES A LUNES (9 AM A 6 PM CON CASILLAS Y COLORES) */}
              <div className="bg-white rounded-2xl border border-black/8 p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                  <div>
                    <h3 className="font-serif text-lg font-medium text-[#221F1D] flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-[#AB9677]" />
                      3. Agenda Semanal (Lunes a Lunes)
                    </h3>
                    <p className="text-xs text-[#221F1D]/60 mt-0.5">
                      Horario continuo de <strong>9:00 am a 6:00 pm</strong>. Selecciona tu hora de inicio.
                    </p>
                  </div>

                  {/* Indicador de duración acumulada */}
                  <div className="bg-[#FAF7F2] border border-[#AB9677]/30 px-3 py-1.5 rounded-xl text-xs text-[#221F1D] font-medium">
                    <span className="text-[#AB9677] font-bold">Tiempo a cubrir:</span> {totalDurationHours}
                  </div>
                </div>

                {/* Barra de 8 días (Lunes a Lunes) */}
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mb-6">
                  {FULL_WEEK.map((w, idx) => {
                    const isSelected = selectedDate === w.fullDate;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedDate(w.fullDate)}
                        className={`p-2.5 rounded-xl text-center border transition-all ${
                          isSelected 
                            ? "bg-[#221F1D] text-white border-[#AB9677] ring-1 ring-[#AB9677] shadow-sm" 
                            : "bg-white text-[#221F1D] border-black/10 hover:border-[#AB9677]"
                        }`}
                      >
                        <span className="block text-[10px] uppercase font-bold tracking-wider opacity-70">
                          {w.day.slice(0, 3)}
                        </span>
                        <span className="block text-sm font-bold mt-0.5">
                          {w.dateNum}
                        </span>
                        <span className="block text-[9px] opacity-60">
                          {w.month}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Casillas Horarias (9:00 a 18:00) con sincronización de estado */}
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="font-medium text-[#221F1D]">
                      Turnos para el {selectedDate} ({totalDurationMinutes} min totales):
                    </span>
                    <span className="text-[11px] text-black/50">
                      Calcula fin: {selectedStartTime} → {calculatedEndTime} hrs
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2.5">
                    {ALL_SLOTS.map(slot => {
                      const status = getSlotStatus(selectedDate, slot);
                      const isSelected = selectedStartTime === slot;

                      // Configuración de estilo según los 3 colores solicitados:
                      // Blanco: Disponible
                      // Naranja: Pre-Reserva activa en BD
                      // Verde: Confirmada con pago en BD
                      let slotClasses = "";
                      let statusBadge = "";

                      if (status === "confirmada") {
                        slotClasses = "bg-emerald-50 text-emerald-800 border-emerald-300 cursor-not-allowed opacity-80";
                        statusBadge = "Confirmada";
                      } else if (status === "pre_reserva") {
                        slotClasses = "bg-orange-50 text-orange-800 border-orange-300 cursor-not-allowed opacity-90";
                        statusBadge = "Pre-Reserva";
                      } else if (isSelected) {
                        slotClasses = "bg-[#AB9677] text-white border-[#AB9677] shadow-md ring-2 ring-[#AB9677]/40";
                        statusBadge = "Tu Turno";
                      } else {
                        // Blanco disponible
                        slotClasses = "bg-white text-[#221F1D] border-black/15 hover:border-[#AB9677] hover:shadow-xs";
                        statusBadge = "Libre";
                      }

                      return (
                        <button
                          key={slot}
                          type="button"
                          disabled={status !== "disponible"}
                          onClick={() => setSelectedStartTime(slot)}
                          className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center ${slotClasses}`}
                        >
                          <span className="text-xs font-bold">{slot} hrs</span>
                          <span className="text-[9px] uppercase tracking-wider font-semibold mt-0.5 opacity-80">
                            {statusBadge}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

            </div>

            {/* COLUMNA DERECHA: TICKET DE PRESUPUESTO & CONFIRMAR PRE-RESERVA */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 bg-white rounded-2xl border border-black/10 p-6 shadow-md">
                
                {/* Header del Ticket */}
                <div className="flex items-center justify-between pb-4 border-b border-black/10">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-[#AB9677] block">
                      Presupuesto en Tiempo Real
                    </span>
                    <h3 className="font-serif text-2xl font-medium tracking-tight text-[#221F1D]">
                      Ticket de Reserva
                    </h3>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#AB9677]/30 flex items-center justify-center font-serif text-xs font-bold text-[#AB9677]">
                    SN
                  </div>
                </div>

                {/* Desglose de Servicios y Extras */}
                <div className="py-5 space-y-4 text-xs border-b border-black/10">
                  
                  {/* Servicio Base */}
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-semibold text-sm text-[#221F1D] block">
                        {selectedService.name}
                      </span>
                      <span className="text-black/50 text-[11px]">
                        Servicio Base Cerrado · 2 horas (120 min)
                      </span>
                    </div>
                    <span className="font-serif text-base font-bold">{selectedService.price}€</span>
                  </div>

                  {/* Extras */}
                  {selectedExtras.length > 0 && (
                    <div className="pt-2 space-y-2">
                      <span className="text-[10px] uppercase tracking-wider text-black/50 font-bold block">
                        Extras & Tiempo Adicional:
                      </span>
                      {selectedExtras.map(id => {
                        const ex = EXTRAS.find(e => e.id === id);
                        if (!ex) return null;
                        return (
                          <div key={id} className="flex items-center justify-between text-[11px] text-[#221F1D]/80">
                            <span>+ {ex.name} (+30 min)</span>
                            <span className="font-semibold">+{ex.price}€</span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Resumen de Tiempo y Horario */}
                  <div className="bg-[#FAF7F2] p-3 rounded-xl border border-black/5 space-y-1.5 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-black/50">Día seleccionado:</span>
                      <span className="font-semibold">{selectedDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-black/50">Horario inicio:</span>
                      <span className="font-semibold">{selectedStartTime} hrs</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-black/50">Horario término:</span>
                      <span className="font-semibold">{calculatedEndTime} hrs</span>
                    </div>
                    <div className="flex justify-between text-[#AB9677] font-semibold pt-1 border-t border-black/5">
                      <span>Tiempo cubierto:</span>
                      <span>{totalDurationHours}</span>
                    </div>
                  </div>

                  {/* REGLA DEL 20% DE ADELANTO */}
                  <div className="bg-orange-50 border border-orange-200 p-3.5 rounded-xl space-y-1.5">
                    <div className="flex items-center gap-1.5 text-orange-900 font-bold text-xs">
                      <AlertCircle className="w-4 h-4 text-orange-600 shrink-0" />
                      <span>Condición de Reserva: 20% Adelanto</span>
                    </div>
                    <p className="text-[11px] text-orange-800 leading-tight">
                      Para garantizar el turno y pasar tu casilla de <span className="font-bold text-orange-600">Naranja</span> a <span className="font-bold text-emerald-700">Verde</span> se requiere abonar el 20%. El restante 80% se abona presencialmente en cabina.
                    </p>
                  </div>

                </div>

                {/* Importe Total y Cuota 20% */}
                <div className="py-4 border-b border-black/10 space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="font-serif text-sm text-black/60">Presupuesto Total:</span>
                    <span className="font-serif text-2xl font-bold text-[#221F1D]">{totalPrice}€</span>
                  </div>

                  <div className="flex justify-between items-baseline pt-1 border-t border-black/5">
                    <span className="text-xs font-bold text-orange-800">
                      🟠 Adelanto 20% (Yape / Transferencia):
                    </span>
                    <span className="font-serif text-xl font-bold text-orange-600">
                      {advanceDeposit}€ <span className="text-xs font-normal text-black/50">(o S/. {Math.round(advanceDeposit * 4)})</span>
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline text-[11px] text-black/60">
                    <span>Restante en cabina (80%):</span>
                    <span className="font-semibold">{remainingBalance}€</span>
                  </div>
                </div>

                {/* Formulario de Pre-Reserva con enlace a WhatsApp */}
                <form onSubmit={handlePreReserve} className="mt-5 space-y-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-black/70 mb-1">
                      Nombre y Apellidos
                    </label>
                    <div className="relative">
                      <User className="w-3.5 h-3.5 text-black/40 absolute left-3 top-3.5" />
                      <input 
                        type="text" 
                        required
                        placeholder="Ej. Valeria Montes"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 text-xs bg-[#FDFBF7] border border-black/15 rounded-xl focus:outline-none focus:border-[#AB9677]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-black/70 mb-1">
                      Teléfono WhatsApp
                    </label>
                    <div className="relative">
                      <Phone className="w-3.5 h-3.5 text-black/40 absolute left-3 top-3.5" />
                      <input 
                        type="tel" 
                        required
                        placeholder="+51 900 000 000"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 text-xs bg-[#FDFBF7] border border-black/15 rounded-xl focus:outline-none focus:border-[#AB9677]"
                      />
                    </div>
                  </div>

                  {/* Botón de Confirmar Pre-Reserva */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#221F1D] to-[#3a3530] hover:from-black hover:to-neutral-900 text-white text-xs uppercase tracking-[0.16em] font-semibold py-4 rounded-full transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    Confirmar Pre-Reserva vía WhatsApp
                  </button>
                </form>

                <p className="text-[10px] text-center text-black/40 mt-3">
                  Te redirigiremos a WhatsApp con los datos listos para coordinar tu Yape.
                </p>

              </div>
            </div>

          </div>

        </main>
      )}

      {/* FOOTER */}
      <footer className="bg-[#221F1D] text-white/70 py-12 border-t border-black/20 text-xs mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#AB9677] text-white flex items-center justify-center font-serif text-base font-bold">
              S
            </div>
            <div>
              <span className="font-serif text-lg tracking-widest text-white block">SAMM NAIL STUDIO</span>
              <span className="text-[10px] text-white/50 tracking-wider">Atelier de Uñas & Cuidado Quirúrgico · Lima</span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-[11px] tracking-wider uppercase">
            <button onClick={() => setActiveTab("salon")} className="hover:text-white transition-colors">Carta</button>
            <button onClick={() => setActiveTab("reserva")} className="hover:text-white transition-colors">Agenda Semanal</button>
            <button onClick={() => setActiveTab("iframe-hello")} className="hover:text-white transition-colors">Referencia Hello Nails</button>
          </div>

          <p className="text-[11px] text-white/40">
            © 2026 Samm Nail Studio. Todos los derechos reservados.
          </p>
        </div>
      </footer>

    </div>
  );
}
