// Renders the 1200×630 share image to public/og.png from the hero's own type, colours and S-curve.
// Usage: node scripts/og-image.mjs
import puppeteer from "puppeteer-core";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { findChrome } from "./lib/chrome.mjs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "public", "og.png");

const html = `<!doctype html>
<html>
<head>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500&display=block">
<style>
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; background: #0c0c0b; color: #f4f4f0; font-family: Geist, sans-serif; position: relative; overflow: hidden; }
  .top { position: absolute; left: 64px; right: 64px; top: 56px; display: flex; justify-content: space-between; align-items: baseline; }
  .mark { font-size: 30px; font-weight: 600; letter-spacing: -0.04em; }
  .mark span { color: #ffd43b; }
  .url { font-size: 22px; color: #a3a199; }
  .statement { position: absolute; left: 64px; top: 150px; font-size: 40px; line-height: 1.18; letter-spacing: -0.025em; max-width: 620px; }
  .name { position: absolute; left: 58px; bottom: 128px; font-size: 200px; font-weight: 500; line-height: 0.86; letter-spacing: -0.055em; white-space: nowrap; }
  svg { position: absolute; left: 0; bottom: 0; width: 1200px; height: 64px; }
</style>
</head>
<body>
  <div class="top"><div class="mark">MT<span>.</span></div><div class="url">martintsang.vercel.app</div></div>
  <p class="statement">Software engineer building production web platforms.</p>
  <p class="name">Martin Tsang</p>
  <svg viewBox="0 0 1200 64" preserveAspectRatio="none" aria-hidden="true">
    <path d="M408 64 C 538 64 538 0 668 0 L 1200 0 L 1200 64 Z" fill="#f4f4f0"/>
  </svg>
</body>
</html>`;

const browser = await puppeteer.launch({ executablePath: findChrome(), headless: true, args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: "networkidle0" });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: out });
await browser.close();
console.log(`saved ${out}`);
