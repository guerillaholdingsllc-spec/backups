import { NextResponse } from "next/server";
import { z } from "zod";
import { sendHubSpotLead } from "../../../lib/hubspot";
import { getSupabaseAdmin } from "../../../lib/supabase";
import { getAttribution, leadScore } from "../../../lib/tracking";

const leadSchema = z.object({
  brand: z.enum(["FertilityFund", "MaleGenesis", "IVFCompare"]),
  type: z.string().min(2).max(80),
  payload: z.record(z.unknown())
});

export async function POST(request) {
  const json = await request.json().catch(() => null);
  const parsed = leadSchema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: "Invalid lead payload" }, { status: 400 });

  const attribution = getAttribution(request.headers);
  const score = leadScore(parsed.data);
  const supabase = getSupabaseAdmin();
  const lead = {
    brand: parsed.data.brand,
    lead_type: parsed.data.type,
    email: parsed.data.payload.email || null,
    phone: parsed.data.payload.phone || null,
    payload: parsed.data.payload,
    attribution,
    score,
    lifecycle_stage: score >= 70 ? "sales_qualified_lead" : "marketing_qualified_lead"
  };

  if (supabase) {
    const { error } = await supabase.from("fertilityos_leads").insert(lead);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const hubspot = await sendHubSpotLead({ brand: parsed.data.brand, payload: parsed.data.payload, context: attribution });
  return NextResponse.json({ ok: true, stored: Boolean(supabase), hubspot, score });
}
