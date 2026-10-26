// Checks the motion layer in headless Chrome and fails on any broken rule:
// layout shift, properties other than transform and opacity animating, curves or durations outside the motion tokens,
// each interaction (name, rolling button, list rows, underlines, hiding header), hover motion on touch screens,
// content hidden under reduced motion or with JavaScript off, wrong figures, and the nav state.
// Usage: node scripts/check-motion.mjs [url] [outDir]
import puppeteer from "puppeteer-core";
import fs from "node:fs";
import path from "node:path";
import { findChrome } from "./lib/chrome.mjs";

const url = process.argv[2] ?? "http://localhost:3000";
const outDir = process.argv[3] ?? ".shots/motion-check";
fs.mkdirSync(outDir, { recursive: true });

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const allowed = new Set(["transform", "opacity", "translate", "scale"]);
const tokens = {
  "--ease-out": "cubic-bezier(0.2, 0.8, 0.2, 1)",
  "--ease-io": "cubic-bezier(0.7, 0, 0.2, 1)",
  "--ease-gentle": "cubic-bezier(0.2, 0.7, 0.2, 1)",
  "--d-press": "0.14s",
  "--d-fast": "0.35s",
  "--d-hover": "0.45s",
  "--d-slow": "0.6s",
  "--d-reveal": "1s",
  "--d-open": "1.2s",
  "--stagger": "0.08s",
  "--stagger-char": "0.035s",
};
// The CSS minifier rewrites values (".2", "80ms"), so compare curves by their numbers and times in seconds.
const norm = (value) => {
  const numbers = value.match(/-?\d*\.?\d+/g)?.map(Number) ?? [];
  if (value.includes("cubic-bezier")) return `curve ${numbers.join(" ")}`;
  return `${value.trim().endsWith("ms") ? numbers[0] / 1000 : numbers[0]}s`;
};
const curves = new Set(Object.entries(tokens).filter(([k]) => k.startsWith("--ease")).map(([, v]) => norm(v)));
const durations = new Set(Object.entries(tokens).filter(([k]) => /^--d-/.test(k)).map(([, v]) => norm(v)));
const figures = ["5+ yrs", "15+ projects", "Full-stack"];
const pointers = {
  fine: "primaryPointerType=4,availablePointerTypes=4,primaryHoverType=2,availableHoverTypes=2",
  coarse: "primaryPointerType=2,availablePointerTypes=2,primaryHoverType=1,availableHoverTypes=1",
};

let failures = 0;
const check = (ok, label, detail = "") => {
  if (!ok) failures++;
  console.log(`${ok ? "ok  " : "FAIL"}  ${label}${detail ? `  (${detail})` : ""}`);
};

const launch = (pointer) =>
  puppeteer.launch({
    executablePath: findChrome(),
    headless: true,
    args: ["--no-sandbox", "--hide-scrollbars", `--blink-settings=${pointers[pointer]}`],
  });

// Records layout shifts, every property that starts a transition or keyframe animation, and the curve and duration it runs on.
const recorder = () => {
  window.__shifts = [];
  window.__animated = {};
  window.__runs = new Set();
  window.__timings = {};
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.__shifts.push(entry.value);
  }).observe({ type: "layout-shift", buffered: true });
  const label = (el, pseudo = "") => (el instanceof Element ? `${el.tagName.toLowerCase()}.${[...el.classList].join(".")}${pseudo}` : "?");
  const note = (prop, where) => {
    window.__animated[prop] ??= where;
    window.__runs.add(`${prop} on ${where}`);
  };
  const split = (list) => list.split(/,(?![^(]*\))/).map((s) => s.trim());
  const timing = (names, name, curvesList, durationsList, where) => {
    const all = split(names);
    let i = all.indexOf(name);
    if (i < 0) i = all.indexOf("all");
    const c = split(curvesList);
    const d = split(durationsList);
    window.__timings[`${c[i % c.length]} | ${d[i % d.length]}`] ??= where;
  };
  document.addEventListener(
    "transitionrun",
    (e) => {
      const where = label(e.target, e.pseudoElement);
      note(e.propertyName, where);
      const style = getComputedStyle(e.target, e.pseudoElement || null);
      timing(style.transitionProperty, e.propertyName, style.transitionTimingFunction, style.transitionDuration, where);
    },
    true,
  );
  document.addEventListener(
    "animationstart",
    (e) => {
      const where = label(e.target);
      for (const anim of e.target.getAnimations()) {
        if (anim.animationName !== e.animationName) continue;
        for (const frame of anim.effect.getKeyframes())
          for (const key of Object.keys(frame))
            if (!["offset", "computedOffset", "easing", "composite"].includes(key)) note(key, where);
      }
      const style = getComputedStyle(e.target);
      timing(style.animationName, e.animationName, style.animationTimingFunction, style.animationDuration, where);
    },
    true,
  );
};

