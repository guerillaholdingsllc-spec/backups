import { NextResponse } from "next/server";
import { sendAutoReply } from "../../../lib/backend";

export async function POST(request) {
  const payload = await request.json().catch(() => ({}));
  const result = await sendAutoReply(payload);
  return NextResponse.json({ ok: result.sent, auto_reply_sent: result.sent });
}
