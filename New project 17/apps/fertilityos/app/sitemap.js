import { clinicLocations, employers, maleTopics, states } from "../lib/seoData";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://trustchainservices.com";

export default function sitemap() {
  const staticRoutes = ["", "/fertilityfund", "/malegenesis", "/ivfcompare", "/command-center", "/privacy", "/disclosures"];
  return [
    ...staticRoutes.map((route) => ({ url: `${baseUrl}${route}`, lastModified: new Date() })),
    ...states.flatMap((state) => [
      { url: `${baseUrl}/seo/fertilityfund/ivf-cost-by-state/${state}`, lastModified: new Date() },
      { url: `${baseUrl}/seo/fertilityfund/ivf-financing/${state}`, lastModified: new Date() }
    ]),
    ...employers.map((employer) => ({ url: `${baseUrl}/seo/fertilityfund/employer-ivf-coverage/${employer}`, lastModified: new Date() })),
    ...maleTopics.map((topic) => ({ url: `${baseUrl}/seo/malegenesis/${topic}`, lastModified: new Date() })),
    ...clinicLocations.map((location) => ({ url: `${baseUrl}/seo/ivfcompare/best-ivf-clinics/${location}`, lastModified: new Date() }))
  ];
}
