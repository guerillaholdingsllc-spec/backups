import { BrandNav } from "../../../../../components/BrandNav";
import { states, titleCaseSlug } from "../../../../../lib/seoData";

export function generateStaticParams() {
  return states.map((state) => ({ state }));
}

export async function generateMetadata({ params }) {
  const { state } = await params;
  const place = titleCaseSlug(state);
  return { title: `IVF Cost in ${place}`, description: `Educational IVF cost planning page for ${place}.` };
}

export default async function StateCostPage({ params }) {
  const { state } = await params;
  const place = titleCaseSlug(state);
  return <SeoPage title={`IVF Cost in ${place}`} body={`Plan IVF cost questions in ${place}, including clinic quotes, medication estimates, employer benefits, financing inquiries, and attribution-ready lead capture.`} />;
}

function SeoPage({ title, body }) {
  return (
    <>
      <BrandNav active="FertilityFund" />
      <main className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-4xl font-bold text-ink">{title}</h1>
        <p className="mt-5 text-lg leading-8 text-ink/70">{body}</p>
        <a className="focus-ring mt-8 inline-block rounded-md bg-coral px-5 py-3 font-bold text-white" href="/fertilityfund#calculator">Use the IVF calculator</a>
      </main>
    </>
  );
}
