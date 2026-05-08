const modules = [
  "React & Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Spring Boot · Java 21",
  "Node.js · Express",
  "Python · Django",
  "Go",
  "PostgreSQL · Flyway",
  "MongoDB · Redis",
  "AWS EKS · ECR",
  "Kubernetes · Docker",
  "Vercel · Cloudflare",
];

export default function Skills() {
  return (
    <section id="stack" className="modules">
      <div className="container-wide">
        <span className="section-eyebrow">
          <span className="sq"></span>Toolbox
        </span>
        <h2 className="section-title">
          A toolbox for <em>every layer</em>
          <br />
          of the stack.
        </h2>

        <div className="modules-grid">
          {modules.map((name, i) => (
            <div key={i} className="module">
              <div className="m-icon">
                <span></span>
              </div>
              <div className="m-name">{name}</div>
              <span className="m-arrow">↗</span>
            </div>
          ))}
        </div>

        <div className="module-aside">
          <div>
            <h4>Looking for something else?</h4>
            <p>
              If your team&apos;s on a stack I haven&apos;t listed — Rust, Elixir, Phoenix, Cloudflare Workers — chances are I&apos;ve shipped a side project on it. Ask.
            </p>
          </div>
          <div className="right">
            <a href="#contact" className="btn btn-light">
              Ask about your stack <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
