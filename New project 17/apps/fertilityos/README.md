# FertilityOS MVP

Deployable Next.js MVP for FertilityFund, MaleGenesis, IVFCompare, and the FertilityOS command center.

## Required production variables

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_POSTHOG_KEY`
- `NEXT_PUBLIC_GA4_MEASUREMENT_ID`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY`
- `OPENAI_MODEL`
- `HUBSPOT_PORTAL_ID`
- `HUBSPOT_FINANCING_FORM_GUID`
- `HUBSPOT_MALEGENESIS_FORM_GUID`
- `HUBSPOT_CLINIC_FORM_GUID`

Run `supabase/schema.sql` in Supabase before enabling event and lead storage.
