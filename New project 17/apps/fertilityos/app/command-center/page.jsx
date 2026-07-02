import { BrandNav } from "../../components/BrandNav";
import { coreEvents } from "../../lib/tracking";

export const metadata = {
  title: "Command Center | KPI Dashboard",
  description: "FertilityOS command center dashboard for traffic, funnel, AI, lead, and attribution metrics."
};

const views = [
  "Traffic Analytics",
  "Funnel Conversions",
  "AI Sessions",
  "Financing Leads",
  "Clinic Leads",
  "Advertiser Leads",
  "CAC",
  "LTV",
  "Revenue Attribution",
  "Top Landing Pages",
  "Geographic Heatmaps"
];

export default function CommandCenterPage() {
  const configured = {
    Supabase: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY),
    PostHog: Boolean(process.env.NEXT_PUBLIC_POSTHOG_KEY),
    GA4: Boolean(process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID),
    HubSpot: Boolean(process.env.HUBSPOT_PORTAL_ID)
  };

  return (
    <>
      <BrandNav active="Command Center" />
      <main className="mx-auto max-w-7xl px-4 py-12">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-coral">FertilityOS Command Center</p>
        <h1 className="mt-4 max-w-4xl text-5xl font-bold leading-tight text-ink">Live KPI surface for fertility-intent intelligence.</h1>
        <section className="mt-10 grid gap-4 md:grid-cols-4">
          {Object.entries(configured).map(([name, ok]) => (
            <div key={name} className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
              <p className="text-sm font-semibold text-ink/60">{name}</p>
              <p className={`mt-2 text-2xl font-bold ${ok ? "text-moss" : "text-coral"}`}>{ok ? "Configured" : "Missing"}</p>
            </div>
          ))}
        </section>
        <section className="mt-5 grid gap-4 md:grid-cols-3">
          {views.map((view) => (
            <div key={view} className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
              <h2 className="font-bold text-ink">{view}</h2>
              <p className="mt-2 text-sm leading-6 text-ink/60">Connects to Supabase events, PostHog cohorts, GA4 traffic, and CRM lifecycle data when credentials are present.</p>
            </div>
          ))}
        </section>
        <section className="mt-5 rounded-lg border border-ink/10 bg-ink p-5 text-white shadow-soft">
          <h2 className="text-xl font-bold">Structured Events</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {coreEvents.map((event) => (
              <span key={event} className="rounded bg-white/10 px-3 py-2 text-sm">{event}</span>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
