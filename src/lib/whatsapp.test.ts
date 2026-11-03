import { describe, expect, it } from "vitest";
import type { Property } from "../types/Property";
import { buildWhatsAppUrl } from "./whatsapp";

const property: Property = {
  id: "p1",
  type: "finca",
  priceUsd: 400000,
  landAcres: 37,
  region: "south-caribbean",
  media: { en: [], es: [] },
  translations: {
    en: {
      description: "desc",
      location: "Cahuita, Limón",
      title: "Property with 2 Cabins & Private Forest",
    },
    es: {
      description: "desc",
      location: "Cahuita, Limón",
      title: "Propiedad con 2 cabañas y bosque privado",
    },
  },
};

describe("buildWhatsAppUrl", () => {
  it("produces a wa.me URL with the digits-only phone number", () => {
    const url = buildWhatsAppUrl("+506 6000-0000", property, "en");
    expect(url.startsWith("https://wa.me/50660000000?text=")).toBe(true);
  });

  it("strips all non-digit characters from the phone number", () => {
    const url = buildWhatsAppUrl("(506) 6000 0000", property, "en");
    expect(url).toContain("https://wa.me/50660000000?text=");
  });

  it("embeds the active-language property title in the message", () => {
    const url = buildWhatsAppUrl("50660000000", property, "en");
    const decoded = decodeURIComponent(url.split("?text=")[1]);
    expect(decoded).toContain("Property with 2 Cabins & Private Forest");
  });

  it("builds an English message referencing title and location", () => {
    const url = buildWhatsAppUrl("50660000000", property, "en");
    const decoded = decodeURIComponent(url.split("?text=")[1]);
    expect(decoded).toBe(
      "Hi, I'm interested in the property: Property with 2 Cabins & Private Forest (Cahuita, Limón).",
    );
  });

  it("builds a Spanish message referencing title and location", () => {
    const url = buildWhatsAppUrl("50660000000", property, "es");
    const decoded = decodeURIComponent(url.split("?text=")[1]);
    expect(decoded).toBe(
      "Hola, me interesa la propiedad: Propiedad con 2 cabañas y bosque privado (Cahuita, Limón).",
    );
  });

  it("URL-encodes special characters in the message", () => {
    const url = buildWhatsAppUrl("50660000000", property, "en");
    const query = url.split("?text=")[1];
    expect(query).not.toContain(" ");
    expect(query).not.toContain("&");
  });
});
