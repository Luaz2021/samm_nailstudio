"use client";

import { ShoppingBag, MessageCircle, Sparkles, Home, ShieldCheck } from "lucide-react";

export type NavTab = "inicio" | "tratamientos" | "guia";

interface NavbarOliveProps {
  activeTab: NavTab;
  onChangeTab: (tab: NavTab) => void;
  cartCount: number;
  onOpenDrawer: () => void;
}

export function NavbarOlive({
  activeTab,
  onChangeTab,
  cartCount,
  onOpenDrawer,
}: NavbarOliveProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EAE3DA] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Lado Izquierdo: Logotipo Tipográfico Editorial */}
        <div 
          onClick={() => onChangeTab("inicio")} 
          className="flex flex-col items-start cursor-pointer shrink-0"
        >
          <span 
            className="text-2xl sm:text-3xl font-light tracking-tight text-[#2C2420]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            samm.
          </span>
          <span className="text-[9px] uppercase tracking-[0.3em] font-semibold text-[#9E5742] -mt-1">
            Nail Studio
          </span>
        </div>

        {/* Centro: Las 3 Pestañas Claras (Inicio, Uñas & Carta, Protocolo & Salud) */}
        <nav className="flex items-center gap-1 sm:gap-2 p-1.5 bg-[#F2ECE4] rounded-full border border-[#E5DDD2] text-xs font-semibold">
          
          {/* 1. Inicio */}
          <button
            type="button"
            onClick={() => onChangeTab("inicio")}
            className={`px-3.5 sm:px-4 py-2 rounded-full transition-all flex items-center gap-1.5 ${
              activeTab === "inicio"
                ? "bg-[#2C2420] text-white shadow-xs font-bold"
                : "text-[#6C5F57] hover:text-[#2C2420] hover:bg-black/5"
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Inicio</span>
          </button>

          {/* 2. Uñas & Carta */}
          <button
            type="button"
            onClick={() => onChangeTab("tratamientos")}
            className={`px-3.5 sm:px-4 py-2 rounded-full transition-all flex items-center gap-1.5 ${
              activeTab === "tratamientos"
                ? "bg-[#2C2420] text-white shadow-xs font-bold"
                : "text-[#6C5F57] hover:text-[#2C2420] hover:bg-black/5"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C8927B]" />
            <span>Uñas & Carta</span>
          </button>

          {/* 3. Protocolo & Salud (Página Dedicada) */}
          <button
            type="button"
            onClick={() => onChangeTab("guia")}
            className={`px-3.5 sm:px-4 py-2 rounded-full transition-all flex items-center gap-1.5 ${
              activeTab === "guia"
                ? "bg-[#2C2420] text-white shadow-xs font-bold"
                : "text-[#6C5F57] hover:text-[#2C2420] hover:bg-black/5"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#C8927B]" />
            <span>Protocolo & Cuidados</span>
          </button>

        </nav>

        {/* Lado Derecho: WhatsApp y Botón Carrito Sobrepuesto */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          <a
            href="https://wa.me/51959716984"
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-[#E2D8CE] hover:border-[#9E5742] text-xs font-medium text-[#2C2420] transition-all"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
            <span>Consultas</span>
          </a>

          <button
            onClick={onOpenDrawer}
            className="relative flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-full bg-[#9E5742] text-white hover:bg-[#854533] transition-all text-xs font-semibold shadow-md shadow-[#9E5742]/20 group"
            aria-label="Abrir agenda y resumen de cita"
          >
            <ShoppingBag className="w-4 h-4 text-[#FAF8F5] transition-transform group-hover:scale-110" />
            <span>Mi Cita</span>
            {cartCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#2C2420] text-white flex items-center justify-center text-[10px] font-bold">
                {cartCount}
              </span>
            )}
          </button>

        </div>

      </div>
    </header>
  );
}
