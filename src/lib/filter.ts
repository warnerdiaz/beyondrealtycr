import type { Property, PropertyType, Region } from "../types/Property";

/**
 * Pure, dependency-free property filtering. No React, no I/O — safe to unit
 * test directly and reuse from the filter bar / Home page.
 *
 * All filter fields are optional. An unset field is a no-op (it does not
 * exclude any properties). Set fields combine with logical AND. Range
 * bounds (`min`/`max`) are each independently optional and inclusive.
 */

export interface NumberRange {
  min?: number;
  max?: number;
}

export interface PropertyFilters {
  type?: PropertyType;
  region?: Region;
  priceRange?: NumberRange;
  landSizeRange?: NumberRange;
}

function withinRange(value: number, range?: NumberRange): boolean {
  if (!range) {
    return true;
  }
  if (range.min !== undefined && value < range.min) {
    return false;
  }
  if (range.max !== undefined && value > range.max) {
    return false;
  }
  return true;
}

/**
 * Returns the subset of `properties` matching every set filter in
 * `filters`. Unset filters are no-ops; set filters combine with AND.
 */
export function filterProperties(
  properties: Property[],
  filters: PropertyFilters,
): Property[] {
  return properties.filter((property) => {
    if (filters.type !== undefined && property.type !== filters.type) {
      return false;
    }
    if (filters.region !== undefined && property.region !== filters.region) {
      return false;
    }
    if (!withinRange(property.priceUsd, filters.priceRange)) {
      return false;
    }
    if (!withinRange(property.landAcres, filters.landSizeRange)) {
      return false;
    }
    return true;
  });
}
