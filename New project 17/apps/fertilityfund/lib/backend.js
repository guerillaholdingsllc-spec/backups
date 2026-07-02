import { createClient } from "@supabase/supabase-js";

export const BRAND = "FertilityFund";
export const LEAD_TYPE = "financing";

export function supabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase environment is not configured.");
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

export function leadScore(payload = {}) {
  let score = 45;
  if (payload.email) score += 15;
  if (payload.phone) score += 10;
  if (payload.employer) score += 20;
  if (payload.state) score += 10;
  if ((payload.interest || "").length > 40) score += 10;
  return Math.min(score, 100);
}

export function autoReplyHtml(payload = {}) {
  return `<p>Hi ${payload.firstName || "there"},</p>
<p>Thank you for submitting your FertilityFund inquiry. We received your IVF financing and benefits question, and someone will review it for follow-up within 24-48 hours.</p>
<p>While you wait, gather your clinic quote, medication estimate, insurance summary, and employer fertility-benefits booklet or HR portal link.</p>
<p>Educational only. FertilityFund does not provide medical, insurance, or lending advice and cannot guarantee coverage, approval, rates, or outcomes.</p>`;
}

export async function sendAutoReply(payload = {}) {
  if (!process.env.BREVO_API_KEY || !payload.email) return { sent: false, reason: "missing_config_or_email" };
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "Content-Type": "application/json", "api-key": process.env.BREVO_API_KEY },
    body: JSON.stringify({
      sender: { email: process.env.BREVO_SENDER_EMAIL || "guerillaholdingsllc@gmail.com", name: process.env.BREVO_SENDER_NAME || BRAND },
      to: [{ email: payload.email, name: payload.firstName || undefined }],
      subject: "We received your FertilityFund inquiry",
      htmlContent: autoReplyHtml(payload)
    })
  });
  if (!response.ok) return { sent: false, status: response.status };
  return { sent: true };
}
