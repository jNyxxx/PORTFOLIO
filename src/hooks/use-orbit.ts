"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { carouselEntries } from "@/content/portfolio";
import {
  nearestOrbitIndex,
  orbitPosition,
  targetAngle,
  wrapIndex,
  ORBIT_PERIOD_MS,
} from "@/lib/motion";
import type { ProjectId } from "@/lib/types";
interface OrbitActions {
  select: (index: number) => void;
  togglePause: () => void;
  cardClick: (index: number) => void;
}
/** Imperative transforms avoid a React render on every animation frame.
 * React owns selection/content; this hook owns only motion and transient gestures. */
export function useOrbit(openCase: (project: ProjectId) => void) {
  const regionRef = useRef<HTMLDivElement>(null),
    stageRef = useRef<HTMLDivElement>(null),
    cardsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [index, setIndex] = useState(0),
    [paused, setPaused] = useState(false);
  const actions = useRef<OrbitActions>({
    select: () => {},
    togglePause: () => {},
    cardClick: () => {},
  });
  useEffect(() => {
    const region = regionRef.current,
      stage = stageRef.current;
    if (!region || !stage) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)"),
      count = carouselEntries.length;
    let angle = 0,
      target: number | null = null,
      current = 0,
      isPaused = reduce.matches,
      hovered = false,
      focused = false,
      visible = true,
      last = 0,
      frame = 0,
      width = stage.clientWidth,
      suppressClick = false;
    let drag: { x: number; angle: number } | null = null;
    let releaseTimer: ReturnType<typeof setTimeout> | undefined;
    const controller = new AbortController(),
      options = { signal: controller.signal };
    function render() {
      const next = nearestOrbitIndex(angle, count);
      cardsRef.current.forEach((card, i) => {
        if (card) {
          const p = orbitPosition(angle, i, count, width);
          card.style.transform = p.transform;
          card.style.zIndex = p.zIndex;
          card.style.filter = p.filter;
          card.style.opacity = p.opacity;
          card.dataset.facing = i === next ? "true" : "false";
          card.style.pointerEvents = p.depth < -0.55 ? "none" : "auto";
          card.tabIndex = i === next ? 0 : -1;
        }
      });
      if (next !== current) {
        current = next;
        setIndex(next);
      }
    }
    function start() {
      if (!frame && visible && !document.hidden) {
        last = 0;
        frame = requestAnimationFrame(tick);
      }
    }
    function select(i: number) {
      target = targetAngle(angle, i, count);
      if (reduce.matches) {
        angle = target;
        target = null;
        render();
      } else start();
    }
    function tick(now: number) {
      frame = 0;
      const dt = last ? Math.min(now - last, 40) : 0;
      last = now;
      if (target !== null) {
        angle += (target - angle) * (1 - Math.exp(-dt / 140));
        if (Math.abs(target - angle) < 0.001) {
          angle = target;
          target = null;
        }
        render();
      } else if (
        !isPaused &&
        !hovered &&
        !focused &&
        !drag &&
        !reduce.matches
      ) {
        angle -= (dt * Math.PI * 2) / ORBIT_PERIOD_MS;
        render();
      }
      if (
        visible &&
        !document.hidden &&
        (target !== null ||
          (!isPaused && !hovered && !focused && !drag && !reduce.matches))
      )
        frame = requestAnimationFrame(tick);
    }
    actions.current = {
      select,
      togglePause: () => {
        isPaused = !isPaused;
        setPaused(isPaused);
        start();
      },
      cardClick: (i) => {
        if (suppressClick) return;
        if (i === current) openCase(carouselEntries[i].key);
        else select(i);
      },
    };
    region.addEventListener(
      "mouseenter",
      () => {
        hovered = true;
      },
      options,
    );
    region.addEventListener(
      "mouseleave",
      () => {
        hovered = false;
        start();
      },
      options,
    );
    region.addEventListener(
      "focusin",
      () => {
        focused = true;
      },
      options,
    );
    region.addEventListener(
      "focusout",
      (e) => {
        focused = region.contains(e.relatedTarget as Node | null);
        start();
      },
      options,
    );
    region.addEventListener(
      "keydown",
      (e) => {
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
          e.preventDefault();
          select(current + (e.key === "ArrowLeft" ? -1 : 1));
        }
      },
      options,
    );
    stage.addEventListener(
      "pointerdown",
      (e) => {
        if (e.button !== 0) return;
        drag = { x: e.clientX, angle };
        target = null;
        suppressClick = false;
      },
      options,
    );
    stage.addEventListener(
      "pointermove",
      (e) => {
        if (!drag) return;
        const dx = e.clientX - drag.x;
        if (Math.abs(dx) > 7) {
          suppressClick = true;
          stage.setPointerCapture(e.pointerId);
          stage.classList.add("is-dragging");
          angle = drag.angle + (dx / Math.max(width, 1)) * Math.PI * 2;
          render();
        }
      },
      options,
    );
    function endDrag() {
      if (!drag) return;
      drag = null;
      stage!.classList.remove("is-dragging");
      if (suppressClick) {
        select(current);
        clearTimeout(releaseTimer);
        releaseTimer = setTimeout(() => {
          suppressClick = false;
        }, 150);
      }
      start();
    }
    for (const event of ["pointerup", "pointercancel", "lostpointercapture"])
      stage.addEventListener(event, endDrag, options);
    document.addEventListener(
      "visibilitychange",
      () => {
        if (!document.hidden) start();
      },
      options,
    );
    reduce.addEventListener(
      "change",
      () => {
        isPaused = reduce.matches;
        if (isPaused) select(current);
        setPaused(isPaused);
        start();
      },
      options,
    );
    const resize =
      "ResizeObserver" in window
        ? new ResizeObserver(() => {
            width = stage.clientWidth;
            render();
          })
        : null;
    resize?.observe(stage);
    const observer =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            (entries) => {
              visible = entries[0].isIntersecting;
              if (visible) start();
            },
            { threshold: 0.1 },
          )
        : null;
    observer?.observe(region);
    setIndex(0);
    setPaused(isPaused);
    render();
    start();
    return () => {
      controller.abort();
      cancelAnimationFrame(frame);
      clearTimeout(releaseTimer);
      resize?.disconnect();
      observer?.disconnect();
      actions.current = {
        select: () => {},
        togglePause: () => {},
        cardClick: () => {},
      };
    };
  }, [openCase]);
  const setCardRef = useCallback(
    (i: number, node: HTMLButtonElement | null) => {
      cardsRef.current[i] = node;
    },
    [],
  );
  return {
    regionRef,
    stageRef,
    setCardRef,
    index,
    paused,
    select: useCallback(
      (i: number) =>
        actions.current.select(wrapIndex(i, carouselEntries.length)),
      [],
    ),
    togglePause: useCallback(() => actions.current.togglePause(), []),
    onCardClick: useCallback((i: number) => actions.current.cardClick(i), []),
  };
}
