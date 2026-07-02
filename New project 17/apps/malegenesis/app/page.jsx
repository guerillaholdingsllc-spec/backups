"use client";

import { useState } from "react";

export default function Page() {
  const [status, setStatus] = useState("");
  async function submit(event) {
    event.preventDefault();
    setStatus("Sending...");
    const payload = Object.fromEntries(new FormData(event.currentTarget).entries());
    payload.consentToPartnerFollowUp = event.currentTarget.consentToPartnerFollowUp.checked;
    const res = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    setStatus(res.ok ? "Received. Watch your email for confirmation." : "Please complete the required consent and contact fields.");
    if (res.ok) event.currentTarget.reset();
  }
  return (
    <main>
      <style>{css("#0f172a", "#2f9e75")}</style>
      <nav><strong>Male<span>Genesis</span></strong><a href="#score">Score Quiz</a><a href="#inquiry">Coach Inquiry</a></nav>
      <section className="hero"><h1>Male fertility education before the clinic visit.</h1><p>Organize semen analysis, TRT fertility questions, lifestyle factors, and clinician discussion points.</p><a className="primary" href="#inquiry">Start inquiry</a></section>
      <section className="wrap grid" id="score"><div className="card"><h2>Male Fertility Readiness</h2><p>Track age, sleep, TRT/hormone history, semen analysis status, and fertility goals before speaking with a licensed clinician.</p></div><div className="card"><h2>TRT & Fertility</h2><p>Educational guidance only: ask about fertility preservation, semen analysis, hormones, and family planning before making treatment decisions.</p></div></section>
      <section className="wrap" id="inquiry"><form className="card" onSubmit={submit}><h2>Male Fertility Coach Inquiry</h2><label>First name<input name="firstName" required /></label><label>Email<input name="email" type="email" required /></label><label>Phone<input name="phone" /></label><label>State<input name="state" required /></label><label>TRT status<select name="trtStatus"><option>Not using TRT</option><option>Considering TRT</option><option>Currently using TRT</option><option>Used TRT previously</option></select></label><label>What are you trying to solve?<textarea name="interest" required /></label><label className="check"><input type="checkbox" name="consentToPartnerFollowUp" required /> I agree MaleGenesis may contact me about this inquiry and may share my information with a relevant fertility education, telehealth, clinic, or care-navigation partner for follow-up within 24-48 hours.</label><button>Submit inquiry</button><p className="fine">Educational only. No diagnosis, prescribing, medical advice, or fertility outcome guarantees.</p><p>{status}</p></form></section>
    </main>
  );
}

function css(dark, accent) {
  return `body{margin:0;background:#f4fbf7;color:${dark};font-family:Arial,sans-serif}nav{display:flex;gap:20px;align-items:center;padding:16px 28px;background:${dark};color:white}nav strong{margin-right:auto;font-size:20px}nav span{color:${accent}}nav a{color:white;text-decoration:none}.hero{padding:72px 24px;text-align:center;background:linear-gradient(135deg,${dark},#14532d);color:white}.hero h1{font-size:48px;max-width:780px;margin:0 auto 16px}.hero p{max-width:680px;margin:0 auto 28px;line-height:1.7;color:#dcfce7}.primary,button{background:${accent};color:white;border:0;border-radius:8px;padding:13px 20px;font-weight:800;text-decoration:none;cursor:pointer}.wrap{max-width:1060px;margin:0 auto;padding:34px 20px}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px}.card{background:white;border-radius:14px;padding:26px;box-shadow:0 8px 30px #0001}label{display:grid;gap:6px;margin-top:12px;font-weight:700;color:#374151}input,textarea,select{padding:12px;border:1px solid #d1d5db;border-radius:8px}textarea{min-height:90px}.check{grid-template-columns:auto 1fr;align-items:start;font-size:13px;line-height:1.5}.fine{font-size:12px;color:#6b7280}@media(max-width:700px){.hero h1{font-size:34px}}`;
}
