"use client";

import { useState } from "react";
import { trackInteraction } from "./InteractionTracker";

const sampleClinics = [
  { name: "Pacific Fertility Center", city: "Los Angeles", services: "IVF, egg freezing, donor programs" },
  { name: "Metro Reproductive Health", city: "New York", services: "IVF, genetic testing, fertility preservation" },
  { name: "Lone Star Fertility", city: "Austin", services: "IVF, IUI, male fertility coordination" }
];

export function ClinicCompare() {
  const [selected, setSelected] = useState([]);

  async function toggle(clinic) {
    const next = selected.includes(clinic) ? selected.filter((item) => item !== clinic) : [...selected, clinic];
    setSelected(next);
    await trackInteraction("clinic_compare_interaction", "IVFCompare", { clinic, selectedCount: next.length });
  }

  return (
    <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
      <h3 className="text-xl font-bold text-ink">Compare IVF Clinics</h3>
      <div className="mt-4 grid gap-3">
        {sampleClinics.map((clinic) => (
          <button
            key={clinic.name}
            onClick={() => toggle(clinic.name)}
            className={`focus-ring rounded-md border p-4 text-left ${
              selected.includes(clinic.name) ? "border-moss bg-skyglass" : "border-ink/10 bg-white"
            }`}
          >
            <span className="block font-bold text-ink">{clinic.name}</span>
            <span className="block text-sm text-ink/65">{clinic.city} | {clinic.services}</span>
          </button>
        ))}
      </div>
      <p className="mt-4 text-sm text-ink/60">Success-rate interpretation requires context such as age bands, diagnosis mix, transfer type, and reporting period.</p>
    </section>
  );
}
