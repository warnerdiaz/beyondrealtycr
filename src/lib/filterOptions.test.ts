import { describe, expect, it } from "vitest";
import type { Property } from "../types/Property";
import { getFilterOptions } from "./filterOptions";

function makeProperty(overrides: Partial<Property>): Property {
  return {
    id: "p1",
    type: "finca",
    priceUsd: 400000,
    landAcres: 37,
    region: "south-caribbean",
    province: "limon",
    media: { en: [], es: [] },
    translations: {
      en: { description: "", location: "", title: "" },
      es: { description: "", location: "", title: "" },
    },
    ...overrides,
  };
}

describe("getFilterOptions", () => {
  it("returns empty option lists for an empty catalog", () => {
    expect(getFilterOptions([])).toEqual({
      types: [],
      provinces: [],
      regions: [],
    });
  });

  it("returns the single listing's values for a single-listing catalog", () => {
    const property = makeProperty({
      type: "lote",
      province: "guanacaste",
      region: "guanacaste",
    });
    expect(getFilterOptions([property])).toEqual({
      types: ["lote"],
      provinces: ["guanacaste"],
      regions: ["guanacaste"],
    });
  });

  it("collapses duplicate values across listings", () => {
    const properties = [
      makeProperty({
        id: "a",
        type: "finca",
        province: "limon",
        region: "south-caribbean",
      }),
      makeProperty({
        id: "b",
        type: "finca",
        province: "limon",
        region: "south-caribbean",
      }),
      makeProperty({
        id: "c",
        type: "finca",
        province: "limon",
        region: "south-caribbean",
      }),
    ];
    expect(getFilterOptions(properties)).toEqual({
      types: ["finca"],
      provinces: ["limon"],
      regions: ["south-caribbean"],
    });
  });

  it("orders present values canonically regardless of catalog order", () => {
    const properties = [
      makeProperty({
        id: "a",
        type: "lote",
        province: "limon",
        region: "northern",
      }),
      makeProperty({
        id: "b",
        type: "finca",
        province: "san-jose",
        region: "guanacaste",
      }),
      makeProperty({
        id: "c",
        type: "lote",
        province: "guanacaste",
        region: "south-caribbean",
      }),
    ];
    expect(getFilterOptions(properties)).toEqual({
      types: ["finca", "lote"],
      provinces: ["san-jose", "guanacaste", "limon"],
      regions: ["guanacaste", "south-caribbean", "northern"],
    });
  });
});
