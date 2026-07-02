import { NextResponse } from "next/server";
import { z } from "zod";
import { runAssistant } from "../../../lib/openai";
import { getSupabaseAdmin } from "../../../lib/supabase";

const aiSchema = z.object({
  assistant: z.enum(["financial", "male", "clinic"]),
  brand: z.string().min(2).max(80),
  message: z.string().min(2).max(4000),
  sessionId: z.string().optional()
});

export async function POST(request) {
  const json = await request.json().catch(() => null);
  const parsed = aiSchema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: "Invalid AI payload" }, { status: 400 });

  let answer;
  try {
    answer = await runAssistant(parsed.data);
  } catch (error) {
    answer = {
      configured: false,
      text:
        "The AI assistant is temporarily unavailable. FertilityOS can still help you organize educational questions for a licensed clinician, benefits administrator, lender, or clinic. Educational only; not medical, insurance, or financing advice."
    };
  }
  const supabase = getSupabaseAdmin();
  if (supabase) {
    await supabase.from("fertilityos_ai_sessions").insert({
      brand: parsed.data.brand,
      assistant: parsed.data.assistant,
      session_id: parsed.data.sessionId || null,
      user_message: parsed.data.message,
      assistant_response: answer.text,
      configured: answer.configured
    });
  }

  return NextResponse.json({ ok: true, ...answer });
}
