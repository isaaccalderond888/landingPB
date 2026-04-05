import { NextRequest, NextResponse } from "next/server";

export interface Slot {
  start_time: string;   // ISO 8601 UTC
  scheduling_url: string;
}

export async function GET(req: NextRequest) {
  const uri = req.nextUrl.searchParams.get("uri");
  if (!uri) return NextResponse.json({ slots: [] });

  const token = process.env.CALENDLY_API_KEY;
  if (!token) return NextResponse.json({ slots: [], debug: "no_token" });

  const start = new Date();
  const end = new Date(start.getTime() + 14 * 24 * 60 * 60 * 1000);

  const url = new URL("https://api.calendly.com/event_type_available_times");
  url.searchParams.set("event_type", uri);
  url.searchParams.set("start_time", start.toISOString());
  url.searchParams.set("end_time", new Date(start.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString());

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) {
    const errText = await res.text();
    return NextResponse.json({ slots: [], debug: `calendly_error_${res.status}`, detail: errText.slice(0, 200) });
  }

  const data = await res.json();
  const slots: Slot[] = (data.collection ?? [])
    .filter((s: { status: string }) => s.status === "available")
    .slice(0, 5);

  // Si no hay slots en la primera semana, busca la siguiente
  if (slots.length === 0) {
    const url2 = new URL("https://api.calendly.com/event_type_available_times");
    url2.searchParams.set("event_type", uri);
    url2.searchParams.set("start_time", new Date(start.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString());
    url2.searchParams.set("end_time", end.toISOString());

    const res2 = await fetch(url2.toString(), {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 300 },
    });

    if (res2.ok) {
      const data2 = await res2.json();
      const slots2: Slot[] = (data2.collection ?? [])
        .filter((s: { status: string }) => s.status === "available")
        .slice(0, 5);
      return NextResponse.json({ slots: slots2 });
    }
  }

  return NextResponse.json({ slots });
}
