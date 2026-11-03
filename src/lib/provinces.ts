import type { Language } from "../i18n";
import type { Province } from "../types/Property";

/**
 * Official province taxonomy reference. Single source of truth for EN/ES
 * display labels. Independent of the tourist-region taxonomy in
 * src/lib/regions.ts — the region <-> province mapping is not 1:1.
 */
export const PROVINCE_LABELS: Record<Province, Record<Language, string>> = {
  "san-jose": {
    en: "San José",
    es: "San José",
  },
  alajuela: {
    en: "Alajuela",
    es: "Alajuela",
  },
  cartago: {
    en: "Cartago",
    es: "Cartago",
  },
  heredia: {
    en: "Heredia",
    es: "Heredia",
  },
  guanacaste: {
    en: "Guanacaste",
    es: "Guanacaste",
  },
  puntarenas: {
    en: "Puntarenas",
    es: "Puntarenas",
  },
  limon: {
    en: "Limón",
    es: "Limón",
  },
};

/** All province values, in canonical order, for building filter UIs. */
export const PROVINCES: Province[] = [
  "san-jose",
  "alajuela",
  "cartago",
  "heredia",
  "guanacaste",
  "puntarenas",
  "limon",
];

/** Returns the localized display label for a province. */
export function getProvinceLabel(
  province: Province,
  language: Language,
): string {
  return PROVINCE_LABELS[province][language];
}
