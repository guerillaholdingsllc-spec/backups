import { AIAssistant } from "../../components/AIAssistant";
import { BrandNav } from "../../components/BrandNav";
import { LeadForm } from "../../components/LeadForm";
import { MaleGenesisQuiz } from "../../components/MaleGenesisQuiz";

export const metadata = {
  title: "MaleGenesis | Male Fertility Optimization",
  description: "Male fertility education, TRT fertility questions, score quiz, and educational AI coaching."
};

export default function MaleGenesisPage() {
  return (
    <>
      <BrandNav active="MaleGenesis" />
      <main className="mx-auto max-w-7xl px-4 py-12">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-moss">MaleGenesis</p>
        <h1 className="mt-4 max-w-4xl text-5xl font-bold leading-tight text-ink">Male fertility intelligence before the clinic visit.</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-ink/70">
          Score fertility readiness, learn about TRT and fertility tradeoffs, and route supplement or telehealth interest without making diagnostic claims.
        </p>
        <section className="mt-10 grid gap-5 lg:grid-cols-2">
          <MaleGenesisQuiz />
          <AIAssistant brand="MaleGenesis" assistant="male" title="AI Fertility Coach" starter="What should men ask a clinician before starting TRT if fertility matters?" />
        </section>
        <section className="mt-5 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
            <h2 className="text-xl font-bold text-ink">TRT & Fertility Education</h2>
            <p className="mt-3 text-sm leading-6 text-ink/70">
              The MVP frames TRT as a clinician-led decision and explains questions around semen analysis, hormone labs, sperm preservation, and fertility goals.
            </p>
            <h2 className="mt-6 text-xl font-bold text-ink">Routing Structure</h2>
            <p className="mt-3 text-sm leading-6 text-ink/70">
              Captured leads can be segmented for education, supplement interest, telehealth interest, and partner attribution once production CRM credentials are present.
            </p>
          </div>
          <LeadForm brand="MaleGenesis" type="coach" title="Lead Capture" eventName="lead_captured" fields={["firstName", "email", "phone", "state"]} />
        </section>
      </main>
    </>
  );
}
