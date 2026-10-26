"use client";

import { MessageCircle, MapPin, Clock, ShieldCheck, Heart, ArrowUpRight } from "lucide-react";

interface EditorialFooterProps {
  onOpenTerms?: () => void;
}

export function EditorialFooter({ onOpenTerms }: EditorialFooterProps) {
  return (
    <footer className="bg-[#1C1815] text-[#D8CECA] pt-16 pb-12 border-t border-[#312A25]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Fila Principal de 4 Columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-[#312A25]">
          
          {/* Columna 1: Marca y Filosofía */}
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C8927B]">Atelier Privado</span>
              <h3 className="text-2xl font-light text-[#FAF8F5] tracking-tight" style={{ fontFamily: "var(--font-serif)" }}>
                samm. NAIL STUDIO
              </h3>
            </div>
            <p className="text-xs text-[#A89C96] leading-relaxed">
              Especialistas en manicura rusa anatómica, blindaje con Kapping Rubber y extensiones de alta durabilidad. Cuidado de la salud natural de la uña con protocolos de esterilización hospitalaria.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#2A2420] hover:bg-[#C8927B] text-[#FAF8F5] flex items-center justify-center transition-all"
                aria-label="Instagram de Samm"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a 
                href="https://wa.me/51959716984" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#2A2420] hover:bg-[#25D366] text-[#FAF8F5] flex items-center justify-center transition-all"
                aria-label="WhatsApp de Samm"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Columna 2: Ubicación & Horarios */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-bold tracking-[0.2em] text-[#FAF8F5]">
              Estudio & Citas
            </h4>
            <div className="space-y-3 text-xs text-[#A89C96]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C8927B] shrink-0 mt-0.5" />
                <span>Callao, Lima · Perú<br />Atención exclusiva bajo cita previa</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#C8927B] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[#FAF8F5] font-medium">Lunes a Sábado</p>
                  <p>10:00 AM – 07:00 PM</p>
                  <p className="text-[11px] text-[#C8927B] mt-0.5">Turnos cerrados de 2 horas</p>
                </div>
              </div>
            </div>
          </div>

          {/* Columna 3: Políticas del Atelier */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-bold tracking-[0.2em] text-[#FAF8F5]">
              Garantía & Políticas
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A89C96]">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8927B]" />
                <span>Puntualidad: 15 min de tolerancia</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8927B]" />
                <span>Seña 20% obligatoria para agendar</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8927B]" />
                <span>Re-agendamiento: hasta 4h antes de la cita</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8927B]" />
                <span>Menos de 4h: se cancela sin devolución</span>
              </li>
            </ul>
            <div className="pt-1">
              <button
                type="button"
                onClick={onOpenTerms}
                className="text-[11px] text-[#C8927B] hover:text-[#FAF8F5] underline transition-colors"
              >
                Leer Términos & Condiciones completas →
              </button>
            </div>
          </div>

          {/* Columna 4: Medios de Pago & Contacto Rápido */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-bold tracking-[0.2em] text-[#FAF8F5]">
              Medios de Pago
            </h4>
            <p className="text-xs text-[#A89C96] leading-relaxed">
              Aceptamos pagos con Yape, Plin y transferencia bancaria directa (BCP / BBVA / Interbank) para señas y liquidación.
            </p>
            <div className="pt-2">
              <a
                href="https://wa.me/51959716984?text=Hola%20Samm,%20tengo%20una%20consulta%20sobre%20mi%20cita"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#2A2420] hover:bg-[#3D342E] text-xs font-medium text-[#FAF8F5] transition-all border border-[#3D342E]"
              >
                <span>Consultar por WhatsApp</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#C8927B]" />
              </a>
            </div>
          </div>

        </div>

        {/* Fila Inferior de Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#7A6E67]">
          <p>© {new Date().getFullYear()} samm. NAIL STUDIO · Todos los derechos reservados.</p>
          <div className="flex items-center gap-1">
            <span>Diseñado con precisión estética para el cuidado ungueal</span>
            <Heart className="w-3 h-3 text-[#C8927B] fill-[#C8927B]" />
          </div>
        </div>

      </div>
    </footer>
  );
}
