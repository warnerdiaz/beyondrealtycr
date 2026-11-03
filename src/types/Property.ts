export interface PropertyMedia {
  type: "image" | "video" | "cover";
  poster?: string;
  url: string;
}

export interface PropertyTranslation {
  description: string;
  location: string;
  title: string;
}

/**
 * Property category. Extensible union — later slices may add
 * "casa" | "comercial" without reworking the model.
 */
export type PropertyType = "finca" | "lote";

/**
 * Tourist-region taxonomy used for the zone filter (see src/lib/regions.ts
 * for display labels). Town/province stays free-text inside translations.
 */
export type Region =
  | "guanacaste"
  | "south-caribbean"
  | "central-pacific"
  | "south-pacific"
  | "central-valley"
  | "northern";

/**
 * Official Costa Rican province taxonomy used for the province filter (see
 * src/lib/provinces.ts for display labels). Independent of `Region` — the
 * region <-> province mapping is not 1:1, so this is hand-assigned per
 * listing, not derived.
 */
export type Province =
  | "san-jose"
  | "alajuela"
  | "cartago"
  | "heredia"
  | "guanacaste"
  | "puntarenas"
  | "limon";

/**
 * Finca/lote feature flags. Optional and render-only-when-present on the
 * UI — keep this flat and simple rather than overlapping with bedrooms
 * /bathrooms, which apply to any built structure on the land.
 */
export interface PropertyFeatures {
  water?: boolean;
  electricity?: boolean;
  forest?: boolean;
  zoning?: string;
  access?: string;
  view?: string;
}

export interface Property {
  id: string;
  type: PropertyType;
  priceUsd: number;
  landAcres: number;
  region: Region;
  province: Province;
  media: Record<"en" | "es", PropertyMedia[]>;
  translations: Record<"en" | "es", PropertyTranslation>;
  buildingSize?: string;
  bedrooms?: number;
  bathrooms?: number;
  jacuzzi?: number;
  features?: PropertyFeatures;
}
