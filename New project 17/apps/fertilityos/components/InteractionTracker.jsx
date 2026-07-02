"use client";

import posthog from "posthog-js";

export function trackInteraction(name, brand, properties = {}) {
  if (process.env.NEXT_PUBLIC_POSTHOG_KEY && posthog.__loaded) {
    posthog.capture(name, { brand, ...properties });
  }
  if (window.gtag && process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID) {
    window.gtag("event", name, { brand, ...properties });
  }
  return fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, brand, path: window.location.pathname, properties })
  }).catch(() => {});
}
