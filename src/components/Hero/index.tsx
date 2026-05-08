export default function Hero() {
  const capItems = [
    { text: "Architect", em: "full-stack", suffix: "systems" },
    { text: "Ship", em: "production", suffix: "code" },
    { text: "Deploy on", em: "Kubernetes", suffix: "" },
    { text: "Build", em: "AI-native", suffix: "tools" },
    { text: "Lead from", em: "zero to one", suffix: "" },
    { text: "Optimize", em: "core web vitals", suffix: "" },
  ];

  return (
    <section id="hero" className="hero">
      <div className="container-wide">
        <h1>
          Software engineer<br />
          building <span className="accent">production</span><br />
          web platforms.
        </h1>
        <p className="hero-sub">
          I&apos;m Martin — a full-stack software engineer in Toronto. I design and ship end-to-end systems
          across booking, legal, and AI domains, from Spring Boot services on Kubernetes to polished
          React frontends.
        </p>
        <div className="hero-actions">
          <a href="#contact" className="btn btn-primary">
            Book a 30-min call <span className="arrow">→</span>
          </a>
          <a href="#work" className="btn btn-ghost">See selected work</a>
        </div>
        <div className="hero-meta">
          <span><strong>Based in</strong> Toronto, Canada</span>
          <span><strong>5+ years</strong> shipping production</span>
          <span><strong>Available</strong> from Q1 2026</span>
          <span className="mono" style={{ marginLeft: "auto", color: "var(--muted)" }}>v 2026.03</span>
        </div>
      </div>

      <div className="cap-rotator" aria-hidden="true">
        <div className="cap-track">
          {[...capItems, ...capItems].map((item, i) => (
            <span key={i} className="cap-item">
              <span className="dot"></span>
              {item.text} <em>{item.em}</em>{item.suffix ? ` ${item.suffix}` : ""}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
