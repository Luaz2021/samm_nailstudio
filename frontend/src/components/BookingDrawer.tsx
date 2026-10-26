"use client";

import { useState } from "react";
import { X, Clock, ArrowRight, ShieldCheck, Tag, ShoppingBag, Trash2, Plus, Check, CheckCircle2, Home, Sparkles, MessageCircle } from "lucide-react";
import { WeeklySchedulePicker } from "./WeeklySchedulePicker";
import { ExtraItem } from "./ExtrasSection";

export interface SelectedService {
  id: string;
  name: string;
  price: number;
  duration: number;
  category: string;
}

export interface SelectedExtra {
  id: string;
  name: string;
  price: number;
  duration: number;
}

interface BookingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  service: SelectedService | null;
  extras: SelectedExtra[];
  allAvailableExtras: ExtraItem[];
  onToggleExtra: (extra: ExtraItem) => void;
  onRemoveExtra: (id: string) => void;
  selectedDate: string;
  onSelectDate: (date: string) => void;
  selectedTime: string;
  onSelectTime: (time: string) => void;
  discountCode: string;
  clientName: string;
  setClientName: (val: string) => void;
  clientPhone: string;
  setClientPhone: (val: string) => void;
  onConfirmWhatsApp: () => void;
  onOpenTerms?: () => void;
  onBackToHome: () => void;
}

