"use client";

import { useState } from "react";
import { 
  Sparkles, 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle2, 
  Bell, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  ShieldCheck, 
  TrendingUp, 
  User, 
  Phone
} from "lucide-react";

// Tipos de Datos
interface Service {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: number; // minutos
  desc: string;
  imgUrl: string;
}

interface Extra {
  id: string;
  name: string;
  price: number;
  duration: number; // minutos adicionales
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

// Catálogo de Servicios Base
const SERVICES: Service[] = [
  {
    id: "s1",
    name: "Manicura Rusa en Seco",
    category: "Técnica Signature",
    price: 55,
    duration: 60,
    desc: "Limpieza anatómica profunda con torno y fresas alemanas. Esmaltado bajo cutícula de 21 días.",
    imgUrl: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: "s2",
    name: "Uñas Soft Gel Tips",
    category: "Estructura Ligera",
    price: 85,
    duration: 90,
    desc: "Extensión con cápsulas flexibles de gel puro adheridas con base protéica. Cero daño a la uña natural.",
    imgUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: "s3",
    name: "Acrílicas Esculpidas de Autor",
    category: "Arquitectura",
    price: 115,
    duration: 120,
    desc: "Construcción milimétrica sobre molde en punta Almendra o Coffin con french fino hecho a pincel.",
    imgUrl: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: "s4",
    name: "Kapping Mineral Protector",
    category: "Nivelación",
    price: 65,
    duration: 75,
    desc: "Blindaje con calcio y gel autonivelante sobre tu propio largo para evitar roturas o descamaciones.",
    imgUrl: "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: "s5",
    name: "Pedicura Spa Rusa Profunda",
    category: "Cuidado Podal",
    price: 70,
    duration: 75,
    desc: "Exfoliación con sales botánicas, retiro de durezas con disco podológico y esmaltado semipermanente.",
    imgUrl: "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=500&auto=format&fit=crop&q=80"
  }
];

// Catálogo de Extras
const EXTRAS_LIST: Extra[] = [
  {
    id: "e1",
    name: "Retiro previo de Acrílico / Gel anterior",
    price: 20,
    duration: 30,
    desc: "Remoción no invasiva con torno sin dañar la queratina natural."
  },
  {
    id: "e2",
    name: "Nail Art elaborado (2 uñas a mano alzada)",
    price: 15,
    duration: 15,
    desc: "Diseño micro-editorial, líneas cromadas o encapsulado."
  },
  {
    id: "e3",
    name: "Nail Art Full Set (10 uñas)",
    price: 40,
    duration: 45,
    desc: "Diseño complejo integral en todas las uñas."
  },
  {
    id: "e4",
    name: "Largo Extra XL (Esculpidas o Soft Gel)",
    price: 20,
    duration: 20,
    desc: "Refuerzo estructural para longitud extrema."
  },
  {
    id: "e5",
    name: "Tratamiento de Parafina & Masaje Sedoso",
    price: 20,
    duration: 15,
    desc: "Nutrición con aceites de jojoba y guante térmico."
  }
];

// Días de la Semana para el Calendario Semanal
const WEEK_DAYS = [
  { day: "Lunes", dateStr: "26 Oct", fullDate: "2026-10-26" },
  { day: "Martes", dateStr: "27 Oct", fullDate: "2026-10-27" },
  { day: "Miércoles", dateStr: "28 Oct", fullDate: "2026-10-28" },
  { day: "Jueves", dateStr: "29 Oct", fullDate: "2026-10-29" },
  { day: "Viernes", dateStr: "30 Oct", fullDate: "2026-10-30" },
  { day: "Sábado", dateStr: "31 Oct", fullDate: "2026-10-31" },
  { day: "Domingo", dateStr: "01 Nov", fullDate: "2026-11-01" },
];

export default function SammNailStudio() {
  // Estado de Navegación de Vistas (Clienta vs Admin)
  const [viewRole, setViewRole] = useState<"client" | "admin">("client");

  // Estado de Reserva Clienta
  const [selectedService, setSelectedService] = useState<Service>(SERVICES[0]);
  const [selectedExtras, setSelectedExtras] = useState<Extra[]>([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("03:00 PM");
  const [clientName, setClientName] = useState<string>("Valeria Silva");
  const [clientPhone, setClientPhone] = useState<string>("987 654 321");

  // Estado de Ticket Confirmado
  const [confirmedTicket, setConfirmedTicket] = useState<Appointment | null>(null);

  // Notificación Push en Pantalla
  const [pushNotification, setPushNotification] = useState<string | null>(null);

  // Lista de Citas en el Dashboard de la Manicurista
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "app-1",
      code: "SAMM-104",
      clientName: "Lucía Benavides",
      clientPhone: "912 345 678",
      service: "Acrílicas Esculpidas de Autor",
      extras: ["Retiro previo"],
      date: "26 Oct",
      time: "10:00 AM",
      totalDuration: 150,
      totalPrice: 135,
      status: "confirmada"
    },
    {
      id: "app-2",
      code: "SAMM-209",
      clientName: "Claudia Morales",
      clientPhone: "987 111 222",
      service: "Uñas Soft Gel Tips",
      extras: ["Nail Art 2 uñas"],
      date: "26 Oct",
      time: "12:45 PM",
      totalDuration: 105,
      totalPrice: 100,
      status: "confirmada"
    }
  ]);

