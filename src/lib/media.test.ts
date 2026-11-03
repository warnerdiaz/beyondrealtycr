import { describe, expect, it } from "vitest";
import type { PropertyMedia } from "../types/Property";
import { getGalleryImages, getGalleryVideos, selectCoverMedia } from "./media";

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

describe("getGalleryImages", () => {
  it("returns cover items before image items, excluding video", () => {
    expect(getGalleryImages([video, image, cover])).toEqual([cover, image]);
  });

  it("returns an empty array when there are no stills", () => {
    expect(getGalleryImages([video])).toEqual([]);
  });
});

describe("getGalleryVideos", () => {
  it("returns only video items", () => {
    expect(getGalleryVideos([video, image, cover])).toEqual([video]);
  });

  it("returns an empty array when there is no video", () => {
    expect(getGalleryVideos([image, cover])).toEqual([]);
  });
});
