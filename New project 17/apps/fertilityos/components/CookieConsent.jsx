"use client";

import { useEffect, useState } from "react";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(localStorage.getItem("fertilityos_cookie_consent") !== "accepted");
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-4xl rounded-lg border border-ink/10 bg-white p-4 shadow-soft">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-6 text-ink/75">
          FertilityOS uses cookies and event tracking for attribution, funnel analytics, and product improvement. Educational content is not medical advice.
        </p>
        <button
          className="focus-ring rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white"
          onClick={() => {
            localStorage.setItem("fertilityos_cookie_consent", "accepted");
            setVisible(false);
          }}
        >
          Accept
        </button>
      </div>
    </div>
  );
}
