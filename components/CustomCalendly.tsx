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
const MONTHS = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

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

  // Get week range for availability query
  const { startTime, endTime } = useMemo(() => {
    const start = new Date(weekStart);
    const end = new Date(weekStart);
    end.setDate(end.getDate() + 7);
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

  // Get slots for selected day
  const selectedDaySlots = selectedDay ? slotsByDay[selectedDay.toDateString()] || [] : [];

  const goToPrevWeek = () => {
    const prev = new Date(weekStart);
    prev.setDate(prev.getDate() - 7);
    // Don't go to past weeks
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
      <div className="flex items-center justify-center py-12">
        <div className="w-6 h-6 border-2 border-brand-teal border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Error state
  if (userData?.error || eventTypesData?.error || availabilityData?.error) {
    return (
      <div className="text-center py-8 text-sm opacity-50">
        No se pudo cargar la disponibilidad. Por favor intenta más tarde.
      </div>
    );
  }

  const monthYear = `${MONTHS[weekStart.getMonth()]} ${weekStart.getFullYear()}`;

  return (
    <div className="space-y-6">
      {/* Header con navegación */}
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-lg">{monthYear}</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={goToPrevWeek}
            disabled={!canGoPrev}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-foreground/10 hover:border-brand-teal hover:text-brand-teal transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNextWeek}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-foreground/10 hover:border-brand-teal hover:text-brand-teal transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Días de la semana */}
      <div className="grid grid-cols-7 gap-2">
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
                flex flex-col items-center py-3 px-2 rounded-lg transition-all
                ${past ? "opacity-30 cursor-not-allowed" : "cursor-pointer hover:bg-foreground/5"}
                ${selected ? "bg-brand-teal text-white" : ""}
                ${today && !selected ? "ring-1 ring-brand-gold" : ""}
              `}
            >
              <span className="text-xs opacity-60 mb-1">{WEEKDAYS[day.getDay()]}</span>
              <span className="text-lg font-medium">{day.getDate()}</span>
              {available && !selected && (
                <span className="w-1.5 h-1.5 rounded-full bg-brand-mint mt-1" />
              )}
            </button>
          );
        })}
      </div>

      {/* Horarios disponibles */}
      {loadingTimes && (
        <div className="flex items-center justify-center py-8">
          <div className="w-5 h-5 border-2 border-brand-teal border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {!loadingTimes && selectedDay && (
        <div className="space-y-3">
          <p className="text-sm opacity-60">
            Horarios disponibles para el {selectedDay.getDate()} de {MONTHS[selectedDay.getMonth()]}
          </p>
          
          {selectedDaySlots.length === 0 ? (
            <p className="text-sm opacity-40 py-4 text-center">
              No hay horarios disponibles este día
            </p>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {selectedDaySlots.map((slot) => (
                <a
                  key={slot.start_time}
                  href={slot.scheduling_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 text-sm text-center rounded-lg border border-foreground/10 hover:border-brand-gold hover:bg-brand-gold/5 hover:text-brand-gold transition-all"
                >
                  {formatTime(slot.start_time)}
                </a>
              ))}
            </div>
          )}
        </div>
      )}

      {!loadingTimes && !selectedDay && (
        <p className="text-sm opacity-40 text-center py-4">
          Selecciona un día para ver los horarios disponibles
        </p>
      )}
    </div>
  );
}
