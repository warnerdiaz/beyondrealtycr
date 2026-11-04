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

/**
 * Browsable gallery item: either the inline tour video or a browsable
 * `image`. `cover` items are poster/thumbnail sources only and never become
 * their own slide, so they are excluded here.
 */
export type GalleryItem =
  | { kind: "video"; media: PropertyMedia }
  | { kind: "image"; media: PropertyMedia };

/**
 * Builds the ordered gallery for the detail page: the tour video first (if
 * any), followed by every `image` item in order. `cover` items never appear
 * — they only ever supply a poster/thumbnail elsewhere. Pure and
 * presentation-agnostic; the Gallery component maps this onto the stage +
 * thumbnail strip.
 */
export function galleryItems(media: PropertyMedia[]): GalleryItem[] {
  const video = selectTourVideo(media);
  const images = media.filter((item) => item.type === "image");
  return [
    ...(video ? [{ kind: "video", media: video } as const] : []),
    ...images.map((image) => ({ kind: "image", media: image }) as const),
  ];
}

/**
 * Just the browsable images from a gallery, in order — what the lightbox
 * paginates through (the video never appears in the lightbox).
 */
export function galleryImages(items: GalleryItem[]): PropertyMedia[] {
  return items
    .filter((item) => item.kind === "image")
    .map((item) => item.media);
}

/**
 * Whether the thumbnail strip should render at all. Per the current product
 * rule, a single-item gallery (e.g. a property with only a tour video and no
 * browsable images) shows just the inline video with no strip — there is
 * nothing to switch between.
 */
export function shouldShowThumbStrip(items: GalleryItem[]): boolean {
  return items.length > 1;
}
