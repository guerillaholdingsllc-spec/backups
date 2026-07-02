"use client";

import { useState } from "react";
import { trackInteraction } from "./InteractionTracker";

export function MaleGenesisQuiz() {
  const [score, setScore] = useState(null);

  async function submit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const total = ["age", "sleep", "trt", "analysis"].reduce((sum, key) => sum + Number(form.get(key) || 0), 0);
    setScore(total);
    await trackInteraction("quiz_completed", "MaleGenesis", { score: total });
  }

  return (
    <form onSubmit={submit} className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
      <h3 className="text-xl font-bold text-ink">Male Fertility Score Quiz</h3>
      <Select name="age" label="Age range" options={[["25", "Under 35"], ["18", "35-39"], ["12", "40+"]]} />
      <Select name="sleep" label="Sleep quality" options={[["25", "Consistent"], ["15", "Mixed"], ["8", "Poor"]]} />
      <Select name="trt" label="TRT or hormone use" options={[["25", "No"], ["12", "Considering"], ["5", "Current or recent"]]} />
      <Select name="analysis" label="Recent semen analysis" options={[["25", "Yes"], ["12", "Planned"], ["5", "No"]]} />
      <button className="focus-ring mt-4 rounded-md bg-moss px-4 py-3 font-bold text-white">Calculate score</button>
      {score !== null && <p className="mt-4 rounded-md bg-skyglass p-4 text-2xl font-bold text-ink">Educational readiness score: {score}/100</p>}
    </form>
  );
}

function Select({ name, label, options }) {
  return (
    <label className="mt-4 grid gap-2 text-sm font-semibold text-ink/70">
      {label}
      <select name={name} className="focus-ring rounded-md border border-ink/15 px-3 py-2">
        {options.map(([value, text]) => (
          <option key={value} value={value}>
            {text}
          </option>
        ))}
      </select>
    </label>
  );
}
