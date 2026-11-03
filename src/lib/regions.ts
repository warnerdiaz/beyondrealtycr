import type { Language } from "../i18n";
import type { Region } from "../types/Property";

/**
 * Tourist-region taxonomy reference. Single source of truth for EN/ES
 * display labels, reused by the card grid now and by the zone filter in a
 * later slice.
 */
export const REGION_LABELS: Record<Region, Record<Language, string>> = {
  guanacaste: {
    en: "Guanacaste",
    es: "Guanacaste",
  },
  "south-caribbean": {
    en: "South Caribbean",
    es: "Caribe Sur",
  },
  "central-pacific": {
    en: "Central Pacific",
    es: "Pacífico Central",
  },
  "south-pacific": {
    en: "South Pacific / Osa",
    es: "Pacífico Sur / Osa",
  },
  "central-valley": {
    en: "Central Valley",
    es: "Valle Central",
  },
  northern: {
    en: "Arenal / Northern Zone",
    es: "Arenal / Zona Norte",
  },
};

/** All region values, in display order, for building filter UIs. */
export const REGIONS: Region[] = [
  "guanacaste",
  "south-caribbean",
  "central-pacific",
  "south-pacific",
  "central-valley",
  "northern",
];

/** Returns the localized display label for a region. */
export function getRegionLabel(region: Region, language: Language): string {
  return REGION_LABELS[region][language];
}
