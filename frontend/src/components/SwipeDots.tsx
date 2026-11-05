"use client";

import { RefObject, useEffect, useState } from "react";

interface SwipeDotsProps {
  count: number;
  targetRef: RefObject<HTMLElement | null>;
  tone?: "light" | "dark";
  className?: string;
}

// Puntos bajo un carrusel horizontal (solo movil): marcan la tarjeta visible e indican que se puede deslizar.
export function SwipeDots({ count, targetRef, tone = "dark", className = "" }: SwipeDotsProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;
    const onScroll = () => {
      const first = el.firstElementChild as HTMLElement | null;
      if (!first) return;
      const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
      setActive(Math.min(count - 1, Math.round(el.scrollLeft / (first.offsetWidth + gap))));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [count, targetRef]);

  const on = tone === "light" ? "bg-[#FAF8F5]" : "bg-[#2C2420]";
  const off = tone === "light" ? "bg-white/30" : "bg-[#2C2420]/20";

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? `w-6 ${on}` : `w-1.5 ${off}`}`}
        />
      ))}
    </div>
  );
}
