import { NextResponse } from "next/server";

const API_KEY = process.env.CALENDLY_API_KEY;
const CALENDLY_API = "https://api.calendly.com";

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
    cache: "no-store",
  });

  if (!res.ok) {
    const errorBody = await res.text();
    return { error: true, status: res.status, message: errorBody };
  }

  return res.json();
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");

  if (!API_KEY) {
    return NextResponse.json(
      { error: "CALENDLY_API_KEY not configured" },
      { status: 500 }
    );
  }

  try {
    // Get current user
    if (action === "user") {
      const data = await calendlyFetch("/users/me");
      return NextResponse.json(data);
    }

    // Get event types
    if (action === "event_types") {
      const userUri = searchParams.get("user_uri");
      if (!userUri) {
        return NextResponse.json({ error: "user_uri required" }, { status: 400 });
      }
      const data = await calendlyFetch("/event_types", {
        user: userUri,
        active: "true",
      });
      return NextResponse.json(data);
    }

    // Get available times
    if (action === "available_times") {
      const eventTypeUri = searchParams.get("event_type");
      const startTimeParam = searchParams.get("start_time");
      const endTimeParam = searchParams.get("end_time");

      if (!eventTypeUri || !startTimeParam || !endTimeParam) {
        return NextResponse.json(
          { error: "event_type, start_time, and end_time required" },
          { status: 400 }
        );
      }

      // Ensure start_time is in the future
      const now = new Date();
      let startTime = new Date(startTimeParam);
      const endTime = new Date(endTimeParam);
      
      if (startTime <= now) {
        // Round up to next 15 min slot in the future
        startTime = new Date(now);
        startTime.setMinutes(Math.ceil(startTime.getMinutes() / 15) * 15, 0, 0);
        startTime = new Date(startTime.getTime() + 60000); // +1 min buffer
      }

      const data = await calendlyFetch("/event_type_available_times", {
        event_type: eventTypeUri,
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString(),
      });
      
      return NextResponse.json(data);
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
