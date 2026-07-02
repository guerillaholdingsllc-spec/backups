"use client";

import { useState } from "react";
import { trackInteraction } from "./InteractionTracker";

export function LeadForm({ brand, type, title, fields = ["email", "state"], eventName }) {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    setStatus("sending");
    setError("");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brand, type, payload })
      });
      if (!response.ok) throw new Error("Lead capture failed");
      await trackInteraction(eventName || "email_captured", brand, { type, hasEmail: Boolean(payload.email) });
      setStatus("sent");
      event.currentTarget.reset();
    } catch (err) {
      setError(err.message);
      setStatus("idle");
    }
  }

  return (
    <form onSubmit={submit} className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
      <h3 className="text-xl font-bold text-ink">{title}</h3>
      <div className="mt-4 grid gap-3">
        {fields.includes("firstName") && <Field name="firstName" label="First name" />}
        {fields.includes("lastName") && <Field name="lastName" label="Last name" />}
        {fields.includes("email") && <Field name="email" label="Email" type="email" required />}
        {fields.includes("phone") && <Field name="phone" label="Phone" />}
        {fields.includes("employer") && <Field name="employer" label="Employer" />}
        {fields.includes("state") && <Field name="state" label="State" />}
        {fields.includes("location") && <Field name="location" label="City or clinic market" />}
        <label className="grid gap-2 text-sm font-semibold text-ink/70">
          What are you trying to solve?
          <textarea name="interest" className="focus-ring min-h-24 rounded-md border border-ink/15 px-3 py-2" />
        </label>
      </div>
      <button className="focus-ring mt-4 w-full rounded-md bg-moss px-4 py-3 font-bold text-white" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : status === "sent" ? "Received" : "Submit inquiry"}
      </button>
      {error && <p className="mt-3 text-sm text-coral">{error}</p>}
      <p className="mt-3 text-xs leading-5 text-ink/55">
        Educational navigation only. FertilityOS does not provide medical diagnosis, treatment, lending approval, or insurance coverage guarantees.
      </p>
    </form>
  );
}

function Field({ name, label, type = "text", required = false }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-ink/70">
      {label}
      <input required={required} name={name} type={type} className="focus-ring rounded-md border border-ink/15 px-3 py-2" />
    </label>
  );
}
