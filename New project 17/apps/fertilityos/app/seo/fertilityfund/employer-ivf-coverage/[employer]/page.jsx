import { BrandNav } from "../../../../../components/BrandNav";
import { employers, titleCaseSlug } from "../../../../../lib/seoData";

export function generateStaticParams() {
  return employers.map((employer) => ({ employer }));
}

export async function generateMetadata({ params }) {
  const { employer } = await params;
  const name = titleCaseSlug(employer);
  return { title: `${name} IVF Coverage Questions`, description: `Educational fertility benefits research page for ${name} employees.` };
}

export default async function EmployerPage({ params }) {
  const { employer } = await params;
  const name = titleCaseSlug(employer);
  return (
    <>
      <BrandNav active="FertilityFund" />
      <main className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-4xl font-bold text-ink">{name} IVF Coverage Questions</h1>
        <p className="mt-5 text-lg leading-8 text-ink/70">
          Use this page to prepare HR and benefits questions about fertility coverage, plan exclusions, lifetime maximums, medication benefits, preauthorization, and network rules.
        </p>
        <a className="focus-ring mt-8 inline-block rounded-md bg-ink px-5 py-3 font-bold text-white" href="/fertilityfund#financing">Start a financing inquiry</a>
      </main>
    </>
  );
}
