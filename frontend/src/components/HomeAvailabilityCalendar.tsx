"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, Clock, CheckCircle2, Lock, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";

interface SlotInfo {
  time: string;
  endTime: string;
  status: "disponible" | "pre_reserva" | "confirmada";
  label?: string;
}

interface DaySchedule {
  day: string;
  dateNum: string;
  month: string;
  fullDate: string;
  freeCount: number;
  slots: SlotInfo[];
}

const WEEK_DATA: DaySchedule[] = [
  {
    day: "Lun",
    dateNum: "26",
    month: "Oct",
    fullDate: "2026-10-26",
    freeCount: 2,
    slots: [
      { time: "09:30", endTime: "11:30", status: "confirmada", label: "Ocupado" },
      { time: "11:30", endTime: "13:30", status: "confirmada", label: "Ocupado" },
      { time: "14:00", endTime: "16:00", status: "disponible", label: "Hueco Libre" },
      { time: "16:30", endTime: "18:30", status: "disponible", label: "Hueco Libre" },
      { time: "18:30", endTime: "20:30", status: "confirmada", label: "Ocupado" }
    ]
  },
  {
    day: "Mar",
    dateNum: "27",
    month: "Oct",
    fullDate: "2026-10-27",
    freeCount: 3,
    slots: [
      { time: "09:30", endTime: "11:30", status: "disponible", label: "Hueco Libre" },
      { time: "11:30", endTime: "13:30", status: "pre_reserva", label: "En Confirmación" },
      { time: "14:00", endTime: "16:00", status: "confirmada", label: "Ocupado" },
      { time: "16:30", endTime: "18:30", status: "disponible", label: "Hueco Libre" },
      { time: "18:30", endTime: "20:30", status: "disponible", label: "Hueco Libre" }
    ]
  },
  {
    day: "Mié",
    dateNum: "28",
    month: "Oct",
    fullDate: "2026-10-28",
    freeCount: 2,
    slots: [
      { time: "09:30", endTime: "11:30", status: "confirmada", label: "Ocupado" },
      { time: "11:30", endTime: "13:30", status: "disponible", label: "Hueco Libre" },
      { time: "14:00", endTime: "16:00", status: "pre_reserva", label: "En Confirmación" },
      { time: "16:30", endTime: "18:30", status: "disponible", label: "Hueco Libre" },
      { time: "18:30", endTime: "20:30", status: "confirmada", label: "Ocupado" }
    ]
  },
  {
    day: "Jue",
    dateNum: "29",
    month: "Oct",
    fullDate: "2026-10-29",
    freeCount: 3,
    slots: [
      { time: "09:30", endTime: "11:30", status: "disponible", label: "Hueco Libre" },
      { time: "11:30", endTime: "13:30", status: "disponible", label: "Hueco Libre" },
      { time: "14:00", endTime: "16:00", status: "confirmada", label: "Ocupado" },
      { time: "16:30", endTime: "18:30", status: "confirmada", label: "Ocupado" },
      { time: "18:30", endTime: "20:30", status: "disponible", label: "Hueco Libre" }
    ]
  },
  {
    day: "Vie",
    dateNum: "30",
    month: "Oct",
    fullDate: "2026-10-30",
    freeCount: 1,
    slots: [
      { time: "09:30", endTime: "11:30", status: "confirmada", label: "Ocupado" },
      { time: "11:30", endTime: "13:30", status: "confirmada", label: "Ocupado" },
      { time: "14:00", endTime: "16:00", status: "confirmada", label: "Ocupado" },
      { time: "16:30", endTime: "18:30", status: "disponible", label: "Último Turno" },
      { time: "18:30", endTime: "20:30", status: "confirmada", label: "Ocupado" }
    ]
  },
  {
    day: "Sáb",
    dateNum: "31",
    month: "Oct",
    fullDate: "2026-10-31",
    freeCount: 2,
    slots: [
      { time: "09:30", endTime: "11:30", status: "disponible", label: "Hueco Libre" },
      { time: "11:30", endTime: "13:30", status: "confirmada", label: "Ocupado" },
      { time: "14:00", endTime: "16:00", status: "confirmada", label: "Ocupado" },
      { time: "16:30", endTime: "18:30", status: "disponible", label: "Hueco Libre" },
      { time: "18:30", endTime: "20:30", status: "confirmada", label: "Ocupado" }
    ]
  }
];

interface HomeAvailabilityCalendarProps {
  onSelectSlot: (date: string, time: string) => void;
  onExploreCatalog: () => void;
}

