"use client";

import { useEffect, useState } from "react";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle2, 
  User, 
  Search, 
  Check, 
  X, 
  Trash2, 
  MessageCircle, 
  Plus, 
  TrendingUp, 
  Sparkles,
  ArrowUpRight,
  Wallet,
  Receipt,
  Sun,
  ShieldCheck,
  CalendarCheck2,
  FolderOpen,
  CheckCheck,
  Palette,
  Flower2,
  Leaf,
  Gift,
  Pencil,
  BookOpen,
  Scissors,
  Upload,
  CloudSnow,
  Wand2
} from "lucide-react";
import { 
  DEFAULT_HERO_BG, 
  DEFAULT_ABOUT_PHOTO,
  DEFAULT_HOME_SHOWCASE,
  DEFAULT_GALLERY,
  DEFAULT_CARE_STEPS,
  DEFAULT_SERVICES, 
  DEFAULT_EXTRAS,
  DEFAULT_ARTICLES, 
  LIMA_SEASONS,
  LIMA_EVENTS,
  ALL_LIMA_THEMES,
  detectAutoLimaTheme,
  getActiveLimaThemeState,
  applySeasonTheme,
  ServiceItem, 
  ExtraItem,
  ArticleItem,
  LimaTheme
} from "@/data/catalog";

type AdminTab = "dashboard" | "servicios" | "articulos" | "multimedia" | "temporada";
type MediaSectionFilter = "todos" | "home" | "servicios" | "nosotros";

interface AdminBooking {
  id: string;
  code: string;
  clientName: string;
  clientPhone: string;
  service: string;
  extras: string[];
  date: string;
  timeSlot: string;
  durationMinutes: number;
  totalPrice: number;
  deposit20: number;
  remaining80: number;
  status: "pre_reserva" | "confirmada" | "cancelada";
  paymentMethod: "Yape" | "Plin" | "Transferencia" | "Pendiente";
  receiptNote?: string;
}

interface MediaItem {
  id: string;
  section: "home" | "servicios" | "nosotros";
  slotName: string;
  title: string;
  activeUrl: string;
  cloudHistory: {
    id: string;
    url: string;
    uploadedAt: string;
    isActive: boolean;
  }[];
}

const INITIAL_BOOKINGS: AdminBooking[] = [
  {
    id: "b-1",
    code: "PRE-4821",
    clientName: "Valeria Montes",
    clientPhone: "+51 984 123 456",
    service: "Manicura Rusa Anatómica Combinada",
    extras: ["Retirada de Acrílico Ajeno (+30m)"],
    date: "2026-10-27",
    timeSlot: "11:30 - 14:00",
    durationMinutes: 150,
    totalPrice: 100,
    deposit20: 20,
    remaining80: 80,
    status: "pre_reserva",
    paymentMethod: "Pendiente",
    receiptNote: "Esperando captura de Yape por WhatsApp"
  },
  {
    id: "b-2",
    code: "PRE-8910",
    clientName: "Carla Mendoza",
    clientPhone: "+51 977 456 789",
    service: "Esculpidas en Acrílico Premium con Molde",
    extras: ["French Micro-Line (+30m)", "Reconstrucción Uña Rota (+30m)"],
    date: "2026-10-27",
    timeSlot: "14:00 - 17:00",
    durationMinutes: 180,
    totalPrice: 170,
    deposit20: 34,
    remaining80: 136,
    status: "confirmada",
    paymentMethod: "Yape",
    receiptNote: "Adelanto S/ 34 verificado con comprobante Yape"
  },
  {
    id: "b-3",
    code: "PRE-3312",
    clientName: "Jimena Morales",
    clientPhone: "+51 912 345 678",
    service: "Kapping Gel & Rubber Base Fortalecedor",
    extras: ["Nivelación Extra con Calcio"],
    date: "2026-10-28",
    timeSlot: "10:00 - 12:00",
    durationMinutes: 120,
    totalPrice: 70,
    deposit20: 14,
    remaining80: 56,
    status: "confirmada",
    paymentMethod: "Plin",
    receiptNote: "Plin verificado en cuenta BCP"
  }
];

