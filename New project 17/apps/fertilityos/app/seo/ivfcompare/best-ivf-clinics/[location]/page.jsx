import { BrandNav } from "../../../../../components/BrandNav";
import { clinicLocations, titleCaseSlug } from "../../../../../lib/seoData";

export function generateStaticParams() {
  return clinicLocations.map((location) => ({ location }));
}

export async function generateMetadata({ params }) {
  const { location } = await params;
  return { title: `Best IVF Clinics in ${titleCaseSlug(location)}` };
}

export default async function ClinicLocationPage({ params }) {
  const { location } = await params;
  return (
    <>
      <BrandNav active="IVFCompare" />
      <main className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-4xl font-bold text-ink">Best IVF Clinics in {titleCaseSlug(location)}</h1>
        <p className="mt-5 text-lg leading-8 text-ink/70">
          Compare clinic fit using services, patient volume context, success-rate caveats, geography, transparency, financing workflows, and inquiry responsiveness.
        </p>
        <a className="focus-ring mt-8 inline-block rounded-md bg-gold px-5 py-3 font-bold text-white" href="/ivfcompare">Compare clinics</a>
      </main>
    </>
  );
}
