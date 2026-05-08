"use client";

import { useState } from "react";

const tabs = ["GoPlace", "WP Legal", "Help Me Clean", "Jomud"];

export default function Projects() {
  const [active, setActive] = useState(0);

  return (
    <section id="projects" className="projects">
      <div className="container-wide">
        <div className="projects-head">
          <div>
            <span className="section-eyebrow">
              <span className="sq"></span>Selected work
            </span>
            <h2 className="section-title">Recent projects, end to end.</h2>
          </div>
          <p>
            Four production systems shipped over the past two years, spanning multi-tenant SaaS, marketing
            funnels, and AI-powered tools. Tap a tab to dig in.
          </p>
        </div>

        <div className="proj-tabs" role="tablist">
          {tabs.map((label, i) => (
            <button
              key={i}
              className={`proj-tab ${active === i ? "active" : ""}`}
              onClick={() => setActive(i)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="proj-panels">
          {/* PANEL 0 — GoPlace */}
          <div className={`proj-panel ${active === 0 ? "active" : ""}`}>
            <div className="proj-art">
              <div className="stripe"></div>
              <span className="meta">SaaS · 2024 — present</span>
              <div className="product-frame">
                <div className="pf-bar">
                  <span className="pf-dot"></span><span className="pf-dot"></span><span className="pf-dot"></span>
                  <span className="pf-title">app.goplace.com / staff schedule</span>
                </div>
                <div className="pf-body">
                  <div className="pf-row">
                    <span className="pf-pill short" style={{ background: "var(--ink)", height: 24, borderRadius: 6 }}></span>
                    <span className="pf-pill"></span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "60px repeat(7, 1fr)", gap: 4, marginTop: 6 }}>
                    <div style={{ fontFamily: "var(--font-dm-mono),'DM Mono',monospace", fontSize: 10, color: "var(--muted)" }}>9 AM</div>
                    <div style={{ background: "var(--moss)", borderRadius: 3, height: 18 }}></div>
                    <div style={{ background: "var(--moss)", borderRadius: 3, height: 18 }}></div>
                    <div style={{ background: "var(--cream-2)", borderRadius: 3, height: 18 }}></div>
                    <div style={{ background: "var(--moss)", borderRadius: 3, height: 18 }}></div>
                    <div style={{ background: "var(--rust)", borderRadius: 3, height: 18 }}></div>
                    <div style={{ background: "var(--moss)", borderRadius: 3, height: 18 }}></div>
                    <div style={{ background: "var(--cream-2)", borderRadius: 3, height: 18 }}></div>
                    <div style={{ fontFamily: "var(--font-dm-mono),'DM Mono',monospace", fontSize: 10, color: "var(--muted)" }}>11 AM</div>
                    <div style={{ background: "var(--moss)", borderRadius: 3, height: 18 }}></div>
                    <div style={{ background: "var(--cream-2)", borderRadius: 3, height: 18 }}></div>
                    <div style={{ background: "var(--moss)", borderRadius: 3, height: 18 }}></div>
                    <div style={{ background: "var(--moss)", borderRadius: 3, height: 18 }}></div>
                    <div style={{ background: "var(--moss)", borderRadius: 3, height: 18 }}></div>
                    <div style={{ background: "var(--rust)", borderRadius: 3, height: 18 }}></div>
                    <div style={{ background: "var(--moss)", borderRadius: 3, height: 18 }}></div>
                    <div style={{ fontFamily: "var(--font-dm-mono),'DM Mono',monospace", fontSize: 10, color: "var(--muted)" }}>1 PM</div>
                    <div style={{ background: "var(--cream-2)", borderRadius: 3, height: 18 }}></div>
                    <div style={{ background: "var(--moss)", borderRadius: 3, height: 18 }}></div>
                    <div style={{ background: "var(--moss)", borderRadius: 3, height: 18 }}></div>
                    <div style={{ background: "var(--moss)", borderRadius: 3, height: 18 }}></div>
                    <div style={{ background: "var(--cream-2)", borderRadius: 3, height: 18 }}></div>
                    <div style={{ background: "var(--moss)", borderRadius: 3, height: 18 }}></div>
                    <div style={{ background: "var(--moss)", borderRadius: 3, height: 18 }}></div>
                  </div>
                  <div style={{ marginTop: "auto" }}>
                    <div className="pf-pill"></div>
                    <div className="pf-pill short" style={{ marginTop: 6 }}></div>
                  </div>
                </div>
              </div>
              <span className="url">booking.goplace.com</span>
            </div>
            <div className="proj-body">
              <span className="proj-tag">01 / Lead engineer · 2024 — present</span>
              <h3>GoPlace</h3>
              <p>
                Multi-tenant booking platform for spas and wellness studios across the GTA. Powers
                staff scheduling, customer bookings, and admin operations for live businesses today.
              </p>
              <ul className="proj-bullets">
                <li>Designed an event-driven domain model unifying bookings, breaks, and vacations on one entity</li>
                <li>JWT auth with refresh-token queueing and action-keyed RBAC across tenants</li>
                <li>Spring Boot + dual React apps deployed on AWS EKS via CodeBuild → ECR pipelines</li>
                <li>Flyway migrations, Postgres row-level security, structured Logback to CloudWatch</li>
              </ul>
              <div className="proj-stack">
                <span className="stack-tag">Spring Boot</span>
                <span className="stack-tag">Java 21</span>
                <span className="stack-tag">PostgreSQL</span>
                <span className="stack-tag">React</span>
                <span className="stack-tag">Vite</span>
                <span className="stack-tag">AWS EKS</span>
                <span className="stack-tag">Flyway</span>
              </div>
            </div>
          </div>

          {/* PANEL 1 — WP Legal */}
          <div className={`proj-panel ${active === 1 ? "active" : ""}`}>
            <div className="proj-art">
              <div className="stripe" style={{ background: "repeating-linear-gradient(45deg,rgba(92,123,181,0.08) 0 1px,transparent 1px 18px),linear-gradient(180deg,#DEE3EE,#C8D2E0)" }}></div>
              <span className="meta">Marketing · 2024</span>
              <div className="product-frame">
                <div className="pf-bar">
                  <span className="pf-dot"></span><span className="pf-dot"></span><span className="pf-dot"></span>
                  <span className="pf-title">wplegal.ca</span>
                </div>
                <div className="pf-body" style={{ padding: 24 }}>
                  <div style={{ height: 18, width: "60%", background: "var(--ink)", borderRadius: 4 }}></div>
                  <div style={{ height: 8, width: "80%", background: "var(--cream-2)", borderRadius: 3, marginTop: 10 }}></div>
                  <div style={{ height: 8, width: "75%", background: "var(--cream-2)", borderRadius: 3, marginTop: 6 }}></div>
                  <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
                    <div style={{ height: 30, flex: 1, background: "var(--ink)", borderRadius: 6 }}></div>
                    <div style={{ height: 30, flex: 1, background: "transparent", border: "1px solid var(--line)", borderRadius: 6 }}></div>
                  </div>
                  <div style={{ marginTop: 18, fontFamily: "var(--font-dm-mono),'DM Mono',monospace", fontSize: 9, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Services</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 8 }}>
                    {[0, 1, 2, 3].map((i) => (
                      <div key={i} style={{ aspectRatio: "1.6", background: "var(--cream-2)", borderRadius: 6, padding: 8 }}>
                        <div style={{ height: 6, width: "60%", background: "var(--ink)", borderRadius: 2 }}></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <span className="url">wplegal.ca</span>
            </div>
            <div className="proj-body">
              <span className="proj-tag">02 / Full-stack developer · 2024</span>
              <h3>WP Legal &amp; Notary Public</h3>
              <p>
                Multi-language marketing site for a Toronto legal and notary firm. Bilingual (EN/ZH)
                content, SEO-tuned, integrated with Resend for lead capture and Telegram for instant
                notifications.
              </p>
              <ul className="proj-bullets">
                <li>Bilingual EN/ZH content via next-intl with MDX-driven articles</li>
                <li>Schema.org structured data and Google Analytics for SEO performance</li>
                <li>Lead form → Resend email + Telegram bot for &lt;60s response</li>
                <li>98 / 100 Lighthouse performance on mobile</li>
              </ul>
              <div className="proj-stack">
                <span className="stack-tag">Next.js</span>
                <span className="stack-tag">TypeScript</span>
                <span className="stack-tag">Tailwind</span>
                <span className="stack-tag">next-intl</span>
                <span className="stack-tag">Resend</span>
                <span className="stack-tag">Vercel</span>
              </div>
            </div>
          </div>

          {/* PANEL 2 — Help Me Clean */}
          <div className={`proj-panel ${active === 2 ? "active" : ""}`}>
            <div className="proj-art">
              <div className="stripe" style={{ background: "repeating-linear-gradient(135deg,rgba(31,58,42,0.06) 0 1px,transparent 1px 22px),linear-gradient(180deg,#E0E6DB,#CDD5C0)" }}></div>
              <span className="meta">Marketing · B2B · 2024</span>
              <div className="product-frame">
                <div className="pf-bar">
                  <span className="pf-dot"></span><span className="pf-dot"></span><span className="pf-dot"></span>
                  <span className="pf-title">helpmeclean.ca / pdf-generator</span>
                </div>
                <div className="pf-body" style={{ padding: 18, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ fontFamily: "var(--font-dm-mono),'DM Mono',monospace", fontSize: 9, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Build PDF</div>
                    <div style={{ height: 24, background: "var(--cream-2)", borderRadius: 6 }}></div>
                    <div style={{ height: 24, background: "var(--cream-2)", borderRadius: 6 }}></div>
                    <div style={{ height: 24, background: "var(--cream-2)", borderRadius: 6 }}></div>
                    <div style={{ height: 24, background: "var(--ink)", borderRadius: 6, marginTop: "auto" }}></div>
                  </div>
                  <div style={{ background: "var(--cream)", border: "1px solid var(--line)", borderRadius: 6, padding: 12, display: "flex", flexDirection: "column", gap: 6 }}>
                    <div style={{ height: 10, width: "80%", background: "var(--ink)", borderRadius: 2 }}></div>
                    <div style={{ height: 6, width: "60%", background: "var(--cream-3)", borderRadius: 2 }}></div>
                    <div style={{ height: 1, background: "var(--line)", margin: "6px 0" }}></div>
                    <div style={{ height: 5, width: "90%", background: "var(--cream-2)", borderRadius: 2 }}></div>
                    <div style={{ height: 5, width: "85%", background: "var(--cream-2)", borderRadius: 2 }}></div>
                    <div style={{ height: 5, width: "80%", background: "var(--cream-2)", borderRadius: 2 }}></div>
                    <div style={{ height: 5, width: "70%", background: "var(--cream-2)", borderRadius: 2 }}></div>
                    <div style={{ height: 5, width: "90%", background: "var(--cream-2)", borderRadius: 2 }}></div>
                    <div style={{ marginTop: "auto", fontFamily: "var(--font-dm-mono),'DM Mono',monospace", fontSize: 8, color: "var(--muted)" }}>helpmeclean.ca · 1/2</div>
                  </div>
                </div>
              </div>
              <span className="url">helpmeclean.ca</span>
            </div>
            <div className="proj-body">
              <span className="proj-tag">03 / Full-stack developer · 2024</span>
              <h3>Help Me Clean</h3>
              <p>
                Marketing site for a GTA cleaning company serving medical, industrial, and food-processing
                facilities. Multi-language, SEO-first, with an automated PDF intro generator for B2B
                outreach.
              </p>
              <ul className="proj-bullets">
                <li>Custom PDF generation pipeline with PDFKit for branded sales collateral</li>
                <li>next-intl + MDX for service pages across multiple languages</li>
                <li>Vercel Analytics + Speed Insights monitoring Core Web Vitals</li>
                <li>40% lift in inbound demo bookings vs. legacy site</li>
              </ul>
              <div className="proj-stack">
                <span className="stack-tag">Next.js</span>
                <span className="stack-tag">TypeScript</span>
                <span className="stack-tag">Tailwind</span>
                <span className="stack-tag">PDFKit</span>
                <span className="stack-tag">next-intl</span>
                <span className="stack-tag">Resend</span>
              </div>
            </div>
          </div>

          {/* PANEL 3 — Jomud */}
          <div className={`proj-panel ${active === 3 ? "active" : ""}`}>
            <div className="proj-art">
              <div className="stripe" style={{ background: "repeating-linear-gradient(90deg,rgba(201,90,44,0.06) 0 1px,transparent 1px 14px),linear-gradient(180deg,#ECE0D2,#DBC9B5)" }}></div>
              <span className="meta">AI · 2023</span>
              <div className="product-frame">
                <div className="pf-bar">
                  <span className="pf-dot"></span><span className="pf-dot"></span><span className="pf-dot"></span>
                  <span className="pf-title">jomud.io / resume builder</span>
                </div>
                <div className="pf-body" style={{ padding: 14, display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 10 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    <div style={{ fontFamily: "var(--font-dm-mono),'DM Mono',monospace", fontSize: 9, color: "var(--muted)", textTransform: "uppercase" }}>Sections</div>
                    <div style={{ height: 18, background: "var(--ink)", borderRadius: 4 }}></div>
                    <div style={{ height: 18, background: "var(--cream-2)", borderRadius: 4 }}></div>
                    <div style={{ height: 18, background: "var(--cream-2)", borderRadius: 4 }}></div>
                    <div style={{ height: 18, background: "var(--cream-2)", borderRadius: 4 }}></div>
                    <div style={{ height: 18, background: "var(--cream-2)", borderRadius: 4 }}></div>
                  </div>
                  <div style={{ background: "var(--cream)", border: "1px solid var(--line)", borderRadius: 6, padding: 10, display: "flex", flexDirection: "column", gap: 5 }}>
                    <div style={{ height: 10, width: "70%", background: "var(--ink)", borderRadius: 2 }}></div>
                    <div style={{ height: 5, width: "90%", background: "var(--cream-3)", borderRadius: 2 }}></div>
                    <div style={{ height: 1, background: "var(--line)", margin: "4px 0" }}></div>
                    <div style={{ height: 6, width: "40%", background: "var(--rust)", borderRadius: 2 }}></div>
                    <div style={{ height: 5, width: "90%", background: "var(--cream-2)", borderRadius: 2 }}></div>
                    <div style={{ height: 5, width: "80%", background: "var(--cream-2)", borderRadius: 2 }}></div>
                    <div style={{ height: 6, width: "40%", background: "var(--rust)", borderRadius: 2, marginTop: 4 }}></div>
                    <div style={{ height: 5, width: "88%", background: "var(--cream-2)", borderRadius: 2 }}></div>
                    <div style={{ height: 5, width: "72%", background: "var(--cream-2)", borderRadius: 2 }}></div>
                  </div>
                </div>
              </div>
              <span className="url">jomud.io</span>
            </div>
            <div className="proj-body">
              <span className="proj-tag">04 / Founding engineer · 2023</span>
              <h3>Jomud</h3>
              <p>
                AI-powered job search platform that matches candidates with roles and streamlines
                applications. Built the resume builder tool that boosted ATS scan-success by 30%.
              </p>
              <ul className="proj-bullets">
                <li>Resume builder generating ATS-optimized PDFs from structured data</li>
                <li>Spring Boot service layer with PostgreSQL, deployed on AWS</li>
                <li>Next.js frontend with server-rendered job listings and search</li>
                <li>14k+ resumes generated to date, P95 latency 2.1s</li>
              </ul>
              <div className="proj-stack">
                <span className="stack-tag">Next.js</span>
                <span className="stack-tag">Spring Boot</span>
                <span className="stack-tag">PostgreSQL</span>
                <span className="stack-tag">AWS</span>
                <span className="stack-tag">TypeScript</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
