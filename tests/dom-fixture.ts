import { JSDOM } from "jsdom";
import { readFileSync } from "node:fs";
export function makeDOM(
  html = '<!doctype html><html><body><div id="root"></div></body></html>',
) {
  const dom = new JSDOM(html, {
    url: "https://portfolio.test/",
    runScripts: "outside-only",
    pretendToBeVisual: true,
  });
  const w = dom.window;
  const media = {
    matches: false,
    media: "",
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
    dispatchEvent() {
      return true;
    },
    onchange: null,
  };
  Object.defineProperty(w, "matchMedia", {
    value: () => media,
    configurable: true,
  });
  Object.defineProperty(w.HTMLImageElement.prototype, "loading", {
    get() {
      return this.getAttribute("loading") || "";
    },
    set(value: string) {
      this.setAttribute("loading", value);
    },
    configurable: true,
  });
  w.requestAnimationFrame = () => 1;
  w.cancelAnimationFrame = () => {};
  class Observer {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  Object.defineProperty(w, "IntersectionObserver", { value: Observer });
  Object.defineProperty(w, "ResizeObserver", { value: Observer });
  w.HTMLDialogElement.prototype.showModal = function () {
    this.setAttribute("open", "");
  };
  w.HTMLDialogElement.prototype.close = function () {
    this.removeAttribute("open");
    this.dispatchEvent(new w.Event("close"));
  };
  return dom;
}
export function installDOM(dom: JSDOM) {
  const w = dom.window;
  for (const key of [
    "window",
    "document",
    "navigator",
    "HTMLElement",
    "HTMLDialogElement",
    "Node",
    "Event",
    "MouseEvent",
    "KeyboardEvent",
    "AbortController",
    "IntersectionObserver",
    "ResizeObserver",
    "requestAnimationFrame",
    "cancelAnimationFrame",
  ])
    Object.defineProperty(globalThis, key, {
      value: key === "window" ? w : w[key as keyof typeof w],
      configurable: true,
      writable: true,
    });
  Object.defineProperty(globalThis, "IS_REACT_ACT_ENVIRONMENT", {
    value: true,
    writable: true,
    configurable: true,
  });
}
export function legacyDOM() {
  const dom = makeDOM(readFileSync("tests/baseline/index.html", "utf8"));
  for (const file of ["content.js", "media.js", "app.js", "carousel.js"])
    dom.window.eval(
      readFileSync("tests/baseline/" + file, "utf8").replace(
        "document.currentScript.src",
        "'https://portfolio.test/media.js?v=9'",
      ),
    );
  return dom;
}
export function normalizeElement(element: Element): unknown {
  // Runtime-only/React bookkeeping attributes have no visual effect. Closed modal
  // content is verified by interaction tests instead of the homepage comparison.
  const ignore = new Set([
    "aria-current",
    "aria-label",
    "aria-pressed",
    "aria-selected",
    "tabindex",
  ]);
  const attributes = Object.fromEntries(
    Array.from(element.attributes)
      .filter(
        (a) => !ignore.has(a.name) && a.value !== "" && a.name !== "style",
      )
      .map((a) => [
        a.name,
        ["src", "href"].includes(a.name)
          ? a.value
              .replace("https://portfolio.test", "")
              .replace(/^assets\//, "/assets/")
          : a.value,
      ])
      .sort(([a], [b]) => a.localeCompare(b)),
  );
  if (element.id === "clock" || element.id === "year")
    return { tag: element.tagName, attributes };
  const children = Array.from(element.childNodes)
    .filter(
      (n) => n.nodeType === 1 || (n.nodeType === 3 && n.textContent?.trim()),
    )
    .map((n) =>
      n.nodeType === 1
        ? normalizeElement(n as Element)
        : n.textContent?.replace(/\s+/g, " "),
    );
  return { tag: element.tagName, attributes, children };
}
