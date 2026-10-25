"use client";

import { useState, useMemo } from "react";
import { 
  Sparkles, 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  ShieldCheck, 
  User, 
  Phone,
  Award,
  Leaf,
  Check,
  MessageCircle,
  AlertCircle,
  Info,
  X,
  Compass,
  ArrowRight,
  Palette,
  Sun,
  Flame,
  FileText,
  BookOpen
} from "lucide-react";

// Tipos
interface ServiceItem {
  id: string;
  name: string;
  category: "manicura" | "pedicura" | "nailart" | "acrilico";
  price: number;
  duration: number; // 120 min = 2 horas cerrado
  desc: string;
  tag?: string;
  imgUrl: string;
}

interface ExtraItem {
  id: string;
  name: string;
  price: number;
  duration: number; // 30 min cada bloque de extra y desinfección
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
  status: "disponible" | "pre_reserva" | "confirmada";
}

// Catálogo especializado 100% en uñas y derivados (acrílico, gel, soft gel, esmaltado y nail art)
// Catálogo especializado 100% en uñas y derivados en Soles Peruanos (S/)
// Bloque base: 2 Horas Cerradas (120 min) por tratamiento
const SERVICES: ServiceItem[] = [
  {
    id: "mani-rusa",
    name: "Manicura Rusa Anatómica Combinada",
    category: "manicura",
    price: 75,
    duration: 120, // 2 horas cerrado
    desc: "Limpieza anatómica milimétrica de cutícula con fresas de diamante, torno médico y esmaltado nivelado de alta precisión. Sesión cerrada de 2 horas.",
    tag: "Bestseller Lima",
    imgUrl: "https://images.pexels.com/photos/3997391/pexels-photo-3997391.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "unas-acrilicas",
    name: "Esculpidas en Acrílico Premium con Molde",
    category: "acrilico",
    price: 130,
    duration: 120, // 2 horas cerrado
    desc: "Estructura arquitectónica con acrílico de alta resistencia, ápice reforzado, limado estructural y acabado brillante espejo. Bloque de 2 horas.",
    tag: "Durabilidad Extrema",
    imgUrl: "https://images.pexels.com/photos/705255/pexels-photo-705255.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "semi-summer",
    name: "Esmaltado Semipermanente Summer Glazed",
    category: "manicura",
    price: 60,
    duration: 120, // 2 horas cerrado
    desc: "Nivelación con base rubber, esmaltes 20-Free tonos cálidos verano Lima y efecto nacarado/cromo con brillo cerámico. Sesión de 2 horas.",
    tag: "Verano 2027",
    imgUrl: "https://images.pexels.com/photos/887352/pexels-photo-887352.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "soft-gel-tips",
    name: "Extensiones Soft Gel / Tips Press-On Gel",
    category: "acrilico",
    price: 110,
    duration: 120, // 2 horas cerrado
    desc: "Cápsulas de gel flexible adheridas con base estructural. Cero limado agresivo sobre la uña natural. Sesión de 2 horas.",
    tag: "Largo Natural",
    imgUrl: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "nailart-editorial",
    name: "Nail Art Verano Lima & Glow Solar",
    category: "nailart",
    price: 95,
    duration: 120, // 2 horas cerrado
    desc: "Micro-french neón pastel, degradados veraniegos aura, efectos cromados solares y trazos a mano alzada. Sesión artística de 2 horas.",
    tag: "Tendencia Solar",
    imgUrl: "https://images.pexels.com/photos/939836/pexels-photo-939836.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "pedi-rusa",
    name: "Pedicura Clínica Rusa & Esmaltado",
    category: "pedicura",
    price: 85,
    duration: 120, // 2 horas cerrado
    desc: "Limpieza profunda de canales ungueales con fresas, retiro de asperezas y esmaltado de alta adherencia para sandalias de playa. 2 horas.",
    tag: "Beach Ready",
    imgUrl: "https://images.pexels.com/photos/3997383/pexels-photo-3997383.jpeg?auto=compress&cs=tinysrgb&w=800"
  }
];

// Extras dinámicos en Soles (+30 min cada uno)
const EXTRAS: ExtraItem[] = [
  { 
    id: "retirada-previa", 
    name: "Retirada de Acrílico o Gel de Otro Salón (+30 min)", 
    price: 25, 
    duration: 30, 
    desc: "Retirada técnica segura con fresa cerámica suave sin debilitar la uña natural." 
  },
  { 
    id: "french-micro", 
    name: "French Micro-Line en las 10 uñas (+30 min)", 
    price: 20, 
    duration: 30, 
    desc: "Línea francesa ultra-fina minimalista en blanco roto o colores de temporada." 
  },
  { 
    id: "reparacion-una", 
    name: "Reconstrucción Uña Rota (Acrílico o Gel) (+30 min)", 
    price: 15, 
    duration: 30, 
    desc: "Rescate milimétrico de uña fisurada sin tener que cortarlas todas." 
  },
  { 
    id: "nailart-alzada", 
    name: "Nail Art Personalizado (2 Uñas de Acento) (+30 min)", 
    price: 20, 
    duration: 30, 
    desc: "Diseños de palmeras veraniegas, efecto aura o pedrería fina." 
  },
  { 
    id: "bano-aceite", 
    name: "Nutrición Térmica con Aceite de Argán & Karité (+30 min)", 
    price: 15, 
    duration: 30, 
    desc: "Hidratación profunda caliente post-playa para cutículas resecas." 
  }
];

// Semana completa de Lunes a Lunes
const FULL_WEEK = [
  { day: "Lun", dateNum: "26", month: "Oct", fullDate: "2026-10-26" },
  { day: "Mar", dateNum: "27", month: "Oct", fullDate: "2026-10-27" },
  { day: "Mié", dateNum: "28", month: "Oct", fullDate: "2026-10-28" },
  { day: "Jue", dateNum: "29", month: "Oct", fullDate: "2026-10-29" },
  { day: "Vie", dateNum: "30", month: "Oct", fullDate: "2026-10-30" },
  { day: "Sáb", dateNum: "31", month: "Oct", fullDate: "2026-10-31" },
  { day: "Dom", dateNum: "01", month: "Nov", fullDate: "2026-11-01" },
  { day: "Lun", dateNum: "02", month: "Nov", fullDate: "2026-11-02" },
];

// Casillas de 9:00 am a 6:00 pm (intervalos de 30 minutos)
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

