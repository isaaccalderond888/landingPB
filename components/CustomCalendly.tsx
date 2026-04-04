"use client";

import { useState, useEffect, useMemo } from "react";
import useSWR from "swr";

interface CustomCalendlyProps {
  eventSlug: string;
}

interface TimeSlot {
  status: string;
  start_time: string;
  invitees_remaining: number;
  scheduling_url: string;
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const WEEKDAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const WEEKDAYS_FULL = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const MONTHS = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  d.setDate(d.getDate() - day);
  d.setHours(0, 0, 0, 0);
  return d;
}

function getWeekDays(weekStart: Date): Date[] {
  const days: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    days.push(d);
  }
  return days;
}

function formatTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function formatDateShort(date: Date): string {
  return `${WEEKDAYS_FULL[date.getDay()]} ${date.getDate()} ${MONTHS[date.getMonth()]}`;
}

export default function CustomCalendly({ eventSlug }: CustomCalendlyProps) {
  const [weekStart, setWeekStart] = useState(() => getWeekStart(new Date()));
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [userUri, setUserUri] = useState<string | null>(null);
  const [eventTypeUri, setEventTypeUri] = useState<string | null>(null);

  // Fetch user
  const { data: userData, error: userError } = useSWR(
    "/api/calendly?action=user",
    fetcher
  );

  // Fetch event types when we have user
  const { data: eventTypesData } = useSWR(
    userUri ? `/api/calendly?action=event_types&user_uri=${encodeURIComponent(userUri)}` : null,
    fetcher
  );

  // Get week range for availability query - ensure exactly 7 days max
  const { startTime, endTime } = useMemo(() => {
    const now = new Date();
    const weekStartDate = new Date(weekStart);
    
    // Start from now if we're in the current week, otherwise from week start
    const start = weekStartDate <= now ? now : weekStartDate;
    
    // End exactly 6 days, 23 hours, 59 minutes from start (less than 7 days)
    const end = new Date(weekStartDate);
    end.setDate(end.getDate() + 6);
    end.setHours(23, 59, 59, 0);
    
    return {
      startTime: start.toISOString(),
      endTime: end.toISOString(),
    };
  }, [weekStart]);

  // Fetch available times when we have event type
  const { data: availabilityData, isLoading: loadingTimes } = useSWR(
    eventTypeUri
      ? `/api/calendly?action=available_times&event_type=${encodeURIComponent(eventTypeUri)}&start_time=${encodeURIComponent(startTime)}&end_time=${encodeURIComponent(endTime)}`
      : null,
    fetcher,
    { refreshInterval: 60000 }
  );

  // Set user URI when data loads
  useEffect(() => {
    if (userData?.resource?.uri) {
      setUserUri(userData.resource.uri);
    }
  }, [userData]);

  // Find event type by slug
  useEffect(() => {
    if (eventTypesData?.collection) {
      const event = eventTypesData.collection.find(
        (e: { slug: string }) => e.slug === eventSlug
      );
      if (event) {
        setEventTypeUri(event.uri);
      }
    }
  }, [eventTypesData, eventSlug]);

  const weekDays = useMemo(() => getWeekDays(weekStart), [weekStart]);

  // Group slots by day
  const slotsByDay = useMemo(() => {
    const slots: Record<string, TimeSlot[]> = {};
    if (availabilityData?.collection) {
      availabilityData.collection.forEach((slot: TimeSlot) => {
        if (slot.status === "available") {
          const dayKey = new Date(slot.start_time).toDateString();
          if (!slots[dayKey]) slots[dayKey] = [];
          slots[dayKey].push(slot);
        }
      });
    }
    return slots;
  }, [availabilityData]);

  // Get next 3 available slots across all days
  const nextThreeSlots = useMemo(() => {
    const allSlots: TimeSlot[] = [];
    if (availabilityData?.collection) {
      availabilityData.collection.forEach((slot: TimeSlot) => {
        if (slot.status === "available") {
          allSlots.push(slot);
        }
      });
    }
    // Sort by start_time and take first 3
    return allSlots
      .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime())
      .slice(0, 3);
  }, [availabilityData]);

  // Get slots for selected day
  const selectedDaySlots = selectedDay ? slotsByDay[selectedDay.toDateString()] || [] : [];

  const goToPrevWeek = () => {
    const prev = new Date(weekStart);
    prev.setDate(prev.getDate() - 7);
    if (prev >= getWeekStart(new Date())) {
      setWeekStart(prev);
      setSelectedDay(null);
    }
  };

  const goToNextWeek = () => {
    const next = new Date(weekStart);
    next.setDate(next.getDate() + 7);
    setWeekStart(next);
    setSelectedDay(null);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isPast = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const hasSlots = (date: Date) => {
    return (slotsByDay[date.toDateString()] || []).length > 0;
  };

  const canGoPrev = weekStart > getWeekStart(new Date());

  // Loading state
  if (!userData || userError) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="w-5 h-5 border-2 border-brand-teal border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Error state
  if (userData?.error || eventTypesData?.error) {
    return (
      <div className="text-center py-6 text-sm opacity-50">
        No se pudo cargar la disponibilidad.
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-[1fr,240px] gap-4">
      {/* Calendario compacto */}
      <div className="space-y-3">
        {/* Header con navegación */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">
            {MONTHS[weekStart.getMonth()]} {weekStart.getFullYear()}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={goToPrevWeek}
              disabled={!canGoPrev}
              className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-foreground/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNextWeek}
              className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-foreground/5 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Días de la semana - Grid compacto */}
        <div className="grid grid-cols-7 gap-1">
          {weekDays.map((day) => {
            const past = isPast(day);
            const today = isToday(day);
            const available = hasSlots(day);
            const selected = selectedDay?.toDateString() === day.toDateString();

            return (
              <button
                key={day.toISOString()}
                onClick={() => !past && setSelectedDay(day)}
                disabled={past}
                className={`
                  relative flex flex-col items-center py-2 rounded-lg transition-all text-center
                  ${past ? "opacity-30 cursor-not-allowed" : "cursor-pointer hover:bg-foreground/5"}
                  ${selected ? "bg-brand-teal text-white" : ""}
                  ${today && !selected ? "ring-1 ring-brand-gold ring-inset" : ""}
                `}
              >
                <span className="text-[10px] uppercase opacity-60">{WEEKDAYS[day.getDay()]}</span>
                <span className="text-sm font-medium">{day.getDate()}</span>
                {available && !selected && (
                  <span className="absolute bottom-1 w-1 h-1 rounded-full bg-brand-mint" />
                )}
              </button>
            );
          })}
        </div>

        {/* Horarios del día seleccionado */}
        {loadingTimes && (
          <div className="flex items-center justify-center py-4">
            <div className="w-4 h-4 border-2 border-brand-teal border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!loadingTimes && selectedDay && (
          <div className="space-y-2">
            <p className="text-xs opacity-50">
              {formatDateShort(selectedDay)}
            </p>
            
            {selectedDaySlots.length === 0 ? (
              <p className="text-xs opacity-40 py-2">
                Sin horarios disponibles
              </p>
            ) : (
              <div className="grid grid-cols-4 gap-1.5">
                {selectedDaySlots.map((slot) => (
                  <a
                    key={slot.start_time}
                    href={slot.scheduling_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 py-1.5 text-xs text-center rounded-md border border-foreground/10 hover:border-brand-gold hover:bg-brand-gold/5 hover:text-brand-gold transition-all"
                  >
                    {formatTime(slot.start_time)}
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

        {!loadingTimes && !selectedDay && (
          <p className="text-xs opacity-40 py-2">
            Selecciona un día
          </p>
        )}
      </div>

      {/* Próximos horarios disponibles */}
      <div className="border-l border-foreground/10 pl-4 space-y-3">
        <p className="text-xs uppercase tracking-wider opacity-50">Próximos horarios</p>
        
        {loadingTimes ? (
          <div className="flex items-center justify-center py-4">
            <div className="w-4 h-4 border-2 border-brand-teal border-t-transparent rounded-full animate-spin" />
          </div>
        ) : nextThreeSlots.length === 0 ? (
          <p className="text-xs opacity-40">
            No hay horarios esta semana
          </p>
        ) : (
          <div className="space-y-2">
            {nextThreeSlots.map((slot) => {
              const slotDate = new Date(slot.start_time);
              return (
                <a
                  key={slot.start_time}
                  href={slot.scheduling_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-2.5 rounded-lg border border-foreground/10 hover:border-brand-teal hover:bg-brand-teal/5 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium group-hover:text-brand-teal transition-colors">
                        {formatTime(slot.start_time)}
                      </p>
                      <p className="text-[10px] opacity-50">
                        {WEEKDAYS_FULL[slotDate.getDay()]} {slotDate.getDate()} {MONTHS[slotDate.getMonth()]}
                      </p>
                    </div>
                    <svg className="w-4 h-4 opacity-30 group-hover:opacity-100 group-hover:text-brand-teal transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
