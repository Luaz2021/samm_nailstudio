"use client";

import { Calendar as CalendarIcon, Clock, CheckCircle2, AlertCircle } from "lucide-react";

export interface WeekDay {
  day: string;
  dateNum: string;
  month: string;
  fullDate: string;
}

export const FULL_WEEK: WeekDay[] = [
  { day: "Lun", dateNum: "26", month: "Oct", fullDate: "2026-10-26" },
  { day: "Mar", dateNum: "27", month: "Oct", fullDate: "2026-10-27" },
  { day: "Mié", dateNum: "28", month: "Oct", fullDate: "2026-10-28" },
  { day: "Jue", dateNum: "29", month: "Oct", fullDate: "2026-10-29" },
  { day: "Vie", dateNum: "30", month: "Oct", fullDate: "2026-10-30" },
  { day: "Sáb", dateNum: "31", month: "Oct", fullDate: "2026-10-31" },
  { day: "Dom", dateNum: "01", month: "Nov", fullDate: "2026-11-01" },
  { day: "Lun", dateNum: "02", month: "Nov", fullDate: "2026-11-02" },
];

export const ALL_SLOTS = [
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

// Simulación de estados en la agenda
export const MOCK_SCHEDULE: Record<string, { time: string; status: "pre_reserva" | "confirmada" }[]> = {
  "2026-10-26": [
    { time: "10:00", status: "confirmada" },
    { time: "10:30", status: "confirmada" },
    { time: "11:00", status: "confirmada" },
    { time: "11:30", status: "confirmada" },
  ],
  "2026-10-27": [
    { time: "11:30", status: "pre_reserva" },
    { time: "12:00", status: "pre_reserva" },
    { time: "14:00", status: "confirmada" },
    { time: "14:30", status: "confirmada" },
  ],
  "2026-10-28": [
    { time: "15:00", status: "pre_reserva" },
    { time: "15:30", status: "pre_reserva" },
  ]
};

interface WeeklySchedulePickerProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
  selectedTime: string;
  onSelectTime: (time: string) => void;
  durationMinutes: number;
}

export function WeeklySchedulePicker({
  selectedDate,
  onSelectDate,
  selectedTime,
  onSelectTime,
  durationMinutes,
}: WeeklySchedulePickerProps) {

  // Calcular hora fin estimada
  const getCalculatedEndTime = (startTime: string, duration: number) => {
    if (!startTime) return "";
    const [h, m] = startTime.split(":").map(Number);
    const totalM = h * 60 + m + duration;
    const endH = String(Math.floor(totalM / 60)).padStart(2, "0");
    const endM = String(totalM % 60).padStart(2, "0");
    return `${endH}:${endM}`;
  };

  const getSlotStatus = (date: string, time: string): "disponible" | "pre_reserva" | "confirmada" => {
    const list = MOCK_SCHEDULE[date] || [];
    const item = list.find((s) => s.time === time);
    return item ? item.status : "disponible";
  };

  const endTime = getCalculatedEndTime(selectedTime, durationMinutes);

  return (
    <div className="space-y-4 bg-white p-4 sm:p-5 rounded-2xl border border-[#E9E2DB] shadow-xs">
      
      {/* Encabezado */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-[#9E5742]" />
          <h4 className="text-xs uppercase font-bold tracking-wider text-[#2C2420]">
            Agenda de Turnos Disponibles
          </h4>
        </div>
        <span className="text-[10px] text-[#9E8F86]">
          9:00 AM – 6:00 PM
        </span>
      </div>

      {/* Días en Carousel / Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
        {FULL_WEEK.map((w) => {
          const isSelected = selectedDate === w.fullDate;
          return (
            <button
              key={w.fullDate}
              type="button"
              onClick={() => onSelectDate(w.fullDate)}
              className={`py-2 px-1 rounded-xl text-center border transition-all text-xs flex flex-col items-center justify-center ${
                isSelected
                  ? "bg-[#2C2420] text-white border-[#2C2420] shadow-sm font-semibold scale-[1.02]"
                  : "bg-[#FBF8F6] text-[#7A6B62] border-[#EAE3DA] hover:border-[#9E5742] hover:text-[#2C2420]"
              }`}
            >
              <span className="text-[10px] uppercase tracking-wider opacity-70">{w.day}</span>
              <span className="text-sm font-bold my-0.5">{w.dateNum}</span>
              <span className="text-[9px] uppercase opacity-75">{w.month}</span>
            </button>
          );
        })}
      </div>

      {/* Franjas Horarias Disponibles */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[11px] text-[#7A6B62]">
          <span>Selecciona tu hora de inicio:</span>
          {selectedTime && (
            <span className="font-semibold text-[#9E5742]">
              Bloque: {selectedTime} → {endTime} ({durationMinutes} min)
            </span>
          )}
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 max-h-48 overflow-y-auto pr-1">
          {ALL_SLOTS.map((slot) => {
            const status = getSlotStatus(selectedDate, slot);
            const isSelected = selectedTime === slot;

            if (status === "confirmada") {
              return (
                <div
                  key={slot}
                  className="py-2 px-1 text-center rounded-lg border border-emerald-200 bg-emerald-50/70 text-emerald-800 text-[10px] font-medium opacity-75 cursor-not-allowed"
                >
                  <span className="block font-semibold">{slot}</span>
                  <span className="text-[8px] uppercase">Ocupado</span>
                </div>
              );
            }

            if (status === "pre_reserva") {
              return (
                <div
                  key={slot}
                  className="py-2 px-1 text-center rounded-lg border border-amber-200 bg-amber-50 text-amber-800 text-[10px] font-medium opacity-90 cursor-not-allowed"
                >
                  <span className="block font-semibold">{slot}</span>
                  <span className="text-[8px] uppercase">Pre-reserva</span>
                </div>
              );
            }

            return (
              <button
                key={slot}
                type="button"
                onClick={() => onSelectTime(slot)}
                className={`py-2 px-1 text-center rounded-lg border text-xs transition-all ${
                  isSelected
                    ? "bg-[#9E5742] text-white border-[#9E5742] font-bold shadow-xs scale-[1.02]"
                    : "bg-white text-[#2C2420] border-[#E9E2DB] hover:border-[#9E5742] hover:bg-[#FAF8F5]"
                }`}
              >
                <span className="block font-semibold">{slot}</span>
                <span className={`text-[8px] uppercase ${isSelected ? "text-white/80" : "text-emerald-600"}`}>Libre</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Leyenda de Estado */}
      <div className="pt-2 border-t border-[#F2ECE4] flex items-center justify-between text-[10px] text-[#9E8F86]">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Libre</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <span>Pre-reserva</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-700" />
          <span>Confirmada</span>
        </div>
      </div>

    </div>
  );
}
