import type { PropertyMedia } from "../types/Property";

/**
 * Pure helpers for selecting property media. No React, no I/O — safe to
 * unit test directly and reuse from the card (cover thumbnail) and the
 * detail page (tour video + poster).
 */

/**
 * Returns the best "cover" item for a media list: an explicit `cover` item
 * if present, otherwise the first `image`, otherwise the first item of any
 * kind. Returns undefined for an empty list. Used for the Home card
 * thumbnail and as the detail-page video poster.
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
 * Returns the primary tour video for a property: the first `video` item, or
 * undefined when the property has no video. The detail page plays this as
 * its single piece of media.
 */
export function selectTourVideo(
  media: PropertyMedia[],
): PropertyMedia | undefined {
  return media.find((item) => item.type === "video");
}
