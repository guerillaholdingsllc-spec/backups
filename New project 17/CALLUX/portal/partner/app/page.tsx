export default function PartnerDashboard() {
  return (
    <main style={{ fontFamily: 'Inter, Arial, sans-serif', padding: 32, background: '#F7F9FC', minHeight: '100vh' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Greenhaven Mortuary</h1>
          <p style={{ color: '#667085' }}>Partner dashboard</p>
        </div>
        <button style={{ background: '#2BB673', color: '#fff', border: 0, borderRadius: 8, padding: '12px 16px', fontWeight: 700 }}>Log New Pickup</button>
      </header>
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginTop: 24 }}>
        {['Avg Response Time', 'Fill Rate', 'POD On-Time', 'Avg Cost/Call'].map((label) => (
          <article key={label} style={{ background: '#fff', border: '1px solid #D0D5DD', borderRadius: 8, padding: 16 }}>
            <span style={{ color: '#667085' }}>{label}</span>
            <strong style={{ display: 'block', fontSize: 28, marginTop: 16 }}>--</strong>
          </article>
        ))}
      </section>
      <section style={{ marginTop: 24, background: '#fff', border: '1px solid #D0D5DD', borderRadius: 8, padding: 20 }}>
        <h2>Recent Calls</h2>
        <p style={{ color: '#667085' }}>CallID | Type | Status | Driver | ETA | SLA | Audit</p>
      </section>
    </main>
  );
}

