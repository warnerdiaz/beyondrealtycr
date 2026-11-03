import type { Property, Province, PropertyType, Region } from "../types/Property";
import { PROVINCES } from "./provinces";
import { REGIONS } from "./regions";

/** Canonical display order for property types, mirroring the filter UI. */
const PROPERTY_TYPES: PropertyType[] = ["finca", "lote"];

export interface FilterOptions {
  types: PropertyType[];
  provinces: Province[];
  regions: Region[];
}

/**
 * Pure, dependency-free computation of the distinct type/province/region
 * values actually present in a catalog, each returned in canonical order
 * (not catalog order). Used to populate filter-bar dropdowns with only the
 * values that matter for the current listings.
 */
export function getFilterOptions(properties: Property[]): FilterOptions {
  const presentTypes = new Set(properties.map((property) => property.type));
  const presentProvinces = new Set(
    properties.map((property) => property.province),
  );
  const presentRegions = new Set(properties.map((property) => property.region));

  return {
    types: PROPERTY_TYPES.filter((type) => presentTypes.has(type)),
    provinces: PROVINCES.filter((province) => presentProvinces.has(province)),
    regions: REGIONS.filter((region) => presentRegions.has(region)),
  };
}
