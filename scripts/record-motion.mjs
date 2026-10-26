// Records the page's motion with headless Chrome as one H.264 MP4 per scenario (ffmpeg on PATH), each under 1.5 MB.
// Frames are captured into a folder per scenario and removed once the MP4 is written; pass --keep-frames to keep them.
// Usage: node scripts/record-motion.mjs [url] [outDir] [--only name,name] [--keep-frames]
import puppeteer from "puppeteer-core";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { findChrome } from "./lib/chrome.mjs";

const args = process.argv.slice(2);
const onlyAt = args.indexOf("--only");
const only = onlyAt === -1 ? null : args.splice(onlyAt, 2)[1].split(",");
const keepAt = args.indexOf("--keep-frames");
const keepFrames = keepAt !== -1 && Boolean(args.splice(keepAt, 1));
const budget = 1.5 * 1024 * 1024;
const url = args[0] ?? "http://localhost:3000";
const outDir = args[1] ?? ".shots/motion";

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// Moves the pointer along a straight line at real speed: each step goes where the clock says it should be.
async function glide(page, from, to, ms) {
  const start = Date.now();
  for (let t = 0; t < 1; ) {
    t = Math.min(1, (Date.now() - start) / ms);
    await page.mouse.move(from.x + (to.x - from.x) * t, from.y + (to.y - from.y) * t);
    await wait(12);
  }
  return to;
}

async function wheel(page, distance, pxPerSecond) {
  const start = Date.now();
  const sign = Math.sign(distance);
  for (let moved = 0; moved < Math.abs(distance); ) {
    const target = Math.min(Math.abs(distance), ((Date.now() - start) / 1000) * pxPerSecond);
    if (target > moved) {
      await page.mouse.wheel({ deltaY: sign * (target - moved) });
      moved = target;
    }
    await wait(12);
  }
}

const box = (page, selector) =>
  page.$eval(selector, (el) => {
    const r = el.getBoundingClientRect();
    return { x: r.left, y: r.top, w: r.width, h: r.height };
  });

const centre = async (page, selector) => {
  const box = await page.$eval(selector, (el) => {
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width, h: r.height };
  });
  return box;
};

const scrollToEl = (page, selector, offset) =>
  page.$eval(
    selector,
    (el, off) => window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - off, behavior: "instant" }),
    offset,
  );

