"use client";

import { useEffect, useState } from "react";
import { Sparkles, ArrowRight, ShieldCheck, Check, Calendar, HeartHandshake } from "lucide-react";
import { DEFAULT_CARE_STEPS, CareStepItem } from "@/data/catalog";

interface HomeCareMaintenanceProps {
  onOpenBooking?: () => void;
}

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

  return (
    <section
      className="py-14 sm:py-24 border-t border-[#EAE3DA] transition-colors duration-500"
      style={{ backgroundColor: "var(--theme-surface, #FAF8F5)", color: "var(--espresso-ink, #2C2420)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera Editorial Impecable */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-4 sm:gap-6">
          <div className="max-w-2xl">
            <span
              className="text-xs uppercase font-bold tracking-[0.28em] block mb-2"
              style={{ color: "var(--rosewood-chrome, #9E5742)" }}
            >
              MANTENIMIENTO & CUIDADO EN CASA
            </span>
            <h2 
              className="text-3xl sm:text-5xl font-light tracking-tight"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Guía para una Manicura Duradera
            </h2>
            <p className="text-xs sm:text-sm text-[#7A6B62] leading-relaxed mt-2 sm:mt-3">
              Pequeños rituales cotidianos que marcan la diferencia entre un set promedio y unas uñas sanas, flexibles e impecables por más de 3 semanas.
            </p>
          </div>

          <div
            className="flex items-center gap-2 text-xs font-semibold bg-white border border-[#EAE3DA] px-4 py-2 rounded-full shadow-xs self-start md:self-end"
            style={{ color: "var(--berry-glaze, #7A3E48)" }}
          >
            <HeartHandshake className="w-4 h-4" style={{ color: "var(--rosewood-chrome, #C8927B)" }} />
            <span>5 Hábitos de Belleza Diaria</span>
          </div>
        </div>

        {/* Master Showcase Editorial (Layout 2 Columnas en Desktop, Acordeón con Foto en Móvil) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Lado Izquierdo: Lista Interactiva tipo Índice Editorial */}
          <div className="lg:col-span-7 flex flex-col space-y-3">
            {careTips.map((tip, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={tip.id}
                  onClick={() => setActiveStep(idx)}
                  className={`p-4 sm:p-6 rounded-3xl cursor-pointer transition-all duration-300 border flex flex-col gap-3 ${
                    isActive
                      ? "bg-white border-[#2C2420] shadow-md"
                      : "bg-[#F4EFEA]/80 border-transparent hover:bg-white hover:border-[#E2D8CE]"
                  }`}
                >
                  <div className="flex items-start gap-3.5 sm:gap-5">
                    {/* Número con tipografía de lujo */}
                    <span 
                      className={`text-2xl sm:text-3xl font-light shrink-0 transition-colors ${
                        isActive ? "text-[#9E5742]" : "text-[#B3A69C]"
                      }`}
                      style={{
                        fontFamily: "var(--font-serif)",
                        color: isActive ? "var(--rosewood-chrome, #9E5742)" : undefined
                      }}
                    >
                      {tip.num}
                    </span>

                    {/* Contenido del paso */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="text-[10px] uppercase font-bold tracking-widest"
                          style={{ color: "var(--rosewood-chrome, #9E5742)" }}
                        >
                          {tip.tag}
                        </span>
                        {isActive && (
                          <span
                            className="w-1.5 h-1.5 rounded-full animate-pulse"
                            style={{ backgroundColor: "var(--rosewood-chrome, #9E5742)" }}
                          />
                        )}
                      </div>

                      <h3 
                        className={`text-base sm:text-lg font-medium transition-colors ${
                          isActive ? "text-[#2C2420]" : "text-[#4A3F39]"
                        }`}
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        {tip.title}
                      </h3>

                      <p className="text-xs text-[#7A6B62] mt-1.5 leading-relaxed font-light">
                        {isActive ? tip.detail : tip.short}
                      </p>

                      {isActive && (
                        <div className="mt-3 flex flex-col gap-2">
                          <div className="inline-flex items-start sm:items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FAF6F2] border border-[#EBE2D8] text-[11px] text-[#2C2420] font-medium">
                            <Sparkles className="w-3.5 h-3.5 shrink-0 mt-0.5 sm:mt-0" style={{ color: "var(--rosewood-chrome, #C8927B)" }} />
                            <span>Consejo de Samantha: {tip.tip}</span>
                          </div>
                          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-700">
                            <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                            <span>Beneficio: {tip.impact}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Flechita / Check activo */}
                    <div className="shrink-0 self-center hidden sm:block">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                          isActive ? "text-white" : "bg-black/5 text-[#8A7B72]"
                        }`}
                        style={{
                          backgroundColor: isActive ? "var(--espresso-ink, #2C2420)" : undefined
                        }}
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* Foto embebida directamente en Móvil/Tablet (< lg) cuando el paso está activo */}
                  {isActive && (
                    <div className="lg:hidden mt-2 relative w-full h-52 sm:h-64 rounded-2xl overflow-hidden bg-[#2C2420]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={tip.imgUrl}
                        alt={tip.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-white/90 text-[9px] uppercase font-bold tracking-widest text-[#2C2420]">
                        PASO {tip.num} / 05
                      </span>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Botón de reserva rápida en móvil al final de los 5 pasos */}
            {onOpenBooking && (
              <div className="lg:hidden pt-2">
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="w-full py-3.5 rounded-2xl text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2"
                  style={{ backgroundColor: "var(--espresso-ink, #2C2420)" }}
                >
                  <Calendar className="w-4 h-4" style={{ color: "var(--rosewood-chrome, #C8927B)" }} />
                  <span>Agendar Retoque a Tiempo</span>
                </button>
              </div>
            )}
          </div>

          {/* Lado Derecho (Solo Desktop lg+): Marco de Fotografía de Estudio Grande Sticky */}
          <div className="hidden lg:block lg:col-span-5">
            <div className="sticky top-28 rounded-3xl overflow-hidden bg-white border border-[#EAE3DA] shadow-xl p-5 flex flex-col justify-between">
              
              {/* Imagen de alta calidad del paso activo */}
              <div className="relative w-full h-[380px] rounded-2xl overflow-hidden bg-[#2C2420]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  key={current.imgUrl}
                  src={current.imgUrl} 
                  alt={current.title} 
                  className="w-full h-full object-cover animate-fade-in transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Badge flotante sobre la foto */}
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] uppercase font-bold tracking-widest text-[#2C2420] shadow-sm">
                  PASO {current.num} / 05
                </span>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] uppercase tracking-widest text-[#EAD8CE] block">
                    {current.tag}
                  </span>
                  <h4 className="text-xl font-light text-white mt-0.5" style={{ fontFamily: "var(--font-serif)" }}>
                    {current.title}
                  </h4>
                  <p className="text-xs text-white/80 mt-1 line-clamp-2 font-light">
                    {current.detail}
                  </p>
                </div>
              </div>

              {/* Pie de la tarjeta con llamado a la acción */}
              <div className="pt-4 px-1 flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" style={{ color: "var(--rosewood-chrome, #9E5742)" }} />
                    <span className="font-medium text-[#4A3F39]">
                      Salud y estética garantizadas
                    </span>
                  </div>
                  <span className="font-mono text-[#8A7B72] font-semibold">
                    {activeStep + 1} de 5
                  </span>
                </div>

                {onOpenBooking && (
                  <button
                    type="button"
                    onClick={onOpenBooking}
                    className="w-full py-2.5 rounded-xl text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2"
                    style={{ backgroundColor: "var(--espresso-ink, #2C2420)" }}
                  >
                    <Calendar className="w-3.5 h-3.5" style={{ color: "var(--rosewood-chrome, #C8927B)" }} />
                    <span>Agendar Retoque a Tiempo</span>
                  </button>
                )}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
