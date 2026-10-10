import { chromium } from "playwright-core";
import { spawn } from "node:child_process";
import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import assert from "node:assert/strict";

const chrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const port = 43219;
const url = `http://127.0.0.1:${port}`;
const output = await mkdtemp(join(tmpdir(), "nyx-browser-qa-"));
const server = spawn(process.execPath, ["scripts/serve.mjs"], {
  env: { ...process.env, PORT: String(port) },
  stdio: "ignore",
  windowsHide: true,
});
let browser;
const errors = [];
const report = [];
async function waitForServer() {
  for (let i = 0; i < 100; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 150));
  }
  throw new Error("Static export preview did not start");
}
async function screenshot(page, label) {
  const path = join(output, label + ".jpg");
  await page.screenshot({
    path,
    type: "jpeg",
    quality: 15,
    animations: "disabled",
  });
  return path;
}
async function sectionShot(page, selector, label) {
  const section = page.locator(selector);
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(210);
  return await screenshot(page, label);
}
try {
  await waitForServer();
  browser = await chromium.launch({
    executablePath: chrome,
    headless: true,
    args: ["--no-sandbox"],
  });
  for (const [name, width, height] of [
    ["desktop", 1440, 900],
    ["tablet", 768, 900],
    ["mobile", 390, 844],
    ["small-mobile", 320, 568],
  ]) {
    const context = await browser.newContext({
      viewport: { width, height },
      deviceScaleFactor: 1,
      permissions: ["clipboard-read", "clipboard-write"],
    });
    const page = await context.newPage();
    page.on("pageerror", (error) => errors.push(`${name}: ${error.message}`));
    await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
    await page.waitForTimeout(450);
    const geometry = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      pageWidth: document.documentElement.scrollWidth,
      brokenImageSources: Array.from(document.images)
        .filter(
          (img) =>
            img.hasAttribute("src") &&
            img.getAttribute("src") &&
            img.complete &&
            img.naturalWidth === 0,
        )
        .map((img) => img.getAttribute("src")),
      socialLinks: document.querySelectorAll(".social-links > *").length,
      pauseButton: !!document.querySelector("#carousel-pause"),
      copyHint: !!document.querySelector(".ui-copy-hint"),
      linkedin: !!document.querySelector(
        '.social-links a[href="https://www.linkedin.com/in/junex-glenn-baran-7446b4385/"]',
      ),
      overflowElements: Array.from(document.querySelectorAll("body *"))
        .filter((el) => {
          const box = el.getBoundingClientRect();
          const css = getComputedStyle(el);
          return (
            box.right > document.documentElement.clientWidth + 8 &&
            css.display !== "none" &&
            Number(css.opacity) !== 0
          );
        })
        .slice(0, 14)
        .map((el) => ({
          tag: el.tagName,
          cls: String(el.className).slice(0, 90),
          parentClass: String(el.parentElement?.className ?? "").slice(0, 90),
          grandparentClass: String(
            el.parentElement?.parentElement?.className ?? "",
          ).slice(0, 90),
          right: Math.round(el.getBoundingClientRect().right),
          width: Math.round(el.getBoundingClientRect().width),
        })),
    }));
    if (geometry.pageWidth > geometry.viewport + 3)
      console.log("OVERFLOW", name, JSON.stringify(geometry.overflowElements));
    assert(
      geometry.pageWidth <= geometry.viewport + 3,
      `${name} overflows horizontally by ${geometry.pageWidth - geometry.viewport}px`,
    );
    assert.deepEqual(geometry.brokenImageSources, [], `${name} broken images`);
    assert.equal(geometry.socialLinks, 5, `${name} social links`);
    assert(
      !geometry.pauseButton && !geometry.copyHint && geometry.linkedin,
      `${name} controls missing/wrong`,
    );
    if (name === "desktop") {
      await page.locator(".hero-showcase").hover();
      await page.waitForTimeout(200);
      const before = await page
        .locator('[data-carousel-index="0"]')
        .evaluate((el) => el.style.transform);
      await page.waitForTimeout(650);
      const after = await page
        .locator('[data-carousel-index="0"]')
        .evaluate((el) => el.style.transform);
      assert.equal(before, after, "Hover should stop the orbit");
      await page.locator(".intro-copy").hover();
      await page.waitForTimeout(750);
      const resumed = await page
        .locator('[data-carousel-index="0"]')
        .evaluate((el) => el.style.transform);
      assert.notEqual(resumed, after, "Orbit should resume after mouse leaves");
      await page.locator("#carousel-next").click();
      await page.waitForTimeout(900);
      await page.locator("#carousel-prev").click();
      await page.waitForTimeout(650);
      await sectionShot(page, "#home", "desktop-hero");
      await sectionShot(page, "#featured", "desktop-featured");
      await sectionShot(page, "#work", "desktop-work");
      await sectionShot(page, "#contact", "desktop-contact");
      await page.locator(".ui-copy-address").click();
      const copied = await page.evaluate(async () =>
        navigator.clipboard.readText(),
      );
      assert.equal(
        copied,
        "nyx.sdlc@gmail.com",
        "Email click must copy correct address",
      );
      await page.locator('#work [data-cover="sentinel"]').click();
      assert(
        await page.locator("#case-dialog").evaluate((dialog) => dialog.open),
        "Project dialog opens",
      );
      await page.locator(".close-dialog").click();
      await page
        .locator(
          '#work [data-photo-project="sentinel"][data-photo-preview="0"]',
        )
        .first()
        .click();
      await page.locator("#preview-next").click();
      await page.locator("#preview-prev").click();
      await page.locator("#preview-close").click();
    } else if (name === "mobile") {
      await sectionShot(page, "#home", "mobile-hero");
      await sectionShot(page, "#featured", "mobile-featured");
      await sectionShot(page, "#contact", "mobile-contact");
    } else if (name === "small-mobile") {
      await sectionShot(page, "#contact", "small-mobile-contact");
    }
    const { overflowElements, ...audit } = geometry;
    void overflowElements; // Keep detailed diagnostics only for failed containment checks.
    report.push({ viewport: name, ...audit, status: "PASS" });
    await context.close();
  }
  assert.deepEqual(errors, [], "No browser runtime errors");
  console.log(
    JSON.stringify(
      { status: "PASS", screenshots: output, report, runtimeErrors: errors },
      null,
      2,
    ),
  );
} finally {
  if (browser) await browser.close();
  server.kill();
}
