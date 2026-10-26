"use client";

import { Sparkles, Calendar, ArrowRight, ShieldCheck } from "lucide-react";

interface HeroCinematicProps {
  onOpenBooking: () => void;
  onExploreCatalog: () => void;
}

export function HeroCinematic({ onOpenBooking, onExploreCatalog }: HeroCinematicProps) {
  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#181412] text-[#FAF8F5]">
      {/* Video Background Loop con fallback póster en alta resolución */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=1920&q=80"
          className="w-full h-full object-cover opacity-35 filter brightness-90 saturate-85 scale-105 transform animate-fade-in transition-all duration-1000"
        >
          {/* Video libre de derechos enfocado en manicura y cuidado de manos */}
          <source 
            src="https://assets.mixkit.co/videos/preview/mixkit-woman-getting-a-manicure-treatment-41376-large.mp4" 
            type="video/mp4" 
          />
        </video>
        {/* Capas de gradientes para asegurar legibilidad cinematográfica */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#181412] via-black/40 to-black/60" />
        <div className="absolute inset-0 bg-radial from-transparent via-black/30 to-black/80" />
      </div>

      {/* Contenido Editorial Flotante */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center py-20 lg:py-28 flex flex-col items-center">
        
        {/* Badge Superior */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#EAD8CE] text-xs uppercase tracking-[0.25em] font-medium mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#C8927B]" />
          <span>Atelier de Estética Ungueal · Callao</span>
        </div>

        {/* Título Principal Tipografía Serif Editorial */}
        <h1 
          className="text-4xl sm:text-6xl lg:text-7xl font-light text-[#FAF8F5] tracking-tight leading-[1.08] mb-6 max-w-4xl"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          El arte de la manicura rusa y el cuidado anatómico de tus uñas.
        </h1>

        {/* Bajada Descriptiva */}
        <p className="text-sm sm:text-base lg:text-lg text-[#D2C5BE] max-w-2xl leading-relaxed font-light mb-10">
          Experiencias de 2 horas cerradas y personalizadas. Sin tiempos acelerados ni cortes agresivos: fortalecimiento con Rubber, Kapping y acabados de alta costura ungueal.
        </p>

        {/* Botones CTA Principales */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#FAF8F5] text-[#181412] hover:bg-[#EAD8CE] transition-all flex items-center justify-center gap-2.5 text-sm font-semibold shadow-xl shadow-black/30 group"
          >
            <span>Reservar Cita Online</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          
          <button
            onClick={onExploreCatalog}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/15 text-[#FAF8F5] backdrop-blur-md border border-white/20 transition-all text-sm font-medium"
          >
            Ver Catálogo & Precios
          </button>
        </div>

        {/* Micro-sello de confianza inferior */}
        <div className="mt-14 inline-flex items-center gap-2 text-xs text-[#A89C96]">
          <ShieldCheck className="w-4 h-4 text-[#C8927B]" />
          <span>Reserva con 20% de seña para asegurar exclusividad del horario</span>
        </div>

      </div>
    </section>
  );
}
