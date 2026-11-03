import { describe, expect, it } from "vitest";
import type { Property } from "../types/Property";
import { filterProperties } from "./filter";

function makeProperty(overrides: Partial<Property>): Property {
  return {
    id: "p1",
    type: "finca",
    priceUsd: 400000,
    landAcres: 37,
    region: "south-caribbean",
    media: { en: [], es: [] },
    translations: {
      en: { description: "", location: "", title: "" },
      es: { description: "", location: "", title: "" },
    },
    ...overrides,
  };
}

const finca = makeProperty({
  id: "finca-1",
  type: "finca",
  priceUsd: 400000,
  landAcres: 37,
  region: "south-caribbean",
});

const lote = makeProperty({
  id: "lote-1",
  type: "lote",
  priceUsd: 150000,
  landAcres: 5,
  region: "guanacaste",
});

const midRangeFinca = makeProperty({
  id: "finca-2",
  type: "finca",
  priceUsd: 250000,
  landAcres: 10,
  region: "guanacaste",
});

const properties: Property[] = [finca, lote, midRangeFinca];

describe("filterProperties", () => {
  it("returns the full list unchanged when no filters are set", () => {
    expect(filterProperties(properties, {})).toEqual(properties);
  });

  it("filters by type only", () => {
    expect(filterProperties(properties, { type: "lote" })).toEqual([lote]);
  });

  it("filters by region only", () => {
    expect(filterProperties(properties, { region: "guanacaste" })).toEqual([
      lote,
      midRangeFinca,
    ]);
  });

  it("filters by price range with only a min bound", () => {
    expect(
      filterProperties(properties, { priceRange: { min: 300000 } }),
    ).toEqual([finca]);
  });

  it("filters by price range with only a max bound", () => {
    expect(
      filterProperties(properties, { priceRange: { max: 200000 } }),
    ).toEqual([lote]);
  });

  it("filters by price range with both min and max bounds", () => {
    expect(
      filterProperties(properties, {
        priceRange: { min: 200000, max: 300000 },
      }),
    ).toEqual([midRangeFinca]);
  });

  it("filters by land size range", () => {
    expect(
      filterProperties(properties, { landSizeRange: { min: 6, max: 20 } }),
    ).toEqual([midRangeFinca]);
  });

  it("treats range bounds as inclusive", () => {
    expect(
      filterProperties(properties, { priceRange: { min: 400000, max: 400000 } }),
    ).toEqual([finca]);
    expect(
      filterProperties(properties, { landSizeRange: { min: 5, max: 5 } }),
    ).toEqual([lote]);
  });

  it("combines multiple active filters with AND", () => {
    expect(
      filterProperties(properties, {
        type: "finca",
        region: "guanacaste",
        priceRange: { max: 300000 },
      }),
    ).toEqual([midRangeFinca]);
  });

  it("returns an empty array when no property matches", () => {
    expect(
      filterProperties(properties, { type: "lote", region: "central-valley" }),
    ).toEqual([]);
  });

  it("returns an empty array when a range excludes every property", () => {
    expect(
      filterProperties(properties, { priceRange: { min: 1000000 } }),
    ).toEqual([]);
  });
});