async function wheelThrough(page, from, to, step = 120) {
  await page.mouse.move(700, 500);
  for (let y = from; y < to; y += step) {
    await page.mouse.wheel({ deltaY: step });
    await wait(30);
  }
}

const wheelBy = async (page, distance, step = 100) => {
  for (let moved = 0; Math.abs(moved) < Math.abs(distance); moved += Math.sign(distance) * step) {
    await page.mouse.wheel({ deltaY: Math.sign(distance) * step });
    await wait(40);
  }
};

const centreOf = (page, selector) =>
  page.$eval(selector, (el) => {
    el.scrollIntoView({ block: "center", behavior: "instant" });
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  });

async function hoverAll(page) {
  for (const selector of ["#top .button", '#top a[href*="github"]', "[data-shot]", "#projects .fill-row a", "#experiences .fill-row"]) {
    if (!(await page.$(selector))) continue;
    const box = await centreOf(page, selector);
    await wait(300);
    await page.mouse.move(box.x - 40, box.y);
    await page.mouse.move(box.x, box.y, { steps: 8 });
    await wait(400);
    // Press, then release off the target: the press feedback runs without opening the link.
    await page.mouse.down();
    await wait(200);
    await page.mouse.move(box.x, box.y + 300, { steps: 4 });
    await page.mouse.up();
    await wait(300);
  }
}

// Each row's fill (scale and origin), its content's opacity and the label's step, read from the page.
const rowState = (page, list) =>
  page.$$eval(`${list} > .fill-row`, (rows) =>
    rows.map((row) => {
      const fill = getComputedStyle(row, "::before");
      const m = new DOMMatrix(fill.transform);
      const shift = row.querySelector(".fill-shift");
      return {
        scale: Number(m.a.toFixed(3)),
        fillOpacity: Number(fill.opacity),
        origin: parseFloat(fill.transformOrigin) < 1 ? "left" : "right",
        dim: Number(getComputedStyle(row.querySelector(".fill-dim")).opacity),
        shift: Math.round(new DOMMatrix(getComputedStyle(shift).transform).e),
      };
    }),
  );

const underline = (page, selector) =>
  page.$eval(selector, (el) => {
    const line = getComputedStyle(el.querySelector(".link-line"), "::after");
    return { scale: Number(new DOMMatrix(line.transform).a.toFixed(3)), origin: parseFloat(line.transformOrigin) < 1 ? "left" : "right" };
  });

const rollState = (page) =>
  page.$$eval("#top .roll-label .char", (chars) => chars.map((c) => Number((new DOMMatrix(getComputedStyle(c).transform).f / c.getBoundingClientRect().height).toFixed(2))));

const headerState = (page) =>
  page.evaluate(() => {
    const header = document.querySelector("[data-header]");
    const r = header.getBoundingClientRect();
    return { hidden: header.hasAttribute("data-hidden"), top: Math.round(r.top), bottom: Math.round(r.bottom), indicator: document.querySelector("[data-nav-indicator]").hasAttribute("data-on") };
  });

