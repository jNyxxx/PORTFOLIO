import { readFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
const page = new JSDOM(readFileSync("out/index.html", "utf8")).window.document;
const css = Array.from(
  page.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]'),
).map((x) => x.getAttribute("href"));
const designFiles = ["style", "reference", "elevated", "projects"].map(
  (name) => `/styles/${name}.css`,
);
const loadedDesignFiles = css.filter((h) => h?.startsWith("/styles/"));
assert.deepEqual(
  loadedDesignFiles.slice(0, designFiles.length),
  designFiles,
  "Original CSS cascade order",
);
assert.deepEqual(
  loadedDesignFiles.slice(designFiles.length),
  ["/styles/system.css"],
  "The shared design system must load after the original styles",
);
const hashes = JSON.parse(
  readFileSync("tests/baseline/assets.json", "utf8"),
) as Record<string, string>;
for (const [name, hash] of Object.entries(hashes)) {
  const path = "out/" + (name.endsWith(".css") ? "styles/" : "") + name;
  assert.equal(
    createHash("sha256").update(readFileSync(path)).digest("hex"),
    hash,
    path,
  );
}
for (const el of page.querySelectorAll("[src],[href]"))
  for (const key of ["src", "href"]) {
    const url = el.getAttribute(key);
    if (url?.startsWith("/") && !url.startsWith("//"))
      assert(existsSync("out" + url.split("?")[0]), url);
  }
assert.equal(page.querySelectorAll("[data-carousel-index]").length, 4);
assert.equal(page.querySelectorAll("#stack-grid .tech-cell").length, 21);
assert.equal(page.querySelectorAll("[data-photo-preview]").length, 22);
assert.equal(page.querySelectorAll("video").length, 0);
console.log(
  `Production parity checks passed: ${Object.keys(hashes).length} unchanged CSS/assets, original style order plus system layer, all exported resource paths, 4 orbit cards, 21 technologies, and 22 image-preview links.`,
);
