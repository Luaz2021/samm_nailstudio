"use client";

import { ShieldCheck, Award, Sparkles, HeartHandshake } from "lucide-react";

export function TrustBadgesBar() {
  const badges = [
    {
      title: "Manicura Rusa Anatómica",
      desc: "Limpieza milimétrica con torno y fresas de diamante sin cortes agresivos.",
      icon: Sparkles
    },
    {
      title: "Esterilización en Autoclave",
      desc: "Instrumental quirúrgico abierto en bolsa estéril frente a ti en cada cita.",
      icon: ShieldCheck
    },
    {
      title: "Fórmulas 20-Free & HEMA-Free",
      desc: "Libres de químicos nocivos para proteger la queratina de la uña natural.",
      icon: Award
    },
    {
      title: "Atención Exclusiva & Dedicada",
      desc: "Turnos individuales y sin prisas, garantizando un acabado impecable.",
      icon: HeartHandshake
    }
  ];

  return (
    <section className="bg-white border-y border-[#EAE3DA]">
      {/* 1. Tira de 4 Sellos de Garantía con diseño aireado */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {badges.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-[#FAF6F2] border border-[#E9DFD5] flex items-center justify-center shrink-0 text-[#9E5742] shadow-xs">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-bold tracking-wider text-[#2C2420]">{b.title}</h4>
                  <p className="text-xs text-[#7A6B62] mt-1.5 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Franja Editorial Estilo Paintbox EXACTA ("As Seen In" / Marcas de Prestigio) */}
      <div className="border-t border-[#F2ECE4] py-10 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col items-center">
          
          {/* Título en Serif Italiana Centrado estilo Paintbox */}
          <span 
            className="text-lg sm:text-xl font-light italic text-[#7A6B62] mb-8 tracking-wide"
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
