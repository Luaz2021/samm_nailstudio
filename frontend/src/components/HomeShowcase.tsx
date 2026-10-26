"use client";

import { Sparkles, ArrowRight, Clock, ShieldCheck } from "lucide-react";

interface HomeShowcaseProps {
  onGoToCatalog: () => void;
}

export function HomeShowcase({ onGoToCatalog }: HomeShowcaseProps) {
  const previewWorks = [
    {
      title: "Kapping Gel & Rubber Base",
      category: "Salud Ungueal",
      time: "2 horas",
      imgUrl: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=800&q=80",
      desc: "Refuerzo elástico invisible que detiene quiebres y permite el crecimiento natural de la uña."
    },
    {
      title: "Manicura Rusa & Semipermanente",
      category: "Técnica Anatómica",
      time: "2 horas",
      imgUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80",
      desc: "Limpieza profunda de cutículas con microfresas de diamante y esmaltado bajo pliegue."
    },
    {
      title: "Extensiones Soft Gel & Glazed",
      category: "Alta Durabilidad",
      time: "2h 30m",
      imgUrl: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80",
      desc: "Tips premoldeados de gel con acabado perlado cromo y resistencia total al agua."
    }
  ];

  return (
    <section className="py-24 bg-[#FBF8F6] text-[#2C2420]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Cabecera Editorial Elegante (Cero mención a 'menú de restaurante') */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-2">
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#9E5742]">
              Técnicas & Especialidades
            </span>
            <h2 
              className="text-3xl sm:text-5xl font-light tracking-tight text-[#2C2420]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Nuestra Filosofía en Cabina
            </h2>
          </div>
          
          <button
            onClick={onGoToCatalog}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2C2420] text-white hover:bg-[#463A34] text-xs font-semibold transition-all shadow-sm group w-fit"
          >
            <span>Ver Carta Completa & Reservar</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 3 Tarjetas Visuales Presentacionales (No clickeables como formulario de compra) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {previewWorks.map((item, idx) => (
            <div 
              key={idx}
              className="rounded-3xl bg-white border border-[#EFE9E2] overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FAF6F2]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imgUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] uppercase font-bold tracking-wider text-[#9E5742]">
                  {item.category}
                </span>
                <span className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-medium flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#EAD8CE]" />
                  {item.time}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 
                    className="text-xl font-light text-[#2C2420]"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#7A6B62] leading-relaxed mt-2">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
