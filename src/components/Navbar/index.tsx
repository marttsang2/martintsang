export default function Navbar() {
  return (
    <>
      <div className="announce">
        <a href="#contact">
          <span className="badge">
            <span className="pulse"></span>New
          </span>
          <span>I&apos;m taking on select freelance engagements for 2026 — let&apos;s chat</span>
          <span className="arrow">→</span>
        </a>
      </div>
      <nav className="nav">
        <div className="container-wide nav-inner">
          <a href="#hero" className="logo">
            <span className="logo-mark">MT</span>
            <span>Martin&nbsp;Tsang</span>
          </a>
          <ul className="nav-links">
            <li><a href="#work">Work</a></li>
            <li><a href="#approach">Approach</a></li>
            <li><a href="#stack">Stack</a></li>
            <li><a href="#career">Career</a></li>
            <li><a href="#industries">Industries</a></li>
          </ul>
          <div className="nav-cta">
            <a href="#cv" className="signin">CV / Résumé</a>
            <a href="#contact" className="btn btn-primary">
              Get in touch <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
