"use client";

import { useState, useMemo } from "react";
import { 
  Sparkles, 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  ShieldCheck, 
  User, 
  Phone,
  Heart,
  Eye,
  ExternalLink,
  Award,
  Leaf,
  Check,
  ShoppingBag,
  SlidersHorizontal,
  X
} from "lucide-react";

// Tipos
interface ServiceItem {
  id: string;
  name: string;
  category: "manicura" | "pedicura" | "nailart" | "tratamientos";
  price: number;
  duration: number; // minutos base
  desc: string;
  tag?: string;
  imgUrl: string;
}

interface ExtraItem {
  id: string;
  name: string;
  price: number;
  duration: number; // minutos añadidos
  desc: string;
}

interface Appointment {
  id: string;
  code: string;
  clientName: string;
  clientPhone: string;
  service: string;
  extras: string[];
  date: string;
  time: string;
  totalDuration: number;
  totalPrice: number;
  status: "confirmada" | "en_cabina" | "completada";
}

// Catálogo de Servicios con CDN de alta resolución
const SERVICES: ServiceItem[] = [
  {
    id: "mani-rusa",
    name: "Manicura Rusa Combinada",
    category: "manicura",
    price: 38,
    duration: 60,
    desc: "Limpieza anatómica milimétrica de cutícula con torno y esmaltado de máxima precisión bajo cutícula.",
    tag: "Bestseller",
    imgUrl: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "mani-semi",
    name: "Manicura Semipermanente Nude",
    category: "manicura",
    price: 26,
    duration: 45,
    desc: "Limado y forma orgánica, esmaltado 20-Free con brillo cerámico de larga duración (21+ días).",
    tag: "Clásico",
    imgUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "nailart-editorial",
    name: "Nail Art Minimal & Cromo Glazed",
    category: "nailart",
    price: 45,
    duration: 75,
    desc: "Efecto Hailey Bieber glazed donut, micropolvo perlado o acentos franceses micro-lineales a mano alzada.",
    tag: "Tendencia",
    imgUrl: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "pedi-spa",
    name: "Pedicura Spa Jelly Relax",
    category: "pedicura",
    price: 44,
    duration: 60,
    desc: "Inmersión exfoliante en gelatina de aromas, retirada de durezas profunda y masaje con manteca de karité pura.",
    tag: "Wellness",
    imgUrl: "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "soft-gel",
    name: "Extensiones Soft Gel / Tips Press-On",
    category: "manicura",
    price: 52,
    duration: 90,
    desc: "Alargamiento con cápsulas de gel empapable que respetan y no desgastan la lámina natural.",
    tag: "Durabilidad",
    imgUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "trata-ibx",
    name: "Tratamiento Reparador IBX System",
    category: "tratamientos",
    price: 22,
    duration: 30,
    desc: "Fusión molecular interna para uñas quebradizas, descamadas o dañadas por acrílicos agresivos.",
    tag: "Terapéutico",
    imgUrl: "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=900&q=80"
  }
];

// Extras dinámicos que alteran duración y precio
const EXTRAS: ExtraItem[] = [
  { 
    id: "retirada-previa", 
    name: "Retirada de Acrílico / Gel Ajeno", 
    price: 10, 
    duration: 30, 
    desc: "Retirada técnica sin torno abrasivo para no dañar tu uña." 
  },
  { 
    id: "french-micro", 
    name: "French Micro-Line en 10 uñas", 
    price: 8, 
    duration: 20, 
    desc: "Línea francesa ultra-fina minimalista en tono blanco roto o metalizado." 
  },
  { 
    id: "reparacion-una", 
    name: "Reconstrucción Uña Rota (Seda/Gel)", 
    price: 5, 
    duration: 15, 
    desc: "Rescate de uña fisurada sin tener que cortarlas todas." 
  },
  { 
    id: "nailart-alzada", 
    name: "Nail Art Personalizado (2 Uñas)", 
    price: 9, 
    duration: 20, 
    desc: "Dibujo botánico, trazos abstractos o piedras Swarovski." 
  },
  { 
    id: "masaje-vela", 
    name: "Masaje Térmico con Vela de Cera Soja", 
    price: 7, 
    duration: 15, 
    desc: "Hidratación profunda caliente para cutículas resecas." 
  }
];

