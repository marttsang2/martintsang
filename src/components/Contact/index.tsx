export default function Contact() {
  return (
    <section id="contact" className="final-cta">
      <div className="container-wide">
        <span className="float-glyph fg-1">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <rect x="2" y="2" width="32" height="32" stroke="currentColor" strokeWidth="1"></rect>
          </svg>
        </span>
        <span className="float-glyph fg-2">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1"></circle>
          </svg>
        </span>
        <span className="float-glyph fg-3">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M2 16L16 2L30 16L16 30Z" stroke="currentColor" strokeWidth="1"></path>
          </svg>
        </span>

        <h2>
          Have a project in mind?
          <br />
          <em>Let&apos;s build it.</em>
        </h2>
        <p>Fast to onboard. Easy to work with. Built to scale with you.</p>
        <div className="actions">
          <a href="mailto:tsangmartin1225@gmail.com" className="btn btn-primary">
            tsangmartin1225@gmail.com <span className="arrow">→</span>
          </a>
          <a href="https://linkedin.com/in/marttsang2" className="btn btn-ghost">
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
