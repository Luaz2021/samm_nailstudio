"use client";

import { useEffect, useState } from "react";
import { Sparkles, X, ArrowRight, ShieldCheck, Tag } from "lucide-react";

interface PromoPopupProps {
  onClaim: (code: string) => void;
}

export function PromoPopup({ onClaim }: PromoPopupProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Si ya lo cerró en esta sesión, no molestar de nuevo
    const dismissed = sessionStorage.getItem("samm_promo_dismissed");
    if (dismissed) return;

    // Mostrar sutilmente tras 3.5 segundos de navegación
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("samm_promo_dismissed", "true");
  };

  const handleClaim = () => {
    sessionStorage.setItem("samm_promo_dismissed", "true");
    setIsOpen(false);
    onClaim("SAMM15");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-md bg-[#FAF8F5] rounded-3xl p-8 border border-[#E9E2DB] shadow-2xl text-[#2C2420] overflow-hidden"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {/* Glow de fondo tenue */}
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-[#E8D3C8]/40 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-[#C8927B]/20 rounded-full blur-2xl pointer-events-none" />

        {/* Botón cerrar */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 text-[#7A6B62] hover:text-[#2C2420] transition-colors rounded-full hover:bg-black/5"
          aria-label="Cerrar promoción"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tag de bienvenida */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8927B]/15 text-[#9E5742] text-xs font-semibold uppercase tracking-wider mb-4">
          <Tag className="w-3.5 h-3.5" />
          <span>Bienvenida al Atelier</span>
        </div>

        {/* Titular editorial */}
        <h3 
          className="text-3xl font-light text-[#2C2420] leading-tight mb-2"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          15% de descuento en tu primera cita
        </h3>

        <p className="text-sm text-[#7A6B62] leading-relaxed mb-6">
          Vive la experiencia de manicura anatómica rusa con desinfección hospitalaria. Reserva hoy con el código de apertura exclusivo.
        </p>

        {/* Badge del código */}
        <div className="p-3 bg-white rounded-2xl border border-dashed border-[#C8927B]/40 flex items-center justify-between mb-6">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-[#9E5742] tracking-wider">Tu código de descuento</span>
            <span className="text-xl font-bold tracking-widest text-[#2C2420]" style={{ fontFamily: "var(--font-serif)" }}>SAMM15</span>
          </div>
          <span className="text-xs px-2.5 py-1 bg-[#F4EBE3] rounded-lg text-[#7A6B62] font-medium">-15% Aplicable</span>
        </div>

        {/* CTA */}
        <div className="flex flex-col gap-2.5">
          <button
            onClick={handleClaim}
            className="w-full py-3.5 px-6 rounded-full bg-[#2C2420] text-white hover:bg-[#463A34] transition-all flex items-center justify-center gap-2 text-sm font-medium shadow-md shadow-black/10 group"
          >
            <span>Canjear y armar mi cita</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          
          <button
            onClick={handleClose}
            className="w-full py-2 text-xs text-[#9E8F86] hover:text-[#463A34] transition-colors"
          >
            Continuar explorando el catálogo
          </button>
        </div>

        {/* Pie de seguridad */}
        <div className="mt-5 pt-4 border-t border-[#E9E2DB]/80 flex items-center justify-center gap-2 text-[11px] text-[#9E8F86]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#9E5742]" />
          <span>Válido para reservas directas en Callao, Lima</span>
        </div>
      </div>
    </div>
  );
}
