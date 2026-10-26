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
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 md:py-0 md:h-20 flex flex-col md:flex-row md:items-center md:justify-between gap-2.5 md:gap-4">
        
        {/* Fila Superior en Móvil / Izquierda-Derecha en Desktop */}
        <div className="flex items-center justify-between w-full md:w-auto">
          {/* Logotipo Tipográfico Editorial */}
          <div 
            onClick={() => onChangeTab("inicio")} 
            className="flex flex-col items-start cursor-pointer shrink-0"
          >
            <span 
              className="text-2xl sm:text-3xl font-light tracking-tight text-[#2C2420] leading-none"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              samm.
            </span>
            <span
              className="text-[8px] sm:text-[9px] uppercase tracking-[0.28em] font-semibold mt-0.5"
              style={{ color: "var(--rosewood-chrome, #9E5742)" }}
            >
              Nail Studio
            </span>
          </div>

          {/* Botones de Acción visibles en Móvil arriba a la derecha */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="https://wa.me/51959716984"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-white border border-[#E2D8CE] flex items-center justify-center text-[#25D366]"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenDrawer}
              className="relative flex items-center gap-1.5 px-3.5 py-2 rounded-full text-white transition-all text-xs font-semibold shadow-sm"
              style={{ backgroundColor: "var(--rosewood-chrome, #9E5742)" }}
              aria-label="Abrir agenda y resumen de cita"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#FAF8F5]" />
              <span>Mi Cita</span>
              {cartCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#2C2420] text-white flex items-center justify-center text-[10px] font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Centro: Las 3 Pestañas (Grid de 3 en móvil, Píldora centrada en Desktop) */}
        <nav className="grid grid-cols-3 md:flex items-center gap-1 sm:gap-1.5 p-1 bg-[#F2ECE4] rounded-full border border-[#E5DDD2] text-[11px] sm:text-xs font-semibold w-full md:w-auto">
          
          {/* 1. Inicio */}
          <button
            type="button"
            onClick={() => onChangeTab("inicio")}
            className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "inicio"
                ? "bg-[#2C2420] text-white shadow-xs font-bold"
                : "text-[#6C5F57] hover:text-[#2C2420] hover:bg-black/5"
            }`}
          >
            <Home className="w-3.5 h-3.5 shrink-0" />
            <span>Inicio</span>
          </button>

          {/* 2. Servicios */}
          <button
            type="button"
            onClick={() => onChangeTab("tratamientos")}
            className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "tratamientos"
                ? "bg-[#2C2420] text-white shadow-xs font-bold"
                : "text-[#6C5F57] hover:text-[#2C2420] hover:bg-black/5"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C8927B] shrink-0" />
            <span>Servicios</span>
          </button>

          {/* 3. Sobre Nosotros */}
          <button
            type="button"
            onClick={() => onChangeTab("guia")}
            className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "guia"
                ? "bg-[#2C2420] text-white shadow-xs font-bold"
                : "text-[#6C5F57] hover:text-[#2C2420] hover:bg-black/5"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#C8927B] shrink-0" />
            <span className="truncate">Nosotros</span>
          </button>

        </nav>

        {/* Lado Derecho en Desktop: WhatsApp y Botón Carrito Sobrepuesto */}
        <div className="hidden md:flex items-center gap-2.5 shrink-0">
          <a
            href="https://wa.me/51959716984"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-[#E2D8CE] hover:border-[#9E5742] text-xs font-medium text-[#2C2420] transition-all"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
            <span>Consultas</span>
          </a>

          <button
            onClick={onOpenDrawer}
            className="relative flex items-center gap-2.5 px-5 py-2.5 rounded-full text-white hover:opacity-95 transition-all text-xs font-semibold shadow-md group"
            style={{ backgroundColor: "var(--rosewood-chrome, #9E5742)" }}
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
