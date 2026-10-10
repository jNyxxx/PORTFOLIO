import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { test } from "node:test";
import assert from "node:assert/strict";
import { Portfolio } from "../src/components/portfolio";
import { media, projects } from "../src/content/portfolio";
import { makeDOM, installDOM } from "./dom-fixture";
import type { ProjectId } from "../src/lib/types";
test("project engineering, gallery navigation, optimized previews, filters, and menu work", async () => {
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
    // shadcn Base UI primitive is mounted, not just a locally-styled HTML button.
    for (const selector of [
      "#carousel-prev",
      "#carousel-next",
      ".ui-copy-address",
      '[data-filter="all"]',
    ]) {
      assert.equal(
        d.querySelector(selector)?.getAttribute("data-slot"),
        "button",
        selector,
      );
    }
    const githubIcon = d.querySelector(
      ".social-links a[href='https://github.com/jNyxxx'] .ui-social-icon svg path",
    );
    assert(
      githubIcon?.getAttribute("d")?.length &&
        githubIcon.getAttribute("d")!.length > 200,
      "Github must render the actual Simple Icons brand path",
    );
    const mediaCards = d.querySelectorAll(
      "#featured [data-slot='card'].featured-media-card",
    );
    assert.equal(
      mediaCards.length,
      2,
      "Featured gallery uses real shadcn Card composition",
    );
    assert.equal(
      d.querySelectorAll(
        "#featured .featured-media-card [data-slot='card-footer']",
      ).length,
      2,
    );
    // All major projects use the same composed dashboard+overlay cover.
    assert.equal(
      d.querySelectorAll("#featured .project-cover--data").length,
      1,
    );
    assert.equal(d.querySelectorAll("#work .project-cover").length, 3);
    for (const project of ["data", "support", "sentinel"]) {
      const cover = d.querySelector(`.project-cover--${project}`);
      assert(cover?.querySelector(".project-cover__window img"));
      assert(cover?.querySelector(".project-cover__secondary img"));
    }
    assert.equal(d.querySelectorAll("#work .project-concept").length, 4);
    assert.equal(d.querySelectorAll(".project-cover--outreach img").length, 0);
    await click('[data-cover="sentinel"]');
    assert.equal(d.getElementById("case-title")?.textContent, "SentinelAI");
    await click(".close-dialog");
    await click('#featured .featured-media-card [data-photo-preview="4"]');
    assert((d.getElementById("photo-preview") as HTMLDialogElement).open);
    await click("#preview-close");
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
      assert.equal(d.querySelectorAll(".case-stack-layer").length > 0, true);
      assert.equal(d.querySelectorAll(".case-flow li").length > 0, true);
      assert.equal(
        d.querySelectorAll(".case-decisions article").length > 0,
        true,
      );
      assert(d.querySelector(".case-evidence-note")?.textContent?.trim());
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
    assert(
      d
        .querySelector(".gallery-full-image img")
        ?.getAttribute("src")
        ?.endsWith("00-portfolio-cover.png"),
      "Next moves one image forward and wraps to first",
    );
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
      await click("#preview-next");
      assert.equal(
        d.getElementById("preview-image")?.getAttribute("src"),
        media[key as ProjectId].photos[0]?.src,
        "Next advances and wraps to the first image",
      );
      await click("#preview-prev");
      assert.equal(
        d.getElementById("preview-image")?.getAttribute("src"),
        media[key as ProjectId].photos.at(-1)?.src,
        "Previous goes back and wraps to the last image",
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
    assert.equal(d.getElementById("stack-motion-toggle"), null);
    assert.equal(
      d.querySelector(".stack-motion-window")?.getAttribute("aria-hidden"),
      "true",
    );
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
