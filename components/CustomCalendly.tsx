"use client";

import { useState, useEffect, useCallback } from "react";
import useSWR from "swr";

interface AvailableTime {
  status: string;
  invitees_remaining: number;
  start_time: string;
  scheduling_url: string;
}

interface TimeSlot {
  time: string;
  displayTime: string;
  url: string;
}

interface GroupedSlots {
  [date: string]: TimeSlot[];
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function formatDateHeader(dateStr: string): string {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  return date.toLocaleDateString("es-MX", options);
}

function formatTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function getDateKey(isoString: string): string {
  return isoString.split("T")[0];
}

function getWeekDates(offset: number = 0): { start: Date; end: Date } {
  const now = new Date();
  const start = new Date(now);
  start.setDate(start.getDate() + offset * 7);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(end.getDate() + 7);

  return { start, end };
}

function CalendarDay({
  date,
  isSelected,
  hasSlots,
  onClick,
}: {
  date: Date;
  isSelected: boolean;
  hasSlots: boolean;
  onClick: () => void;
}) {
  const dayName = date.toLocaleDateString("es-MX", { weekday: "short" });
  const dayNum = date.getDate();
  const isToday = new Date().toDateString() === date.toDateString();

  return (
    <button
      onClick={onClick}
      disabled={!hasSlots}
      className={`
        flex flex-col items-center py-3 px-2 rounded-lg transition-all
        ${isSelected ? "bg-brand-teal text-white" : ""}
        ${!isSelected && hasSlots ? "hover:bg-brand-teal/10 text-foreground" : ""}
        ${!hasSlots ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}
        ${isToday && !isSelected ? "ring-1 ring-brand-gold" : ""}
      `}
    >
      <span className="text-xs uppercase tracking-wide opacity-70">{dayName}</span>
      <span className="text-lg font-medium mt-1">{dayNum}</span>
      {hasSlots && (
        <span className="w-1.5 h-1.5 rounded-full bg-brand-mint mt-2" />
      )}
    </button>
  );
}

export default function CustomCalendly({ eventSlug }: { eventSlug: string }) {
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [userUri, setUserUri] = useState<string | null>(null);
  const [eventTypeUri, setEventTypeUri] = useState<string | null>(null);

  const { start, end } = getWeekDates(weekOffset);

  // Fetch user
  const { data: userData, error: userError } = useSWR("/api/calendly?action=user", fetcher);

  useEffect(() => {
    console.log("[v0] userData:", userData, "error:", userError);
    if (userData?.resource?.uri) {
      setUserUri(userData.resource.uri);
    }
  }, [userData, userError]);

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
  const { data: availableTimesData, isLoading } = useSWR(
    eventTypeUri
      ? `/api/calendly?action=available_times&event_type=${encodeURIComponent(eventTypeUri)}&start_time=${start.toISOString()}&end_time=${end.toISOString()}`
      : null,
    fetcher
  );

  // Group slots by date
  const groupedSlots: GroupedSlots = {};
  if (availableTimesData?.collection) {
    availableTimesData.collection.forEach((slot: AvailableTime) => {
      const dateKey = getDateKey(slot.start_time);
      if (!groupedSlots[dateKey]) {
        groupedSlots[dateKey] = [];
      }
      groupedSlots[dateKey].push({
        time: slot.start_time,
        displayTime: formatTime(slot.start_time),
        url: slot.scheduling_url,
      });
    });
  }

  // Generate week days
  const weekDays: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(start);
    day.setDate(day.getDate() + i);
    weekDays.push(day);
  }

  // Auto-select first available date
  useEffect(() => {
    if (!selectedDate && Object.keys(groupedSlots).length > 0) {
      setSelectedDate(Object.keys(groupedSlots).sort()[0]);
    }
  }, [groupedSlots, selectedDate]);

  const handleDateSelect = useCallback((date: Date) => {
    const dateKey = date.toISOString().split("T")[0];
    setSelectedDate(dateKey);
  }, []);

  const currentMonthYear = start.toLocaleDateString("es-MX", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="space-y-6">
      {/* Month navigation */}
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-lg capitalize">{currentMonthYear}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setWeekOffset((w) => w - 1);
              setSelectedDate(null);
            }}
            disabled={weekOffset <= 0}
            className="w-8 h-8 rounded-full border border-foreground/20 flex items-center justify-center hover:border-brand-teal hover:text-brand-teal transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => {
              setWeekOffset((w) => w + 1);
              setSelectedDate(null);
            }}
            disabled={weekOffset >= 8}
            className="w-8 h-8 rounded-full border border-foreground/20 flex items-center justify-center hover:border-brand-teal hover:text-brand-teal transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Week days */}
      <div className="grid grid-cols-7 gap-1 border border-foreground/10 rounded-xl p-2 bg-background">
        {weekDays.map((day) => {
          const dateKey = day.toISOString().split("T")[0];
          const hasSlots = !!groupedSlots[dateKey];
          return (
            <CalendarDay
              key={dateKey}
              date={day}
              isSelected={selectedDate === dateKey}
              hasSlots={hasSlots}
              onClick={() => handleDateSelect(day)}
            />
          );
        })}
      </div>

      {/* Time slots */}
      <div className="min-h-[200px]">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-6 h-6 border-2 border-brand-teal border-t-transparent rounded-full animate-spin" />
          </div>
        ) : selectedDate && groupedSlots[selectedDate] ? (
          <div className="space-y-3">
            <p className="text-sm text-foreground/60 capitalize">
              {formatDateHeader(selectedDate)}
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {groupedSlots[selectedDate].map((slot) => (
                <a
                  key={slot.time}
                  href={slot.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2.5 text-sm text-center border border-foreground/15 rounded-lg hover:border-brand-gold hover:bg-brand-gold/5 hover:text-brand-gold transition-all"
                >
                  {slot.displayTime}
                </a>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-foreground/40">
            <svg className="w-12 h-12 mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm">No hay horarios disponibles esta semana</p>
            <button
              onClick={() => setWeekOffset((w) => w + 1)}
              className="mt-3 text-sm text-brand-teal hover:underline"
            >
              Ver próxima semana
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
