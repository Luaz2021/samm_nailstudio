"use client";

import { Sparkles, Plus, Check } from "lucide-react";
import { SelectedExtra } from "./BookingDrawer";

export interface ExtraItem {
  id: string;
  name: string;
  price: number;
  duration: number;
  desc: string;
}

interface ExtrasSectionProps {
  extrasList: ExtraItem[];
  selectedExtras: SelectedExtra[];
  onToggleExtra: (extra: ExtraItem) => void;
}

export function ExtrasSection({ extrasList, selectedExtras, onToggleExtra }: ExtrasSectionProps) {
  return (
    <section className="py-16 bg-[#F6F1EB] text-[#2C2420] border-t border-[#EAE3DA]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#9E5742]">
              Personalización & Arte
            </span>
            <h2 
              className="text-2xl sm:text-4xl font-light text-[#2C2420] mt-1"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Complementos & Diseños Extras
            </h2>
          </div>
          <p className="text-xs text-[#7A6B62] max-w-sm">
            Suma bloques de 30 minutos a tu cita para retirar esmaltado anterior o añadir arte a mano alzada.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {extrasList.map((ext) => {
            const isAdded = selectedExtras.some((e) => e.id === ext.id);
            return (
              <div
                key={ext.id}
                onClick={() => onToggleExtra(ext)}
                className={`cursor-pointer p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between bg-white ${
                  isAdded
                    ? "border-[#9E5742] ring-1 ring-[#9E5742] shadow-xs"
                    : "border-[#E8DFD5] hover:border-[#C5B5A5]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h4 className="font-medium text-xs text-[#2C2420]">{ext.name}</h4>
                    <span className="text-xs font-bold text-[#9E5742]">S/ {ext.price}</span>
                  </div>
                  <p className="text-[11px] text-[#7A6B62] leading-relaxed">
                    {ext.desc}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-[#F2ECE4] flex items-center justify-between text-[11px]">
                  <span className="text-[#9E8F86]">+{ext.duration} min</span>
                  <button className={`px-2.5 py-1 rounded-full flex items-center gap-1 font-semibold transition-colors ${
                    isAdded 
                      ? "bg-[#9E5742] text-white" 
                      : "bg-[#FAF6F2] text-[#2C2420] hover:bg-[#2C2420] hover:text-white"
                  }`}>
                    {isAdded ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                    <span>{isAdded ? "Añadido" : "Añadir"}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
