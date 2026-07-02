import { BrandNav } from "../../../../components/BrandNav";
import { maleTopics, titleCaseSlug } from "../../../../lib/seoData";

export function generateStaticParams() {
  return maleTopics.map((topic) => ({ topic }));
}

export async function generateMetadata({ params }) {
  const { topic } = await params;
  return { title: titleCaseSlug(topic) };
}

export default async function MaleTopicPage({ params }) {
  const { topic } = await params;
  return (
    <>
      <BrandNav active="MaleGenesis" />
      <main className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-4xl font-bold text-ink">{titleCaseSlug(topic)}</h1>
        <p className="mt-5 text-lg leading-8 text-ink/70">
          Educational guidance for male fertility optimization, clinician questions, semen analysis context, and fertility-friendly lifestyle planning.
        </p>
        <a className="focus-ring mt-8 inline-block rounded-md bg-moss px-5 py-3 font-bold text-white" href="/malegenesis">Take the score quiz</a>
      </main>
    </>
  );
}
