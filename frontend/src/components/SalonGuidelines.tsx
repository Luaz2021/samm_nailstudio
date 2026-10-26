"use client";

import { Sparkles, ShieldCheck, Clock, AlertTriangle, RefreshCw, X, HeartHandshake } from "lucide-react";

interface SalonGuidelinesProps {
  onOpenBooking: () => void;
}

export function SalonGuidelines({ onOpenBooking }: SalonGuidelinesProps) {
  const recommendations = [
    {
      title: "Ven sin producto de otro estudio",
      desc: "No realizo relleno sobre trabajos hechos por otros técnicos. Si traes set ajeno, selecciona en extras 'Retiro Seguro' para dejar tu uña sana y aplicar un set nuevo.",
      tag: "Regla Técnica"
    },
    {
      title: "Tolerancia de puntualidad: 15 minutos",
      desc: "Nuestros turnos son personalizados y exclusivos. Si te demoras más de 15 minutos, el tiempo debe restarse del diseño o reprogramarse para no perjudicar a la siguiente clienta.",
      tag: "Puntualidad"
    },
    {
      title: "Uñas intactas (No arrancadas ni lastimadas)",
      desc: "Evita arrancar o morder el producto levantado. Esto debilita las capas de queratina y puede impedir la aplicación de Kapping o extensiones por salud ungueal.",
      tag: "Salud Ungueal"
    }
  ];

  return (
    <section className="py-20 bg-[#F4EFEA] text-[#2C2420] border-t border-[#EAE3DA]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Cabecera de la Sección */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#9E5742]">
            Protocolo & Salud Ungueal
          </span>
          <h2 
            className="text-3xl sm:text-5xl font-light tracking-tight text-[#2C2420]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Guía para una Cita y Manicura Impecable
          </h2>
          <p className="text-xs sm:text-sm text-[#7A6B62] leading-relaxed">
            Para brindarte un servicio de alta precisión y proteger la salud de tus uñas naturales, ten en cuenta estas pautas del atelier.
          </p>
        </div>

        {/* Bloque 1: Antes de tu Cita (Tips directos de Samm) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {recommendations.map((item, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-3xl bg-white border border-[#E9DFD5] shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-[#FAF6F2] text-[#9E5742] inline-block">
                  {item.tag}
                </span>
                <h3 
                  className="text-xl font-light text-[#2C2420] leading-snug"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {item.title}
                </h3>
                <p className="text-xs text-[#7A6B62] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
