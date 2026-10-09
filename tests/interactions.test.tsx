import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { test } from "node:test";
import assert from "node:assert/strict";
import { Portfolio } from "../src/components/portfolio";
import { media, projects } from "../src/content/portfolio";
import { makeDOM, installDOM } from "./dom-fixture";
import type { ProjectId } from "../src/lib/types";
test("all project dialogs, gallery navigation, image previews, filters, motion controls, and menu work", async () => {
  const dom = makeDOM();
  installDOM(dom);
  const w = dom.window,
    d = w.document;
  Object.defineProperty(w, "matchMedia", {
    value: () => ({
      matches: true,
      addEventListener() {},
      removeEventListener() {},
    }),
    configurable: true,
  });
  const root = createRoot(d.getElementById("root")!);
  const click = async (selector: string) => {
    const el = d.querySelector(selector);
    assert(el, selector);
    await act(async () =>
      el.dispatchEvent(
        new w.MouseEvent("click", { bubbles: true, cancelable: true }),
      ),
    );
  };
  try {
    await act(async () => root.render(<Portfolio />));
    for (const key of Object.keys(projects) as ProjectId[]) {
      const selector =
        key === "data"
          ? '[data-media="data:overview"]'
          : `[data-open="${key}"]`;
      await click(selector);
      assert((d.getElementById("case-dialog") as HTMLDialogElement).open);
      assert.equal(
        d.getElementById("case-title")?.textContent,
        projects[key].title,
      );
      assert.equal(d.body.style.overflow, "hidden");
      assert.equal(
        (d.getElementById("tab-photos") as HTMLButtonElement).hidden,
        !media[key].photos.length,
      );
      await click(".close-dialog");
      assert.equal(d.body.style.overflow, "");
    }
    await click('[data-media="support:photos"]');
    assert(
      d
        .querySelector(".gallery-full-image img")
        ?.getAttribute("src")
        ?.endsWith("00-portfolio-cover.png"),
    );
    await click(".gallery-prev");
    assert(
      d
        .querySelector(".gallery-full-image img")
        ?.getAttribute("src")
        ?.endsWith("08-settings.png"),
    );
    await click(".gallery-next");
    await click('[data-photo="3"]');
    assert(
      d
        .querySelector(".gallery-full-image img")
        ?.getAttribute("src")
        ?.endsWith("03-voice-knowledge.png"),
    );
    await click(".dialog-done");
    for (const key of ["support", "sentinel"]) {
      await click(`[data-photo-project="${key}"][data-photo-preview="0"]`);
      assert((d.getElementById("photo-preview") as HTMLDialogElement).open);
      await act(async () =>
        d
          .getElementById("photo-preview")!
          .dispatchEvent(
            new w.KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true }),
          ),
      );
      assert.equal(
        d.getElementById("preview-image")?.getAttribute("src"),
        media[key as ProjectId].photos.at(-1)?.src,
      );
      await click("#preview-close");
    }
    await click('[data-filter="language"]');
    assert.equal(d.querySelectorAll("#stack-grid .tech-cell").length, 4);
    assert(
      d.getElementById("stack-status")?.textContent?.startsWith("4 tools"),
    );
    await click('[data-filter="all"]');
    assert.equal(d.querySelectorAll("#stack-grid .tech-cell").length, 21);
    await click("#stack-motion-toggle");
    assert(d.getElementById("stack")?.classList.contains("stack-paused"));
    await click("#stack-motion-toggle");
    assert(!d.getElementById("stack")?.classList.contains("stack-paused"));
    await click("#menu-toggle");
    assert.equal(
      d.getElementById("menu-toggle")?.getAttribute("aria-expanded"),
      "true",
    );
    await click('nav a[href="#work"]');
    assert.equal(
      d.getElementById("menu-toggle")?.getAttribute("aria-expanded"),
      "false",
    );
    assert.equal(
      d.getElementById("carousel-pause")?.getAttribute("aria-pressed"),
      "true",
    );
    await click('[data-carousel-go="3"]');
    assert.equal(d.getElementById("carousel-name")?.textContent, "SentinelAI");
    assert.equal(
      d.getElementById("rotating-role")?.textContent,
      "Systems builder.",
    );
    await click('[data-carousel-index="3"]');
    assert.equal(d.getElementById("case-title")?.textContent, "SentinelAI");
    await click(".close-dialog");
    let copied = "";
    Object.defineProperty(w.navigator, "clipboard", {
      value: {
        writeText: async (value: string) => {
          copied = value;
        },
      },
      configurable: true,
    });
    const socialTiles = d.querySelectorAll(".social-links > *");
    assert.equal(socialTiles.length, 4);
    for (const tile of socialTiles) {
      assert.equal(tile.querySelectorAll("svg").length, 2);
    }
    assert.equal(d.querySelectorAll(".copy-email").length, 0);
    await click(".ui-copy-address");
    assert.equal(copied, "nyx.sdlc@gmail.com");
    assert.equal(
      d.getElementById("copy-status")?.textContent,
      "Email address copied.",
    );
    assert.equal(
      d.querySelector(".ui-copy-address")?.getAttribute("data-copied"),
      "true",
    );
    copied = "";
    await click(".social-links button");
    assert.equal(copied, "nyx.sdlc@gmail.com");
    let fallbackWasUsed = false;
    Object.defineProperty(w.navigator, "clipboard", {
      value: {
        writeText: async () => {
          throw new Error("denied");
        },
      },
      configurable: true,
    });
    d.execCommand = () => {
      fallbackWasUsed = true;
      return true;
    };
    await click(".ui-copy-address");
    assert(
      fallbackWasUsed,
      "Legacy clipboard fallback should work when permission is denied",
    );
  } finally {
    await act(async () => root.unmount());
    dom.window.close();
  }
});
