const kpis = ['Fill Rate', 'Accept Latency', 'POD Compliance', 'Incidents', 'Cert Conversions'];

export default function AdminDashboard() {
  return (
    <main style={{ fontFamily: 'Inter, Arial, sans-serif', padding: 32, background: '#F7F9FC', minHeight: '100vh' }}>
      <h1>CALLUX Ops Dashboard</h1>
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
        {kpis.map((kpi) => (
          <article key={kpi} style={{ background: '#fff', border: '1px solid #D0D5DD', borderRadius: 8, padding: 16 }}>
            <span style={{ color: '#667085' }}>{kpi}</span>
            <strong style={{ display: 'block', fontSize: 28, marginTop: 16 }}>--</strong>
          </article>
        ))}
      </section>
      <section style={{ display: 'grid', gridTemplateColumns: '1.4fr .8fr', gap: 16, marginTop: 24 }}>
        <div style={{ minHeight: 380, background: '#101828', borderRadius: 8, color: '#9BD7FF', padding: 20 }}>Live market map: Sacramento, Bay Area, Reno, Stockton</div>
        <div style={{ background: '#fff', border: '1px solid #D0D5DD', borderRadius: 8, padding: 20 }}>
          <h2>Unfilled Queue</h2>
          <p style={{ color: '#B22222' }}>SLA timers and escalation actions appear here.</p>
        </div>
      </section>
    </main>
  );
}

