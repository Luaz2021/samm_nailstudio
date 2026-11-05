/**
 * Gestor unificado de Reservas y Disponibilidad en Memoria / LocalStorage (RAM-First).
 * Permite que el flujo completo (Web pública -> Agendamiento -> Admin) funcione al 100%
 * de forma reactiva y persistente en el navegador sin depender de un backend externo.
 */

export interface BookingRecord {
  id: string;
  code: string;
  clientName: string;
  clientPhone: string;
  service: string;
  extras: string[];
  date: string; // YYYY-MM-DD
  timeSlot: string;
  durationMinutes: number;
  totalPrice: number;
  deposit20: number;
  remaining80: number;
  status: "pre_reserva" | "confirmada" | "cancelada";
  paymentMethod: "Yape" | "Plin" | "Transferencia" | "Pendiente";
  receiptNote?: string;
  createdAt: string;
}

export interface WeekDay {
  day: string;
  dateNum: string;
  month: string;
  fullDate: string;
}

export interface CabinSlotInfo {
  time: string;
  endTime: string;
  status: "disponible" | "pre_reserva" | "confirmada";
  label?: string;
}

export const BOOKINGS_STORAGE_KEY = "samm_bookings_data";

export const CABIN_SLOTS: { time: string; endTime: string }[] = [
  { time: "09:30", endTime: "11:30" },
  { time: "11:30", endTime: "13:30" },
  { time: "14:00", endTime: "16:00" },
  { time: "16:30", endTime: "18:30" },
  { time: "18:30", endTime: "20:30" },
];

export const ALL_PICKER_SLOTS = [
  "09:00", "09:30",
  "10:00", "10:30",
  "11:00", "11:30",
  "12:00", "12:30",
  "13:00", "13:30",
  "14:00", "14:30",
  "15:00", "15:30",
  "16:00", "16:30",
  "17:00", "17:30",
  "18:00"
];

const SPANISH_DAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const SPANISH_MONTHS = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dic"];

/**
 * Formatea un objeto Date en YYYY-MM-DD local (evitando desfases UTC)
 */
export function formatIsoDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * Genera N días rodantes a partir de hoy para el calendario
 */
export function getRollingWeekDays(daysCount = 8): WeekDay[] {
  const result: WeekDay[] = [];
  const today = new Date();

  for (let i = 0; i < daysCount; i++) {
    const current = new Date(today);
    current.setDate(today.getDate() + i);

    result.push({
      day: i === 0 ? "Hoy" : i === 1 ? "Mañ" : SPANISH_DAYS[current.getDay()],
      dateNum: String(current.getDate()).padStart(2, "0"),
      month: SPANISH_MONTHS[current.getMonth()],
      fullDate: formatIsoDate(current),
    });
  }

  return result;
}

/**
 * Genera citas iniciales de prueba relativas a la fecha actual para mantener el estudio vivo
 */
export function getCleanSeedBookings(): BookingRecord[] {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const dayAfter = new Date(today);
  dayAfter.setDate(today.getDate() + 2);

  return [
    {
      id: "b-seed-1",
      code: "PRE-4821",
      clientName: "Valeria Montes",
      clientPhone: "+51 984 123 456",
      service: "Manicura Rusa Anatómica Combinada",
      extras: ["Retirada de Acrílico Ajeno (+30m)"],
      date: formatIsoDate(tomorrow),
      timeSlot: "11:30 - 14:00",
      durationMinutes: 150,
      totalPrice: 100,
      deposit20: 20,
      remaining80: 80,
      status: "pre_reserva",
      paymentMethod: "Pendiente",
      receiptNote: "Esperando comprobante de Yape por WhatsApp",
      createdAt: new Date().toISOString()
    },
    {
      id: "b-seed-2",
      code: "PRE-8910",
      clientName: "Carla Mendoza",
      clientPhone: "+51 977 456 789",
      service: "Esculpidas en Acrílico Premium con Molde",
      extras: ["French Micro-Line (+30m)", "Reconstrucción Uña Rota (+30m)"],
      date: formatIsoDate(tomorrow),
      timeSlot: "14:00 - 17:00",
      durationMinutes: 180,
      totalPrice: 170,
      deposit20: 34,
      remaining80: 136,
      status: "confirmada",
      paymentMethod: "Yape",
      receiptNote: "Adelanto S/ 34 verificado con comprobante Yape",
      createdAt: new Date().toISOString()
    },
    {
      id: "b-seed-3",
      code: "PRE-3312",
      clientName: "Jimena Morales",
      clientPhone: "+51 912 345 678",
      service: "Kapping Gel & Rubber Base Fortalecedor",
      extras: ["Nivelación Extra con Calcio"],
      date: formatIsoDate(dayAfter),
      timeSlot: "10:00 - 12:00",
      durationMinutes: 120,
      totalPrice: 70,
      deposit20: 14,
      remaining80: 56,
      status: "confirmada",
      paymentMethod: "Plin",
      receiptNote: "Plin verificado en cuenta BCP",
      createdAt: new Date().toISOString()
    }
  ];
}