export function HomeAvailabilityCalendar({
  onSelectSlot,
  onExploreCatalog
}: HomeAvailabilityCalendarProps) {
  const [selectedDayIndex, setSelectedDayIndex] = useState(1); // Default to Martes 27
  const activeDay = WEEK_DATA[selectedDayIndex] || WEEK_DATA[0];

  return (
    <section
      id="seccion-citas"
      className="min-h-[calc(100svh-var(--header-h,81px))] flex flex-col justify-center py-10 sm:py-16 lg:py-12 overflow-hidden bg-[#FAF8F5] border-t border-[#EAE3DA] text-[#2C2420]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full flex flex-col justify-between h-full">

        {/* Encabezado Editorial con Leyenda */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 gap-3">
          <div className="space-y-1">
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#9E5742] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C8927B]" />
              DISPONIBILIDAD EN TIEMPO REAL · AGENDA DE CABINA
            </span>
            <h2
              className="text-2xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#2C2420]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Turnos Libres Esta Semana
            </h2>
          </div>

          {/* Leyenda de Estados */}
          <div className="flex items-center gap-3 text-[11px] font-medium text-[#7A6B62] shrink-0">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-xs"></span>
              Disponible
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              En Confirmación
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D1C7BD]"></span>
              Ocupado
            </span>
          </div>
        </div>

        {/* Selector Horizontal de Días */}
        <div className="mb-4">
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {WEEK_DATA.map((d, idx) => {
              const isSelected = idx === selectedDayIndex;
              return (
                <button
                  key={d.fullDate}
                  type="button"
                  onClick={() => setSelectedDayIndex(idx)}
                  className={`shrink-0 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl text-left transition-all border ${
                    isSelected
                      ? "bg-[#2C2420] text-white border-[#2C2420] shadow-md scale-[1.02]"
                      : "bg-white text-[#2C2420] border-[#EAE3DA] hover:border-[#C8927B]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider opacity-75">{d.day}</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      isSelected
                        ? "bg-[#C8927B]/30 text-[#FAF8F5]"
                        : d.freeCount > 0 ? "bg-emerald-50 text-emerald-700" : "bg-zinc-100 text-zinc-500"
                    }`}>
                      {d.freeCount > 0 ? `${d.freeCount} libres` : "Lleno"}
                    </span>
                  </div>
                  <div className="text-base sm:text-lg font-light mt-0.5" style={{ fontFamily: "var(--font-serif)" }}>
                    {d.dateNum} {d.month}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Grilla de Turnos para el Día Seleccionado */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-4 flex-1">
          {activeDay.slots.map((slot) => {
            const isFree = slot.status === "disponible";
            const isPending = slot.status === "pre_reserva";

            if (isFree) {
              return (
                <div
                  key={slot.time}
                  onClick={() => onSelectSlot(activeDay.fullDate, slot.time)}
                  className="group cursor-pointer rounded-2xl p-4 bg-white border border-emerald-200 hover:border-[#9E5742] shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      {slot.label}
                    </span>
                    <Clock className="w-3.5 h-3.5 text-[#C8927B]" />
                  </div>

                  <div className="my-2">
                    <span
                      className="text-2xl font-light text-[#2C2420] group-hover:text-[#9E5742] transition-colors"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {slot.time}
                    </span>
                    <span className="text-xs text-[#7A6B62] block">
                      hasta {slot.endTime} (2h cabina)
                    </span>
                  </div>

                  <button
                    type="button"
                    className="w-full text-center py-2 px-3 rounded-xl bg-[#2C2420] group-hover:bg-[#9E5742] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Agendar Cita</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              );
            }

            if (isPending) {
              return (
                <div
                  key={slot.time}
                  className="rounded-2xl p-4 bg-[#FFFDF9] border border-amber-200 opacity-80 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      {slot.label}
                    </span>
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                  </div>
                  <div className="my-2">
                    <span className="text-2xl font-light text-[#7A6B62]" style={{ fontFamily: "var(--font-serif)" }}>
                      {slot.time}
                    </span>
                    <span className="text-xs text-[#A89C96] block">Espera de confirmación Yape/Plin</span>
                  </div>
                  <div className="text-[11px] text-amber-700/80 font-medium text-center py-1.5 bg-amber-50/60 rounded-xl">
                    Bloqueado temporalmente
                  </div>
                </div>
              );
            }

            return (
              <div
                key={slot.time}
                className="rounded-2xl p-4 bg-[#F2ECE4]/60 border border-[#E5DDD2] opacity-60 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A6B62] bg-[#E9E1D7] px-2 py-0.5 rounded-full">
                    {slot.label}
                  </span>
                  <Lock className="w-3.5 h-3.5 text-[#A89C96]" />
                </div>
                <div className="my-2">
                  <span className="text-2xl font-light text-[#A89C96]" style={{ fontFamily: "var(--font-serif)" }}>
                    {slot.time}
                  </span>
                  <span className="text-xs text-[#A89C96] block">Turno asignado en cabina</span>
                </div>
                <div className="text-[11px] text-[#A89C96] font-medium text-center py-1.5 bg-[#EAE2D7]/50 rounded-xl">
                  No disponible
                </div>
              </div>
            );
          })}
        </div>

        {/* Micro-Garantías al Pie & Enlace al Catálogo */}
        <div className="pt-3 border-t border-[#EAE3DA] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#7A6B62]">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#9E5742]" />
              Instrumental esterilizado & lima nueva
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#9E5742]" />
              Atención 1 a 1 dedicada y sin prisas
            </span>
            <span className="flex items-center gap-1.5 font-medium text-[#2C2420]">
              Reserva con 20% de seña (Yape / Plin)
            </span>
          </div>

          <button
            type="button"
            onClick={onExploreCatalog}
            className="text-xs font-semibold text-[#9E5742] hover:text-[#2C2420] underline transition-colors shrink-0"
          >
            Ver catálogo completo de tratamientos →
          </button>
        </div>

      </div>
    </section>
  );
}
