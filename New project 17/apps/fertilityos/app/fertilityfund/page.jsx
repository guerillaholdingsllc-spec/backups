import { AIAssistant } from "../../components/AIAssistant";
import { BrandNav } from "../../components/BrandNav";
import { BenefitsLookup, CostCalculator } from "../../components/FertilityFundTools";
import { LeadForm } from "../../components/LeadForm";

export const metadata = {
  title: "FertilityFund | IVF Financing Intelligence",
  description: "Estimate IVF costs, research employer fertility benefits, and submit IVF financing inquiries."
};

export default function FertilityFundPage() {
  return (
    <>
      <BrandNav active="FertilityFund" />
      <main>
        <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
          <div className="self-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-coral">FertilityFund</p>
            <h1 className="mt-4 max-w-4xl text-5xl font-bold leading-tight text-ink sm:text-6xl">
              IVF financing and benefits intelligence for real decisions.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/70">
              Estimate costs, understand employer coverage questions, and route financing inquiries with structured attribution and lead scoring.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="focus-ring rounded-md bg-ink px-5 py-3 font-bold text-white" href="#calculator">Calculate costs</a>
              <a className="focus-ring rounded-md border border-ink/15 bg-white px-5 py-3 font-bold text-ink" href="#financing">Start inquiry</a>
            </div>
          </div>
          <div className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
            <div className="aspect-[4/3] rounded-md bg-[linear-gradient(135deg,#d9eef4,#f7d8d0_55%,#fbfaf7)] p-6">
              <div className="grid h-full content-between">
                <p className="text-sm font-bold text-ink/65">Live MVP modules</p>
                <div className="grid gap-3">
                  {["Cost calculator", "Employer lookup", "AI financial assistant", "Lead capture", "Event analytics"].map((item) => (
                    <div key={item} className="rounded-md bg-white/80 px-4 py-3 font-semibold text-ink shadow-sm">{item}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="calculator" className="mx-auto grid max-w-7xl gap-5 px-4 py-8 lg:grid-cols-2">
          <CostCalculator />
          <BenefitsLookup />
        </section>
        <section className="mx-auto grid max-w-7xl gap-5 px-4 py-8 lg:grid-cols-2">
          <AIAssistant brand="FertilityFund" assistant="financial" title="AI IVF Financial Assistant" starter="How should I think about IVF costs, employer benefits, and financing questions?" />
          <div id="financing">
            <LeadForm
              brand="FertilityFund"
              type="financing"
              title="Financing Inquiry Funnel"
              eventName="financing_inquiry_submitted"
              fields={["firstName", "lastName", "email", "phone", "employer", "state"]}
            />
          </div>
        </section>
        <ComplianceBand />
      </main>
    </>
  );
}

function ComplianceBand() {
  return (
    <section className="border-t border-ink/10 bg-white/65">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-8 text-sm leading-6 text-ink/65 md:grid-cols-3">
        <p>Educational only. FertilityFund does not provide medical, legal, insurance, or lending advice.</p>
        <p>Financing inquiries are routed only when production HubSpot and Supabase credentials are configured.</p>
        <p>Advertising and partner recommendations must be disclosed and tracked by source, lifecycle stage, and conversion event.</p>
      </div>
    </section>
  );
}
