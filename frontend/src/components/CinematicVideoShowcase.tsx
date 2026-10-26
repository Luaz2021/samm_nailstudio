"use client";

import { useState, useEffect } from "react";
import { Sparkles, ShieldCheck, HeartHandshake, Eye } from "lucide-react";

interface NailSimulatorShowcaseProps {
  onOpenBooking?: () => void;
}

export function CinematicVideoShowcase({ onOpenBooking }: NailSimulatorShowcaseProps) {
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "SAMM_BOOKING_PRESET" && onOpenBooking) {
        onOpenBooking();
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onOpenBooking]);

  return (
    <section className="py-20 sm:py-24 bg-[#14100E] text-[#FAF8F5] relative overflow-hidden border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera Editorial */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <span className="text-xs uppercase font-bold tracking-[0.28em] text-[#C8927B] flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C8927B]" />
            ESTUDIO INTERACTIVO DE COLOR & ESTRUCTURA
          </span>
          <h2 
            className="text-3xl sm:text-5xl font-light tracking-tight text-[#FAF8F5]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Diseña Tu Set en Tiempo Real
          </h2>
          <p className="text-xs sm:text-sm text-[#C8BDB4] leading-relaxed max-w-xl mx-auto">
            Experimenta con nuestra paleta curada, prueba las 4 formas estructurales, cambia el tono de piel y aplica diseños de Nail Art en vivo antes de tu cita.
          </p>
        </div>

        {/* Contenedor Iframe Elegante y Aislado */}
        <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-[#14100E]">
          <iframe
            src="./nail-simulator-frame.html"
            title="Simulador de Tonos y Manicura Rusa Samm Nail Studio"
            className="w-full h-[760px] md:h-[530px] border-0"
            loading="lazy"
          />
        </div>

        {/* Sellos de Confianza Inferiores */}
        <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="flex items-center justify-center gap-2 text-xs text-[#C8BDB4]">
            <ShieldCheck className="w-4 h-4 text-[#C8927B]" />
            <span>Fórmulas 20-Free & HEMA-Free</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs text-[#C8BDB4]">
            <Eye className="w-4 h-4 text-[#C8927B]" />
            <span>Técnica Rusa de Alta Definición</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs text-[#C8BDB4]">
            <HeartHandshake className="w-4 h-4 text-[#C8927B]" />
            <span>Cuidado y Salud de la Uña Natural</span>
          </div>
        </div>

      </div>
    </section>
  );
}
