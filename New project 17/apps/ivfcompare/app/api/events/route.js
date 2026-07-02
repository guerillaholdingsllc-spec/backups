import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/backend";

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const supabase = supabaseAdmin();
  const { error } = await supabase.from("fertilityos_events").insert({
    name: body.name || "event",
    brand: body.brand || "IVFCompare",
    path: body.path || null,
    properties: body.properties || {},
    attribution: { referer: request.headers.get("referer"), userAgent: request.headers.get("user-agent") }
  });
  if (error) return NextResponse.json({ stored: false, error: error.message }, { status: 500 });
  return NextResponse.json({ stored: true });
}
