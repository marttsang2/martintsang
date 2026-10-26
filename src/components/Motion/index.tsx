"use client";

import { useEffect } from "react";

type Mode = "line" | "through" | "enter" | "exit";
type Box = { top: number; height: number };

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

const progress: Record<Mode, (box: Box, y: number, vh: number) => number> = {
  line: (box, y, vh) => clamp01((vh * 0.75 - (box.top - y)) / box.height),
  through: (box, y, vh) => clamp01((vh - (box.top - y)) / (vh + box.height)),
  enter: (box, y, vh) => clamp01((vh - (box.top - y)) / box.height),
  exit: (box, y) => clamp01(y / (box.top + box.height)),
};

// Pointer-led layers. Offsets are in px at the zone's edges; negative moves against the pointer.
const followers = [
  { zone: "[data-hero]", layer: "[data-hero-layer]", x: -14, y: -8 },
  { zone: "[data-shot]", layer: "img", x: -14, y: -10 },
];

// Document position from layout offsets, so transforms (reveals, drift, scale) never skew it.
const docBox = (el: HTMLElement): Box => {
  let top = 0;
  for (let node: HTMLElement | null = el; node; node = node.offsetParent as HTMLElement | null) top += node.offsetTop;
  return { top, height: el.offsetHeight };
};

const all = <T extends HTMLElement = HTMLElement>(selector: string) => Array.from(document.querySelectorAll<T>(selector));

function numberLines(headings: HTMLElement[]) {
  const tops = headings.map((h) => Array.from(h.querySelectorAll<HTMLElement>(".word"), (w) => [w, w.offsetTop] as const));
  for (const words of tops) {
    let line = 0;
    words.forEach(([word, top], i) => {
      if (i > 0 && top > words[i - 1][1] + 4) line++;
      word.style.setProperty("--line", String(line));
    });
  }
}

function reveals() {
  const items = all("[data-reveal], [data-lines]");
  const headings = items.filter((el) => el.hasAttribute("data-lines"));
  numberLines(headings);
  const fold = window.innerHeight;
  for (const el of items) if (el.getBoundingClientRect().top < fold) el.classList.add("is-in");
  document.documentElement.classList.add("reveal-ready");

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -10% 0px" },
  );
  for (const el of items) if (!el.classList.contains("is-in")) observer.observe(el);

  const renumber = () => numberLines(headings.filter((el) => !el.classList.contains("is-in")));
  document.fonts.ready.then(renumber);
  window.addEventListener("resize", renumber);
  return () => {
    observer.disconnect();
    window.removeEventListener("resize", renumber);
    document.documentElement.classList.remove("reveal-ready");
  };
}

function scrollLinked() {
  const header = document.querySelector<HTMLElement>("[data-header]");
  const indicator = document.querySelector<HTMLElement>("[data-nav-indicator]");
  const links = all<HTMLAnchorElement>("[data-nav-link]");
  // The nav links and the sections they point at come from the same list in content.ts.
  const sections = links.map((link) => document.getElementById(link.hash.slice(1)) as HTMLElement);
  const chapters = all("[data-chapter]");
  const tracked = all("[data-progress]");
  const stops = all("[data-stop]");

  const measure = () => {
    const doc = document.documentElement;
    return {
      vh: window.innerHeight,
      end: doc.scrollHeight,
      maxScroll: doc.scrollHeight - window.innerHeight,
      headerBottom: header ? header.offsetHeight + parseFloat(getComputedStyle(header).top) : 0,
      tracked: tracked.map(docBox),
      stops: stops.map((el) => docBox(el).top),
      chapters: chapters.map((el) => ({ top: docBox(el).top, ground: el.dataset.chapter ?? "paper" })),
      sections: sections.map((el) => docBox(el).top),
      links: links.map((link) => {
        const line = link.firstElementChild as HTMLElement;
        return { x: line.offsetLeft, w: line.offsetWidth };
      }),
    };
  };

  let geo = measure();
  let frame = 0;
  let active = -1;
  // Each element carries one scroll-driven value; skipping unchanged writes keeps idle frames free of style work.
  const written = new Map<Element, string>();
  const write = (el: HTMLElement, value: string, set: () => void) => {
    if (written.get(el) === value) return;
    written.set(el, value);
    set();
  };

  const place = (index: number) => {
    if (!indicator) return;
    const { x, w } = geo.links[index];
    indicator.style.setProperty("--x", `${x}px`);
    indicator.style.setProperty("--w", String(w / 100));
  };

  const update = () => {
    frame = 0;
    const y = window.scrollY;
    const line = y + geo.headerBottom;

    tracked.forEach((el, i) => {
      const p = progress[el.dataset.progress as Mode](geo.tracked[i], y, geo.vh).toFixed(4);
      write(el, p, () => el.style.setProperty("--p", p));
    });
    stops.forEach((el, i) => {
      const reached = String(geo.stops[i] - y < geo.vh * 0.75);
      write(el, reached, () => (el.dataset.reached = reached));
    });

    if (header) {
      const ground = geo.chapters.findLast((c) => c.top <= line + 1)?.ground ?? "ink";
      write(header, ground, () => (header.dataset.ground = ground));
    }

    if (!indicator) return;
    const next = geo.sections.findLastIndex((top) => top <= line + 1);
    if (next !== active) {
      if (next < 0) indicator.removeAttribute("data-on");
      else {
        if (active < 0) {
          indicator.setAttribute("data-snap", "");
          requestAnimationFrame(() => requestAnimationFrame(() => indicator.removeAttribute("data-snap")));
        }
        place(next);
        indicator.setAttribute("data-on", "");
      }
      active = next;
    }
    if (active >= 0) {
      const start = geo.sections[active];
      const end = Math.min(geo.sections[active + 1] ?? geo.end, geo.maxScroll + geo.headerBottom);
      const p = clamp01((line - start) / Math.max(1, end - start)).toFixed(4);
      write(indicator, p, () => indicator.style.setProperty("--p", p));
    }
  };

  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };
  const remeasure = () => {
    geo = measure();
    if (active >= 0) place(active);
    schedule();
  };

  update();
  const resized = new ResizeObserver(remeasure);
  resized.observe(document.body);
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", remeasure);
  document.fonts.ready.then(remeasure);

  return () => {
    cancelAnimationFrame(frame);
    resized.disconnect();
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", remeasure);
  };
}

