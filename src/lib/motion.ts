/** Controlled 3D preview layout: the selected card stays fully readable.
 * Side cards are scaled previews that never cover the centered card.
 * Orbit speed and shortest-path selection stay independent of layout geometry. */
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
  const scale = 0.56 + 0.44 * Math.max(0, depth);
  const x = sine * width * 0.445;
  const y = (1 - depth) * 6;
  return {
    transform: `translate(-50%,-50%) translate3d(${x}px,${y}px,${(depth - 1) * 95}px) rotateY(${-sine * 20}deg) scale(${scale})`,
    zIndex: String(Math.round((depth + 1) * 100)),
    filter:
      depth < -0.55 ? "none" : `saturate(${0.87 + 0.13 * Math.max(0, depth)})`,
    opacity: depth < -0.55 ? "0" : String(0.75 + 0.25 * Math.max(0, depth)),
    depth,
    scale,
    x,
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
