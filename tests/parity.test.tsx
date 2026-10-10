import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { Portfolio } from "../src/components/portfolio";
import { media, projects, technologies } from "../src/content/portfolio";
import {
  makeDOM,
  installDOM,
  legacyDOM,
  normalizeElement,
} from "./dom-fixture";
test("migration preserves every stylesheet and original asset byte", () => {
  const manifest = JSON.parse(
    readFileSync("tests/baseline/assets.json", "utf8"),
  ) as Record<string, string>;
  for (const [name, hash] of Object.entries(manifest)) {
    const path = name.endsWith(".css")
      ? "public/styles/" + name
      : "public/" + name;
    assert(existsSync(path), path);
    assert.equal(
      createHash("sha256").update(readFileSync(path)).digest("hex"),
      hash,
      path,
    );
  }
});
test("typed content is identical to the published baseline", () => {
  const baseline = JSON.parse(
    readFileSync("tests/baseline/content.json", "utf8"),
  );
  const normalized = JSON.parse(
    JSON.stringify(media).replaceAll('"/assets/', '"assets/'),
  );
  assert.deepEqual(normalized, baseline.media);
  assert.deepEqual(projects, baseline.projects);
  assert.deepEqual(technologies, baseline.stack);
});
test("unchanged approach, about and footer content retain original DOM", async () => {
  const legacy = legacyDOM(),
    dom = makeDOM();
  installDOM(dom);
  const root = createRoot(dom.window.document.getElementById("root")!);
  try {
    await act(async () => root.render(<Portfolio />));
    // Deliberately redesigned hero, featured cards, stack, skills and contact are tested separately.
    for (const selector of ["#approach", "#about", "footer"]) {
      assert.deepEqual(
        normalizeElement(dom.window.document.querySelector(selector)!),
        normalizeElement(legacy.window.document.querySelector(selector)!),
        selector,
      );
    }
  } finally {
    await act(async () => root.unmount());
    legacy.window.close();
    dom.window.close();
  }
});
