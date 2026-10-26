// Screenshots the page at every target width and fails on sideways overflow or overlapping text.
// Usage: node scripts/check-layout.mjs [url] [outDir]
import puppeteer from "puppeteer-core";
import fs from "node:fs";
import path from "node:path";
import { findChrome } from "./lib/chrome.mjs";

const url = process.argv[2] ?? "http://localhost:3000";
const outDir = process.argv[3] ?? ".shots";
const widths = [360, 390, 768, 1024, 1280, 1440, 1920];
const heightFor = (w) => (w < 768 ? 844 : w < 1280 ? 1024 : w < 1920 ? 900 : 1080);

fs.mkdirSync(outDir, { recursive: true });

const measure = () => {
  const doc = document.documentElement;
  const vw = doc.clientWidth;
  const problems = [];
  if (doc.scrollWidth > vw) problems.push(`page scrolls sideways: ${doc.scrollWidth}px > ${vw}px`);

  const textBlocks = Array.from(
    document.querySelectorAll("h1, h2, h3, p, li, dt, dd, a, figcaption, button"),
  ).filter((el) => {
    const style = getComputedStyle(el);
    const box = el.getBoundingClientRect();
    return style.visibility !== "hidden" && style.display !== "none" && box.width > 0 && box.height > 0;
  });

  for (const el of textBlocks) {
    const box = el.getBoundingClientRect();
    if (box.right > vw + 0.5 || box.left < -0.5) {
      const parentClips = el.closest(".overflow-hidden");
      if (!parentClips) problems.push(`off-screen: <${el.tagName.toLowerCase()}> "${el.textContent.trim().slice(0, 40)}" [${Math.round(box.left)}..${Math.round(box.right)}]`);
    }
  }

  const leaves = textBlocks.filter((el) => !textBlocks.some((other) => other !== el && el.contains(other)));
  const range = document.createRange();
  const inkBoxes = leaves.map((el) => {
    range.selectNodeContents(el);
    return { el, lines: Array.from(range.getClientRects()).filter((r) => r.width > 0 && r.height > 0) };
  });
  const overlap = (a, b) => [
    Math.min(a.right, b.right) - Math.max(a.left, b.left),
    Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top),
    Math.min(a.height, b.height),
  ];
  const label = (el) => `<${el.tagName.toLowerCase()}> "${el.textContent.trim().slice(0, 30)}"`;
  for (let i = 0; i < inkBoxes.length; i++) {
    for (let j = i + 1; j < inkBoxes.length; j++) {
      const a = inkBoxes[i];
      const b = inkBoxes[j];
      if (a.el.contains(b.el) || b.el.contains(a.el)) continue;
      const hit = a.lines.flatMap((ra) => b.lines.map((rb) => overlap(ra, rb))).find(([x, y, h]) => x > 2 && y > h * 0.3);
      if (hit) problems.push(`overlap ${Math.round(hit[0])}×${Math.round(hit[1])}px: ${label(a.el)} / ${label(b.el)}`);
    }
  }
  return problems;
};

const browser = await puppeteer.launch({
  executablePath: findChrome(),
  headless: true,
  args: ["--no-sandbox", "--hide-scrollbars"],
});

let failures = 0;
for (const width of widths) {
  const page = await browser.newPage();
  await page.setViewport({ width, height: heightFor(width), deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: "networkidle0" });
  await page.evaluate(() => document.fonts.ready);
  await new Promise((r) => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(outDir, `${width}-fold.png`) });

  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += window.innerHeight / 2) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
    await new Promise((r) => setTimeout(r, 900));
  });
  await page.screenshot({ path: path.join(outDir, `${width}-full.png`), fullPage: true });

  const problems = await page.evaluate(measure);
  failures += problems.length;
  console.log(`${width}px  ${problems.length ? "FAIL" : "ok"}`);
  for (const problem of problems) console.log(`   ${problem}`);
  await page.close();
}

await browser.close();
console.log(failures ? `\n${failures} layout problem(s). Screenshots in ${outDir}` : `\nAll widths clean. Screenshots in ${outDir}`);
process.exit(failures ? 1 : 0);