// 1. Fine pointer: layout shift, animated properties and their timing, each interaction, figures, nav state.
{
  const browser = await launch("fine");
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.evaluateOnNewDocument(recorder);
  await page.goto(url, { waitUntil: "networkidle0" });
  await wait(1800);

  const rootTokens = await page.evaluate((names) => {
    const style = getComputedStyle(document.documentElement);
    return Object.fromEntries(names.map((n) => [n, style.getPropertyValue(n).trim()]));
  }, Object.keys(tokens));
  const wrong = Object.entries(tokens).filter(([k, v]) => norm(rootTokens[k]) !== norm(v));
  check(wrong.length === 0, "the KittenJam motion tokens are set on :root", wrong.map(([k]) => `${k}: ${rootTokens[k]}`).join("; "));

  const name = await page.evaluate(() => {
    const h1 = document.querySelector("h1");
    const size = parseFloat(getComputedStyle(h1).fontSize);
    const chars = [...h1.querySelectorAll(".char")];
    const settled = chars.every((c) => getComputedStyle(c).opacity === "1" && ["none", "matrix(1, 0, 0, 1, 0, 0)"].includes(getComputedStyle(c).transform));
    const masked = chars.every((c) => getComputedStyle(c.closest(".word")).clipPath !== "none");
    const delays = chars.map((c) => parseFloat(getComputedStyle(c).animationDelay));
    // The split letters must sit where the font's own kerning puts them in the unsplit word.
    const drift = [];
    const kerning = {};
    for (const word of h1.querySelectorAll(".word")) {
      const letters = [...word.querySelectorAll(".char")];
      const probe = document.createElement("span");
      probe.textContent = letters.map((c) => c.textContent).join("");
      probe.style.cssText = "position:absolute;left:0;top:0;white-space:pre;visibility:hidden";
      word.appendChild(probe);
      const range = document.createRange();
      const at = (i) => {
        range.setStart(probe.firstChild, i);
        range.setEnd(probe.firstChild, i + 1);
        return range.getBoundingClientRect().left;
      };
      const x0 = letters[0].getBoundingClientRect().left;
      const k0 = at(0);
      let previous = 0;
      letters.forEach((c, i) => {
        const d = c.getBoundingClientRect().left - x0 - (at(i) - k0);
        drift.push(Number(d.toFixed(2)));
        if (i > 0) kerning[`${letters[i - 1].textContent}${c.textContent}`] = Number(((parseFloat(getComputedStyle(c).marginLeft) - (d - previous)) / size).toFixed(4));
        previous = d;
      });
      probe.remove();
    }
    return { label: h1.getAttribute("aria-label"), text: h1.textContent, settled, masked, delays, drift, kerning };
  });
  check(name.label === "Martin Tsang" && name.text === "Martin Tsang", "name: the h1 reads Martin Tsang", `${name.label} | ${name.text}`);
  check(name.settled && name.masked, "name: every letter rose out of its word mask and rests in place");
  check(name.delays.every((d, i) => i === 0 || d > name.delays[i - 1]), "name: letters rise one after another", name.delays.map((d) => d.toFixed(3)).join(" "));
  check(name.drift.every((d) => Math.abs(d) < 0.5), "name: split letters keep Geist's kerning", `drift px ${name.drift.join(" ")}; if this fails set nameKerning in Hero to ${JSON.stringify(name.kerning)}`);

  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  await wheelThrough(page, 0, height);
  await wait(1500);
  await hoverAll(page);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await wait(600);

  // Rolling button: letters roll up one after another, then rest a full line up, and roll back on leave.
  const button = await centreOf(page, "#top .button");
  await page.mouse.move(button.x - 200, button.y + 120);
  await wait(300);
  await page.mouse.move(button.x, button.y);
  await wait(200);
  const rollMid = await rollState(page);
  await wait(900);
  const rollEnd = await rollState(page);
  await page.mouse.move(button.x - 200, button.y + 120);
  await wait(1200);
  const rollBack = await rollState(page);
  const accessible = await page.$eval("#top .button", (a) => ({ label: a.getAttribute("aria-label"), hidden: a.querySelector(".roll-label").getAttribute("aria-hidden"), copies: getComputedStyle(a.querySelector(".roll-label .char"), "::after").content }));
  check(rollMid[0] < rollMid.at(-1) && rollMid[0] < 0, "cta: the label rolls letter by letter, first letter leading", rollMid.join(" "));
  check(rollEnd.every((r) => r === -1) && rollBack.every((r) => r === 0), "cta: each letter rolls a full line up on hover and back on leave", `${rollEnd.join(" ")} | ${rollBack.join(" ")}`);
  check(accessible.label === "Get in touch" && accessible.hidden === "true" && accessible.copies === '"G"', "cta: one accessible name, the rolling copies hidden from assistive tech", JSON.stringify(accessible));

  // Underline: grows from the left on hover, leaves to the right.
  const github = await centreOf(page, '#top a[href*="github"]');
  await page.mouse.move(github.x, github.y + 80);
  await wait(300);
  await page.mouse.move(github.x, github.y);
  await wait(150);
  const lineIn = await underline(page, '#top a[href*="github"]');
  await wait(600);
  const lineFull = await underline(page, '#top a[href*="github"]');
  await page.mouse.move(github.x, github.y + 80);
  await wait(150);
  const lineOut = await underline(page, '#top a[href*="github"]');
  await wait(600);
  const lineGone = await underline(page, '#top a[href*="github"]');
  check(lineIn.origin === "left" && lineIn.scale > 0 && lineIn.scale < 1 && lineFull.scale === 1, "underline: grows in from the left on hover", `${JSON.stringify(lineIn)} -> ${lineFull.scale}`);
  check(lineOut.origin === "right" && lineOut.scale < 1 && lineOut.scale > 0 && lineGone.scale === 0, "underline: leaves to the right on hover-out", `${JSON.stringify(lineOut)} -> ${lineGone.scale}`);

  // List rows: the fill wipes in from the left, the label steps in, the other rows dim; moving on, the fill leaves to the right.
  for (const [list, shift] of [
    ["#projects ol", 16],
    ["#experiences ol", 12],
  ]) {
    const rows = await page.$$(`${list} > .fill-row`);
    const at = async (i) => {
      const box = await rows[i].boundingBox();
      return { x: box.x + box.width * 0.6, y: box.y + box.height / 2 };
    };
    await rows[1].evaluate((el) => el.scrollIntoView({ block: "center", behavior: "instant" }));
    await wait(1600);
    const first = await at(1);
    await page.mouse.move(first.x, first.y, { steps: 4 });
    await wait(900);
    const on = await rowState(page, list);
    const next = await at(2);
    await page.mouse.move(next.x, next.y, { steps: 2 });
    await wait(180);
    const moving = await rowState(page, list);
    await page.mouse.move(5, 5, { steps: 2 });
    await wait(900);
    const off = await rowState(page, list);
    const others = on.filter((_, i) => i !== 1);
    check(on[1].scale === 1 && on[1].origin === "left" && on[1].dim === 1 && on[1].shift === shift, `${list} rows: the hovered row fills from the left and its label steps in ${shift}px`, JSON.stringify(on[1]));
    check(others.every((r) => r.dim === 0.45 && r.scale === 0), `${list} rows: the other rows dim to 0.45`, others.map((r) => r.dim).join(" "));
    check(moving[1].origin === "right" && moving[1].scale < 1 && moving[1].scale > 0 && moving[2].origin === "left", `${list} rows: moving on, the old fill leaves to the right while the next fills from the left`, `${JSON.stringify(moving[1])} ${JSON.stringify(moving[2])}`);
    check(off.every((r) => r.scale === 0 && r.dim === 1 && r.shift === 0), `${list} rows: leaving the list clears every fill and dim`);
  }

  // Keyboard: tabbing onto a work row gives it the fill and dims the others, as hovering does.
  await page.$eval("#projects ol > .fill-row a", (a) => a.focus());
  await page.keyboard.press("Tab");
  await wait(900);
  const keyed = await rowState(page, "#projects ol");
  check(keyed[1].scale === 1 && keyed[1].dim === 1 && keyed.filter((_, i) => i !== 1).every((r) => r.dim === 0.45), "#projects ol rows: keyboard focus fills the row and dims the others", JSON.stringify(keyed.map((r) => [r.scale, r.dim])));
  await page.evaluate(() => document.activeElement.blur());

  const shown = await page.evaluate(() =>
    Array.from(document.querySelectorAll("#about dd"), (dd) => ({
      text: dd.textContent,
      rolls: Array.from(dd.querySelectorAll(".roll"), (roll) => {
        const ty = new DOMMatrix(getComputedStyle(roll, "::after").transform).m42;
        return { digit: Number(roll.textContent), row: Math.round(-ty / roll.getBoundingClientRect().height) };
      }),
    })),
  );
  check(JSON.stringify(shown.map((s) => s.text)) === JSON.stringify(figures), "About figures keep their exact text", shown.map((s) => s.text).join(" | "));
  const rolled = shown.flatMap((s) => s.rolls);
  check(rolled.length === 3 && rolled.every((r) => r.digit === r.row), "every rolling digit rests on its real value", rolled.map((r) => `${r.digit}->${r.row}`).join(" "));

  // Header: hides on the way down, returns on the way up with the section indicator, stays for a nav jump and for focus.
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await wait(500);
  await page.mouse.move(700, 500);
  const atTop = await headerState(page);
  await wheelBy(page, 1600);
  await wait(700);
  const down = await headerState(page);
  await wheelBy(page, -200);
  await wait(700);
  const up = await headerState(page);
  check(!atTop.hidden && atTop.top >= -12, "header: shown at the top of the page", JSON.stringify(atTop));
  check(down.hidden && down.bottom <= 0, "header: slides out of view while scrolling down", JSON.stringify(down));
  check(!up.hidden && up.top >= -12 && up.indicator, "header: slides back on scroll up, with the section indicator", JSON.stringify(up));
  await wheelBy(page, 800);
  await wait(700);
  await page.evaluate(() => document.querySelector("header nav a").focus({ preventScroll: true }));
  await wait(500);
  const focused = await headerState(page);
  check(focused.hidden && focused.top >= -12, "header: comes back while a link inside it has focus", JSON.stringify(focused));
  await page.evaluate(() => document.activeElement.blur());
  await wheelBy(page, -300);
  await wait(700);

  const career = await page.$eval('header [data-nav-link][href="#experiences"]', (el) => {
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  });
  await page.mouse.click(career.x, career.y);
  await wait(300);
  const jumping = await headerState(page);
  await wait(2200);
  const nav = await page.evaluate(() => {
    const indicator = document.querySelector("[data-nav-indicator]");
    const link = document.querySelector('[data-nav-link][href="#experiences"] .link-line');
    const header = document.querySelector("[data-header]");
    return {
      ground: header.dataset.ground,
      hidden: header.hasAttribute("data-hidden"),
      on: indicator.hasAttribute("data-on"),
      x: parseFloat(indicator.style.getPropertyValue("--x")),
      linkX: link.offsetLeft,
    };
  });
  check(!jumping.hidden && !nav.hidden, "header: stays in view through a nav jump", `${JSON.stringify(jumping)}`);
  check(nav.ground === "stone" && nav.on && Math.abs(nav.x - nav.linkX) < 1, "nav click: header takes the Career ground, indicator sits under Career", JSON.stringify(nav));

  const { shifts, animated, timings } = await page.evaluate(() => ({ shifts: window.__shifts, animated: window.__animated, timings: window.__timings }));
  const cls = shifts.reduce((a, b) => a + b, 0);
  check(cls < 0.01, "cumulative layout shift over load, full scroll, hovers and header", `CLS ${cls.toFixed(4)}`);
  const strays = Object.entries(animated).filter(([prop]) => !allowed.has(prop));
  check(strays.length === 0, "only transform, translate, scale and opacity animate", strays.length ? strays.map(([p, w]) => `${p} on ${w}`).join("; ") : Object.keys(animated).sort().join(", "));
  const offToken = Object.entries(timings).filter(([key]) => {
    const [curve, duration] = key.split(" | ");
    return !curves.has(norm(curve)) || !durations.has(norm(duration));
  });
  check(offToken.length === 0, "every transition and animation runs on a token curve and duration", offToken.length ? offToken.map(([k, w]) => `${k} on ${w}`).join("; ") : `${Object.keys(timings).length} pairings`);
  await browser.close();
}

