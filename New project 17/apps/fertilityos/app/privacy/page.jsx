import { BrandNav } from "../../components/BrandNav";

export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <>
      <BrandNav />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-4xl font-bold text-ink">Privacy Policy</h1>
        <p className="mt-5 leading-7 text-ink/70">
          FertilityOS collects information submitted through forms, calculators, quizzes, and AI sessions for product analytics, attribution, lead routing, and service follow-up. Production storage uses Supabase, PostHog, GA4, and HubSpot only when configured with real credentials.
        </p>
        <p className="mt-4 leading-7 text-ink/70">
          Do not submit emergency, diagnostic, or sensitive treatment instructions. FertilityOS provides educational navigation and is not a medical provider.
        </p>
      </main>
    </>
  );
}
