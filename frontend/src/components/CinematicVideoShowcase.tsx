"use client";

import { useState } from "react";
import { Play, Sparkles, CheckCircle2, ShieldCheck, Clock } from "lucide-react";

export function CinematicVideoShowcase() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-24 bg-[#181412] text-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Cabecera Editorial */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#C8927B]">
            Experiencia en Cabina
          </span>
          <h2 
            className="text-3xl sm:text-5xl font-light tracking-tight text-[#FAF8F5]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            El Ritual de Precisión en Vivo
          </h2>
          <p className="text-xs sm:text-sm text-[#C8BDB4] leading-relaxed">
            Un vistazo a nuestro protocolo de esterilización, fresado anatómico de cutícula y esmaltado de alta definición.
          </p>
        </div>

        {/* Marco de Video Tipo Iframe / Player Cinematográfico de Lujo */}
        <div className="relative aspect-video max-w-4xl mx-auto rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-black">
          {isPlaying ? (
            <iframe
              className="w-full h-full object-cover"
              src="https://www.youtube-nocookie.com/embed/YpS_j_tBv_0?autoplay=1&mute=1&controls=1&loop=1&rel=0"
              title="Ritual de Manicura Rusa Samm Nail Studio"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div 
              onClick={() => setIsPlaying(true)}
              className="relative w-full h-full cursor-pointer group"
            >
              {/* Poster de video de alta calidad */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=1920&q=80"
                alt="Manicura Rusa en Vivo"
                className="w-full h-full object-cover filter brightness-80 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

              {/* Botón Play Editorial Central */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center">
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-[#C8927B] text-white shadow-xl">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#EAD8CE] block">
                    Reproducir Demostración
                  </span>
                  <span className="text-sm font-light italic text-[#FAF8F5]/80" style={{ fontFamily: "var(--font-serif)" }}>
                    Técnica Rusa · Paso a Paso
                  </span>
                </div>
              </div>

              {/* Badges Flotantes de Confianza en el Reproductor */}
              <div className="absolute bottom-6 left-6 right-6 hidden sm:flex items-center justify-between text-xs text-white/80">
                <span className="flex items-center gap-1.5 backdrop-blur-md bg-black/40 px-3 py-1.5 rounded-full border border-white/10">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C8927B]" />
                  Esterilización Grado Quirúrgico
                </span>
                <span className="flex items-center gap-1.5 backdrop-blur-md bg-black/40 px-3 py-1.5 rounded-full border border-white/10">
                  <Clock className="w-3.5 h-3.5 text-[#C8927B]" />
                  Duración garantizada: 21+ días
                </span>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
