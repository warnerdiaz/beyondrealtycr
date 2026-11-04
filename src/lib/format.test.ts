import { describe, expect, it } from "vitest";
import { formatLandSize, formatPrice, formatPricePerAcre, slugify } from "./format";

describe("formatPrice", () => {
  it("formats a typical price with thousands separators and no decimals", () => {
    expect(formatPrice(400000)).toBe("$400,000");
  });

  it("formats a small value", () => {
    expect(formatPrice(500)).toBe("$500");
  });

  it("formats a large value with multiple thousands separators", () => {
    expect(formatPrice(1250000)).toBe("$1,250,000");
  });

  it("formats zero", () => {
    expect(formatPrice(0)).toBe("$0");
  });

  it("drops decimals rather than rounding into extra digits", () => {
    expect(formatPrice(399999.6)).toBe("$400,000");
  });
});

describe("formatLandSize", () => {
  it("formats the typical Cahuita property value", () => {
    expect(formatLandSize(37)).toBe("37 acres (15 ha)");
  });

  it("uses the singular 'acre' for a value of 1", () => {
    expect(formatLandSize(1)).toBe("1 acre (0 ha)");
  });

  it("uses plural 'acres' for values other than 1, including fractional", () => {
    expect(formatLandSize(0.5)).toBe("0.5 acres (0 ha)");
  });

  it("rounds the hectare conversion to the nearest integer", () => {
    // 10 acres * 0.4047 = 4.047 -> rounds to 4
    expect(formatLandSize(10)).toBe("10 acres (4 ha)");
    // 100 acres * 0.4047 = 40.47 -> rounds to 40
    expect(formatLandSize(100)).toBe("100 acres (40 ha)");
  });
});

describe("formatPricePerAcre", () => {
  it("formats a typical price per acre with thousands separators", () => {
    expect(formatPricePerAcre(400000, 37)).toBe("$10,811/acre");
  });

  it("rounds to the nearest whole dollar", () => {
    // 100000 / 3 = 33333.33... -> rounds to 33333
    expect(formatPricePerAcre(100000, 3)).toBe("$33,333/acre");
    // 100000 / 7 = 14285.71... -> rounds to 14286
    expect(formatPricePerAcre(100000, 7)).toBe("$14,286/acre");
  });

  it("returns an empty string when landAcres is zero", () => {
    expect(formatPricePerAcre(400000, 0)).toBe("");
  });

  it("returns an empty string when landAcres is negative", () => {
    expect(formatPricePerAcre(400000, -5)).toBe("");
  });

  it("returns an empty string when landAcres is not finite", () => {
    expect(formatPricePerAcre(400000, Infinity)).toBe("");
    expect(formatPricePerAcre(400000, NaN)).toBe("");
  });
});

describe("slugify", () => {
  it("lowercases and replaces spaces with hyphens", () => {
    expect(slugify("Property With 2 Cabins")).toBe("property-with-2-cabins");
  });

  it("strips accents and diacritics", () => {
    expect(slugify("Cañón")).toBe("canon");
  });

  it("collapses repeated separators into a single hyphen", () => {
    expect(slugify("Cañón  Grande!!")).toBe("canon-grande");
  });

  it("trims leading and trailing hyphens", () => {
    expect(slugify("  --Finca en Venta--  ")).toBe("finca-en-venta");
  });

  it("handles a full example end to end", () => {
    expect(slugify("Propiedad con 2 cabañas y bosque privado")).toBe(
      "propiedad-con-2-cabanas-y-bosque-privado",
    );
  });
});
