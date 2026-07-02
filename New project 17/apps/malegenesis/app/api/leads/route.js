import { NextResponse } from "next/server";
import { z } from "zod";
import { BRAND, LEAD_TYPE, leadScore, sendAutoReply, supabaseAdmin } from "../../../lib/backend";

const Schema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1).optional(),
  phone: z.string().optional(),
  state: z.string().optional(),
  trtStatus: z.string().optional(),
  interest: z.string().min(2),
  consentToPartnerFollowUp: z.literal(true)
});

export async function POST(request) {
  const parsed = Schema.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success) return NextResponse.json({ stored: false, error: "valid consented lead required" }, { status: 400 });
  const payload = { ...parsed.data, consentCapturedAt: new Date().toISOString(), sourceHost: request.headers.get("host") };
  const score = leadScore(payload);
  const supabase = supabaseAdmin();
  const { error } = await supabase.from("fertilityos_leads").insert({
    brand: BRAND,
    lead_type: LEAD_TYPE,
    email: payload.email,
    phone: payload.phone || null,
    payload: { ...payload, autoReplyStatus: "pending" },
    attribution: { referer: request.headers.get("referer"), userAgent: request.headers.get("user-agent") },
    score,
    lifecycle_stage: score >= 75 ? "qualified_pending_handoff" : "validated_pending_handoff"
  });
  if (error) return NextResponse.json({ stored: false, error: error.message }, { status: 500 });
  const autoReply = await sendAutoReply(payload);
  return NextResponse.json({ stored: true, auto_reply_sent: autoReply.sent, score });
}