/**
 * Obtiene las reservas almacenadas en localStorage o genera las de inicio
 */
export function getStoredBookings(): BookingRecord[] {
  if (typeof window === "undefined") {
    return getCleanSeedBookings();
  }

  try {
    const raw = localStorage.getItem(BOOKINGS_STORAGE_KEY);
    if (!raw) {
      const seed = getCleanSeedBookings();
      localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(seed));
      return seed;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("Error al leer reservas de localStorage:", err);
    return getCleanSeedBookings();
  }
}

/**
 * Guarda y emite evento global de actualización
 */
export function persistBookings(bookings: BookingRecord[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
    window.dispatchEvent(new CustomEvent("samm-bookings-change", { detail: bookings }));
  } catch (err) {
    console.error("Error al persistir reservas:", err);
  }
}

/**
 * Registra una nueva reserva emitida desde la web
 */
export function createNewBooking(
  data: Omit<BookingRecord, "id" | "code" | "createdAt" | "status" | "paymentMethod">
): BookingRecord {
  const current = getStoredBookings();
  const randomCode = Math.floor(1000 + Math.random() * 9000);
  const newBooking: BookingRecord = {
    ...data,
    id: `b-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    code: `PRE-${randomCode}`,
    status: "pre_reserva",
    paymentMethod: "Pendiente",
    createdAt: new Date().toISOString()
  };

  const updated = [newBooking, ...current];
  persistBookings(updated);
  return newBooking;
}

/**
 * Actualiza el estado de una reserva (confirmar, cancelar, etc.)
 */
export function updateBookingStatus(
  id: string,
  status: BookingRecord["status"],
  paymentMethod: BookingRecord["paymentMethod"] = "Pendiente",
  receiptNote?: string
): BookingRecord[] {
  const current = getStoredBookings();
  const updated = current.map((b) => {
    if (b.id === id) {
      return {
        ...b,
        status,
        paymentMethod: paymentMethod || b.paymentMethod,
        receiptNote: receiptNote !== undefined ? receiptNote : b.receiptNote
      };
    }
    return b;
  });

  persistBookings(updated);
  return updated;
}

/**
 * Elimina una reserva por id
 */
export function deleteBooking(id: string): BookingRecord[] {
  const current = getStoredBookings();
  const updated = current.filter((b) => b.id !== id);
  persistBookings(updated);
  return updated;
}

/**
 * Limpia todas las reservas dejando la agenda en blanco (a cero)
 */
export function clearAllBookings(): BookingRecord[] {
  const empty: BookingRecord[] = [];
  persistBookings(empty);
  return empty;
}

/**
 * Restablece las citas por defecto de demostración
 */
export function resetDemoBookings(): BookingRecord[] {
  const seed = getCleanSeedBookings();
  persistBookings(seed);
  return seed;
}

/**
 * Evalúa el estado de una hora específica para una fecha dada comparando con las reservas activas
 */
export function getSlotBookingStatus(
  dateStr: string,
  timeStr: string,
  bookings: BookingRecord[]
): "disponible" | "pre_reserva" | "confirmada" {
  // Solo consideramos reservas no canceladas para la fecha
  const dayBookings = bookings.filter(
    (b) => b.date === dateStr && b.status !== "cancelada"
  );

  const matched = dayBookings.find((b) => {
    // Si coincide el timeSlot directo o si el timeSlot empieza con la hora
    if (b.timeSlot.includes(timeStr)) return true;
    return false;
  });

  if (!matched) return "disponible";
  return matched.status === "confirmada" ? "confirmada" : "pre_reserva";
}

/**
 * Construye la agenda de turnos de cabina de la portada con datos dinámicos en vivo
 */
export function getCabinScheduleForDate(dateStr: string, bookings: BookingRecord[]): CabinSlotInfo[] {
  return CABIN_SLOTS.map((slot) => {
    const status = getSlotBookingStatus(dateStr, slot.time, bookings);
    let label = "Hueco Libre";
    if (status === "confirmada") label = "Ocupado";
    if (status === "pre_reserva") label = "En Confirmación";

    return {
      time: slot.time,
      endTime: slot.endTime,
      status,
      label
    };
  });
}
