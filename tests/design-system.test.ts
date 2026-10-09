import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

test("all portfolio sections use the shared design-system layer", () => {
  const layout = readFileSync("src/app/layout.tsx", "utf8");
  const css = readFileSync("public/styles/system.css", "utf8");
  assert.match(layout, /"projects", "system"/);
  assert.match(css, /--ui-surface:/);
  assert.match(css, /--ui-border:/);
  assert.match(css, /--ui-radius:/);
  assert.match(css, /--ui-shadow:/);

  for (const component of [
    ".reference-header",
    ".reference-hero",
    ".featured-section",
    ".project-pair .project",
    ".repository-project",
    ".stack-filters button",
    ".capability-grid article",
    ".steps details",
    ".portrait-mat",
    ".contact",
    "dialog",
  ]) {
    assert(css.includes(component), `Missing shared styles for ${component}`);
  }
  assert.match(css, /@media \(max-width: 600px\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
});
