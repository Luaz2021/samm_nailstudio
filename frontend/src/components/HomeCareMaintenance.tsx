"use client";

import { useEffect, useState } from "react";
import { Sparkles, ArrowRight, ArrowLeft, ShieldCheck, Check, Calendar, HeartHandshake } from "lucide-react";
import { DEFAULT_CARE_STEPS, CareStepItem } from "@/data/catalog";
import { getAssetPath } from "@/lib/assets";

interface HomeCareMaintenanceProps {
  onOpenBooking?: () => void;
}

const STEP_SHORT_LABELS = [
  "Protección Química",
  "Joyas, no Herramientas",
  "Salud Ungueal",
  "Aceite de Cutícula",
  "Retoque a Tiempo"
];

export function HomeCareMaintenance({ onOpenBooking }: HomeCareMaintenanceProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [careTips, setCareTips] = useState<CareStepItem[]>(DEFAULT_CARE_STEPS);

  useEffect(() => {
    try {
      const loadFromStorage = () => {
        const stored = localStorage.getItem("samm_care_steps");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setCareTips(prev =>
              prev.map(step => {
                const match = parsed.find((p: any) => p.id === step.id);
                return match ? { ...step, imgUrl: match.url || match.imgUrl || step.imgUrl } : step;
              })
            );
          }
        }
      };

      loadFromStorage();
      window.addEventListener("storage", loadFromStorage);
      return () => window.removeEventListener("storage", loadFromStorage);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const current = careTips[activeStep] || careTips[0];

  const handlePrev = () => {
    setActiveStep(prev => (prev > 0 ? prev - 1 : careTips.length - 1));
  };

  const handleNext = () => {
    setActiveStep(prev => (prev < careTips.length - 1 ? prev + 1 : 0));
  };

  return (
    <section
      className="min-h-[calc(100svh-var(--header-h,81px))] lg:h-[calc(100svh-var(--header-h,81px))] flex flex-col justify-center py-6 sm:py-8 lg:py-6 overflow-hidden border-t border-[#EAE3DA] transition-colors duration-500"
      style={{ backgroundColor: "var(--theme-surface, #FAF8F5)", color: "var(--espresso-ink, #2C2420)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-between h-full">
        
        {/* Cabecera Editorial Compacta */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-3 md:mb-4 gap-2 sm:gap-4">
          <div className="max-w-2xl">
            <span
              className="text-[10px] sm:text-xs uppercase font-bold tracking-[0.25em] block mb-1 text-[#9E5742]"
            >
              MANTENIMIENTO & CUIDADO EN CASA · RITUALES DIARIOS
            </span>
            <h2 
              className="text-2xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#2C2420]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Guía para una Manicura Duradera
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold bg-white border border-[#EAE3DA] px-3.5 py-1.5 rounded-full shadow-2xs self-start md:self-end text-[#7A3E48]">
            <HeartHandshake className="w-3.5 h-3.5 text-[#C8927B]" />
            <span>5 Hábitos de Belleza Diaria</span>
          </div>
        </div>

        {/* Barra Horizontal de Selección de Pasos (Tabs) */}
        <div className="mb-3 md:mb-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex items-center gap-2 pb-1">
            {careTips.map((tip, idx) => {
              const isActive = activeStep === idx;
              const shortLabel = STEP_SHORT_LABELS[idx] || tip.tag;
              return (
                <button
                  key={tip.id}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className={`shrink-0 px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl text-xs font-semibold transition-all flex items-center gap-2 border ${
                    isActive
                      ? "bg-[#2C2420] text-white border-[#2C2420] shadow-sm scale-[1.02]"
                      : "bg-white/80 hover:bg-white text-[#6C5F57] hover:text-[#2C2420] border-[#EAE3DA]"
                  }`}
                >
                  <span
                    className={`font-mono text-[11px] font-bold ${
                      isActive ? "text-[#C8927B]" : "text-[#A89C96]"
                    }`}
                  >
                    {tip.num}
                  </span>
                  <span className="whitespace-nowrap">{shortLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tarjeta Principal de Atelier (2 Columnas Equilibradas en Pantalla Completa) */}
        <div className="flex-1 bg-white rounded-3xl border border-[#EAE3DA] shadow-sm p-4 sm:p-6 lg:p-8 flex flex-col justify-between overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center h-full">
            
            {/* Columna Izquierda: Información Editorial del Paso Activo */}
            <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-3 sm:space-y-4">
              <div>
                <div className="flex items-center gap-3 mb-1 sm:mb-2">
                  <span
                    className="text-3xl sm:text-4xl font-light text-[#9E5742]"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {current.num}
                  </span>
                  <div className="h-6 w-px bg-[#EAE3DA]" />
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#9E5742] bg-[#FAF6F2] px-2.5 py-0.5 rounded-full border border-[#EBE2D8]">
                    {current.tag}
                  </span>
                </div>

                <h3
                  className="text-xl sm:text-2xl lg:text-3xl font-light text-[#2C2420] leading-snug"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {current.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#7A6B62] mt-2 leading-relaxed font-light">
                  {current.detail}
                </p>
              </div>

              {/* Tips de Sheyla y Beneficio */}
              <div className="space-y-2 pt-1">
                <div className="p-3 sm:p-3.5 rounded-2xl bg-[#FAF6F2] border border-[#EBE2D8] flex items-start gap-2.5 text-xs text-[#2C2420]">
                  <Sparkles className="w-4 h-4 text-[#C8927B] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-[#9E5742]">Consejo de Sheyla:</span>
                    <span className="text-[#6C5F57]">{current.tip}</span>
                  </div>
                </div>

                <div className="px-3 py-2 rounded-xl bg-emerald-50/70 border border-emerald-200/60 flex items-center gap-2 text-xs text-emerald-800 font-medium">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Beneficio comprobado: {current.impact}</span>
                </div>
              </div>

              {/* Botonera de Navegación y CTA */}
              <div className="pt-2 sm:pt-3 border-t border-[#F2ECE4] flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Paso anterior"
                    className="w-9 h-9 rounded-full bg-[#FAF6F2] hover:bg-[#2C2420] text-[#2C2420] hover:text-white border border-[#EAE3DA] flex items-center justify-center transition-all"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-semibold text-[#8A7B72] px-2">
                    {activeStep + 1} de {careTips.length}
                  </span>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Paso siguiente"
                    className="w-9 h-9 rounded-full bg-[#FAF6F2] hover:bg-[#2C2420] text-[#2C2420] hover:text-white border border-[#EAE3DA] flex items-center justify-center transition-all"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {onOpenBooking && (
                  <button
                    type="button"
                    onClick={onOpenBooking}
                    className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-white text-xs font-semibold transition-all shadow-xs flex items-center gap-2 bg-[#2C2420] hover:bg-[#9E5742]"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#C8927B]" />
                    <span>Agendar Retoque a Tiempo</span>
                  </button>
                )}
              </div>
            </div>

            {/* Columna Derecha: Fotografía Editorial de Alta Gama del Paso Activo */}
            <div className="lg:col-span-5 h-full flex items-center justify-center">
              <div className="relative w-full h-[220px] sm:h-[260px] lg:h-[340px] rounded-2xl lg:rounded-3xl overflow-hidden bg-[#2C2420] shadow-md border border-[#EAE3DA]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={current.imgUrl}
                  src={getAssetPath(current.imgUrl)}
                  alt={current.title}
                  className="w-full h-full object-cover animate-fade-in transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] uppercase font-bold tracking-widest text-[#2C2420] shadow-xs">
                  PASO {current.num} / 05
                </span>

                <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                  <span className="text-[10px] uppercase tracking-widest text-[#EAD8CE] block">
                    {current.tag}
                  </span>
                  <h4
                    className="text-base sm:text-lg font-light text-white mt-0.5 line-clamp-1"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {current.title}
                  </h4>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
