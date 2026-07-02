export const coreEvents = [
  "page_view",
  "calculator_completed",
  "benefits_lookup_completed",
  "financing_inquiry_submitted",
  "email_captured",
  "ai_session_started",
  "ai_message_sent",
  "quiz_completed",
  "clinic_compare_interaction",
  "clinic_inquiry_submitted"
];

export function getAttribution(headers) {
  return {
    referer: headers.get("referer") || null,
    userAgent: headers.get("user-agent") || null,
    ipCountry: headers.get("x-vercel-ip-country") || null,
    ipCity: headers.get("x-vercel-ip-city") || null,
    ipRegion: headers.get("x-vercel-ip-country-region") || null
  };
}

export function leadScore({ brand, type, payload }) {
  let score = 15;
  if (brand === "FertilityFund" && type === "financing") score += 35;
  if (brand === "IVFCompare" && type === "clinic") score += 30;
  if (brand === "MaleGenesis" && type === "coach") score += 20;
  if (payload?.email) score += 20;
  if (payload?.phone) score += 10;
  if (payload?.state || payload?.location) score += 10;
  return Math.min(score, 100);
}
