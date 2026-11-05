"use client";

import { useEffect, useRef } from "react";
import { Sparkles, ShieldCheck, HeartHandshake, Eye, CalendarHeart } from "lucide-react";

interface CinematicVideoShowcaseProps {
  onOpenBooking?: () => void;
}

// Para cambiar un video: deja el .mp4 (vertical 9:16) y su poster .jpg en public/videos/ y cambia la ruta aqui.
// Los actuales son placeholders generados con scripts/video/generar_reels.py.
const REELS = [
  {
    src: "videos/samm-manos.mp4",
    poster: "videos/samm-manos-poster.jpg",
    label: "Manos",
    title: "Manicura Rusa",
    caption: "Cutícula impecable, estructura en gel y acabados espejo.",
  },
  {
    src: "videos/samm-pies.mp4",
    poster: "videos/samm-pies-poster.jpg",
    label: "Pies",
    title: "Pedicura Spa",
    caption: "Baño aromático, exfoliación suave y esmaltado que dura.",
  },
] as const;

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/${path}`;

function ReelVideo({ src, poster, title }: { src: string; poster: string; title: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  // Solo se reproduce mientras se ve (ahorra bateria y datos) y respeta "reducir movimiento".
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      video.controls = true;
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.35 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={asset(src)}
      poster={asset(poster)}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={`Video: ${title}`}
      className="w-full h-full object-cover"
    />
  );
}

export function CinematicVideoShowcase({ onOpenBooking }: CinematicVideoShowcaseProps) {
  return (
    <section className="py-20 sm:py-24 bg-[#14100E] text-[#FAF8F5] relative overflow-hidden border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Cabecera Editorial */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <span className="text-xs uppercase font-bold tracking-[0.28em] text-[#C8927B] flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C8927B]" />
            ESTUDIO SAMM EN MOVIMIENTO
          </span>
          <h2
            className="text-3xl sm:text-5xl font-light tracking-tight text-[#FAF8F5]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Así Cuidamos Tus Manos y Pies
          </h2>
          <p className="text-xs sm:text-sm text-[#C8BDB4] leading-relaxed max-w-xl mx-auto">
            Técnica rusa de alta definición, rituales de pedicura spa y acabados que duran semanas. Mira cómo trabajamos antes de tu cita.
          </p>
        </div>

        {/* Reels verticales: carrusel deslizable en móvil, dos columnas en pantallas grandes */}
        <div className="-mx-4 px-4 sm:mx-auto sm:px-0 max-w-3xl flex sm:grid sm:grid-cols-2 gap-5 sm:gap-8 overflow-x-auto sm:overflow-visible snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {REELS.map((reel) => (
            <figure key={reel.src} className="snap-center shrink-0 w-[78%] sm:w-auto">
              <div className="relative aspect-[9/16] rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-[#1E1714]">
                <ReelVideo src={reel.src} poster={reel.poster} title={reel.title} />
                <span className="absolute top-4 left-4 rounded-full bg-black/35 backdrop-blur-sm border border-white/15 px-3 py-1 text-[10px] uppercase font-bold tracking-[0.22em] text-[#FAF8F5]">
                  {reel.label}
                </span>
              </div>
              <figcaption className="mt-4 text-center space-y-1">
                <p className="text-xl font-light text-[#FAF8F5]" style={{ fontFamily: "var(--font-serif)" }}>
                  {reel.title}
                </p>
                <p className="text-xs text-[#C8BDB4]">{reel.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        {onOpenBooking && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 rounded-full border border-[#C8927B] px-7 py-3 text-xs uppercase font-bold tracking-[0.22em] text-[#FAF8F5] hover:bg-[#C8927B] hover:text-[#14100E] transition-colors"
            >
              <CalendarHeart className="w-4 h-4" />
              Reservar mi cita
            </button>
          </div>
        )}

        {/* Sellos de Confianza Inferiores */}
        <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="flex items-center justify-center gap-2 text-xs text-[#C8BDB4]">
            <ShieldCheck className="w-4 h-4 text-[#C8927B]" />
            <span>Fórmulas 20-Free & HEMA-Free</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs text-[#C8BDB4]">
            <Eye className="w-4 h-4 text-[#C8927B]" />
            <span>Técnica Rusa de Alta Definición</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs text-[#C8BDB4]">
            <HeartHandshake className="w-4 h-4 text-[#C8927B]" />
            <span>Cuidado y Salud de la Uña Natural</span>
          </div>
        </div>

      </div>
    </section>
  );
}
