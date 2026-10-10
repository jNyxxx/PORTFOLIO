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
  assert(Math.abs(quarter.x) > 225, "Card must travel around a circular path");
  assert.match(quarter.transform, /rotateY\(-45deg\)/);
});

test("front card and side previews maintain clearance throughout the 3D circular rotation", () => {
  // The visible projected width accounts for rotateY perspective, not the
  // unrotated bounding boxes of cards that are deliberately turned in 3D.
  for (const width of [650, 760, 900, 1100, 1280, 1450]) {
    for (let degree = 0; degree < 360; degree++) {
      const angle = (degree * Math.PI) / 180;
      const cards = [0, 1, 2, 3]
        .map((i) => orbitPosition(angle, i, 4, width))
        .filter((p) => p.depth >= -0.1);
      for (const card of cards) {
        const projection = Math.cos((card.rotationY * Math.PI) / 180);
        const half = (card.cardWidth * card.scale * projection) / 2;
        assert(
          Math.abs(card.x) + half <= width / 2 + 0.01,
          `Visible card falls outside the orbit stage at ${width}px and ${degree}°`,
        );
      }
      for (let left = 0; left < cards.length; left++) {
        for (let right = left + 1; right < cards.length; right++) {
          const a = cards[left];
          const b = cards[right];
          const halfA =
            (a.cardWidth * a.scale * Math.cos((a.rotationY * Math.PI) / 180)) /
            2;
          const halfB =
            (b.cardWidth * b.scale * Math.cos((b.rotationY * Math.PI) / 180)) /
            2;
          const clearance = Math.abs(a.x - b.x) - (halfA + halfB);
          assert(
            clearance >= -0.01,
            `Visible cards overlap at ${width}px and ${degree}° (${clearance}px)`,
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
