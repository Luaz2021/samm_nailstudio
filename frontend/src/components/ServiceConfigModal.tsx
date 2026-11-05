"use client";

import { useState, useEffect } from "react";
import {
  X,
  Check,
  Plus,
  Minus,
  Sparkles,
  Clock,
  ShieldCheck,
  ShoppingBag,
  Ruler,
  Maximize2,
  Info
} from "lucide-react";
import {
  ServiceItem,
  CartItem,
  LENGTH_OPTIONS,
  SHAPE_OPTIONS,
  EFFECT_OPTIONS_HANDS,
  DESIGN_LEVELS,
  REMOVAL_OPTIONS,
  LengthOption,
  ShapeOption,
  EffectOption,
  RemovalOption
} from "@/data/catalog";
import { getAssetPath } from "@/lib/assets";

interface ServiceConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceItem | null;
  onAddToCart: (item: CartItem) => void;
}

export function ServiceConfigModal({
  isOpen,
  onClose,
  service,
  onAddToCart
}: ServiceConfigModalProps) {
  const [finish, setFinish] = useState<"color_entero" | "francesa">("color_entero");
  const [selectedLength, setSelectedLength] = useState<LengthOption>(LENGTH_OPTIONS[0]);
  const [selectedShape, setSelectedShape] = useState<ShapeOption>(SHAPE_OPTIONS[0]);
  const [selectedEffect, setSelectedEffect] = useState<EffectOption>(EFFECT_OPTIONS_HANDS[0]);
  const [designN1, setDesignN1] = useState(0);
  const [designN2, setDesignN2] = useState(0);
  const [designN3, setDesignN3] = useState(0);
  const [selectedRemoval, setSelectedRemoval] = useState<RemovalOption>(REMOVAL_OPTIONS[0]);

  // Modal para ver imagen ampliada / referencial
  const [zoomedImage, setZoomedImage] = useState<{ url: string; title: string; desc: string } | null>(null);

  // Extras específicos de Pedicura
  const [reconstructedToes, setReconstructedToes] = useState(0);
  const [pediEffect, setPediEffect] = useState(false);
  const [pediDesignToes, setPediDesignToes] = useState(false);

  // Reiniciar estado al cambiar de servicio
  useEffect(() => {
    if (service) {
      setFinish("color_entero");
      setSelectedLength(LENGTH_OPTIONS[0]);
      setSelectedShape(SHAPE_OPTIONS[0]);
      setSelectedEffect(EFFECT_OPTIONS_HANDS[0]);
      setDesignN1(0);
      setDesignN2(0);
      setDesignN3(0);
      setSelectedRemoval(REMOVAL_OPTIONS[0]);
      setReconstructedToes(0);
      setPediEffect(false);
      setPediDesignToes(false);
      setZoomedImage(null);
    }
  }, [service]);

  if (!isOpen || !service) return null;

  const isPedicura = service.category === "pedicura";
  const supportsLength = service.supportsLength ?? false;
  const supportsShape = service.supportsShape ?? false;

  // Cálculo de precio en vivo
  const lengthPrice = supportsLength ? selectedLength.price : 0;
  const shapePrice = supportsShape ? selectedShape.price : 0;
  const effectPrice = !isPedicura ? selectedEffect.price : 0;
  const designPrice = !isPedicura ? (designN1 * 2.5) + (designN2 * 5.0) + (designN3 * 8.0) : 0;
  const removalPrice = selectedRemoval.price;

  const pediExtrasPrice = isPedicura
    ? (reconstructedToes * 10) + (pediEffect ? 5 : 0) + (pediDesignToes ? 5 : 0)
    : 0;

  const totalPrice = service.price + lengthPrice + shapePrice + effectPrice + designPrice + removalPrice + pediExtrasPrice;

  // Cálculo de duración en vivo
  const effectDuration = !isPedicura ? selectedEffect.duration : 0;
  const designDuration = !isPedicura ? (designN1 * 3) + (designN2 * 5) + (designN3 * 8) : 0;
  const removalDuration = selectedRemoval.duration;
  const totalDuration = service.duration + effectDuration + designDuration + removalDuration;

  const handleAdd = () => {
    const cartItem: CartItem = {
      id: `cart-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      serviceId: service.id,
      name: service.name,
      category: isPedicura ? "pedicura" : "manicura",
      basePrice: service.price,
      baseDuration: service.duration,
      imgUrl: service.imgUrl,
      finish,
      length: supportsLength ? selectedLength : undefined,
      shape: supportsShape ? selectedShape : undefined,
      effect: !isPedicura ? selectedEffect : undefined,
      designN1,
      designN2,
      designN3,
      removal: selectedRemoval,
      reconstructedToes: isPedicura ? reconstructedToes : undefined,
      pediEffect: isPedicura ? pediEffect : undefined,
      pediDesignToes: isPedicura ? pediDesignToes : undefined,
      totalPrice,
      totalDuration,
    };

    onAddToCart(cartItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[94vh] bg-[#FAF8F5] rounded-3xl border border-[#E9E2DB] shadow-2xl flex flex-col overflow-hidden text-[#2C2420]">
        
        {/* Cabecera del Configurador */}
        <div className="px-5 sm:px-6 py-3.5 border-b border-[#EAE3DA] flex items-center justify-between bg-white/90 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#9E5742]/10 text-[#9E5742] flex items-center justify-center font-bold text-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#9E5742]">
                Guía Visual & Personalización · {isPedicura ? "Pies" : "Manos"}
              </span>
              <h2 className="text-lg sm:text-xl font-light text-[#2C2420]" style={{ fontFamily: "var(--font-serif)" }}>
                {service.name}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#7A6B62] hover:text-[#2C2420] rounded-full hover:bg-black/5 transition-colors"
            aria-label="Cerrar personalizador"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cuerpo Scrollable con Imágenes Referenciales */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-7 text-xs">
          
          {/* Ficha Resumen del Servicio */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-[#EAE3DA] shadow-2xs">
            <img
              src={getAssetPath(service.imgUrl)}
              alt={service.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-[#2C2420]">{service.name}</span>
                {service.tag && (
                  <span className="px-2 py-0.5 rounded-full bg-[#FAF0EA] text-[#9E5742] text-[9px] font-bold uppercase">
                    {service.tag}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#7A6B62] leading-snug">{service.desc}</p>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] font-semibold text-[#9E5742] pt-1">
                <span>Base: S/ {service.price}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-[#7A6B62]">
                  <Clock className="w-3.5 h-3.5 text-[#9E5742]" />
                  {service.duration} min
                </span>
                {service.includedNotes && (
                  <>
                    <span>•</span>
                    <span className="text-[#6C5F57]">{service.includedNotes}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* 1. ACABADO INCLUIDO (Con Miniaturas Visuales) */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="font-bold uppercase tracking-wider text-[11px] text-[#2C2420] flex items-center gap-1.5">
                <span>1. Acabado Incluido en el Precio Base</span>
              </label>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-semibold border border-emerald-200">
                S/ 0 (Incluido)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Color Entero */}
              <div
                onClick={() => setFinish("color_entero")}
                className={`cursor-pointer rounded-2xl border p-3 flex items-center gap-3.5 transition-all bg-white hover:border-[#9E5742] ${
                  finish === "color_entero"
                    ? "border-[#9E5742] ring-2 ring-[#9E5742]/20 shadow-xs"
                    : "border-[#EAE3DA]"
                }`}
              >
                <img
                  src={getAssetPath("/images/efectos/color-entero.webp")}
                  alt="Color Entero"
                  className="w-14 h-14 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-[#2C2420]">Color Entero</span>
                    {finish === "color_entero" && <Check className="w-4 h-4 text-[#9E5742]" />}
                  </div>
                  <p className="text-[10px] text-[#7A6B62] mt-0.5">Esmaltado en un solo tono uniforme sobre todo el set.</p>
                  <span className="text-[10px] text-emerald-700 font-semibold mt-1 inline-block">S/ 0 incluido</span>
                </div>
              </div>

              {/* Francesa Clásica */}
              <div
                onClick={() => setFinish("francesa")}
                className={`cursor-pointer rounded-2xl border p-3 flex items-center gap-3.5 transition-all bg-white hover:border-[#9E5742] ${
                  finish === "francesa"
                    ? "border-[#9E5742] ring-2 ring-[#9E5742]/20 shadow-xs"
                    : "border-[#EAE3DA]"
                }`}
              >
                <img
                  src={getAssetPath("/images/efectos/francesa.webp")}
                  alt="Francesa Clásica"
                  className="w-14 h-14 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-[#2C2420]">Francesa Clásica</span>
                    {finish === "francesa" && <Check className="w-4 h-4 text-[#9E5742]" />}
                  </div>
                  <p className="text-[10px] text-[#7A6B62] mt-0.5">Línea de sonrisa tradicional blanca sobre base nude/lechosa.</p>
                  <span className="text-[10px] text-emerald-700 font-semibold mt-1 inline-block">S/ 0 incluido</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. GUÍA VISUAL DE MEDIDAS Y LARGOS (Con Fotos y Escala en Centímetros) */}
          {supportsLength && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-bold uppercase tracking-wider text-[11px] text-[#2C2420] flex items-center gap-1.5">
                    <Ruler className="w-3.5 h-3.5 text-[#9E5742]" />
                    <span>2. Guía Visual de Largos & Medidas</span>
                  </label>
                  <p className="text-[10px] text-[#7A6B62]">
                    Hasta el número #3 está incluido sin costo adicional en tu precio base.
                  </p>
                </div>
                <span className="text-[10px] text-[#9E5742] font-semibold bg-[#FAF3F0] px-2.5 py-1 rounded-full border border-[#E8D7CE]">
                  {selectedLength.name} ({selectedLength.measureCm})
                </span>
              </div>

              {/* Grid de Largos con Fotos y Medidas en cm */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {LENGTH_OPTIONS.map((len, idx) => {
                  const isSelected = selectedLength.id === len.id;
                  const scalePercent = [35, 60, 80, 100][idx];

                  return (
                    <div
                      key={len.id}
                      onClick={() => setSelectedLength(len)}
                      className={`cursor-pointer rounded-2xl border overflow-hidden transition-all bg-white flex flex-col justify-between hover:shadow-md ${
                        isSelected
                          ? "border-[#9E5742] ring-2 ring-[#9E5742]/20 shadow-xs"
                          : "border-[#EAE3DA] hover:border-[#D5C6BA]"
                      }`}
                    >
                      {/* Foto Referencial del Largo */}
                      <div className="relative aspect-[4/3] w-full bg-[#FAF6F2] overflow-hidden group">
                        <img
                          src={getAssetPath(len.imgUrl)}
                          alt={len.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        
                        {/* Badge de Medida en Centímetros */}
                        <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-white/95 backdrop-blur-md text-[10px] font-bold text-[#2C2420] shadow-xs flex items-center gap-1">
                          <Ruler className="w-3 h-3 text-[#9E5742]" />
                          <span>{len.measureCm}</span>
                        </div>

                        {/* Botón lupa para ver foto ampliada */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (len.imgUrl) {
                              setZoomedImage({
                                url: len.imgUrl,
                                title: `${len.name} (${len.measureCm})`,
                                desc: len.desc || ""
                              });
                            }
                          }}
                          className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
                          title="Ver foto de referencia ampliada"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                        </button>

                        <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-white">
                          <span className="font-bold text-xs">{len.name}</span>
                          <span className="text-[11px] font-bold bg-[#9E5742] px-2 py-0.5 rounded-full">
                            {len.price === 0 ? "Incluido" : `+ S/ ${len.price}`}
                          </span>
                        </div>
                      </div>

                      {/* Información y Barra Gráfica de Escala */}
                      <div className="p-3 space-y-2 flex-1 flex flex-col justify-between">
                        <p className="text-[10px] text-[#7A6B62] leading-tight">
                          {len.desc}
                        </p>

                        {/* Escala Gráfica Visual */}
                        <div className="pt-1">
                          <div className="flex justify-between text-[9px] text-[#9E8F86] mb-1 font-mono">
                            <span>#1 Corto</span>
                            <span>#6 XL</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-[#F2ECE4] overflow-hidden">
                            <div
                              className={`h-full transition-all duration-300 ${isSelected ? "bg-[#9E5742]" : "bg-[#C8927B]/60"}`}
                              style={{ width: `${scalePercent}%` }}
                            />
                          </div>
                        </div>

                        {/* Indicador de Selección */}
                        <div className="pt-2 border-t border-[#F2ECE4] flex items-center justify-between text-[10px]">
                          <span className={`font-semibold ${isSelected ? "text-[#9E5742]" : "text-[#7A6B62]"}`}>
                            {isSelected ? "Seleccionado" : "Elegir este largo"}
                          </span>
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                            isSelected ? "bg-[#9E5742] border-[#9E5742] text-white" : "border-[#D5C6BA]"
                          }`}>
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. FORMAS DE PUNTA CON FOTOS REFERENCIALES */}
          {supportsShape && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-bold uppercase tracking-wider text-[11px] text-[#2C2420] flex items-center gap-1.5">
                    <span>3. Geometría & Forma de Punta</span>
                  </label>
                  <p className="text-[10px] text-[#7A6B62]">
                    Elige la silueta y limado de autor que mejor estilice tus manos.
                  </p>
                </div>
                <span className="text-[10px] text-[#9E5742] font-semibold bg-[#FAF3F0] px-2.5 py-1 rounded-full border border-[#E8D7CE]">
                  {selectedShape.name}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {SHAPE_OPTIONS.map((shape) => {
                  const isSelected = selectedShape.id === shape.id;

                  return (
                    <div
                      key={shape.id}
                      onClick={() => setSelectedShape(shape)}
                      className={`cursor-pointer rounded-2xl border overflow-hidden transition-all bg-white flex flex-col justify-between hover:shadow-md ${
                        isSelected
                          ? "border-[#9E5742] ring-2 ring-[#9E5742]/20 shadow-xs"
                          : "border-[#EAE3DA] hover:border-[#D5C6BA]"
                      }`}
                    >
                      <div className="relative aspect-square w-full bg-[#FAF6F2] overflow-hidden group">
                        <img
                          src={getAssetPath(shape.imgUrl)}
                          alt={shape.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (shape.imgUrl) {
                              setZoomedImage({
                                url: shape.imgUrl,
                                title: shape.name,
                                desc: shape.desc || ""
                              });
                            }
                          }}
                          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
                          title="Ver forma ampliada"
                        >
                          <Maximize2 className="w-3 h-3" />
                        </button>

                        <div className="absolute bottom-2 left-2 right-2">
                          <span className="font-bold text-xs text-white block leading-tight">{shape.name}</span>
                          <span className="text-[9px] text-[#EAD8CE] block mt-0.5">
                            {shape.price === 0 ? "Incluida" : `+ S/ ${shape.price}`}
                          </span>
                        </div>
                      </div>

                      <div className="p-2.5 space-y-1.5 flex-1 flex flex-col justify-between">
                        <p className="text-[10px] text-[#7A6B62] leading-tight line-clamp-2">
                          {shape.desc}
                        </p>
                        <div className="flex items-center justify-between text-[10px] pt-1 border-t border-[#F2ECE4]">
                          <span className={`font-semibold ${isSelected ? "text-[#9E5742]" : "text-[#9E8F86]"}`}>
                            {isSelected ? "Activa" : "Elegir"}
                          </span>
                          <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border ${
                            isSelected ? "bg-[#9E5742] border-[#9E5742] text-white" : "border-[#D5C6BA]"
                          }`}>
                            {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 4. EFECTOS ESPECIALES EN SET COMPLETO CON FOTOS */}
          {!isPedicura && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-bold uppercase tracking-wider text-[11px] text-[#2C2420] flex items-center gap-1.5">
                    <span>4. Efectos Especiales en Set Completo (10 uñas)</span>
                  </label>
                  <p className="text-[10px] text-[#7A6B62]">
                    Pigmentos iridiscentes cromo, polvo de perla o difuminado ombré.
                  </p>
                </div>
                <span className="text-[10px] text-[#9E5742] font-semibold bg-[#FAF3F0] px-2.5 py-1 rounded-full border border-[#E8D7CE]">
                  {selectedEffect.name}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {EFFECT_OPTIONS_HANDS.map((eff) => {
                  const isSelected = selectedEffect.id === eff.id;

                  return (
                    <div
                      key={eff.id}
                      onClick={() => setSelectedEffect(eff)}
                      className={`cursor-pointer rounded-2xl border overflow-hidden transition-all bg-white flex flex-col justify-between hover:shadow-md ${
                        isSelected
                          ? "border-[#9E5742] ring-2 ring-[#9E5742]/20 shadow-xs"
                          : "border-[#EAE3DA] hover:border-[#D5C6BA]"
                      }`}
                    >
                      <div className="relative aspect-[16/9] w-full bg-[#FAF6F2] overflow-hidden group">
                        <img
                          src={getAssetPath(eff.imgUrl)}
                          alt={eff.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (eff.imgUrl) {
                              setZoomedImage({
                                url: eff.imgUrl,
                                title: eff.name,
                                desc: eff.desc || ""
                              });
                            }
                          }}
                          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
                          title="Ver efecto ampliado"
                        >
                          <Maximize2 className="w-3 h-3" />
                        </button>

                        <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-white">
                          <span className="font-bold text-xs truncate mr-2">{eff.name}</span>
                          <span className="text-[10px] font-bold bg-[#9E5742] px-2 py-0.5 rounded-full shrink-0">
                            {eff.price === 0 ? "Sin extra" : `+ S/ ${eff.price}`}
                          </span>
                        </div>
                      </div>

                      <div className="p-3 space-y-1.5 flex-1 flex flex-col justify-between">
                        <p className="text-[10px] text-[#7A6B62] leading-tight">
                          {eff.desc}
                        </p>
                        <div className="flex items-center justify-between text-[10px] pt-1.5 border-t border-[#F2ECE4]">
                          <span className={`font-semibold ${isSelected ? "text-[#9E5742]" : "text-[#7A6B62]"}`}>
                            {isSelected ? "Seleccionado" : "Elegir efecto"}
                          </span>
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                            isSelected ? "bg-[#9E5742] border-[#9E5742] text-white" : "border-[#D5C6BA]"
                          }`}>
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 5. DISEÑO Y DECORACIÓN POR NIVEL (CON FOTOS REALES Y EJEMPLOS DE QUÉ INCLUYE CADA PRECIO) */}
          {!isPedicura && (
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-bold uppercase tracking-wider text-[11px] text-[#2C2420] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#9E5742]" />
                    <span>5. Diseños & Decoración de Autor (Por Uña)</span>
                  </label>
                  <p className="text-[10px] text-[#7A6B62]">
                    Mira las fotos referenciales para ver qué técnicas manejamos en cada precio e indica cuántas uñas deseas decorar.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-[#9E8F86] block">Total Diseño</span>
                  <span className="text-sm font-bold text-[#9E5742]" style={{ fontFamily: "var(--font-serif)" }}>
                    S/ {designPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Las 3 Tarjetas de Nivel con Foto Grande de Referencia */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* NIVEL 1 */}
                <div className="rounded-2xl border border-[#EAE3DA] bg-white overflow-hidden shadow-2xs flex flex-col justify-between hover:border-[#9E5742] transition-colors">
                  <div className="relative aspect-[4/3] w-full bg-[#FAF6F2] overflow-hidden group glaze-shimmer">
                    <img
                      src={getAssetPath(DESIGN_LEVELS[0].imgUrl)}
                      alt={DESIGN_LEVELS[0].name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-[#2C2420] text-white text-[9px] uppercase font-bold tracking-wider">
                      Nivel 1
                    </span>

                    <button
                      type="button"
                      onClick={() => setZoomedImage({
                        url: DESIGN_LEVELS[0].imgUrl,
                        title: "Ejemplos de Diseño Nivel 1 (Básico)",
                        desc: DESIGN_LEVELS[0].desc
                      })}
                      className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
                      title="Ver ejemplos ampliados"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="absolute bottom-2.5 left-3 right-3 flex items-baseline justify-between text-white">
                      <span className="font-bold text-sm">Básico</span>
                      <span className="text-xs font-bold bg-[#9E5742] px-2 py-0.5 rounded-full">
                        + S/ 2.50 c/u
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-[10px] text-[#7A6B62] leading-snug">
                        {DESIGN_LEVELS[0].desc}
                      </p>
                      
                      {/* Píldoras de Técnicas que maneja este precio */}
                      <div className="flex flex-wrap gap-1 mt-2.5">
                        {DESIGN_LEVELS[0].examples.map((ex, i) => (
                          <span
                            key={i}
                            className="text-[9px] px-2 py-0.5 rounded-md bg-[#FBF8F6] border border-[#EAE3DA] text-[#6C5F57] font-medium"
                          >
                            {ex}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Selector de Cantidad de Uñas */}
                    <div className="pt-3 border-t border-[#F2ECE4] flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-[#2C2420]">
                        ¿Cuántas uñas? ({designN1})
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setDesignN1(Math.max(0, designN1 - 1))}
                          disabled={designN1 === 0}
                          className="w-7 h-7 rounded-lg border border-[#D5C6BA] flex items-center justify-center text-[#2C2420] disabled:opacity-30 hover:bg-[#FAF8F5]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center font-bold text-xs">{designN1}</span>
                        <button
                          type="button"
                          onClick={() => setDesignN1(Math.min(10, designN1 + 1))}
                          disabled={designN1 + designN2 + designN3 >= 10}
                          className="w-7 h-7 rounded-lg bg-[#2C2420] text-white flex items-center justify-center disabled:opacity-30 hover:bg-[#463A34]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* NIVEL 2 */}
                <div className="rounded-2xl border border-[#EAE3DA] bg-white overflow-hidden shadow-2xs flex flex-col justify-between hover:border-[#9E5742] transition-colors">
                  <div className="relative aspect-[4/3] w-full bg-[#FAF6F2] overflow-hidden group glaze-shimmer">
                    <img
                      src={getAssetPath(DESIGN_LEVELS[1].imgUrl)}
                      alt={DESIGN_LEVELS[1].name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-[#9E5742] text-white text-[9px] uppercase font-bold tracking-wider">
                      Nivel 2 · Tendencia
                    </span>

                    <button
                      type="button"
                      onClick={() => setZoomedImage({
                        url: DESIGN_LEVELS[1].imgUrl,
                        title: "Ejemplos de Diseño Nivel 2 (Intermedio)",
                        desc: DESIGN_LEVELS[1].desc
                      })}
                      className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
                      title="Ver ejemplos ampliados"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="absolute bottom-2.5 left-3 right-3 flex items-baseline justify-between text-white">
                      <span className="font-bold text-sm">Intermedio</span>
                      <span className="text-xs font-bold bg-[#9E5742] px-2 py-0.5 rounded-full">
                        + S/ 5.00 c/u
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-[10px] text-[#7A6B62] leading-snug">
                        {DESIGN_LEVELS[1].desc}
                      </p>
                      
                      {/* Píldoras de Técnicas */}
                      <div className="flex flex-wrap gap-1 mt-2.5">
                        {DESIGN_LEVELS[1].examples.map((ex, i) => (
                          <span
                            key={i}
                            className="text-[9px] px-2 py-0.5 rounded-md bg-[#FBF8F6] border border-[#EAE3DA] text-[#6C5F57] font-medium"
                          >
                            {ex}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Selector de Cantidad de Uñas */}
                    <div className="pt-3 border-t border-[#F2ECE4] flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-[#2C2420]">
                        ¿Cuántas uñas? ({designN2})
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setDesignN2(Math.max(0, designN2 - 1))}
                          disabled={designN2 === 0}
                          className="w-7 h-7 rounded-lg border border-[#D5C6BA] flex items-center justify-center text-[#2C2420] disabled:opacity-30 hover:bg-[#FAF8F5]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center font-bold text-xs">{designN2}</span>
                        <button
                          type="button"
                          onClick={() => setDesignN2(Math.min(10, designN2 + 1))}
                          disabled={designN1 + designN2 + designN3 >= 10}
                          className="w-7 h-7 rounded-lg bg-[#2C2420] text-white flex items-center justify-center disabled:opacity-30 hover:bg-[#463A34]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* NIVEL 3 */}
                <div className="rounded-2xl border border-[#EAE3DA] bg-white overflow-hidden shadow-2xs flex flex-col justify-between hover:border-[#9E5742] transition-colors">
                  <div className="relative aspect-[4/3] w-full bg-[#FAF6F2] overflow-hidden group glaze-shimmer">
                    <img
                      src={getAssetPath(DESIGN_LEVELS[2].imgUrl)}
                      alt={DESIGN_LEVELS[2].name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-[#C8927B] text-white text-[9px] uppercase font-bold tracking-wider">
                      Nivel 3 · Alta Gama
                    </span>

                    <button
                      type="button"
                      onClick={() => setZoomedImage({
                        url: DESIGN_LEVELS[2].imgUrl,
                        title: "Ejemplos de Diseño Nivel 3 (Avanzado / 3D)",
                        desc: DESIGN_LEVELS[2].desc
                      })}
                      className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
                      title="Ver ejemplos ampliados"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="absolute bottom-2.5 left-3 right-3 flex items-baseline justify-between text-white">
                      <span className="font-bold text-sm">Avanzado 3D</span>
                      <span className="text-xs font-bold bg-[#9E5742] px-2 py-0.5 rounded-full">
                        + S/ 8.00 c/u
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-[10px] text-[#7A6B62] leading-snug">
                        {DESIGN_LEVELS[2].desc}
                      </p>
                      
                      {/* Píldoras de Técnicas */}
                      <div className="flex flex-wrap gap-1 mt-2.5">
                        {DESIGN_LEVELS[2].examples.map((ex, i) => (
                          <span
                            key={i}
                            className="text-[9px] px-2 py-0.5 rounded-md bg-[#FBF8F6] border border-[#EAE3DA] text-[#6C5F57] font-medium"
                          >
                            {ex}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Selector de Cantidad de Uñas */}
                    <div className="pt-3 border-t border-[#F2ECE4] flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-[#2C2420]">
                        ¿Cuántas uñas? ({designN3})
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setDesignN3(Math.max(0, designN3 - 1))}
                          disabled={designN3 === 0}
                          className="w-7 h-7 rounded-lg border border-[#D5C6BA] flex items-center justify-center text-[#2C2420] disabled:opacity-30 hover:bg-[#FAF8F5]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center font-bold text-xs">{designN3}</span>
                        <button
                          type="button"
                          onClick={() => setDesignN3(Math.min(10, designN3 + 1))}
                          disabled={designN1 + designN2 + designN3 >= 10}
                          className="w-7 h-7 rounded-lg bg-[#2C2420] text-white flex items-center justify-center disabled:opacity-30 hover:bg-[#463A34]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* EXTRAS DE PIES (Si es Pedicura) CON FOTOS REFERENCIALES */}
          {isPedicura && (
            <div className="space-y-3">
              <label className="font-bold uppercase tracking-wider text-[11px] text-[#2C2420]">
                Extras Exclusivos para Pies
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Reconstrucción uña rota dedo gordo */}
                <div className="p-3.5 bg-white rounded-2xl border border-[#EAE3DA] flex flex-col justify-between space-y-2">
                  <div>
                    <span className="font-semibold text-xs text-[#2C2420] block">Reconstrucción Uña Rota (Dedo Gordo)</span>
                    <p className="text-[10px] text-[#7A6B62] mt-0.5">+ S/ 10 c/u en acrílico podo-estético</p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-[#F2ECE4]">
                    <span className="text-[10px] text-[#6C5F57]">Uñas rotas:</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setReconstructedToes(Math.max(0, reconstructedToes - 1))}
                        disabled={reconstructedToes === 0}
                        className="w-6 h-6 rounded-md border border-[#D5C6BA] flex items-center justify-center text-[#2C2420] disabled:opacity-30"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-4 text-center font-bold text-xs">{reconstructedToes}</span>
                      <button
                        type="button"
                        onClick={() => setReconstructedToes(Math.min(2, reconstructedToes + 1))}
                        disabled={reconstructedToes === 2}
                        className="w-6 h-6 rounded-md bg-[#2C2420] text-white flex items-center justify-center disabled:opacity-30"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Efecto Espejo / Aurora Pies */}
                <div
                  onClick={() => setPediEffect(!pediEffect)}
                  className={`cursor-pointer p-3.5 rounded-2xl border flex flex-col justify-between transition-all bg-white hover:border-[#9E5742] ${
                    pediEffect ? "border-[#9E5742] ring-1 ring-[#9E5742]" : "border-[#EAE3DA]"
                  }`}
                >
                  <div>
                    <span className="font-semibold text-xs text-[#2C2420] block">Efecto Espejo / Aurora / Glaseado</span>
                    <p className="text-[10px] text-[#7A6B62] mt-0.5">+ S/ 5 en los 10 dedos</p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-[#F2ECE4] text-[10px]">
                    <span className={pediEffect ? "text-[#9E5742] font-semibold" : "text-[#7A6B62]"}>
                      {pediEffect ? "Agregado (+S/ 5)" : "Opcional"}
                    </span>
                    <div className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                      pediEffect ? "bg-[#9E5742] border-[#9E5742] text-white" : "border-[#D5C6BA]"
                    }`}>
                      {pediEffect && <Check className="w-3 h-3" />}
                    </div>
                  </div>
                </div>

                {/* Diseño simple en dedos gordos */}
                <div
                  onClick={() => setPediDesignToes(!pediDesignToes)}
                  className={`cursor-pointer p-3.5 rounded-2xl border flex flex-col justify-between transition-all bg-white hover:border-[#9E5742] ${
                    pediDesignToes ? "border-[#9E5742] ring-1 ring-[#9E5742]" : "border-[#EAE3DA]"
                  }`}
                >
                  <div>
                    <span className="font-semibold text-xs text-[#2C2420] block">Diseño / Piedritas en Pulgares</span>
                    <p className="text-[10px] text-[#7A6B62] mt-0.5">+ S/ 5 por el par de dedos gordos</p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-[#F2ECE4] text-[10px]">
                    <span className={pediDesignToes ? "text-[#9E5742] font-semibold" : "text-[#7A6B62]"}>
                      {pediDesignToes ? "Agregado (+S/ 5)" : "Opcional"}
                    </span>
                    <div className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                      pediDesignToes ? "bg-[#9E5742] border-[#9E5742] text-white" : "border-[#D5C6BA]"
                    }`}>
                      {pediDesignToes && <Check className="w-3 h-3" />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 6. RETIRO DE MATERIAL ANTERIOR */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="font-bold uppercase tracking-wider text-[11px] text-[#2C2420]">
                {isPedicura ? "2" : "6"}. Retiro de Material Anterior ({isPedicura ? "Pies" : "Manos"})
              </label>
              <span className="text-[10px] text-[#7A6B62]">Retiro seguro con torno</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {REMOVAL_OPTIONS.map((rem) => {
                const isSelected = selectedRemoval.id === rem.id;
                return (
                  <button
                    key={rem.id}
                    type="button"
                    onClick={() => setSelectedRemoval(rem)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? "border-[#9E5742] bg-[#FAF3F0] text-[#2C2420] font-semibold ring-1 ring-[#9E5742]"
                        : "border-[#EAE3DA] bg-white text-[#6C5F57] hover:border-[#D5C6BA]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold">{rem.name}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#9E5742] shrink-0" />}
                    </div>
                    <p className="text-[10px] text-[#7A6B62] mt-0.5">{rem.desc}</p>
                    <div className={`text-[10px] mt-1 ${isSelected ? "text-[#9E5742] font-bold" : "text-[#9E8F86]"}`}>
                      {rem.price === 0 ? "S/ 0" : `+ S/ ${rem.price} (${rem.duration} min)`}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Barra Inferior Sticky con Resumen en Vivo y Botón de Acción */}
        <div className="p-4 sm:p-5 bg-white border-t border-[#EAE3DA] flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-0 z-10 shadow-lg">
          <div className="flex items-center justify-between w-full sm:w-auto gap-4">
            <div>
              <span className="text-[10px] text-[#9E8F86] uppercase tracking-wider block">Presupuesto Configurado</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[#9E5742]" style={{ fontFamily: "var(--font-serif)" }}>
                  S/ {totalPrice}
                </span>
                <span className="text-xs text-[#7A6B62] flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5 text-[#9E5742]" />
                  {totalDuration} min
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="py-3 px-4 rounded-full border border-[#D5C6BA] text-xs font-semibold text-[#6C5F57] hover:bg-black/5 transition-all"
            >
              Cancelar
            </button>

            <button
              type="button"
              onClick={handleAdd}
              className="flex-1 sm:flex-none py-3 px-6 rounded-full bg-[#2C2420] text-white hover:bg-[#463A34] text-xs font-semibold transition-all shadow-md flex items-center justify-center gap-2 group"
            >
              <ShoppingBag className="w-4 h-4 text-[#EAD8CE] group-hover:scale-110 transition-transform" />
              <span>Añadir a Mis Citas</span>
            </button>
          </div>
        </div>

      </div>

      {/* MODAL LIGHTBOX / ZOOM DE IMAGEN REFERENCIAL */}
      {zoomedImage && (
        <div 
          onClick={() => setZoomedImage(null)}
          className="fixed inset-0 z-60 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-lg w-full bg-[#FAF8F5] rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
          >
            <div className="relative aspect-[4/3] w-full bg-black">
              <img
                src={getAssetPath(zoomedImage.url)}
                alt={zoomedImage.title}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setZoomedImage(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 space-y-1.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#9E5742]">
                Referencia Visual de Atelier
              </span>
              <h3 className="text-lg font-light text-[#2C2420]" style={{ fontFamily: "var(--font-serif)" }}>
                {zoomedImage.title}
              </h3>
              <p className="text-xs text-[#7A6B62] leading-relaxed">
                {zoomedImage.desc}
              </p>
              <button
                type="button"
                onClick={() => setZoomedImage(null)}
                className="w-full mt-3 py-2.5 rounded-xl bg-[#2C2420] text-white text-xs font-semibold hover:bg-[#463A34] transition-all"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