const WEEK_DAYS = [
  { name: "Lun", date: "26 Oct", fullDate: "2026-10-26" },
  { name: "Mar", date: "27 Oct", fullDate: "2026-10-27" },
  { name: "Mié", date: "28 Oct", fullDate: "2026-10-28" },
  { name: "Jue", date: "29 Oct", fullDate: "2026-10-29" },
  { name: "Vie", date: "30 Oct", fullDate: "2026-10-30" },
  { name: "Sáb", date: "31 Oct", fullDate: "2026-10-31" },
  { name: "Dom", date: "01 Nov", fullDate: "2026-11-01" },
];

const TIME_SLOTS = [
  "09:30", "10:30", "11:30", "12:30", "14:00", "15:15", "16:30", "17:45", "19:00"
];

// Huecos pre-ocupados para realismo
const BLOCKED_SLOTS: Record<string, string[]> = {
  "2026-10-26": ["11:30", "16:30"],
  "2026-10-27": ["10:30", "15:15", "17:45"],
  "2026-10-28": ["09:30", "14:00"],
  "2026-10-29": ["12:30", "19:00"],
  "2026-10-30": ["10:30", "11:30", "16:30", "17:45"],
  "2026-10-31": ["11:30", "12:30", "15:15"],
  "2026-11-01": ["09:30", "10:30", "11:30", "12:30", "14:00", "15:15", "16:30", "17:45", "19:00"], // Domingo cerrado
};

