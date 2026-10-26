"use client";

import { Sparkles, Calendar, BookOpen, Clock, ArrowRight } from "lucide-react";

export function LookbookBlogSection() {
  const articles = [
    {
      title: "Kapping Rubber vs Acrílico Tradicional: ¿Cuál necesita tu uña?",
      category: "Salud Ungueal",
      date: "Guía de Estudio",
      readTime: "3 min de lectura",
      imgUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80",
      desc: "Descubre cómo el refuerzo flexible de base Rubber permite que tus uñas respiren y crezcan largas sin desprendimientos ni limados agresivos."
    },
    {
      title: "Tendencias de Primavera-Verano: Tonos Glazed y Cromo Perlado",
      category: "Lookbook Editorial",
      date: "Colección 2026",
      readTime: "4 min de lectura",
      imgUrl: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80",
      desc: "Inspirado en el minimalismo de Nueva York y Madrid: destellos sutiles sobre bases milky y nude con acabados espejo de alta durabilidad."
    },
    {
      title: "Protocolo de Esterilización: Por qué exigimos autoclave en cada sesión",
      category: "Seguridad Clínica",
      date: "Transparencia Samm",
      readTime: "2 min de lectura",
      imgUrl: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=800&q=80",
      desc: "Nuestro instrumental metálico pasa por desinfección enzimática y esterilización por calor húmedo en bolsas grado quirúrgico que se abren delante de ti."
    }
  ];

  return (
    <section className="py-24 bg-white border-t border-[#EAE4DC] text-[#2C2420]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-2">
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#9E5742]">
              Revista & Cuidados
            </span>
            <h2 
              className="text-3xl sm:text-5xl font-light tracking-tight text-[#2C2420]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Lookbook & Notas de Atelier
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#7A6B62] max-w-md">
            Consejos de mantenimiento, tendencias internacionales y educación sobre el cuidado de la uña natural.
          </p>
        </div>

        {/* Grid de 3 Columnas Estilo Siberia Salon */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art, idx) => (
            <article 
              key={idx}
              className="group cursor-pointer flex flex-col space-y-4"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#FAF6F2]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={art.imgUrl}
                  alt={art.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] uppercase font-bold tracking-wider text-[#9E5742]">
                  {art.category}
                </span>
              </div>

              <div className="flex items-center gap-3 text-[11px] text-[#9E8F86]">
                <span>{art.date}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {art.readTime}
                </span>
              </div>

              <h3 
                className="text-lg font-light text-[#2C2420] group-hover:text-[#9E5742] transition-colors leading-snug"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {art.title}
              </h3>

              <p className="text-xs text-[#7A6B62] leading-relaxed line-clamp-2">
                {art.desc}
              </p>

              <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-[#2C2420] group-hover:text-[#9E5742] transition-colors">
                <span>Leer artículo completo</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
