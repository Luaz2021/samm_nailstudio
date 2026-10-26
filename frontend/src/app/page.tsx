"use client";

import { useState } from "react";
import { NavbarOlive, NavTab } from "@/components/NavbarOlive";
import { HeroCinematic } from "@/components/HeroCinematic";
import { TrustBadgesBar } from "@/components/TrustBadgesBar";
import { ServicesBento, ServiceItem } from "@/components/ServicesBento";
import { ExtrasSection, ExtraItem } from "@/components/ExtrasSection";
import { MotionNailsShowcase } from "@/components/MotionNailsShowcase";
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

// Catálogo curado en Soles peruanos (S/) con fotografías de alta resolución
const SERVICES_DATA: ServiceItem[] = [
  {
    id: "kapping-rubber",
    name: "Kapping Gel & Rubber Base Fortalecedor",
    category: "manicura",
    price: 70,
    duration: 120, // 2 horas cerrado
    desc: "Capa protectora flexible de base Rubber sobre la uña natural para frenar roturas, estrías y permitir que crezca sana sin necesidad de tips. Incluye manicura anatómica y esmaltado nivelado.",
    tag: "Salud Ungueal",
    imgUrl: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "manicura-rusa-semi",
    name: "Manicura Rusa Combinada & Semipermanente",
    category: "manicura",
    price: 60,
    duration: 120, // 2 horas cerrado
    desc: "Limpieza anatómica profunda de cutícula con fresas de diamante alemanas y esmaltado bajo cutícula de máxima precisión para alargar el crecimiento impecable por más de 3 semanas.",
    tag: "Más Solicitado",
    imgUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "soft-gel-tips",
    name: "Extensiones Soft Gel & Full Cover Tips",
    category: "acrilico",
    price: 110,
    duration: 150, // 2h 30m
    desc: "Extensiones ligeras de gel premoldeado que se adhieren con base rubber sin dañar tu lecho ungueal. Resultado natural, resistente al agua y sin limados agresivos.",
    tag: "Largo & Estructura",
    imgUrl: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "spa-pedicura-rusa",
    name: "Pedicura Rusa Anatómica & Spa Jelly",
    category: "pedicura",
    price: 85,
    duration: 120, // 2 horas cerrado
    desc: "Tratamiento podo-estético intensivo. Retiro de durezas con disco podológico, exfoliación aromática, hidratación profunda y esmaltado semipermanente de larga duración.",
    tag: "Bienestar",
    imgUrl: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "reforzamiento-biab",
    name: "BIAB Builder in a Bottle & Reparación",
    category: "manicura",
    price: 80,
    duration: 120,
    desc: "Gel constructor en botella de alta viscosidad para corregir uñas mordidas, curvadas hacia abajo o dañadas tras acrílicos anteriores.",
    tag: "Tratamiento",
    imgUrl: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "polygel-esculpido",
    name: "Esculpido Dual Polygel de Precisión",
    category: "acrilico",
    price: 130,
    duration: 160,
    desc: "La combinación perfecta entre acrílico y gel: fuerza extrema sin olor a monómero y máxima ligereza en tus manos.",
    tag: "Alta Resistencia",
    imgUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80"
  }
];

const EXTRAS_DATA: ExtraItem[] = [
  {
    id: "retiro-acrilico-otro",
    name: "Retiro Seguro de Acrílico/Gel Ajeno",
    price: 25,
    duration: 30,
    desc: "Remoción con torno médico sin limar tu uña natural para comenzar desde cero."
  },
  {
    id: "nailart-minimal-mano",
    name: "Nail Art Minimalista a Mano Alzada",
    price: 20,
    duration: 30,
    desc: "Líneas fineline, flores sutiles, micro-puntos o efecto aura en 2 a 4 uñas."
  },
  {
    id: "efecto-cromo-glaze",
    name: "Efecto Glazed Donut / Cromo Perlado",
    price: 15,
    duration: 15,
    desc: "Micropolvo de destellos iridiscentes sellado al horno en set completo."
  },
  {
    id: "french-inverso-micro",
    name: "Micro-Francesa Editorial o Reversa",
    price: 20,
    duration: 25,
    desc: "Línea de sonrisa ultrafina de alta precisión geométrica."
  }
];

