"use client";

import { useEffect, useState } from "react";
import { NavbarOlive, NavTab } from "@/components/NavbarOlive";
import { HeroCinematic } from "@/components/HeroCinematic";
import { TrustBadgesBar } from "@/components/TrustBadgesBar";
import { ServicesBento } from "@/components/ServicesBento";
import { LookbookBlogSection } from "@/components/LookbookBlogSection";
import { EditorialFooter } from "@/components/EditorialFooter";
import { BookingDrawer } from "@/components/BookingDrawer";
import { ServiceConfigModal } from "@/components/ServiceConfigModal";
import { PromoPopup } from "@/components/PromoPopup";
import { SalonGuidelines } from "@/components/SalonGuidelines";
import { TermsModal } from "@/components/TermsModal";
import { WhatsAppConsultModal } from "@/components/WhatsAppConsultModal";
import { getStoredWhatsAppPhone } from "@/lib/whatsapp";
import { createNewBooking, formatIsoDate } from "@/lib/bookings";
import { HomeShowcase } from "@/components/HomeShowcase";
import { HomeCareMaintenance } from "@/components/HomeCareMaintenance";
import { CinematicVideoShowcase } from "@/components/CinematicVideoShowcase";
import { HomeAvailabilityCalendar } from "@/components/HomeAvailabilityCalendar";
import { GalleryCarousel } from "@/components/GalleryCarousel";
import { AboutUsSection } from "@/components/AboutUsSection";
import { SectionScrollIndicator } from "@/components/SectionScrollIndicator";
import {
  DEFAULT_SERVICES,
  ServiceItem,
  CartItem,
  getActiveLimaThemeState,
  applySeasonTheme,
  LimaTheme
} from "@/data/catalog";
import { Sparkles, ArrowRight } from "lucide-react";