// 2. Touch: no hover or pointer-led motion.
{
  const browser = await launch("coarse");
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  await page.evaluateOnNewDocument(recorder);
  await page.goto(url, { waitUntil: "networkidle0" });
  await wait(1500);
  await page.evaluate(() => window.__runs.clear());
  await hoverAll(page);
  const state = await page.evaluate(() => ({
    animated: [...window.__runs].filter((run) => /^(translate|scale) /.test(run) && !run.startsWith("scale on a.button") && !run.startsWith("translate on header")),
    translated: Array.from(document.querySelectorAll("[data-hero-layer], [data-shot] img"), (el) => el.style.translate).filter(Boolean),
    zoom: Array.from(document.querySelectorAll(".shot-img"), (el) => getComputedStyle(el).scale).filter((s) => s !== "none"),
    lines: Array.from(document.querySelectorAll("#top .link-line"), (el) => getComputedStyle(el, "::after").transform),
    rolled: Array.from(document.querySelectorAll("#top .roll-label .char"), (el) => getComputedStyle(el).transform).filter((t) => t !== "none"),
    filled: Array.from(document.querySelectorAll(".fill-row"), (el) => new DOMMatrix(getComputedStyle(el, "::before").transform).a).filter((a) => a !== 0),
    dimmed: Array.from(document.querySelectorAll(".fill-dim"), (el) => getComputedStyle(el).opacity).filter((o) => o !== "1"),
  }));
  check(state.translated.length === 0 && state.zoom.length === 0 && !state.animated.length && !state.rolled.length, "touch: no pointer-led translate, zoom or label roll", JSON.stringify(state.translated.concat(state.zoom, state.animated, state.rolled)));
  check(state.lines.every((t) => t.startsWith("matrix(0,")), "touch: tapping a link does not leave its hover line drawn", state.lines.join(" "));
  check(!state.filled.length && !state.dimmed.length, "touch: tapping a list row leaves no fill and no dim", JSON.stringify(state));
  await page.screenshot({ path: path.join(outDir, "touch-390-fold.png") });
  await browser.close();
}

