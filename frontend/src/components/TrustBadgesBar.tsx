"use client";

import { ShieldCheck, Award, Sparkles, HeartHandshake } from "lucide-react";

export function TrustBadgesBar() {
  const badges = [
    {
      title: "Limpieza Profunda & Prolija",
      desc: "Preparación suave de cutículas para que el esmaltado nazca impecable desde la raíz.",
      icon: Sparkles
    },
    {
      title: "Bioseguridad & Limas Nuevas",
      desc: "Instrumental 100% esterilizado y limas descartables exclusivas para cada clienta.",
      icon: ShieldCheck
    },
    {
      title: "Marcas Profesionales Top",
      desc: "Trabajamos con Mia Secret, OPI y Gelish para máxima adherencia, duración y brillo.",
      icon: Award
    },
    {
      title: "Atención 1 a 1 sin Apuros",
      desc: "Cita privada y dedicada en un ambiente cómodo para que te relajes y disfrutes.",
      icon: HeartHandshake
    }
  ];

  return (
    <section 
      id="seccion-garantias"
      className="min-h-[calc(100svh-var(--header-h,81px))] flex flex-col justify-between overflow-hidden bg-white border-y border-[#EAE3DA]"
    >
      {/* 1. Tira de 4 Sellos de Garantía con diseño aireado */}
      <div className="flex-1 flex flex-col justify-center max-w-7xl mx-auto px-6 lg:px-8 py-6 sm:py-8 lg:py-10 w-full">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
          {badges.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div key={idx} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2.5 sm:gap-4">
                <div className="w-11 h-11 rounded-2xl bg-[#FAF6F2] border border-[#E9DFD5] flex items-center justify-center shrink-0 text-[#9E5742] shadow-xs">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[11px] sm:text-xs uppercase font-bold tracking-wider text-[#2C2420]">{b.title}</h4>
                  <p className="hidden sm:block text-xs text-[#7A6B62] mt-1.5 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Franja Editorial Estilo Paintbox EXACTA ("As Seen In" / Marcas de Prestigio) */}
      <div className="border-t border-[#F2ECE4] py-6 sm:py-8 lg:py-10 bg-[#FAF8F5] shrink-0 w-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col items-center w-full">
          
          {/* Título en Serif Italiana Centrado estilo Paintbox */}
          <span 
            className="text-base sm:text-lg lg:text-xl font-light italic text-[#7A6B62] mb-5 sm:mb-6 tracking-wide"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Insumos & Marcas de Alta Gama
          </span>

          {/* Logos tipográficos de alta fidelidad con proporciones reales */}
          <div className="w-full flex flex-wrap items-center justify-center gap-10 sm:gap-14 lg:gap-18 text-[#2C2420] opacity-85">
            
            {/* O·P·I (Serif clásica con puntos característicos) */}
            <div className="hover:opacity-100 transition-opacity">
              <span 
                className="text-2xl sm:text-3xl font-bold tracking-[0.25em]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                O·P·I
              </span>
            </div>

            {/* gelish (Minúscula sans ultrafina) */}
            <div className="hover:opacity-100 transition-opacity">
              <span className="text-2xl sm:text-3xl font-light tracking-[0.18em] lowercase">
                gelish
              </span>
            </div>

            {/* BRIDES / MIA SECRET (Serif de revista) */}
            <div className="hover:opacity-100 transition-opacity">
              <span 
                className="text-xl sm:text-2xl font-normal tracking-[0.15em] uppercase"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                MIA SECRET
              </span>
            </div>

            {/* KOKOIST (Geométrica japonesa de precisión) */}
            <div className="hover:opacity-100 transition-opacity">
              <span className="text-xl sm:text-2xl font-black tracking-[0.22em] uppercase">
                KOKOIST
              </span>
            </div>

            {/* NEONAIL (Moderna europea) */}
            <div className="hover:opacity-100 transition-opacity">
              <span className="text-xl sm:text-2xl font-semibold tracking-[0.2em] uppercase">
                NEONAIL
              </span>
            </div>

            {/* THE GEL BOTTLE */}
            <div className="hover:opacity-100 transition-opacity">
              <span className="text-lg sm:text-xl font-bold tracking-[0.15em] uppercase">
                THE GELBOTTLE
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
