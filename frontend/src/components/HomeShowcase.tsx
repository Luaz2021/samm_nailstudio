"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { DEFAULT_HOME_SHOWCASE, HomeShowcaseItem } from "@/data/catalog";

interface HomeShowcaseProps {
  onGoToCatalog: () => void;
}

export function HomeShowcase({ onGoToCatalog }: HomeShowcaseProps) {
  const [previewWorks, setPreviewWorks] = useState<HomeShowcaseItem[]>(DEFAULT_HOME_SHOWCASE);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("samm_home_showcase");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setPreviewWorks(prev =>
            prev.map(item => {
              const match = parsed.find((p: any) => p.id === item.id);
              return match ? { ...item, imgUrl: match.url || match.imgUrl || item.imgUrl } : item;
            })
          );
        }
      }

      const handleStorage = () => {
        const updated = localStorage.getItem("samm_home_showcase");
        if (updated) {
          const parsed = JSON.parse(updated);
          if (Array.isArray(parsed)) {
            setPreviewWorks(prev =>
              prev.map(item => {
                const match = parsed.find((p: any) => p.id === item.id);
                return match ? { ...item, imgUrl: match.url || match.imgUrl || item.imgUrl } : item;
              })
            );
          }
        }
      };

      window.addEventListener("storage", handleStorage);
      return () => window.removeEventListener("storage", handleStorage);
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <section
      className="py-24 transition-colors duration-500"
      style={{ backgroundColor: "var(--milky-almond, #FBF8F6)", color: "var(--espresso-ink, #2C2420)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Cabecera Editorial Elegante */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-2">
            <span
              className="text-xs uppercase font-bold tracking-[0.25em]"
              style={{ color: "var(--rosewood-chrome, #9E5742)" }}
            >
              Técnicas & Especialidades
            </span>
            <h2 
              className="text-3xl sm:text-5xl font-light tracking-tight"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Nuestra Filosofía en Cabina
            </h2>
          </div>
          
          <button
            onClick={onGoToCatalog}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-xs font-semibold transition-all shadow-sm group w-fit"
            style={{ backgroundColor: "var(--espresso-ink, #2C2420)" }}
          >
            <span>Ver Carta Completa & Reservar</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 3 Tarjetas Visuales Presentacionales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {previewWorks.map((item) => (
            <div 
              key={item.id}
              className="rounded-3xl bg-white border border-[#EFE9E2] overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FAF6F2]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imgUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <span
                  className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] uppercase font-bold tracking-wider"
                  style={{ color: "var(--rosewood-chrome, #9E5742)" }}
                >
                  {item.category}
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