// 3. Reduced motion and JavaScript off: the finished page, nothing hidden, nothing travels.
for (const mode of ["reduced-motion", "no-js"]) {
  const browser = await launch("fine");
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  if (mode === "reduced-motion") await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  else await page.setJavaScriptEnabled(false);
  await page.goto(url, { waitUntil: "networkidle0" });
  await wait(mode === "no-js" ? 1500 : 150);
  const firstScreen = await page.evaluate(() =>
    Array.from(document.querySelectorAll("h1 .char, #top p, #top a"))
      .filter((el) => getComputedStyle(el).opacity !== "1" || !["none", "matrix(1, 0, 0, 1, 0, 0)"].includes(getComputedStyle(el).transform))
      .map((el) => el.textContent.trim().slice(0, 30)),
  );
  check(firstScreen.length === 0, `${mode}: the first screen is readable at once`, firstScreen.join(" | "));

  if (mode === "reduced-motion") {
    const button = await centreOf(page, "#top .button");
    await page.mouse.move(button.x, button.y);
    await wait(700);
    const roll = await rollState(page);
    check(roll.every((r) => r === 0), "reduced-motion: the button label does not roll", roll.join(" "));
    const row = await centreOf(page, "#projects ol > .fill-row a");
    await page.mouse.move(row.x, row.y);
    await wait(700);
    const rows = await rowState(page, "#projects ol");
    const hovered = rows.find((r) => r.fillOpacity === 1);
    check(hovered && hovered.scale === 1 && hovered.shift === 0 && rows.every((r) => r.scale === 1), "reduced-motion: a row's fill fades in place, with no wipe and no step", JSON.stringify(rows));
    await page.mouse.move(5, 5);
  }

  // Scrolling also lets native lazy-loading fetch the screenshots below the fold.
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.mouse.move(700, 500);
  await wheelThrough(page, 0, height, 300);
  await wait(1400);
  const header = await headerState(page);
  check(!header.hidden || header.bottom > 0, `${mode}: the header stays in view while scrolling down`, JSON.stringify(header));
  const hidden = await page.evaluate(() =>
    Array.from(document.querySelectorAll("[data-reveal], [data-lines] .word-in, .cover, .roll"))
      .filter((el) => {
        const style = getComputedStyle(el);
        if (el.classList.contains("cover")) return style.transform !== "matrix(1, 0, 0, 0, 0, 0)";
        if (el.classList.contains("roll")) {
          const ty = new DOMMatrix(getComputedStyle(el, "::after").transform).m42;
          return Math.round(-ty / el.getBoundingClientRect().height) !== Number(el.textContent);
        }
        return style.opacity !== "1" || !["none", "matrix(1, 0, 0, 1, 0, 0)"].includes(style.transform);
      })
      .map((el) => `${el.className} "${el.textContent.trim().slice(0, 24)}"`),
  );
  check(hidden.length === 0, `${mode}: every block, heading word, picture and figure is in its finished state`, hidden.slice(0, 6).join(" | "));
  const unloaded = await page.evaluate(() => Array.from(document.images).filter((img) => !img.complete || !img.naturalWidth).map((img) => img.alt));
  check(unloaded.length === 0, `${mode}: every picture loads`, unloaded.join(" | "));
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await wait(300);
  await page.screenshot({ path: path.join(outDir, `${mode}-1440-full.png`), fullPage: true });
  await browser.close();
}

console.log(failures ? `\n${failures} check(s) failed. Screenshots in ${outDir}` : `\nAll motion checks pass. Screenshots in ${outDir}`);
process.exit(failures ? 1 : 0);
