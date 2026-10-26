// Records the page's motion with headless Chrome: a JPEG frame sequence per scenario, plus MP4 and GIF when ffmpeg is on PATH.
// Usage: node scripts/record-motion.mjs [url] [outDir] [--only name,name]
import puppeteer from "puppeteer-core";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { findChrome } from "./lib/chrome.mjs";

const args = process.argv.slice(2);
const onlyAt = args.indexOf("--only");
const only = onlyAt === -1 ? null : args.splice(onlyAt, 2)[1].split(",");
const url = args[0] ?? "http://localhost:3000";
const outDir = args[1] ?? ".shots/motion";

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const hasFfmpeg = (() => {
  try {
    execFileSync("ffmpeg", ["-version"], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
})();

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
  for (let moved = 0; moved < distance; ) {
    const target = Math.min(distance, ((Date.now() - start) / 1000) * pxPerSecond);
    if (target > moved) {
      await page.mouse.wheel({ deltaY: target - moved });
      moved = target;
    }
    await wait(12);
  }
}

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
  "hero-load": {
    fromNavigation: true,
    slowMotion: 0.25,
    run: async () => wait(1800 / 0.25),
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
  "cta-hover": {
    run: async (page) => {
      const button = await centre(page, "#top .button");
      let at = { x: button.x - 260, y: button.y + 90 };
      await page.mouse.move(at.x, at.y);
      await wait(400);
      at = await glide(page, at, { x: button.x - button.w / 2 - 14, y: button.y + 8 }, 700);
      at = await glide(page, at, { x: button.x - 20, y: button.y + 10 }, 500);
      await wait(500);
      at = await glide(page, at, { x: button.x + 26, y: button.y - 10 }, 500);
      await wait(400);
      await page.mouse.down();
      await wait(260);
      await page.mouse.up();
      await wait(500);
      const github = await centre(page, '#top a[href*="github"]');
      at = await glide(page, at, { x: github.x, y: github.y }, 700);
      await wait(900);
      const linkedin = await centre(page, '#top a[href*="linkedin"]');
      at = await glide(page, at, { x: linkedin.x, y: linkedin.y }, 600);
      await wait(900);
      await glide(page, at, { x: linkedin.x + 120, y: linkedin.y + 160 }, 500);
      await wait(700);
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
  "nav-indicator": {
    run: async (page) => {
      await page.mouse.move(700, 600);
      await wheel(page, 5200, 1100);
      await wait(600);
      const links = await page.$$eval('header nav ul a', (els) =>
        els.map((el) => {
          const r = el.getBoundingClientRect();
          return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
        }),
      );
      let at = { x: links[0].x, y: links[0].y + 80 };
      for (const link of links) {
        at = await glide(page, at, link, 260);
        await wait(380);
      }
      await page.mouse.click(links[2].x, links[2].y);
      await wait(1800);
      at = await glide(page, links[2], { x: 700, y: 600 }, 300);
      await wheel(page, 2400, 1100);
      await wait(900);
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

// Slow-motion captures play back at real speed: each frame's duration is scaled by the playback rate.
function encode(dir, name, frames, rate) {
  if (!hasFfmpeg || frames.length < 2) return [];
  const list = frames
    .map((f, i) => {
      const next = frames[i + 1]?.t ?? f.t + 0.5;
      return `file '${f.file}'\nduration ${Math.max(0.001, (next - f.t) * rate).toFixed(4)}`;
    })
    .join("\n");
  const listPath = path.join(dir, "frames.txt");
  fs.writeFileSync(listPath, `${list}\nfile '${frames.at(-1).file}'\n`);
  const mp4 = path.join(path.dirname(dir), `${name}.mp4`);
  const gif = path.join(path.dirname(dir), `${name}.gif`);
  const scale = "scale='min(960,iw)':-2:flags=lanczos";
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", listPath, "-vf", `fps=30,${scale}`, "-pix_fmt", "yuv420p", "-movflags", "+faststart", mp4]);
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", mp4, "-vf", `fps=15,scale='min(720,iw)':-2:flags=lanczos,split[a][b];[a]palettegen=stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=4`, gif]);
  fs.rmSync(listPath);
  return [mp4, gif];
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
  cdp.on("Page.screencastFrame", ({ data, metadata, sessionId }) => {
    const file = `frame-${String(frames.length + 1).padStart(4, "0")}.jpg`;
    fs.writeFileSync(path.join(dir, file), Buffer.from(data, "base64"));
    frames.push({ file, t: metadata.timestamp });
    cdp.send("Page.screencastFrameAck", { sessionId }).catch(() => {});
  });
  const { width, height } = page.viewport();
  const start = () =>
    cdp.send("Page.startScreencast", { format: "jpeg", quality: 82, maxWidth: width, maxHeight: height, everyNthFrame: 1 });

  if (scenario.fromNavigation) {
    await page.goto("about:blank");
    if (scenario.slowMotion) {
      await cdp.send("Animation.enable");
      await cdp.send("Animation.setPlaybackRate", { playbackRate: scenario.slowMotion });
    }
    await start();
    await page.goto(url, { waitUntil: "domcontentloaded" });
  } else {
    await page.goto(url, { waitUntil: "networkidle0" });
    await page.evaluate(() => document.fonts.ready);
    await wait(1600);
    await scenario.prepare?.(page);
    await start();
    await wait(300);
  }
  await scenario.run(page);
  await cdp.send("Page.stopScreencast");
  await wait(200);
  const videos = encode(dir, name, frames, scenario.slowMotion ?? 1);
  console.log(`${name.padEnd(20)} ${String(frames.length).padStart(4)} frames${videos.length ? `  ${videos.map((v) => path.basename(v)).join(", ")}` : ""}`);
  await page.close();
}

for (const browser of Object.values(browsers)) await browser.close();