const INITIAL_MEDIA_SLOTS: MediaItem[] = [
  // =========================================================================
  // 1. PÁGINA 1: HOME (Portada Principal + 3 Especialidades Filosofía en Cabina)
  // =========================================================================
  {
    id: "hero-main",
    section: "home",
    slotName: "Home · Portada Principal (Hero)",
    title: "Imagen Cinematográfica de Portada de Inicio",
    activeUrl: DEFAULT_HERO_BG,
    cloudHistory: [
      { id: "hero-h1", url: DEFAULT_HERO_BG, uploadedAt: "Portada Oficial", isActive: true },
      { id: "hero-h2", url: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1920&q=85", uploadedAt: "Preset Kapping Rosé", isActive: false },
      { id: "hero-h3", url: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=1920&q=85", uploadedAt: "Preset Glazed Perlado", isActive: false }
    ]
  },
  ...DEFAULT_HOME_SHOWCASE.map((item, idx) => ({
    id: item.id,
    section: "home" as const,
    slotName: `Home · Filosofía 0${idx + 1}`,
    title: item.title,
    activeUrl: item.imgUrl,
    cloudHistory: [
      { id: `${item.id}-h1`, url: item.imgUrl, uploadedAt: "Home Oficial", isActive: true }
    ]
  })),

  // =========================================================================
  // 2. PÁGINA 2: SERVICIOS (6 Tratamientos del Catálogo + 8 Fotos de Galería)
  // =========================================================================
  ...DEFAULT_SERVICES.map((srv, idx) => ({
    id: srv.id,
    section: "servicios" as const,
    slotName: `Servicios · Tratamiento 0${idx + 1}`,
    title: srv.name,
    activeUrl: srv.imgUrl,
    cloudHistory: [
      { id: `${srv.id}-h1`, url: srv.imgUrl, uploadedAt: "Catálogo Oficial", isActive: true }
    ]
  })),
  ...DEFAULT_GALLERY.map((gal, idx) => ({
    id: gal.id,
    section: "servicios" as const,
    slotName: `Servicios · Galería 0${idx + 1}`,
    title: gal.title,
    activeUrl: gal.url,
    cloudHistory: [
      { id: `${gal.id}-h1`, url: gal.url, uploadedAt: "Galería Oficial", isActive: true }
    ]
  })),

  // =========================================================================
  // 3. PÁGINA 3: NOSOTROS (Retrato Principal + 5 Pasos Guía de Mantenimiento)
  // =========================================================================
  {
    id: "about-sam",
    section: "nosotros",
    slotName: "Nosotros · Retrato Principal Atelier",
    title: "Samantha · Fundadora & Master Nail Artist",
    activeUrl: DEFAULT_ABOUT_PHOTO,
    cloudHistory: [
      { id: "about-h1", url: DEFAULT_ABOUT_PHOTO, uploadedAt: "Atelier Oficial", isActive: true }
    ]
  },
  ...DEFAULT_CARE_STEPS.map((step) => ({
    id: step.id,
    section: "nosotros" as const,
    slotName: `Nosotros · Guía Paso ${step.num}`,
    title: step.title,
    activeUrl: step.imgUrl,
    cloudHistory: [
      { id: `${step.id}-h1`, url: step.imgUrl, uploadedAt: "Guía Cuidado", isActive: true }
    ]
  }))
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [bookings, setBookings] = useState<AdminBooking[]>(INITIAL_BOOKINGS);
  const [filterStatus, setFilterStatus] = useState<string>("todos");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [saveAlert, setSaveAlert] = useState<string | null>(null);

  // 1. Estado de Servicios (Cuadraditos Cortos)
  const [services, setServices] = useState<ServiceItem[]>(DEFAULT_SERVICES);
  const [serviceModal, setServiceModal] = useState<{
    isOpen: boolean;
    mode: "create" | "edit";
    data: ServiceItem;
  }>({
    isOpen: false,
    mode: "create",
    data: {
      id: "",
      name: "",
      category: "manicura",
      price: 60,
      duration: 120,
      desc: "",
      tag: "Nuevo",
      imgUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80"
    }
  });

  // 1.1. Estado de Complementos & Extras Agregables
  const [extras, setExtras] = useState<ExtraItem[]>(DEFAULT_EXTRAS);
  const [extraModal, setExtraModal] = useState<{
    isOpen: boolean;
    mode: "create" | "edit";
    data: ExtraItem;
  }>({
    isOpen: false,
    mode: "create",
    data: {
      id: "",
      name: "",
      price: 20,
      duration: 30,
      desc: ""
    }
  });

  // 2. Estado de Artículos (Lookbook Blog)
  const [articles, setArticles] = useState<ArticleItem[]>(DEFAULT_ARTICLES);
  const [articleModal, setArticleModal] = useState<{
    isOpen: boolean;
    mode: "create" | "edit";
    data: ArticleItem;
  }>({
    isOpen: false,
    mode: "create",
    data: {
      id: "",
      title: "",
      category: "Salud Ungueal",
      date: "Guía de Estudio",
      readTime: "3 min de lectura",
      imgUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1000&q=85",
      desc: ""
    }
  });

  // 3. Estado Multimedia (Dividido por Páginas: Todas | Home | Servicios | Nosotros)
  const [mediaSlots, setMediaSlots] = useState<MediaItem[]>(INITIAL_MEDIA_SLOTS);
  const [mediaFilter, setMediaFilter] = useState<MediaSectionFilter>("todos");

  // 4. Estado del Motor de Temporadas y Eventos de Lima
  const [themeMode, setThemeMode] = useState<"auto" | "manual">("auto");
  const [activeTheme, setActiveTheme] = useState<LimaTheme>(() => detectAutoLimaTheme().activeTheme);
  const autoInfo = detectAutoLimaTheme();

  // 5. Estado Promociones & Popups
  const [promoConfig, setPromoConfig] = useState({
    enabled: true,
    discountCode: "SAMM15",
    badgeText: "BIENVENIDA EXCLUSIVA",
    headline: "15% OFF en tu Primera Cita",
    description: "Válido para cualquier servicio de Manicura Rusa, Kapping Gel o Soft Gel agendado en línea.",
    ctaText: "RECLAMAR 15% DE DESCUENTO"
  });

  // Inicializar estados persistentes desde localStorage
  useEffect(() => {
    try {
      const storedServices = localStorage.getItem("samm_services_data");
      if (storedServices) {
        setServices(JSON.parse(storedServices));
      }

      const storedExtras = localStorage.getItem("samm_extras_data");
      if (storedExtras) {
        setExtras(JSON.parse(storedExtras));
      }

      const storedArticles = localStorage.getItem("samm_articles_data");
      if (storedArticles) {
        setArticles(JSON.parse(storedArticles));
      }

      // Usamos v2 para limpiar cualquier caché vieja y fusionar todos los slots de las 3 páginas
      const storedMedia = localStorage.getItem("samm_media_slots_v2");
      if (storedMedia) {
        const parsed: MediaItem[] = JSON.parse(storedMedia);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const merged = INITIAL_MEDIA_SLOTS.map(initSlot => {
            const found = parsed.find(p => p.id === initSlot.id);
            return found ? { ...initSlot, activeUrl: found.activeUrl, cloudHistory: found.cloudHistory } : initSlot;
          });
          setMediaSlots(merged);
        }
      } else {
        localStorage.setItem("samm_media_slots_v2", JSON.stringify(INITIAL_MEDIA_SLOTS));
      }

      const storedPromo = localStorage.getItem("samm_promo_settings");
      if (storedPromo) {
        setPromoConfig(JSON.parse(storedPromo));
      }

      const limaState = getActiveLimaThemeState();
      setThemeMode(limaState.mode);
      setActiveTheme(limaState.activeTheme);
      applySeasonTheme(limaState.activeTheme.colors);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const triggerSaveToast = (msg: string) => {
    setSaveAlert(msg);
    setTimeout(() => setSaveAlert(null), 3000);
  };

  // Métricas financieras en Soles
  const totalIncome = bookings
    .filter(b => b.status === "confirmada")
    .reduce((acc, b) => acc + b.totalPrice, 0);

  const totalDeposits = bookings
    .filter(b => b.status === "confirmada")
    .reduce((acc, b) => acc + b.deposit20, 0);

  const pendingPreReservations = bookings.filter(b => b.status === "pre_reserva").length;
  const confirmedCount = bookings.filter(b => b.status === "confirmada").length;

  const handleConfirmYape = (id: string) => {
    setBookings(prev => prev.map(b => {
      if (b.id === id) {
        return {
          ...b,
          status: "confirmada",
          paymentMethod: "Yape",
          receiptNote: "Adelanto 20% verificado en Yape (Casilla Verde asegurada)"
        };
      }
      return b;
    }));
    triggerSaveToast("Pre-reserva aprobada en caja verde");
  };

  const handleCancelBooking = (id: string) => {
    setBookings(prev => prev.map(b => {
      if (b.id === id) {
        return { ...b, status: "cancelada", receiptNote: "Liberado por tiempo de espera excedido" };
      }
      return b;
    }));
  };

  const handleCreateMockPreReservation = () => {
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const newMock: AdminBooking = {
      id: `b-${Date.now()}`,
      code: `PRE-${randomCode}`,
      clientName: "Lucía Fernandez",
      clientPhone: "+51 993 888 777",
      service: "Extensiones Soft Gel & Full Cover Tips",
      extras: ["Retiro Seguro Set Ajeno (+30m)"],
      date: "2026-10-28",
      timeSlot: "16:00 - 18:30",
      durationMinutes: 150,
      totalPrice: 135,
      deposit20: 27,
      remaining80: 108,
      status: "pre_reserva",
      paymentMethod: "Pendiente",
      receiptNote: "Pre-reserva recién emitida en web"
    };
    setBookings([newMock, ...bookings]);
    triggerSaveToast("Pre-reserva de prueba añadida");
  };

  // Función maestra de sincronización de fotos en las 3 páginas de la web
  const syncMediaToSite = (slotId: string, newUrl: string) => {
    try {
      // 1. Página Home: Portada Hero
      if (slotId === "hero-main") {
        localStorage.setItem("samm_hero_bg", newUrl);
      }

      // 2. Página Home: Las 3 tarjetas de Nuestra Filosofía en Cabina
      if (slotId.startsWith("home-")) {
        const storedHome = localStorage.getItem("samm_home_showcase");
        const baseList = storedHome ? JSON.parse(storedHome) : DEFAULT_HOME_SHOWCASE;
        const updatedHome = baseList.map((item: any) =>
          item.id === slotId ? { ...item, imgUrl: newUrl, url: newUrl } : item
        );
        localStorage.setItem("samm_home_showcase", JSON.stringify(updatedHome));
      }

      // 3. Página Servicios: Los 6 tratamientos del catálogo
      if (services.some(s => s.id === slotId)) {
        const updatedSrv = services.map(s => s.id === slotId ? { ...s, imgUrl: newUrl } : s);
        setServices(updatedSrv);
        localStorage.setItem("samm_services_data", JSON.stringify(updatedSrv));
      }

      // 4. Página Servicios: Las 8 fotos de la Galería "Resultados en Cabina"
      if (slotId.startsWith("g")) {
        const storedGallery = localStorage.getItem("samm_gallery_data");
        const list = storedGallery ? JSON.parse(storedGallery) : DEFAULT_GALLERY.map(g => ({ id: g.id, url: g.url }));
        const updatedGal = list.some((item: any) => item.id === slotId)
          ? list.map((item: any) => item.id === slotId ? { ...item, url: newUrl } : item)
          : [...list, { id: slotId, url: newUrl }];
        localStorage.setItem("samm_gallery_data", JSON.stringify(updatedGal));
      }

      // 5. Página Nosotros: Retrato Principal del Atelier
      if (slotId === "about-sam") {
        localStorage.setItem("samm_about_photo", newUrl);
      }

      // 6. Página Nosotros: Los 5 pasos de la Guía para una Manicura Duradera
      if (slotId.startsWith("care-")) {
        const storedCare = localStorage.getItem("samm_care_steps");
        const careList = storedCare ? JSON.parse(storedCare) : DEFAULT_CARE_STEPS;
        const updatedCare = careList.map((step: any) =>
          step.id === slotId ? { ...step, imgUrl: newUrl, url: newUrl } : step
        );
        localStorage.setItem("samm_care_steps", JSON.stringify(updatedCare));
      }

      window.dispatchEvent(new Event("storage"));
    } catch (e) {
      console.error(e);
    }
  };

  // Manejadores: Servicios (Cuadraditos Cortos)
  const handleOpenNewServiceModal = () => {
    setServiceModal({
      isOpen: true,
      mode: "create",
      data: {
        id: `srv-${Date.now()}`,
        name: "",
        category: "manicura",
        price: 60,
        duration: 120,
        desc: "",
        tag: "Nuevo",
        imgUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80"
      }
    });
  };

  const handleOpenEditServiceModal = (item: ServiceItem) => {
    setServiceModal({
      isOpen: true,
      mode: "edit",
      data: { ...item }
    });
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    const current = serviceModal.data;
    if (!current.name.trim()) return;

    let updated: ServiceItem[];
    if (serviceModal.mode === "create") {
      updated = [...services, current];
      triggerSaveToast(`Servicio "${current.name}" añadido al catálogo`);
    } else {
      updated = services.map(s => s.id === current.id ? current : s);
      triggerSaveToast(`Servicio "${current.name}" actualizado`);
    }
    setServices(updated);
    localStorage.setItem("samm_services_data", JSON.stringify(updated));

    // Sincronizar también en Multimedia si existe la tarjeta del servicio
    const updatedMedia = mediaSlots.map(slot => {
      if (slot.id === current.id) {
        return {
          ...slot,
          title: current.name,
          activeUrl: current.imgUrl,
          cloudHistory: slot.cloudHistory.some(h => h.url === current.imgUrl)
            ? slot.cloudHistory.map(h => ({ ...h, isActive: h.url === current.imgUrl }))
            : [{ id: `srv-up-${Date.now()}`, url: current.imgUrl, uploadedAt: "Desde Servicios", isActive: true }, ...slot.cloudHistory.map(h => ({ ...h, isActive: false }))]
        };
      }
      return slot;
    });
    setMediaSlots(updatedMedia);
    localStorage.setItem("samm_media_slots_v2", JSON.stringify(updatedMedia));
    window.dispatchEvent(new Event("storage"));

    setServiceModal(prev => ({ ...prev, isOpen: false }));
  };

  const handleDeleteService = (id: string, name: string) => {
    if (!confirm(`¿Eliminar el servicio "${name}" del catálogo?`)) return;
    const updated = services.filter(s => s.id !== id);
    setServices(updated);
    localStorage.setItem("samm_services_data", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
    triggerSaveToast(`Servicio "${name}" eliminado`);
  };

  // Manejadores: Complementos & Extras Agregables
  const handleOpenNewExtraModal = () => {
    setExtraModal({
      isOpen: true,
      mode: "create",
      data: {
        id: `ext-${Date.now()}`,
        name: "",
        price: 20,
        duration: 30,
        desc: ""
      }
    });
  };

  const handleOpenEditExtraModal = (item: ExtraItem) => {
    setExtraModal({
      isOpen: true,
      mode: "edit",
      data: { ...item }
    });
  };

  const handleSaveExtra = (e: React.FormEvent) => {
    e.preventDefault();
    const current = extraModal.data;
    if (!current.name.trim()) return;

    let updated: ExtraItem[];
    if (extraModal.mode === "create") {
      updated = [...extras, current];
      triggerSaveToast(`Extra "${current.name}" añadido`);
    } else {
      updated = extras.map(ex => ex.id === current.id ? current : ex);
      triggerSaveToast(`Extra "${current.name}" actualizado`);
    }
    setExtras(updated);
    localStorage.setItem("samm_extras_data", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
    setExtraModal(prev => ({ ...prev, isOpen: false }));
  };

  const handleDeleteExtra = (id: string, name: string) => {
    if (!confirm(`¿Eliminar el extra "${name}"?`)) return;
    const updated = extras.filter(ex => ex.id !== id);
    setExtras(updated);
    localStorage.setItem("samm_extras_data", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
    triggerSaveToast(`Extra "${name}" eliminado`);
  };

  // Manejadores: Artículos del Lookbook
  const handleOpenNewArticleModal = () => {
    setArticleModal({
      isOpen: true,
      mode: "create",
      data: {
        id: `art-${Date.now()}`,
        title: "",
        category: "Salud Ungueal",
        date: "Guía de Estudio",
        readTime: "3 min de lectura",
        imgUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1000&q=85",
        desc: ""
      }
    });
  };

  const handleOpenEditArticleModal = (item: ArticleItem) => {
    setArticleModal({
      isOpen: true,
      mode: "edit",
      data: { ...item }
    });
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    const current = articleModal.data;
    if (!current.title.trim()) return;

    let updated: ArticleItem[];
    if (articleModal.mode === "create") {
      updated = [...articles, current];
      triggerSaveToast(`Artículo "${current.title}" añadido al Lookbook`);
    } else {
      updated = articles.map(a => a.id === current.id ? current : a);
      triggerSaveToast(`Artículo "${current.title}" actualizado`);
    }
    setArticles(updated);
    localStorage.setItem("samm_articles_data", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
    setArticleModal(prev => ({ ...prev, isOpen: false }));
  };

  const handleDeleteArticle = (id: string, title: string) => {
    if (!confirm(`¿Eliminar el artículo "${title}" del Lookbook?`)) return;
    const updated = articles.filter(a => a.id !== id);
    setArticles(updated);
    localStorage.setItem("samm_articles_data", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
    triggerSaveToast(`Artículo eliminado`);
  };

  // Manejadores: Multimedia
  const handleActivateMedia = (slotId: string, historyId: string) => {
    let activatedUrl = "";
    const updated = mediaSlots.map(slot => {
      if (slot.id === slotId) {
        const targetItem = slot.cloudHistory.find(h => h.id === historyId);
        if (!targetItem) return slot;
        activatedUrl = targetItem.url;
        return {
          ...slot,
          activeUrl: targetItem.url,
          cloudHistory: slot.cloudHistory.map(h => ({
            ...h,
            isActive: h.id === historyId
          }))
        };
      }
      return slot;
    });
    setMediaSlots(updated);
    localStorage.setItem("samm_media_slots_v2", JSON.stringify(updated));

    if (activatedUrl) {
      syncMediaToSite(slotId, activatedUrl);
    }
    triggerSaveToast("Foto activada y sincronizada en toda la web");
  };

  // Manejadores: Motor de Temporada y Eventos de Lima
  const handleSetAutoSeasonMode = () => {
    const auto = detectAutoLimaTheme();
    setThemeMode("auto");
    setActiveTheme(auto.activeTheme);
    localStorage.setItem("samm_lima_theme_config", JSON.stringify({ mode: "auto" }));
    applySeasonTheme(auto.activeTheme.colors);
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("samm-theme-change"));
    triggerSaveToast(`Modo Automático Lima activado: ${auto.activeTheme.name}`);
  };

  const handleSelectManualTheme = (themeId: string) => {
    const found = ALL_LIMA_THEMES.find(t => t.id === themeId);
    if (!found) return;
    setThemeMode("manual");
    setActiveTheme(found);
    localStorage.setItem("samm_lima_theme_config", JSON.stringify({ mode: "manual", themeId: found.id }));
    applySeasonTheme(found.colors);
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("samm-theme-change"));
    triggerSaveToast(`Tema "${found.name}" aplicado en toda la web`);
  };

  const filteredBookings = bookings.filter(b => {
    const matchesFilter = filterStatus === "todos" ? true : b.status === filterStatus;
    const matchesSearch = 
      b.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.clientPhone.includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  const filteredMedia = mediaFilter === "todos"
    ? mediaSlots
    : mediaSlots.filter(m => m.section === mediaFilter);

  const countBySection = {
    todos: mediaSlots.length,
    home: mediaSlots.filter(m => m.section === "home").length,
    servicios: mediaSlots.filter(m => m.section === "servicios").length,
    nosotros: mediaSlots.filter(m => m.section === "nosotros").length
  };

  return (
    <div className="min-h-screen bg-[#FBF8F6] text-[#231C1A] flex flex-col font-sans">
      
      {/* Toast Flotante de Notificación */}
      {saveAlert && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#231C1A] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-white/10 animate-fade-in text-xs font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{saveAlert}</span>
        </div>
      )}

      {/* 1. TOP BAR DE SEGURIDAD & ACCESO RÁPIDO */}
      <div className="bg-[#231C1A] text-[#FAF6F2] px-4 sm:px-6 py-2 text-xs border-b border-[#3A2E2B]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-semibold text-[#C8927B]">
              <Sparkles className="w-3.5 h-3.5" /> CABINA DE CONTROL SAMM
            </span>
            <span className="hidden sm:inline-block text-white/60">
              Gestión Integral · Turnos, Servicios, Artículos, Multimedia y Temporadas Lima
            </span>
          </div>
          <div className="flex items-center gap-4 text-[10px]">
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Tema Activo: {activeTheme.name}
            </span>
            <a href="/" target="_blank" rel="noreferrer" className="text-[#C8927B] hover:text-white transition-colors underline font-semibold">
              ← Ir a Web Clienta
            </a>
          </div>
        </div>
      </div>

      {/* 2. HEADER ELEGANTE CON LOGO Y LAS 5 PESTAÑAS MAESTRAS */}
      <header className="bg-white/95 backdrop-blur-md border-b border-[#EFE2DC] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 min-h-20 flex flex-col md:flex-row md:items-center justify-between gap-4 py-3">
          
          {/* Logo y Subtítulo */}
          <div className="flex items-center gap-3">
            <img 
              src="./samm-nailstudio-wordmark.svg" 
              alt="samm. NAIL STUDIO" 
              className="h-9 sm:h-11 w-auto object-contain"
            />
            <div className="border-l border-[#EFE2DC] pl-3">
              <span className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-bold text-[#7A3E48] block">
                ADMINISTRATION PANEL
              </span>
              <span className="text-[11px] sm:text-xs text-[#8d7e78] font-medium block">
                Callao, Lima · Atelier de Uñas
              </span>
            </div>
          </div>

          {/* PESTAÑAS MAESTRAS: DASHBOARD, SERVICIOS, ARTÍCULOS, MULTIMEDIA, TEMPORADA */}
          <nav className="flex items-center gap-1 p-1 bg-[#F2ECE4] rounded-full border border-[#E5DDD2] text-xs font-semibold overflow-x-auto max-w-full">
            
            {/* 1. Dashboard */}
            <button
              type="button"
              onClick={() => setActiveTab("dashboard")}
              className={`px-3.5 py-2 rounded-full transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "dashboard"
                  ? "bg-[#2C2420] text-white shadow-xs font-bold"
                  : "text-[#6C5F57] hover:text-[#2C2420] hover:bg-black/5"
              }`}
            >
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>

            {/* 2. Servicios (Cuadraditos Cortos) */}
            <button
              type="button"
              onClick={() => setActiveTab("servicios")}
              className={`px-3.5 py-2 rounded-full transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "servicios"
                  ? "bg-[#2C2420] text-white shadow-xs font-bold"
                  : "text-[#6C5F57] hover:text-[#2C2420] hover:bg-black/5"
              }`}
            >
              <Scissors className="w-3.5 h-3.5 text-[#C8927B]" />
              <span>Servicios ({services.length})</span>
            </button>

            {/* 3. Artículos (Lookbook) */}
            <button
              type="button"
              onClick={() => setActiveTab("articulos")}
              className={`px-3.5 py-2 rounded-full transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "articulos"
                  ? "bg-[#2C2420] text-white shadow-xs font-bold"
                  : "text-[#6C5F57] hover:text-[#2C2420] hover:bg-black/5"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#C8927B]" />
              <span>Artículos ({articles.length})</span>
            </button>

            {/* 4. Gestión Multimedia */}
            <button
              type="button"
              onClick={() => setActiveTab("multimedia")}
              className={`px-3.5 py-2 rounded-full transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "multimedia"
                  ? "bg-[#2C2420] text-white shadow-xs font-bold"
                  : "text-[#6C5F57] hover:text-[#2C2420] hover:bg-black/5"
              }`}
            >
              <FolderOpen className="w-3.5 h-3.5 text-[#C8927B]" />
              <span>Multimedia ({mediaSlots.length})</span>
            </button>

            {/* 5. Temporada */}
            <button
              type="button"
              onClick={() => setActiveTab("temporada")}
              className={`px-3.5 py-2 rounded-full transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "temporada"
                  ? "bg-[#2C2420] text-white shadow-xs font-bold"
                  : "text-[#6C5F57] hover:text-[#2C2420] hover:bg-black/5"
              }`}
            >
              <Palette className="w-3.5 h-3.5 text-[#C8927B]" />
              <span>Temporada</span>
            </button>
          </nav>

          {/* Acciones Rápidas */}
          <div className="flex items-center gap-2">
            {activeTab === "dashboard" && (
              <button
                onClick={handleCreateMockPreReservation}
                className="bg-[#7A3E48] hover:bg-[#5E2F37] text-white text-[11px] sm:text-xs font-semibold px-3.5 py-2 rounded-full transition-all shadow-xs flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5 text-[#C8927B]" /> 
                Simular Pre-Reserva
              </button>
            )}
            {activeTab === "servicios" && (
              <button
                onClick={handleOpenNewServiceModal}
                className="bg-[#7A3E48] hover:bg-[#5E2F37] text-white text-[11px] sm:text-xs font-semibold px-3.5 py-2 rounded-full transition-all shadow-xs flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5 text-[#C8927B]" /> 
                Nuevo Servicio
              </button>
            )}
            {activeTab === "articulos" && (
              <button
                onClick={handleOpenNewArticleModal}
                className="bg-[#7A3E48] hover:bg-[#5E2F37] text-white text-[11px] sm:text-xs font-semibold px-3.5 py-2 rounded-full transition-all shadow-xs flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5 text-[#C8927B]" /> 
                Nuevo Artículo
              </button>
            )}
            <a 
              href="/"
              target="_blank"
              rel="noreferrer"
              className="bg-[#FBF8F6] hover:bg-[#EFE2DC] text-[#231C1A] text-[11px] sm:text-xs px-3.5 py-2 rounded-full transition-all font-semibold border border-[#EFE2DC] flex items-center gap-1.5"
            >
              <span>Ver Web</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#7A3E48]" />
            </a>
          </div>

        </div>
      </header>

      {/* ========================================================
          PESTAÑA 1: DASHBOARD (CAJA, CITAS Y PROMOS)
          ======================================================== */}
      {activeTab === "dashboard" && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full animate-fade-in">
          
          {/* BANNER DE INGRESOS EN SOLES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-5 rounded-2xl border border-[#EFE2DC] shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#8d7e78] tracking-widest block">
                  Ingresos Proyectados (100%)
                </span>
                <span className="text-2xl font-bold text-[#231C1A] mt-1 block">
                  S/ {totalIncome}.00
                </span>
                <span className="text-[10px] text-emerald-600 font-semibold mt-0.5 block flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> {confirmedCount} turnos cerrados
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#FBF8F6] border border-[#EFE2DC] flex items-center justify-center text-[#7A3E48]">
                <Wallet className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-emerald-200/80 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-widest block">
                  Caja Adelantos 20% (Yape/Plin)
                </span>
                <span className="text-2xl font-bold text-emerald-700 mt-1 block">
                  S/ {totalDeposits}.00
                </span>
                <span className="text-[10px] text-emerald-600 font-semibold mt-0.5 block">
                  Garantizados en cuenta bancaria
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <Receipt className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-orange-200/80 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-orange-800 tracking-widest block">
                  Pre-Reservas Pendientes
                </span>
                <span className="text-2xl font-bold text-orange-600 mt-1 block">
                  {pendingPreReservations}
                </span>
                <span className="text-[10px] text-orange-600 font-semibold mt-0.5 block">
                  Esperando validación de Yape
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600">
                <Clock className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#EFE2DC] shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#8d7e78] tracking-widest block">
                  Protocolo de Atención
                </span>
                <span className="text-sm font-bold text-[#231C1A] mt-1 block">
                  Exclusivo & Personalizado
                </span>
                <span className="text-[10px] text-[#7A3E48] font-semibold mt-0.5 block flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#7A3E48]" /> Esterilización Autoclave
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#FAF6F2] border border-[#EAE3DA] flex items-center justify-center text-[#7A3E48]">
                <CalendarCheck2 className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* PANEL DE CONTROL DE PROMOCIONES & POPUP DE ENTRADA */}
          <div className="bg-white border border-[#EFE2DC] rounded-3xl p-6 shadow-xs mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EFE2DC]">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#7A3E48] block mb-1">
                  MARKETING EN VIVO
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#231C1A]">Control de Promoción de Bienvenida</h3>
                <p className="text-xs text-[#8d7e78] mt-0.5">Configura el popup que ven las clientas a los 3 segundos de entrar a la web.</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-[#231C1A]">
                  Estado del Popup:
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const next = !promoConfig.enabled;
                    const updated = { ...promoConfig, enabled: next };
                    setPromoConfig(updated);
                    localStorage.setItem("samm_promo_settings", JSON.stringify(updated));
                    triggerSaveToast(next ? "Popup promocional activado en web" : "Popup promocional desactivado");
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                    promoConfig.enabled
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${promoConfig.enabled ? "bg-white animate-pulse" : "bg-gray-400"}`}></span>
                  <span>{promoConfig.enabled ? "ACTIVADO" : "PAUSADO"}</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#8d7e78] font-bold block mb-1">
                  Titular de la Oferta
                </label>
                <input
                  type="text"
                  value={promoConfig.headline}
                  onChange={(e) => {
                    const updated = { ...promoConfig, headline: e.target.value };
                    setPromoConfig(updated);
                    localStorage.setItem("samm_promo_settings", JSON.stringify(updated));
                  }}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2DC] bg-[#FBF8F6] font-medium text-[#231C1A] focus:outline-none focus:border-[#7A3E48]"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#8d7e78] font-bold block mb-1">
                  Código de Cupón
                </label>
                <input
                  type="text"
                  value={promoConfig.discountCode}
                  onChange={(e) => {
                    const updated = { ...promoConfig, discountCode: e.target.value.toUpperCase() };
                    setPromoConfig(updated);
                    localStorage.setItem("samm_promo_settings", JSON.stringify(updated));
                  }}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2DC] bg-[#FBF8F6] font-mono font-bold text-[#7A3E48] focus:outline-none focus:border-[#7A3E48]"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#8d7e78] font-bold block mb-1">
                  Texto del Botón CTA
                </label>
                <input
                  type="text"
                  value={promoConfig.ctaText}
                  onChange={(e) => {
                    const updated = { ...promoConfig, ctaText: e.target.value };
                    setPromoConfig(updated);
                    localStorage.setItem("samm_promo_settings", JSON.stringify(updated));
                  }}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2DC] bg-[#FBF8F6] font-medium text-[#231C1A] focus:outline-none focus:border-[#7A3E48]"
                />
              </div>
            </div>
          </div>

          {/* TABLA Y LISTADO DE CITAS */}
          <div className="bg-white border border-[#EFE2DC] rounded-3xl p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#EFE2DC]">
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#231C1A]">Agenda de Turnos & Recepción</h3>
                <p className="text-xs text-[#8d7e78] mt-0.5">Control de comprobantes de pago para asegurar turnos.</p>
              </div>

              {/* Filtro y Búsqueda */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 w-full sm:w-auto">
                <div className="relative w-full sm:w-auto">
                  <Search className="w-3.5 h-3.5 text-[#8d7e78] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Buscar clienta, código o celular..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 pr-3 py-1.5 rounded-full border border-[#EFE2DC] bg-[#FBF8F6] text-xs focus:outline-none focus:border-[#7A3E48] w-full sm:w-64"
                  />
                </div>

                <div className="grid grid-cols-3 sm:flex items-center gap-1 bg-[#FAF6F2] p-1 rounded-full border border-[#EFE2DC] text-[11px] w-full sm:w-auto">
                  {["todos", "pre_reserva", "confirmada"].map(st => (
                    <button
                      key={st}
                      onClick={() => setFilterStatus(st)}
                      className={`px-3 py-1 rounded-full capitalize transition-all ${
                        filterStatus === st 
                          ? "bg-[#7A3E48] text-white font-bold" 
                          : "text-[#8d7e78] hover:text-[#231C1A]"
                      }`}
                    >
                      {st === "pre_reserva" ? "Pre-Reserva" : st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Listado de Bookings */}
            <div className="space-y-4">
              {filteredBookings.length === 0 ? (
                <div className="text-center py-12 text-[#8d7e78] text-xs">
                  No se encontraron citas con ese criterio.
                </div>
              ) : (
                filteredBookings.map(booking => {
                  const isPending = booking.status === "pre_reserva";
                  const isConfirmed = booking.status === "confirmada";

                  return (
                    <div 
                      key={booking.id}
                      className={`p-5 rounded-2xl border transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${
                        isPending 
                          ? "bg-orange-50/40 border-orange-200" 
                          : isConfirmed 
                          ? "bg-emerald-50/20 border-emerald-200" 
                          : "bg-gray-50 border-gray-200 opacity-60"
                      }`}
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-white border border-[#EFE2DC] text-[#231C1A]">
                            #{booking.code}
                          </span>
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                            isPending 
                              ? "bg-orange-100 text-orange-800" 
                              : isConfirmed 
                              ? "bg-emerald-100 text-emerald-800" 
                              : "bg-gray-200 text-gray-700"
                          }`}>
                            {isPending ? "Pre-Reserva (Naranja)" : isConfirmed ? "Confirmada (Verde)" : "Cancelada"}
                          </span>
                          <span className="text-xs text-[#8d7e78] flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" /> {booking.date} · {booking.timeSlot}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-[#7A3E48]" />
                          <h4 className="font-bold text-sm text-[#231C1A]">{booking.clientName}</h4>
                          <span className="text-xs text-[#8d7e78]">({booking.clientPhone})</span>
                        </div>

                        <p className="text-xs text-[#7A3E48] font-medium">
                          {booking.service} {booking.extras.length > 0 && `+ ${booking.extras.join(", ")}`}
                        </p>
                      </div>

                      <div className="space-y-1 lg:text-right shrink-0">
                        <div className="text-xs text-[#8d7e78]">
                          Total: <strong className="text-sm text-[#231C1A]">S/ {booking.totalPrice}</strong>
                        </div>
                        <div className="text-xs text-emerald-700 font-bold">
                          Adelanto 20%: S/ {booking.deposit20}
                        </div>
                        <div className="text-[11px] text-[#8d7e78]">
                          Saldo en Cabina: <strong>S/ {booking.remaining80}</strong>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {isPending && (
                          <>
                            <button
                              onClick={() => handleConfirmYape(booking.id)}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-full transition-all flex items-center gap-1.5 shadow-xs"
                            >
                              <Check className="w-3.5 h-3.5" /> Aprobar Yape
                            </button>
                            <a
                              href={`https://wa.me/${booking.clientPhone.replace(/\D/g, "")}?text=Hola%20${encodeURIComponent(booking.clientName)},%20te%20saludamos%20de%20samm.%20NAIL%20STUDIO.%20¿Llegaste%20a%20hacer%20el%20Yape%20de%20S/%20${booking.deposit20}%20para%20tu%20cita?`}
                              target="_blank"
                              rel="noreferrer"
                              className="bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold px-3 py-2 rounded-full transition-all flex items-center gap-1"
                            >
                              <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                            </a>
                          </>
                        )}
                        {isConfirmed && (
                          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Confirmado
                          </span>
                        )}
                        <button
                          onClick={() => handleCancelBooking(booking.id)}
                          className="text-xs text-rose-600 hover:bg-rose-50 p-2 rounded-full"
                          title="Cancelar"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

        </main>
      )}

      {/* ========================================================
          PESTAÑA 2: SERVICIOS EN CUADRADITOS CORTOS + EXTRAS
          ======================================================== */}
      {activeTab === "servicios" && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full animate-fade-in">
          
          {/* Cabecera */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#7A3E48] block mb-1">
                CATÁLOGO DE TRATAMIENTOS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#231C1A]">
                Gestión de Servicios & Precios
              </h2>
              <p className="text-xs text-[#8d7e78] mt-1 max-w-xl">
                Modifica precios, duraciones, fotos o descripciones. Todo cambio se actualiza inmediatamente en el catálogo y en el carrito de citas.
              </p>
            </div>

            <button
              type="button"
              onClick={handleOpenNewServiceModal}
              className="px-5 py-2.5 rounded-full bg-[#7A3E48] hover:bg-[#5E2F37] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-2 self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Agregar Servicio</span>
            </button>
          </div>

          {/* Grilla en Cuadraditos Cortos */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            
            {/* Tarjeta 1: Botón '+' para Agregar en la Grilla */}
            <div 
              onClick={handleOpenNewServiceModal}
              className="min-h-[195px] sm:aspect-square rounded-2xl border-2 border-dashed border-[#C8927B]/60 hover:border-[#7A3E48] hover:bg-[#FAF6F2] transition-all flex flex-col items-center justify-center p-4 cursor-pointer text-center group"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white border border-[#EFE2DC] group-hover:bg-[#7A3E48] group-hover:text-white text-[#7A3E48] flex items-center justify-center transition-all shadow-xs mb-2">
                <Plus className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
              </div>
              <span className="text-xs font-bold text-[#231C1A] group-hover:text-[#7A3E48]">
                Añadir Servicio
              </span>
              <span className="text-[10px] text-[#8d7e78] mt-0.5">
                Nuevo tratamiento
              </span>
            </div>

            {/* Cuadraditos Cortos de Servicios Existentes */}
            {services.map(item => (
              <div
                key={item.id}
                className="min-h-[195px] sm:aspect-square rounded-2xl border border-[#EFE2DC] bg-white overflow-hidden shadow-xs hover:shadow-md hover:border-[#7A3E48] transition-all flex flex-col justify-between relative group"
              >
                {/* Imagen Cuadrada Superior */}
                <div className="relative h-24 sm:h-28 w-full overflow-hidden bg-[#FAF6F2] shrink-0">
                  <img 
                    src={item.imgUrl} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Badge de Categoría */}
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-md text-[9px] uppercase font-bold tracking-wider text-[#7A3E48]">
                    {item.tag || item.category}
                  </span>

                  {/* Acciones flotantes al pasar el mouse */}
                  <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenEditServiceModal(item);
                      }}
                      className="w-7 h-7 rounded-lg bg-white/95 text-[#231C1A] hover:bg-[#7A3E48] hover:text-white flex items-center justify-center shadow-xs transition-colors"
                      title="Editar servicio"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteService(item.id, item.name);
                      }}
                      className="w-7 h-7 rounded-lg bg-white/95 text-rose-600 hover:bg-rose-600 hover:text-white flex items-center justify-center shadow-xs transition-colors"
                      title="Eliminar servicio"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Precio en Soles sobre la foto */}
                  <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-white">
                    <span className="text-[11px] font-mono flex items-center gap-1 drop-shadow">
                      <Clock className="w-3 h-3 text-[#C8927B]" /> {item.duration}m
                    </span>
                    <span className="text-sm font-bold font-serif drop-shadow text-[#FAF6F2]">
                      S/ {item.price}
                    </span>
                  </div>
                </div>

                {/* Pie del Cuadrito: Título y Botón Editar */}
                <div className="p-2.5 flex-1 flex flex-col justify-between">
                  <h4 className="font-medium text-xs text-[#231C1A] leading-tight line-clamp-2" title={item.name}>
                    {item.name}
                  </h4>
                  
                  <div className="flex items-center justify-between pt-1 border-t border-[#F5EFEB] mt-1">
                    <span className="text-[10px] text-[#8d7e78] capitalize">
                      {item.category}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleOpenEditServiceModal(item)}
                      className="text-[10px] text-[#7A3E48] hover:underline font-bold flex items-center gap-0.5"
                    >
                      Editar
                    </button>
                  </div>
                </div>

              </div>
            ))}

          </div>

          {/* SECCIÓN ABAJO: COMPLEMENTOS & EXTRAS AGREGABLES */}
          <div className="mt-14 pt-8 border-t border-[#EFE2DC]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#7A3E48] block mb-1">
                  TIEMPO ADICIONAL & MARGEN EN CABINA
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#231C1A]">
                  Complementos & Diseños Extras
                </h3>
                <p className="text-xs text-[#8d7e78] mt-0.5">
                  Servicios complementarios que la clienta puede añadir a su cita (+S/ y +minutos). Editables en tiempo real.
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenNewExtraModal}
                className="px-4 py-2.5 rounded-2xl bg-[#231C1A] hover:bg-[#3A2E2B] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-2 self-start sm:self-center"
              >
                <Plus className="w-4 h-4 text-[#C8927B]" />
                <span>Nuevo Extra</span>
              </button>
            </div>

            {/* Grid de Extras */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {extras.map((extra) => (
                <div 
                  key={extra.id}
                  className="bg-white border border-[#EFE2DC] rounded-2xl p-4 shadow-xs flex flex-col justify-between hover:shadow-md transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono font-bold text-[#7A3E48] bg-[#FAF6F2] px-2 py-0.5 rounded-md border border-[#EAE3DA]">
                        +{extra.duration} min
                      </span>
                      <span className="font-serif font-bold text-base text-[#231C1A]">
                        +S/ {extra.price}
                      </span>
                    </div>

                    <h4 className="font-bold text-xs text-[#231C1A] leading-snug mb-1.5">
                      {extra.name}
                    </h4>

                    <p className="text-[11px] text-[#7A6B62] leading-relaxed line-clamp-2">
                      {extra.desc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[#F5EFEB] mt-3">
                    <button
                      type="button"
                      onClick={() => handleOpenEditExtraModal(extra)}
                      className="text-[11px] text-[#7A3E48] hover:underline font-bold flex items-center gap-1"
                    >
                      <Pencil className="w-3 h-3" />
                      <span>Editar</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteExtra(extra.id, extra.name)}
                      className="p-1 rounded-md text-rose-500 hover:bg-rose-50 transition-colors"
                      title="Eliminar extra"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MODAL: EDITAR O AGREGAR SERVICIO */}
          {serviceModal.isOpen && (
            <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
              <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#EFE2DC] max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between pb-3 border-b border-[#EFE2DC] mb-4">
                  <h3 className="font-serif text-xl font-bold text-[#231C1A]">
                    {serviceModal.mode === "create" ? "Agregar Nuevo Servicio" : "Modificar Servicio"}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setServiceModal(prev => ({ ...prev, isOpen: false }))}
                    className="text-[#8d7e78] hover:text-[#231C1A] p-1 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveService} className="space-y-4">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-[#8d7e78] block mb-1">
                      Nombre del Servicio
                    </label>
                    <input 
                      type="text" 
                      required
                      value={serviceModal.data.name}
                      onChange={(e) => setServiceModal(prev => ({
                        ...prev,
                        data: { ...prev.data, name: e.target.value }
                      }))}
                      placeholder="Ej. Manicura Rusa Express"
                      className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2DC] bg-[#FBF8F6] font-medium text-[#231C1A] focus:outline-none focus:border-[#7A3E48]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-[#8d7e78] block mb-1">
                        Precio en Soles (S/)
                      </label>
                      <input 
                        type="number" 
                        required
                        min="10"
                        value={serviceModal.data.price}
                        onChange={(e) => setServiceModal(prev => ({
                          ...prev,
                          data: { ...prev.data, price: Number(e.target.value) }
                        }))}
                        className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2DC] bg-[#FBF8F6] font-bold text-[#7A3E48] focus:outline-none focus:border-[#7A3E48]"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-bold text-[#8d7e78] block mb-1">
                        Duración (Minutos)
                      </label>
                      <input 
                        type="number" 
                        required
                        step="15"
                        value={serviceModal.data.duration}
                        onChange={(e) => setServiceModal(prev => ({
                          ...prev,
                          data: { ...prev.data, duration: Number(e.target.value) }
                        }))}
                        className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2DC] bg-[#FBF8F6] font-medium text-[#231C1A] focus:outline-none focus:border-[#7A3E48]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-[#8d7e78] block mb-1">
                        Categoría
                      </label>
                      <select
                        value={serviceModal.data.category}
                        onChange={(e) => setServiceModal(prev => ({
                          ...prev,
                          data: { ...prev.data, category: e.target.value as any }
                        }))}
                        className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2DC] bg-[#FBF8F6] font-medium text-[#231C1A] focus:outline-none focus:border-[#7A3E48]"
                      >
                        <option value="manicura">Manicura</option>
                        <option value="acrilico">Acrílico & Tips</option>
                        <option value="pedicura">Pedicura</option>
                        <option value="nailart">Nail Art</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-bold text-[#8d7e78] block mb-1">
                        Etiqueta / Badge
                      </label>
                      <input 
                        type="text" 
                        value={serviceModal.data.tag || ""}
                        onChange={(e) => setServiceModal(prev => ({
                          ...prev,
                          data: { ...prev.data, tag: e.target.value }
                        }))}
                        placeholder="Ej. Más Solicitado"
                        className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2DC] bg-[#FBF8F6] font-medium text-[#231C1A] focus:outline-none focus:border-[#7A3E48]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-[#8d7e78] block mb-1">
                      Foto del Tratamiento (Subir archivo o pegar URL)
                    </label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        required
                        value={serviceModal.data.imgUrl}
                        onChange={(e) => setServiceModal(prev => ({
                          ...prev,
                          data: { ...prev.data, imgUrl: e.target.value }
                        }))}
                        placeholder="https://images.unsplash.com/..."
                        className="flex-1 text-xs p-2.5 rounded-xl border border-[#EFE2DC] bg-[#FBF8F6] font-mono text-[#231C1A] focus:outline-none focus:border-[#7A3E48]"
                      />
                      <label className="px-3.5 py-2.5 rounded-xl bg-[#FAF6F2] hover:bg-[#7A3E48] hover:text-white text-[#7A3E48] border border-[#EFE2DC] text-xs font-bold cursor-pointer transition-colors flex items-center gap-1.5 shrink-0">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Subir +</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (ev) => {
                                const res = ev.target?.result as string;
                                if (res) {
                                  setServiceModal(prev => ({
                                    ...prev,
                                    data: { ...prev.data, imgUrl: res }
                                  }));
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                    </div>
                    {serviceModal.data.imgUrl && (
                      <div className="mt-2 h-20 w-20 rounded-xl overflow-hidden border border-[#EFE2DC]">
                        <img src={serviceModal.data.imgUrl} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-[#8d7e78] block mb-1">
                      Descripción del Tratamiento
                    </label>
                    <textarea 
                      rows={3}
                      value={serviceModal.data.desc}
                      onChange={(e) => setServiceModal(prev => ({
                        ...prev,
                        data: { ...prev.data, desc: e.target.value }
                      }))}
                      placeholder="Explica brevemente qué incluye y para qué clienta está recomendado..."
                      className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2DC] bg-[#FBF8F6] font-medium text-[#231C1A] focus:outline-none focus:border-[#7A3E48]"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#EFE2DC]">
                    <button
                      type="button"
                      onClick={() => setServiceModal(prev => ({ ...prev, isOpen: false }))}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-[#8d7e78] hover:bg-gray-100"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-[#7A3E48] hover:bg-[#5E2F37] text-white text-xs font-bold transition-all shadow-xs"
                    >
                      Guardar Servicio
                    </button>
                  </div>
                </form>

              </div>
            </div>
          )}

          {/* MODAL: EDITAR O AGREGAR EXTRA */}
          {extraModal.isOpen && (
            <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
              <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#EFE2DC]">
                <div className="flex items-center justify-between pb-3 border-b border-[#EFE2DC] mb-4">
                  <h3 className="font-serif text-xl font-bold text-[#231C1A]">
                    {extraModal.mode === "create" ? "Añadir Complemento Extra" : "Modificar Extra"}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setExtraModal(prev => ({ ...prev, isOpen: false }))}
                    className="text-[#8d7e78] hover:text-[#231C1A] p-1 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveExtra} className="space-y-4">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-[#8d7e78] block mb-1">
                      Nombre del Extra
                    </label>
                    <input 
                      type="text" 
                      required
                      value={extraModal.data.name}
                      onChange={(e) => setExtraModal(prev => ({
                        ...prev,
                        data: { ...prev.data, name: e.target.value }
                      }))}
                      placeholder="Ej. Reparación de Uña con Seda"
                      className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2DC] bg-[#FBF8F6] font-medium text-[#231C1A] focus:outline-none focus:border-[#7A3E48]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-[#8d7e78] block mb-1">
                        Precio Adicional (+S/)
                      </label>
                      <input 
                        type="number" 
                        required
                        min="5"
                        value={extraModal.data.price}
                        onChange={(e) => setExtraModal(prev => ({
                          ...prev,
                          data: { ...prev.data, price: Number(e.target.value) }
                        }))}
                        className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2DC] bg-[#FBF8F6] font-bold text-[#7A3E48] focus:outline-none focus:border-[#7A3E48]"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-bold text-[#8d7e78] block mb-1">
                        Tiempo Adicional (+Minutos)
                      </label>
                      <input 
                        type="number" 
                        required
                        step="5"
                        min="5"
                        value={extraModal.data.duration}
                        onChange={(e) => setExtraModal(prev => ({
                          ...prev,
                          data: { ...prev.data, duration: Number(e.target.value) }
                        }))}
                        className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2DC] bg-[#FBF8F6] font-medium text-[#231C1A] focus:outline-none focus:border-[#7A3E48]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-[#8d7e78] block mb-1">
                      Descripción Breve
                    </label>
                    <textarea 
                      rows={2}
                      required
                      value={extraModal.data.desc}
                      onChange={(e) => setExtraModal(prev => ({
                        ...prev,
                        data: { ...prev.data, desc: e.target.value }
                      }))}
                      placeholder="Breve explicación de qué incluye este extra..."
                      className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2DC] bg-[#FBF8F6] font-medium text-[#231C1A] focus:outline-none focus:border-[#7A3E48]"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#EFE2DC]">
                    <button
                      type="button"
                      onClick={() => setExtraModal(prev => ({ ...prev, isOpen: false }))}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-[#8d7e78] hover:bg-gray-100"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-[#7A3E48] hover:bg-[#5E2F37] text-white text-xs font-bold transition-all shadow-xs"
                    >
                      Guardar Extra
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </main>
      )}

      {/* ========================================================
          PESTAÑA 3: ARTÍCULOS LOOKBOOK (FOTO, TÍTULO Y DESCRIPCIÓN)
          ======================================================== */}
      {activeTab === "articulos" && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full animate-fade-in">
          
          {/* Cabecera */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#7A3E48] block mb-1">
                REVISTA & LOOKBOOK EDITORIAL
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#231C1A]">
                Editor de Artículos & Consejos
              </h2>
              <p className="text-xs text-[#8d7e78] mt-1 max-w-xl">
                Cambia la foto, el título y la descripción de cada publicación que aparece en el Lookbook de la portada.
              </p>
            </div>

            <button
              type="button"
              onClick={handleOpenNewArticleModal}
              className="px-5 py-2.5 rounded-full bg-[#7A3E48] hover:bg-[#5E2F37] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-2 self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Nuevo Artículo</span>
            </button>
          </div>

          {/* Grilla de 3 Columnas de Artículos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((art) => (
              <div 
                key={art.id}
                className="bg-white border border-[#EFE2DC] rounded-3xl p-4 shadow-xs flex flex-col justify-between hover:shadow-md transition-all group"
              >
                <div>
                  {/* Foto del Artículo */}
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#FAF6F2] mb-3">
                    <img 
                      src={art.imgUrl} 
                      alt={art.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] uppercase font-bold tracking-wider text-[#7A3E48]">
                      {art.category}
                    </span>
                  </div>

                  <span className="text-[10px] text-[#8d7e78] font-mono block mb-1">
                    {art.date} · {art.readTime}
                  </span>

                  <h3 className="font-serif text-lg font-bold text-[#231C1A] leading-snug mb-2">
                    {art.title}
                  </h3>

                  <p className="text-xs text-[#7A6B62] leading-relaxed line-clamp-3">
                    {art.desc}
                  </p>
                </div>

                {/* Acciones para Editar / Eliminar */}
                <div className="flex items-center justify-between pt-4 border-t border-[#F5EFEB] mt-4">
                  <button
                    type="button"
                    onClick={() => handleOpenEditArticleModal(art)}
                    className="px-4 py-1.5 rounded-full bg-[#FAF6F2] hover:bg-[#7A3E48] hover:text-white text-[#7A3E48] text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    <span>Editar Contenido</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteArticle(art.id, art.title)}
                    className="p-1.5 rounded-full text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Eliminar artículo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* MODAL: EDITAR O AGREGAR ARTÍCULO */}
          {articleModal.isOpen && (
            <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
              <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#EFE2DC] max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between pb-3 border-b border-[#EFE2DC] mb-4">
                  <h3 className="font-serif text-xl font-bold text-[#231C1A]">
                    {articleModal.mode === "create" ? "Nuevo Artículo para Lookbook" : "Editar Artículo"}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setArticleModal(prev => ({ ...prev, isOpen: false }))}
                    className="text-[#8d7e78] hover:text-[#231C1A] p-1 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveArticle} className="space-y-4">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-[#8d7e78] block mb-1">
                      Título del Artículo
                    </label>
                    <input 
                      type="text" 
                      required
                      value={articleModal.data.title}
                      onChange={(e) => setArticleModal(prev => ({
                        ...prev,
                        data: { ...prev.data, title: e.target.value }
                      }))}
                      placeholder="Ej. Kapping Rubber vs Acrílico Tradicional"
                      className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2DC] bg-[#FBF8F6] font-medium text-[#231C1A] focus:outline-none focus:border-[#7A3E48]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-[#8d7e78] block mb-1">
                        Categoría
                      </label>
                      <input 
                        type="text" 
                        required
                        value={articleModal.data.category}
                        onChange={(e) => setArticleModal(prev => ({
                          ...prev,
                          data: { ...prev.data, category: e.target.value }
                        }))}
                        placeholder="Ej. Salud Ungueal"
                        className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2DC] bg-[#FBF8F6] font-medium text-[#231C1A] focus:outline-none focus:border-[#7A3E48]"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-bold text-[#8d7e78] block mb-1">
                        Tiempo de Lectura
                      </label>
                      <input 
                        type="text" 
                        value={articleModal.data.readTime}
                        onChange={(e) => setArticleModal(prev => ({
                          ...prev,
                          data: { ...prev.data, readTime: e.target.value }
                        }))}
                        placeholder="Ej. 3 min de lectura"
                        className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2DC] bg-[#FBF8F6] font-medium text-[#231C1A] focus:outline-none focus:border-[#7A3E48]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-[#8d7e78] block mb-1">
                      Foto del Artículo (Subir archivo o pegar URL)
                    </label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        required
                        value={articleModal.data.imgUrl}
                        onChange={(e) => setArticleModal(prev => ({
                          ...prev,
                          data: { ...prev.data, imgUrl: e.target.value }
                        }))}
                        placeholder="https://images.unsplash.com/..."
                        className="flex-1 text-xs p-2.5 rounded-xl border border-[#EFE2DC] bg-[#FBF8F6] font-mono text-[#231C1A] focus:outline-none focus:border-[#7A3E48]"
                      />
                      <label className="px-3.5 py-2.5 rounded-xl bg-[#FAF6F2] hover:bg-[#7A3E48] hover:text-white text-[#7A3E48] border border-[#EFE2DC] text-xs font-bold cursor-pointer transition-colors flex items-center gap-1.5 shrink-0">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Subir +</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (ev) => {
                                const res = ev.target?.result as string;
                                if (res) {
                                  setArticleModal(prev => ({
                                    ...prev,
                                    data: { ...prev.data, imgUrl: res }
                                  }));
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                    </div>
                    {articleModal.data.imgUrl && (
                      <div className="mt-2 h-24 w-full rounded-xl overflow-hidden border border-[#EFE2DC]">
                        <img src={articleModal.data.imgUrl} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-[#8d7e78] block mb-1">
                      Descripción / Resumen de la Tarjeta
                    </label>
                    <textarea 
                      rows={4}
                      required
                      value={articleModal.data.desc}
                      onChange={(e) => setArticleModal(prev => ({
                        ...prev,
                        data: { ...prev.data, desc: e.target.value }
                      }))}
                      placeholder="Describe de qué trata el artículo y qué aprenderá la clienta..."
                      className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2DC] bg-[#FBF8F6] font-medium text-[#231C1A] focus:outline-none focus:border-[#7A3E48]"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#EFE2DC]">
                    <button
                      type="button"
                      onClick={() => setArticleModal(prev => ({ ...prev, isOpen: false }))}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-[#8d7e78] hover:bg-gray-100"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-[#7A3E48] hover:bg-[#5E2F37] text-white text-xs font-bold transition-all shadow-xs"
                    >
                      Guardar Artículo
                    </button>
                  </div>
                </form>

              </div>
            </div>
          )}

        </main>
      )}

      {/* ========================================================
          PESTAÑA 4: GESTIÓN MULTIMEDIA POR PÁGINAS (TODAS | HOME | SERVICIOS | NOSOTROS)
          ======================================================== */}
      {activeTab === "multimedia" && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full animate-fade-in">
          
          {/* Cabecera de la sección con las 4 opciones exactas */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#7A3E48] block mb-1">
                MINI-NUBE DE IMÁGENES EN VIVO
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#231C1A]">
                Gestor de Fotos por Página
              </h2>
              <p className="text-xs text-[#8d7e78] mt-1 max-w-xl">
                Filtra por cada una de las 3 páginas de la web del cliente (<strong>Home</strong>, <strong>Servicios</strong> y <strong>Nosotros</strong>) y cambia o sube cualquier foto con el botón "+".
              </p>
            </div>

            {/* Barra de Filtros por Página: Todas | Home | Servicios | Nosotros */}
            <div className="grid grid-cols-2 sm:flex items-center gap-1.5 bg-white p-1.5 rounded-2xl sm:rounded-full border border-[#EFE2DC] text-xs shadow-2xs w-full md:w-auto">
              {[
                { id: "todos", label: `Todas (${countBySection.todos})` },
                { id: "home", label: `Home (${countBySection.home})` },
                { id: "servicios", label: `Servicios (${countBySection.servicios})` },
                { id: "nosotros", label: `Nosotros (${countBySection.nosotros})` }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setMediaFilter(f.id as MediaSectionFilter)}
                  className={`px-3.5 py-2 sm:py-1.5 rounded-xl sm:rounded-full transition-all font-semibold whitespace-nowrap text-center ${
                    mediaFilter === f.id
                      ? "bg-[#7A3E48] text-white font-bold shadow-xs"
                      : "text-[#8d7e78] hover:text-[#231C1A]"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grilla Unificada de Secciones y Fotos Activas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredMedia.map(slot => (
              <div key={slot.id} className="bg-white border border-[#EFE2DC] rounded-3xl p-6 shadow-xs flex flex-col justify-between">
                
                {/* Cabecera del Slot */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full bg-[#FAF6F2] text-[#7A3E48] border border-[#EAE3DA]">
                      {slot.slotName}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Activa en Web
                    </span>
                  </div>
                  <h4 className="font-bold text-base text-[#231C1A]">{slot.title}</h4>
                </div>

                {/* Previsualizador de la Foto Activa */}
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden my-4 border border-[#EFE2DC] bg-[#FAF8F5]">
                  <img 
                    src={slot.activeUrl} 
                    alt={slot.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-[10px] text-white font-mono">
                    EN VIVO AHORA
                  </div>
                </div>

                {/* Historial en Nube / Opciones para alternar */}
                <div>
                  <span className="text-[11px] font-bold text-[#8d7e78] uppercase tracking-wider block mb-2">
                    Fotos Disponibles en tu Nube ({slot.cloudHistory.length}):
                  </span>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {slot.cloudHistory.map(item => (
                      <div 
                        key={item.id} 
                        onClick={() => handleActivateMedia(slot.id, item.id)}
                        className={`group relative rounded-xl overflow-hidden aspect-square border-2 cursor-pointer transition-all ${
                          item.isActive 
                            ? "border-emerald-500 shadow-sm" 
                            : "border-transparent opacity-60 hover:opacity-100 hover:border-[#7A3E48]"
                        }`}
                      >
                        <img src={item.url} alt="Nube" className="w-full h-full object-cover" />
                        {item.isActive ? (
                          <div className="absolute inset-0 bg-emerald-900/30 flex items-center justify-center">
                            <CheckCheck className="w-5 h-5 text-white drop-shadow" />
                          </div>
                        ) : (
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[9px] text-white font-bold text-center p-1">
                            Clic para activar
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Botón '+' para Subir Foto Directa a esta Sección */}
                    <label 
                      className="group relative rounded-xl border-2 border-dashed border-[#C8927B]/60 hover:border-[#7A3E48] hover:bg-[#FAF6F2] aspect-square flex flex-col items-center justify-center cursor-pointer transition-all p-2 text-center"
                      title="Subir foto a esta sección"
                    >
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (ev) => {
                              const result = ev.target?.result as string;
                              if (result) {
                                const newEntry = {
                                  id: `up-${Date.now()}`,
                                  url: result,
                                  uploadedAt: "Hoy · Desde dispositivo",
                                  isActive: true
                                };
                                const updated = mediaSlots.map(s => {
                                  if (s.id === slot.id) {
                                    return {
                                      ...s,
                                      activeUrl: result,
                                      cloudHistory: [newEntry, ...s.cloudHistory.map(h => ({ ...h, isActive: false }))]
                                    };
                                  }
                                  return s;
                                });
                                setMediaSlots(updated);
                                localStorage.setItem("samm_media_slots_v2", JSON.stringify(updated));
                                syncMediaToSite(slot.id, result);
                                triggerSaveToast(`Nueva foto subida y sincronizada en ${slot.slotName}`);
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      <div className="w-7 h-7 rounded-full bg-[#FAF6F2] group-hover:bg-[#7A3E48] group-hover:text-white text-[#7A3E48] flex items-center justify-center transition-colors mb-1">
                        <Plus className="w-4 h-4 stroke-[2.5]" />
                      </div>
                      <span className="text-[9px] uppercase font-bold tracking-wider text-[#7A3E48] leading-tight">
                        Subir +
                      </span>
                    </label>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </main>
      )}

      {/* ========================================================
          PESTAÑA 5: MOTOR DE TEMAS DINÁMICOS (ESTACIONES & EVENTOS LIMA, PERÚ)
          ======================================================== */}
      {activeTab === "temporada" && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full animate-fade-in space-y-10">
          
          {/* 1. CABECERA Y PANEL DE CONTROL DE MODO AUTOMÁTICO VS MANUAL */}
          <div className="bg-white border border-[#EFE2DC] rounded-3xl p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#EFE2DC]">
              <div className="max-w-2xl">
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#7A3E48] block mb-1">
                  SISTEMA DE TEMAS DINÁMICOS · LIMA, PERÚ
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#231C1A]">
                  Calendario de Estaciones & Eventos
                </h2>
                <p className="text-xs text-[#8d7e78] mt-1.5 leading-relaxed">
                  <strong>Regla de Prioridad Lógica:</strong> En modo automático, si la fecha actual de Lima cae dentro de una festividad (Prioridad Alta), se activa el tema del evento. Si no hay fiesta activa, se aplica el tema de la estación correspondiente al hemisferio sur (Prioridad Base).
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={handleSetAutoSeasonMode}
                  className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    themeMode === "auto"
                      ? "bg-emerald-600 text-white shadow-md"
                      : "bg-[#FAF6F2] text-[#231C1A] border border-[#EFE2DC] hover:border-[#7A3E48]"
                  }`}
                >
                  <Wand2 className="w-4 h-4" />
                  <span>
                    {themeMode === "auto" ? "Modo Automático Lima: ACTIVO" : "Volver a Modo Automático Lima"}
                  </span>
                </button>
              </div>
            </div>

            {/* Resumen en Vivo del Diagnóstico de Fecha Actual en Lima */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE3DA]">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#8d7e78] block">
                  Estación Astronómica Hoy (Base)
                </span>
                <span className="font-serif text-lg font-bold text-[#231C1A] mt-0.5 block">
                  {autoInfo.baseSeason.name}
                </span>
                <span className="text-[11px] text-[#7A6B62] block mt-0.5">
                  {autoInfo.baseSeason.dateRangeLabel}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE3DA]">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#7A3E48] block">
                  Festividad Detectada Hoy (Prioridad 1)
                </span>
                <span className="font-serif text-lg font-bold text-[#231C1A] mt-0.5 block">
                  {autoInfo.activeEvent ? autoInfo.activeEvent.name : "Ninguna festividad hoy"}
                </span>
                <span className="text-[11px] text-[#7A6B62] block mt-0.5">
                  {autoInfo.activeEvent ? autoInfo.activeEvent.dateRangeLabel : "Se aplica la estación base"}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-800">
                    Tema Mostrado Ahora en Web ({themeMode === "auto" ? "Automático" : "Forzado Manual"})
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <span className="font-serif text-lg font-bold text-emerald-950 mt-0.5 block">
                  {activeTheme.name}
                </span>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-3.5 h-3.5 rounded-full border border-black/20" style={{ backgroundColor: activeTheme.colors.primary }} />
                  <span className="w-3.5 h-3.5 rounded-full border border-black/20" style={{ backgroundColor: activeTheme.colors.bg }} />
                  <span className="w-3.5 h-3.5 rounded-full border border-black/20" style={{ backgroundColor: activeTheme.colors.accent }} />
                  <span className="w-3.5 h-3.5 rounded-full border border-black/20" style={{ backgroundColor: activeTheme.colors.dark }} />
                  <span className="text-[10px] text-emerald-800 font-semibold ml-1">Paleta aplicada en vivo</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. SECCIÓN BASE: LAS 4 ESTACIONES EN LIMA */}
          <div>
            <div className="mb-5">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#7A3E48] block">
                PRIORIDAD BASE · HEMISFERIO SUR
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#231C1A]">
                1. Las 4 Estaciones en Lima (Temas Base)
              </h3>
              <p className="text-xs text-[#8d7e78]">
                Se activan automáticamente cuando no hay una festividad específica en curso, o puedes previsualizarlas con un clic.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {LIMA_SEASONS.map(season => {
                const isSelected = activeTheme.id === season.id;
                const isCalendarCurrent = autoInfo.baseSeason.id === season.id;
                const SeasonIcon =
                  season.id === "estacion-verano" ? Sun :
                  season.id === "estacion-otono" ? Leaf :
                  season.id === "estacion-invierno" ? CloudSnow : Flower2;

                return (
                  <div
                    key={season.id}
                    className={`p-6 rounded-3xl border transition-all flex flex-col justify-between ${
                      isSelected
                        ? "bg-white border-[#7A3E48] shadow-md ring-2 ring-[#7A3E48]/20"
                        : "bg-white/80 border-[#EFE2DC] hover:bg-white hover:border-[#C8927B]"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-2xs"
                            style={{ backgroundColor: season.colors.primary }}
                          >
                            <SeasonIcon className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold tracking-widest text-[#7A3E48] block">
                              {season.dateRangeLabel}
                            </span>
                            {isCalendarCurrent && (
                              <span className="text-[9px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full inline-block mt-0.5">
                                Estación Actual en Lima
                              </span>
                            )}
                          </div>
                        </div>

                        {isSelected && (
                          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1 shrink-0">
                            <CheckCheck className="w-3.5 h-3.5 text-emerald-600" /> En Vivo
                          </span>
                        )}
                      </div>

                      <h4 className="font-serif text-2xl font-bold text-[#231C1A] mb-1.5">
                        {season.name}
                      </h4>
                      <p className="text-xs text-[#7A6B62] leading-relaxed mb-4">
                        {season.climateVibe}
                      </p>

                      {/* Diseños que destacan */}
                      <div className="mb-4">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8d7e78] block mb-1.5">
                          Diseños de uñas destacados:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {season.featuredDesigns.map((d, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] px-2.5 py-1 rounded-full bg-[#FAF6F2] border border-[#EAE3DA] text-[#231C1A] font-medium"
                            >
                              {d}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Paleta de Colores */}
                      <div className="mb-5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8d7e78] block mb-1.5">
                          Paleta Web:
                        </span>
                        <div className="flex items-center gap-2 flex-wrap">
                          {[
                            { label: "Primario", hex: season.colors.primary },
                            { label: "Fondo", hex: season.colors.bg },
                            { label: "Superficie", hex: season.colors.surface },
                            { label: "Acento", hex: season.colors.accent },
                            { label: "Texto", hex: season.colors.dark }
                          ].map((c, i) => (
                            <div key={i} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-[#EFE2DC]">
                              <span className="w-3.5 h-3.5 rounded-full border border-black/20" style={{ backgroundColor: c.hex }} />
                              <span className="text-[10px] font-medium text-[#231C1A]">{c.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#EFE2DC]">
                      {isSelected ? (
                        <button
                          disabled
                          className="w-full py-2.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center justify-center gap-2 border border-emerald-200"
                        >
                          <Check className="w-4 h-4" />
                          <span>Tema Aplicado Actualmente</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleSelectManualTheme(season.id)}
                          className="w-full py-2.5 rounded-xl bg-[#231C1A] hover:bg-[#7A3E48] text-white text-xs font-bold transition-all flex items-center justify-center gap-2"
                        >
                          <Palette className="w-4 h-4 text-[#C8927B]" />
                          <span>Aplicar / Previsualizar Estación</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. SECCIÓN PRIORIDAD ALTA: LOS 14 EVENTOS Y FIESTAS EN LIMA */}
          <div>
            <div className="mb-5">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#7A3E48] block">
                PRIORIDAD ALTA · MODO EVENTO (7 A 12 DÍAS ANTES)
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#231C1A]">
                2. Calendario de Fiestas y Eventos en Lima ({LIMA_EVENTS.length} Fechas Clave)
              </h3>
              <p className="text-xs text-[#8d7e78]">
                Cuando el calendario entra en el rango de cualquiera de estas festividades, toma prioridad automática sobre la estación base. También puedes activar cualquiera manualmente.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {LIMA_EVENTS.map(ev => {
                const isSelected = activeTheme.id === ev.id;
                const isCalendarEventToday = autoInfo.activeEvent?.id === ev.id;

                return (
                  <div
                    key={ev.id}
                    className={`p-5 rounded-3xl border transition-all flex flex-col justify-between ${
                      isSelected
                        ? "bg-white border-[#7A3E48] shadow-md ring-2 ring-[#7A3E48]/20"
                        : "bg-white/90 border-[#EFE2DC] hover:bg-white hover:border-[#C8927B]"
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-8 h-8 rounded-xl flex items-center justify-center text-white shrink-0 shadow-2xs"
                            style={{ backgroundColor: ev.colors.primary }}
                          >
                            <Gift className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold tracking-wider text-[#7A3E48] block">
                              {ev.dateRangeLabel}
                            </span>
                            {isCalendarEventToday && (
                              <span className="text-[9px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full inline-block mt-0.5">
                                En Rango de Fecha Hoy
                              </span>
                            )}
                          </div>
                        </div>

                        {isSelected && (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full shrink-0">
                            Activo
                          </span>
                        )}
                      </div>

                      <h4 className="font-serif text-xl font-bold text-[#231C1A] mb-1">
                        {ev.name}
                      </h4>
                      <p className="text-[11px] text-[#7A6B62] leading-relaxed mb-3">
                        {ev.climateVibe}
                      </p>

                      {/* Diseños del Evento */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {ev.featuredDesigns.map((d, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-2 py-0.5 rounded-full bg-[#FAF6F2] border border-[#EAE3DA] text-[#231C1A]"
                          >
                            {d}
                          </span>
                        ))}
                      </div>

                      {/* Muestrario rápido de colores */}
                      <div className="flex items-center gap-1.5 mb-4">
                        <span className="text-[10px] text-[#8d7e78] font-bold mr-1">Colores:</span>
                        <span className="w-4 h-4 rounded-full border border-black/20" style={{ backgroundColor: ev.colors.primary }} title="Primario" />
                        <span className="w-4 h-4 rounded-full border border-black/20" style={{ backgroundColor: ev.colors.bg }} title="Fondo" />
                        <span className="w-4 h-4 rounded-full border border-black/20" style={{ backgroundColor: ev.colors.surface }} title="Superficie" />
                        <span className="w-4 h-4 rounded-full border border-black/20" style={{ backgroundColor: ev.colors.accent }} title="Acento" />
                        <span className="w-4 h-4 rounded-full border border-black/20" style={{ backgroundColor: ev.colors.dark }} title="Oscuro" />
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#EFE2DC]">
                      {isSelected ? (
                        <button
                          disabled
                          className="w-full py-2 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center justify-center gap-1.5 border border-emerald-200"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Evento Activo en Web</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleSelectManualTheme(ev.id)}
                          className="w-full py-2 rounded-xl bg-[#FAF6F2] hover:bg-[#231C1A] text-[#231C1A] hover:text-white border border-[#EFE2DC] text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                        >
                          <Palette className="w-3.5 h-3.5 text-[#C8927B]" />
                          <span>Activar modo evento</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </main>
      )}

    </div>
  );
}