export default function HomePage() {
  // Pestañas Principales en la Navbar ("inicio" | "tratamientos" | "guia")
  const [activeTab, setActiveTab] = useState<NavTab>("inicio");
  const [services, setServices] = useState<ServiceItem[]>(DEFAULT_SERVICES);
  const [activeTheme, setActiveTheme] = useState<LimaTheme>(() => getActiveLimaThemeState().activeTheme);

  // Carrito Multitratamiento ("Mis Citas")
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartLoaded, setIsCartLoaded] = useState(false);
  const [serviceToConfigure, setServiceToConfigure] = useState<ServiceItem | null>(null);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [promoToast, setPromoToast] = useState<string | null>(null);
  
  // Datos de Reserva
  const [selectedDate, setSelectedDate] = useState<string>(() => formatIsoDate(new Date()));
  const [selectedTime, setSelectedTime] = useState("11:30");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);

  // 1. Cargar carrito, cupón y datos de cliente persistentes desde localStorage al iniciar
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("samm_cart_items");
      if (storedCart) {
        const parsed = JSON.parse(storedCart);
        if (Array.isArray(parsed)) setCartItems(parsed);
      }
      const storedDiscount = localStorage.getItem("samm_cart_discount");
      if (storedDiscount) setDiscountCode(storedDiscount);

      const storedClient = localStorage.getItem("samm_client_info");
      if (storedClient) {
        const { name, phone } = JSON.parse(storedClient);
        if (name) setClientName(name);
        if (phone) setClientPhone(phone);
      }
    } catch (e) {
      console.error("Error al cargar carrito persistente:", e);
    } finally {
      setIsCartLoaded(true);
    }
  }, []);

  // 2. Persistir carrito en cada actualización para no perderlo al recargar la web (F5)
  useEffect(() => {
    if (!isCartLoaded) return;
    try {
      localStorage.setItem("samm_cart_items", JSON.stringify(cartItems));
    } catch (e) {
      console.error("Error persistiendo carrito:", e);
    }
  }, [cartItems, isCartLoaded]);

  // 3. Persistir cupón de descuento activo
  useEffect(() => {
    if (!isCartLoaded) return;
    try {
      if (discountCode) {
        localStorage.setItem("samm_cart_discount", discountCode);
      } else {
        localStorage.removeItem("samm_cart_discount");
      }
    } catch (e) {
      console.error(e);
    }
  }, [discountCode, isCartLoaded]);

  // 4. Persistir datos de contacto del cliente
  useEffect(() => {
    if (!isCartLoaded) return;
    try {
      if (clientName || clientPhone) {
        localStorage.setItem("samm_client_info", JSON.stringify({ name: clientName, phone: clientPhone }));
      }
    } catch (e) {
      console.error(e);
    }
  }, [clientName, clientPhone, isCartLoaded]);

  // Sincronización en tiempo real con el panel Admin (Servicios y Tema de Temporada Lima)
  useEffect(() => {
    try {
      const syncAll = () => {
        const storedServices = localStorage.getItem("samm_services_data");
        if (storedServices) {
          setServices(JSON.parse(storedServices));
        }

        const themeState = getActiveLimaThemeState();
        setActiveTheme(themeState.activeTheme);
        applySeasonTheme(themeState.activeTheme.colors);
      };

      syncAll();
      const handleOpenConsult = () => setIsConsultModalOpen(true);
      window.addEventListener("storage", syncAll);
      window.addEventListener("samm-theme-change", syncAll);
      window.addEventListener("samm-open-consult-modal", handleOpenConsult);
      return () => {
        window.removeEventListener("storage", syncAll);
        window.removeEventListener("samm-theme-change", syncAll);
        window.removeEventListener("samm-open-consult-modal", handleOpenConsult);
      };
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Medición dinámica de la altura del navbar para cálculo de márgenes y scroll limpio
  useEffect(() => {
    const root = document.documentElement;
    const header = document.querySelector("header");
    const measure = () => {
      if (header) root.style.setProperty("--header-h", `${Math.round(header.getBoundingClientRect().height)}px`);
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (header) observer.observe(header);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Manejador: Selección de Servicio para Personalizar
  const handleSelectService = (service: ServiceItem) => {
    setServiceToConfigure(service);
    setIsConfigModalOpen(true);
  };

  // Manejador: Añadir Servicio al Carrito ("Mis Citas")
  const handleAddToCart = (item: CartItem) => {
    setCartItems((prev) => [...prev, item]);
    setPromoToast(`💅 ¡${item.name} añadido a tu cita! (S/ ${item.totalPrice})`);
    setTimeout(() => setPromoToast(null), 4000);
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((it) => it.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleClaimPromo = (code: string) => {
    setDiscountCode(code);
    setPromoToast(`Cupón ${code} aplicado (-15%). Se descontará en el total de tu cita.`);
    setTimeout(() => setPromoToast(null), 5000);
  };

  const handleExploreCatalog = () => {
    setActiveTab("tratamientos");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Manejador de Slot desde el Calendario de la Portada
  const handleSelectSlotFromHome = (date: string, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
    
    // Si el carrito está vacío, pre-cargamos el servicio más solicitado como base
    if (cartItems.length === 0) {
      const defaultSrv = services[0] || DEFAULT_SERVICES[0];
      const initialItem: CartItem = {
        id: `cart-auto-${Date.now()}`,
        serviceId: defaultSrv.id,
        name: defaultSrv.name,
        category: "manicura",
        basePrice: defaultSrv.price,
        baseDuration: defaultSrv.duration,
        imgUrl: defaultSrv.imgUrl,
        finish: "color_entero",
        length: { id: "len-1-3", name: "Largo #1, #2 o #3", price: 0 },
        shape: { id: "shape-classic", name: "Forma Clásica", price: 0 },
        effect: { id: "eff-none", name: "Sin efecto", price: 0, duration: 0 },
        designN1: 0,
        designN2: 0,
        designN3: 0,
        removal: { id: "rem-none", name: "Uñas limpias (Sin material previo)", price: 0, duration: 0 },
        totalPrice: defaultSrv.price,
        totalDuration: defaultSrv.duration,
      };
      setCartItems([initialItem]);
    }
    setIsDrawerOpen(true);
  };

  // Confirmación vía WhatsApp con desglose completo de todos los servicios del carrito
  const handleConfirmWhatsApp = () => {
    if (cartItems.length === 0 || !clientName || !clientPhone) return;

    const subtotal = cartItems.reduce((acc, curr) => acc + curr.totalPrice, 0);
    const discount = discountCode === "SAMM15" ? Math.round(subtotal * 0.15) : 0;
    const total = Math.max(0, subtotal - discount);
    const deposit = Math.round(total * 0.2);
    const remaining = total - deposit;
    const totalDuration = cartItems.reduce((acc, curr) => acc + curr.totalDuration, 0);

    const servicesFormatted = cartItems.map((item, idx) => {
      const details = [
        `• Acabado: ${item.finish === "color_entero" ? "Color Entero" : "Francesa Clásica"}`,
        item.length && `• Largo: ${item.length.name} ${item.length.price > 0 ? `(+S/ ${item.length.price})` : ""}`,
        item.shape && `• Punta: ${item.shape.name} ${item.shape.price > 0 ? `(+S/ ${item.shape.price})` : ""}`,
        item.effect && item.effect.price > 0 && `• Efecto: ${item.effect.name} (+S/ ${item.effect.price})`,
        (item.designN1 > 0 || item.designN2 > 0 || item.designN3 > 0) && `• Diseños: ${[
          item.designN1 > 0 && `${item.designN1} uña(s) Nivel 1`,
          item.designN2 > 0 && `${item.designN2} uña(s) Nivel 2`,
          item.designN3 > 0 && `${item.designN3} uña(s) Nivel 3`
        ].filter(Boolean).join(" · ")}`,
        item.reconstructedToes && item.reconstructedToes > 0 && `• Reconstrucción dedo: ${item.reconstructedToes} uña(s) (+S/ ${item.reconstructedToes * 10})`,
        item.pediEffect && `• Efecto Pies (+S/ 5)`,
        item.pediDesignToes && `• Diseño pulgares (+S/ 5)`,
        `• Retiro previo: ${item.removal.name} ${item.removal.price > 0 ? `(+S/ ${item.removal.price})` : "(S/ 0)"}`
      ].filter(Boolean).join("\n      ");

      return `💅 *${idx + 1}. ${item.name}* — S/ ${item.totalPrice} (${item.totalDuration} min)\n      ${details}`;
    }).join("\n\n");

    const msgLines = [
      `¡Hola Samm Nail Studio! ✨ Quiero coordinar mi cita con los siguientes detalles:`,
      ``,
      `👤 *Clienta:* ${clientName}`,
      `📱 *WhatsApp:* ${clientPhone}`,
      ``,
      `📋 *Servicios Solicitados (${cartItems.length}):*`,
      `${servicesFormatted}`,
      ``,
      `📅 *Fecha Solicitada:* ${selectedDate || "Por coordinar"}`,
      `⏰ *Horario sugerido:* ${selectedTime ? selectedTime + " hrs" : "Por coordinar"} (${totalDuration} min totales)`,
      ``,
      ...(discountCode ? [`🏷️ *Cupón Aplicado:* ${discountCode} (-S/ ${discount})`] : []),
      `💰 *Total Presupuesto:* S/ ${total}`,
      `🔒 *Adelanto Requerido (20% para asegurar turno):* S/ ${deposit}`,
      `💳 *Saldo a pagar en estudio (80%):* S/ ${remaining}`,
      ``,
      `¿Tienen disponibilidad en esa fecha para transferir el 20% de adelanto por Yape/Plin y confirmar mi turno? ¡Muchas gracias!`
    ];

    const encodedMsg = encodeURIComponent(msgLines.join("\n"));
    const targetPhone = getStoredWhatsAppPhone();

    // Registrar la reserva en el circuito unificado en memoria / localStorage para el Admin
    try {
      createNewBooking({
        clientName,
        clientPhone,
        service: cartItems.map((c) => c.name).join(", "),
        extras: cartItems.flatMap((c) => [
          c.finish === "francesa" ? "Francesa Clásica" : null,
          c.length?.price ? c.length.name : null,
          c.shape?.price ? c.shape.name : null,
          c.effect?.price ? c.effect.name : null,
          c.removal?.price ? c.removal.name : null,
        ].filter(Boolean) as string[]),
        date: selectedDate,
        timeSlot: selectedTime ? `${selectedTime} hrs` : "11:30 - 13:30",
        durationMinutes: totalDuration,
        totalPrice: total,
        deposit20: deposit,
        remaining80: remaining,
        receiptNote: discountCode ? `Cupón ${discountCode} (-S/ ${discount})` : "Emitido desde la web"
      });
    } catch (e) {
      console.error("Error registrando cita en memoria:", e);
    }

    window.open(`https://wa.me/${targetPhone}?text=${encodedMsg}`, "_blank");
  };

  const cartTotalCalculated = cartItems.reduce((acc, curr) => acc + curr.totalPrice, 0);
  const cartTotalWithDiscount = discountCode === "SAMM15" 
    ? Math.round(cartTotalCalculated * 0.85) 
    : cartTotalCalculated;

  return (
    <div
      className="min-h-screen flex flex-col selection:bg-[#EAD8CE] selection:text-[#2C2420] transition-colors duration-500"
      style={{
        backgroundColor: activeTheme.colors.bg,
        color: activeTheme.colors.dark
      }}
    >
      {/* Zona 0: Pop-up Promocional de Apertura (-15% de Descuento) */}
      <PromoPopup onClaim={handleClaimPromo} />

      {/* Zona 1: Navbar con Pestañas + Contador de Carrito */}
      <NavbarOlive 
        activeTab={activeTab}
        onChangeTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        cartCount={cartItems.length} 
        onOpenDrawer={() => setIsDrawerOpen(true)} 
        onOpenConsult={() => setIsConsultModalOpen(true)}
      />

      {/* VISTA 1: INICIO (Home) */}
      {activeTab === "inicio" && (
        <main className="animate-fade-in flex flex-col relative">
          {/* Navegación Flotante Lateral de Secciones */}
          <SectionScrollIndicator />

          {/* 1. Hero Cinematográfico Dinámico */}
          <HeroCinematic 
            onOpenBooking={() => setIsDrawerOpen(true)}
            onExploreCatalog={handleExploreCatalog}
          />

          {/* 2. Barra de Confianza & Logos de Alta Gama */}
          <TrustBadgesBar />

          {/* 3. Vitrina de Especialidades */}
          <HomeShowcase 
            onGoToCatalog={handleExploreCatalog}
          />

          {/* 4. Reels de Manos y Pies */}
          <CinematicVideoShowcase onOpenBooking={() => setIsDrawerOpen(true)} />

          {/* 5. Calendario Editorial de Disponibilidad en Cabina */}
          <HomeAvailabilityCalendar 
            onSelectSlot={handleSelectSlotFromHome}
            onExploreCatalog={handleExploreCatalog}
          />

          {/* 6. Lookbook de Temporada & Artículos de Cuidado */}
          <LookbookBlogSection />
        </main>
      )}

      {/* VISTA 2: SERVICIOS (Catálogo Separado con Personalizador y Galería) */}
      {activeTab === "tratamientos" && (
        <main className="animate-fade-in flex flex-col py-12">
          <div className="max-w-7xl mx-auto px-6 text-center mb-6">
            <span
              className="text-xs uppercase font-bold tracking-[0.25em]"
              style={{ color: activeTheme.colors.primary }}
            >
              Servicios & Especialidades
            </span>
            <h1 
              className="text-4xl sm:text-5xl font-light mt-2"
              style={{ fontFamily: "var(--font-serif)", color: activeTheme.colors.dark }}
            >
              Uñas, Blindaje & Cuidado Anatómico
            </h1>
            <p className="text-xs sm:text-sm text-[#7A6B62] max-w-xl mx-auto mt-2">
              Elige tu base de manos o pies, personaliza los largos, puntas y decoración, y añádelo a tu cita.
            </p>

            {/* Banner sutil de Diseños Destacados de la Temporada */}
            <div
              className="mt-6 inline-flex flex-wrap items-center justify-center gap-2 px-5 py-2.5 rounded-2xl border border-[#EAE3DA] shadow-2xs"
              style={{ backgroundColor: activeTheme.colors.surface }}
            >
              <span
                className="text-[10px] uppercase font-bold tracking-widest flex items-center gap-1.5 mr-1"
                style={{ color: activeTheme.colors.primary }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                {activeTheme.name}:
              </span>
              {activeTheme.featuredDesigns.map((d, idx) => (
                <span
                  key={idx}
                  className="text-[11px] px-2.5 py-0.5 rounded-full bg-white border border-[#EAE3DA] font-medium"
                  style={{ color: activeTheme.colors.dark }}
                >
                  {d}
                </span>
              ))}
            </div>
          </div>

          <ServicesBento 
            services={services}
            cartServiceIds={cartItems.map((c) => c.serviceId)}
            onSelectService={handleSelectService}
          />

          {/* Galería de Resultados en Cabina */}
          <div className="mt-8">
            <GalleryCarousel />
          </div>
        </main>
      )}

      {/* VISTA 3: SOBRE NOSOTROS */}
      {activeTab === "guia" && (
        <main className="animate-fade-in flex flex-col">
          <AboutUsSection 
            onOpenBooking={() => setIsDrawerOpen(true)}
            onExploreServices={handleExploreCatalog}
          />
          <SalonGuidelines onOpenBooking={() => setIsDrawerOpen(true)} />
          <HomeCareMaintenance onOpenBooking={() => setIsDrawerOpen(true)} />
        </main>
      )}

      {/* Zona 7: Footer */}
      <EditorialFooter 
        onOpenTerms={() => setIsTermsOpen(true)} 
        onOpenConsult={() => setIsConsultModalOpen(true)}
      />

      {/* Modal de Consulta y Código QR WhatsApp */}
      <WhatsAppConsultModal
        isOpen={isConsultModalOpen}
        onClose={() => setIsConsultModalOpen(false)}
      />

      {/* Modal de Términos, Condiciones y Políticas de Cancelación */}
      <TermsModal 
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
      />

      {/* Modal Configurador Interactivo de Servicio (Manos y Pies) */}
      <ServiceConfigModal
        isOpen={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
        service={serviceToConfigure}
        onAddToCart={handleAddToCart}
      />

      {/* Modal de Cita Sobrepuesto (Carrito a la Izquierda | Fecha y Contacto a la Derecha) */}
      <BookingDrawer 
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        selectedTime={selectedTime}
        onSelectTime={setSelectedTime}
        discountCode={discountCode}
        onApplyDiscount={(code) => setDiscountCode(code)}
        clientName={clientName}
        setClientName={setClientName}
        clientPhone={clientPhone}
        setClientPhone={setClientPhone}
        onConfirmWhatsApp={handleConfirmWhatsApp}
        onAddMoreServices={() => {
          setIsDrawerOpen(false);
          setActiveTab("tratamientos");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onOpenTerms={() => setIsTermsOpen(true)}
        onBackToHome={() => {
          setActiveTab("inicio");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />

      {/* Barra Flotante Sticky de Cita cuando hay servicios en el carrito */}
      {cartItems.length > 0 && !isDrawerOpen && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-md bg-[#2C2420]/95 backdrop-blur-md text-white px-4 sm:px-5 py-3 rounded-2xl shadow-2xl border border-[#C8927B]/30 flex items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#9E5742] text-white flex items-center justify-center font-bold text-xs shrink-0">
              {cartItems.length}
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#EAD8CE] block">
                {cartItems.length === 1 ? "1 Servicio en tu cita" : `${cartItems.length} Servicios en tu cita`}
              </span>
              <span className="text-sm font-bold text-white">
                Total: S/ {cartTotalWithDiscount}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsDrawerOpen(true)}
            className="px-4 py-2 rounded-xl bg-[#9E5742] hover:bg-[#B3644D] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm shrink-0"
          >
            <span>Ver Mi Cita</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Notificación Flotante de Descuento Promocional o Agregado */}
      {promoToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2C2420] text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#C8927B]/30 animate-fade-in text-xs font-medium">
          <Sparkles className="w-4 h-4 text-[#C8927B] shrink-0" />
          <span>{promoToast}</span>
        </div>
      )}

    </div>
  );
}
