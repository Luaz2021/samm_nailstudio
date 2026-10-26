"use client";

import { useEffect, useState } from "react";
import { Sparkles, Calendar, BookOpen, Clock, ArrowRight, X, ShieldCheck } from "lucide-react";
import { DEFAULT_ARTICLES, ArticleItem } from "@/data/catalog";

export function LookbookBlogSection() {
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);
  const [articles, setArticles] = useState<ArticleItem[]>(DEFAULT_ARTICLES);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("samm_articles_data");
      if (stored) {
        setArticles(JSON.parse(stored));
      }

      const handleStorage = (e: StorageEvent) => {
        if (e.key === "samm_articles_data" && e.newValue) {
          setArticles(JSON.parse(e.newValue));
        }
      };
      window.addEventListener("storage", handleStorage);
      return () => window.removeEventListener("storage", handleStorage);
    } catch (e) {
      console.error(e);
    }
  }, []);

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
          <p className="text-xs sm:text-sm text-[#7A6B62] max-w-md leading-relaxed">
            Consejos de mantenimiento, tendencias internacionales y educación sobre el cuidado de la uña natural.
          </p>
        </div>

        {/* Grid de 3 Columnas Estilo Siberia Salon */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art) => (
            <article 
              key={art.id}
              onClick={() => setSelectedArticle(art)}
              className="group cursor-pointer flex flex-col space-y-4 rounded-3xl p-3 hover:bg-[#FAF8F5] transition-all duration-300 border border-transparent hover:border-[#EAE4DC]"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#F5EFEB]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={art.imgUrl} 
                  alt={art.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] uppercase font-bold tracking-widest text-[#2C2420] shadow-xs">
                  {art.category}
                </span>
              </div>

              <div className="space-y-2 px-1">
                <div className="flex items-center gap-3 text-xs text-[#8A7B72]">
                  <span>{art.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#C8927B]" /> {art.readTime}
                  </span>
                </div>

                <h3 
                  className="text-xl font-light text-[#2C2420] group-hover:text-[#9E5742] transition-colors leading-snug"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {art.title}
                </h3>

                <p className="text-xs text-[#7A6B62] leading-relaxed line-clamp-3">
                  {art.desc}
                </p>

                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#9E5742] group-hover:gap-2.5 transition-all">
                    <span>Leer artículo completo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* ========================================================
          MODAL FLOTANTE EDITORIAL DE LECTURA COMPLETA
          ======================================================== */}
      {selectedArticle && (
        <div 
          onClick={() => setSelectedArticle(null)}
          className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6 animate-fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-[#FAF8F5] border border-[#EAE3DA] rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl text-[#2C2420] flex flex-col"
          >
            {/* Header del Modal */}
            <div className="sticky top-0 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EAE3DA] px-6 py-4 flex items-center justify-between z-10">
              <span className="text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-[#FAF6F2] text-[#9E5742] border border-[#EBE2D8]">
                {selectedArticle.category}
              </span>
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-[#2C2420] transition-colors"
                aria-label="Cerrar modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Contenido del Artículo */}
            <div className="p-6 sm:p-10 space-y-6">
              
              {/* Imagen Portada */}
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-md">
                <img 
                  src={selectedArticle.imgUrl} 
                  alt={selectedArticle.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Título & Metadatos */}
              <div>
                <div className="flex items-center gap-3 text-xs text-[#8A7B72] mb-2">
                  <span>{selectedArticle.date}</span>
                  <span>•</span>
                  <span>{selectedArticle.readTime}</span>
                </div>
                <h2 
                  className="text-2xl sm:text-4xl font-light text-[#2C2420] leading-tight"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {selectedArticle.title}
                </h2>
              </div>

              {/* Párrafo Introductorio o Descripción */}
              <p className="text-sm sm:text-base text-[#4A3F39] leading-relaxed font-light italic border-l-2 border-[#9E5742] pl-4">
                "{selectedArticle.content?.intro || selectedArticle.desc}"
              </p>

              {/* Puntos Clave */}
              {selectedArticle.content?.points && selectedArticle.content.points.length > 0 && (
                <div className="space-y-5 pt-2">
                  {selectedArticle.content.points.map((pt, i) => (
                    <div key={i} className="bg-white p-5 rounded-2xl border border-[#EAE3DA] space-y-1.5">
                      <h4 className="font-bold text-sm text-[#2C2420]">{pt.subtitle}</h4>
                      <p className="text-xs sm:text-sm text-[#6C5F57] leading-relaxed font-light">{pt.text}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Conclusión de Samantha */}
              {selectedArticle.content?.conclusion && (
                <div className="p-5 rounded-2xl bg-[#FAF6F2] border border-[#E5DDD2] space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-[#9E5742] font-bold block">
                    CONSEJO DEL ATELIER
                  </span>
                  <p className="text-xs sm:text-sm text-[#2C2420] leading-relaxed font-medium">
                    {selectedArticle.content.conclusion}
                  </p>
                </div>
              )}

              {/* Botón Volver / Reservar */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#EAE3DA]">
                <button
                  type="button"
                  onClick={() => setSelectedArticle(null)}
                  className="text-xs uppercase tracking-widest font-bold text-[#7A6B62] hover:text-[#2C2420] transition-colors"
                >
                  ← Volver a notas de atelier
                </button>

                <a
                  href="https://wa.me/51959716984?text=Hola%20Samm,%20le%C3%AD%20tu%20art%C3%ADculo%20en%20la%20web%20y%20quiero%20agendar%20cita"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#2C2420] text-white hover:bg-[#453731] transition-all text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2"
                >
                  <span>Consultar por WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          </div>
        </div>
      )}

    </section>
  );
}