  // Cálculo Dinámico de Tiempos y Precios (Base + Extras)
  const extrasDuration = selectedExtras.reduce((acc, curr) => acc + curr.duration, 0);
  const totalDurationMin = selectedService.duration + extrasDuration;
  const extrasPrice = selectedExtras.reduce((acc, curr) => acc + curr.price, 0);
  const totalPrice = selectedService.price + extrasPrice;

  // Toggle de Selección de Extras
  const toggleExtra = (extra: Extra) => {
    if (selectedExtras.some(e => e.id === extra.id)) {
      setSelectedExtras(selectedExtras.filter(e => e.id !== extra.id));
    } else {
      setSelectedExtras([...selectedExtras, extra]);
    }
  };

  // Franjas horarias con slots ocupados
  const TIME_SLOTS = [
    { time: "10:00 AM", occupied: true, occupant: "Lucía Benavides" },
    { time: "11:30 AM", occupied: true, occupant: "Lucía (en cabina)" },
    { time: "01:00 PM", occupied: false },
    { time: "03:00 PM", occupied: false },
    { time: "05:00 PM", occupied: false },
    { time: "06:30 PM", occupied: false },
    { time: "08:00 PM", occupied: false },
  ];

  // Ejecución de Reserva en Web (Sin WhatsApp)
  const handleConfirmBooking = () => {
    const code = "SAMM-" + Math.floor(1000 + Math.random() * 9000);
    const newAppointment: Appointment = {
      id: "app-" + Date.now(),
      code,
      clientName: clientName || "Clienta Frecuente",
      clientPhone: clientPhone || "999 000 000",
      service: selectedService.name,
      extras: selectedExtras.map(e => e.name),
      date: WEEK_DAYS[selectedDayIndex].dateStr,
      time: selectedTimeSlot,
      totalDuration: totalDurationMin,
      totalPrice: totalPrice,
      status: "confirmada"
    };

    // 1. Mostrar modal de ticket a la clienta
    setConfirmedTicket(newAppointment);

    // 2. Insertar en la lista del admin
    setAppointments(prev => [...prev, newAppointment]);

    // 3. Disparar Notificación Push simulada con alerta sonora
    const alertMsg = `¡Nueva Reserva Sincronizada! ${newAppointment.clientName} agendó ${newAppointment.service} (${totalDurationMin} min) por S/ ${totalPrice.toFixed(2)}`;
    setPushNotification(alertMsg);

    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.frequency.value = 920;
      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.18);
    } catch {}

    setTimeout(() => {
      setPushNotification(null);
    }, 6000);
  };

  // Métricas del Dashboard
  const todayRevenue = appointments.reduce((acc, curr) => acc + curr.totalPrice, 0);
  const totalCabinaHours = (appointments.reduce((acc, curr) => acc + curr.totalDuration, 0) / 60).toFixed(1);

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f4] text-[#191614]">
      
      {/* BARRA SUPERIOR DE CONMUTACIÓN DE ROLES (DEMO SWITCHER) */}
      <div className="sticky top-0 z-50 bg-[#161311] text-white px-4 md:px-8 py-3 border-b border-[#c2883e]/40 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#c2883e] to-[#ebd5b3] text-[#161311] flex items-center justify-center font-bold text-sm">
            S
          </div>
          <div>
            <span className="font-serif-title text-lg tracking-wide text-[#f7f1e5]">Samm Nail Studio</span>
            <span className="hidden sm:inline-block ml-2 text-[10px] text-[#34d399] tracking-wider uppercase font-semibold">
              ● Sincronización en Vivo (Lima)
            </span>
          </div>
        </div>

        <div className="flex bg-white/10 p-1 rounded-full text-xs">
          <button
            onClick={() => setViewRole("client")}
            className={`px-4 py-1.5 rounded-full font-accent text-[11px] uppercase tracking-wider font-semibold transition-all ${
              viewRole === "client" ? "bg-[#4a151b] text-white shadow-sm" : "text-stone-400 hover:text-white"
            }`}
          >
            Vista Clienta
          </button>
          <button
            onClick={() => setViewRole("admin")}
            className={`px-4 py-1.5 rounded-full font-accent text-[11px] uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 ${
              viewRole === "admin" ? "bg-[#4a151b] text-white shadow-sm" : "text-stone-400 hover:text-white"
            }`}
          >
            Panel Admin (Dueña)
            <span className="w-2 h-2 rounded-full bg-[#34d399] animate-pulse"></span>
          </button>
        </div>
      </div>

      {/* TOAST DE NOTIFICACIÓN PUSH */}
      {pushNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#191614] text-white border border-[#c2883e] rounded-xl p-4 shadow-2xl flex items-center gap-3 max-w-md animate-bounce">
          <div className="w-10 h-10 rounded-full bg-[#4a151b] flex items-center justify-center text-[#ebd5b3] shrink-0">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-accent text-xs tracking-wider uppercase text-[#c2883e] font-bold">¡Nueva Cita Confirmada!</h4>
            <p className="text-xs text-stone-300 mt-0.5 leading-snug">{pushNotification}</p>
          </div>
        </div>
      )}

      {/* MODAL DE TICKET CONFIRMADO PARA LA CLIENTA */}
      {confirmedTicket && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-center border-2 border-[#ebd5b3] shadow-2xl relative">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            
            <h3 className="font-serif-title text-3xl text-[#191614]">¡Cita Confirmada con Éxito!</h3>
            <p className="text-xs text-stone-500 mt-1">Tu turno está blindado en la base de datos de Samm Studio.</p>

            <div className="my-4 inline-block bg-[#f6f1e7] border border-[#ebd5b3] text-[#4a151b] px-4 py-1.5 rounded-lg font-accent font-bold tracking-widest text-sm">
              CÓDIGO: {confirmedTicket.code}
            </div>

            <div className="bg-[#fbf9f4] border border-stone-200 rounded-xl p-4 text-left text-xs space-y-2 mb-5">
              <div className="flex justify-between">
                <span className="text-stone-500">Titular:</span>
                <span className="font-semibold text-stone-900">{confirmedTicket.clientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Servicio Principal:</span>
                <span className="font-semibold text-stone-900">{confirmedTicket.service}</span>
              </div>
              {confirmedTicket.extras.length > 0 && (
                <div className="flex justify-between">
                  <span className="text-stone-500">Extras:</span>
                  <span className="font-semibold text-[#4a151b]">{confirmedTicket.extras.join(", ")}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-stone-500">Tiempo total en cabina:</span>
                <span className="font-semibold text-stone-900">{confirmedTicket.totalDuration} minutos</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Fecha y Hora:</span>
                <span className="font-semibold text-stone-900">{confirmedTicket.date} · {confirmedTicket.time}</span>
              </div>
              <div className="border-t border-stone-200 pt-2 flex justify-between items-baseline">
                <span className="font-bold text-stone-800">Total a abonar en el local:</span>
                <span className="font-serif-title text-xl text-[#4a151b] font-bold">S/ {confirmedTicket.totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  setConfirmedTicket(null);
                  setViewRole("admin");
                }}
                className="w-full bg-[#4a151b] hover:bg-[#681f28] text-white py-3 rounded-xl font-accent text-xs uppercase tracking-widest font-bold transition-all shadow-md"
              >
                Ver Notificación en el Panel de la Dueña →
              </button>
              <button
                onClick={() => setConfirmedTicket(null)}
                className="w-full bg-stone-100 hover:bg-stone-200 text-stone-700 py-2.5 rounded-xl font-accent text-xs uppercase tracking-wider font-semibold"
              >
                Cerrar comprobante
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          VISTA 1: CLIENTA (RESERVA CON CALENDARIO SEMANAL & EXTRAS)
          ========================================================= */}
      {viewRole === "client" && (
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex-grow w-full">
          
          {/* Header Editorial */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-block font-accent text-[11px] tracking-widest uppercase text-[#4a151b] bg-[#4a151b]/10 border border-[#4a151b]/20 px-3 py-1 rounded-full font-bold mb-3">
              Estudio Miraflores · Agenda Semanal
            </span>
            <h1 className="font-serif-title text-4xl sm:text-5xl font-normal leading-tight text-[#191614]">
              Elige tu técnica & tus extras, <em className="italic text-[#4a151b]">agenda tu tiempo real</em>
            </h1>
            <p className="text-stone-600 text-sm mt-3 font-light leading-relaxed">
              Calculamos la duración exacta según tus requerimientos para reservar el bloque adecuado en cabina sin retrasos.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Columna Izquierda: Selección de Servicios, Extras y Calendario */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* PASO 1: SERVICIO BASE */}
              <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-accent text-xs tracking-wider uppercase font-bold text-stone-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#191614] text-white flex items-center justify-center text-[10px]">1</span>
                    Selecciona tu Servicio Base
                  </h3>
                  <span className="text-[11px] text-stone-500 font-medium">Precios en Soles (S/)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SERVICES.map((srv) => {
                    const isSelected = selectedService.id === srv.id;
                    return (
                      <div
                        key={srv.id}
                        onClick={() => setSelectedService(srv)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? "bg-[#fdfaf7] border-[#4a151b] ring-1 ring-[#4a151b]"
                            : "bg-white border-stone-200 hover:border-stone-400"
                        }`}
                      >
                        <div className="flex gap-3">
                          <img src={srv.imgUrl} alt={srv.name} className="w-16 h-16 rounded-lg object-cover shrink-0" />
                          <div className="flex-grow">
                            <span className="text-[10px] font-accent uppercase tracking-wider text-[#c2883e] font-bold block">
                              {srv.category}
                            </span>
                            <h4 className="font-serif-title text-base font-semibold text-stone-900 leading-tight">
                              {srv.name}
                            </h4>
                            <span className="text-xs text-[#4a151b] font-bold font-accent mt-1 block">
                              S/ {srv.price.toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-stone-100 text-[11px] text-stone-500">
                          <span className="flex items-center gap-1 font-medium">
                            <Clock className="w-3 h-3" /> {srv.duration} min
                          </span>
                          <span className={`font-accent text-[10px] uppercase font-bold ${isSelected ? "text-[#4a151b]" : "text-stone-400"}`}>
                            {isSelected ? "Seleccionado" : "Elegir"}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* PASO 2: EXTRAS (LOS QUE SUMAN TIEMPO REAL) */}
              <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-accent text-xs tracking-wider uppercase font-bold text-stone-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#191614] text-white flex items-center justify-center text-[10px]">2</span>
                    Añade Extras & Adicionales (Suman tiempo en cabina)
                  </h3>
                  <span className="text-[11px] text-[#4a151b] font-semibold">
                    +{extrasDuration} min acumulados
                  </span>
                </div>

                <div className="space-y-2.5">
                  {EXTRAS_LIST.map((ext) => {
                    const isChecked = selectedExtras.some(e => e.id === ext.id);
                    return (
                      <div
                        key={ext.id}
                        onClick={() => toggleExtra(ext)}
                        className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                          isChecked 
                            ? "bg-[#fbf6ee] border-[#c2883e] ring-1 ring-[#c2883e]" 
                            : "bg-white border-stone-200 hover:border-stone-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded flex items-center justify-center text-xs transition-colors ${
                            isChecked ? "bg-[#4a151b] text-white" : "border border-stone-300 bg-white"
                          }`}>
                            {isChecked && "✓"}
                          </div>
                          <div>
                            <h4 className="text-xs font-semibold text-stone-900">{ext.name}</h4>
                            <p className="text-[11px] text-stone-500 font-light">{ext.desc}</p>
                          </div>
                        </div>
                        <div className="text-right shrink-0 ml-3">
                          <span className="text-xs font-bold text-stone-900 block font-accent">+S/ {ext.price.toFixed(2)}</span>
                          <span className="text-[10px] text-stone-500 font-medium">+{ext.duration} min</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* PASO 3: CALENDARIO SEMANAL & HORARIOS */}
              <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-accent text-xs tracking-wider uppercase font-bold text-stone-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#191614] text-white flex items-center justify-center text-[10px]">3</span>
                    Calendario Semanal & Huecos Disponibles
                  </h3>
                  <span className="text-[11px] text-emerald-800 font-medium bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Calculando para {totalDurationMin} min libres
                  </span>
                </div>

                {/* Navegador de Semana */}
                <div className="flex items-center justify-between bg-[#fbf9f4] border border-stone-200 rounded-xl p-2.5 mb-4">
                  <button className="p-1 hover:bg-stone-200 rounded-md text-stone-600 transition-colors">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="font-accent text-xs font-bold uppercase tracking-wider text-stone-800">
                    Semana del 26 Oct al 01 Nov · 2026
                  </span>
                  <button className="p-1 hover:bg-stone-200 rounded-md text-stone-600 transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Días de la semana */}
                <div className="grid grid-cols-7 gap-1.5 text-center mb-5">
                  {WEEK_DAYS.map((wd, idx) => {
                    const isDaySelected = selectedDayIndex === idx;
                    return (
                      <div
                        key={idx}
                        onClick={() => setSelectedDayIndex(idx)}
                        className={`p-2 rounded-xl cursor-pointer transition-all border ${
                          isDaySelected
                            ? "bg-[#4a151b] text-white border-[#4a151b] shadow-sm"
                            : "bg-white border-stone-200 hover:border-stone-400 text-stone-700"
                        }`}
                      >
                        <span className={`block text-[9px] uppercase font-accent font-bold ${isDaySelected ? "text-stone-300" : "text-stone-400"}`}>
                          {wd.day.slice(0, 3)}
                        </span>
                        <span className="block font-serif-title text-base sm:text-lg font-bold leading-tight mt-0.5">
                          {wd.dateStr.split(" ")[0]}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Bloques de Hora */}
                <div>
                  <span className="block text-[11px] font-accent uppercase tracking-wider text-stone-500 font-semibold mb-2">
                    Horarios con tiempo continuo suficiente ({totalDurationMin} min)
                  </span>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {TIME_SLOTS.map((slot, sIdx) => {
                      const isChosen = selectedTimeSlot === slot.time && !slot.occupied;
                      return (
                        <button
                          key={sIdx}
                          disabled={slot.occupied}
                          onClick={() => setSelectedTimeSlot(slot.time)}
                          className={`py-2 px-1 rounded-lg text-xs font-accent font-semibold transition-all border ${
                            slot.occupied
                              ? "bg-stone-100 border-stone-200 text-stone-400 line-through cursor-not-allowed"
                              : isChosen
                              ? "bg-[#c2883e] text-white border-[#c2883e] shadow-sm font-bold"
                              : "bg-white border-stone-200 hover:border-stone-400 text-stone-700"
                          }`}
                        >
                          {slot.time}
                          {slot.occupied && <span className="block text-[8px] no-underline font-normal text-rose-700">Ocupado</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* PASO 4: DATOS DE LA CLIENTA */}
              <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
                <h3 className="font-accent text-xs tracking-wider uppercase font-bold text-stone-900 mb-4 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#191614] text-white flex items-center justify-center text-[10px]">4</span>
                  Tus Datos de Contacto
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1">Nombre Completo</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full bg-[#fbf9f4] border border-stone-200 rounded-xl pl-9 pr-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-[#4a151b]"
                        placeholder="Ej: Valeria Silva"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1">Celular / WhatsApp (Perú)</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                      <input
                        type="tel"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full bg-[#fbf9f4] border border-stone-200 rounded-xl pl-9 pr-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-[#4a151b]"
                        placeholder="987 654 321"
                      />
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Columna Derecha: Sticky Summary Card & Botón de Confirmación Web */}
            <div className="sticky top-20">
              <div className="bg-white border border-[#ebd5b3] rounded-2xl p-6 shadow-lg shadow-[#c2883e]/5">
                <h3 className="font-serif-title text-2xl text-stone-900 pb-3 border-b border-stone-100">
                  Resumen de tu Cita
                </h3>

                <div className="space-y-3 py-4 text-xs border-b border-stone-100">
                  <div className="flex justify-between items-start">
                    <span className="text-stone-500">Servicio Base:</span>
                    <span className="font-semibold text-stone-900 text-right">{selectedService.name}</span>
                  </div>

                  {selectedExtras.length > 0 && (
                    <div className="flex justify-between items-start">
                      <span className="text-stone-500">Extras ({selectedExtras.length}):</span>
                      <span className="font-semibold text-[#4a151b] text-right max-w-[170px]">
                        {selectedExtras.map(e => e.name).join(", ")}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span className="text-stone-500">Tiempo total en cabina:</span>
                    <span className="font-semibold text-stone-900">{totalDurationMin} minutos</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-stone-500">Fecha agendada:</span>
                    <span className="font-semibold text-stone-900">{WEEK_DAYS[selectedDayIndex].day}, {WEEK_DAYS[selectedDayIndex].dateStr}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-stone-500">Horario de inicio:</span>
                    <span className="font-semibold text-[#c2883e] font-accent text-sm">{selectedTimeSlot}</span>
                  </div>
                </div>

                <div className="py-4 flex justify-between items-baseline">
                  <span className="font-accent text-xs uppercase font-bold text-stone-700">Total a abonar</span>
                  <span className="font-serif-title text-3xl font-bold text-[#4a151b]">
                    S/ {totalPrice.toFixed(2)}
                  </span>
                </div>

                <div className="bg-[#fbf6ee] border border-[#ebd5b3] rounded-xl p-3 text-[11px] text-stone-700 leading-relaxed mb-5">
                  🛡️ <strong>Confirmación 100% Web:</strong> Tu turno se reserva en la base de datos de inmediato. Pagas directamente en el estudio al terminar (Efectivo, Plin o Yape).
                </div>

                <button
                  onClick={handleConfirmBooking}
                  className="w-full bg-[#191614] hover:bg-[#4a151b] text-white py-3.5 rounded-xl font-accent text-xs uppercase tracking-widest font-bold transition-all shadow-md active:scale-95"
                >
                  Confirmar Reserva en la Web
                </button>
              </div>
            </div>

          </div>
        </main>
      )}

      {/* =========================================================
          VISTA 2: ADMIN DASHBOARD (CENTRO DE CONTROL DE LA DUEÑA)
          ========================================================= */}
      {viewRole === "admin" && (
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex-grow w-full">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-200 mb-8 gap-4">
            <div>
              <span className="font-accent text-[11px] tracking-wider uppercase text-[#c2883e] font-bold">
                Panel de Administración · Miraflores
              </span>
              <h1 className="font-serif-title text-3xl sm:text-4xl text-stone-900 mt-1">
                Buenos días, Camila 💅
              </h1>
              <p className="text-xs text-stone-500 mt-1">Centro de control operativo con sincronización de citas en tiempo real.</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setPushNotification("Simulación: Notificación push recibida desde la web.")}
                className="bg-white border border-stone-300 hover:border-stone-400 text-stone-700 px-3 py-2 rounded-xl text-xs font-accent font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Bell className="w-3.5 h-3.5 text-[#c2883e]" /> Probar Notificación
              </button>
              <button
                onClick={() => alert("Función para bloquear turnos personales o descansos.")}
                className="bg-[#191614] hover:bg-[#4a151b] text-white px-3.5 py-2 rounded-xl text-xs font-accent uppercase tracking-wider font-bold flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" /> Bloquear Horario
              </button>
            </div>
          </div>

          {/* Tarjetas de Métricas del Día */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-sm">
              <span className="block font-accent text-[10px] uppercase tracking-wider text-stone-400 font-bold mb-1">
                Citas para hoy
              </span>
              <span className="font-serif-title text-3xl font-bold text-stone-900">{appointments.length}</span>
              <span className="block text-[11px] text-emerald-800 mt-1 font-medium">● Todas confirmadas en web</span>
            </div>

            <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-sm">
              <span className="block font-accent text-[10px] uppercase tracking-wider text-stone-400 font-bold mb-1">
                Caja proyectada (Hoy)
              </span>
              <span className="font-serif-title text-3xl font-bold text-emerald-800">S/ {todayRevenue.toFixed(2)}</span>
              <span className="block text-[11px] text-stone-400 mt-1 font-medium">A cobrar en local</span>
            </div>

            <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-sm">
              <span className="block font-accent text-[10px] uppercase tracking-wider text-stone-400 font-bold mb-1">
                Horas en Cabina
              </span>
              <span className="font-serif-title text-3xl font-bold text-stone-900">{totalCabinaHours} hrs</span>
              <span className="block text-[11px] text-stone-400 mt-1 font-medium">Tiempo productivo</span>
            </div>

            <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-sm">
              <span className="block font-accent text-[10px] uppercase tracking-wider text-stone-400 font-bold mb-1">
                Base de Datos
              </span>
              <span className="font-serif-title text-2xl font-bold text-emerald-800">EN VIVO</span>
              <span className="block text-[11px] text-stone-400 mt-1 font-medium">0 huecos solapados</span>
            </div>
          </div>

          {/* Tabla de Agenda en Vivo */}
          <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-stone-100 flex items-center justify-between bg-[#fdfcfb]">
              <h3 className="font-accent text-xs uppercase tracking-wider font-bold text-stone-800">
                Agenda Activa · Hoy 26 de Octubre
              </h3>
              <span className="text-[11px] text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Sincronización Web Push Activa
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-100 text-stone-500 font-accent uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-4">Horario</th>
                    <th className="py-3 px-4">Código</th>
                    <th className="py-3 px-4">Clienta</th>
                    <th className="py-3 px-4">Servicio & Extras</th>
                    <th className="py-3 px-4">Duración</th>
                    <th className="py-3 px-4">Precio</th>
                    <th className="py-3 px-4">Estado</th>
                    <th className="py-3 px-4">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {appointments.map((app) => (
                    <tr key={app.id} className="hover:bg-stone-50/60 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-stone-900">{app.time}</td>
                      <td className="py-3.5 px-4 font-mono text-stone-500 text-[11px]">{app.code}</td>
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-stone-900 block">{app.clientName}</span>
                        <span className="text-stone-400 text-[11px]">+51 {app.clientPhone}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-medium text-stone-800 block">{app.service}</span>
                        {app.extras && app.extras.length > 0 && (
                          <span className="text-[10px] text-[#4a151b] font-medium block">
                            +{app.extras.join(", ")}
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-stone-600">{app.totalDuration} min</td>
                      <td className="py-3.5 px-4 font-bold text-stone-900">S/ {app.totalPrice.toFixed(2)}</td>
                      <td className="py-3.5 px-4">
                        <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-accent uppercase font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {app.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => alert(`Cita ${app.code} marcada como completada y cobrada.`)}
                          className="border border-stone-200 hover:border-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 px-2.5 py-1 rounded text-[11px] font-accent font-semibold transition-colors"
                        >
                          ✓ Cobrada
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      )}

      {/* Footer Minimalista */}
      <footer className="border-t border-stone-200 py-6 px-4 text-center text-xs text-stone-400 mt-auto bg-white">
        Samm Nail Studio · Calle Esperanza 184, Miraflores, Lima · Atención por cita previa
      </footer>

    </div>
  );
}
