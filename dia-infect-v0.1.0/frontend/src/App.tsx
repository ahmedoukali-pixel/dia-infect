const modules = [
  { number: '01', title: 'Data intake', status: 'Planned', description: 'A future controlled workflow for permitted research data and input validation.' },
  { number: '02', title: 'Laboratory review', status: 'Planned', description: 'A future module for units, missing values, and data-quality checks.' },
  { number: '03', title: 'Model evaluation', status: 'Not connected', description: 'No prediction is generated in this release. A validated model must be integrated separately.' },
];
export default function App() {
  return <main className="shell">
    <nav className="nav"><a className="brand" href="#"><span className="brand-mark">D</span>DiaInfect</a><span className="version">V0.1.0 · FOUNDATION</span></nav>
    <section className="hero"><div className="eyebrow"><span className="pulse"/> RESEARCH PLATFORM · EARLY DEVELOPMENT</div>
      <h1>Evidence first.<br/><span>Build with care.</span></h1>
      <p className="intro">A foundation for a carefully validated infection-risk research workflow. This release establishes the software structure only—no clinical prediction is enabled.</p>
      <div className="hero-actions"><a className="primary" href="#modules">Explore the foundation <span>↘</span></a><span className="status-note">● API health endpoint included</span></div>
      <div className="notice"><span className="notice-icon">i</span><p><strong>Research prototype — not for clinical use.</strong> Do not enter identifiable or real patient data. No diagnosis or risk score is produced in V0.1.0.</p></div>
    </section>
    <section id="modules" className="modules"><div className="section-heading"><div><p className="kicker">ROADMAP</p><h2>Platform modules</h2></div><span className="counter">03 MODULES</span></div>
      <div className="cards">{modules.map(m => <article className="card" key={m.number}><div className="card-top"><span className="number">{m.number}</span><span className={m.status === 'Not connected' ? 'tag muted' : 'tag'}>{m.status}</span></div><h3>{m.title}</h3><p>{m.description}</p><div className="card-line"/></article>)}</div>
    </section><footer><span>DiaInfect <span className="dim">/ V0.1.0</span></span><span className="dim">Built for research · Validation before deployment</span></footer>
  </main>;
}
