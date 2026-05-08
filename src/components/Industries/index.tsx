const industries = [
  {
    num: "01 / Consumer SaaS",
    name: "Booking & wellness",
    desc: "Multi-tenant scheduling, payments, staff ops",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="5" width="14" height="12" stroke="currentColor" strokeWidth="1.4" rx="1"></rect>
        <path d="M3 8h14M7 3v4M13 3v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"></path>
      </svg>
    ),
  },
  {
    num: "02 / Regulated",
    name: "Legal & notary",
    desc: "Bilingual sites, lead capture, compliance",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 3v14M5 7l5-4 5 4M4 17h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"></path>
      </svg>
    ),
  },
  {
    num: "03 / AI · Career tech",
    name: "AI tooling",
    desc: "Resume builders, job match, ATS optimization",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.4"></circle>
        <path d="M10 2v3M10 15v3M2 10h3M15 10h3M4 4l2 2M14 14l2 2M4 16l2-2M14 6l2-2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"></path>
      </svg>
    ),
  },
  {
    num: "04 / Services",
    name: "Local services",
    desc: "Cleaning, contracting, B2B outreach funnels",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 17l5-5 4 4 5-7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></path>
      </svg>
    ),
  },
  {
    num: "05 / Fintech",
    name: "Loan & lending",
    desc: "Application flows, underwriting tools, KYC",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="6" width="14" height="9" stroke="currentColor" strokeWidth="1.4" rx="1"></rect>
        <path d="M3 9h14" stroke="currentColor" strokeWidth="1.4"></path>
      </svg>
    ),
  },
];

export default function Industries() {
  return (
    <section id="industries" className="industries">
      <div className="container-wide">
        <div className="ind-head">
          <div>
            <span className="section-eyebrow">
              <span className="sq"></span>Industries
            </span>
            <h2 className="section-title">
              Domain experience <em>where it counts.</em>
            </h2>
          </div>
          <p>
            Five years across consumer SaaS, regulated services, fintech, and AI tooling — meaning I
            already know your domain&apos;s footguns.
          </p>
        </div>

        <div className="ind-grid">
          {industries.map((ind, i) => (
            <div key={i} className="ind-card">
              <div>
                <span className="ind-num">{ind.num}</span>
                <div className="ind-name" style={{ marginTop: 8 }}>
                  {ind.name}
                </div>
                <div className="ind-desc">{ind.desc}</div>
              </div>
              <div className="ind-glyph">{ind.icon}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
