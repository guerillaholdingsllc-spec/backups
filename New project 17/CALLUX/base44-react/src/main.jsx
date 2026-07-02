import React from 'react';
import { createRoot } from 'react-dom/client';
import { Activity, BadgeDollarSign, FileCheck2, LockKeyhole, MapPin, ShieldCheck, Truck, Users } from 'lucide-react';
import './styles.css';

const metrics = [
  ['Fill rate', '24/7', Activity],
  ['Engine', 'First accept', Truck],
  ['POD', 'Hash chain', FileCheck2],
  ['Split', '65 / 35', BadgeDollarSign]
];

const tiers = [
  ['Base', 'Free', 'Standard removals', '$105-$140'],
  ['Bariatric', '$299', '300 lb+ calls', '$157'],
  ['Trauma', '$399', 'Accident/unattended', '$227'],
  ['Biohazard', '$499', 'OSHA-level handling', '$314'],
  ['Government', '$599', 'Coroner/VA/federal', '$409'],
  ['Elite', '$799', 'Priority all calls', '$490']
];

const calls = [
  ['CALL-84273', 'Trauma', 'Accepted', 'R. Mason', '11 min', 'On time'],
  ['CALL-84274', 'Standard', 'Open', '-', 'Pending', '4:20'],
  ['CALL-84275', 'Biohazard', 'POD submitted', 'A. Lee', 'Complete', 'Met']
];

const auditEvents = ['CALL_CREATED', 'OFFER_SENT', 'ACCEPTED', 'ARRIVED', 'PICKED_UP', 'DEPARTED', 'DELIVERED', 'POD_SUBMITTED'];

function App() {
  return (
    <main>
      <header className="topbar">
        <div className="brand">
          <div className="mark">C</div>
          <div>
            <strong>CALLUX</strong>
            <span>Dignity Transport Group</span>
          </div>
        </div>
        <nav>
          <a href="#dispatch">Dispatch</a>
          <a href="#vendor">Vendor</a>
          <a href="#admin">Admin</a>
          <a href="#drivers">Drivers</a>
        </nav>
      </header>

      <section className="hero">
        <div className="heroText">
          <p className="eyebrow">Sacramento - Bay Area - Reno - Stockton</p>
          <h1>CALLUX Operating System</h1>
          <p>The React access point for dispatch, certification gates, partner pickup intake, audit-ready POD, and dignity-centered marketplace operations.</p>
          <div className="actions">
            <a className="primary" href="#vendor">Log a pickup</a>
            <a className="secondary" href="#drivers">View certifications</a>
          </div>
        </div>
        <div className="metricGrid">
          {metrics.map(([label, value, Icon]) => (
            <article className="metric" key={label}>
              <Icon size={22} />
              <span>{label}</span>
              <strong>{value}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="dispatch">
        <div className="sectionHead">
          <p className="eyebrow">Layer 1</p>
          <h2>First-to-accept dispatch with certification locks.</h2>
        </div>
        <div className="dispatchGrid">
          <article className="phone">
            <div className="phoneTop"><span>ONLINE</span><span>Sacramento</span></div>
            <Offer title="Standard Removal" meta="7.2 miles - $129" unlocked />
            <Offer title="Trauma Scene Removal" meta="Requires Trauma Specialist" cta="Unlock Trauma ($399) -> +$70/call" />
            <Offer title="Biohazard Transfer" meta="Requires Biohazard Level 4" cta="Unlock Biohazard ($499) -> +$87/call" />
          </article>
          <article className="opsCard">
            <h3>Dispatch rules</h3>
            <ul>
              <li>First accepted offer wins with atomic lock.</li>
              <li>Eligibility checks certification, equipment, market, cooldown, and availability.</li>
              <li>Fallback escalates to preferred vendors, then on-call company fleet.</li>
              <li>After-hours surge still honors 65% company and 35% driver split.</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="section alt" id="vendor">
        <div className="sectionHead">
          <p className="eyebrow">Partner console</p>
          <h2>Vendor pickup intake and audit visibility.</h2>
        </div>
        <div className="dashboard">
          <div className="panel">
            <div className="panelTitle">
              <h3>Greenhaven Mortuary</h3>
              <button>Log New Pickup</button>
            </div>
            <div className="kpis">
              <span>Avg response: 14m</span>
              <span>Fill rate: 96%</span>
              <span>POD on-time: 98%</span>
              <span>Avg cost/call: $450</span>
            </div>
            <table>
              <thead><tr><th>CallID</th><th>Type</th><th>Status</th><th>Driver</th><th>ETA</th><th>SLA</th></tr></thead>
              <tbody>
                {calls.map((row) => <tr key={row[0]}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}
              </tbody>
            </table>
          </div>
          <form className="panel formPanel">
            <label>Origin facility<input defaultValue="Kaiser South Sacramento" /></label>
            <label>Destination<input defaultValue="Greenhaven Mortuary" /></label>
            <label>Call type<select defaultValue="TRAUMA"><option>STANDARD</option><option>TRAUMA</option><option>BIOHAZARD</option><option>GOVERNMENT</option></select></label>
            <label>Notes<textarea defaultValue="Family waiting; chaplain notified." /></label>
          </form>
        </div>
      </section>

      <section className="section" id="admin">
        <div className="sectionHead">
          <p className="eyebrow">Admin console</p>
          <h2>Audit timeline, dispatch queue, and compliance controls.</h2>
        </div>
        <div className="timeline">
          {auditEvents.map((event, index) => (
            <div className="event" key={event}>
              <span>{index + 1}</span>
              <strong>{event}</strong>
              <small>actor, timestamp, GPS chip, evidence hash</small>
            </div>
          ))}
        </div>
      </section>

      <section className="section alt" id="drivers">
        <div className="sectionHead">
          <p className="eyebrow">Layer 2 and 3</p>
          <h2>The more you learn, the more you earn.</h2>
        </div>
        <div className="tierGrid">
          {tiers.map(([name, price, unlocks, pay]) => (
            <article className="tier" key={name}>
              <div className="tierIcon">{name === 'Base' ? <ShieldCheck /> : <LockKeyhole />}</div>
              <h3>{name}</h3>
              <p>{unlocks}</p>
              <strong>{price}</strong>
              <span>Driver pay {pay}</span>
            </article>
          ))}
        </div>
      </section>

      <footer>
        <div><Users size={18} /> Starting cohort: 25 drivers. Month 12 target: 100.</div>
        <div><MapPin size={18} /> MVP markets: Sacramento, Bay Area, Reno, Stockton.</div>
      </footer>
    </main>
  );
}

function Offer({ title, meta, unlocked, cta }) {
  return (
    <div className={`offer ${unlocked ? 'unlocked' : 'locked'}`}>
      <div>
        <strong>{title}</strong>
        <span>{meta}</span>
      </div>
      {unlocked ? <button>ACCEPT</button> : <button>{cta}</button>}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);