function pointerLayers() {
  const fine = matchMedia("(hover: hover) and (pointer: fine)");
  const calm = matchMedia("(prefers-reduced-motion: reduce)");
  const cleanups: (() => void)[] = [];

  for (const { zone: zoneSelector, layer: layerSelector, x, y } of followers) {
    for (const zone of all(zoneSelector)) {
      const layer = zone.querySelector<HTMLElement>(layerSelector);
      if (!layer) continue;
      let frame = 0;
      let pointer = { x: 0, y: 0 };

      const apply = () => {
        frame = 0;
        const box = zone.getBoundingClientRect();
        const nx = clamp01((pointer.x - box.left) / box.width) * 2 - 1;
        const ny = clamp01((pointer.y - box.top) / box.height) * 2 - 1;
        layer.style.translate = `${(nx * x).toFixed(2)}px ${(ny * y).toFixed(2)}px`;
      };
      const move = (event: PointerEvent) => {
        if (event.pointerType !== "mouse" || !fine.matches || calm.matches) return;
        pointer = { x: event.clientX, y: event.clientY };
        if (!frame) frame = requestAnimationFrame(apply);
      };
      const leave = () => {
        cancelAnimationFrame(frame);
        frame = 0;
        layer.style.translate = "";
      };

      zone.addEventListener("pointermove", move, { passive: true });
      zone.addEventListener("pointerleave", leave);
      cleanups.push(() => {
        zone.removeEventListener("pointermove", move);
        zone.removeEventListener("pointerleave", leave);
        leave();
      });
    }
  }
  return () => cleanups.forEach((cleanup) => cleanup());
}

// The header slides away while the reader scrolls down and returns on any scroll up. It stays in view at the top
// of the page and while an in-page link scrolls the page; CSS keeps it in view under reduced motion and while it holds focus.
function hidingHeader() {
  const header = document.querySelector<HTMLElement>("[data-header]");
  if (!header) return () => {};
  let last = window.scrollY;
  let travel = 0;
  let frame = 0;
  let jump = 0;
  let top = header.offsetHeight * 2;

  const update = () => {
    frame = 0;
    const y = window.scrollY;
    const dy = y - last;
    last = y;
    travel = Math.sign(dy) === Math.sign(travel) ? travel + dy : dy;
    if (y < top || jump) header.removeAttribute("data-hidden");
    else if (travel > 16) header.setAttribute("data-hidden", "");
    else if (travel < -8) header.removeAttribute("data-hidden");
  };
  // A jump ends once the page has not scrolled for 200 ms.
  const holdJump = () => {
    clearTimeout(jump);
    jump = window.setTimeout(() => {
      jump = 0;
      travel = 0;
    }, 200);
  };
  const scrolled = () => {
    if (jump) holdJump();
    if (!frame) frame = requestAnimationFrame(update);
  };
  const clicked = (event: MouseEvent) => {
    if (!(event.target instanceof Element) || !event.target.closest('a[href^="#"]')) return;
    header.removeAttribute("data-hidden");
    holdJump();
  };
  const resized = () => (top = header.offsetHeight * 2);

  window.addEventListener("scroll", scrolled, { passive: true });
  window.addEventListener("resize", resized);
  document.addEventListener("click", clicked);
  return () => {
    cancelAnimationFrame(frame);
    clearTimeout(jump);
    window.removeEventListener("scroll", scrolled);
    window.removeEventListener("resize", resized);
    document.removeEventListener("click", clicked);
    header.removeAttribute("data-hidden");
  };
}

export default function Motion() {
  useEffect(() => {
    const cleanups = [reveals(), scrollLinked(), pointerLayers(), hidingHeader()];
    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return null;
}
