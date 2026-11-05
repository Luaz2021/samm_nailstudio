"use client";

import { useState } from "react";
import {
  X,
  Clock,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Plus,
  CheckCircle2,
  Home,
  Sparkles,
  MessageCircle,
  Tag
} from "lucide-react";
import { WeeklySchedulePicker } from "./WeeklySchedulePicker";
import { CartItem } from "@/data/catalog";
import { getAssetPath } from "@/lib/assets";

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
  cartItems: CartItem[];
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  selectedDate: string;
  onSelectDate: (date: string) => void;
  selectedTime: string;
  onSelectTime: (time: string) => void;
  discountCode: string;
  onApplyDiscount: (code: string) => void;
  clientName: string;
  setClientName: (val: string) => void;
  clientPhone: string;
  setClientPhone: (val: string) => void;
  onConfirmWhatsApp: () => void;
  onAddMoreServices: () => void;
  onOpenTerms?: () => void;
  onBackToHome: () => void;
}

export function BookingDrawer({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onClearCart,
  selectedDate,
  onSelectDate,
  selectedTime,
  onSelectTime,
  discountCode,
  onApplyDiscount,
  clientName,
  setClientName,
  clientPhone,
  setClientPhone,
  onConfirmWhatsApp,
  onAddMoreServices,
  onOpenTerms,
  onBackToHome,
}: BookingDrawerProps) {
  const [isSuccessState, setIsSuccessState] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!isOpen) return null;

  // Cálculos consolidados del Carrito
  const subtotal = cartItems.reduce((acc, curr) => acc + curr.totalPrice, 0);
  const isDiscountActive = discountCode === "SAMM15";
  const discountAmount = isDiscountActive ? Math.round(subtotal * 0.15) : 0;
  const totalPrice = Math.max(0, subtotal - discountAmount);

  // Seña 20% y Saldo 80%
  const deposit = Math.round(totalPrice * 0.2);
  const remaining = totalPrice - deposit;
  const totalDuration = cartItems.reduce((acc, curr) => acc + curr.totalDuration, 0);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    if (couponInput.trim().toUpperCase() === "SAMM15") {
      onApplyDiscount("SAMM15");
      setCouponError(null);
    } else {
      setCouponError("Cupón no válido");
    }
  };

  const handleConfirmAndShowSuccess = () => {
    if (!clientName.trim() || !clientPhone.trim()) {
      alert("Por favor completa tu nombre y número de WhatsApp para coordinar tu cita.");
      return;
    }
    onConfirmWhatsApp();
    setIsSuccessState(true);
  };

  const handleFinishAndGoHome = () => {
    setIsSuccessState(false);
    onClearCart();
    onClose();
    onBackToHome();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-fade-in">
      
      {/* Modal Sobrepuesto Amplio (2 Columnas: Producto a la Izquierda, Fecha a la Derecha) */}
      <div className="relative w-full max-w-6xl max-h-[94vh] bg-[#FAF8F5] rounded-3xl border border-[#E9E2DB] shadow-2xl flex flex-col overflow-hidden text-[#2C2420]">
        
        {/* PANTALLA 2: CONFIRMACIÓN EXITOSA */}
        {isSuccessState ? (
          <div className="p-8 sm:p-14 flex flex-col items-center justify-center text-center space-y-6 animate-fade-in my-auto">
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
                Hemos preparado tu mensaje de WhatsApp con el desglose exacto de tus <strong>{cartItems.length} servicio(s)</strong>. Realiza la seña del <strong>20% (S/ {deposit})</strong> por Yape o Plin para pasar tu turno a confirmado.
              </p>
            </div>

            {/* Tarjeta Resumen */}
            <div className="w-full max-w-md bg-white p-5 rounded-2xl border border-[#E9E2DB] text-left text-xs space-y-2 shadow-2xs">
              <div className="flex justify-between border-b border-[#F2ECE4] pb-2">
                <span className="text-[#7A6B62]">Servicios:</span>
                <span className="font-semibold text-[#2C2420] text-right">
                  {cartItems.map(c => c.name).join(", ")}
                </span>
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

            {/* Botón de Salida */}
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
              <span>Puedes re-agendar hasta 4 horas antes sin costo adicional</span>
            </div>
          </div>
        ) : (
          /* PANTALLA 1: MODAL DE CARRITO (IZQUIERDA: DESCRIPCIÓN DE PRODUCTO | DERECHA: FECHA) */
          <>
            {/* Header Superior */}
            <div className="px-6 py-4 border-b border-[#EAE3DA] flex items-center justify-between bg-white/90 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#9E5742]/10 text-[#9E5742] flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#9E5742]">
                    Atelier Samm · Cita Privada
                  </span>
                  <h2 className="text-xl sm:text-2xl font-light text-[#2C2420]" style={{ fontFamily: "var(--font-serif)" }}>
                    Mis Citas & Selección de Fecha
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

            {/* Cuerpo Dividido en 2 Columnas Estrictas */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
              
              {/* ======================================================== */}
              {/* COLUMNA IZQUIERDA (6 COLS): DESCRIPCIÓN DEL PRODUCTO / SERVICIOS */}
              {/* ======================================================== */}
              <div className="lg:col-span-6 space-y-5">
                
                {/* Título de Sección */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#2C2420]">
                      1. Descripción de tus Tratamientos ({cartItems.length})
                    </h3>
                    <p className="text-[11px] text-[#7A6B62]">
                      Detalle transparente de cada servicio configurado con sus extras y retiros.
                    </p>
                  </div>
                  {cartItems.length > 0 && (
                    <button
                      type="button"
                      onClick={onClearCart}
                      className="text-[10px] text-red-600 hover:underline font-semibold"
                    >
                      Vaciar todo
                    </button>
                  )}
                </div>

                {/* Si no hay servicios en el carrito */}
                {cartItems.length === 0 ? (
                  <div className="p-8 rounded-2xl border border-dashed border-[#D5C6BA] bg-white text-center space-y-3">
                    <ShoppingBag className="w-10 h-10 text-[#D5C6BA] mx-auto" />
                    <p className="text-xs text-[#7A6B62]">Aún no has agregado ningún servicio a tu cita.</p>
                    <button
                      type="button"
                      onClick={onAddMoreServices}
                      className="px-5 py-2.5 rounded-full bg-[#2C2420] text-white text-xs font-semibold hover:bg-[#463A34] transition-all"
                    >
                      Explorar Catálogo de Servicios
                    </button>
                  </div>
                ) : (
                  /* Lista de Servicios Agregados */
                  <div className="space-y-3">
                    {cartItems.map((item, index) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-2xl bg-white border border-[#E9E2DB] shadow-2xs space-y-2.5 relative group hover:border-[#9E5742] transition-colors"
                      >
                        {/* Fila Principal: Foto, Nombre y Precio */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={getAssetPath(item.imgUrl)}
                              alt={item.name}
                              className="w-12 h-12 rounded-xl object-cover shrink-0"
                            />
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-[10px] uppercase font-bold text-[#9E5742]">
                                  {index + 1}. {item.category === "pedicura" ? "Pies" : "Manos"}
                                </span>
                              </div>
                              <h4 className="font-semibold text-sm text-[#2C2420] leading-snug">
                                {item.name}
                              </h4>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="font-bold text-sm text-[#9E5742]" style={{ fontFamily: "var(--font-serif)" }}>
                              S/ {item.totalPrice}
                            </span>
                            <div className="text-[10px] text-[#7A6B62] flex items-center justify-end gap-1 mt-0.5">
                              <Clock className="w-3 h-3 text-[#9E5742]" />
                              <span>{item.totalDuration} min</span>
                            </div>
                          </div>
                        </div>

                        {/* Desglose de Extras y Opciones Configuradas */}
                        <div className="pt-2 border-t border-[#F2ECE4] grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-[#6C5F57]">
                          <div className="flex items-center gap-1">
                            <span className="text-[#9E8F86]">• Acabado:</span>
                            <span className="font-medium text-[#2C2420]">
                              {item.finish === "color_entero" ? "Color Entero" : "Francesa Clásica"}
                            </span>
                          </div>

                          {item.length && (
                            <div className="flex items-center gap-1">
                              <span className="text-[#9E8F86]">• Largo:</span>
                              <span className="font-medium text-[#2C2420]">
                                {item.length.name} {item.length.price > 0 && `(+S/ ${item.length.price})`}
                              </span>
                            </div>
                          )}

                          {item.shape && (
                            <div className="flex items-center gap-1">
                              <span className="text-[#9E8F86]">• Punta:</span>
                              <span className="font-medium text-[#2C2420]">
                                {item.shape.name} {item.shape.price > 0 && `(+S/ ${item.shape.price})`}
                              </span>
                            </div>
                          )}

                          {item.effect && item.effect.price > 0 && (
                            <div className="flex items-center gap-1">
                              <span className="text-[#9E8F86]">• Efecto:</span>
                              <span className="font-medium text-[#2C2420]">
                                {item.effect.name} (+S/ {item.effect.price})
                              </span>
                            </div>
                          )}

                          {/* Diseños por uña */}
                          {(item.designN1 > 0 || item.designN2 > 0 || item.designN3 > 0) && (
                            <div className="flex items-center gap-1 sm:col-span-2">
                              <span className="text-[#9E8F86]">• Diseños:</span>
                              <span className="font-medium text-[#2C2420]">
                                {[
                                  item.designN1 > 0 && `${item.designN1} uña(s) Nivel 1 (+S/ ${(item.designN1 * 2.5).toFixed(2)})`,
                                  item.designN2 > 0 && `${item.designN2} uña(s) Nivel 2 (+S/ ${(item.designN2 * 5).toFixed(2)})`,
                                  item.designN3 > 0 && `${item.designN3} uña(s) Nivel 3 (+S/ ${(item.designN3 * 8).toFixed(2)})`
                                ].filter(Boolean).join(" · ")}
                              </span>
                            </div>
                          )}

                          {/* Extras Pies */}
                          {item.reconstructedToes && item.reconstructedToes > 0 && (
                            <div className="flex items-center gap-1">
                              <span className="text-[#9E8F86]">• Reconstrucción dedo:</span>
                              <span className="font-medium text-[#2C2420]">
                                {item.reconstructedToes} uña(s) (+S/ {item.reconstructedToes * 10})
                              </span>
                            </div>
                          )}

                          {item.pediEffect && (
                            <div className="flex items-center gap-1">
                              <span className="text-[#9E8F86]">• Efecto Pies:</span>
                              <span className="font-medium text-[#2C2420]">Efecto Espejo/Aurora (+S/ 5)</span>
                            </div>
                          )}

                          {item.pediDesignToes && (
                            <div className="flex items-center gap-1">
                              <span className="text-[#9E8F86]">• Diseño pulgares:</span>
                              <span className="font-medium text-[#2C2420]">Piedritas/Diseño simple (+S/ 5)</span>
                            </div>
                          )}

                          {/* Retiro de Material */}
                          <div className="flex items-center gap-1 sm:col-span-2">
                            <span className="text-[#9E8F86]">• Retiro previo:</span>
                            <span className="font-medium text-[#2C2420]">
                              {item.removal.name} {item.removal.price > 0 ? `(+S/ ${item.removal.price})` : "(S/ 0)"}
                            </span>
                          </div>
                        </div>

                        {/* Botón de eliminar servicio */}
                        <div className="pt-2 flex justify-end">
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.id)}
                            className="text-[10px] text-[#9E8F86] hover:text-red-600 flex items-center gap-1 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Eliminar de mi cita</span>
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Botón para seguir agregando servicios sin salir del flujo */}
                    <button
                      type="button"
                      onClick={onAddMoreServices}
                      className="w-full py-3 rounded-2xl border border-dashed border-[#9E5742]/40 bg-[#FAF3F0]/60 hover:bg-[#FAF3F0] text-[#9E5742] text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Agregar otro servicio (ej: Manos o Pies)</span>
                    </button>
                  </div>
                )}

                {/* Cupón Promocional */}
                <div className="bg-white p-4 rounded-2xl border border-[#E9E2DB] shadow-2xs space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#2C2420] uppercase tracking-wider">
                    <Tag className="w-3.5 h-3.5 text-[#9E5742]" />
                    <span>¿Tienes un Cupón de Descuento?</span>
                  </div>
                  {isDiscountActive ? (
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
                      <span className="font-semibold">Cupón SAMM15 Activo (-15%)</span>
                      <span className="font-bold">- S/ {discountAmount}</span>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder="Ej: SAMM15"
                        className="flex-1 px-3.5 py-2 rounded-xl border border-[#D5C6BA] text-xs uppercase bg-[#FAF8F5] focus:outline-none focus:ring-1 focus:ring-[#9E5742]"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-[#2C2420] text-white text-xs font-semibold hover:bg-[#463A34] transition-all"
                      >
                        Aplicar
                      </button>
                    </form>
                  )}
                  {couponError && <p className="text-[10px] text-red-600">{couponError}</p>}
                </div>

                {/* Resumen Financiero y Seña */}
                {cartItems.length > 0 && (
                  <div className="bg-[#FAF3F0] p-5 rounded-2xl border border-[#E8D7CE] space-y-2.5 text-xs">
                    <div className="flex justify-between text-[#7A6B62]">
                      <span>Subtotal servicios ({cartItems.length}):</span>
                      <span className="font-semibold text-[#2C2420]">S/ {subtotal}</span>
                    </div>

                    {isDiscountActive && (
                      <div className="flex justify-between text-emerald-700 font-semibold">
                        <span>Descuento Promocional (-15%):</span>
                        <span>- S/ {discountAmount}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-sm font-bold text-[#2C2420] border-t border-[#E8D7CE] pt-2">
                      <span>Total Presupuesto:</span>
                      <span className="text-base text-[#9E5742]" style={{ fontFamily: "var(--font-serif)" }}>
                        S/ {totalPrice}
                      </span>
                    </div>

                    <div className="flex justify-between text-xs text-[#9E5742] font-semibold bg-white p-2.5 rounded-xl border border-[#E8D7CE]">
                      <span>Seña 20% para asegurar turno (Yape/Plin):</span>
                      <span className="font-bold">S/ {deposit}</span>
                    </div>

                    <div className="flex justify-between text-[11px] text-[#7A6B62]">
                      <span>Saldo restante en cabina (80%):</span>
                      <span>S/ {remaining}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] text-[#7A6B62] pt-1">
                      <Clock className="w-3.5 h-3.5 text-[#9E5742]" />
                      <span>Tiempo total reservado: <strong>{totalDuration} minutos</strong></span>
                    </div>
                  </div>
                )}

              </div>

              {/* ======================================================== */}
              {/* COLUMNA DERECHA (6 COLS): SELECCIÓN DE FECHA Y CONTACTO */}
              {/* ======================================================== */}
              <div className="lg:col-span-6 space-y-5">
                
                {/* 2. Agenda de Fecha y Turno */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#2C2420]">
                    2. Selecciona tu Fecha y Turno
                  </h3>
                  <p className="text-[11px] text-[#7A6B62] mb-3">
                    Elige el día y la hora que mejor se adapte a tu agenda.
                  </p>
                  
                  <WeeklySchedulePicker
                    selectedDate={selectedDate}
                    onSelectDate={onSelectDate}
                    selectedTime={selectedTime}
                    onSelectTime={onSelectTime}
                    durationMinutes={totalDuration || 120}
                  />
                </div>

                {/* 3. Datos de la Clienta */}
                <div className="bg-white p-5 rounded-2xl border border-[#E9E2DB] shadow-2xs space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#2C2420]">
                    3. Datos de Contacto para Confirmación
                  </h3>

                  <div className="space-y-2.5">
                    <div>
                      <label className="text-[11px] font-semibold text-[#6C5F57] block mb-1">
                        Tu Nombre Completo *
                      </label>
                      <input
                        type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Ej: Valeria Mendoza"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C6BA] text-xs bg-[#FAF8F5] focus:outline-none focus:ring-1 focus:ring-[#9E5742]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-[#6C5F57] block mb-1">
                        Número de WhatsApp (Perú +51) *
                      </label>
                      <input
                        type="tel"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="Ej: 959 716 984"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C6BA] text-xs bg-[#FAF8F5] focus:outline-none focus:ring-1 focus:ring-[#9E5742]"
                      />
                    </div>
                  </div>
                </div>

                {/* Botón de Confirmación Principal vía WhatsApp */}
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={handleConfirmAndShowSuccess}
                    disabled={cartItems.length === 0}
                    className="w-full py-4 px-6 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 group disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <MessageCircle className="w-5 h-5 fill-white" />
                    <span>Confirmar Cita vía WhatsApp (Seña: S/ {deposit})</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <div className="flex items-center justify-between text-[10px] text-[#9E8F86] px-2">
                    <div className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#9E5742]" />
                      <span>Re-agendamiento sin costo con 4h de antelación</span>
                    </div>
                    {onOpenTerms && (
                      <button
                        type="button"
                        onClick={onOpenTerms}
                        className="underline hover:text-[#2C2420]"
                      >
                        Políticas del Atelier
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
