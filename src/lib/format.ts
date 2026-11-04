/**
 * Pure, dependency-free formatting helpers for property data. No React, no
 * I/O — safe to unit test directly and reuse from cards, detail pages, and
 * future filter UI.
 */

const ACRES_TO_HECTARES = 0.4047;

/**
 * Formats a USD price with thousands separators and no decimals, e.g.
 * 400000 -> "$400,000".
 */
export function formatPrice(priceUsd: number): string {
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(priceUsd);
}

/**
 * Formats a USD price-per-acre figure with thousands separators and no
 * decimals, e.g. priceUsd=400000, landAcres=37 -> "$10,811/acre". Guards the
 * degenerate case (zero, negative, or non-finite land size) by returning an
 * empty string so callers can conditionally render the figure.
 */
export function formatPricePerAcre(priceUsd: number, landAcres: number): string {
  if (!Number.isFinite(landAcres) || landAcres <= 0) {
    return "";
  }
  const pricePerAcre = Math.round(priceUsd / landAcres);
  return `${new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(pricePerAcre)}/acre`;
}

/**
 * Formats a land size in acres with the hectare equivalent shown secondary,
 * e.g. 37 -> "37 acres (15 ha)". Handles the singular "1 acre" case.
 */
export function formatLandSize(landAcres: number): string {
  const hectares = Math.round(landAcres * ACRES_TO_HECTARES);
  const acresLabel = landAcres === 1 ? "acre" : "acres";
  return `${landAcres} ${acresLabel} (${hectares} ha)`;
}

/**
 * Converts a title into a URL-safe slug: lowercase, diacritics stripped,
 * non-alphanumerics collapsed to single hyphens, trimmed of leading/
 * trailing hyphens. e.g. "Cañón  Grande!" -> "canon-grande".
 */
export function slugify(title: string): string {
  return title
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