export default function HomePage() {
  // Estado de navegación y vistas
  const [activeTab, setActiveTab] = useState<"salon" | "reserva" | "iframe-hello">("salon");
  const [categoryFilter, setCategoryFilter] = useState<string>("todos");

  // Estado del flujo de Reserva
  const [selectedService, setSelectedService] = useState<ServiceItem>(SERVICES[0]);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("2026-10-27");
  const [selectedTime, setSelectedTime] = useState<string>("11:30");
  const [clientName, setClientName] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  const [bookingConfirmed, setBookingConfirmed] = useState<Appointment | null>(null);

  // Cálculos dinámicos
  const totalDuration = useMemo(() => {
    const base = selectedService.duration;
    const extrasDuration = selectedExtras.reduce((acc, id) => {
      const ex = EXTRAS.find(e => e.id === id);
      return acc + (ex ? ex.duration : 0);
    }, 0);
    return base + extrasDuration;
  }, [selectedService, selectedExtras]);

  const totalPrice = useMemo(() => {
    const base = selectedService.price;
    const extrasPrice = selectedExtras.reduce((acc, id) => {
      const ex = EXTRAS.find(e => e.id === id);
      return acc + (ex ? ex.price : 0);
    }, 0);
    return base + extrasPrice;
  }, [selectedService, selectedExtras]);

  const toggleExtra = (id: string) => {
    setSelectedExtras(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const isSlotBlocked = (date: string, time: string) => {
    return BLOCKED_SLOTS[date]?.includes(time) ?? false;
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim()) return;

    const newAppointment: Appointment = {
      id: "apt-" + Date.now(),
      code: "SN-" + Math.floor(1000 + Math.random() * 9000),
      clientName,
      clientPhone,
      service: selectedService.name,
      extras: selectedExtras.map(id => EXTRAS.find(e => e.id === id)?.name || ""),
      date: selectedDate,
      time: selectedTime,
      totalDuration,
      totalPrice,
      status: "confirmada"
    };

    setBookingConfirmed(newAppointment);
  };

  const filteredServices = categoryFilter === "todos" 
    ? SERVICES 
    : SERVICES.filter(s => s.category === categoryFilter);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#221F1D] flex flex-col selection:bg-[#AB9677] selection:text-white">
      
      {/* 1. BARRA SUPERIOR DE PROMOCIÓN & COMPROMISOS (Inspirada en Hello Nails) */}
      <div className="bg-[#221F1D] text-[#F9F6F0] py-2 px-4 text-xs tracking-wider flex items-center justify-between border-b border-black/10">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 font-medium">
              <Leaf className="w-3.5 h-3.5 text-[#AB9677]" /> 
              Fórmulas 20-Free & Veganas
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-white/70">
              <Award className="w-3.5 h-3.5 text-[#AB9677]" />
              Especialistas en Manicura Rusa Anatómica
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveTab("iframe-hello")}
              className={`text-xs px-2.5 py-0.5 rounded border transition-colors flex items-center gap-1.5 ${
                activeTab === "iframe-hello" 
                  ? "bg-[#AB9677] text-white border-[#AB9677]" 
                  : "border-white/20 hover:border-[#AB9677] text-white/80 hover:text-white"
              }`}
            >
              <Eye className="w-3 h-3" />
              Ver Referencia HelloNails.com
            </button>
          </div>
        </div>
      </div>

      {/* 2. HEADER PRINCIPAL */}
      <header className="sticky top-0 z-40 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#221F1D]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          
          {/* Logo Studio */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#AB9677] text-white flex items-center justify-center font-serif text-xl tracking-tighter shadow-sm">
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

          {/* Menú de Navegación */}
          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.18em] font-medium text-[#221F1D]/80">
            <button 
              onClick={() => setActiveTab("salon")}
              className={`transition-colors py-2 border-b-2 ${
                activeTab === "salon" 
                  ? "border-[#AB9677] text-[#221F1D] font-semibold" 
                  : "border-transparent hover:text-[#AB9677]"
              }`}
            >
              Tratamientos & Carta
            </button>
            <button 
              onClick={() => setActiveTab("reserva")}
              className={`transition-colors py-2 border-b-2 ${
                activeTab === "reserva" 
                  ? "border-[#AB9677] text-[#221F1D] font-semibold" 
                  : "border-transparent hover:text-[#AB9677]"
              }`}
            >
              Agenda Online
            </button>
            <button 
              onClick={() => setActiveTab("iframe-hello")}
              className={`transition-colors py-2 border-b-2 flex items-center gap-1 ${
                activeTab === "iframe-hello" 
                  ? "border-[#AB9677] text-[#221F1D] font-semibold" 
                  : "border-transparent hover:text-[#AB9677]"
              }`}
            >
              Inspiración (Iframe)
            </button>
          </nav>

          {/* Botón CTA Cita Directa */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab("reserva")}
              className="bg-[#AB9677] hover:bg-[#978163] text-white text-xs uppercase tracking-[0.16em] font-semibold px-5 py-3 rounded-full transition-all duration-200 shadow-sm hover:shadow flex items-center gap-2"
            >
              <CalendarIcon className="w-3.5 h-3.5" />
              Reservar Cita
            </button>
          </div>
        </div>
      </header>

      {/* 3. VISTA MODAL / PESTAÑA: IFRAME EN VIVO DE HELLO NAILS */}
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
                  onClick={() => setActiveTab("salon")}
                  className="text-xs bg-[#AB9677] hover:bg-[#978163] text-white px-4 py-1.5 rounded-full font-medium transition-colors"
                >
                  Volver al Estudio
                </button>
              </div>
            </div>
            
            <div className="w-full flex-1 bg-[#F9F9F9] relative">
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

      {/* 4. VISTA PRINCIPAL: ESTUDIO & TRATAMIENTOS */}
      {activeTab === "salon" && (
        <main className="flex-1">
          {/* HERO BANNER EDITORIAL */}
          <section className="relative overflow-hidden bg-[#221F1D] text-[#FDFBF7] py-20 lg:py-28">
            {/* Foto de Fondo CDN con overlay sutil */}
            <div className="absolute inset-0 z-0 opacity-25">
              <img 
                src="https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=2000&q=80" 
                alt="Nail Art Background"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
              <div className="max-w-2xl">
                <span className="inline-block text-[#AB9677] font-semibold text-xs tracking-[0.25em] uppercase mb-4">
                  Colección Otoño / Invierno 2026
                </span>
                <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-tight leading-[1.1] mb-6">
                  El arte de la precisión <br />
                  <span className="italic font-normal text-[#E8DCC4]">en cada milímetro.</span>
                </h1>
                <p className="text-white/80 text-base leading-relaxed mb-8 max-w-xl font-light">
                  Inspirados en la estética contemporánea de los mejores centros de Europa. 
                  Protocolos rusos de cutícula limpia, esmaltes 20-Free de larga duración y cálculo exacto de tiempos para que tu agenda nunca sufra retrasos.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => setActiveTab("reserva")}
                    className="bg-[#AB9677] hover:bg-[#978163] text-white text-xs uppercase tracking-[0.16em] font-semibold px-8 py-4 rounded-full transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                  >
                    <CalendarIcon className="w-4 h-4" />
                    Reservar tu Tratamiento
                  </button>

                  <a 
                    href="#carta-servicios"
                    className="bg-white/10 hover:bg-white/15 text-white text-xs uppercase tracking-[0.16em] font-medium px-7 py-4 rounded-full transition-all border border-white/20"
                  >
                    Ver Catálogo
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* VALORES DE MARCA / BADGES DE CONFIANZA */}
          <section className="border-b border-[#221F1D]/10 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#AB9677]/10 text-[#AB9677] flex items-center justify-center mb-3">
                  <Leaf className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-base font-semibold tracking-wide">Fórmula 20-Free</h4>
                <p className="text-xs text-[#221F1D]/60 mt-1 max-w-[200px]">Sin químicos tóxicos ni sulfatos agresivos para la lámina.</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#AB9677]/10 text-[#AB9677] flex items-center justify-center mb-3">
                  <Clock className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-base font-semibold tracking-wide">Puntualidad Absoluta</h4>
                <p className="text-xs text-[#221F1D]/60 mt-1 max-w-[200px]">Cálculo matemático de cada extra para cero esperas.</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#AB9677]/10 text-[#AB9677] flex items-center justify-center mb-3">
                  <Award className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-base font-semibold tracking-wide">Especialistas Tituladas</h4>
                <p className="text-xs text-[#221F1D]/60 mt-1 max-w-[200px]">Técnicas certificadas en manicura rusa y nail art.</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#AB9677]/10 text-[#AB9677] flex items-center justify-center mb-3">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-base font-semibold tracking-wide">Esterilización Hospitalaria</h4>
                <p className="text-xs text-[#221F1D]/60 mt-1 max-w-[200px]">Autoclave médico y sobres individuales para cada clienta.</p>
              </div>
            </div>
          </section>

          {/* CATÁLOGO DE TRATAMIENTOS INTERACTIVO */}
          <section id="carta-servicios" className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#AB9677]">
                  Carta Exclusiva
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight mt-2 text-[#221F1D]">
                  Tratamientos de Uñas & Spa
                </h2>
              </div>

              {/* Filtros de Categoría */}
              <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
                {[
                  { id: "todos", label: "Todos" },
                  { id: "manicura", label: "Manicura" },
                  { id: "pedicura", label: "Pedicura" },
                  { id: "nailart", label: "Nail Art" },
                  { id: "tratamientos", label: "Tratamientos" },
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setCategoryFilter(cat.id)}
                    className={`text-xs uppercase tracking-wider px-4 py-2 rounded-full font-medium transition-all ${
                      categoryFilter === cat.id 
                        ? "bg-[#221F1D] text-white" 
                        : "bg-white text-[#221F1D]/70 border border-black/10 hover:border-[#AB9677] hover:text-[#221F1D]"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid de Servicios */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map(service => (
                <div 
                  key={service.id}
                  className="group bg-white rounded-2xl border border-black/8 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <div className="relative h-64 overflow-hidden bg-[#F6F1E7]">
                    <img 
                      src={service.imgUrl} 
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    {service.tag && (
                      <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[#221F1D] text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow-sm">
                        {service.tag}
                      </span>
                    )}
                    <div className="absolute bottom-4 right-4 bg-[#221F1D]/80 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#AB9677]" />
                      {service.duration} min
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-baseline justify-between mb-2">
                        <h3 className="font-serif text-xl font-medium tracking-tight text-[#221F1D] group-hover:text-[#AB9677] transition-colors">
                          {service.name}
                        </h3>
                        <span className="font-serif text-xl font-semibold text-[#221F1D]">
                          {service.price}€
                        </span>
                      </div>
                      <p className="text-xs text-[#221F1D]/70 leading-relaxed">
                        {service.desc}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-black/5 flex items-center justify-between">
                      <span className="text-[11px] text-[#AB9677] font-semibold uppercase tracking-wider">
                        Incluye limado y nutrición
                      </span>
                      <button
                        onClick={() => {
                          setSelectedService(service);
                          setActiveTab("reserva");
                        }}
                        className="bg-[#AB9677] hover:bg-[#978163] text-white text-[11px] uppercase tracking-wider font-semibold px-4 py-2 rounded-full transition-colors flex items-center gap-1.5"
                      >
                        Reservar <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* BANNER INFORMATIVO HELLO NAILS STYLE */}
          <section className="bg-[#FAF7F2] border-y border-black/10 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-xl">
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#AB9677]">
                  Diseño & Tecnología
                </span>
                <h3 className="font-serif text-3xl font-normal tracking-tight mt-1 text-[#221F1D]">
                  ¿Quieres comparar con el diseño original?
                </h3>
                <p className="text-xs text-[#221F1D]/70 mt-3 leading-relaxed">
                  Incorporamos la previsualización directa en iframe de la web de Hello Nails para que audites la composición tipográfica, la gama cromática y la experiencia de usuario en tiempo real.
                </p>
              </div>

              <button
                onClick={() => setActiveTab("iframe-hello")}
                className="bg-[#221F1D] hover:bg-black text-white text-xs uppercase tracking-[0.16em] font-semibold px-8 py-4 rounded-full transition-all shadow-md flex items-center gap-2 shrink-0"
              >
                <Eye className="w-4 h-4 text-[#AB9677]" />
                Abrir Iframe Hello Nails
              </button>
            </div>
          </section>
        </main>
      )}

      {/* 5. VISTA DE RESERVA ONLINE CON CALENDARIO SEMANAL Y EXTRAS */}
      {activeTab === "reserva" && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 flex-1 w-full">
          
          {/* Notificación de Reserva Confirmada */}
          {bookingConfirmed && (
            <div className="mb-10 bg-[#FAF7F2] border-2 border-[#AB9677] rounded-2xl p-6 md:p-8 shadow-md">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#AB9677] text-white flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-widest font-bold text-[#AB9677]">
                      ¡Cita Reservada con Éxito!
                    </span>
                    <h2 className="font-serif text-2xl font-semibold text-[#221F1D]">
                      Código de Cita: #{bookingConfirmed.code}
                    </h2>
                  </div>
                </div>

                <button 
                  onClick={() => setBookingConfirmed(null)}
                  className="text-xs text-[#221F1D]/50 hover:text-[#221F1D] p-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-black/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-black/50 block">Clienta:</span>
                  <span className="font-semibold text-sm">{bookingConfirmed.clientName}</span>
                </div>
                <div>
                  <span className="text-black/50 block">Servicio:</span>
                  <span className="font-semibold text-sm">{bookingConfirmed.service}</span>
                </div>
                <div>
                  <span className="text-black/50 block">Día y Hora:</span>
                  <span className="font-semibold text-sm">{bookingConfirmed.date} a las {bookingConfirmed.time}</span>
                </div>
                <div>
                  <span className="text-black/50 block">Duración & Total:</span>
                  <span className="font-semibold text-sm text-[#AB9677]">{bookingConfirmed.totalDuration} min · {bookingConfirmed.totalPrice}€</span>
                </div>
              </div>

              {bookingConfirmed.extras.length > 0 && (
                <div className="mt-4 pt-3 border-t border-black/5 text-xs text-black/70">
                  <span className="font-medium text-black">Extras añadidos:</span> {bookingConfirmed.extras.join(", ")}
                </div>
              )}
            </div>
          )}

          <div className="mb-8">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#AB9677]">
              Paso a Paso
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight mt-1 text-[#221F1D]">
              Configura tu Cita & Extras
            </h1>
            <p className="text-xs text-[#221F1D]/70 mt-2">
              Selecciona tu tratamiento base, añade los extras que necesites y el calendario calculará automáticamente el tiempo exacto en cabina.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* COLUMNA IZQUIERDA: SERVICIO, EXTRAS Y CALENDARIO SEMANAL (8 COLS) */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* 1. Selector de Servicio Base */}
              <div className="bg-white rounded-2xl border border-black/8 p-6 shadow-sm">
                <h3 className="font-serif text-lg font-medium mb-4 flex items-center justify-between">
                  <span>1. Selecciona Tratamiento Base</span>
                  <span className="text-xs font-sans text-[#AB9677] font-semibold uppercase tracking-wider">Obligatorio</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SERVICES.map(s => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelectedService(s)}
                      className={`p-4 rounded-xl text-left border transition-all flex flex-col justify-between ${
                        selectedService.id === s.id 
                          ? "border-[#AB9677] bg-[#FAF7F2] ring-1 ring-[#AB9677]" 
                          : "border-black/10 hover:border-black/20 bg-white"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-serif font-medium text-base text-[#221F1D]">{s.name}</span>
                          <span className="font-semibold text-sm text-[#AB9677]">{s.price}€</span>
                        </div>
                        <p className="text-[11px] text-[#221F1D]/60 line-clamp-2">{s.desc}</p>
                      </div>
                      <div className="mt-3 text-[10px] font-medium text-black/50 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#AB9677]" /> Base: {s.duration} min
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Selector de Extras Dinámicos */}
              <div className="bg-white rounded-2xl border border-black/8 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif text-lg font-medium">
                    2. Extras & Cuidados Adicionales
                  </h3>
                  <span className="text-xs text-black/50">
                    Suma tiempo y previene solapamiento
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
                            ? "border-[#AB9677] bg-[#FAF7F2]" 
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
                            <span className="text-xs font-semibold text-[#221F1D] block">{extra.name}</span>
                            <span className="text-[11px] text-black/50 block">{extra.desc}</span>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-xs font-bold text-[#221F1D]">+{extra.price}€</span>
                          <span className="text-[10px] text-[#AB9677] font-medium block">+{extra.duration} min</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 3. Calendario Semanal y Horas Disponibles */}
              <div className="bg-white rounded-2xl border border-black/8 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif text-lg font-medium flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-[#AB9677]" /> 
                    3. Agenda Semanal & Horas Libres
                  </h3>
                  <span className="text-xs text-black/50">Semana del 26 Oct al 01 Nov</span>
                </div>

                {/* Días de la Semana */}
                <div className="grid grid-cols-7 gap-2 mb-6">
                  {WEEK_DAYS.map(day => {
                    const isSelected = selectedDate === day.fullDate;
                    const isSunday = day.name === "Dom";
                    return (
                      <button
                        key={day.fullDate}
                        disabled={isSunday}
                        onClick={() => setSelectedDate(day.fullDate)}
                        className={`p-2.5 rounded-xl text-center border transition-all ${
                          isSunday 
                            ? "opacity-40 cursor-not-allowed bg-black/5 border-transparent"
                            : isSelected 
                              ? "border-[#AB9677] bg-[#221F1D] text-white shadow-sm" 
                              : "border-black/10 hover:border-[#AB9677] bg-white text-[#221F1D]"
                        }`}
                      >
                        <span className="block text-[10px] uppercase font-bold tracking-wider opacity-70">
                          {day.name}
                        </span>
                        <span className="block text-xs font-semibold mt-0.5">
                          {day.date.split(" ")[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Huecos Horarios */}
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="font-medium text-[#221F1D]">Horas disponibles para el día seleccionado:</span>
                    <div className="flex items-center gap-4 text-[11px] text-black/60">
                      <span className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-white border border-black/30"></span> Libre
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-black/15"></span> Bloqueado
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                    {TIME_SLOTS.map(slot => {
                      const blocked = isSlotBlocked(selectedDate, slot);
                      const isSelected = selectedTime === slot && !blocked;

                      return (
                        <button
                          key={slot}
                          type="button"
                          disabled={blocked}
                          onClick={() => setSelectedTime(slot)}
                          className={`py-3 px-2 rounded-xl text-xs font-semibold border transition-all ${
                            blocked 
                              ? "bg-black/5 text-black/30 border-transparent cursor-not-allowed line-through" 
                              : isSelected 
                                ? "bg-[#AB9677] text-white border-[#AB9677] shadow-sm" 
                                : "bg-white text-[#221F1D] border-black/10 hover:border-[#AB9677]"
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* COLUMNA DERECHA: RESUMEN DE RESERVA Y CONFIRMACIÓN (4 COLS) */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 bg-white rounded-2xl border border-black/10 p-6 shadow-md">
                <span className="text-[10px] uppercase tracking-widest font-bold text-[#AB9677]">
                  Tu Cita en Resumen
                </span>
                <h3 className="font-serif text-2xl font-medium tracking-tight text-[#221F1D] mt-1 mb-6">
                  Ticket de Reserva
                </h3>

                {/* Detalle Servicio */}
                <div className="space-y-4 text-xs pb-6 border-b border-black/10">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-semibold text-sm text-[#221F1D] block">{selectedService.name}</span>
                      <span className="text-black/50 text-[11px]">Tratamiento Base · {selectedService.duration} min</span>
                    </div>
                    <span className="font-serif text-base font-semibold">{selectedService.price}€</span>
                  </div>

                  {/* Extras Seleccionados */}
                  {selectedExtras.length > 0 && (
                    <div className="pt-2 space-y-2">
                      <span className="text-[10px] uppercase tracking-wider text-black/40 font-bold block">
                        Extras Incluidos:
                      </span>
                      {selectedExtras.map(id => {
                        const ex = EXTRAS.find(e => e.id === id);
                        if (!ex) return null;
                        return (
                          <div key={id} className="flex items-center justify-between text-[11px] text-[#221F1D]/80">
                            <span>+ {ex.name} ({ex.duration}m)</span>
                            <span className="font-medium">+{ex.price}€</span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Horario y Fecha */}
                  <div className="bg-[#FAF7F2] p-3 rounded-xl border border-black/5 mt-4 space-y-1 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-black/50">Fecha:</span>
                      <span className="font-semibold">{selectedDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-black/50">Hora inicio:</span>
                      <span className="font-semibold">{selectedTime} hrs</span>
                    </div>
                    <div className="flex justify-between text-[#AB9677] font-semibold pt-1 border-t border-black/5">
                      <span>Tiempo total cabina:</span>
                      <span>{totalDuration} minutos</span>
                    </div>
                  </div>
                </div>

                {/* Total Económico */}
                <div className="py-4 border-b border-black/10 flex items-baseline justify-between">
                  <span className="font-serif text-lg">Total Estimado</span>
                  <div className="text-right">
                    <span className="font-serif text-3xl font-bold text-[#AB9677]">{totalPrice}€</span>
                    <span className="text-[10px] text-black/40 block">IVA 21% incluido</span>
                  </div>
                </div>

                {/* Formulario de Datos de Contacto */}
                <form onSubmit={handleConfirmBooking} className="mt-6 space-y-4">
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
                        placeholder="+34 600 000 000"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 text-xs bg-[#FDFBF7] border border-black/15 rounded-xl focus:outline-none focus:border-[#AB9677]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 bg-[#221F1D] hover:bg-black text-white text-xs uppercase tracking-[0.16em] font-semibold py-4 rounded-full transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#AB9677]" />
                    Confirmar Reserva ({totalPrice}€)
                  </button>
                </form>

                <p className="text-[10px] text-center text-black/40 mt-4">
                  Cancelación gratuita hasta 24h antes de la cita.
                </p>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* FOOTER MINIMALISTA */}
      <footer className="bg-[#221F1D] text-white/70 py-12 border-t border-black/20 text-xs mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#AB9677] text-white flex items-center justify-center font-serif text-base">
              S
            </div>
            <div>
              <span className="font-serif text-lg tracking-widest text-white block">SAMM NAIL STUDIO</span>
              <span className="text-[10px] text-white/50 tracking-wider">Belleza de autor · Madrid / Lima</span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-[11px] tracking-wider uppercase">
            <button onClick={() => setActiveTab("salon")} className="hover:text-white transition-colors">Carta</button>
            <button onClick={() => setActiveTab("reserva")} className="hover:text-white transition-colors">Reserva Online</button>
            <button onClick={() => setActiveTab("iframe-hello")} className="hover:text-white transition-colors">Ver Hello Nails</button>
          </div>

          <p className="text-[11px] text-white/40">
            © 2026 Samm Nail Studio. Todos los derechos reservados.
          </p>
        </div>
      </footer>

    </div>
  );
}
