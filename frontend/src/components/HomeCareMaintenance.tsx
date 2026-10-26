"use client";

import { Sparkles, Heart, ShieldCheck, CheckCircle2 } from "lucide-react";

export function HomeCareMaintenance() {
  const careCards = [
    {
      num: "01",
      title: "Usa guantes al limpiar",
      subtitle: "Protección contra químicos",
      desc: "Los detergentes, desinfectantes y lejía resecan el lecho y opacan el brillo del Top Coat.",
      imgUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80"
    },
    {
      num: "02",
      title: "Tus uñas no son herramientas",
      subtitle: "Cero palancas ni abrir latas",
      desc: "Úsalas como joyas, no para raspar etiquetas o levantar peso que fuerce la punta.",
      imgUrl: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=600&q=80"
    },
    {
      num: "03",
      title: "Jamás arranques el gel",
      subtitle: "Cuida la queratina",
      desc: "Si un lateral se levanta, no lo arranques; podrías llevarte capas de tu uña natural.",
      imgUrl: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=600&q=80"
    },
    {
      num: "04",
      title: "Hidrata cutículas a diario",
      subtitle: "Aceite o crema nutritiva",
      desc: "La hidratación diaria mantiene el contorno suave, evitando padrastros y resequedad.",
      imgUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=600&q=80"
    },
    {
      num: "05",
      title: "Retoque cada 15 a 21 días",
      subtitle: "Equilibrio del ápice",
      desc: "Al crecer la uña, el centro de gravedad cambia. El retoque previene quiebres dolorosos.",
      imgUrl: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <section className="py-24 bg-white border-t border-[#EAE3DA] text-[#2C2420]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Cabecera */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#9E5742]">
            Mantenimiento en Casa
          </span>
          <h2 
            className="text-3xl sm:text-5xl font-light tracking-tight text-[#2C2420]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Guía para una Manicura Duradera
          </h2>
          <p className="text-xs sm:text-sm text-[#7A6B62] leading-relaxed">
            Sigue estos 5 cuidados clave recomendados por @samm.nailstudio para mantener tu set impecable por más de 3 semanas.
          </p>
        </div>

        {/* 5 Tarjetas con Fotografía Real, Número de Autor y Contenido */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {careCards.map((card, idx) => (
            <div 
              key={idx}
              className="rounded-3xl bg-[#FAF8F5] border border-[#EBE4DC] overflow-hidden flex flex-col justify-between shadow-2xs hover:shadow-md transition-all duration-300 group"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={card.imgUrl} 
                  alt={card.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <span 
                  className="absolute bottom-3 left-4 text-2xl font-bold text-white drop-shadow-md"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {card.num}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#9E5742] block">
                    {card.subtitle}
                  </span>
                  <h4 
                    className="text-base font-medium text-[#2C2420] mt-1 leading-snug"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {card.title}
                  </h4>
                  <p className="text-[11px] text-[#7A6B62] leading-relaxed mt-2">
                    {card.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cita de Confianza inferior */}
        <div className="mt-12 p-6 rounded-2xl bg-[#FAF6F2] border border-[#E9DFD5] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#9E5742]/10 text-[#9E5742] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#2C2420]">Recomendación Profesional de Samm Nail Studio</p>
              <p className="text-[11px] text-[#7A6B62]">El cuidado en casa representa el 50% de la durabilidad y salud de tus uñas naturales.</p>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-[#9E5742] uppercase tracking-wider">
            @samm.nailstudio
          </span>
        </div>

      </div>
    </section>
  );
}
