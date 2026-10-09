/** These values are the original portfolio's orbital geometry and timing. */
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
  const a = angle + (index * Math.PI * 2) / count,
    s = Math.sin(a),
    c = Math.cos(a);
  return {
    transform: `translate(-50%,-50%) translate3d(${s * width * 0.34}px,${-c * 7}px,${(c - 1) * 105}px) rotateY(${-s * 48}deg)`,
    zIndex: String(Math.round((c + 1) * 100)),
    filter: `brightness(${0.85 + (c + 1) * 0.075})`,
    depth: c,
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
