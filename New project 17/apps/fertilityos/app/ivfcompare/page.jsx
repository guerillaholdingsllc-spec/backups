import { AIAssistant } from "../../components/AIAssistant";
import { BrandNav } from "../../components/BrandNav";
import { ClinicCompare } from "../../components/ClinicCompare";
import { LeadForm } from "../../components/LeadForm";

export const metadata = {
  title: "IVFCompare | Clinic Comparison Intelligence",
  description: "Compare IVF clinics, interpret success-rate context, and submit clinic inquiry interest."
};

export default function IVFComparePage() {
  return (
    <>
      <BrandNav active="IVFCompare" />
      <main className="mx-auto max-w-7xl px-4 py-12">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold">IVFCompare</p>
        <h1 className="mt-4 max-w-4xl text-5xl font-bold leading-tight text-ink">Clinic comparison for IVF decisions with context.</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-ink/70">
          Compare clinics, explore success-rate interpretation, and capture clinic inquiry intent by market and attribution source.
        </p>
        <section className="mt-10 grid gap-5 lg:grid-cols-2">
          <ClinicCompare />
          <AIAssistant brand="IVFCompare" assistant="clinic" title="AI Clinic Match Assistant" starter="What criteria should I compare before contacting IVF clinics?" />
        </section>
        <section className="mt-5 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
            <h2 className="text-xl font-bold text-ink">IVF Success Rates Explorer</h2>
            <p className="mt-3 text-sm leading-6 text-ink/70">
              Production clinic metrics should come from licensed, cited datasets or clinic-provided feeds. This MVP avoids fabricating success rates and stores comparison intent only.
            </p>
            <h2 className="mt-6 text-xl font-bold text-ink">Geographic Clinic Pages</h2>
            <p className="mt-3 text-sm leading-6 text-ink/70">
              Programmatic pages are generated for priority markets and can be expanded from real clinic data once a source is connected.
            </p>
          </div>
          <LeadForm brand="IVFCompare" type="clinic" title="Clinic Inquiry Funnel" eventName="clinic_inquiry_submitted" fields={["firstName", "email", "phone", "location", "state"]} />
        </section>
      </main>
    </>
  );
}
