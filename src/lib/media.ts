import type { PropertyMedia } from "../types/Property";

/**
 * Pure helpers for selecting/ordering property gallery media. No React, no
 * I/O — safe to unit test directly and reuse from the detail page gallery.
 */

/**
 * Returns the best "cover" item for a media list: an explicit `cover` item
 * if present, otherwise the first `image`, otherwise the first item of any
 * kind. Returns undefined for an empty list.
 */
export function selectCoverMedia(
  media: PropertyMedia[],
): PropertyMedia | undefined {
  return (
    media.find((item) => item.type === "cover") ??
    media.find((item) => item.type === "image") ??
    media[0]
  );
}

/**
 * Splits a property's media into the still images shown in the gallery
 * (cover + image items, cover first) and the video items shown separately
 * so the caller can lazy-load video playback on demand.
 */
export function getGalleryImages(media: PropertyMedia[]): PropertyMedia[] {
  const cover = media.filter((item) => item.type === "cover");
  const images = media.filter((item) => item.type === "image");
  return [...cover, ...images];
}

/** Returns only the video items from a property's media list. */
export function getGalleryVideos(media: PropertyMedia[]): PropertyMedia[] {
  return media.filter((item) => item.type === "video");
}
