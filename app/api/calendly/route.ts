import { NextRequest, NextResponse } from "next/server";

const CALENDLY_API = "https://api.calendly.com";
const API_KEY = process.env.CALENDLY_API_KEY;

async function calendlyFetch(endpoint: string, params?: Record<string, string>) {
  const url = new URL(`${CALENDLY_API}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Calendly API error: ${res.status}`);
  }

  return res.json();
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const action = searchParams.get("action");

  try {
    if (!API_KEY) {
      return NextResponse.json(
        { error: "Calendly API key not configured" },
        { status: 500 }
      );
    }

    // Get current user
    if (action === "user") {
      const data = await calendlyFetch("/users/me");
      return NextResponse.json(data);
    }

    // Get event types
    if (action === "event_types") {
      const userUri = searchParams.get("user_uri");
      if (!userUri) {
        return NextResponse.json(
          { error: "user_uri is required" },
          { status: 400 }
        );
      }
      const data = await calendlyFetch("/event_types", {
        user: userUri,
        active: "true",
      });
      // Debug: log available event types
      console.log("[v0] Available event types:", data.collection?.map((et: { name: string; slug: string }) => ({ name: et.name, slug: et.slug })));
      return NextResponse.json(data);
    }

    // Get available times
    if (action === "available_times") {
      const eventTypeUri = searchParams.get("event_type");
      const startTime = searchParams.get("start_time");
      const endTime = searchParams.get("end_time");

      if (!eventTypeUri || !startTime || !endTime) {
        return NextResponse.json(
          { error: "event_type, start_time, and end_time are required" },
          { status: 400 }
        );
      }

      const data = await calendlyFetch("/event_type_available_times", {
        event_type: eventTypeUri,
        start_time: startTime,
        end_time: endTime,
      });
      return NextResponse.json(data);
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Calendly API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch from Calendly" },
      { status: 500 }
    );
  }
}
