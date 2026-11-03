# PRD — Zillow-style redesign (Phase 1 MVP)

**Status:** ready-for-agent
**Branch:** `develop_jordan`
**Related:** `CLAUDE.md` (project guide + Phase 2 SEO backlog)

## Problem Statement

We sell Costa Rican **fincas** and **lotes** to a primarily US ("gringo") audience and
earn a commission when a property sells. Our current site is a dark, single-property
showcase with hardcoded data and a generic Bootstrap look. Costa Rican real-estate sites
generally look dated and untrustworthy to foreign buyers. We need a site that feels as
polished and familiar as **Zillow** — the format US buyers already trust — so that
visitors browse listings confidently and reach out about properties, while still looking
like *our* minimalist brand rather than a clone.

## Solution

Rebuild the site's presentation layer into a curated, Zillow-inspired experience for a
small catalog (5–30 listings), kept fully static on GitHub Pages:

- A **card grid** of listings and a **detail page** that mirror Zillow's format
  (prominent price, key-facts strip, large photo/video gallery, description, contact).
- A **filter bar** to narrow by property type, price range, region, and land size.
- A **hybrid palette**: our dark cinematic video hero (brand) over **light, airy**
  listing and detail content (Zillow readability), with a restrained **green/teal**
  natural accent.
- Strong per-property lead capture via **WhatsApp click-to-chat** and an **email form**.
- **Bilingual EN/ES**, defaulting to English.

Listings stay as structured data in the repo, edited by a developer and deployed via the
existing `docs/` → GitHub Pages flow. SEO/prerender work is explicitly deferred to Phase 2.

## User Stories

1. As a US buyer, I want the site to feel like Zillow, so that I immediately trust it and know how to navigate it.
2. As a US buyer, I want to see a grid of property cards with photo, price, location, and key facts, so that I can scan listings quickly.
3. As a US buyer, I want a prominent price in USD on each card and detail page, so that I understand cost without currency conversion.
4. As a US buyer, I want land size shown in acres (with hectares in parentheses), so that the measurements are familiar to me.
5. As a US buyer, I want to filter listings by property type (finca vs lote), so that I only see the kind of property I'm interested in.
6. As a US buyer, I want to filter by price range, so that I only see properties within my budget.
7. As a US buyer, I want to filter by Costa Rican tourist region (e.g. Guanacaste, South Caribbean), so that I can focus on areas I know and like.
8. As a US buyer, I want to filter by land size, so that I can find properties of the scale I need.
9. As a US buyer, I want to combine multiple filters at once, so that I can narrow results precisely.
10. As a US buyer, I want to clear all filters easily, so that I can start a new search.
11. As a US buyer, I want to see how many results match my current filters, so that I know whether to broaden or narrow them.
12. As a US buyer, I want a clear empty state when no properties match, so that I'm not confused by a blank page.
13. As a US buyer, I want to click a property card and land on a detailed page, so that I can learn everything about that property.
14. As a US buyer, I want a large photo and video gallery on the detail page, so that I can see the property thoroughly.
15. As a US buyer, I want to open gallery images in a lightbox, so that I can view them full-screen.
16. As a US buyer, I want to watch the property tour video, so that I get an immersive sense of the land.
17. As a US buyer, I want a key-facts strip (type, price, land size, building size, beds/baths when relevant), so that I can grasp the essentials at a glance.
18. As a US buyer, I want a full description of the property, so that I understand its story and potential.
19. As a US buyer viewing a lote, I don't want to see irrelevant fields like bedrooms, so that the page stays clean and honest.
20. As a US buyer viewing a finca with cabins, I want to see building size and amenities, so that I understand what's already built.
21. As a US buyer, I want a prominent "Contact" area on every detail page, so that reaching out is effortless.
22. As a US buyer, I want a WhatsApp button that opens a chat prefilled with the property I'm asking about, so that I can inquire in one tap.
23. As a US buyer, I want an email contact form on the detail page, so that I can inquire without leaving the site.
24. As a US buyer, I want the contact form to confirm my message was sent, so that I know the inquiry went through.
25. As a US buyer, I want the contact form to reference which property I'm asking about, so that the agent has context.
26. As a Spanish-speaking visitor, I want to switch the site to Spanish, so that I can read it comfortably.
27. As a visitor, I want the site to default to English, so that the primary (US) audience sees English first.
28. As a Spanish-speaking visitor, I want property titles, descriptions, and the tour video in Spanish when I choose Spanish, so that the whole experience is localized.
29. As a visitor on mobile, I want the grid, filters, and detail page to work well on a small screen, so that I can browse on my phone.
30. As a visitor, I want a dark cinematic hero with a background video, so that the site feels premium and distinctive.
31. As a visitor, I want a clear call-to-action in the hero to view listings, so that I know where to start.
32. As a visitor, I want fast page loads with videos loaded only when I open them, so that browsing isn't sluggish.
33. As a property owner (seller), I want a "Sell with us" section, so that I can list my finca or lote through the company.
34. As the site operator, I want to add a new property by editing structured data in the repo, so that listings are easy to maintain without a CMS.
35. As the site operator, I want each property's optional fields to be omittable, so that fincas and lotes only show relevant data.
36. As the site operator, I want the design to accommodate future house/commercial listings, so that we can expand without a rewrite.
37. As the site operator, I want the WhatsApp number and contact email configured in one place, so that updating them is trivial.
38. As the site operator, I want assets to load correctly on our custom domain, so that the live site isn't broken.
39. As a developer, I want property formatting and filtering as pure, tested functions, so that listing logic is reliable and refactor-safe.

