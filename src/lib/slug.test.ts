import { describe, expect, it } from "vitest";
import type { Property } from "../types/Property";
import { findPropertyBySlug, propertySlug } from "./slug";

function makeProperty(overrides: Partial<Property> = {}): Property {
  return {
    id: "p1",
    type: "finca",
    priceUsd: 400000,
    landAcres: 37,
    region: "south-caribbean",
    province: "limon",
    media: { en: [], es: [] },
    translations: {
      en: { description: "", location: "", title: "Hillside Finca & Forest" },
      es: { description: "", location: "", title: "Finca y bosque" },
    },
    ...overrides,
  };
}

describe("propertySlug", () => {
  it("uses the explicit slug when present", () => {
    const property = makeProperty({ slug: "cahuita-finca-2-cabanas-bosque" });
    expect(propertySlug(property)).toBe("cahuita-finca-2-cabanas-bosque");
  });

  it("falls back to a slug derived from the English title", () => {
    const property = makeProperty();
    expect(propertySlug(property)).toBe("hillside-finca-forest");
  });

  it("derives from the English title regardless of active language", () => {
    const property = makeProperty();
    // Spanish title differs; the slug must stay stable off the English title.
    expect(propertySlug(property)).not.toContain("bosque");
  });
});

describe("findPropertyBySlug", () => {
  const properties = [
    makeProperty({ id: "p1", slug: "a-finca" }),
    makeProperty({
      id: "p2",
      slug: "b-lote",
      translations: {
        en: { description: "", location: "", title: "B" },
        es: { description: "", location: "", title: "B" },
      },
    }),
  ];

  it("finds a property by its explicit slug", () => {
    expect(findPropertyBySlug(properties, "b-lote")?.id).toBe("p2");
  });

  it("returns undefined for an unknown slug", () => {
    expect(findPropertyBySlug(properties, "missing")).toBeUndefined();
  });

  it("returns undefined for an undefined slug", () => {
    expect(findPropertyBySlug(properties, undefined)).toBeUndefined();
  });
});
