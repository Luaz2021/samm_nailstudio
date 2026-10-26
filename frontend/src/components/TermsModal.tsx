"use client";

import { X, ShieldCheck, AlertCircle, Clock, CheckCircle2, Phone } from "lucide-react";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TermsModal({ isOpen, onClose }: TermsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-3xl p-6 sm:p-8 border border-[#E9E2DB] shadow-2xl text-[#2C2420] max-h-[90vh] flex flex-col justify-between"
      >
        {/* Cabecera */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E9E2DB]">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#9E5742]">Políticas del Atelier</span>
            <h3 className="text-2xl font-light text-[#2C2420]" style={{ fontFamily: "var(--font-serif)" }}>
              Términos, Cancelaciones & Seña (20%)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#7A6B62] hover:text-[#2C2420] rounded-full hover:bg-black/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido scrolleable */}
        <div className="flex-1 overflow-y-auto py-5 space-y-5 text-xs text-[#5C4F48] leading-relaxed pr-2">
          
          {/* Regla 1: Seña del 20% */}
          <div className="p-4 rounded-2xl bg-white border border-[#E9DFD5] space-y-2">
            <h4 className="font-bold text-sm text-[#2C2420] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#9E5742]" />
              1. Seña de Reserva (20% No Reembolsable)
            </h4>
            <p>
              Para bloquear un turno exclusivo en la agenda de Samm Nail Studio, es indispensable abonar el <strong>20% de adelanto</strong> vía Yape, Plin o transferencia bancaria.
            </p>
            <p className="text-[11px] text-[#7A6B62]">
              Este depósito garantiza que el horario quede cerrado para ti y no sea ofrecido a otra clienta, cubriendo los costos de preparación y esterilización previa del instrumental.
            </p>
          </div>

          {/* Regla 2: Política de Re-agendamiento (4 Horas) */}
          <div className="p-4 rounded-2xl bg-white border border-[#E9DFD5] space-y-2">
            <h4 className="font-bold text-sm text-[#2C2420] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#9E5742]" />
              2. Cancelaciones & Re-agendamiento (Ventana de 4 Horas)
            </h4>
            <p>
              Entendemos que pueden surgir imprevistos. Podrás solicitar <strong>re-agendar tu cita</strong> sin perder tu adelanto con un <strong>mínimo de 4 horas de anticipación</strong> al horario reservado el mismo día del servicio.
            </p>
            <div className="p-3 bg-red-50/70 border border-red-200/60 rounded-xl text-red-900 text-[11px] space-y-1">
              <p className="font-semibold">⚠️ Cancelaciones con menos de 4 horas (3h, 2h o 1h antes):</p>
              <p>
                Si cancelas, avisas con menos de 4 horas de anticipación o no asistes a tu cita, <strong>el turno se cancela automáticamente y no existe derecho a devolución de la seña</strong>, ya que el espacio no puede ser cubierto con tan poco margen.
              </p>
            </div>
          </div>

          {/* Regla 3: Política de Devoluciones */}
          <div className="p-4 rounded-2xl bg-white border border-[#E9DFD5] space-y-2">
            <h4 className="font-bold text-sm text-[#2C2420] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#9E5742]" />
              3. Devoluciones de Dinero
            </h4>
            <p>
              Por política estándar del estudio, <strong>el adelanto otorga derecho a re-agendamiento, no a reembolso dinerario</strong>. 
            </p>
            <p className="text-[11px] text-[#7A6B62]">
              Cualquier solicitud de devolución monetaria aplica <em>únicamente en casos de fuerza mayor comprobable o emergencias extremas</em>, siempre sujeta a previa coordinación y evaluación directa con Samm.
            </p>
          </div>

          {/* Regla 4: Tolerancia y Estado de Uñas */}
          <div className="p-4 rounded-2xl bg-white border border-[#E9DFD5] space-y-2">
            <h4 className="font-bold text-sm text-[#2C2420] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#9E5742]" />
              4. Puntualidad (15 min) & Uñas Naturales
            </h4>
            <ul className="list-disc list-inside space-y-1 text-[11px]">
              <li><strong>Tolerancia:</strong> Se otorgan máximo 15 minutos de tolerancia para presentarse a la cita. Pasado este tiempo, el diseño puede simplificarse o el turno cancelarse.</li>
              <li><strong>Trabajos externos:</strong> No rellenamos sets de otros salones; debes agregar "Retiro Seguro" a tu reserva.</li>
              <li><strong>Salud ungueal:</strong> Si las uñas llegan severamente arrancadas, heridas o con infecciones, nos reservamos el derecho de no aplicar gel para priorizar tu salud.</li>
            </ul>
          </div>

        </div>

        {/* Footer del Modal */}
        <div className="pt-4 border-t border-[#E9E2DB] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[11px] text-[#7A6B62]">
            <Phone className="w-3.5 h-3.5 text-[#25D366]" />
            <span>Contacto directo: <strong>+51 959 716 984</strong></span>
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#2C2420] text-white hover:bg-[#463A34] text-xs font-semibold transition-all"
          >
            Entendido y Conforme
          </button>
        </div>

      </div>
    </div>
  );
}
