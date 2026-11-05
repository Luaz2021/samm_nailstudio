"use client";

export const DEFAULT_WHATSAPP_PHONE = "51959716984";
export const DEFAULT_WHATSAPP_MSG = "Hola Samm, tengo una consulta sobre sus servicios y disponibilidad de citas.";
export const WHATSAPP_STORAGE_KEY = "samm_whatsapp_phone";
export const WHATSAPP_MSG_STORAGE_KEY = "samm_whatsapp_msg";

/**
 * Limpia y normaliza el número a solo dígitos con código de país.
 * Si Alexander ingresa 9 dígitos (ej. 959716984), le antepone el 51 de Perú.
 */
export function sanitizeWhatsAppPhone(rawPhone: string): string {
  const digits = rawPhone.replace(/\D/g, "");
  if (!digits) return DEFAULT_WHATSAPP_PHONE;
  if (digits.length === 9) {
    return `51${digits}`;
  }
  return digits;
}

/**
 * Formatea el número para visualización elegante (ej. +51 959 716 984)
 */
export function formatWhatsAppPhone(phone: string): string {
  const clean = sanitizeWhatsAppPhone(phone);
  if (clean.startsWith("51") && clean.length === 11) {
    return `+51 ${clean.slice(2, 5)} ${clean.slice(5, 8)} ${clean.slice(8)}`;
  }
  if (clean.length > 4) {
    return `+${clean.slice(0, 2)} ${clean.slice(2)}`;
  }
  return `+${clean}`;
}

export function getStoredWhatsAppPhone(): string {
  if (typeof window === "undefined") return DEFAULT_WHATSAPP_PHONE;
  try {
    const val = localStorage.getItem(WHATSAPP_STORAGE_KEY);
    return val ? sanitizeWhatsAppPhone(val) : DEFAULT_WHATSAPP_PHONE;
  } catch {
    return DEFAULT_WHATSAPP_PHONE;
  }
}

export function getStoredWhatsAppMessage(): string {
  if (typeof window === "undefined") return DEFAULT_WHATSAPP_MSG;
  try {
    const val = localStorage.getItem(WHATSAPP_MSG_STORAGE_KEY);
    return val || DEFAULT_WHATSAPP_MSG;
  } catch {
    return DEFAULT_WHATSAPP_MSG;
  }
}

export function saveWhatsAppConfig(phone: string, message?: string): void {
  if (typeof window === "undefined") return;
  const cleanPhone = sanitizeWhatsAppPhone(phone);
  localStorage.setItem(WHATSAPP_STORAGE_KEY, cleanPhone);
  if (message !== undefined) {
    localStorage.setItem(WHATSAPP_MSG_STORAGE_KEY, message.trim() || DEFAULT_WHATSAPP_MSG);
  }
  window.dispatchEvent(new Event("storage"));
  window.dispatchEvent(new CustomEvent("samm-whatsapp-change", { detail: { phone: cleanPhone } }));
}

export function getWhatsAppDirectUrl(phone?: string, message?: string): string {
  const targetPhone = phone ? sanitizeWhatsAppPhone(phone) : getStoredWhatsAppPhone();
  const text = message || getStoredWhatsAppMessage();
  return `https://wa.me/${targetPhone}?text=${encodeURIComponent(text)}`;
}

export function getWhatsAppWebUrl(phone?: string, message?: string): string {
  const targetPhone = phone ? sanitizeWhatsAppPhone(phone) : getStoredWhatsAppPhone();
  const text = message || getStoredWhatsAppMessage();
  return `https://web.whatsapp.com/send?phone=${targetPhone}&text=${encodeURIComponent(text)}`;
}
