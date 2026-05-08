const logos = [
  { name: "Asynk", tag: "/career" },
  { name: "Apoidea", tag: "/fintech" },
  { name: "Ace Innovation", tag: "/games" },
  { name: "P L Tech", tag: "/loan" },
  { name: "GoPlace", tag: "/booking" },
  { name: "WP Legal", tag: "/notary" },
  { name: "Help Me Clean", tag: "/services" },
  { name: "Jomud", tag: "/ai" },
  { name: "Verve Studio", tag: "/wellness" },
  { name: "+ 6 more", tag: "/nda" },
];

export default function Logos() {
  return (
    <section className="logos">
      <div className="container-wide">
        <div className="logos-head">
          <div>
            <span className="section-eyebrow">
              <span className="sq"></span>Trusted
            </span>
            <h2>
              Trusted by{" "}
              <em style={{ fontStyle: "italic", color: "var(--moss)", fontWeight: 400 }}>
                teams shipping
              </em>
              <br />
              across Toronto &amp; Hong Kong
            </h2>
          </div>
          <p>
            Five years building production systems for early-stage startups, family-run businesses,
            and venture-backed product teams.
          </p>
        </div>
        <div className="logo-rail">
          {logos.map((l, i) => (
            <div key={i} className="logo-cell">
              <span>
                {l.name}
                <span className="smol">{l.tag}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
