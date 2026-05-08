"use client";

import { FormEvent, useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [label, setLabel] = useState("Subscribe");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmail("");
    setLabel("Sent ✓");
  };

  return (
    <footer className="footer">
      <div className="container-wide">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>Martin Tsang</h3>
            <p>
              Full-stack software engineer in Toronto. Designing and shipping production systems for
              startups and small businesses across North America and Hong Kong.
            </p>
            <form className="newsletter" onSubmit={onSubmit}>
              <input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit">{label}</button>
            </form>
          </div>
          <div>
            <h5>Work</h5>
            <ul>
              <li><a href="#work">Selected projects</a></li>
              <li><a href="#projects">Case studies</a></li>
              <li><a href="#approach">Approach</a></li>
              <li><a href="#stack">Tech stack</a></li>
            </ul>
          </div>
          <div>
            <h5>Career</h5>
            <ul>
              <li><a href="#career">Asynk · 2023 — present</a></li>
              <li><a href="#career">Ace Innovation · 2024</a></li>
              <li><a href="#career">Apoidea · 2022 — 2024</a></li>
              <li><a href="#career">P L Tech · 2021 — 2022</a></li>
            </ul>
          </div>
          <div>
            <h5>Industries</h5>
            <ul>
              <li><a href="#industries">Booking &amp; wellness</a></li>
              <li><a href="#industries">Legal &amp; notary</a></li>
              <li><a href="#industries">AI · career tech</a></li>
              <li><a href="#industries">Local services</a></li>
              <li><a href="#industries">Fintech &amp; lending</a></li>
            </ul>
          </div>
          <div>
            <h5>Connect</h5>
            <ul>
              <li><a href="mailto:tsangmartin1225@gmail.com">Email</a></li>
              <li><a href="https://github.com/marttsang2">GitHub</a></li>
              <li><a href="https://linkedin.com/in/marttsang2">LinkedIn</a></li>
              <li><a href="#cv">CV / Résumé (PDF)</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="mono" style={{ fontSize: 12, color: "rgba(242,238,227,0.5)" }}>
            © 2026 Martin Tsang · Built in Toronto
          </span>
          <div className="legal">
            <a href="#">Privacy</a>
            <a href="#">Imprint</a>
            <a href="https://github.com/marttsang2/martintsang">View source</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