// Estados en BD: blanco (disponible) | naranja (pre_reserva) | verde (confirmada)
const INITIAL_DB_SCHEDULE: Record<string, { time: string; status: "pre_reserva" | "confirmada"; client: string }[]> = {
  "2026-10-27": [
    { time: "09:00", status: "confirmada", client: "Lucía P. (Adelanto Pagado)" },
    { time: "09:30", status: "confirmada", client: "Lucía P." },
    { time: "10:00", status: "confirmada", client: "Lucía P." },
    { time: "10:30", status: "confirmada", client: "Lucía P." },
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
  ]
};

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"inicio" | "tratamientos" | "reserva">("inicio");
  const [categoryFilter, setCategoryFilter] = useState<string>("todos");
  const [legalModal, setLegalModal] = useState<"terminos" | "privacidad" | "libro" | null>(null);

  // Estado del flujo de Reserva
  const [selectedService, setSelectedService] = useState<ServiceItem>(SERVICES[0]);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("2026-10-27");
  const [selectedStartTime, setSelectedStartTime] = useState<string>("11:30");
  const [clientName, setClientName] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");

  // Base de datos de citas
  const [dbSchedule, setDbSchedule] = useState(INITIAL_DB_SCHEDULE);
  const [activePreReservation, setActivePreReservation] = useState<PreReservation | null>(null);

  // Cálculos dinámicos
  const totalDurationMinutes = useMemo(() => {
    const base = selectedService.duration; // 120 min cerrado
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
    return `${hrs}h ${mins}min (con extras y esterilización)`;
  }, [totalDurationMinutes]);

  const totalPrice = useMemo(() => {
    const base = selectedService.price;
    const extrasPrice = selectedExtras.reduce((acc, id) => {
      const ex = EXTRAS.find(e => e.id === id);
      return acc + (ex ? ex.price : 0);
    }, 0);
    return base + extrasPrice;
  }, [selectedService, selectedExtras]);

  const advanceDeposit = useMemo(() => {
    return Math.round(totalPrice * 0.20 * 10) / 10;
  }, [totalPrice]);

  const remainingBalance = useMemo(() => {
    return Math.round((totalPrice - advanceDeposit) * 10) / 10;
  }, [totalPrice, advanceDeposit]);

  const calculatedEndTime = useMemo(() => {
    const [h, m] = selectedStartTime.split(":").map(Number);
    const startMinutes = h * 60 + m;
    const endMinutes = startMinutes + totalDurationMinutes;
    const endH = Math.floor(endMinutes / 60);
    const endM = endMinutes % 60;
    return `${String(endH).padStart(2, "0")}:${String(endM).padStart(2, "0")}`;
  }, [selectedStartTime, totalDurationMinutes]);

  const toggleExtra = (id: string) => {
    setSelectedExtras(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const getSlotStatus = (date: string, time: string): "disponible" | "pre_reserva" | "confirmada" => {
    const dayBookings = dbSchedule[date] || [];
    const found = dayBookings.find(b => b.time === time);
    if (!found) return "disponible";
    return found.status;
  };

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
      status: "pre_reserva"
    };

    // Bloquear franjas en la BD como pre-reserva (Naranja)
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

    const extrasText = newPreRes.extras.length > 0 ? `\n✨ *Extras:* ${newPreRes.extras.join(", ")}` : "";
    const waMessage = encodeURIComponent(
      `💅 *SOLICITUD DE PRE-RESERVA · SAMM NAIL STUDIO (LIMA)*\n` +
      `-----------------------------------------\n` +
      `📌 *Código:* #${reservationCode}\n` +
      `👤 *Clienta:* ${clientName}\n` +
      `📞 *Teléfono:* ${clientPhone}\n` +
      `🌸 *Servicio de Uñas:* ${selectedService.name} (2h cerrado)${extrasText}\n` +
      `📅 *Fecha:* ${selectedDate}\n` +
      `⏰ *Horario bloqueado:* ${selectedStartTime} hrs a ${calculatedEndTime} hrs (${totalDurationMinutes} min totales con esterilización)\n` +
      `💰 *Total Presupuesto:* S/ ${totalPrice} \n` +
      `🟠 *Adelanto 20% para Confirmar (Yape / Plin):* S/ ${advanceDeposit} \n` +
      `-----------------------------------------\n` +
      `Hola Samm! Ya registré mi pre-reserva en la web. ¿Me facilitas tu Yape / Plin para abonar el 20% de adelanto y pasar mi casilla a verde confirmada? Gracias!`
    );

    const waUrl = `https://api.whatsapp.com/send?phone=51999999999&text=${waMessage}`;
    window.open(waUrl, "_blank");
  };

  const handleMarkAsPaidYape = () => {
    if (!activePreReservation) return;

    setActivePreReservation(prev => prev ? { ...prev, status: "confirmada" } : null);

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
    <div className="min-h-screen bg-white text-[#55504A] flex flex-col font-sans selection:bg-[#C8927B] selection:text-white">
      
      {/* 1. TOP BAR MINIMALISTA (ESTILO HELLO NAILS: MARRÓN TOPO / DORADO ARENA) */}
      <div className="bg-[#7A3E48] text-white/90 py-2 px-4 text-[11px] tracking-widest uppercase border-b border-black/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 font-medium">
              <Leaf className="w-3.5 h-3.5 text-[#EFE2DC]" /> 
              Fórmulas 20-Free & Esmaltado Saludable
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-white/80">
              <ShieldCheck className="w-3.5 h-3.5 text-[#EFE2DC]" />
              Especialistas Exclusivas en Uñas, Acrílico & Nail Art
            </span>
          </div>
          <span className="text-[10px] tracking-wider text-[#EFE2DC]/90 font-medium hidden md:inline-block">
            Atelier Callao · Lima, Perú
          </span>
        </div>
      </div>

      {/* 2. HEADER BLANCO LIMPIO CON LOGOTIPO SAMM */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#EFE2DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 sm:h-24 flex items-center justify-between">
          
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab("inicio")}>
            {/* Logotipo Oficial samm. NAIL STUDIO */}
            <img 
              src="/samm-nailstudio-wordmark.svg" 
              alt="samm. NAIL STUDIO" 
              className="h-9 sm:h-12 w-auto object-contain"
            />
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.2em] font-semibold text-[#7A3E48]">
            <button 
              onClick={() => setActiveTab("inicio")}
              className={`transition-colors py-2 border-b-2 ${
                activeTab === "inicio" 
                  ? "border-[#C8927B] text-[#231C1A]" 
                  : "border-transparent hover:text-[#C8927B]"
              }`}
            >
              Inicio
            </button>
            <button 
              onClick={() => setActiveTab("tratamientos")}
              className={`transition-colors py-2 border-b-2 ${
                activeTab === "tratamientos" 
                  ? "border-[#C8927B] text-[#231C1A]" 
                  : "border-transparent hover:text-[#C8927B]"
              }`}
            >
              Uñas & Carta
            </button>
            <button 
              onClick={() => setActiveTab("reserva")}
              className={`transition-colors py-2 border-b-2 ${
                activeTab === "reserva" 
                  ? "border-[#C8927B] text-[#231C1A]" 
                  : "border-transparent hover:text-[#C8927B]"
              }`}
            >
              Citas & Agenda
            </button>
          </nav>

          <button
            onClick={() => setActiveTab("reserva")}
            className="bg-[#7A3E48] hover:bg-[#5E2F37] text-white text-[11px] sm:text-xs uppercase tracking-[0.16em] sm:tracking-[0.18em] font-semibold px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-full transition-all shadow-sm hover:shadow flex items-center gap-1.5 sm:gap-2"
          >
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Reservar Cita</span>
          </button>
        </div>
      </header>

      {/* 3. VISTA PRINCIPAL (INICIO): ESTÉTICA HELLO NAILS ADAPTADA A PERÚ / VERANO LIMA */}
      {activeTab === "inicio" && (
        <main className="flex-1">
          
          {/* SECCIÓN 1: HERO CON EL FONDO EXACTO QUE DISTE (Botes de esmalte en estanterías doradas Unsplash OpjlRo-31SI) */}
          <section className="relative overflow-hidden border-b border-[#EFE2DC] py-20 lg:py-28 bg-[#FAF7F2]">
            {/* Foto de fondo OpjlRo-31SI: Botes de esmalte en estanterías doradas */}
            <div className="absolute inset-0 z-0">
              <img 
                src="https://static.wixstatic.com/media/11062b_9624dc97c0484bf1b2e418131863e703~mv2.jpeg/v1/fit/w_1920,h_1528,q_90/11062b_9624dc97c0484bf1b2e418131863e703~mv2.jpeg" 
                alt="Estanterías doradas con esmaltes de autor" 
                className="w-full h-full object-cover object-center opacity-30 filter saturate-120"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Póster de Temporada: PRE-VERANO LIMA (Nail Art Solar, Cromo y Neón Pastel) */}
                <div className="lg:col-span-6 bg-white/95 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-[#EFE2DC] shadow-md">
                  <div className="rounded-xl overflow-hidden border border-[#EFE2DC] bg-white">
                    <div className="p-6 bg-gradient-to-r from-[#C8927B] via-[#8C6D4C] to-[#7A3E48] text-white text-center">
                      <span className="text-[10px] tracking-[0.35em] uppercase font-semibold block text-[#EFE2DC]">
                        Colección Temporada
                      </span>
                      <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-wider mt-1">
                        DECO SAMM
                      </h2>
                      <p className="text-xs tracking-widest text-white/90 uppercase mt-0.5 font-medium flex items-center justify-center gap-1.5">
                        <Sun className="w-3.5 h-3.5 text-amber-300" /> SOLAR GLOW · VERANO LIMA
                      </p>
                    </div>

                    {/* Paleta Solar Verano Lima (Terracota, Oro Cálido, Menta Playa, Coral y Rosa Nube) */}
                    <div className="p-6 bg-[#FBF8F6]">
                      <div className="flex justify-center gap-2 mb-6">
                        {["#F59E0B", "#F472B6", "#10B981", "#FB7185", "#D97706", "#818CF8"].map((c, i) => (
                          <div 
                            key={i} 
                            className="w-7 h-12 rounded-full border border-white shadow-xs"
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>

                      <div className="grid grid-cols-4 gap-3 max-w-sm mx-auto">
                        <div className="h-16 rounded-full bg-[#FEF3C7] border-2 border-white shadow-xs flex items-center justify-center text-[10px] font-bold text-amber-900">Glazed</div>
                        <div className="h-16 rounded-full bg-[#FECDD3] border-2 border-white shadow-xs flex items-center justify-center text-[10px] font-bold text-rose-900">Solar</div>
                        <div className="h-16 rounded-full bg-[#D1FAE5] border-2 border-white shadow-xs flex items-center justify-center text-[10px] font-bold text-emerald-900">French</div>
                        <div className="h-16 rounded-full bg-[#E0E7FF] border-2 border-white shadow-xs flex items-center justify-center text-[10px] font-bold text-indigo-900">Cromo</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Texto Hero Editorial (Sin precios) */}
                <div className="lg:col-span-6">
                  <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#C8927B] block mb-2 flex items-center gap-1.5">
                    <Sun className="w-4 h-4 text-[#C8927B]" /> Temporada Sol & Playa · Lima
                  </span>
                  <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#231C1A] tracking-tight leading-tight">
                    NAIL ART SOLAR & ACRÍLICO DE AUTOR
                  </h1>
                  <p className="text-sm font-semibold text-[#7A3E48] uppercase tracking-wider mt-2">
                    ¡Prepara tus manos para la temporada de verano!
                  </p>

                  <p className="text-sm text-[#666059] leading-relaxed mt-4">
                    Especialistas exclusivas en arquitectura de uñas, extensiones en acrílico esculpido con molde y esmaltados de larga duración. 
                    Diseños inspirados en los reflejos dorados del atardecer limeño, efecto glazed donut, francesa neón suave y acabados ultralimpios que no se rompen en el mar ni en piscina.
                  </p>

                  <p className="text-xs text-[#8A8177] italic mt-3">
                    Dedica 2 horas exclusivas a tu cuidado personal sin esperas. Reserva tu turno online con anticipo protegido.
                  </p>

                  <div className="mt-8 flex items-center gap-4">
                    <button
                      onClick={() => setActiveTab("reserva")}
                      className="bg-[#7A3E48] hover:bg-[#5E2F37] text-white text-xs uppercase tracking-[0.18em] font-semibold px-8 py-4 rounded-md transition-all shadow-sm flex items-center gap-2"
                    >
                      <CalendarIcon className="w-4 h-4" />
                      Reservar Cita Ahora
                    </button>
                    <button
                      onClick={() => setActiveTab("tratamientos")}
                      className="border border-[#7A3E48] text-[#7A3E48] hover:bg-white text-xs uppercase tracking-[0.18em] font-semibold px-8 py-4 rounded-md transition-all"
                    >
                      Ver Técnicas de Uñas
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* SECCIÓN 2: TRÍPTICO DE FOTOGRAFÍA EDITORIAL RENOVADO (100% UÑAS VERANIEGAS & PEXELS CDN) */}
          <section className="py-20 bg-white border-b border-[#EFE2DC]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="text-center max-w-xl mx-auto mb-14">
                <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#C8927B] block">
                  Galería de Cabina
                </span>
                <h3 className="font-serif text-3xl font-bold text-[#231C1A] mt-1">
                  Brillo de Espejo, Acrílico & Cutícula Impecable
                </h3>
                <p className="text-xs text-[#8A8177] mt-2">
                  Fotografía real de acabados que duran más de 21 días intactos.
                </p>
              </div>

              {/* Tríptico de 3 fotos con aspect ratio adaptativo para móvil (aspect-[4/3] en móvil y aspect-[3/4] en desktop) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                <div className="w-full aspect-4/3 sm:aspect-3/4 rounded-2xl overflow-hidden shadow-xs border border-[#EFE2DC] group">
                  <img 
                    src="https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80" 
                    alt="Manicura anatómica rusa con esmaltado nivelado Rosewood"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="w-full aspect-4/3 sm:aspect-3/4 rounded-2xl overflow-hidden shadow-xs border border-[#EFE2DC] group">
                  <img 
                    src="https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80" 
                    alt="Esmaltado nude brillante y cuidado milimétrico de cutículas"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="w-full aspect-4/3 sm:aspect-3/4 rounded-2xl overflow-hidden shadow-xs border border-[#EFE2DC] group">
                  <img 
                    src="https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=800&q=80" 
                    alt="Nail art editorial en tonos berry y destellos dorados"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* SECCIÓN 3: SOBRE SAMM NAILS (CON FOCO EN LIMA / DEDICACIÓN EXCLUSIVA A UÑAS) */}
          <section className="py-20 bg-[#FAF7F2] border-b border-[#EFE2DC]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                <div className="lg:col-span-6">
                  <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#7A3E48] tracking-tight uppercase">
                    Sobre Samm Nails
                  </h2>
                  <p className="text-sm text-[#7A3E48] font-semibold mt-4 leading-relaxed">
                    Samm Nail Studio nació con el propósito de ofrecer en Lima una experiencia de uñas sin prisas y de grado quirúrgico.
                  </p>
                  <p className="text-sm text-[#666059] leading-relaxed mt-4">
                    No hacemos peluquería ni masajes generales: <strong>nos dedicamos 100% y de forma exclusiva al mundo de las uñas</strong>. 
                    Desde el esculpido anatómico en acrílico y nivelación con gel, hasta el cuidado terapéutico de la lámina ungueal con esmaltes libres de tóxicos.
                  </p>
                  <p className="text-xs text-[#8A8177] mt-3">
                    Cada turno se cierra en bloques de 2 horas para garantizar esterilización en autoclave, desinfección total de fresas y una atención de tú a tú.
                  </p>
                  
                  <div className="mt-8">
                    <button
                      onClick={() => setActiveTab("tratamientos")}
                      className="bg-[#7A3E48] hover:bg-[#5E2F37] text-white text-xs uppercase tracking-[0.18em] font-semibold px-8 py-3.5 rounded-md transition-all shadow-sm"
                    >
                      Conoce Nuestra Carta
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-6">
                  <div className="relative rounded-2xl overflow-hidden shadow-md border border-[#EFE2DC]">
                    <img 
                      src="https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=1000&q=80" 
                      alt="Aplicación de esmalte y cuidado de cutículas en atelier Samm" 
                      className="w-full h-64 sm:h-96 md:h-[400px] object-cover object-center"
                    />
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* SECCIÓN 4: BANNER CIRCULAR ESTILO HELLO NAILS */}
          <section className="py-20 bg-white border-b border-[#EFE2DC]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                <div className="lg:col-span-6">
                  <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#C8927B] block mb-1">
                    Tratamiento Estrella
                  </span>
                  <h3 className="font-serif text-4xl sm:text-5xl font-bold text-[#231C1A] tracking-tight">
                    PON TUS UÑAS DE MODA
                  </h3>
                  <p className="text-sm text-[#666059] leading-relaxed mt-4">
                    Especialmente pensado para clientas que buscan una uña fuerte, estilizada y resistente al agua de mar y piscinas. 
                    Nuestra manicura anatómica rusa retira toda la piel muerta sin cortes abrasivos, logrando que el color crezca desde dentro y dure impecable por semanas.
                  </p>
                  <p className="text-xs text-[#8A8177] mt-3 leading-relaxed">
                    Personaliza con acrílico, soft gel o nail art de tendencia en nuestra agenda online.
                  </p>

                  <div className="mt-8">
                    <button
                      onClick={() => setActiveTab("reserva")}
                      className="bg-[#7A3E48] hover:bg-[#5E2F37] text-white text-xs uppercase tracking-[0.18em] font-semibold px-8 py-4 rounded-md transition-all shadow-sm"
                    >
                      Reservar Mi Turno
                    </button>
                  </div>
                </div>

                {/* Círculo Emblema con Línea Dorada */}
                <div className="lg:col-span-6 flex justify-center">
                  <div className="w-80 h-80 sm:w-96 sm:h-96 rounded-full border-[3px] border-[#C8927B] flex flex-col items-center justify-center p-8 text-center bg-[#FBF8F6] shadow-xs">
                    <div className="w-12 h-0.5 bg-[#C8927B] mb-3"></div>
                    <span className="text-xs uppercase tracking-[0.3em] font-bold text-[#7A3E48]">
                      Especialidad Samm
                    </span>
                    <h4 className="font-serif text-2xl sm:text-3xl font-bold text-[#231C1A] uppercase tracking-wider mt-1">
                      Manicura Rusa & Acrílico
                    </h4>
                    <span className="text-xs uppercase tracking-widest text-[#C8927B] font-semibold mt-2">
                      Fórmula 20-Free · Cero Tóxicos
                    </span>
                    <div className="w-12 h-0.5 bg-[#C8927B] my-4"></div>
                    <p className="text-[11px] uppercase tracking-widest text-[#666059] font-medium">
                      Retirada anterior & Limpieza anatómica incluida
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* SECCIÓN 5: COLECCIONES DE VERANO (ESTILO IMAGEN 5 DEL USUARIO) */}
          <section className="py-20 bg-[#FAF7F2]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="text-center max-w-xl mx-auto mb-14">
                <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#C8927B] block">
                  Ediciones Verano Lima
                </span>
                <h3 className="font-serif text-4xl font-bold text-[#231C1A] mt-1">
                  Colecciones de Tendencia
                </h3>
                <p className="text-xs text-[#8A8177] mt-2">
                  Paletas creadas para lucir con luz solar natural.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Tarjeta 1: Summer Jelly */}
                <div className="rounded-2xl overflow-hidden border border-[#EFE2DC] shadow-xs group bg-white">
                  <div className="aspect-4/3 sm:aspect-16/10 overflow-hidden relative">
                    <img 
                      src="https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80" 
                      alt="Colección Summer Jelly"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 bg-white/95 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full text-[#231C1A] shadow-xs">
                      Translúcido
                    </span>
                  </div>
                  <div className="p-6 text-center">
                    <h4 className="font-serif text-2xl font-bold text-[#231C1A]">SUMMER JELLY</h4>
                    <p className="text-xs text-[#666059] mt-2">Efecto gelatina de fruta, brillo cristalino y tonos veraniegos cálidos.</p>
                  </div>
                </div>

                {/* Tarjeta 2: French Neón Pastel */}
                <div className="rounded-2xl overflow-hidden border border-[#EFE2DC] shadow-xs group bg-white">
                  <div className="aspect-4/3 sm:aspect-16/10 overflow-hidden relative">
                    <img 
                      src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80" 
                      alt="Colección French Pastel"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 bg-white/95 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full text-[#231C1A] shadow-xs">
                      Micro Trazos
                    </span>
                  </div>
                  <div className="p-6 text-center">
                    <h4 className="font-serif text-2xl font-bold text-[#231C1A]">SUNSET FRENCH</h4>
                    <p className="text-xs text-[#666059] mt-2">Línea francesa ultra-fina en tonos arena, peach y destellos veraniegos.</p>
                  </div>
                </div>

                {/* Tarjeta 3: Cromo Perlado Glazed */}
                <div className="rounded-2xl overflow-hidden border border-[#EFE2DC] shadow-xs group bg-white">
                  <div className="aspect-4/3 sm:aspect-16/10 overflow-hidden relative">
                    <img 
                      src="https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80" 
                      alt="Colección Glazed Pearl"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 bg-white/95 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full text-[#231C1A] shadow-xs">
                      Efecto Glazed
                    </span>
                  </div>
                  <div className="p-6 text-center">
                    <h4 className="font-serif text-2xl font-bold text-[#231C1A]">PEARL GLAZED</h4>
                    <p className="text-xs text-[#666059] mt-2">Micropolvo perlado nacarado que refleja la luz del sol de Lima.</p>
                  </div>
                </div>

              </div>
            </div>
          </section>

        </main>
      )}

      {/* 4. VISTA DE TRATAMIENTOS (SIN PRECIOS, PRESENTACIONAL DE TÉCNICAS) */}
      {activeTab === "tratamientos" && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 flex-1 w-full">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#C8927B]">
              Carta Especializada
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#231C1A] mt-2">
              Uñas, Acrílico & Cuidado Clínico
            </h1>
            <p className="text-xs text-[#666059] mt-3 leading-relaxed">
              Técnicas realizadas con instrumental médico y productos libres de componentes agresivos. 
              Los precios finales y la reserva de turnos se gestionan en nuestra agenda interactiva.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map(s => (
              <div key={s.id} className="bg-white rounded-2xl border border-[#EFE2DC] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="h-60 relative overflow-hidden bg-[#FAF7F2]">
                    <img src={s.imgUrl} alt={s.name} className="w-full h-full object-cover" />
                    {s.tag && (
                      <span className="absolute top-3 left-3 bg-white/95 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full text-[#231C1A] shadow-xs">
                        {s.tag}
                      </span>
                    )}
                    <span className="absolute bottom-3 right-3 bg-[#7A3E48]/90 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#EFE2DC]" /> 2 horas cerradas
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-2xl font-bold text-[#231C1A]">{s.name}</h3>
                    <p className="text-xs text-[#666059] mt-2 leading-relaxed">{s.desc}</p>
                    <span className="inline-block mt-4 text-[11px] font-semibold text-[#C8927B] uppercase tracking-wider">
                      Incluye esterilización y retirada anterior
                    </span>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => {
                      setSelectedService(s);
                      setActiveTab("reserva");
                    }}
                    className="w-full bg-[#7A3E48] hover:bg-[#5E2F37] text-white text-xs uppercase tracking-wider font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    Ver Tarifas & Agendar Cita <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* 5. VISTA DE RESERVA (PRESUPUESTO, 20% YAPE / PLIN EN SOLES, SEMÁFORO 3 COLORES) */}
      {activeTab === "reserva" && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 flex-1 w-full">

          {/* Banner de los 3 Colores */}
          <div className="mb-8 bg-[#FBF8F6] border border-[#EFE2DC] rounded-2xl p-5 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#C8927B]/15 text-[#C8927B] flex items-center justify-center shrink-0 mt-0.5">
                  <Info className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#231C1A]">
                    Modelo de Pre-Reserva Inteligente · Política de Anticipo
                  </h4>
                  <p className="text-xs text-[#666059] mt-0.5">
                    Las citas se registran en <strong>Pre-Reserva (Naranja)</strong>. 
                    Se confirman en <strong>Verde</strong> al abonar el <strong>20% de adelanto vía Yape / Plin</strong>.
                  </p>
                </div>
              </div>

              {/* Leyenda de los 3 Colores */}
              <div className="flex items-center gap-2.5 shrink-0 text-xs font-semibold">
                <span className="flex items-center gap-1.5 bg-white border border-[#D1D5DB] px-3 py-1.5 rounded-lg text-[#231C1A]">
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

          {/* Pre-Reserva Activa esperando Yape */}
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
                  <h3 className="font-serif text-xl font-bold text-[#231C1A] mt-2">
                    {activePreReservation.clientName} · {activePreReservation.service}
                  </h3>
                  <p className="text-xs text-[#55504A] mt-1">
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
                      Simular Recepción de Yape 20% (S/ {Math.round(activePreReservation.advanceDeposit * 4)})
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

          <div className="mb-8">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#C8927B]">
              Paso a Paso
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mt-1 text-[#231C1A]">
              Configura tu Cita & Presupuesto
            </h2>
            <p className="text-xs text-[#666059] mt-2">
              Selecciona tu técnica de uñas base, añade extras en texto y consulta el total con el 20% de anticipo.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Columna Izquierda: 1. Tratamientos con fotos, 2. Extras en texto, 3. Calendario semanal L-L */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* 1. Selector de Tratamiento Base CON FOTOS REFERENCIALES */}
              <div className="bg-white rounded-2xl border border-[#EFE2DC] p-6 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#231C1A]">
                      1. Selecciona Técnica de Uñas Base
                    </h3>
                    <p className="text-xs text-[#666059] mt-0.5">
                      Servicio cerrado estándar de ~2 horas de duración.
                    </p>
                  </div>
                  <span className="text-[11px] font-semibold text-[#C8927B] uppercase tracking-wider bg-[#FAF7F2] border border-[#EFE2DC] px-2.5 py-1 rounded-full">
                    Obligatorio
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SERVICES.map(s => {
                    const isSelected = selectedService.id === s.id;
                    return (
                      <div
                        key={s.id}
                        onClick={() => setSelectedService(s)}
                        className={`group cursor-pointer rounded-2xl border overflow-hidden transition-all flex flex-col justify-between ${
                          isSelected 
                            ? "border-[#C8927B] ring-2 ring-[#C8927B]/60 shadow-md bg-[#FBF8F6]" 
                            : "border-[#EFE2DC] hover:border-[#C8927B]/50 bg-white"
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
                            <span className="absolute top-2 left-2 bg-white/95 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-xs text-[#231C1A]">
                              {s.tag}
                            </span>
                          )}
                          <span className="absolute bottom-2 right-2 bg-[#7A3E48]/90 text-white text-[10px] px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#EFE2DC]" /> 2 horas cerrado
                          </span>
                        </div>

                        {/* Detalle y Precio aquí en reserva */}
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-baseline justify-between">
                              <h4 className="font-serif font-bold text-base text-[#231C1A] group-hover:text-[#C8927B] transition-colors">
                                {s.name}
                              </h4>
                              <span className="font-serif text-lg font-bold text-[#C8927B]">
                                S/ {s.price * 4} <span className="text-xs text-black/40 font-normal">({s.price}€)</span>
                              </span>
                            </div>
                            <p className="text-xs text-[#666059] mt-1 leading-relaxed">
                              {s.desc}
                            </p>
                          </div>

                          <div className="mt-3 pt-2.5 border-t border-[#EFE2DC] flex items-center justify-between">
                            <span className="text-[10px] text-[#8A8177] font-medium">Protocolo médico</span>
                            <span className={`text-[11px] font-bold flex items-center gap-1 ${
                              isSelected ? "text-[#C8927B]" : "text-black/40"
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

              {/* 2. Selector de Extras Dinámicos (EN LETRAS NORMALES) */}
              <div className="bg-white rounded-2xl border border-[#EFE2DC] p-6 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#231C1A]">
                      2. Extras & Cuidados Adicionales
                    </h3>
                    <p className="text-xs text-[#666059] mt-0.5">
                      Cada extra suma <strong>media hora (+30 min)</strong> para dar tiempo de desinfección y preparación en cabina.
                    </p>
                  </div>
                  <span className="text-xs text-[#8A8177] font-medium">
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
                            ? "border-[#C8927B] bg-[#FBF8F6] ring-1 ring-[#C8927B]" 
                            : "border-[#EFE2DC] hover:border-black/20 bg-white"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
                            isSelected ? "bg-[#C8927B] text-white" : "border border-black/20"
                          }`}>
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <div>
                            <span className="text-xs font-bold text-[#231C1A] block">{extra.name}</span>
                            <span className="text-[11px] text-[#666059] block">{extra.desc}</span>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-xs font-bold text-[#231C1A]">+S/ {extra.price * 4}</span>
                          <span className="text-[10px] text-[#C8927B] font-semibold block">+{extra.duration} min</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 3. Calendario Semanal de Lunes a Lunes (9 AM A 6 PM) */}
              <div className="bg-white rounded-2xl border border-[#EFE2DC] p-6 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#231C1A] flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-[#C8927B]" />
                      3. Agenda Semanal (Lunes a Lunes)
                    </h3>
                    <p className="text-xs text-[#666059] mt-0.5">
                      Horario de atención continuo de <strong>9:00 am a 6:00 pm</strong>.
                    </p>
                  </div>

                  <div className="bg-[#FBF8F6] border border-[#C8927B]/30 px-3 py-1.5 rounded-xl text-xs text-[#231C1A] font-semibold">
                    <span className="text-[#C8927B] font-bold">Tiempo a cubrir:</span> {totalDurationHours}
                  </div>
                </div>

                {/* Días de Lunes a Lunes */}
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
                            ? "bg-[#7A3E48] text-white border-[#C8927B] ring-1 ring-[#C8927B] shadow-sm" 
                            : "bg-white text-[#7A3E48] border-[#EFE2DC] hover:border-[#C8927B]"
                        }`}
                      >
                        <span className="block text-[10px] uppercase font-bold tracking-wider opacity-80">
                          {w.day}
                        </span>
                        <span className="block text-sm font-bold mt-0.5">
                          {w.dateNum}
                        </span>
                        <span className="block text-[9px] opacity-70">
                          {w.month}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Huecos Horarios (9:00 a 18:00) */}
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="font-semibold text-[#231C1A]">Turnos para el {selectedDate} ({totalDurationMinutes} min totales):</span>
                    <span className="text-[11px] text-[#8A8177]">
                      Calcula fin: {selectedStartTime} → {calculatedEndTime} hrs
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2.5">
                    {ALL_SLOTS.map(slot => {
                      const status = getSlotStatus(selectedDate, slot);
                      const isSelected = selectedStartTime === slot;

                      let slotClasses = "";
                      let statusBadge = "";

                      if (status === "confirmada") {
                        slotClasses = "bg-emerald-50 text-emerald-800 border-emerald-300 cursor-not-allowed opacity-80";
                        statusBadge = "Confirmada";
                      } else if (status === "pre_reserva") {
                        slotClasses = "bg-orange-50 text-orange-800 border-orange-300 cursor-not-allowed opacity-90";
                        statusBadge = "Pre-Reserva";
                      } else if (isSelected) {
                        slotClasses = "bg-[#C8927B] text-white border-[#C8927B] shadow-md ring-2 ring-[#C8927B]/40";
                        statusBadge = "Tu Turno";
                      } else {
                        slotClasses = "bg-white text-[#231C1A] border-[#D1D5DB] hover:border-[#C8927B] hover:shadow-xs";
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
                          <span className="text-[9px] uppercase tracking-wider font-semibold mt-0.5 opacity-90">
                            {statusBadge}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Columna Derecha: Ticket de Presupuesto en Soles con 20% Yape */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 bg-white rounded-2xl border border-[#EFE2DC] p-6 shadow-md">
                
                {/* Header Ticket */}
                <div className="flex items-center justify-between pb-4 border-b border-[#EFE2DC]">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-[#C8927B] block">
                      Presupuesto en Tiempo Real
                    </span>
                    <h3 className="font-serif text-2xl font-bold tracking-tight text-[#231C1A]">
                      Ticket de Reserva
                    </h3>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#FBF8F6] border border-[#C8927B]/30 flex items-center justify-center font-serif text-xs font-bold text-[#C8927B]">
                    SN
                  </div>
                </div>

                {/* Desglose */}
                <div className="py-5 space-y-4 text-xs border-b border-[#EFE2DC]">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-bold text-sm text-[#231C1A] block">
                        {selectedService.name}
                      </span>
                      <span className="text-[#8A8177] text-[11px]">
                        Servicio Base · 2 horas cerrado
                      </span>
                    </div>
                    <span className="font-serif text-base font-bold">S/ {selectedService.price * 4}</span>
                  </div>

                  {selectedExtras.length > 0 && (
                    <div className="pt-2 space-y-2">
                      <span className="text-[10px] uppercase tracking-wider text-[#8A8177] font-bold block">
                        Extras & Tiempo Adicional:
                      </span>
                      {selectedExtras.map(id => {
                        const ex = EXTRAS.find(e => e.id === id);
                        if (!ex) return null;
                        return (
                          <div key={id} className="flex items-center justify-between text-[11px] text-[#231C1A]">
                            <span>+ {ex.name} (+30 min)</span>
                            <span className="font-bold">+S/ {ex.price * 4}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Resumen de Tiempo y Horario */}
                  <div className="bg-[#FBF8F6] p-3 rounded-xl border border-[#EFE2DC] space-y-1.5 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-[#8A8177]">Día seleccionado:</span>
                      <span className="font-semibold text-[#231C1A]">{selectedDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8A8177]">Horario inicio:</span>
                      <span className="font-semibold text-[#231C1A]">{selectedStartTime} hrs</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8A8177]">Horario término:</span>
                      <span className="font-semibold text-[#231C1A]">{calculatedEndTime} hrs</span>
                    </div>
                    <div className="flex justify-between text-[#C8927B] font-bold pt-1 border-t border-[#EFE2DC]">
                      <span>Tiempo cubierto:</span>
                      <span>{totalDurationHours}</span>
                    </div>
                  </div>

                  {/* Condición de Reserva: 20% Adelanto Yape */}
                  <div className="bg-orange-50 border border-orange-200 p-3.5 rounded-xl space-y-1.5">
                    <div className="flex items-center gap-1.5 text-orange-900 font-bold text-xs">
                      <AlertCircle className="w-4 h-4 text-orange-600 shrink-0" />
                      <span>Condición de Reserva: 20% Adelanto</span>
                    </div>
                    <p className="text-[11px] text-orange-800 leading-tight">
                      Para garantizar el turno y pasar tu casilla de <span className="font-bold text-orange-600">Naranja</span> a <span className="font-bold text-emerald-700">Verde</span> se abona el 20% por Yape o Plin. El 80% restante se paga en cabina.
                    </p>
                  </div>
                </div>

                {/* Importe Total y Cuota 20% en Soles */}
                <div className="py-4 border-b border-[#EFE2DC] space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="font-serif text-sm text-[#8A8177]">Presupuesto Total:</span>
                    <span className="font-serif text-2xl font-bold text-[#231C1A]">
                      S/ {totalPrice * 4} <span className="text-xs font-normal text-black/40">({totalPrice}€)</span>
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline pt-1 border-t border-[#EFE2DC]">
                    <span className="text-xs font-bold text-orange-800">
                      🟠 Adelanto 20% (Yape / Plin):
                    </span>
                    <span className="font-serif text-xl font-bold text-orange-600">
                      S/ {advanceDeposit} <span className="text-xs font-normal text-black/50">({advanceDeposit}€)</span>
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline text-[11px] text-[#8A8177]">
                    <span>Restante en cabina (80%):</span>
                    <span className="font-semibold text-[#231C1A]">S/ {remainingBalance}</span>
                  </div>
                </div>

                {/* Formulario de Pre-Reserva */}
                <form onSubmit={handlePreReserve} className="mt-5 space-y-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#7A3E48] mb-1">
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
                        className="w-full pl-9 pr-3 py-2.5 text-xs bg-[#FBF8F6] border border-[#D1D5DB] rounded-xl focus:outline-none focus:border-[#C8927B]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#7A3E48] mb-1">
                      Teléfono WhatsApp (Perú)
                    </label>
                    <div className="relative">
                      <Phone className="w-3.5 h-3.5 text-black/40 absolute left-3 top-3.5" />
                      <input 
                        type="tel" 
                        required
                        placeholder="+51 900 000 000"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 text-xs bg-[#FBF8F6] border border-[#D1D5DB] rounded-xl focus:outline-none focus:border-[#C8927B]"
                      />
                    </div>
                  </div>

                  <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#EFE2DC] text-[11px] text-[#55504A] space-y-1">
                    <p className="flex items-center gap-1.5 font-semibold text-[#7A3E48]">
                      <Clock className="w-3.5 h-3.5 text-[#C8927B]" /> Bloque Exclusivo de 2 Horas
                    </p>
                    <p className="text-[10px] leading-relaxed text-[#777068]">
                      Tu turno es reservado con 20% de adelanto vía Yape/Plin. Tolerancia de puntualidad de 10 min por protocolo de esterilización.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#7A3E48] hover:bg-[#5E2F37] text-white text-xs uppercase tracking-[0.16em] font-semibold py-4 rounded-full transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    Confirmar Pre-Reserva vía WhatsApp
                  </button>
                </form>

                <p className="text-[10px] text-center text-[#8A8177] mt-3">
                  Al confirmar, aceptas nuestras <button type="button" onClick={() => setLegalModal("terminos")} className="underline hover:text-[#7A3E48]">Políticas de Cita</button> y pago del adelanto de S/ {advanceDeposit}.
                </p>
              </div>
            </div>

          </div>

        </main>
      )}

      {/* FOOTER OFICIAL CON BRANDING & MARCO LEGAL PERÚ */}
      <footer className="bg-[#231C1A] text-[#EFE2DC]/90 py-12 border-t border-[#C8927B]/30 text-xs mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-8 border-b border-white/10">
            
            {/* Logo en footer */}
            <div className="md:col-span-5 flex items-center gap-4">
              <img 
                src="/samm-nailstudio-wordmark.svg" 
                alt="samm. NAIL STUDIO" 
                className="h-10 w-auto brightness-200"
              />
              <div className="border-l border-white/20 pl-4">
                <span className="text-[11px] text-[#C8927B] font-semibold tracking-wider block">LIMA ATELIER</span>
                <span className="text-[10px] text-white/60 block">Servicios de Uñas & Cuidado Anatómico (2h)</span>
              </div>
            </div>

            {/* Navegación footer sin enlace público a admin */}
            <div className="md:col-span-4 flex flex-wrap items-center gap-5 text-[11px] tracking-wider uppercase font-medium">
              <button onClick={() => setActiveTab("inicio")} className="hover:text-white transition-colors">Inicio</button>
              <button onClick={() => setActiveTab("tratamientos")} className="hover:text-white transition-colors">Uñas & Carta</button>
              <button onClick={() => setActiveTab("reserva")} className="hover:text-white transition-colors">Citas & Agenda</button>
            </div>

            {/* Enlaces Legales & Libro de Reclamaciones */}
            <div className="md:col-span-3 flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-2 text-[11px]">
              <div className="flex items-center gap-4 text-white/70">
                <button 
                  onClick={() => setLegalModal("terminos")} 
                  className="hover:text-[#C8927B] transition-colors underline"
                >
                  Términos & Citas
                </button>
                <button 
                  onClick={() => setLegalModal("privacidad")} 
                  className="hover:text-[#C8927B] transition-colors underline"
                >
                  Privacidad
                </button>
              </div>

              {/* Libro de Reclamaciones (Normativa Perú - Indecopi) */}
              <button
                onClick={() => setLegalModal("libro")}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] text-white/80 hover:text-white transition-all mt-1"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#C8927B]" />
                <span>Libro de Reclamaciones Virtual</span>
              </button>
            </div>

          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-white/40">
            <p>© 2026 samm. NAIL STUDIO · Callao, Lima - Perú. Todos los derechos reservados.</p>
            <p>Horario de Atención: Lunes a Sábado 9:00 am - 6:00 pm</p>
          </div>
        </div>
      </footer>

      {/* MODAL LEGAL LIMPIO (TÉRMINOS / PRIVACIDAD / LIBRO DE RECLAMACIONES) */}
      {legalModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl border border-[#EFE2DC]">
            <button 
              onClick={() => setLegalModal(null)} 
              className="absolute top-5 right-5 p-1 rounded-full text-black/50 hover:text-black hover:bg-black/5"
            >
              <X className="w-5 h-5" />
            </button>

            {legalModal === "terminos" && (
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#C8927B]">Marco de Servicio</span>
                <h3 className="font-serif text-2xl font-bold text-[#231C1A] mt-1 mb-4">Términos & Condiciones de Reserva</h3>
                <div className="text-xs text-[#55504A] space-y-3 leading-relaxed">
                  <p><strong>1. Duración del Servicio:</strong> Cada tratamiento base tiene una duración cerrada de 2 horas continuas para garantizar un limado anatómico y esmaltado de alta precisión. Los extras suman 30 minutos adicionales.</p>
                  <p><strong>2. Anticipo y Bloqueo de Casilla:</strong> Para confirmar tu turno y pasar la casilla a verde en la agenda, se requiere un abono del 20% mediante Yape o Plin. El 80% restante se cancela al finalizar el servicio en cabina.</p>
                  <p><strong>3. Tolerancia de Puntualidad:</strong> Por respeto al tiempo de la siguiente clienta y al proceso de desinfección en autoclave médica, se ofrece una tolerancia máxima de 10 minutos. Retrasos mayores pueden requerir la reprogramación de la cita.</p>
                  <p><strong>4. Reprogramaciones:</strong> Puedes reprogramar tu cita con un mínimo de 24 horas de anticipación sin perder tu anticipo.</p>
                </div>
              </div>
            )}

            {legalModal === "privacidad" && (
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#C8927B]">Protección de Datos</span>
                <h3 className="font-serif text-2xl font-bold text-[#231C1A] mt-1 mb-4">Política de Privacidad</h3>
                <div className="text-xs text-[#55504A] space-y-3 leading-relaxed">
                  <p>En cumplimiento de la Ley N° 29733 (Ley de Protección de Datos Personales del Perú), te informamos que tu nombre y número de WhatsApp son recopilados exclusivamente para la coordinación, confirmación y recordatorio de tu cita en samm. NAIL STUDIO.</p>
                  <p>No compartimos tus datos personales con terceros ni los utilizamos para spam publicitario externo.</p>
                </div>
              </div>
            )}

            {legalModal === "libro" && (
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#C8927B]">Normativa Indecopi</span>
                <h3 className="font-serif text-2xl font-bold text-[#231C1A] mt-1 mb-4">Libro de Reclamaciones Virtual</h3>
                <p className="text-xs text-[#55504A] mb-4 leading-relaxed">
                  Conforme a lo establecido en el Código de Protección y Defensa del Consumidor (Ley N° 29571), ponemos a tu disposición nuestro Libro de Reclamaciones Virtual.
                </p>
                <div className="p-4 bg-[#FBF8F6] rounded-xl border border-[#EFE2DC] space-y-2 text-xs text-[#55504A]">
                  <p><strong>Razón Social:</strong> samm. NAIL STUDIO · Lima, Perú</p>
                  <p><strong>Canal de Atención Inmediata:</strong> Para cualquier queja, reclamo o inconformidad con el servicio, comunícate directamente a nuestro WhatsApp oficial o escríbenos a reclamos@samm-nailstudio.pe. Te responderemos en un plazo máximo de 24 horas hábiles.</p>
                </div>
              </div>
            )}

            <button 
              onClick={() => setLegalModal(null)} 
              className="mt-6 w-full py-3 bg-[#7A3E48] hover:bg-[#5E2F37] text-white text-xs uppercase tracking-wider font-semibold rounded-xl transition-all"
            >
              Entendido y Cerrar
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
