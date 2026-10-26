"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles, Heart } from "lucide-react";

export function GalleryCarousel() {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80",
      tag: "Kapping Rubber",
      caption: "Refuerzo anatómico con brillo espejo y cutículas perfectas."
    },
    {
      url: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80",
      tag: "Glazed Donut Effect",
      caption: "Cromo perlado sobre base milky almond con destellos solares."
    },
    {
      url: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=800&q=80",
      tag: "Manicura Rusa Pura",
      caption: "Fresado con diamante alemán y esmaltado milimétrico bajo cutícula."
    },
    {
      url: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
      tag: "Soft Gel & Square Tip",
      caption: "Estructura ligera de gel premoldeado sin agresiones ni peso."
    },
    {
      url: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=800&q=80",
      tag: "Spa & Bienestar",
      caption: "Pedicura anatómica combinada con tratamiento podo-estético."
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 bg-[#FAF7F3] border-t border-[#EAE3DA] overflow-hidden text-[#2C2420]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Cabecera */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#9E5742]">
              Galería de Trabajos Reales
            </span>
            <h2 
              className="text-3xl sm:text-5xl font-light tracking-tight text-[#2C2420]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Resultados en Cabina
            </h2>
          </div>

          {/* Controles de Navegación del Carrusel */}
          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E2D8CE] hover:border-[#9E5742] text-xs font-medium text-[#2C2420] transition-all"
            >
              <svg className="w-3.5 h-3.5 fill-none stroke-[#9E5742] stroke-2" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              <span>Ver más en Instagram</span>
            </a>
            <div className="flex items-center gap-1.5 ml-2">
              <button
                onClick={prevSlide}
                className="w-9 h-9 rounded-full bg-white border border-[#E2D8CE] hover:bg-[#2C2420] hover:text-white flex items-center justify-center transition-all shadow-2xs"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                className="w-9 h-9 rounded-full bg-white border border-[#E2D8CE] hover:bg-[#2C2420] hover:text-white flex items-center justify-center transition-all shadow-2xs"
                aria-label="Foto siguiente"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Mosaico / Carrusel Horizontal de Uñas en Primer Plano */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.slice(0, 3).map((item, idx) => {
            const actualIndex = (currentIndex + idx) % images.length;
            const currentItem = images[actualIndex];
            return (
              <div 
                key={idx}
                className="group relative rounded-3xl overflow-hidden bg-white border border-[#EBE4DC] shadow-xs hover:shadow-xl transition-all duration-500"
              >
                <div className="aspect-[4/5] w-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={currentItem.url}
                    alt={currentItem.tag}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                </div>

                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] uppercase font-bold tracking-wider text-[#9E5742]">
                    {currentItem.tag}
                  </span>
                </div>

                <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
                  <p className="text-xs font-light text-white/90 leading-relaxed drop-shadow-sm">
                    {currentItem.caption}
                  </p>
                  <span className="text-[10px] text-[#EAD8CE] uppercase tracking-widest font-semibold block pt-1">
                    @samm.nailstudio · Lima
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
