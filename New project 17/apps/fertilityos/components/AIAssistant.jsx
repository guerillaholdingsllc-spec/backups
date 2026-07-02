"use client";

import { useMemo, useState } from "react";
import { trackInteraction } from "./InteractionTracker";

export function AIAssistant({ brand, assistant, title, starter }) {
  const [message, setMessage] = useState(starter || "");
  const [answer, setAnswer] = useState("");
  const [busy, setBusy] = useState(false);
  const sessionId = useMemo(() => crypto.randomUUID(), []);

  async function ask(event) {
    event.preventDefault();
    setBusy(true);
    await trackInteraction("ai_session_started", brand, { assistant });
    const response = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ brand, assistant, message, sessionId })
    });
    const data = await response.json();
    setAnswer(data.text || data.error || "No response available.");
    await trackInteraction("ai_message_sent", brand, { assistant, configured: data.configured });
    setBusy(false);
  }

  return (
    <section className="rounded-lg border border-ink/10 bg-ink p-5 text-white shadow-soft">
      <h3 className="text-xl font-bold">{title}</h3>
      <form onSubmit={ask} className="mt-4 grid gap-3">
        <textarea
          className="focus-ring min-h-28 rounded-md border border-white/20 bg-white/10 p-3 text-white placeholder:text-white/55"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Ask an educational fertility navigation question"
        />
        <button className="focus-ring rounded-md bg-petal px-4 py-3 font-bold text-ink" disabled={busy || message.length < 2}>
          {busy ? "Thinking..." : "Ask assistant"}
        </button>
      </form>
      {answer && <p className="mt-4 whitespace-pre-wrap rounded-md bg-white/10 p-4 text-sm leading-6 text-white/88">{answer}</p>}
    </section>
  );
}