const scenarios = {
  "name-reveal": {
    fromNavigation: true,
    run: async (page) => {
      await wait(2600);
      await page.goto("about:blank");
      await wait(300);
      await page.goto(url, { waitUntil: "domcontentloaded" });
      await wait(2600);
    },
  },
  "cta-roll": {
    crop: async (page) => {
      const button = await box(page, "#top .button");
      const linkedin = await box(page, '#top a[href*="linkedin"]');
      return { x: button.x - 40, y: button.y - 28, w: linkedin.x + linkedin.w + 40 - (button.x - 40), h: button.h + 56 };
    },
    run: async (page) => {
      const button = await centre(page, "#top .button");
      let at = { x: button.x - 120, y: button.y + 70 };
      await page.mouse.move(at.x, at.y);
      await wait(500);
      at = await glide(page, at, { x: button.x - 10, y: button.y + 4 }, 450);
      await wait(1100);
      at = await glide(page, at, { x: button.x - 30, y: button.y + 90 }, 350);
      await wait(1100);
      at = await glide(page, at, { x: button.x + 20, y: button.y }, 400);
      await wait(900);
      await page.mouse.down();
      await wait(220);
      await page.mouse.up();
      await wait(500);
      await glide(page, at, { x: button.x + 40, y: button.y + 100 }, 400);
      await wait(1200);
    },
  },
  underline: {
    crop: async (page) => {
      const github = await box(page, '#top a[href*="github"]');
      const linkedin = await box(page, '#top a[href*="linkedin"]');
      return { x: github.x - 16, y: github.y - 28, w: linkedin.x + linkedin.w + 32 - (github.x - 16), h: github.h + 56 };
    },
    run: async (page) => {
      const github = await centre(page, '#top a[href*="github"]');
      const linkedin = await centre(page, '#top a[href*="linkedin"]');
      let at = { x: github.x - 20, y: github.y + 60 };
      await page.mouse.move(at.x, at.y);
      await wait(500);
      at = await glide(page, at, github, 300);
      await wait(1100);
      at = await glide(page, at, linkedin, 500);
      await wait(1100);
      at = await glide(page, at, { x: linkedin.x + 10, y: linkedin.y + 60 }, 300);
      await wait(1100);
      at = await glide(page, at, github, 500);
      await wait(900);
      await glide(page, at, { x: github.x, y: github.y + 60 }, 300);
      await wait(1100);
    },
  },
  "row-hover": {
    prepare: async (page) => {
      await scrollToEl(page, "#projects ol", 260);
      await wait(1800);
    },
    run: async (page) => {
      const rows = await page.$$eval("#projects ol > li", (els) => els.map((el) => el.getBoundingClientRect()).map((r) => ({ x: r.left + r.width * 0.42, y: r.top + r.height / 2 })));
      let at = { x: rows[0].x, y: rows[0].y - 140 };
      await page.mouse.move(at.x, at.y);
      await wait(400);
      for (const row of rows) {
        at = await glide(page, at, row, 260);
        await wait(800);
      }
      at = await glide(page, at, rows[1], 420);
      await wait(800);
      at = await glide(page, at, { x: at.x, y: rows.at(-1).y + 200 }, 400);
      await wait(900);
      await scrollToEl(page, "#experiences ol", 140);
      await wait(1600);
      const roles = await page.$$eval("#experiences ol > li", (els) => els.map((el) => el.getBoundingClientRect()).map((r) => ({ x: r.left + r.width * 0.6, y: r.top + Math.min(r.height / 2, 120) })));
      for (const role of roles.filter((r) => r.y > 60 && r.y < 860)) {
        at = await glide(page, at, role, 420);
        await wait(900);
      }
      await glide(page, at, { x: 1430, y: at.y }, 300);
      await wait(1000);
    },
  },
  "header-hide": {
    run: async (page) => {
      await page.mouse.move(700, 600);
      await wait(500);
      await wheel(page, 1500, 900);
      await wait(900);
      await wheel(page, -260, 600);
      await wait(1200);
      await wheel(page, 2400, 1000);
      await wait(900);
      await wheel(page, -200, 600);
      await wait(900);
      const career = await centre(page, 'header [data-nav-link][href="#experiences"]');
      let at = await glide(page, { x: 700, y: 600 }, career, 500);
      await wait(400);
      await page.mouse.click(at.x, at.y);
      await wait(1800);
      at = await glide(page, at, { x: 700, y: 600 }, 400);
      await wheel(page, 900, 900);
      await wait(900);
      await wheel(page, -200, 600);
      await wait(1100);
    },
  },
  "hero-pointer": {
    run: async (page) => {
      let at = { x: 200, y: 820 };
      await page.mouse.move(at.x, at.y);
      await wait(400);
      at = await glide(page, at, { x: 1300, y: 500 }, 1600);
      await wait(500);
      at = await glide(page, at, { x: 160, y: 300 }, 1800);
      await wait(500);
      at = await glide(page, at, { x: 720, y: 640 }, 1200);
      await wait(900);
      await wheel(page, 640, 400);
      await wait(600);
    },
  },
  "project-card-hover": {
    prepare: async (page) => {
      await scrollToEl(page, "#projects article figure", 140);
      await wait(1800);
    },
    run: async (page) => {
      const shot = await centre(page, "#projects article figure");
      let at = { x: shot.x - shot.w / 2 - 60, y: shot.y + 40 };
      await page.mouse.move(at.x, at.y);
      await wait(400);
      at = await glide(page, at, { x: shot.x - shot.w * 0.3, y: shot.y }, 600);
      await wait(700);
      at = await glide(page, at, { x: shot.x + shot.w * 0.35, y: shot.y - shot.h * 0.3 }, 1600);
      await wait(500);
      at = await glide(page, at, { x: shot.x + shot.w * 0.1, y: shot.y + shot.h * 0.35 }, 1200);
      await wait(600);
      at = await glide(page, at, { x: shot.x + shot.w / 2 + 80, y: shot.y + shot.h * 0.35 }, 700);
      await wait(1000);
    },
  },
  "scroll-reveal": {
    run: async (page) => {
      await page.mouse.move(700, 600);
      await wait(600);
      const height = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
      await wheel(page, height, 900);
      await wait(1200);
    },
  },
  "about-counters": {
    prepare: async (page) => {
      await scrollToEl(page, "#about dl", 960);
      await wait(300);
    },
    run: async (page) => {
      await page.mouse.move(700, 600);
      await wheel(page, 520, 700);
      await wait(1800);
    },
  },
  "mobile-scroll": {
    pointer: "coarse",
    viewport: { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
    run: async (page) => {
      const height = await page.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < height; y += 12) {
        await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
        await wait(16);
      }
      for (let y = height; y > height - 2600; y -= 14) {
        await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
        await wait(16);
      }
      await wait(800);
    },
  },
};

