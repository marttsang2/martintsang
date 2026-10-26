// Checks the motion layer in headless Chrome and fails on any broken rule:
// layout shift, properties other than transform and opacity animating, hover motion on touch screens,
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

// Records layout shifts and every property that starts a transition or keyframe animation.
const recorder = () => {
  window.__shifts = [];
  window.__animated = {};
  window.__runs = new Set();
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.__shifts.push(entry.value);
  }).observe({ type: "layout-shift", buffered: true });
  const note = (prop, where) => {
    window.__animated[prop] ??= where;
    window.__runs.add(`${prop} on ${where}`);
  };
  const label = (el) => (el instanceof Element ? `${el.tagName.toLowerCase()}.${[...el.classList].join(".")}` : "?");
  document.addEventListener("transitionrun", (e) => note(e.propertyName, label(e.target)), true);
  document.addEventListener(
    "animationstart",
    (e) => {
      for (const anim of e.target.getAnimations()) {
        if (anim.animationName !== e.animationName) continue;
        for (const frame of anim.effect.getKeyframes())
          for (const key of Object.keys(frame))
            if (!["offset", "computedOffset", "easing", "composite"].includes(key)) note(key, label(e.target));
      }
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

async function hoverAll(page) {
  for (const selector of ["#top .button", '#top a[href*="github"]', "[data-shot]", "header [data-nav-link]"]) {
    if (!(await page.$(selector))) continue;
    const box = await page.$eval(selector, (el) => {
      el.scrollIntoView({ block: "center", behavior: "instant" });
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    });
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

// 1. Fine pointer: layout shift, animated properties, figures, nav state.
{
  const browser = await launch("fine");
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.evaluateOnNewDocument(recorder);
  await page.goto(url, { waitUntil: "networkidle0" });
  await wait(1500);
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  await wheelThrough(page, 0, height);
  await wait(1500);
  await hoverAll(page);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await wait(400);

  const { shifts, animated } = await page.evaluate(() => ({ shifts: window.__shifts, animated: window.__animated }));
  const cls = shifts.reduce((a, b) => a + b, 0);
  check(cls < 0.01, "cumulative layout shift over load, full scroll and hovers", `CLS ${cls.toFixed(4)}`);
  const strays = Object.entries(animated).filter(([prop]) => !allowed.has(prop));
  check(strays.length === 0, "only transform, translate, scale and opacity animate", strays.length ? strays.map(([p, w]) => `${p} on ${w}`).join("; ") : Object.keys(animated).sort().join(", "));

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

  const career = await page.$eval('header [data-nav-link][href="#experiences"]', (el) => {
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  });
  await page.mouse.click(career.x, career.y);
  await wait(2500);
  const nav = await page.evaluate(() => {
    const indicator = document.querySelector("[data-nav-indicator]");
    const link = document.querySelector('[data-nav-link][href="#experiences"] .link-line');
    return {
      ground: document.querySelector("[data-header]").dataset.ground,
      on: indicator.hasAttribute("data-on"),
      x: parseFloat(indicator.style.getPropertyValue("--x")),
      linkX: link.offsetLeft,
    };
  });
  check(nav.ground === "stone" && nav.on && Math.abs(nav.x - nav.linkX) < 1, "nav click: header takes the Career ground, indicator sits under Career", JSON.stringify(nav));
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
    animated: [...window.__runs].filter((run) => /^(translate|scale) /.test(run) && !run.startsWith("scale on a.button")),
    translated: Array.from(document.querySelectorAll("[data-hero-layer], [data-shot] img, [data-magnet]"), (el) => el.style.translate).filter(Boolean),
    zoom: Array.from(document.querySelectorAll(".shot-img"), (el) => getComputedStyle(el).scale).filter((s) => s !== "none"),
    lines: Array.from(document.querySelectorAll("#top .link-line"), (el) => getComputedStyle(el, "::after").transform),
  }));
  check(state.translated.length === 0 && state.zoom.length === 0 && !state.animated.length, "touch: no pointer-led translate, zoom or magnet", JSON.stringify(state.translated.concat(state.zoom, state.animated)));
  check(state.lines.every((t) => t.startsWith("matrix(0,")), "touch: tapping a link does not leave its hover line drawn", state.lines.join(" "));
  await page.screenshot({ path: path.join(outDir, "touch-390-fold.png") });
  await browser.close();
}

// 3. Reduced motion and JavaScript off: the finished page, nothing hidden.
for (const mode of ["reduced-motion", "no-js"]) {
  const browser = await launch("fine");
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  if (mode === "reduced-motion") await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  else await page.setJavaScriptEnabled(false);
  await page.goto(url, { waitUntil: "networkidle0" });
  await wait(mode === "no-js" ? 1500 : 150);
  const firstScreen = await page.evaluate(() =>
    Array.from(document.querySelectorAll("h1 .word-in, #top p, #top a"))
      .filter((el) => getComputedStyle(el).opacity !== "1" || !["none", "matrix(1, 0, 0, 1, 0, 0)"].includes(getComputedStyle(el).transform))
      .map((el) => el.textContent.trim().slice(0, 30)),
  );
  check(firstScreen.length === 0, `${mode}: the first screen is readable at once`, firstScreen.join(" | "));

  // Scrolling also lets native lazy-loading fetch the screenshots below the fold.
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  await wheelThrough(page, 0, height, 300);
  await wait(1400);
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
