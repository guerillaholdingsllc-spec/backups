import { BrandNav } from "../../../../../components/BrandNav";
import { states, titleCaseSlug } from "../../../../../lib/seoData";

export function generateStaticParams() {
  return states.map((state) => ({ state }));
}

export async function generateMetadata({ params }) {
  const { state } = await params;
  return { title: `IVF Financing in ${titleCaseSlug(state)}` };
}

export default async function FinancingPage({ params }) {
  const { state } = await params;
  return (
    <>
      <BrandNav active="FertilityFund" />
      <main className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-4xl font-bold text-ink">IVF Financing in {titleCaseSlug(state)}</h1>
        <p className="mt-5 text-lg leading-8 text-ink/70">
          Compare financing questions, insurance gaps, cycle timing, and clinic payment policies. FertilityFund does not approve loans or quote rates.
        </p>
        <a className="focus-ring mt-8 inline-block rounded-md bg-coral px-5 py-3 font-bold text-white" href="/fertilityfund#financing">Submit inquiry</a>
      </main>
    </>
  );
}
