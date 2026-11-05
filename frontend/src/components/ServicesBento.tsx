"use client";

import { useState } from "react";
import { Clock, Plus, Sparkles, SlidersHorizontal, Check } from "lucide-react";
import { ServiceItem } from "@/data/catalog";
import { getAssetPath } from "@/lib/assets";

interface ServicesBentoProps {
  services: ServiceItem[];
  cartServiceIds?: string[];
  onSelectService: (service: ServiceItem) => void;
}

export function ServicesBento({
  services,
  cartServiceIds = [],
  onSelectService,
}: ServicesBentoProps) {
  const [filterCategory, setFilterCategory] = useState<"todos" | "manos" | "pies">("todos");

  const filteredServices = services.filter((srv) => {
    if (filterCategory === "manos") return srv.category === "manicura" || srv.category === "acrilico";
    if (filterCategory === "pies") return srv.category === "pedicura";
    return true;
  });

  const manosCount = services.filter(s => s.category === "manicura" || s.category === "acrilico").length;
  const piesCount = services.filter(s => s.category === "pedicura").length;

  return (
    <section className="py-6 sm:py-8 bg-[#FBF8F6] text-[#2C2420]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Selector de Categorías (Manos vs Pies) */}
        <div className="flex items-center justify-center">
          <div className="inline-flex p-1 bg-[#F2ECE4] rounded-full border border-[#E5DDD2] text-xs font-semibold">
            <button
              type="button"
              onClick={() => setFilterCategory("todos")}
              className={`px-4 py-2 rounded-full transition-all ${
                filterCategory === "todos"
                  ? "bg-[#2C2420] text-white shadow-xs font-bold"
                  : "text-[#6C5F57] hover:text-[#2C2420]"
              }`}
            >
              Todos ({services.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterCategory("manos")}
              className={`px-4 py-2 rounded-full transition-all flex items-center gap-1.5 ${
                filterCategory === "manos"
                  ? "bg-[#2C2420] text-white shadow-xs font-bold"
                  : "text-[#6C5F57] hover:text-[#2C2420]"
              }`}
            >
              <span>Manos ({manosCount})</span>
            </button>
            <button
              type="button"
              onClick={() => setFilterCategory("pies")}
              className={`px-4 py-2 rounded-full transition-all flex items-center gap-1.5 ${
                filterCategory === "pies"
                  ? "bg-[#2C2420] text-white shadow-xs font-bold"
                  : "text-[#6C5F57] hover:text-[#2C2420]"
              }`}
            >
              <span>Pies ({piesCount})</span>
            </button>
          </div>
        </div>

        {/* Bento Grid de Servicios de Atelier */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((item) => {
            const isAdded = cartServiceIds.includes(item.id);

            return (
              <div
                key={item.id}
                onClick={() => onSelectService(item)}
                className={`group cursor-pointer rounded-3xl bg-white border overflow-hidden transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 ${
                  isAdded
                    ? "border-[#9E5742] ring-2 ring-[#9E5742]/20 shadow-md"
                    : "border-[#EFE9E2] hover:border-[#D5C6BA]"
                }`}
              >
                {/* Imagen en Clave Alta con Destello Glaze */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FAF6F2] glaze-shimmer">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getAssetPath(item.imgUrl)}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70" />
                  
                  {item.tag && (
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] uppercase font-bold tracking-wider text-[#9E5742] shadow-xs">
                      {item.tag}
                    </span>
                  )}

                  {isAdded && (
                    <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center gap-1 shadow-xs">
                      <Check className="w-3 h-3 stroke-[3]" />
                      En tu cita
                    </span>
                  )}

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                    <span className="text-xs font-medium flex items-center gap-1.5 drop-shadow-md">
                      <Clock className="w-3.5 h-3.5 text-[#EAD8CE]" />
                      {item.duration} min
                    </span>
                    <span className="text-lg font-bold drop-shadow-md" style={{ fontFamily: "var(--font-serif)" }}>
                      S/ {item.price}
                    </span>
                  </div>
                </div>

                {/* Contenido de la Card */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 
                      className="text-lg sm:text-xl font-light text-[#2C2420] leading-snug group-hover:text-[#9E5742] transition-colors"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#7A6B62] leading-relaxed mt-2 line-clamp-3">
                      {item.desc}
                    </p>

                    {item.includedNotes && (
                      <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F8F4EF] border border-[#EAE3DA] text-[10px] font-semibold text-[#8C5341]">
                        <Sparkles className="w-3 h-3 text-[#9E5742]" />
                        <span>{item.includedNotes}</span>
                      </div>
                    )}
                  </div>

                  {/* Botón de Personalización & Agregar */}
                  <div className="pt-4 border-t border-[#F2ECE4] flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#9E5742] group-hover:underline flex items-center gap-1">
                      <SlidersHorizontal className="w-3.5 h-3.5" />
                      Personalizar & Agregar
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[#F8F4EF] text-[#7A6B62] group-hover:bg-[#2C2420] group-hover:text-white flex items-center justify-center transition-colors">
                      <Plus className="w-4 h-4" />
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
