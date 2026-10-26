import { execSync } from "node:child_process";

export const findChrome = () => {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  for (const bin of ["google-chrome", "google-chrome-stable", "chromium", "chromium-browser"]) {
    try {
      return execSync(`command -v ${bin}`, { encoding: "utf8" }).trim();
    } catch {}
  }
  throw new Error("No Chrome on PATH; set CHROME_PATH");
};
