# FertilityOS Deployment Status

Created: 2026-05-16
Owner agent: Master Garmon
Project: FertilityOS
Primary launch brand: FertilityFund

## Live Deployment

- Parent/admin Vercel project: `fertilityos`
- Parent/admin alias: `https://fertilityos.vercel.app`
- Standalone brand project: `fertilityfund`
- Standalone brand project: `malegenesis`
- Standalone brand project: `ivfcompare`
- Brand URL: `https://fertilityfund.vercel.app` - HTTP 200 confirmed after production redeploy
- Brand URL: `https://malegenesis.vercel.app` - HTTP 200 confirmed after production redeploy
- Brand URL: `https://ivfcompare.vercel.app` - HTTP 200 confirmed after production redeploy
- Public pages verified from outside-facing Vercel aliases, not localhost.
- Vercel SSO/password protection: disabled for public access.

## Verified Runtime

- Supabase schema deployed.
- RLS enabled on:
  - `fertilityos_events`
  - `fertilityos_leads`
  - `fertilityos_ai_sessions`
- Production `/api/events` write test: `stored: true`.
- Production `/api/leads` write test on all three standalone brand sites: `stored: true`.
- Production `/api/leads` consent rejection test on all three standalone brand sites: HTTP 400.
- Production `/api/leads` auto-reply test on all three standalone brand sites: `auto_reply_sent: true`.
- Production `/api/inquiry-respond` Brevo test: `auto_reply_sent: true`.
- Brevo API key verified with Brevo account endpoint after IP allowlist was unblocked.
- Production `/api/ai` behavior: returns compliant educational fallback when OpenAI returns rate limit.

## Active Brand Routes

- FertilityFund root: `https://fertilityfund.vercel.app`
- MaleGenesis root: `https://malegenesis.vercel.app`
- IVFCompare root: `https://ivfcompare.vercel.app`
- Each brand has its own `/api/leads`, `/api/events`, and `/api/inquiry-respond` routes.
- Parent/admin command center remains separate on the `fertilityos` project and should remain admin-only.

## Remaining Integrations

- HubSpot routing is not configured yet.
- PostHog project key is not configured yet.
- GA4 measurement ID is not configured yet.
- OpenAI key exists, but live request returned `429`; billing/quota or model access should be checked before promoting AI as fully active.
- Lead handoff buyer/partner is not selected yet. Current model stores consented leads, sends a 24-48 hour auto-response, scores the inquiry, and leaves records pending for handoff/sale.

## Domain Notes

The app is live on Vercel. The original ecosystem target is:

- `trustchainservices.com/fertilityfund`
- `trustchainservices.com/malegenesis`
- `trustchainservices.com/ivfcompare`

Do not point the root `trustchainservices.com` domain at this Vercel project unless replacing the existing site is intended. Safer next step is a Cloudflare Worker/proxy route for only the FertilityOS paths, including required Next.js assets, after confirming the existing site's asset paths will not conflict.

Brand-specific Vercel URLs are now suitable for immediate exposure while `trustchainservices.com` routing is completed:

- FertilityFund: `https://fertilityfund.vercel.app`
- MaleGenesis: `https://malegenesis.vercel.app`
- IVFCompare: `https://ivfcompare.vercel.app`
