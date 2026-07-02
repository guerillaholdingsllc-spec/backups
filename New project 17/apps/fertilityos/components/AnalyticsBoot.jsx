"use client";

import posthog from "posthog-js";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function AnalyticsInner() {
  const pathname = usePathname();
  const params = useSearchParams();

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (key && !posthog.__loaded) {
      posthog.init(key, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
        capture_pageview: false
      });
    }

    const ga4 = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
    if (ga4 && !document.querySelector(`script[data-ga4="${ga4}"]`)) {
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${ga4}`;
      script.dataset.ga4 = ga4;
      document.head.appendChild(script);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() {
        window.dataLayer.push(arguments);
      };
      window.gtag("js", new Date());
    }
  }, []);

  useEffect(() => {
    const search = params.toString();
    const url = `${pathname}${search ? `?${search}` : ""}`;
    if (process.env.NEXT_PUBLIC_POSTHOG_KEY && posthog.__loaded) {
      posthog.capture("$pageview", { path: pathname, url });
    }
    if (window.gtag && process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID) {
      window.gtag("config", process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID, { page_path: url });
    }
    fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "page_view",
        brand: pathname.includes("malegenesis") ? "MaleGenesis" : pathname.includes("ivfcompare") ? "IVFCompare" : "FertilityFund",
        path: pathname,
        properties: Object.fromEntries(params.entries())
      })
    }).catch(() => {});
  }, [pathname, params]);

  return null;
}

export function AnalyticsBoot() {
  return (
    <Suspense fallback={null}>
      <AnalyticsInner />
    </Suspense>
  );
}
