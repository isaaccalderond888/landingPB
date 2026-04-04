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

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function formatTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString("es-MX", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function formatDateHeader(date: Date): string {
  return date.toLocaleDateString("es-MX", {
    weekday: "short",
    day: "numeric",
  });
}

function getWeekDays(startDate: Date): Date[] {
  const days: Date[] = [];
  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);
  
  for (let i = 0; i < 7; i++) {
    const day = new Date(start);
    day.setDate(start.getDate() + i);
    days.push(day);
  }
  return days;
}

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export default function CustomCalendly({ eventSlug }: CustomCalendlyProps) {
  const [userUri, setUserUri] = useState<string | null>(null);
  const [eventTypeUri, setEventTypeUri] = useState<string | null>(null);
  const [weekStart, setWeekStart] = useState<Date>(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  });
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  const weekDays = useMemo(() => getWeekDays(weekStart), [weekStart]);

  const startTime = useMemo(() => {
    const now = new Date();
    const weekStartDate = new Date(weekStart);
    weekStartDate.setHours(0, 0, 0, 0);
    
    // Si weekStart es hoy o en el pasado, usar ahora + 1 minuto
    // De lo contrario, usar el inicio de weekStart
    if (weekStartDate <= now) {
      const future = new Date(now.getTime() + 60000); // +1 minuto para estar seguro
      return future.toISOString();
    }
    return weekStartDate.toISOString();
  }, [weekStart]);

  const endTime = useMemo(() => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + 7);
    d.setHours(23, 59, 59, 999);
    return d.toISOString();
  }, [weekStart]);

  // Fetch user
  const { data: userData, error: userError } = useSWR("/api/calendly?action=user", fetcher);

  useEffect(() => {
    if (userData?.resource?.uri) {
      setUserUri(userData.resource.uri);
    }
  }, [userData]);

  // Fetch event types
  const { data: eventTypesData } = useSWR(
    userUri ? `/api/calendly?action=event_types&user_uri=${encodeURIComponent(userUri)}` : null,
    fetcher
  );

  useEffect(() => {
    if (eventTypesData?.collection) {
      const targetEvent = eventTypesData.collection.find(
        (et: { slug: string }) => et.slug === eventSlug
      );
      if (targetEvent) {
        setEventTypeUri(targetEvent.uri);
      }
    }
  }, [eventTypesData, eventSlug]);

  // Fetch available times
  const { data: availableTimesData, isLoading: timesLoading } = useSWR(
    eventTypeUri
      ? `/api/calendly?action=available_times&event_type=${encodeURIComponent(eventTypeUri)}&start_time=${encodeURIComponent(startTime)}&end_time=${encodeURIComponent(endTime)}`
      : null,
    fetcher
  );

  const timeSlots: TimeSlot[] = availableTimesData?.collection || [];

  // Group slots by day
  const slotsByDay = useMemo(() => {
    const grouped: Record<string, TimeSlot[]> = {};
    timeSlots.forEach((slot) => {
      const date = new Date(slot.start_time);
      const key = date.toDateString();
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(slot);
    });
    return grouped;
  }, [timeSlots]);

  // Get slots for selected day
  const selectedDaySlots = useMemo(() => {
    if (!selectedDay) return [];
    return slotsByDay[selectedDay.toDateString()] || [];
  }, [selectedDay, slotsByDay]);

  const goToPrevWeek = () => {
    const newStart = new Date(weekStart);
    newStart.setDate(newStart.getDate() - 7);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (newStart >= today) {
      setWeekStart(newStart);
      setSelectedDay(null);
    }
  };

  const goToNextWeek = () => {
    const newStart = new Date(weekStart);
    newStart.setDate(newStart.getDate() + 7);
    setWeekStart(newStart);
    setSelectedDay(null);
  };

  const canGoPrev = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const prevWeek = new Date(weekStart);
    prevWeek.setDate(prevWeek.getDate() - 7);
    return prevWeek >= today;
  }, [weekStart]);

  // Loading state
  if (!userData || !eventTypesData || userError) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-6 h-6 border-2 border-brand-teal border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Week navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={goToPrevWeek}
          disabled={!canGoPrev}
          className="p-2 rounded-full hover:bg-foreground/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-sm font-medium">
          {weekStart.toLocaleDateString("es-MX", { month: "long", year: "numeric" })}
        </span>
        <button
          onClick={goToNextWeek}
          className="p-2 rounded-full hover:bg-foreground/5 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day) => {
          const dayKey = day.toDateString();
          const hasSlots = slotsByDay[dayKey]?.length > 0;
          const isSelected = selectedDay && isSameDay(day, selectedDay);
          const isToday = isSameDay(day, new Date());

          return (
            <button
              key={dayKey}
              onClick={() => hasSlots && setSelectedDay(day)}
              disabled={!hasSlots}
              className={`
                flex flex-col items-center py-3 px-1 rounded-lg text-sm transition-all
                ${isSelected ? "bg-brand-teal text-white" : ""}
                ${!isSelected && hasSlots ? "hover:bg-foreground/5 cursor-pointer" : ""}
                ${!hasSlots ? "opacity-40 cursor-not-allowed" : ""}
              `}
            >
              <span className="text-xs opacity-70 uppercase">{formatDateHeader(day).split(" ")[0]}</span>
              <span className={`text-lg font-medium ${isToday && !isSelected ? "text-brand-teal" : ""}`}>
                {day.getDate()}
              </span>
              {hasSlots && (
                <span className={`w-1.5 h-1.5 rounded-full mt-1 ${isSelected ? "bg-white" : "bg-brand-mint"}`} />
              )}
            </button>
          );
        })}
      </div>

      {/* Loading times */}
      {timesLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="w-5 h-5 border-2 border-brand-teal border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Time slots */}
      {selectedDay && selectedDaySlots.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm opacity-60">
            Horarios disponibles para el {selectedDay.toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long" })}
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {selectedDaySlots.map((slot) => (
              <a
                key={slot.start_time}
                href={slot.scheduling_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 text-sm text-center border border-foreground/10 rounded-lg hover:border-brand-gold hover:text-brand-gold transition-colors"
              >
                {formatTime(slot.start_time)}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* No day selected message */}
      {!selectedDay && !timesLoading && timeSlots.length > 0 && (
        <p className="text-sm opacity-50 text-center py-4">
          Selecciona un día para ver los horarios disponibles
        </p>
      )}

      {/* No slots available */}
      {!timesLoading && timeSlots.length === 0 && eventTypeUri && (
        <p className="text-sm opacity-50 text-center py-4">
          No hay horarios disponibles esta semana. Intenta con la siguiente.
        </p>
      )}
    </div>
  );
}