// Each frame lasts until the next one arrived, so the MP4 plays at real speed; it is re-encoded at a higher CRF until it fits the budget.
function encode(dir, name, frames) {
  if (frames.length < 2) return null;
  const list = frames
    .map((f, i) => {
      const next = frames[i + 1]?.t ?? f.t + 0.5;
      return `file '${f.file}'\nduration ${Math.max(0.001, next - f.t).toFixed(4)}`;
    })
    .join("\n");
  const listPath = path.join(dir, "frames.txt");
  fs.writeFileSync(listPath, `${list}\nfile '${frames.at(-1).file}'\n`);
  const mp4 = path.join(path.dirname(dir), `${name}.mp4`);
  for (let crf = 23; ; crf += 3) {
    execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", listPath, "-vf", "fps=30,scale='min(1280,iw)':-2:flags=lanczos", "-c:v", "libx264", "-preset", "slow", "-crf", String(crf), "-pix_fmt", "yuv420p", "-movflags", "+faststart", mp4]);
    if (fs.statSync(mp4).size <= budget || crf >= 41) break;
  }
  if (keepFrames) fs.rmSync(listPath);
  else fs.rmSync(dir, { recursive: true, force: true });
  return mp4;
}

// Headless Chrome reports no pointer at all, so hover-gated styles would never apply; these Blink settings stand in for a mouse or a finger.
const pointers = {
  fine: "primaryPointerType=4,availablePointerTypes=4,primaryHoverType=2,availableHoverTypes=2",
  coarse: "primaryPointerType=2,availablePointerTypes=2,primaryHoverType=1,availableHoverTypes=1",
};
const browsers = {};
const browserFor = async (pointer) =>
  (browsers[pointer] ??= await puppeteer.launch({
    executablePath: findChrome(),
    headless: true,
    args: ["--no-sandbox", "--hide-scrollbars", `--blink-settings=${pointers[pointer]}`],
  }));

fs.mkdirSync(outDir, { recursive: true });
for (const [name, scenario] of Object.entries(scenarios)) {
  if (only && !only.includes(name)) continue;
  const page = await (await browserFor(scenario.pointer ?? "fine")).newPage();
  await page.setViewport(scenario.viewport ?? { width: 1440, height: 900, deviceScaleFactor: 1 });
  const cdp = await page.createCDPSession();
  const frames = [];
  const dir = path.join(outDir, name);
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  const save = (data, t) => {
    const file = `frame-${String(frames.length + 1).padStart(4, "0")}.jpg`;
    fs.writeFileSync(path.join(dir, file), Buffer.from(data, "base64"));
    frames.push({ file, t });
  };
  cdp.on("Page.screencastFrame", ({ data, metadata, sessionId }) => {
    save(data, metadata.timestamp);
    cdp.send("Page.screencastFrameAck", { sessionId }).catch(() => {});
  });
  const { width, height } = page.viewport();
  const start = () => cdp.send("Page.startScreencast", { format: "jpeg", quality: 86, maxWidth: width, maxHeight: height, everyNthFrame: 1 });

  if (scenario.fromNavigation) {
    await page.goto("about:blank");
    await start();
    await page.goto(url, { waitUntil: "domcontentloaded" });
  } else {
    await page.goto(url, { waitUntil: "networkidle0" });
    await page.evaluate(() => document.fonts.ready);
    await wait(1600);
    await scenario.prepare?.(page);
  }
  // Headless screencast frames come at CSS pixels, so close-ups capture their region in a screenshot loop at device pixels instead.
  let capturing = Boolean(scenario.crop);
  let closeup = Promise.resolve();
  if (scenario.crop) {
    const { x, y, w, h } = await scenario.crop(page);
    closeup = (async () => {
      while (capturing) {
        const t = Date.now() / 1000;
        const clip = { x: Math.round(x), y: Math.round(y), width: Math.round(w), height: Math.round(h), scale: 2 };
        const { data } = await cdp.send("Page.captureScreenshot", { format: "jpeg", quality: 90, clip });
        save(data, t);
      }
    })();
  } else if (!scenario.fromNavigation) await start();
  await wait(300);
  await scenario.run(page);
  capturing = false;
  await closeup;
  if (!scenario.crop) await cdp.send("Page.stopScreencast");
  await wait(200);
  const mp4 = encode(dir, name, frames);
  console.log(`${name.padEnd(20)} ${String(frames.length).padStart(4)} frames${mp4 ? `  ${path.basename(mp4)} ${(fs.statSync(mp4).size / 1024).toFixed(0)} KB` : ""}`);
  await page.close();
}

for (const browser of Object.values(browsers)) await browser.close();
