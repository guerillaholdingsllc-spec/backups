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
      <style>{css("#1a1a2e", "#6c63ff")}</style>
      <nav><strong>Fertility<span>Fund</span></strong><a href="#calculator">Calculator</a><a href="#inquiry">Financing Inquiry</a></nav>
      <section className="hero"><h1>IVF financing built for real decisions.</h1><p>Estimate costs, organize employer-benefits questions, and submit a consented financing inquiry for follow-up.</p><a className="primary" href="#inquiry">Start financing inquiry</a></section>
      <section className="wrap grid" id="calculator"><div className="card"><h2>IVF Cost Calculator</h2><p>Use your clinic quote, medications, cycles, and expected coverage to estimate out-of-pocket exposure before you call a lender or benefits team.</p></div><div className="card"><h2>Employer Benefits Questions</h2><p>Ask HR about lifetime maximums, medication coverage, prior authorization, network rules, and fertility benefit vendors.</p></div></section>
      <section className="wrap" id="inquiry"><form className="card" onSubmit={submit}><h2>Financing Inquiry</h2><div className="two"><label>First name<input name="firstName" required /></label><label>Last name<input name="lastName" /></label></div><label>Email<input name="email" type="email" required /></label><label>Phone<input name="phone" /></label><label>Employer<input name="employer" /></label><label>State<input name="state" required /></label><label>What are you trying to solve?<textarea name="interest" required /></label><label className="check"><input type="checkbox" name="consentToPartnerFollowUp" required /> I agree FertilityFund may contact me about this inquiry and may share my information with a relevant IVF financing, fertility benefits, clinic, or care-navigation partner for follow-up within 24-48 hours.</label><button>Submit inquiry</button><p className="fine">Educational only. No medical, insurance, lending, approval, rate, coverage, or treatment guarantees.</p><p>{status}</p></form></section>
    </main>
  );
}

function css(dark, accent) {
  return `body{margin:0;background:#f0f4ff;color:${dark};font-family:Arial,sans-serif}nav{display:flex;gap:20px;align-items:center;padding:16px 28px;background:${dark};color:white}nav strong{margin-right:auto;font-size:20px}nav span{color:${accent}}nav a{color:white;text-decoration:none}.hero{padding:72px 24px;text-align:center;background:linear-gradient(135deg,${dark},#0f3460);color:white}.hero h1{font-size:48px;max-width:780px;margin:0 auto 16px}.hero p{max-width:680px;margin:0 auto 28px;line-height:1.7;color:#cbd5e1}.primary,button{background:${accent};color:white;border:0;border-radius:8px;padding:13px 20px;font-weight:800;text-decoration:none;cursor:pointer}.wrap{max-width:1060px;margin:0 auto;padding:34px 20px}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px}.card{background:white;border-radius:14px;padding:26px;box-shadow:0 8px 30px #0001}.two{display:grid;grid-template-columns:1fr 1fr;gap:12px}label{display:grid;gap:6px;margin-top:12px;font-weight:700;color:#374151}input,textarea{padding:12px;border:1px solid #d1d5db;border-radius:8px}textarea{min-height:90px}.check{grid-template-columns:auto 1fr;align-items:start;font-size:13px;line-height:1.5}.fine{font-size:12px;color:#6b7280}@media(max-width:700px){.hero h1{font-size:34px}.two{grid-template-columns:1fr}}`;
}
