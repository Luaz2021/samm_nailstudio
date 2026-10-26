"use client";

import { Sparkles, Clock, ArrowRight, Check } from "lucide-react";

export interface ServiceItem {
  id: string;
  name: string;
  category: "manicura" | "pedicura" | "nailart" | "acrilico";
  price: number;
  duration: number;
  desc: string;
  tag?: string;
  imgUrl: string;
}

interface ServicesBentoProps {
  services: ServiceItem[];
  selectedServiceId: string | null;
  onSelectService: (service: ServiceItem) => void;
}

export function ServicesBento({ services, selectedServiceId, onSelectService }: ServicesBentoProps) {
  return (
    <section className="py-12 bg-[#FBF8F6] text-[#2C2420]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Encabezado Limpio y Editorial */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#9E5742]">
            Carta de Especialidades
          </span>
          <h2 
            className="text-3xl sm:text-5xl font-light tracking-tight text-[#2C2420]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Servicios & Tratamientos
          </h2>
          <p className="text-xs sm:text-sm text-[#7A6B62] leading-relaxed">
            Cada tratamiento es un ritual pausado de 2 horas. Selecciona tu servicio para personalizar tu cita con extras y fecha en tu bolsa.
          </p>
        </div>

        {/* Bento Grid Estilo Siberia Salon */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((item) => {
            const isSelected = selectedServiceId === item.id;
            return (
              <div
                key={item.id}
                onClick={() => onSelectService(item)}
                className={`group cursor-pointer rounded-3xl bg-white border overflow-hidden transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 ${
                  isSelected 
                    ? "border-[#9E5742] ring-2 ring-[#9E5742]/20 shadow-md" 
                    : "border-[#EFE9E2] hover:border-[#D5C6BA]"
                }`}
              >
                {/* Imagen en Clave Alta */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FAF6F2]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imgUrl}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                  
                  {item.tag && (
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] uppercase font-bold tracking-wider text-[#9E5742]">
                      {item.tag}
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
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 
                      className="text-xl font-light text-[#2C2420] leading-snug group-hover:text-[#9E5742] transition-colors"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#7A6B62] leading-relaxed mt-2 line-clamp-3">
                      {item.desc}
                    </p>
                  </div>

                  {/* Botón de Selección */}
                  <div className="pt-4 border-t border-[#F2ECE4] flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#9E5742] group-hover:underline">
                      {isSelected ? "Seleccionado en tu cita" : "Elegir este servicio"}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      isSelected 
                        ? "bg-[#9E5742] text-white" 
                        : "bg-[#F8F4EF] text-[#7A6B62] group-hover:bg-[#2C2420] group-hover:text-white"
                    }`}>
                      {isSelected ? <Check className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
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
