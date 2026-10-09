import { useEffect } from "react";
import type { Photo } from "@/lib/types";
import { wrapIndex } from "./motion";

/**
 * Prefer existing optimized screenshots for gallery display, preserving the PNG
 * URL separately for the original/full-resolution action.
 */
const optimizedDataScreens = new Set([
  "dashboard",
  "voice-of-customer",
  "competitive-signals",
  "journey-intelligence",
  "reports",
  "value-identified",
  "settings-sources",
  "setup-guide",
  "sign-in",
]);

export function previewSource(original: string) {
  const match = original.match(/^\/assets\/dataautomated\/([a-z-]+)\.png$/);
  return match && optimizedDataScreens.has(match[1])
    ? `/assets/dataautomated/${match[1]}.webp`
    : original;
}

/** Preloads immediate neighbors without downloading the entire screenshot set. */
export function useAdjacentPhotoPreload(
  photos: Photo[],
  index: number,
  active: boolean,
) {
  useEffect(() => {
    if (!active || photos.length < 2 || typeof window === "undefined") return;
    const neighbors = new Set([
      wrapIndex(index + 1, photos.length),
      wrapIndex(index - 1, photos.length),
    ]);
    const images = Array.from(neighbors, (i) => {
      const img = new window.Image();
      img.decoding = "async";
      img.src = previewSource(photos[i].src);
      return img;
    });
    return () => {
      for (const img of images) {
        img.onload = null;
        img.onerror = null;
      }
    };
  }, [active, index, photos]);
}
