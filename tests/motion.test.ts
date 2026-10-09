import { test } from "node:test";
import assert from "node:assert/strict";
import {
  wrapIndex,
  orbitPosition,
  nearestOrbitIndex,
  targetAngle,
  ORBIT_PERIOD_MS,
} from "../src/lib/motion";
test("orbit keeps the original 32-second circular path and card depth", () => {
  assert.equal(ORBIT_PERIOD_MS, 32000);
  assert.equal(
    orbitPosition(0, 0, 4, 600).transform,
    "translate(-50%,-50%) translate3d(0px,-7px,0px) rotateY(0deg)",
  );
  assert.equal(orbitPosition(Math.PI, 0, 4, 600).depth, -1);
  assert.equal(nearestOrbitIndex(-Math.PI / 2, 4), 1);
});
test("carousel selection chooses shortest path and wraps both directions", () => {
  for (let i = -8; i <= 8; i++) {
    const target = targetAngle(1.2, i, 4);
    assert(Math.abs(target - 1.2) <= Math.PI);
    assert.equal(nearestOrbitIndex(target, 4), wrapIndex(i, 4));
  }
});