export function BookingDrawer({
  isOpen,
  onClose,
  service,
  extras,
  allAvailableExtras,
  onToggleExtra,
  onRemoveExtra,
  selectedDate,
  onSelectDate,
  selectedTime,
  onSelectTime,
  discountCode,
  clientName,
  setClientName,
  clientPhone,
  setClientPhone,
  onConfirmWhatsApp,
  onOpenTerms,
  onBackToHome,
}: BookingDrawerProps) {
  const [isSuccessState, setIsSuccessState] = useState(false);

  if (!isOpen) return null;

  // Cálculos de tiempo y dinero
  const basePrice = service ? service.price : 0;
  const extrasPrice = extras.reduce((acc, curr) => acc + curr.price, 0);
  const subtotal = basePrice + extrasPrice;
  const discountAmount = discountCode === "SAMM15" ? Math.round(subtotal * 0.15) : 0;
  const totalPrice = subtotal - discountAmount;

  // Seña 20% y Saldo 80%
  const deposit = Math.round(totalPrice * 0.2);
  const remaining = totalPrice - deposit;
  const totalDuration = (service ? service.duration : 0) + extras.reduce((acc, curr) => acc + curr.duration, 0);

  const handleConfirmAndShowSuccess = () => {
    onConfirmWhatsApp();
    setIsSuccessState(true);
  };

  const handleFinishAndGoHome = () => {
    setIsSuccessState(false);
    onClose();
    onBackToHome();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-fade-in">
      
      {/* Modal Sobrepuesto Amplio */}
      <div className="relative w-full max-w-5xl max-h-[94vh] bg-[#FAF8F5] rounded-3xl border border-[#E9E2DB] shadow-2xl flex flex-col overflow-hidden text-[#2C2420]">
        
        {/* PANTALLA 2: CONFIRMACIÓN EXITOSA */}
        {isSuccessState ? (
          <div className="p-8 sm:p-14 flex flex-col items-center justify-center text-center space-y-6 animate-fade-in my-auto">
            
            {/* Icono de Check Verde de Autoridad */}
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-lg border border-emerald-200">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <div className="space-y-2 max-w-md">
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#9E5742]">
                Pre-Reserva Registrada
              </span>
              <h2 
                className="text-3xl sm:text-4xl font-light text-[#2C2420]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                ¡Tu Cita Está en Camino!
              </h2>
              <p className="text-xs sm:text-sm text-[#7A6B62] leading-relaxed">
                Hemos abierto tu WhatsApp con el desglose exacto de tu cita. Coordina con Samm el abono de la seña del <strong>20% (S/ {deposit})</strong> por Yape o Plin para pasar tu casilla a confirmada.
              </p>
            </div>

            {/* Tarjeta Resumen Rápido */}
            <div className="w-full max-w-md bg-white p-5 rounded-2xl border border-[#E9E2DB] text-left text-xs space-y-2 shadow-2xs">
              <div className="flex justify-between border-b border-[#F2ECE4] pb-2">
                <span className="text-[#7A6B62]">Tratamiento:</span>
                <span className="font-semibold text-[#2C2420]">{service?.name}</span>
              </div>
              <div className="flex justify-between border-b border-[#F2ECE4] pb-2">
                <span className="text-[#7A6B62]">Fecha y Hora:</span>
                <span className="font-semibold text-[#2C2420]">{selectedDate} · {selectedTime || "11:30"} hrs</span>
              </div>
              <div className="flex justify-between border-b border-[#F2ECE4] pb-2">
                <span className="text-[#7A6B62]">Clienta:</span>
                <span className="font-semibold text-[#2C2420]">{clientName}</span>
              </div>
              <div className="flex justify-between pt-1 text-[#9E5742] font-bold">
                <span>Seña 20% a transferir:</span>
                <span className="text-sm">S/ {deposit}</span>
              </div>
            </div>

            {/* Botones de Acción */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md pt-2">
              <button
                onClick={handleFinishAndGoHome}
                className="w-full py-4 px-6 rounded-full bg-[#2C2420] text-white hover:bg-[#463A34] text-xs font-semibold transition-all shadow-md flex items-center justify-center gap-2 group"
              >
                <Home className="w-4 h-4" />
                <span>Volver al Inicio</span>
              </button>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-[#9E8F86] pt-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#9E5742]" />
              <span>Recuerda que tienes hasta 4 horas antes para re-agendar sin costo</span>
            </div>

          </div>
        ) : (
          /* PANTALLA 1: FORMULARIO Y SELECCIÓN DE TURNO */
          <>
            {/* Header Superior */}
            <div className="px-6 py-4 border-b border-[#EAE3DA] flex items-center justify-between bg-white/80 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#9E5742]/10 text-[#9E5742] flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#9E5742]">Atelier Cita Privada</span>
                  <h2 className="text-xl sm:text-2xl font-light text-[#2C2420]" style={{ fontFamily: "var(--font-serif)" }}>
                    Configura tu Cita & Agenda
                  </h2>
                </div>
              </div>
              
              <button
                onClick={onClose}
                className="p-2 text-[#7A6B62] hover:text-[#2C2420] rounded-full hover:bg-black/5 transition-colors"
                aria-label="Cerrar modal de cita"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cuerpo Dividido en 2 Columnas */}
            <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* COLUMNA IZQUIERDA (7 COLS): EXTRAS ARRIBA + AGENDA SEMANAL ABAJO */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* 1. Selector de Extras */}
                <div className="bg-white p-5 rounded-2xl border border-[#E9E2DB] shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#2C2420]">
                        1. Complementos & Diseños Extras
                      </h3>
                      <p className="text-[11px] text-[#7A6B62]">
                        Suma tiempo a tu cita para retiro de acrílico ajeno o arte a mano alzada.
                      </p>
                    </div>
                    <span className="text-[11px] font-semibold text-[#9E5742]">
                      {extras.length} seleccionados
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {allAvailableExtras.map((ext) => {
                      const isChecked = extras.some((e) => e.id === ext.id);
                      return (
                        <button
                          key={ext.id}
                          type="button"
                          onClick={() => onToggleExtra(ext)}
                          className={`p-3 rounded-xl border text-left transition-all flex items-start justify-between gap-2 ${
                            isChecked
                              ? "bg-[#FAF4F0] border-[#9E5742] ring-1 ring-[#9E5742]/40"
                              : "bg-[#FAF8F5] border-[#EAE3DA] hover:border-[#9E5742]"
                          }`}
                        >
                          <div className="space-y-0.5">
                            <span className="font-semibold text-xs text-[#2C2420] block">{ext.name}</span>
                            <span className="text-[10px] text-[#7A6B62]">+{ext.duration} min · S/ {ext.price}</span>
                          </div>
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            isChecked ? "bg-[#9E5742] text-white" : "border border-[#C8BDB4] text-transparent"
                          }`}>
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Agenda Semanal */}
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#7A6B62] block mb-2">
                    2. Fecha & Turno en Cabina
                  </span>
                  <WeeklySchedulePicker
                    selectedDate={selectedDate}
                    onSelectDate={onSelectDate}
                    selectedTime={selectedTime}
                    onSelectTime={onSelectTime}
                    durationMinutes={totalDuration || 120}
                  />
                </div>

                {/* 3. Datos Personales */}
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#7A6B62] block mb-2">
                    3. Tus Datos de Contacto
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Tu nombre completo"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full text-xs p-3.5 rounded-2xl border border-[#E9E2DB] bg-white focus:outline-none focus:ring-1 focus:ring-[#9E5742]"
                    />
                    <input
                      type="tel"
                      placeholder="WhatsApp (ej: 987654321)"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full text-xs p-3.5 rounded-2xl border border-[#E9E2DB] bg-white focus:outline-none focus:ring-1 focus:ring-[#9E5742]"
                    />
                  </div>
                </div>

              </div>

              {/* COLUMNA DERECHA (5 COLS): RESUMEN FINANCIERO Y CONFIRMACIÓN */}
              <div className="lg:col-span-5 flex flex-col space-y-5 bg-white p-6 rounded-3xl border border-[#E9E2DB] shadow-xs h-fit">
                
                <div className="space-y-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#7A6B62] block">
                    4. Resumen de tu Cita
                  </span>

                  {/* Tratamiento Seleccionado */}
                  {service ? (
                    <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE3DA]">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-[#9E5742] tracking-wider block">Tratamiento Base</span>
                          <h4 className="font-medium text-sm text-[#2C2420] mt-0.5">{service.name}</h4>
                          <p className="text-xs text-[#7A6B62] mt-1 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-[#9E5742]" />
                            {service.duration} min cerrado
                          </p>
                        </div>
                        <span className="text-base font-bold text-[#2C2420]" style={{ fontFamily: "var(--font-serif)" }}>
                          S/ {service.price}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 rounded-2xl border border-dashed border-[#C8927B]/60 text-center text-xs text-[#7A6B62]">
                      Selecciona tu tratamiento en la carta.
                    </div>
                  )}

                  {/* Lista de Extras Seleccionados */}
                  {extras.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-xs font-medium text-[#7A6B62] block">
                        Extras añadidos ({extras.length}):
                      </span>
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                        {extras.map((extra) => (
                          <div key={extra.id} className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#EAE3DA] flex items-center justify-between text-xs">
                            <div>
                              <span className="font-medium text-[#2C2420]">{extra.name}</span>
                              <span className="text-[#9E8F86] text-[11px] ml-1">(+{extra.duration}m)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-[#9E5742]">+S/ {extra.price}</span>
                              <button
                                onClick={() => onRemoveExtra(extra.id)}
                                className="text-[#9E8F86] hover:text-red-500 p-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Cupón */}
                  {discountCode && (
                    <div className="p-3 bg-[#C8927B]/10 rounded-2xl border border-[#C8927B]/30 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-[#9E5742]">
                        <Tag className="w-3.5 h-3.5" />
                        <span className="font-semibold">Cupón {discountCode} (-15%)</span>
                      </div>
                      <span className="font-bold text-[#9E5742]">-S/ {discountAmount}</span>
                    </div>
                  )}
                </div>

                {/* Desglose Financiero & Botón de Confirmación */}
                <div className="pt-4 border-t border-[#EAE3DA] space-y-4">
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between text-[#7A6B62]">
                      <span>Duración total estimada:</span>
                      <span className="font-semibold text-[#2C2420]">{totalDuration} min</span>
                    </div>
                    <div className="flex justify-between text-[#7A6B62]">
                      <span>Total presupuesto:</span>
                      <span className="font-bold text-base text-[#2C2420]">S/ {totalPrice}</span>
                    </div>
                    <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#EAE3DA] flex items-center justify-between text-[#9E5742]">
                      <div>
                        <span className="font-bold block text-xs">Seña para asegurar turno (20%):</span>
                        <span className="text-[10px] text-[#7A6B62]">Saldo en estudio: S/ {remaining}</span>
                      </div>
                      <span className="text-lg font-bold">S/ {deposit}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleConfirmAndShowSuccess}
                    disabled={!service || !clientName || !clientPhone}
                    className="w-full py-4 px-6 rounded-full bg-[#2C2420] text-white hover:bg-[#463A34] transition-all flex items-center justify-center gap-2 text-xs font-semibold shadow-md disabled:opacity-40 disabled:cursor-not-allowed group"
                  >
                    <span>Confirmar Reserva vía WhatsApp</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>

                  <div className="flex flex-col items-center justify-center gap-1 text-[11px] text-[#9E8F86]">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#9E5742]" />
                      <span>Re-agendamiento hasta 4h antes de la cita</span>
                    </div>
                    {onOpenTerms && (
                      <button
                        type="button"
                        onClick={onOpenTerms}
                        className="text-[10px] text-[#9E5742] underline hover:text-[#2C2420]"
                      >
                        Ver términos y políticas de seña
                      </button>
                    )}
                  </div>
                </div>

              </div>

            </div>
          </>
        )}

      </div>
    </div>
  );
}