## Implementation Decisions

**Styling migration.** Remove `react-bootstrap` and `bootstrap`; adopt **Tailwind CSS**.
Rebuild components as custom, Tailwind-styled UI. Keep the existing React + TypeScript +
Vite + React Router + i18n scaffolding.

**Palette & tokens.** Hybrid theme: dark cinematic hero (reuse the existing hero video),
light/airy listing and detail surfaces. Monochrome base (white/near-black/grays) plus a
single **green/teal** accent for CTAs, links, and highlighted prices. Encode as Tailwind
theme tokens.

**Data model (deep module boundary).** Replace free-text numbers with a structured,
filterable `Property` schema:
- `type: "finca" | "lote"` (extensible to `"casa" | "comercial"`).
- `priceUsd: number` (numeric; formatted for display).
- `landAcres: number` (numeric; hectares derived for display).
- `region` as an enum of **tourist regions**: Guanacaste, South Caribbean, Central Pacific,
  South Pacific/Osa, Central Valley, Northern.
- `media: Record<"en" | "es", PropertyMedia[]>` and
  `translations: Record<"en" | "es", { title; location; description }>` (keep existing shape).
- Optional, render-only-when-present: `buildingSize`, `bedrooms`, `bathrooms`, `jacuzzi`,
  and finca/lote features (water, electricity, forest, zoning, access, view).

**Formatting module (deep, pure).** `formatPrice(priceUsd)` → `"$400,000"`;
`formatLandSize(landAcres)` → `"37 acres (15 ha)"` (ha = acres × 0.4047, rounded);
`slugify(title)` for stable detail-page identifiers. No React, no I/O.

**Filtering module (deep, pure).** `filterProperties(properties, filters)` where
`filters = { type?, priceRange?, region?, landSizeRange? }`. Returns the matching subset.
Pure and framework-agnostic; the UI only supplies filter state and renders the result.
Combining filters is logical AND; unset filters are ignored.

**Region taxonomy (reference module).** Single source of truth mapping region enum values
to EN/ES display labels, consumed by both the filter bar and detail page.

**Lead capture.**
- `buildWhatsAppUrl(phone, property, lang)` (deep, pure): produces a `wa.me` URL with a
  URL-encoded, localized, property-specific prefilled message.
- Email form via a **static-friendly service (Web3Forms or Formspree)**; the form includes
  a hidden field identifying the property and shows a success confirmation state.
- WhatsApp number and contact email live in one config module.

**Routing.** Keep current **hash-based routing** for Phase 1 (clean URLs + prerender are
Phase 2, per `CLAUDE.md`). Structure routes so the Phase 2 migration is low-friction.

**Deploy fix.** Set `vite.config.ts` `base` to **`/`** (site is served from the apex custom
domain `beyondrealtycr.com`; the current `/beyondrealtycr/` base mis-points assets). Keep
build `outDir: docs/` and the GitHub Pages flow.

**Pages & components.** Pages: `Home` (dark hero + FilterBar + light card grid) and
`PropertyDetails`. Components: Header (with EN/ES + nav), Footer, Hero, PropertyCard,
FilterBar, PropertyGallery (lightbox + lazy video), KeyFacts strip, ContactForm,
WhatsAppButton, SellWithUs. Components stay presentational and delegate logic to the pure
modules above.

## Testing Decisions

Good tests here assert **external behavior through public interfaces**, not implementation
details — given inputs produce the expected formatted strings / filtered sets / URLs,
independent of how the functions are written internally.

A **test runner must be added**: adopt **Vitest** (native fit for Vite/TS). No prior test
setup exists in the repo, so this establishes the pattern for future tests.

Modules to test (pure, no DOM):
1. **Formatting** — `formatPrice`, `formatLandSize` (acres→ha conversion and rounding,
   singular/plural, edge values), `slugify` (spaces, accents, collisions).
2. **Filtering** — `filterProperties` across single filters, combined filters (AND),
   boundary price/size ranges, unset filters (no-op), and the no-match case.
3. **WhatsApp link** — `buildWhatsAppUrl` (correct `wa.me` format, message encoding,
   language selection, property reference embedded).

UI component tests are **out of scope for this PRD** (deferred; logic lives in the tested
pure modules).

## Out of Scope

- Interactive map with property pins (a static map on the detail page may come later).
- Saved homes / favorites / user accounts / authentication.
- CMS, backend, database, or admin panel — listings remain repo-edited static data.
- House and commercial listings (model accommodates them; not built or displayed now).
- **Phase 2 SEO**: clean URLs, per-property prerendered OG/meta tags, schema.org JSON-LD,
  `sitemap.xml`/`robots.txt`, canonical/hreflang — all documented in `CLAUDE.md`.
- UI/component automated tests.
- CRC pricing or metric-first land units.

## Further Notes

- Keep the existing per-language media (EN/ES tour videos and covers) and lazy-load videos
  only when opened, preserving current performance behavior.
- The design must look deliberately *ours* (monochrome + green/teal), not a Zillow clone;
  Zillow informs **navigation and format**, not colors.
- Routes should be structured to make the Phase 2 move off hash routing straightforward.
