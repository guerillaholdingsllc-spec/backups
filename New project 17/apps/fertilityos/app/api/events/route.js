import { NextResponse } from "next/server";
import { z } from "zod";
import { getAttribution } from "../../../lib/tracking";
import { getSupabaseAdmin } from "../../../lib/supabase";

const eventSchema = z.object({
  name: z.string().min(2).max(120),
  brand: z.string().min(2).max(80),
  path: z.string().optional(),
  sessionId: z.string().optional(),
  anonymousId: z.string().optional(),
  properties: z.record(z.unknown()).optional()
});

export async function POST(request) {
  const json = await request.json().catch(() => null);
  const parsed = eventSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid event payload" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const attribution = getAttribution(request.headers);
  const event = {
    name: parsed.data.name,
    brand: parsed.data.brand,
    path: parsed.data.path || null,
    session_id: parsed.data.sessionId || null,
    anonymous_id: parsed.data.anonymousId || null,
    properties: parsed.data.properties || {},
    attribution
  };

  if (supabase) {
    const { error } = await supabase.from("fertilityos_events").insert(event);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, stored: Boolean(supabase) });
}
