"use client";

import { useState } from "react";
import { trackInteraction } from "./InteractionTracker";

export function CostCalculator() {
  const [result, setResult] = useState(null);

  async function calculate(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const cycleCost = Number(form.get("cycleCost") || 0);
    const medication = Number(form.get("medication") || 0);
    const cycles = Number(form.get("cycles") || 1);
    const coverage = Number(form.get("coverage") || 0);
    const total = Math.max(0, (cycleCost + medication) * cycles - coverage);
    setResult(total);
    await trackInteraction("calculator_completed", "FertilityFund", { cycles, total, state: form.get("state") });
  }

  return (
    <form onSubmit={calculate} className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
      <h3 className="text-xl font-bold text-ink">IVF Cost Calculator</h3>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Input name="cycleCost" label="Clinic cycle quote" defaultValue="14000" />
        <Input name="medication" label="Medication estimate" defaultValue="5000" />
        <Input name="cycles" label="Expected cycles" defaultValue="1" />
        <Input name="coverage" label="Insurance or employer coverage" defaultValue="0" />
        <label className="grid gap-2 text-sm font-semibold text-ink/70 sm:col-span-2">
          State
          <input name="state" className="focus-ring rounded-md border border-ink/15 px-3 py-2" placeholder="CA" />
        </label>
      </div>
      <button className="focus-ring mt-4 rounded-md bg-coral px-4 py-3 font-bold text-white">Calculate out-of-pocket estimate</button>
      {result !== null && (
        <div className="mt-4 rounded-md bg-skyglass p-4">
          <p className="text-sm font-semibold text-ink/65">Estimated out-of-pocket</p>
          <p className="text-3xl font-bold text-ink">${result.toLocaleString()}</p>
        </div>
      )}
    </form>
  );
}

export function BenefitsLookup() {
  const [message, setMessage] = useState("");

  async function submit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setMessage("Coverage varies by plan. Use this as a research prompt for HR or your benefits administrator.");
    await trackInteraction("benefits_lookup_completed", "FertilityFund", {
      employer: form.get("employer"),
      state: form.get("state")
    });
  }

  return (
    <form onSubmit={submit} className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
      <h3 className="text-xl font-bold text-ink">Employer IVF Benefits Lookup</h3>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Input name="employer" label="Employer" defaultValue="" />
        <Input name="state" label="State" defaultValue="" />
      </div>
      <button className="focus-ring mt-4 rounded-md bg-ink px-4 py-3 font-bold text-white">Check benefit questions</button>
      {message && <p className="mt-4 rounded-md bg-petal p-4 text-sm leading-6 text-ink/75">{message}</p>}
    </form>
  );
}

function Input({ name, label, defaultValue }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-ink/70">
      {label}
      <input name={name} defaultValue={defaultValue} className="focus-ring rounded-md border border-ink/15 px-3 py-2" />
    </label>
  );
}
