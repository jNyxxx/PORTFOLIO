import { test } from "node:test";
import assert from "node:assert/strict";
import {
  wrapIndex,
  orbitPosition,
  nearestOrbitIndex,
  targetAngle,
  ORBIT_PERIOD_MS,
} from "../src/lib/motion";

test("orbit keeps the 32-second rotation, with a distinct centered project", () => {
  assert.equal(ORBIT_PERIOD_MS, 32000);
  const front = orbitPosition(0, 0, 4, 600);
  const rear = orbitPosition(0, 2, 4, 600);
  assert.equal(front.depth, 1);
  assert.equal(front.scale, 1);
  assert.equal(front.x, 0);
  assert.equal(rear.depth, -1);
  assert.equal(rear.opacity, "0");
  assert.equal(nearestOrbitIndex(-Math.PI / 2, 4), 1);
});

test("side windows stay separated from the center window at representative viewport widths", () => {
  // CSS uses 54% card width; the side preview scales to 56%.
  // A small clearance prevents the side preview from covering the center UI.
  for (const width of [400, 600, 900, 1280]) {
    const center = orbitPosition(0, 0, 4, width);
    const side = orbitPosition(0, 1, 4, width);
    const centerHalfWidth = (0.54 * width * center.scale) / 2;
    const sideHalfWidth = (0.54 * width * side.scale) / 2;
    assert(
      Math.abs(side.x - center.x) > centerHalfWidth + sideHalfWidth,
      `Side preview overlaps center at ${width}px`,
    );
    assert(Number(side.opacity) > 0);
  }
});

test("carousel selection chooses shortest path and wraps both directions", () => {
  for (let i = -8; i <= 8; i++) {
    const target = targetAngle(1.2, i, 4);
    assert(Math.abs(target - 1.2) <= Math.PI);
    assert.equal(nearestOrbitIndex(target, 4), wrapIndex(i, 4));
  }
});
