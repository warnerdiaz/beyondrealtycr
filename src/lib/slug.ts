import type { Property } from "../types/Property";
import { slugify } from "./format";

/**
 * Pure helpers mapping properties to/from their URL slug. No React, no I/O —
 * unit-tested directly and reused by the card link, the detail route, and
 * the SSG path generator.
 *
 * The slug is the stable, SEO-facing identity in the URL (`/property/<slug>`).
 * A `Property` may carry an explicit, hand-assigned `slug` (preferred, so the
 * URL stays stable even if the title is edited); when absent we derive one
 * from the English title as a fallback.
 */

/** Returns the URL slug for a property: its explicit `slug`, else `slugify(title.en)`. */
export function propertySlug(property: Property): string {
  return property.slug ?? slugify(property.translations.en.title);
}

/** Finds a property by its URL slug, or undefined when none matches. */
export function findPropertyBySlug(
  properties: Property[],
  slug: string | undefined,
): Property | undefined {
  if (!slug) {
    return undefined;
  }
  return properties.find((property) => propertySlug(property) === slug);
}
