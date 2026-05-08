"use client";

import { useState } from "react";

const tabs = [
  {
    num: "01",
    name: "Discovery",
    eyebrow: "01 / Discovery",
    title: "Find the smallest thing worth shipping.",
    body: "One week. We dig into the actual problem — the spreadsheets people are tired of, the metric the CEO is anxious about — and define a v1 you can ship in 60 days, not 12 months.",
    badge: "Workshop · 5 days",
    badgeStyle: {},
    glyphStyle: {},
    artStyle: {},
    link: "Start a discovery sprint",
  },
  {
    num: "02",
    name: "Architecture",
    eyebrow: "02 / Architecture",
    title: "Pragmatic stack choices that age well.",
    body: "Postgres over exotic DBs. Spring Boot or Node where it pays off. React + Tailwind on the frontend. Kubernetes only when you need it. No resume-driven engineering.",
    badge: "ADRs delivered",
    badgeStyle: {},
    glyphStyle: { borderStyle: "dashed" as const },
    artStyle: {
      background:
        "repeating-linear-gradient(45deg,rgba(14,15,14,0.06) 0 1px,transparent 1px 18px),linear-gradient(180deg,var(--cream-2),var(--cream-3))",
    },
    link: "Review your architecture",
  },
  {
    num: "03",
    name: "Build & ship",
    eyebrow: "03 / Build & ship",
    title: "Daily progress in your Slack, weekly demos in your Zoom.",
    body: "You see what I'm shipping every day. Branch deploys for every PR. Real domain on day one. The first user can sign up before the design is finished.",
    badge: "CI on every push",
    badgeStyle: {},
    glyphStyle: {
      background: "linear-gradient(135deg,var(--cream),var(--cream-3))",
    },
    artStyle: {},
    link: "Start building",
  },
  {
    num: "04",
    name: "Operate",
    eyebrow: "04 / Operate",
    title: "I stay on through GA, then hand off cleanly.",
    body: "30 days of post-launch support included. Runbooks, dashboards, and on-call playbook written for whoever inherits it — usually your in-house team or a junior I've coached.",
    badge: "SLO 99.9%",
    badgeStyle: { background: "var(--moss)", color: "var(--cream)" },
    glyphStyle: {},
    artStyle: {
      background:
        "repeating-linear-gradient(0deg,rgba(31,58,42,0.08) 0 1px,transparent 1px 16px),linear-gradient(180deg,#DEE3D8,#C9D2C0)",
    },
    link: "Hand-off plan",
  },
];

export default function Experiences() {
  const [active, setActive] = useState(0);

  return (
    <section id="career" className="stream">
      <div className="container-wide">
        <div className="stream-head">
          <div>
            <span className="section-eyebrow">
              <span className="sq"></span>How I work
            </span>
            <h2 className="section-title">
              A composable engineering practice. <em>Built around your stack.</em>
            </h2>
          </div>
          <p>
            Whether you need a system from scratch, a rescue mission on legacy code, or a senior pair
            on a hard problem — I plug into your team like a permanent engineer, just with a fixed
            scope.
          </p>
        </div>

        <div className="cube-wrap">
          <div className="cube">
            <div className="face f-front"></div>
            <div className="face f-back"></div>
            <div className="face f-right"></div>
            <div className="face f-left"></div>
            <div className="face f-top"></div>
            <div className="face f-bottom"></div>
          </div>
        </div>

        <div className="stream-grid">
          <div className="stream-tabs" role="tablist">
            {tabs.map((t, i) => (
              <button
                key={i}
                className={`stream-tab ${active === i ? "active" : ""}`}
                onClick={() => setActive(i)}
              >
                <span className="num">{t.num}</span>
                <span className="name">{t.name}</span>
                <span className="chev">→</span>
              </button>
            ))}
          </div>

          <div className="stream-panels">
            {tabs.map((t, i) => (
              <div
                key={i}
                className="stream-panel"
                style={{ display: active === i ? "flex" : "none" }}
              >
                <div className="stream-panel-eyebrow">{t.eyebrow}</div>
                <h3>{t.title}</h3>
                <p>{t.body}</p>
                <div className="panel-art" style={t.artStyle}>
                  <span className="badge" style={t.badgeStyle}>{t.badge}</span>
                  <div className="glyph" style={t.glyphStyle}></div>
                </div>
                <a href="#contact" className="panel-link">
                  {t.link} <span className="arrow">→</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
