/** NYX circular project orbit — original continuous 32s rotation and 3D Y turns.
 * Viewport-aware card scaling/visibility prevents adjacent cards from covering
 * the selected card without flattening the motion into a side-by-side slider. */
export const ORBIT_PERIOD_MS = 32000;

export function wrapIndex(index: number, count: number) {
  return ((index % count) + count) % count;
}

export function orbitPosition(
  angle: number,
  index: number,
  count: number,
  width: number,
) {
  const a = angle + (index * Math.PI * 2) / count;
  const sine = Math.sin(a);
  const depth = Math.cos(a);
  // True circular orbit (sin/cos), with smaller windows moving around the back.
  // Front-facing card gets the full size; the neighbors travel around a
  // genuine 3D circle. The radius is derived from the rendered card width,
  // rather than growing forever on ultrawide monitors.
  const cardWidth = Math.min(width * 0.41, 460);
  const radius = Math.min(width * 0.365, 460 * 0.94);
  const x = sine * radius;
  const y = (1 - depth) * 15;
  const scale = 0.72 + 0.28 * Math.max(0, depth);
  const opacity = depth < -0.1 ? 0 : Math.min(1, (depth + 0.1) / 0.17);
  return {
    transform: `translate(-50%,-50%) translate3d(${x}px,${y}px,${(depth - 1) * 175}px) rotateY(${-sine * 45}deg) scale(${scale})`,
    zIndex: String(Math.round((depth + 1) * 100)),
    filter: `brightness(${0.87 + (depth + 1) * 0.065})`,
    opacity: String(opacity),
    depth,
    scale,
    x,
    cardWidth,
    rotationY: -sine * 45,
  };
}

export function nearestOrbitIndex(angle: number, count: number) {
  let nearest = 0,
    depth = -Infinity;
  for (let i = 0; i < count; i++) {
    const c = Math.cos(angle + (i * Math.PI * 2) / count);
    if (c > depth) {
      depth = c;
      nearest = i;
    }
  }
  return nearest;
}

export function targetAngle(angle: number, index: number, count: number) {
  const tau = Math.PI * 2;
  let delta = ((-wrapIndex(index, count) * tau) / count - angle) % tau;
  if (delta > Math.PI) delta -= tau;
  if (delta < -Math.PI) delta += tau;
  return angle + delta;
}
