import { describe, expect, it } from "vitest";
import type { PropertyMedia } from "../types/Property";
import { selectCoverMedia, selectTourVideo } from "./media";

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
