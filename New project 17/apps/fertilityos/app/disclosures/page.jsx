import { BrandNav } from "../../components/BrandNav";

export const metadata = { title: "Disclosures" };

export default function DisclosuresPage() {
  return (
    <>
      <BrandNav />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-4xl font-bold text-ink">Medical, Advertising, and AI Disclosures</h1>
        <p className="mt-5 leading-7 text-ink/70">
          FertilityOS content and AI assistants are educational only. They do not diagnose, prescribe, recommend treatment, guarantee outcomes, confirm insurance coverage, or approve financing.
        </p>
        <p className="mt-4 leading-7 text-ink/70">
          Partner, advertiser, clinic, telehealth, financing, and supplement routing must be disclosed and attributed in analytics before production activation.
        </p>
      </main>
    </>
  );
}
