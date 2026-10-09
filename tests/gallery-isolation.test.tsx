import React, { act } from "react";
import assert from "node:assert/strict";
import { test } from "node:test";
import { createRoot } from "react-dom/client";
import {
  PortfolioProvider,
  usePhotoViewer,
  usePortfolio,
} from "../src/components/portfolio-provider";
import { installDOM, makeDOM } from "./dom-fixture";

test("photo next and previous do not rerender unrelated portfolio consumers", async () => {
  const dom = makeDOM();
  installDOM(dom);
  let portfolioRenders = 0;
  let openPhoto!: (index: number) => void;
  let next!: (index: number) => void;

  function PortfolioProbe() {
    const portfolio = usePortfolio();
    portfolioRenders++;
    openPhoto = (index: number) => portfolio.openPhoto("data", index);
    return <div>Stable main sections</div>;
  }
  function PhotoProbe() {
    const photo = usePhotoViewer();
    next = photo.setPhotoIndex;
    return <output>{photo.photoSelection?.index ?? "none"}</output>;
  }

  const root = createRoot(dom.window.document.getElementById("root")!);
  try {
    await act(async () =>
      root.render(
        <PortfolioProvider>
          <PortfolioProbe />
          <PhotoProbe />
        </PortfolioProvider>,
      ),
    );
    assert.equal(portfolioRenders, 1);
    await act(async () => openPhoto(0));
    assert.equal(
      portfolioRenders,
      1,
      "Opening a photo must not rerender the main page",
    );
    for (let i = 1; i < 6; i++) {
      await act(async () => next(i));
    }
    assert.equal(dom.window.document.querySelector("output")?.textContent, "5");
    assert.equal(
      portfolioRenders,
      1,
      "Gallery navigation must remain isolated",
    );
  } finally {
    await act(async () => root.unmount());
    dom.window.close();
  }
});
