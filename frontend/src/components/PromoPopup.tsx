"use client";

import { useEffect, useState } from "react";
import { Sparkles, X, ArrowRight, ShieldCheck, Tag } from "lucide-react";

interface PromoPopupProps {
  onClaim: (code: string) => void;
}

export function PromoPopup({ onClaim }: PromoPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [promoConfig, setPromoConfig] = useState({
    enabled: true,
    discountCode: "SAMM15",
    badgeText: "BIENVENIDA EXCLUSIVA",
    headline: "15% OFF en tu Primera Cita",
    description: "Válido para cualquier servicio de Manicura Rusa, Kapping Gel o Soft Gel agendado en línea.",
    ctaText: "RECLAMAR 15% DE DESCUENTO"
  });

  useEffect(() => {
    // 1. Cargar configuración guardada desde el Dashboard (si existe en localStorage)
    try {
      const stored = localStorage.getItem("samm_promo_settings");
      if (stored) {
        const parsed = JSON.parse(stored);
        setPromoConfig(parsed);
        if (!parsed.enabled) return;
      }
    } catch (e) {
      console.error(e);
    }

    // 2. Si ya lo cerró en esta sesión, no molestar de nuevo
    const dismissed = sessionStorage.getItem("samm_promo_dismissed");
    if (dismissed) return;

    // 3. Mostrar sutilmente tras 3.5 segundos de navegación
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
    onClaim(promoConfig.discountCode);
  };

  if (!isOpen || !promoConfig.enabled) return null;

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
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-[#7A6B62] transition-colors"
          aria-label="Cerrar promoción"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF6F2] border border-[#EAE1D7] text-[10px] uppercase font-bold tracking-widest text-[#9E5742]">
            <Sparkles className="w-3.5 h-3.5 text-[#C8927B]" />
            <span>{promoConfig.badgeText}</span>
          </div>

          <h3 
            className="text-2xl sm:text-3xl font-light text-[#2C2420] leading-tight"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {promoConfig.headline}
          </h3>

          <p className="text-xs text-[#7A6B62] leading-relaxed font-light">
            {promoConfig.description}
          </p>

          <div className="p-3.5 bg-white rounded-2xl border border-[#EBE3DA] flex items-center justify-between">
            <div>
              <span className="text-[10px] text-[#A89C96] uppercase tracking-wider block">Código Promocional</span>
              <span className="font-mono text-sm font-bold text-[#9E5742] tracking-wider">{promoConfig.discountCode}</span>
            </div>
            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-semibold border border-emerald-200">
              Cupón Activo
            </span>
          </div>

          <button
            onClick={handleClaim}
            className="w-full py-3.5 rounded-full bg-[#2C2420] text-white hover:bg-[#433732] transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-semibold shadow-md"
          >
            <span>{promoConfig.ctaText}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
