"use client";

import { useEffect, useState } from "react";
import { NavbarOlive, NavTab } from "@/components/NavbarOlive";
import { HeroCinematic } from "@/components/HeroCinematic";
import { TrustBadgesBar } from "@/components/TrustBadgesBar";
import { ServicesBento } from "@/components/ServicesBento";
import { LookbookBlogSection } from "@/components/LookbookBlogSection";
import { EditorialFooter } from "@/components/EditorialFooter";
import { BookingDrawer, SelectedExtra, SelectedService } from "@/components/BookingDrawer";
import { PromoPopup } from "@/components/PromoPopup";
import { SalonGuidelines } from "@/components/SalonGuidelines";
import { TermsModal } from "@/components/TermsModal";
import { HomeShowcase } from "@/components/HomeShowcase";
import { HomeCareMaintenance } from "@/components/HomeCareMaintenance";
import { CinematicVideoShowcase } from "@/components/CinematicVideoShowcase";
import { GalleryCarousel } from "@/components/GalleryCarousel";
import { AboutUsSection } from "@/components/AboutUsSection";
import {
  DEFAULT_SERVICES,
  DEFAULT_EXTRAS,
  ServiceItem,
  ExtraItem,
  getActiveLimaThemeState,
  applySeasonTheme,
  LimaTheme
} from "@/data/catalog";
import { Sparkles } from "lucide-react";

