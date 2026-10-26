"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles, Play, Pause, RotateCcw, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

interface MotionNailsShowcaseProps {
  className?: string;
}

export function MotionNailsShowcase({ className = "" }: MotionNailsShowcaseProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "1. Limpieza Anatómica & Cutícula",
      subtitle: "Torno Médico & Fresas de Diamante",
      detail: "Micro-fresado cónico de diamante a 15,000 RPM. Eliminación milimétrica de pterigión y piel muerta sin alicates agresivos ni cortes. Pliegues 100% limpios para que el color crezca desde dentro.",
      time: "Fase 01 · 25 min",
      tool: "Fresa cónica suave",
      result: "Bolsillo ungueal libre de cutícula",
      accent: "#C8927B",
      photoPreview: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "2. Preparación Química & Rubber Shield",
      subtitle: "Kapping Elástico Autonivelante",
      detail: "Deshidratación de grasa con Nail Prep y fijación molecular con Bonder no ácido. Aplicación de Rubber Base autonivelante con refuerzo de ápice para amortiguar golpes sin quebrar la uña natural.",
      time: "Fase 02 · 30 min",
      tool: "Rubber Gel viscoso",
      result: "Ápice reforzado contra quiebres",
      accent: "#D97706",
      photoPreview: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "3. Curado LED/UV 48W & Glaze Solar",
      subtitle: "Polimerización Dual & Cromo Perlado",
      detail: "Secado express con 30 diodos LED en longitud de onda dual (365+405nm). Pigmentos 20-Free y frotado de micropolvo aurora/cromo para el efecto Glazed Donut reflectivo bajo luz solar.",
      time: "Fase 03 · 35 min",
      tool: "Lámpara SunUV 48W",
      result: "Brillo nacarado sin capas gruesas",
      accent: "#7A3E48",
      photoPreview: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "4. Sellado Top No-Wipe & Brillo Cerámico",
      subtitle: "Escudo Vítreo de Larga Duración",
      detail: "Capa superior Top Coat Diamond sin residuos pegajosos. Sellado hermético en punta y bordes laterales para resistir piscina, agua de mar limeña y uso diario por más de 21 días intactos.",
      time: "Fase 04 · 30 min",
      tool: "Top Coat Diamond No-Wipe",
      result: "Resistencia extrema a impactos",
      accent: "#8C6D4C",
      photoPreview: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=400&q=80"
    }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let t = 0;

    const render = () => {
      if (isPlaying) {
        t += 0.022;
      }

      const w = canvas.width;
      const h = canvas.height;

      // Fondo oscuro elegante de cabina
      const bgGrad = ctx.createLinearGradient(0, 0, w, h);
      bgGrad.addColorStop(0, "#231C1A");
      bgGrad.addColorStop(0.5, "#2C201D");
      bgGrad.addColorStop(1, "#181312");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Partículas flotantes de luz
      for (let i = 0; i < 24; i++) {
        const px = (Math.sin(t * 0.35 + i * 1.4) * 0.5 + 0.5) * w;
        const py = (Math.cos(t * 0.28 + i * 0.8) * 0.5 + 0.5) * h;
        const pRadius = 1.0 + Math.sin(t + i) * 0.7;
        const pAlpha = 0.12 + 0.22 * Math.sin(t * 1.6 + i);

        ctx.beginPath();
        ctx.arc(px, py, Math.max(0.2, pRadius), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 146, 123, ${pAlpha})`;
        ctx.fill();
      }

      const centerX = w / 2;
      const centerY = h * 0.57;
      const nailCount = 5;
      const nailWidth = 40;
      const nailHeight = 92;
      const spacing = 60;
      const startX = centerX - ((nailCount - 1) * spacing) / 2;

      // Dibujar las 5 uñas estilizadas en forma almendra
      for (let i = 0; i < nailCount; i++) {
        const nx = startX + i * spacing;
        const nyOffset = Math.sin(i * 0.7 - 1.4) * 16 + Math.sin(t * 1.2 + i * 0.45) * 4;
        const ny = centerY + nyOffset;

        ctx.save();
        ctx.translate(nx, ny);

        // Sombra de uña
        ctx.shadowColor = "rgba(0, 0, 0, 0.55)";
        ctx.shadowBlur = 18;
        ctx.shadowOffsetY = 12;

        // Geometría almendrada
        ctx.beginPath();
        ctx.moveTo(-nailWidth / 2, nailHeight / 2);
        ctx.lineTo(-nailWidth / 2, -nailHeight * 0.18);
        ctx.bezierCurveTo(
          -nailWidth / 2, -nailHeight / 2,
          nailWidth / 2, -nailHeight / 2,
          nailWidth / 2, -nailHeight * 0.18
        );
        ctx.lineTo(nailWidth / 2, nailHeight / 2);
        ctx.closePath();

        // Color según paso activo
        const nailGrad = ctx.createLinearGradient(0, -nailHeight / 2, 0, nailHeight / 2);
        if (activeStep === 0) {
          // Fase 1: Uña natural limpia y cutícula pulida
          nailGrad.addColorStop(0, "#FFFFFF");
          nailGrad.addColorStop(0.35, "#F7EBE8");
          nailGrad.addColorStop(0.85, "#E2C8BE");
          nailGrad.addColorStop(1, "#C8927B");
        } else if (activeStep === 1) {
          // Fase 2: Kapping Rubber Base (cálido caramelo / miel traslúcido)
          nailGrad.addColorStop(0, "#FFF9E6");
          nailGrad.addColorStop(0.3, "#FDE68A");
          nailGrad.addColorStop(0.7, "#D97706");
          nailGrad.addColorStop(1, "#92400E");
        } else if (activeStep === 2) {
          // Fase 3: Berry Glaze / Cromo solar
          if (i === 2) {
            nailGrad.addColorStop(0, "#FFF");
            nailGrad.addColorStop(0.35, "#C8927B");
            nailGrad.addColorStop(0.8, "#7A3E48");
            nailGrad.addColorStop(1, "#4A1D24");
          } else {
            nailGrad.addColorStop(0, "#FFFFFF");
            nailGrad.addColorStop(0.4, "#FCE7F3");
            nailGrad.addColorStop(0.8, "#F472B6");
            nailGrad.addColorStop(1, "#C8927B");
          }
        } else {
          // Fase 4: Sellado Diamond Brillo Espejo
          nailGrad.addColorStop(0, "#FFFFFF");
          nailGrad.addColorStop(0.25, "#FBF8F6");
          nailGrad.addColorStop(0.65, "#C8927B");
          nailGrad.addColorStop(1, "#7A3E48");
        }

        ctx.fillStyle = nailGrad;
        ctx.fill();

        // Reflejo vítreo en movimiento
        const lightSweep = Math.sin(t * 2.2 + i * 0.5) * nailHeight * 0.42;
        const shineGrad = ctx.createLinearGradient(0, lightSweep - 18, 0, lightSweep + 18);
        shineGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
        shineGrad.addColorStop(0.5, activeStep === 3 ? "rgba(255, 255, 255, 0.75)" : "rgba(255, 255, 255, 0.45)");
        shineGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.fillStyle = shineGrad;
        ctx.fill();

        // Borde fino nítido
        ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.restore();
      }

      // Anillo holográfico de curado LED
      const ringRadius = 145 + Math.sin(t * 2) * 8;
      ctx.beginPath();
      ctx.arc(centerX, centerY - 10, ringRadius, 0, Math.PI * 2);
      ctx.strokeStyle = activeStep === 2 ? "rgba(244, 114, 182, 0.4)" : "rgba(200, 146, 123, 0.25)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, activeStep]);

  const current = steps[activeStep];

  return (
    <div className={`bg-[#231C1A] text-white rounded-3xl overflow-hidden border border-[#EFE2DC]/20 shadow-2xl ${className}`}>
      {/* Barra superior de control */}
      <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#EFE2DC]">
            Simulador de Cabina & Protocolo Quirúrgico
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all text-xs flex items-center gap-1.5 px-3"
            title={isPlaying ? "Pausar renderizado" : "Reanudar animación"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="text-[10px] tracking-wider uppercase font-semibold">{isPlaying ? "Pausar" : "Animar"}</span>
          </button>
          <button
            onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all text-xs flex items-center gap-1.5 px-3"
            title="Siguiente fase"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="text-[10px] tracking-wider uppercase font-semibold">Paso Siguiente</span>
          </button>
        </div>
      </div>

      {/* Grid: Canvas Motion + Panel de Pasos con Fotos Reales de Uñas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Lado izquierdo: Canvas interactivo */}
        <div className="lg:col-span-7 relative flex flex-col items-center justify-center p-6 bg-radial from-[#322521] to-[#181312] min-h-[340px]">
          <canvas
            ref={canvasRef}
            width={480}
            height={330}
            className="w-full max-w-[440px] h-auto rounded-2xl shadow-inner border border-white/10"
          />

          <div className="mt-4 w-full max-w-[440px] flex items-center justify-between text-[11px] text-[#EFE2DC]/90 bg-black/50 backdrop-blur-md py-2 px-4 rounded-xl border border-white/10">
            <span className="flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#C8927B]" />
              {current.subtitle}
            </span>
            <span className="text-[#C8927B] font-mono font-semibold text-[10px]">
              {current.time}
            </span>
          </div>
        </div>

        {/* Lado derecho: Selector interactivo por clicks */}
        <div className="lg:col-span-5 p-6 sm:p-7 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10 bg-[#281F1D]">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#C8927B]">
                Acción Seleccionada
              </span>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3 h-3" /> Instrumental Estéril
              </span>
            </div>

            <h4 className="font-serif text-2xl font-bold text-[#FBF8F6] tracking-tight">
              {current.title}
            </h4>
            <p className="text-xs text-[#EFE2DC]/85 mt-2 leading-relaxed">
              {current.detail}
            </p>

            {/* Detalle visual de la uña en este paso */}
            <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
              <img
                src={current.photoPreview}
                alt={current.title}
                className="w-14 h-14 rounded-lg object-cover border border-[#C8927B]/40 shrink-0"
              />
              <div className="text-[11px] space-y-0.5">
                <p className="text-[#C8927B] font-semibold">{current.tool}</p>
                <p className="text-white/70 text-[10px]">{current.result}</p>
              </div>
            </div>

            {/* Botones de acción por click */}
            <div className="mt-5 space-y-2">
              {steps.map((st, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all flex items-center justify-between ${
                    activeStep === idx
                      ? "bg-[#C8927B]/25 border-[#C8927B] text-white shadow-xs font-semibold"
                      : "bg-white/5 border-white/5 text-white/60 hover:bg-white/10"
                  }`}
                >
                  <span className="truncate">{st.title}</span>
                  <span className="text-[10px] font-mono opacity-70 ml-2 shrink-0">{st.time}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 mt-5 flex items-center justify-between text-[11px] text-white/70">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Autoclave Clase B
            </span>
            <span className="text-[#C8927B] font-semibold text-[10px]">Atelier Lima</span>
          </div>
        </div>
      </div>
    </div>
  );
}
