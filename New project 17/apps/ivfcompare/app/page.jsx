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
      <style>{css("#111827", "#c5974a")}</style>
      <nav><strong>IVF<span>Compare</span></strong><a href="#compare">Compare</a><a href="#inquiry">Clinic Inquiry</a></nav>
      <section className="hero"><h1>Compare IVF clinics with better questions.</h1><p>Organize clinic criteria, success-rate context, geography, services, and inquiry follow-up in one place.</p><a className="primary" href="#inquiry">Start clinic inquiry</a></section>
      <section className="wrap grid" id="compare"><div className="card"><h2>Clinic Comparison</h2><p>Compare location, services, transparency, payment process, reporting period, and whether success rates apply to your situation.</p></div><div className="card"><h2>Success Rate Context</h2><p>Clinic metrics need age bands, diagnosis mix, transfer type, and reporting period before they are meaningful.</p></div></section>
      <section className="wrap" id="inquiry"><form className="card" onSubmit={submit}><h2>Clinic Inquiry</h2><label>First name<input name="firstName" required /></label><label>Email<input name="email" type="email" required /></label><label>Phone<input name="phone" /></label><label>Preferred city or market<input name="location" required /></label><label>State<input name="state" required /></label><label>What are you trying to compare?<textarea name="interest" required /></label><label className="check"><input type="checkbox" name="consentToPartnerFollowUp" required /> I agree IVFCompare may contact me about this inquiry and may share my information with a relevant clinic, fertility navigation, financing, or care partner for follow-up within 24-48 hours.</label><button>Submit clinic inquiry</button><p className="fine">Educational only. No treatment recommendation, clinic ranking guarantee, or outcome promise.</p><p>{status}</p></form></section>
    </main>
  );
}

function css(dark, accent) {
  return `body{margin:0;background:#fbfaf7;color:${dark};font-family:Arial,sans-serif}nav{display:flex;gap:20px;align-items:center;padding:16px 28px;background:${dark};color:white}nav strong{margin-right:auto;font-size:20px}nav span{color:${accent}}nav a{color:white;text-decoration:none}.hero{padding:72px 24px;text-align:center;background:linear-gradient(135deg,${dark},#334155);color:white}.hero h1{font-size:48px;max-width:780px;margin:0 auto 16px}.hero p{max-width:680px;margin:0 auto 28px;line-height:1.7;color:#e5e7eb}.primary,button{background:${accent};color:white;border:0;border-radius:8px;padding:13px 20px;font-weight:800;text-decoration:none;cursor:pointer}.wrap{max-width:1060px;margin:0 auto;padding:34px 20px}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px}.card{background:white;border-radius:14px;padding:26px;box-shadow:0 8px 30px #0001}label{display:grid;gap:6px;margin-top:12px;font-weight:700;color:#374151}input,textarea{padding:12px;border:1px solid #d1d5db;border-radius:8px}textarea{min-height:90px}.check{grid-template-columns:auto 1fr;align-items:start;font-size:13px;line-height:1.5}.fine{font-size:12px;color:#6b7280}@media(max-width:700px){.hero h1{font-size:34px}}`;
}
