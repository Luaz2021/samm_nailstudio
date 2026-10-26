"use client";

import { useEffect, useState } from "react";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { DEFAULT_HERO_BG, getActiveLimaThemeState, LimaTheme } from "@/data/catalog";

interface HeroCinematicProps {
  onOpenBooking: () => void;
  onExploreCatalog: () => void;
}

export function HeroCinematic({ onOpenBooking, onExploreCatalog }: HeroCinematicProps) {
  const [heroBg, setHeroBg] = useState<string>(DEFAULT_HERO_BG);
  const [activeTheme, setActiveTheme] = useState<LimaTheme>(() => getActiveLimaThemeState().activeTheme);

  useEffect(() => {
    try {
      const syncFromStorage = () => {
        const storedBg = localStorage.getItem("samm_hero_bg");
        if (storedBg) setHeroBg(storedBg);

        const themeState = getActiveLimaThemeState();
        setActiveTheme(themeState.activeTheme);
      };

      syncFromStorage();
      window.addEventListener("storage", syncFromStorage);
      window.addEventListener("samm-theme-change", syncFromStorage);
      return () => {
        window.removeEventListener("storage", syncFromStorage);
        window.removeEventListener("samm-theme-change", syncFromStorage);
      };
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <section
      className="relative min-h-[72vh] sm:min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden text-[#FAF8F5] transition-colors duration-700"
      style={{ backgroundColor: activeTheme.colors.dark }}
    >
      {/* Background de Portada Dinámico */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Portada Hero Atelier"
          className="w-full h-full object-cover opacity-45 filter brightness-95 saturate-90 scale-105 transform animate-fade-in transition-all duration-700"
        />
        {/* Capas de gradientes con tinte sutil de la temporada */}
        <div
          className="absolute inset-0 transition-colors duration-700"
          style={{
            background: `linear-gradient(to top, ${activeTheme.colors.dark} 5%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.65) 100%)`
          }}
        />
        <div className="absolute inset-0 bg-radial from-transparent via-black/30 to-black/80" />
      </div>

      {/* Contenido Editorial Flotante */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center py-12 sm:py-20 lg:py-28 flex flex-col items-center">
        
        {/* Badge Superior Dinámico según Estación o Evento de Lima */}
        <div
          className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#FAF8F5] text-[9px] sm:text-[11px] uppercase tracking-[0.12em] sm:tracking-[0.22em] font-semibold mb-4 sm:mb-6 shadow-sm max-w-full leading-snug"
        >
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" style={{ color: activeTheme.colors.primary }} />
          <span className="truncate sm:whitespace-normal">{activeTheme.heroBadge}</span>
        </div>

        {/* Título Principal Tipografía Serif Editorial */}
        <h1 
          className="text-3xl sm:text-5xl lg:text-7xl font-light text-[#FAF8F5] tracking-tight leading-[1.1] mb-4 sm:mb-6 max-w-4xl"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          El arte de la manicura rusa y el cuidado anatómico de tus uñas.
        </h1>

        {/* Bajada Descriptiva */}
        <p className="text-xs sm:text-base lg:text-lg text-[#D2C5BE] max-w-2xl leading-relaxed font-light mb-6 sm:mb-8 px-1">
          Atención personalizada, dedicada y sin prisas. Sin cortes agresivos ni fórmulas dañinas: fortalecimiento con Rubber, Kapping y acabados de alta costura ungueal.
        </p>

        {/* Píldoras de Diseños Destacados de la Temporada / Festividad Activa */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-3xl mb-7 sm:mb-10">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-widest font-bold text-white/60 w-full sm:w-auto mb-0.5 sm:mb-0 sm:mr-1">
            Destacados {activeTheme.name.split("·")[0].trim()}:
          </span>
          {activeTheme.featuredDesigns.map((design, idx) => (
            <span
              key={idx}
              className="px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-medium bg-white/10 backdrop-blur-md border border-white/15 text-[#FAF8F5]"
            >
              {design}
            </span>
          ))}
        </div>

        {/* Botones CTA Principales */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-white hover:opacity-95 transition-all flex items-center justify-center gap-2.5 text-xs sm:text-sm font-semibold shadow-xl shadow-black/30 group"
            style={{ backgroundColor: activeTheme.colors.primary }}
          >
            <span>Reservar Cita Online</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          
          <button
            onClick={onExploreCatalog}
            className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white/10 hover:bg-white/15 text-[#FAF8F5] backdrop-blur-md border border-white/20 transition-all text-xs sm:text-sm font-medium"
          >
            Ver Catálogo & Precios
          </button>
        </div>

        {/* Micro-sello de confianza inferior */}
        <div className="mt-8 sm:mt-12 inline-flex items-center gap-2 text-[11px] sm:text-xs text-[#A89C96]">
          <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" style={{ color: activeTheme.colors.primary }} />
          <span>Reserva con 20% de seña para asegurar exclusividad del horario</span>
        </div>

      </div>
    </section>
  );
}
