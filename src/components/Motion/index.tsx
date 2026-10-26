"use client";

import { useEffect } from "react";

type Mode = "line" | "through" | "enter";

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

const progress: Record<Mode, (box: DOMRect, vh: number) => number> = {
  line: (box, vh) => clamp01((vh * 0.75 - box.top) / box.height),
  through: (box, vh) => clamp01((vh - box.top) / (vh + box.height)),
  enter: (box, vh) => clamp01((vh - box.top) / box.height),
};

export default function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    const vh = () => window.innerHeight;

    const reveals = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    for (const el of reveals) {
      if (el.getBoundingClientRect().top < vh()) el.classList.add("is-in");
    }
    root.classList.add("reveal-ready");

    const revealer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          revealer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    for (const el of reveals) if (!el.classList.contains("is-in")) revealer.observe(el);

    const tracked = Array.from(document.querySelectorAll<HTMLElement>("[data-progress]"));
    const stops = Array.from(document.querySelectorAll<HTMLElement>("[data-stop]"));
    let frame = 0;
    const update = () => {
      frame = 0;
      const height = vh();
      const values = tracked.map((el) => progress[el.dataset.progress as Mode](el.getBoundingClientRect(), height));
      const reached = stops.map((el) => el.getBoundingClientRect().top < height * 0.75);
      tracked.forEach((el, i) => el.style.setProperty("--p", values[i].toFixed(4)));
      stops.forEach((el, i) => (el.dataset.reached = String(reached[i])));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      revealer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      root.classList.remove("reveal-ready");
    };
  }, []);

  return null;
}
