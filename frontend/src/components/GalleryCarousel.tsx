"use client";

import { useEffect, useState } from "react";
import { Heart, ZoomIn, ArrowRight, X } from "lucide-react";
import { DEFAULT_GALLERY, GalleryPhotoItem } from "@/data/catalog";

export function GalleryCarousel() {
  const [activeFilter, setActiveFilter] = useState<string>("todos");
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhotoItem | null>(null);
  const [likesMap, setLikesMap] = useState<Record<string, number>>({});
  const [items, setItems] = useState<GalleryPhotoItem[]>(DEFAULT_GALLERY);

  useEffect(() => {
    try {
      const syncGallery = () => {
        const stored = localStorage.getItem("samm_gallery_data");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setItems(prev => prev.map(item => {
              const match = parsed.find((p: any) => p.id === item.id);
              return match ? { ...item, url: match.url } : item;
            }));
          }
        }
      };

      syncGallery();
      window.addEventListener("storage", syncGallery);
      return () => window.removeEventListener("storage", syncGallery);
    } catch(e) {
      console.error(e);
    }
  }, []);

  const filteredItems = activeFilter === "todos"
    ? items
    : items.filter(item => item.category === activeFilter);

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikesMap(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  return (
    <section
      className="py-20 sm:py-28 border-t border-[#EAE3DA] transition-colors duration-500"
      style={{ backgroundColor: "var(--theme-surface, #FAF7F3)", color: "var(--espresso-ink, #2C2420)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Cabecera Editorial con Filtros de Pestaña Estilo Galería de Moda */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span
              className="text-xs uppercase font-bold tracking-[0.28em] block mb-2"
              style={{ color: "var(--rosewood-chrome, #9E5742)" }}
            >
              LOOKBOOK & PORTFOLIO EN VIVO
            </span>
            <h2 
              className="text-3xl sm:text-5xl font-light tracking-tight"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Resultados en Cabina
            </h2>
            <p className="text-xs sm:text-sm text-[#7A6B62] mt-2 max-w-lg">
              Sets reales realizados en nuestro atelier de Callao. Pasa el cursor para ver detalles o filtra por tu estilo favorito.
            </p>
          </div>

          {/* Enlace directo a Instagram */}
          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#E2D8CE] hover:border-[#9E5742] hover:shadow-xs text-xs font-semibold text-[#2C2420] transition-all"
            >
              <svg className="w-4 h-4 fill-none stroke-[#9E5742] stroke-2" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              <span>@samm.nailstudio en Instagram</span>
            </a>
          </div>
        </div>

        {/* Barra de Filtros Interactivos */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 text-xs font-medium scrollbar-none">
          {[
            { id: "todos", label: "Todos los Trabajos" },
            { id: "kapping", label: "Kapping Rubber" },
            { id: "glazed", label: "Glazed & Cromo" },
            { id: "rusa", label: "Manicura Rusa" },
            { id: "softgel", label: "Soft Gel Tips" },
            { id: "diseño", label: "Nail Art & Aura" }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-4 py-2 rounded-full transition-all shrink-0 cursor-pointer ${
                activeFilter === f.id
                  ? "text-white shadow-xs font-semibold"
                  : "bg-white border border-[#E5DDD2] text-[#6C5F57] hover:border-[#2C2420] hover:text-[#2C2420]"
              }`}
              style={{
                backgroundColor: activeFilter === f.id ? "var(--espresso-ink, #2C2420)" : undefined
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Galería Dinámica Masonry / Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => {
            const currentLikes = item.likes + (likesMap[item.id] || 0);
            return (
              <div
                key={item.id}
                onClick={() => setSelectedPhoto(item)}
                className={`group relative rounded-3xl overflow-hidden cursor-pointer bg-[#2C2420] border border-[#EAE3DA] shadow-xs hover:shadow-xl transition-all duration-500 ${
                  idx === 1 || idx === 6 ? "sm:row-span-2 h-[290px] sm:h-[540px]" : "h-[270px] sm:h-[360px]"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 group-hover:brightness-95"
                />

                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] uppercase font-bold tracking-widest text-[#2C2420] shadow-sm z-10">
                  {item.tag}
                </span>

                <button
                  type="button"
                  onClick={(e) => handleLike(item.id, e)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-transform hover:scale-110 active:scale-95 z-10"
                >
                  <Heart className={`w-4 h-4 ${likesMap[item.id] ? "fill-red-500 text-red-500" : "text-white"}`} />
                </button>

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                  <span className="text-[10px] uppercase tracking-wider text-[#EAD8CE] font-semibold block">
                    ATELIER CALLAO
                  </span>
                  <h3 
                    className="text-lg font-light leading-snug mt-1 text-[#FAF8F5]"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#D2C5BE] mt-1.5 line-clamp-2 font-light">
                    {item.desc}
                  </p>

                  <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-[11px] text-[#FAF8F5]/80">
                    <span className="flex items-center gap-1.5">
                      <ZoomIn className="w-3.5 h-3.5 text-[#C8927B]" />
                      <span>Ver foto en detalle</span>
                    </span>
                    <span className="font-medium text-[#EAD8CE]">
                      {currentLikes} likes
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Modal Lightbox de Foto Ampliada */}
        {selectedPhoto && (
          <div 
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6 animate-fade-in"
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              className="bg-[#181412] border border-white/15 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl grid grid-cols-1 md:grid-cols-12 text-[#FAF8F5]"
            >
              <div className="md:col-span-7 h-[240px] sm:h-[360px] md:h-[520px] bg-black relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={selectedPhoto.url} 
                  alt={selectedPhoto.title} 
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-4 left-4 md:hidden w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#C8927B] px-3 py-1 rounded-full bg-white/5 border border-white/10">
                      {selectedPhoto.tag}
                    </span>
                    <button
                      onClick={() => setSelectedPhoto(null)}
                      className="hidden md:flex w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white items-center justify-center transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 
                    className="text-2xl sm:text-3xl font-light text-[#FAF8F5] mb-3"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {selectedPhoto.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#C8BDB4] leading-relaxed font-light mb-6">
                    {selectedPhoto.desc}
                  </p>

                  <div className="space-y-2 text-xs text-[#EAD8CE] bg-white/5 p-4 rounded-2xl border border-white/10">
                    <div className="flex justify-between">
                      <span className="text-white/60">Técnica:</span>
                      <span className="font-semibold">Manicura Anatómica Rusa</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Química:</span>
                      <span className="font-semibold">20-Free & HEMA-Free</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Duración:</span>
                      <span className="font-semibold">21+ días intacto</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                  <a
                    href="https://wa.me/51959716984?text=Hola%20Samm,%20me%20encant%C3%B3%20este%20dise%C3%B1o%20de%20la%20web"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3.5 px-6 rounded-full bg-[#FAF8F5] text-[#181412] hover:bg-[#EAD8CE] transition-all text-xs font-bold uppercase tracking-widest text-center flex items-center justify-center gap-2 shadow-lg"
                  >
                    <span>Pedir este diseño por WhatsApp</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
