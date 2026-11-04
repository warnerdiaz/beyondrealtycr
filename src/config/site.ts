/**
 * Site-level constants used for SEO/prerendering: canonical origin and the
 * default social-share metadata. The app is prerendered in English (the
 * primary US audience), so these defaults are English; the client-side
 * EN/ES toggle still switches on-page copy after hydration.
 */

/** Canonical production origin (no trailing slash). Used for canonical + OG URLs. */
export const SITE_URL = "https://beyondrealtycr.com";

/** Default share image (absolute URL) for pages without a property-specific cover. */
export const DEFAULT_OG_IMAGE = `${SITE_URL}/media/hero-poster.jpg`;

/** Default <title> / social title for the home page and fallbacks. */
export const SITE_TITLE = "Beyond Realty CR — Fincas & Lotes in Costa Rica";

/** Default meta description for the home page and fallbacks. */
export const SITE_DESCRIPTION =
  "Curated fincas and lotes for sale in Costa Rica. Browse exceptional land and acreage with video tours, then reach us directly on WhatsApp.";

/** Builds an absolute URL from a root-relative path (e.g. "/property/x"). */
export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
