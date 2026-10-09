import assert from "node:assert/strict";
import { test } from "node:test";
import { existsSync, statSync } from "node:fs";
import { engineering } from "../src/content/project-engineering";
import { projects } from "../src/content/portfolio";
import { previewSource } from "../src/lib/photos";
import type { ProjectId } from "../src/lib/types";

test("all eight portfolio systems have detailed, evidence-bound technical case studies", () => {
  const keys = Object.keys(projects) as ProjectId[];
  assert.equal(keys.length, 8);
  assert.deepEqual(Object.keys(engineering).sort(), keys.sort());
  for (const key of keys) {
    const info = engineering[key];
    assert(info.status.length >= 18, key);
    assert(
      info.stack.every((s) => s.technologies && s.purpose.length > 35),
      key,
    );
    assert(info.pipeline.length >= 2, key);
    assert(info.decisions.length >= 1, key);
    assert(info.boundary.length > 65, key);
  }
  assert.match(engineering.support.boundary, /no live channels/i);
  assert.match(engineering.aitest.boundary, /No verified application code/i);
  assert.match(engineering.data.boundary, /not claimed/i);
});

test("optimized DataAutomated previews exist and retain separate original links", () => {
  for (const basename of [
    "dashboard",
    "voice-of-customer",
    "competitive-signals",
    "journey-intelligence",
    "reports",
    "value-identified",
    "settings-sources",
    "setup-guide",
    "sign-in",
  ]) {
    const src = `/assets/dataautomated/${basename}.png`;
    const target = previewSource(src);
    assert.equal(target, `/assets/dataautomated/${basename}.webp`);
    assert(existsSync("public" + target));
    assert(
      statSync("public" + target).size < statSync("public" + src).size / 2,
      basename,
    );
  }
  assert.equal(
    previewSource("/assets/dataautomated/landing-hero.png"),
    "/assets/dataautomated/landing-hero.png",
  );
  assert.equal(
    previewSource("/assets/sentinel/02.png"),
    "/assets/sentinel/02.png",
  );
});
