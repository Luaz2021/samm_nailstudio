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
      desc: "Nuestros turnos son cerrados de 2 horas. Si te demoras más de 15 minutos, el tiempo debe restarse del diseño o cancelarse para no perjudicar a la siguiente clienta.",
      tag: "Puntualidad"
    },
    {
      title: "Uñas intactas (No arrancadas ni lastimadas)",
      desc: "Evita arrancar o morder el producto levantado. Esto debilita las capas de queratina y puede impedir la aplicación de Kapping o extensiones por salud ungueal.",
      tag: "Salud Ungueal"
    }
  ];

  const careTips = [
    {
      step: "01",
      title: "Usa guantes al limpiar",
      desc: "Los detergentes, lejía y solventes debilitan la estructura química del gel y opacan el brillo."
    },
    {
      step: "02",
      title: "Tus uñas no son herramientas",
      desc: "Evita abrir latas, raspar etiquetas o hacer fuerza de palanca. Úsalas como joyas, no como pinzas."
    },
    {
      step: "03",
      title: "Jamás arranques el producto",
      desc: "Si un lateral se desprende, no lo jales ni lo muerdas. Agenda un retiro o protégelo con cinta hasta tu cita."
    },
    {
      step: "04",
      title: "Hidrata cutículas a diario",
      desc: "Aplica aceite para cutículas o crema hidratante cada noche para mantener el lecho flexible y nutrido."
    },
    {
      step: "05",
      title: "Retoque cada 15 a 21 días",
      desc: "Al crecer la uña natural, el ápice de peso se desplaza hacia la punta. El retoque a tiempo previene quiebres dolorosos."
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

        {/* Bloque 2: Cuidado Posterior (Los 5 Mandamientos para que dure 21+ días) */}
        <div className="bg-white rounded-3xl border border-[#E9DFD5] p-8 sm:p-12 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#9E5742]">
                Mantenimiento en Casa
              </span>
              <h3 
                className="text-2xl sm:text-3xl font-light text-[#2C2420] mt-1"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Cuidado de tus Uñas para una Durabilidad Total
              </h3>
            </div>
            <span className="text-xs text-[#9E8F86] italic">
              Consejos recomendados por @samm.nailstudio
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {careTips.map((tip, idx) => (
              <div key={idx} className="space-y-2 border-l-2 border-[#E9DFD5] pl-4">
                <span className="text-sm font-bold text-[#9E5742]" style={{ fontFamily: "var(--font-serif)" }}>
                  {tip.step}
                </span>
                <h4 className="text-xs uppercase font-bold tracking-wider text-[#2C2420]">
                  {tip.title}
                </h4>
                <p className="text-[11px] text-[#7A6B62] leading-relaxed">
                  {tip.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
