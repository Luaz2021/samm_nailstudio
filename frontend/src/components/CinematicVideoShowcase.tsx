"use client";

import { useEffect, useRef } from "react";
import { Sparkles, ShieldCheck, HeartHandshake, Eye, CalendarHeart } from "lucide-react";
import { SwipeDots } from "@/components/SwipeDots";

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
    title: "Uñas Acrílicas & Gel",
  },
  {
    src: "videos/samm-pies.mp4",
    poster: "videos/samm-pies-poster.jpg",
    label: "Pies",
    title: "Pedigel & Acripie",
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

const BADGES = [
  { icon: ShieldCheck, text: "Marcas Profesionales (Mia Secret, OPI, Gelish)" },
  { icon: Eye, text: "Limpieza Profunda & Acabado Impecable" },
  { icon: HeartHandshake, text: "Uñas Fuertes sin Maltratar tu Uña Natural" },
];

function BookingButton({ onOpenBooking }: CinematicVideoShowcaseProps) {
  if (!onOpenBooking) return null;
  return (
    <button
      type="button"
      onClick={onOpenBooking}
      className="inline-flex items-center gap-2 rounded-full border border-[#C8927B] px-7 py-3 text-xs uppercase font-bold tracking-[0.22em] text-[#FAF8F5] hover:bg-[#C8927B] hover:text-[#14100E] transition-colors"
    >
      <CalendarHeart className="w-4 h-4" />
      Reservar mi cita
    </button>
  );
}

// La altura de los reels depende del alto de la pantalla (svh) y del ancho disponible,
// para que la seccion entera quepa debajo de la barra fija (81px) al llegar a ella.
const REEL_SIZE =
  "w-full sm:w-auto sm:h-[min(calc(100svh_-_var(--header-h,81px)_-_340px),560px,calc((100vw_-_72px)*0.889))] " +
  "lg:h-[min(calc(88svh_-_110px),680px,calc((100vw_-_520px)*0.889))] " +
  "xl:h-[min(calc(88svh_-_110px),700px,calc((100vw_-_616px)*0.889))]";

export function CinematicVideoShowcase({ onOpenBooking }: CinematicVideoShowcaseProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  return (
    <section
      id="seccion-reels"
      className="min-h-[calc(100svh-var(--header-h,81px))] flex flex-col justify-center py-10 sm:py-16 lg:py-12 bg-[#14100E] text-[#FAF8F5] relative overflow-hidden border-y border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:flex lg:items-center lg:justify-center lg:gap-12 xl:gap-20 w-full">

        {/* Texto: arriba y centrado en movil/tablet, columna izquierda en escritorio */}
        <div className="text-center lg:text-left max-w-2xl lg:max-w-sm xl:max-w-md mx-auto lg:mx-0 mb-6 sm:mb-10 lg:mb-0 space-y-3">
          <span className="text-xs uppercase font-bold tracking-[0.28em] text-[#C8927B] flex items-center justify-center lg:justify-start gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C8927B]" />
            ESTUDIO SAMM EN MOVIMIENTO
          </span>
          <h2
            className="text-3xl sm:text-5xl font-light tracking-tight text-[#FAF8F5] lg:leading-[1.08]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Así Cuidamos Tus Manos y Pies
          </h2>
          <p className="hidden sm:block text-xs sm:text-sm text-[#C8BDB4] leading-relaxed max-w-xl mx-auto lg:mx-0">
            Uñas acrílicas impecables, nivelación con rubber y pedicura completa que duran semanas. Mira cómo cuidamos cada detalle antes de tu cita.
          </p>

          <div className="hidden lg:block pt-5">
            <BookingButton onOpenBooking={onOpenBooking} />
          </div>
          <ul className="hidden lg:grid gap-3 pt-6">
            {BADGES.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-2 text-xs text-[#C8BDB4]">
                <Icon className="w-4 h-4 text-[#C8927B]" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Reels verticales: carrusel deslizable en movil, dos columnas desde tablet */}
        <div
          ref={carouselRef}
          className="-mx-4 px-4 sm:mx-0 sm:px-0 flex sm:justify-center gap-5 sm:gap-6 overflow-x-auto sm:overflow-visible snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:shrink-0"
        >
          {REELS.map((reel) => (
            <figure
              key={reel.src}
              className="snap-center shrink-0 w-[min(78%,calc((100svh_-_var(--header-h,107px)_-_220px)*0.5625))] sm:w-auto"
            >
              <div className={`relative aspect-[9/16] rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-[#1E1714] ${REEL_SIZE}`}>
                <ReelVideo src={reel.src} poster={reel.poster} title={reel.title} />
                <span className="absolute top-4 left-4 rounded-full bg-black/35 backdrop-blur-sm border border-white/15 px-3 py-1 text-[10px] uppercase font-bold tracking-[0.22em] text-[#FAF8F5]">
                  {reel.label}
                </span>
              </div>
            </figure>
          ))}
        </div>
        {/* En movil y tablet se quitan boton y sellos para que la seccion quepa (la reserva esta en la barra) */}
        <SwipeDots count={REELS.length} targetRef={carouselRef} tone="light" className="mt-4 sm:hidden" />
      </div>
    </section>
  );
}
