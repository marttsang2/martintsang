export default function CtaStrip() {
  return (
    <section className="cta-strip">
      <div className="container-wide">
        <div className="row">
          <h2>
            Upgrade your<br />engineering bench.
          </h2>
          <div>
            <p>Fast to onboard. Easy to work with. Built to scale with you.</p>
            <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="#contact" className="btn btn-primary">
                Book a 30-min call <span className="arrow">→</span>
              </a>
              <a href="#work" className="btn btn-ghost">View selected work</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
