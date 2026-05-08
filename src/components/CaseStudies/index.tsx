export default function CaseStudies() {
  return (
    <>
      {/* CASE STUDY 1 */}
      <section id="work" className="case">
        <div className="container-wide">
          <span className="section-eyebrow">
            <span className="sq"></span>Case study · 01
          </span>
          <h2 className="section-title" style={{ marginBottom: 64, fontSize: "clamp(36px,4.5vw,64px)" }}>
            How I shipped GoPlace&apos;s booking platform in <em>4 months</em> instead of 12.
          </h2>
          <article className="case-card">
            <div className="case-image">
              <div className="img-stripes"></div>
              <span className="case-logo">GoPlace</span>
              <div style={{ position: "absolute", inset: "64px 28px 64px 28px", background: "var(--cream)", border: "1px solid var(--line)", borderRadius: 8, boxShadow: "0 8px 24px rgba(14,15,14,0.06)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
                <div className="pf-bar">
                  <span className="pf-dot"></span><span className="pf-dot"></span><span className="pf-dot"></span>
                  <span className="pf-title">booking.goplace.com / dashboard</span>
                </div>
                <div className="pf-body" style={{ padding: 18, gap: 14 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <div style={{ width: 32, height: 32, borderRadius: 6, background: "var(--moss)" }}></div>
                    <div style={{ flex: 1 }}>
                      <div className="pf-pill" style={{ height: 10, width: "60%" }}></div>
                      <div className="pf-pill" style={{ height: 8, width: "35%", marginTop: 6, background: "var(--cream-3)" }}></div>
                    </div>
                    <div className="pf-pill short" style={{ background: "var(--ink)", height: 24, borderRadius: 100 }}></div>
                  </div>
                  <div className="pf-block" style={{ height: 80, background: "linear-gradient(180deg,var(--cream-2),var(--cream-3))", position: "relative" }}>
                    <div style={{ position: "absolute", left: 14, bottom: 14, display: "flex", gap: 6, alignItems: "end", height: 54 }}>
                      <div style={{ width: 14, height: "30%", background: "var(--moss)" }}></div>
                      <div style={{ width: 14, height: "55%", background: "var(--moss)" }}></div>
                      <div style={{ width: 14, height: "40%", background: "var(--moss)" }}></div>
                      <div style={{ width: 14, height: "75%", background: "var(--rust)" }}></div>
                      <div style={{ width: 14, height: "65%", background: "var(--moss)" }}></div>
                      <div style={{ width: 14, height: "90%", background: "var(--moss)" }}></div>
                      <div style={{ width: 14, height: "48%", background: "var(--moss)" }}></div>
                    </div>
                  </div>
                  <div className="pf-row"><span className="pf-pill"></span><span className="pf-pill short"></span></div>
                  <div className="pf-row"><span className="pf-pill"></span><span className="pf-pill short"></span></div>
                  <div className="pf-row"><span className="pf-pill"></span><span className="pf-pill short" style={{ background: "var(--moss)" }}></span></div>
                </div>
              </div>
              <span className="img-tag">Live · booking.goplace.com</span>
            </div>
            <div className="case-body">
              <p className="case-quote">
                Martin built our entire platform — backend, frontend, infra — from scratch. We launched in
                four months and were taking real bookings the next week.
              </p>
              <div className="case-attrib">
                <div className="case-avatar">JL</div>
                <div>
                  <div className="name">Jenny Lau</div>
                  <div className="role">Founder &amp; CEO, GoPlace</div>
                </div>
              </div>
              <div className="case-metrics">
                <div className="case-metric">
                  <div className="value">4 <em>mo</em></div>
                  <div className="label">From kickoff to first paying customer</div>
                </div>
                <div className="case-metric">
                  <div className="value">12<em>+</em></div>
                  <div className="label">Studios live on the platform</div>
                </div>
                <div className="case-metric">
                  <div className="value">99.95<em>%</em></div>
                  <div className="label">Uptime since GA on AWS EKS</div>
                </div>
              </div>
              <a href="#" className="case-link">View full case study <span className="arrow">→</span></a>
            </div>
          </article>
        </div>
      </section>

      {/* CASE STUDY 2 */}
      <section className="case">
        <div className="container-wide">
          <span className="section-eyebrow">
            <span className="sq"></span>Case study · 02
          </span>
          <h2 className="section-title" style={{ marginBottom: 64, fontSize: "clamp(36px,4.5vw,64px)" }}>
            Cutting WP Legal&apos;s lead-response time from <em>14 hours</em> to under 60 seconds.
          </h2>
          <article className="case-card" style={{ gridTemplateColumns: "1fr 1.05fr" }}>
            <div className="case-body" style={{ order: 1 }}>
              <p className="case-quote">
                The new site brought in three times the leads, and our Telegram bot pings us the moment
                someone fills the form. We&apos;ve never been this responsive.
              </p>
              <div className="case-attrib">
                <div className="case-avatar" style={{ background: "linear-gradient(135deg,#5C7BB5,#3F5A8E)" }}>WP</div>
                <div>
                  <div className="name">William Pang</div>
                  <div className="role">Principal, WP Legal &amp; Notary Public</div>
                </div>
              </div>
              <div className="case-metrics">
                <div className="case-metric">
                  <div className="value">3<em>×</em></div>
                  <div className="label">Increase in qualified inbound leads</div>
                </div>
                <div className="case-metric">
                  <div className="value">&lt;60 <em>s</em></div>
                  <div className="label">Lead-to-notification via Telegram bot</div>
                </div>
                <div className="case-metric">
                  <div className="value">98 <em>/100</em></div>
                  <div className="label">Lighthouse performance score</div>
                </div>
              </div>
              <a href="#" className="case-link">View full case study <span className="arrow">→</span></a>
            </div>
            <div className="case-image case-img-2" style={{ order: 2 }}>
              <div className="img-stripes"></div>
              <span className="case-logo" style={{ background: "var(--sky)" }}>WP Legal</span>
              <div style={{ position: "absolute", inset: "64px 28px 64px 28px", background: "var(--cream)", border: "1px solid var(--line)", borderRadius: 8, boxShadow: "0 8px 24px rgba(14,15,14,0.06)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
                <div className="pf-bar">
                  <span className="pf-dot"></span><span className="pf-dot"></span><span className="pf-dot"></span>
                  <span className="pf-title">wplegal.ca</span>
                  <span style={{ marginLeft: "auto", fontFamily: "var(--font-dm-mono),'DM Mono',monospace", fontSize: 10, color: "var(--muted)" }}>EN | 中文</span>
                </div>
                <div className="pf-body" style={{ padding: 24 }}>
                  <div style={{ height: 14, width: "50%", background: "var(--ink)", borderRadius: 3 }}></div>
                  <div style={{ height: 8, width: "80%", background: "var(--cream-2)", borderRadius: 3, marginTop: 10 }}></div>
                  <div style={{ height: 8, width: "70%", background: "var(--cream-2)", borderRadius: 3, marginTop: 6 }}></div>
                  <div style={{ height: 8, width: "60%", background: "var(--cream-2)", borderRadius: 3, marginTop: 6 }}></div>
                  <div style={{ marginTop: 18, display: "flex", gap: 8 }}>
                    <div style={{ height: 28, flex: 1, background: "var(--ink)", borderRadius: 6 }}></div>
                    <div style={{ height: 28, flex: 1, background: "var(--cream-2)", border: "1px solid var(--line)", borderRadius: 6 }}></div>
                  </div>
                  <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    <div style={{ aspectRatio: "1.4", background: "var(--cream-2)", borderRadius: 6 }}></div>
                    <div style={{ aspectRatio: "1.4", background: "var(--cream-3)", borderRadius: 6 }}></div>
                    <div style={{ aspectRatio: "1.4", background: "var(--cream-3)", borderRadius: 6 }}></div>
                    <div style={{ aspectRatio: "1.4", background: "var(--cream-2)", borderRadius: 6 }}></div>
                  </div>
                </div>
              </div>
              <span className="img-tag">Live · wplegal.ca</span>
            </div>
          </article>
        </div>
      </section>

      {/* CASE STUDY 3 */}
      <section className="case">
        <div className="container-wide">
          <span className="section-eyebrow">
            <span className="sq"></span>Case study · 03
          </span>
          <h2 className="section-title" style={{ marginBottom: 64, fontSize: "clamp(36px,4.5vw,64px)" }}>
            Boosting Jomud&apos;s ATS scan-success by <em>30%</em> with a structured resume builder.
          </h2>
          <article className="case-card">
            <div className="case-image case-img-3">
              <div className="img-stripes"></div>
              <span className="case-logo" style={{ background: "var(--rust)" }}>Jomud</span>
              <div style={{ position: "absolute", inset: "60px 28px 60px 28px", background: "var(--cream)", border: "1px solid var(--line)", borderRadius: 8, boxShadow: "0 8px 24px rgba(14,15,14,0.06)", display: "flex", overflow: "hidden" }}>
                <div style={{ width: "60%", borderRight: "1px solid var(--line)", padding: 18, display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--cream-3)" }}></div>
                    <div style={{ flex: 1 }}>
                      <div style={{ height: 10, width: "60%", background: "var(--ink)", borderRadius: 3 }}></div>
                      <div style={{ height: 8, width: "80%", background: "var(--cream-2)", borderRadius: 3, marginTop: 6 }}></div>
                    </div>
                  </div>
                  <div style={{ height: 1, background: "var(--line)", margin: "6px 0" }}></div>
                  <div style={{ height: 8, width: "30%", background: "var(--rust)", borderRadius: 3 }}></div>
                  <div style={{ height: 6, width: "90%", background: "var(--cream-2)", borderRadius: 3 }}></div>
                  <div style={{ height: 6, width: "80%", background: "var(--cream-2)", borderRadius: 3 }}></div>
                  <div style={{ height: 6, width: "85%", background: "var(--cream-2)", borderRadius: 3 }}></div>
                  <div style={{ height: 8, width: "30%", background: "var(--rust)", borderRadius: 3, marginTop: 8 }}></div>
                  <div style={{ height: 6, width: "90%", background: "var(--cream-2)", borderRadius: 3 }}></div>
                  <div style={{ height: 6, width: "75%", background: "var(--cream-2)", borderRadius: 3 }}></div>
                </div>
                <div style={{ width: "40%", padding: 18, background: "var(--cream-2)", display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ fontFamily: "var(--font-dm-mono),'DM Mono',monospace", fontSize: 10, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>ATS score</div>
                  <div style={{ fontSize: 36, fontWeight: 500, letterSpacing: "-0.03em", lineHeight: 1 }}>
                    94<span style={{ fontSize: 18, color: "var(--muted)" }}>/100</span>
                  </div>
                  <div style={{ height: 6, background: "var(--cream)", borderRadius: 100, overflow: "hidden", marginTop: 4 }}>
                    <div style={{ height: "100%", width: "94%", background: "var(--moss)" }}></div>
                  </div>
                  <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 6 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "var(--muted)" }}>
                      <span>Keywords</span><span style={{ color: "var(--moss)", fontWeight: 500 }}>+17</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "var(--muted)" }}>
                      <span>Format</span><span style={{ color: "var(--moss)", fontWeight: 500 }}>PASS</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "var(--muted)" }}>
                      <span>Length</span><span style={{ color: "var(--moss)", fontWeight: 500 }}>PASS</span>
                    </div>
                  </div>
                </div>
              </div>
              <span className="img-tag">Founding engineer · 2023</span>
            </div>
            <div className="case-body">
              <p className="case-quote">
                Martin&apos;s resume builder was the feature that finally got us paid pilots — it&apos;s the cleanest
                ATS-optimized export tool I&apos;ve seen in this category.
              </p>
              <div className="case-attrib">
                <div className="case-avatar" style={{ background: "linear-gradient(135deg,var(--rust),#8B3D17)" }}>EW</div>
                <div>
                  <div className="name">Erica Wong</div>
                  <div className="role">Co-founder &amp; CTO, Jomud</div>
                </div>
              </div>
              <div className="case-metrics">
                <div className="case-metric">
                  <div className="value">+30<em>%</em></div>
                  <div className="label">ATS scan-success rate</div>
                </div>
                <div className="case-metric">
                  <div className="value">2.1 <em>s</em></div>
                  <div className="label">P95 PDF generation latency</div>
                </div>
                <div className="case-metric">
                  <div className="value">14k<em>+</em></div>
                  <div className="label">Resumes generated to date</div>
                </div>
              </div>
              <a href="#" className="case-link">View full case study <span className="arrow">→</span></a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
