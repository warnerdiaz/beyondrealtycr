import { describe, expect, it } from "vitest";
import type { PropertyMedia } from "../types/Property";
import {
  galleryImages,
  galleryItems,
  selectCoverMedia,
  selectTourVideo,
  shouldShowThumbStrip,
} from "./media";

const cover: PropertyMedia = { type: "cover", url: "cover.jpg" };
const image: PropertyMedia = { type: "image", url: "image.jpg" };
const video: PropertyMedia = { type: "video", url: "tour.mp4" };

describe("selectCoverMedia", () => {
  it("prefers an explicit cover item", () => {
    expect(selectCoverMedia([video, image, cover])).toBe(cover);
  });

  it("falls back to the first image when there is no cover", () => {
    expect(selectCoverMedia([video, image])).toBe(image);
  });

  it("falls back to the first item of any kind otherwise", () => {
    expect(selectCoverMedia([video])).toBe(video);
  });

  it("returns undefined for an empty list", () => {
    expect(selectCoverMedia([])).toBeUndefined();
  });
});

describe("selectTourVideo", () => {
  it("returns the first video item", () => {
    const second: PropertyMedia = { type: "video", url: "tour2.mp4" };
    expect(selectTourVideo([cover, video, second])).toBe(video);
  });

  it("returns undefined when there is no video", () => {
    expect(selectTourVideo([cover, image])).toBeUndefined();
  });

  it("returns undefined for an empty list", () => {
    expect(selectTourVideo([])).toBeUndefined();
  });
});

describe("galleryItems", () => {
  const image2: PropertyMedia = { type: "image", url: "image2.jpg" };

  it("orders the video first, followed by images, excluding the cover", () => {
    const result = galleryItems([cover, video, image, image2]);
    expect(result).toEqual([
      { kind: "video", media: video },
      { kind: "image", media: image },
      { kind: "image", media: image2 },
    ]);
  });

  it("returns only images when there is no video", () => {
    const result = galleryItems([cover, image, image2]);
    expect(result).toEqual([
      { kind: "image", media: image },
      { kind: "image", media: image2 },
    ]);
  });

  it("returns just the video when there are no images (video + cover only)", () => {
    const result = galleryItems([video, cover]);
    expect(result).toEqual([{ kind: "video", media: video }]);
  });

  it("returns an empty list for an empty media list", () => {
    expect(galleryItems([])).toEqual([]);
  });

  it("returns an empty list for a cover-only media list", () => {
    expect(galleryItems([cover])).toEqual([]);
  });
});

describe("galleryImages", () => {
  it("extracts only the image items from a gallery, in order", () => {
    const items = galleryItems([video, cover, image]);
    expect(galleryImages(items)).toEqual([image]);
  });

  it("returns an empty list when the gallery has no images", () => {
    const items = galleryItems([video, cover]);
    expect(galleryImages(items)).toEqual([]);
  });
});

describe("shouldShowThumbStrip", () => {
  it("is false for an empty gallery", () => {
    expect(shouldShowThumbStrip([])).toBe(false);
  });

  it("is false for a single-item gallery (video-only, strip suppressed)", () => {
    const items = galleryItems([video, cover]);
    expect(shouldShowThumbStrip(items)).toBe(false);
  });

  it("is false for a single-item gallery (one image only)", () => {
    const items = galleryItems([cover, image]);
    expect(shouldShowThumbStrip(items)).toBe(false);
  });

  it("is true when there is a video plus at least one image", () => {
    const items = galleryItems([video, cover, image]);
    expect(shouldShowThumbStrip(items)).toBe(true);
  });

  it("is true for multiple images with no video", () => {
    const image2: PropertyMedia = { type: "image", url: "image2.jpg" };
    const items = galleryItems([cover, image, image2]);
    expect(shouldShowThumbStrip(items)).toBe(true);
  });
});
