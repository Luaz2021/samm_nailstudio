"use client";

import { useEffect, useState } from "react";

interface SectionItem {
  id: string;
  num: string;
  label: string;
}

const SECTIONS: SectionItem[] = [
  { id: "seccion-hero", num: "01", label: "Inicio" },
  { id: "seccion-garantias", num: "02", label: "Garantías & Marcas" },
  { id: "seccion-vitrina", num: "03", label: "Especialidades" },
  { id: "seccion-reels", num: "04", label: "En Cabina" },
  { id: "seccion-citas", num: "05", label: "Disponibilidad" },
  { id: "seccion-revista", num: "06", label: "Lookbook & Tips" }
];

export function SectionScrollIndicator() {
  const [activeSection, setActiveSection] = useState<string>("seccion-hero");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: [0.35, 0.6]
      }
    );

    SECTIONS.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <aside 
      aria-label="Navegación rápida de secciones"
      className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-3.5 select-none pointer-events-auto"
    >
      {SECTIONS.map((sec) => {
        const isActive = activeSection === sec.id;
        const isHovered = hoveredSection === sec.id;

        return (
          <button
            key={sec.id}
            type="button"
            onClick={() => handleScrollTo(sec.id)}
            onMouseEnter={() => setHoveredSection(sec.id)}
            onMouseLeave={() => setHoveredSection(null)}
            className="group flex items-center gap-2.5 py-1 px-1 cursor-pointer focus:outline-none"
            aria-label={`Ir a sección ${sec.label}`}
          >
            {/* Tooltip flotante con número y nombre */}
            <span
              className={`text-[10px] tracking-wider uppercase font-semibold transition-all duration-300 px-2.5 py-1 rounded-full backdrop-blur-md shadow-xs ${
                isActive
                  ? "opacity-100 translate-x-0 bg-[#2C2420] text-white"
                  : isHovered
                  ? "opacity-100 translate-x-0 bg-white/90 text-[#2C2420] border border-[#EAE3DA]"
                  : "opacity-0 translate-x-2 pointer-events-none"
              }`}
            >
              <span className="text-[#C8927B] mr-1.5 font-bold">{sec.num}</span>
              <span>{sec.label}</span>
            </span>

            {/* Píldora / Indicador de barra */}
            <div className="relative flex items-center justify-center">
              <span
                className={`block rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-2.5 h-7 bg-[#C8927B] shadow-sm shadow-[#C8927B]/50"
                    : "w-2 h-2 bg-[#7A6B62]/30 group-hover:bg-[#C8927B]/70 group-hover:scale-125"
                }`}
              />
            </div>
          </button>
        );
      })}
    </aside>
  );
}