export default function HomePage() {
  // Pestañas Principales en la Navbar ("inicio" | "tratamientos" | "guia")
  const [activeTab, setActiveTab] = useState<NavTab>("inicio");
  const [services, setServices] = useState<ServiceItem[]>(DEFAULT_SERVICES);
  const [availableExtras, setAvailableExtras] = useState<ExtraItem[]>(DEFAULT_EXTRAS);
  const [activeTheme, setActiveTheme] = useState<LimaTheme>(() => getActiveLimaThemeState().activeTheme);

  // Sincronización en tiempo real con el panel Admin (Servicios, Extras y Tema de Temporada Lima)
  useEffect(() => {
    try {
      const syncAll = () => {
        const storedServices = localStorage.getItem("samm_services_data");
        if (storedServices) {
          setServices(JSON.parse(storedServices));
        }

        const storedExtras = localStorage.getItem("samm_extras_data");
        if (storedExtras) {
          setAvailableExtras(JSON.parse(storedExtras));
        }

        const themeState = getActiveLimaThemeState();
        setActiveTheme(themeState.activeTheme);
        applySeasonTheme(themeState.activeTheme.colors);
      };

      syncAll();
      window.addEventListener("storage", syncAll);
      window.addEventListener("samm-theme-change", syncAll);
      return () => {
        window.removeEventListener("storage", syncAll);
        window.removeEventListener("samm-theme-change", syncAll);
      };
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Estado de Selección de Cita (Olive & June Drawer)
  const [selectedService, setSelectedService] = useState<SelectedService | null>(DEFAULT_SERVICES[0]);
  const [selectedExtras, setSelectedExtras] = useState<SelectedExtra[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  
  // Datos de Reserva
  const [selectedDate, setSelectedDate] = useState("2026-10-27");
  const [selectedTime, setSelectedTime] = useState("11:30");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  // Manejadores
  const handleSelectService = (service: ServiceItem) => {
    setSelectedService(service);
    setIsDrawerOpen(true);
  };

  const handleToggleExtra = (extra: ExtraItem) => {
    const exists = selectedExtras.some((e) => e.id === extra.id);
    if (exists) {
      setSelectedExtras(selectedExtras.filter((e) => e.id !== extra.id));
    } else {
      setSelectedExtras([...selectedExtras, extra]);
    }
  };

  const handleRemoveExtra = (id: string) => {
    setSelectedExtras(selectedExtras.filter((e) => e.id !== id));
  };

  const handleClaimPromo = (code: string) => {
    setDiscountCode(code);
    setIsDrawerOpen(true);
  };

  const handleExploreCatalog = () => {
    setActiveTab("tratamientos");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleConfirmWhatsApp = () => {
    if (!selectedService || !clientName || !clientPhone) return;

    const basePrice = selectedService.price;
    const extrasPrice = selectedExtras.reduce((acc, curr) => acc + curr.price, 0);
    const subtotal = basePrice + extrasPrice;
    const discount = discountCode === "SAMM15" ? Math.round(subtotal * 0.15) : 0;
    const total = subtotal - discount;
    const deposit = Math.round(total * 0.2);
    const remaining = total - deposit;
    const totalDuration = selectedService.duration + selectedExtras.reduce((acc, curr) => acc + curr.duration, 0);

    const extrasFormatted = selectedExtras.length > 0 
      ? selectedExtras.map(e => `   • ${e.name} (+S/ ${e.price} · ${e.duration} min)`).join("\n")
      : "   • Ninguno seleccionado";

    const msgLines = [
      `¡Hola Samm Nail Studio! ✨ Quiero coordinar mi cita con los siguientes detalles:`,
      ``,
      `👤 *Clienta:* ${clientName}`,
      `📱 *WhatsApp:* ${clientPhone}`,
      ``,
      `💅 *Tratamiento Base:* ${selectedService.name}`,
      `   • Precio base: S/ ${selectedService.price}`,
      `   • Duración: ${selectedService.duration} min`,
      ``,
      `✨ *Extras & Complementos:*`,
      `${extrasFormatted}`,
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
    window.open(`https://wa.me/51959716984?text=${encodedMsg}`, "_blank");
  };

  const cartCount = (selectedService ? 1 : 0) + selectedExtras.length;

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

      {/* Zona 1: Navbar con 3 pestañas ("Inicio", "Servicios" y "Sobre Nosotros") + Carrito */}
      <NavbarOlive 
        activeTab={activeTab}
        onChangeTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        cartCount={cartCount} 
        onOpenDrawer={() => setIsDrawerOpen(true)} 
      />

      {/* VISTA 1: INICIO (Home) */}
      {activeTab === "inicio" && (
        <main className="animate-fade-in flex flex-col">
          {/* 1. Hero Cinematográfico Dinámico con Tema de Temporada */}
          <HeroCinematic 
            onOpenBooking={() => setIsDrawerOpen(true)}
            onExploreCatalog={handleExploreCatalog}
          />

          {/* 2. Barra de Confianza & Logos de Alta Gama */}
          <TrustBadgesBar />

          {/* 3. Vitrina de Especialidades (Filosofía de Cabina) */}
          <HomeShowcase 
            onGoToCatalog={() => {
              setActiveTab("tratamientos");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />

          {/* 4. Simulador Interactivo de Color & Estructura */}
          <CinematicVideoShowcase onOpenBooking={() => setIsDrawerOpen(true)} />

          {/* 5. Lookbook de Temporada & Artículos de Cuidado */}
          <LookbookBlogSection />
        </main>
      )}

      {/* VISTA 2: SERVICIOS (Catálogo Completo, Selección y Galería de Resultados) */}
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
              Selecciona tu tratamiento para ver los detalles, personalizar extras y agendar tu turno.
            </p>

            {/* Banner sutil de Diseños Destacados de la Temporada/Evento actual en Lima */}
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
            selectedServiceId={selectedService?.id || null}
            onSelectService={handleSelectService}
          />

          {/* Galería de Resultados en Cabina (Al final de la página de Servicios) */}
          <div className="mt-8">
            <GalleryCarousel />
          </div>
        </main>
      )}

      {/* VISTA 3: SOBRE NOSOTROS (Nosotros) */}
      {activeTab === "guia" && (
        <main className="animate-fade-in flex flex-col">
          <AboutUsSection 
            onOpenBooking={() => setIsDrawerOpen(true)}
            onExploreServices={() => {
              setActiveTab("tratamientos");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
          <SalonGuidelines onOpenBooking={() => setIsDrawerOpen(true)} />
          <HomeCareMaintenance onOpenBooking={() => setIsDrawerOpen(true)} />
        </main>
      )}

      {/* Zona 7: Footer Estructurado de 4 Columnas */}
      <EditorialFooter onOpenTerms={() => setIsTermsOpen(true)} />

      {/* Modal de Términos, Condiciones y Políticas de Cancelación */}
      <TermsModal 
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
      />

      {/* Modal de Cita Sobrepuesto (Configuración Completa: Extras + Agenda + Resumen) */}
      <BookingDrawer 
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        service={selectedService}
        extras={selectedExtras}
        allAvailableExtras={availableExtras}
        onToggleExtra={handleToggleExtra}
        onRemoveExtra={handleRemoveExtra}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        selectedTime={selectedTime}
        onSelectTime={setSelectedTime}
        discountCode={discountCode}
        clientName={clientName}
        setClientName={setClientName}
        clientPhone={clientPhone}
        setClientPhone={setClientPhone}
        onConfirmWhatsApp={handleConfirmWhatsApp}
        onOpenTerms={() => setIsTermsOpen(true)}
        onBackToHome={() => {
          setActiveTab("inicio");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />

    </div>
  );
}
