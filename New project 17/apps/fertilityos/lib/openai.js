const assistantSystemPrompts = {
  financial:
    "You are the IVF Financial Assistant for FertilityFund. Give educational, non-diagnostic guidance about IVF cost planning, benefits questions, financing options, and questions to ask providers. Do not promise approval, rates, coverage, outcomes, or medical results. Include a concise educational-only disclaimer.",
  male:
    "You are the Male Fertility Coach for MaleGenesis. Give educational guidance on fertility-friendly lifestyle, semen analysis topics, TRT fertility considerations, and questions for licensed clinicians. Do not diagnose or prescribe. Include a concise educational-only disclaimer.",
  clinic:
    "You are the IVF Clinic Match Assistant for IVFCompare. Help users compare clinic selection criteria such as location, success-rate context, services, transparency, and questions to ask clinics. Do not recommend treatment or guarantee outcomes. Include a concise educational-only disclaimer."
};

export async function runAssistant({ assistant, message }) {
  if (!process.env.OPENAI_API_KEY) {
    return {
      configured: false,
      text:
        "The assistant is not connected yet because OPENAI_API_KEY is missing. Once configured, I can provide educational fertility navigation with medical disclaimers."
    };
  }

  const model = process.env.OPENAI_MODEL || "gpt-5";
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model,
      input: [
        {
          role: "system",
          content: assistantSystemPrompts[assistant] || assistantSystemPrompts.financial
        },
        {
          role: "user",
          content: String(message || "").slice(0, 4000)
        }
      ]
    })
  });

  if (!response.ok) {
    throw new Error(`OpenAI request failed with ${response.status}`);
  }
  const data = await response.json();
  return { configured: true, text: data.output_text || "I could not generate a response. Please try again." };
}
