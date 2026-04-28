// One-off screenshot capture for project cards.
// Usage: node scripts/capture-projects.js
const puppeteer = require("puppeteer-core");
const path = require("path");

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const OUT_DIR = path.join(__dirname, "..", "public", "projects");

const sites = [
  { name: "goplace", url: "https://booking.goplace.com" },
  { name: "wplegal", url: "https://wplegal.ca" },
  { name: "helpmeclean", url: "https://helpmeclean.ca" },
];

const dismissBannersScript = () => {
  // Dismiss generic cookie / consent banners by clicking the most likely button.
  const buttonText = [
    "accept all",
    "accept",
    "i agree",
    "agree",
    "allow all",
    "got it",
    "ok",
  ];
  const all = Array.from(document.querySelectorAll("button, a, [role='button']"));
  for (const el of all) {
    const t = (el.innerText || el.textContent || "").trim().toLowerCase();
    if (buttonText.includes(t) || buttonText.some((b) => t === b)) {
      try { el.click(); } catch {}
    }
  }
  // Hide common consent containers as a fallback.
  const selectors = [
    "[id*='cookie']",
    "[class*='cookie']",
    "[id*='consent']",
    "[class*='consent']",
    "[id*='cc-banner']",
    "[id*='gdpr']",
  ];
  for (const sel of selectors) {
    document.querySelectorAll(sel).forEach((n) => {
      const r = n.getBoundingClientRect();
      if (r.width > 100 && r.height > 30) n.style.display = "none";
    });
  }
};

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: "new",
    defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 2 },
    args: ["--no-sandbox", "--hide-scrollbars"],
  });

  for (const site of sites) {
    const page = await browser.newPage();
    console.log(`→ ${site.name}: ${site.url}`);
    try {
      await page.goto(site.url, { waitUntil: "networkidle2", timeout: 45000 });
    } catch (e) {
      console.warn(`  goto ${site.name}: ${e.message}`);
    }
    // Wait a bit more for hero/carousel images.
    await new Promise((r) => setTimeout(r, 2500));
    try {
      await page.evaluate(dismissBannersScript);
    } catch (e) {
      console.warn(`  dismiss ${site.name}: ${e.message}`);
    }
    // Give animations a beat after dismissal.
    await new Promise((r) => setTimeout(r, 1500));
    const out = path.join(OUT_DIR, `${site.name}.png`);
    await page.screenshot({ path: out, fullPage: false });
    console.log(`  saved ${out}`);
    await page.close();
  }

  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
