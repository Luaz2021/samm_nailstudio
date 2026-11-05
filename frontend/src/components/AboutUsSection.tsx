"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { DEFAULT_ABOUT_PHOTO } from "@/data/catalog";

interface AboutUsSectionProps {
  onOpenBooking: () => void;
  onExploreServices: () => void;
}

export function AboutUsSection({ onOpenBooking, onExploreServices }: AboutUsSectionProps) {
  const [photoUrl, setPhotoUrl] = useState(DEFAULT_ABOUT_PHOTO);

  useEffect(() => {
    try {
      const syncPhoto = () => {
        const stored = localStorage.getItem("samm_about_photo");
        if (stored) setPhotoUrl(stored);
      };
      syncPhoto();
      window.addEventListener("storage", syncPhoto);
      return () => window.removeEventListener("storage", syncPhoto);
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <section className="bg-white border-b border-[#EAE3DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Columna Izquierda: Tipografía Serif Editorial y Copy Humano */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <span
              className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-bold mb-2.5"
              style={{ color: "var(--rosewood-chrome, #9E5742)" }}
            >
              EL ESTUDIO & NUESTRA ESENCIA
            </span>

            <h1 
              className="text-3xl sm:text-5xl lg:text-6xl font-light text-[#2C2420] tracking-tight leading-[1.1] mb-4 sm:mb-6"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Uñas perfectas diseñadas para <span className="italic font-normal" style={{ color: "var(--rosewood-chrome, #9E5742)" }}>acompañar tu estilo.</span>
            </h1>

            <div className="space-y-3.5 text-xs sm:text-base text-[#6C5F57] leading-relaxed mb-6 sm:mb-8 font-light">
              <p>
                En <strong>samm. NAIL STUDIO</strong>, fundado por <strong>Sheyla Astrid Moreno Medina</strong>, sabemos que hacerte las uñas es tu momento de engreimiento y desconexión. Dejamos atrás las citas apuradas y los limados agresivos para brindarte una atención personalizada, cercana y con acabados impecables.
              </p>
              <p>
                Especialistas en uñas acrílicas con tip, polygel, nivelación rubber y pedicura spa. Trabajamos con productos profesionales (Mia Secret, OPI, Gelish) y bioseguridad al 100% para que luzcas un set resistente, limpio y que dure semanas cuidando siempre tu uña natural.
              </p>
            </div>

            {/* Acciones principales */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <button
                type="button"
                onClick={onOpenBooking}
                className="px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-white transition-all flex items-center justify-center gap-2.5 text-xs uppercase tracking-widest font-semibold shadow-md group"
                style={{ backgroundColor: "var(--espresso-ink, #2C2420)" }}
              >
                <span>RESERVAR CITA</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={onExploreServices}
                className="px-6 py-3 sm:py-4 text-xs uppercase tracking-widest font-semibold text-[#7A6B62] hover:text-[#2C2420] transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Ver Servicios</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Tres pilares rápidos */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-7 sm:pt-10 mt-7 sm:mt-10 border-t border-[#EAE3DA] w-full text-center">
              <div>
                <span className="block text-lg sm:text-2xl font-light text-[#2C2420]" style={{ fontFamily: "var(--font-serif)" }}>100%</span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#8A7B72] font-medium">Bioseguridad</span>
              </div>
              <div>
                <span className="block text-lg sm:text-2xl font-light text-[#2C2420]" style={{ fontFamily: "var(--font-serif)" }}>3+ Semanas</span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#8A7B72] font-medium">Duración Real</span>
              </div>
              <div>
                <span className="block text-lg sm:text-2xl font-light text-[#2C2420]" style={{ fontFamily: "var(--font-serif)" }}>Lima, Perú</span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#8A7B72] font-medium">Atención 1 a 1</span>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Foto de estudio editorial */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#EAE3DA] bg-[#FAF8F5]">
              <img 
                src={photoUrl} 
                alt="Detalle de manicura cuidada y esmaltado en samm. NAIL STUDIO" 
                className="w-full h-[320px] sm:h-[460px] lg:h-[520px] object-cover object-center transition-transform duration-700 hover:scale-102"
              />
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-[#EAE3DA] shadow-sm flex items-center justify-between">
                <div>
                  <span
                    className="text-[9px] sm:text-[10px] uppercase tracking-widest font-bold block"
                    style={{ color: "var(--rosewood-chrome, #9E5742)" }}
                  >
                    SAMANTHA · FUNDADORA & MASTER NAIL ARTIST
                  </span>
                  <span className="text-[11px] sm:text-xs text-[#2C2420] font-serif font-light italic">
                    "Tus uñas no son una herramienta, son tu carta de presentación."
                  </span>
                </div>
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#C8927B] shrink-0 ml-2" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