export default function HomePage() {
  // Pestañas Principales en la Navbar ("inicio" | "tratamientos" | "guia")
  const [activeTab, setActiveTab] = useState<NavTab>("inicio");

  // Estado de Selección de Cita (Olive & June Drawer)
  const [selectedService, setSelectedService] = useState<SelectedService | null>(SERVICES_DATA[0]);
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
    setIsDrawerOpen(true); // Abre suavemente el resumen lateral estilo Olive & June
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
    <div className="min-h-screen bg-[#FBF8F6] text-[#2C2420] flex flex-col selection:bg-[#EAD8CE] selection:text-[#2C2420]">
      
      {/* Zona 0: Pop-up Promocional de Apertura (-15% de Descuento) */}
      <PromoPopup onClaim={handleClaimPromo} />

      {/* Zona 1: Navbar con 2 pestañas ("Inicio" y "Uñas & Carta") + Carrito Sobrepuesto */}
      <NavbarOlive 
        activeTab={activeTab}
        onChangeTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        cartCount={cartCount} 
        onOpenDrawer={() => setIsDrawerOpen(true)} 
      />

      {/* VISTA 1: INICIO (Página de Portada Editorial, Limpia, Cero Formulario Clickeable) */}
      {activeTab === "inicio" && (
        <main className="animate-fade-in flex flex-col">
          {/* 1. Hero Cinematográfico con Video Loop estilo Nenha */}
          <HeroCinematic 
            onOpenBooking={() => setIsDrawerOpen(true)}
            onExploreCatalog={handleExploreCatalog}
          />

          {/* 2. Barra de Confianza & Logos de Alta Gama Estilo Paintbox EXACTO */}
          <TrustBadgesBar />

          {/* 3. Vitrina de Especialidades (Filosofía de Cabina, sin textos de restaurante) */}
          <HomeShowcase 
            onGoToCatalog={() => {
              setActiveTab("tratamientos");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />

          {/* 4. Carrusel de Galería de Trabajos Reales (Llena el espacio visual con alta estética) */}
          <GalleryCarousel />

          {/* 5. Reproductor de Video Cinematográfico Iframe de Alta Calidad */}
          <CinematicVideoShowcase />

          {/* 6. Lookbook de Temporada & Artículos de Cuidado */}
          <LookbookBlogSection />
        </main>
      )}

      {/* VISTA 2: UÑAS & CARTA (Catálogo Completo y Selección Limpia de Tratamiento) */}
      {activeTab === "tratamientos" && (
        <main className="animate-fade-in flex flex-col py-12">
          <div className="max-w-7xl mx-auto px-6 text-center mb-8">
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#9E5742]">
              Carta Detallada de Precios
            </span>
            <h1 
              className="text-4xl sm:text-5xl font-light text-[#2C2420] mt-2"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Uñas, Blindaje & Cuidado Anatómico
            </h1>
            <p className="text-xs sm:text-sm text-[#7A6B62] max-w-xl mx-auto mt-2">
              Selecciona tu tratamiento. Al hacer clic se abrirá tu cita sobrepuesta donde podrás personalizar tus extras y elegir tu turno.
            </p>
          </div>

          <ServicesBento 
            services={SERVICES_DATA}
            selectedServiceId={selectedService?.id || null}
            onSelectService={handleSelectService}
          />
        </main>
      )}

      {/* VISTA 3: PROTOCOLO & SALUD (Página Dedicada: Reglas de Cabina y Mantenimiento en Casa) */}
      {activeTab === "guia" && (
        <main className="animate-fade-in flex flex-col py-12">
          <div className="max-w-7xl mx-auto px-6 text-center mb-6">
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#9E5742]">
              Salud Ungueal & Mantenimiento
            </span>
            <h1 
              className="text-4xl sm:text-5xl font-light text-[#2C2420] mt-2"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Protocolo de Atelier & Cuidados
            </h1>
            <p className="text-xs sm:text-sm text-[#7A6B62] max-w-xl mx-auto mt-2">
              Todo lo que necesitas saber antes de venir a tu cita y cómo prolongar tu set por más de 3 semanas.
            </p>
          </div>

          <SalonGuidelines onOpenBooking={() => setIsDrawerOpen(true)} />
          <HomeCareMaintenance />
        </main>
      )}

      {/* Zona 7: Footer Estructurado de 4 Columnas */}
      <EditorialFooter onOpenTerms={() => setIsTermsOpen(true)} />

      {/* Modal de Términos, Condiciones y Políticas de Cancelación (4 horas / 20% seña) */}
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
        allAvailableExtras={EXTRAS_DATA}
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
