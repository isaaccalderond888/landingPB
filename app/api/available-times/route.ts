import { NextRequest, NextResponse } from "next/server";

export interface Slot {
  start_time: string;   // ISO 8601 UTC
  scheduling_url: string;
}

export async function GET(req: NextRequest) {
  const uri = req.nextUrl.searchParams.get("uri");
  if (!uri) return NextResponse.json({ slots: [] });

  const token = process.env.CALENDLY_API_KEY;
  if (!token) return NextResponse.json({ slots: [] });

  const start = new Date(Date.now() + 5 * 60 * 1000); // +5 min para evitar clock drift
  const WEEK = 7 * 24 * 60 * 60 * 1000;

  async function fetchSlots(from: Date, to: Date): Promise<Slot[]> {
    const u = new URL("https://api.calendly.com/event_type_available_times");
    u.searchParams.set("event_type", uri!);
    u.searchParams.set("start_time", from.toISOString());
    u.searchParams.set("end_time", to.toISOString());
    const r = await fetch(u.toString(), {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!r.ok) return [];
    const d = await r.json();
    return (d.collection ?? []).filter((s: { status: string }) => s.status === "available");
  }

  const maxWeeks = parseInt(req.nextUrl.searchParams.get("maxWeeks") ?? "4", 10);

  // Busca semana a semana hasta encontrar slots o agotar maxWeeks semanas
  for (let w = 0; w < maxWeeks; w++) {
    const from = new Date(start.getTime() + w * WEEK);
    const to = new Date(start.getTime() + (w + 1) * WEEK);
    const slots = await fetchSlots(from, to);
    if (slots.length > 0) {
      return NextResponse.json({ slots: slots.slice(0, 5) });
    }
  }

  return NextResponse.json({ slots: [] });
}
