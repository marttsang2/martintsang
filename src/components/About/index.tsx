export default function About() {
  return (
    <section id="approach" className="diff">
      <div className="container-wide">
        <span className="section-eyebrow">
          <span className="sq"></span>Approach
        </span>
        <h2 className="section-title">
          Most engineers ship features. <em>I ship outcomes</em> that make the business measurably better.
        </h2>

        <div className="diff-grid">
          <div className="diff-card">
            <div className="diff-icon">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <rect x="2" y="2" width="7" height="7" stroke="currentColor" strokeWidth="1.4"></rect>
                <rect x="13" y="2" width="7" height="7" stroke="currentColor" strokeWidth="1.4"></rect>
                <rect x="2" y="13" width="7" height="7" stroke="currentColor" strokeWidth="1.4"></rect>
                <rect x="13" y="13" width="7" height="7" stroke="currentColor" strokeWidth="1.4"></rect>
              </svg>
            </div>
            <h3>End-to-end<br />full-stack ownership</h3>
            <div className="diff-tag">From schema to frontend, one engineer.</div>
            <p>
              I design Postgres schemas, write Spring Boot services, build the React frontend, and deploy
              the whole thing to Kubernetes. No handoffs, no telephone-game between specialists.
            </p>
          </div>
          <div className="diff-card">
            <div className="diff-icon">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M3 11h7l3-7 3 14 3-7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </div>
            <h3>Production-grade<br />from day one</h3>
            <div className="diff-tag">Built to be on-call for, not demo&apos;d once.</div>
            <p>
              Every project ships with proper CI/CD, observability, structured logging, and 90%+ test
              coverage. The first deploy is always to staging behind a real domain — not localhost.
            </p>
          </div>
          <div className="diff-card">
            <div className="diff-icon">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.4"></circle>
                <path d="M11 6v5l3 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"></path>
              </svg>
            </div>
            <h3>Direct.<br />No agency tax.</h3>
            <div className="diff-tag">Talk to the engineer doing the work.</div>
            <p>
              You get me, not a project manager forwarding tickets to an offshore team. Tighter feedback
              loops, faster decisions, and 30% less spend than a typical agency engagement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
