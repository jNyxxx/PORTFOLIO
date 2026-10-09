import { test } from "node:test";
import assert from "node:assert/strict";
import {
  wrapIndex,
  orbitPosition,
  nearestOrbitIndex,
  targetAngle,
  ORBIT_PERIOD_MS,
} from "../src/lib/motion";

test("carousel preserves the original continuous 32-second circular orbit", () => {
  assert.equal(ORBIT_PERIOD_MS, 32000);
  const front = orbitPosition(0, 0, 4, 650);
  const rear = orbitPosition(0, 2, 4, 650);
  assert.equal(front.depth, 1);
  assert.equal(front.scale, 1);
  assert.equal(front.x, 0);
  assert.match(front.transform, /rotateY\(0deg\)/);
  assert.equal(rear.depth, -1);
  assert.equal(rear.opacity, "0");
  assert.equal(nearestOrbitIndex(-Math.PI / 2, 4), 1);
  const quarter = orbitPosition(Math.PI / 2, 0, 4, 650);
  assert(Math.abs(quarter.x) > 250, "Card must travel around a circular path");
  assert.match(quarter.transform, /rotateY\(-45deg\)/);
});

test("visible 3D cards do not overlap at any sampled point around a full orbit", () => {
  // Conservative projected bounds: ignore Y rotation that narrows visible cards.
  // Desktop CSS = 46% stage width, max 460px. Mobile shows only active card.
  for (const width of [650, 760, 900, 1280]) {
    for (let degree = 0; degree < 360; degree++) {
      const angle = (degree * Math.PI) / 180;
      const cards = [0, 1, 2, 3]
        .map((i) => orbitPosition(angle, i, 4, width))
        .filter((p) => p.depth >= -0.1);
      const baseWidth = Math.min(0.46 * width, 460);
      for (let left = 0; left < cards.length; left++) {
        for (let right = left + 1; right < cards.length; right++) {
          const a = cards[left],
            b = cards[right];
          const clearance =
            Math.abs(a.x - b.x) - (baseWidth * (a.scale + b.scale)) / 2;
          assert(
            clearance >= 0,
            `Overlap at ${width}px and ${degree}°: ${clearance}px`,
          );
        }
      }
    }
  }
});

test("carousel selection chooses shortest path and wraps both directions", () => {
  for (let i = -8; i <= 8; i++) {
    const target = targetAngle(1.2, i, 4);
    assert(Math.abs(target - 1.2) <= Math.PI);
    assert.equal(nearestOrbitIndex(target, 4), wrapIndex(i, 4));
  }
});
