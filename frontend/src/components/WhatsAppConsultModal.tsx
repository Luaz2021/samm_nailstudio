"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { 
  X, 
  MessageCircle, 
  ExternalLink, 
  Copy, 
  Check, 
  QrCode, 
  Clock, 
  Sparkles,
  Smartphone
} from "lucide-react";
import { 
  getStoredWhatsAppPhone, 
  getStoredWhatsAppMessage, 
  formatWhatsAppPhone, 
  getWhatsAppDirectUrl, 
  getWhatsAppWebUrl 
} from "@/lib/whatsapp";

interface WhatsAppConsultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WhatsAppConsultModal({ isOpen, onClose }: WhatsAppConsultModalProps) {
  const [phone, setPhone] = useState<string>(getStoredWhatsAppPhone());
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(true);

  // Escuchar cambios de número dinámicos desde el Admin o storage
  useEffect(() => {
    const updatePhone = () => {
      setPhone(getStoredWhatsAppPhone());
    };
    window.addEventListener("storage", updatePhone);
    window.addEventListener("samm-whatsapp-change", updatePhone);
    return () => {
      window.removeEventListener("storage", updatePhone);
      window.removeEventListener("samm-whatsapp-change", updatePhone);
    };
  }, []);

  // Generar el código QR cada vez que se abre el modal o cambia el número
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    setIsGenerating(true);

    const directUrl = getWhatsAppDirectUrl(phone);

    QRCode.toDataURL(directUrl, {
      width: 360,
      margin: 1.5,
      color: {
        dark: "#2C2420", // Tono café oscuro característico de Samm
        light: "#FFFFFF"
      },
      errorCorrectionLevel: "M"
    })
      .then((url) => {
        if (isMounted) {
          setQrDataUrl(url);
          setIsGenerating(false);
        }
      })
      .catch((err) => {
        console.error("Error generando QR:", err);
        if (isMounted) setIsGenerating(false);
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen, phone]);

  // Cerrar con tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const directUrl = getWhatsAppDirectUrl(phone);
  const webUrl = getWhatsAppWebUrl(phone);
  const formattedPhone = formatWhatsAppPhone(phone);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="consult-modal-title"
    >
      <div 
        className="relative w-full max-w-md bg-[#FAF8F5] rounded-3xl border border-[#EAE3DA] shadow-2xl overflow-hidden transition-all transform scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera Editorial */}
        <div className="relative px-6 pt-6 pb-4 bg-linear-to-b from-white to-[#FAF8F5] border-b border-[#EAE3DA]/80">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F2ECE4] hover:bg-[#EAE3DA] text-[#6C5F57] hover:text-[#2C2420] flex items-center justify-center transition-all cursor-pointer"
            aria-label="Cerrar ventana de consulta"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <span 
              className="text-xl font-light text-[#2C2420] leading-none"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              samm.
            </span>
            <span 
              className="text-[9px] uppercase tracking-[0.22em] font-bold px-2 py-0.5 rounded-full bg-[#9E5742]/10"
              style={{ color: "var(--rosewood-chrome, #9E5742)" }}
            >
              Canal de Consulta
            </span>
          </div>

          <h3 id="consult-modal-title" className="text-base font-semibold text-[#2C2420]">
            Atención Directa por WhatsApp
          </h3>
          <p className="text-xs text-[#7A6B62] mt-0.5 leading-relaxed">
            Escanea el código con la cámara de tu teléfono o conéctate al instante desde tu computadora.
          </p>
        </div>

        {/* Cuerpo del Modal: QR Code de Lujo */}
        <div className="p-6 flex flex-col items-center">
          
          {/* Tarjeta del Código QR */}
          <div className="relative p-4 bg-white rounded-2xl border border-[#E8DFD5] shadow-sm flex flex-col items-center justify-center">
            {/* Marco decorativo de esquinas estilo cámara */}
            <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-[#9E5742] rounded-tl-sm pointer-events-none" />
            <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-[#9E5742] rounded-tr-sm pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-[#9E5742] rounded-bl-sm pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-[#9E5742] rounded-br-sm pointer-events-none" />

            {isGenerating || !qrDataUrl ? (
              <div className="w-52 h-52 flex flex-col items-center justify-center gap-2 text-[#8D7E78]">
                <QrCode className="w-10 h-10 animate-pulse text-[#9E5742]" />
                <span className="text-xs font-medium">Generando código QR...</span>
              </div>
            ) : (
              <div className="relative group">
                <img 
                  src={qrDataUrl} 
                  alt={`Código QR para WhatsApp de Samm Nail Studio (${formattedPhone})`}
                  className="w-52 h-52 rounded-xl object-contain"
                />
                {/* Micro-icono central de WhatsApp */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-10 h-10 rounded-full bg-white shadow-md border border-[#EAE3DA] flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-[#25D366] fill-[#25D366]" />
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-1.5 mt-3 text-[#7A6B62] text-[11px] font-medium">
              <Smartphone className="w-3.5 h-3.5 text-[#9E5742]" />
              <span>Apunta la cámara de tu celular</span>
            </div>
          </div>

          {/* Chip informativo con el número y botón para copiar */}
          <div className="mt-4 flex items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-[#F2ECE4] border border-[#E5DDD2] text-xs">
            <span className="text-[#6C5F57]">Línea activa:</span>
            <span className="font-semibold text-[#2C2420]">{formattedPhone}</span>
            <button
              onClick={handleCopyPhone}
              className="ml-1 text-[#9E5742] hover:text-[#7A3E48] transition-colors p-0.5 rounded cursor-pointer"
              title="Copiar número"
              aria-label="Copiar número de WhatsApp"
            >
              {copied ? (
                <span className="inline-flex items-center gap-0.5 text-emerald-700 font-bold text-[10px]">
                  <Check className="w-3 h-3" /> Copiado
                </span>
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* Botón Principal Solicitado: Clic aquí mediante WhatsApp Web */}
          <div className="w-full mt-5 space-y-2.5">
            <a
              href={webUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2.5 px-5 py-3 rounded-2xl text-white font-semibold text-xs tracking-wide transition-all shadow-md hover:shadow-lg hover:opacity-95 group"
              style={{ backgroundColor: "var(--rosewood-chrome, #9E5742)" }}
            >
              <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366] group-hover:scale-110 transition-transform" />
              <span>Clic aquí mediante WhatsApp Web</span>
              <ExternalLink className="w-3.5 h-3.5 text-white/80 ml-auto" />
            </a>

            {/* Alternativa móvil para abrir la App directa de WhatsApp */}
            <a
              href={directUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#E2D8CE] hover:border-[#9E5742] text-[11px] font-medium text-[#4A3E38] hover:text-[#2C2420] transition-all"
            >
              <span>Abrir directamente en la app de WhatsApp</span>
            </a>
          </div>

        </div>

        {/* Pie del modal con horarios y atención */}
        <div className="px-6 py-3 bg-[#F2ECE4]/70 border-t border-[#EAE3DA] flex items-center justify-between text-[11px] text-[#7A6B62]">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#9E5742]" />
            <span>Lun a Sáb · 9:00 AM – 7:30 PM</span>
          </div>
          <div className="flex items-center gap-1 text-[#2C2420] font-medium">
            <Sparkles className="w-3 h-3 text-[#C8927B]" />
            <span>Samm Studio Lima</span>
          </div>
        </div>

      </div>
    </div>
  );
}
