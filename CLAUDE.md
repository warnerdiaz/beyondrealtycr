# Beyond Realty CR — Project Guide

Real-estate lead-generation site for selling Costa Rican **fincas and lotes** to a
primarily **US ("gringo") audience**. Business model: we source listings and earn a
commission on sales, so every listing must have strong contact paths.

Design north star: the **navigation and listing format of Zillow**, adapted to a small
curated catalog, while keeping our **minimalist, monochrome brand**.

---

## Product decisions (agreed)

| Topic | Decision |
|---|---|
| Inventory scale | Small curated catalog (**5–30** listings). No mass map-search. |
| Data management | **Static** — listings live in the repo (dev-edited), deployed to GitHub Pages. No CMS/backend. |
| Zillow features to replicate | **Detail page**, **card grid**, **filter/search bar**. **No interactive map.** |
| Property types | **Fincas** and **Lotes** (model must allow adding **Casas** later without rework). |
| Styling | **Tailwind CSS** (remove `react-bootstrap`). Custom, premium look. |
| Palette | **Hybrid**: dark cinematic video hero (brand) + **light, airy content** (listings/detail) like Zillow. |
| Accent color | **Natural green/teal** (forest/ocean, ties to eco/fincas, avoids looking like a Zillow clone). Base stays monochrome. |
| Contact / leads | **WhatsApp click-to-chat** (prefilled per property) **+ email form** via a static-friendly service (Web3Forms/Formspree). |
| Currency / units | **USD** price + **acres** land size (hectares shown secondary, in parentheses). Stored numerically for filtering. |
| Location taxonomy | **Tourist regions** for the zone filter: Guanacaste, South Caribbean, Central Pacific, South Pacific/Osa, Central Valley, Arenal/Northern. Town/province is free-text for display. |
| Languages | **Bilingual EN/ES, default EN.** Reuse existing i18n. Per-language media kept. |
| Traffic strategy | **Google + link sharing** → SEO & rich social previews matter (see Phase 2). |
| Build order | **Phase 1 = full visual redesign (MVP).** SEO/prerender = **Phase 2** (documented below). |

## Explicitly out of scope (for now)
- Interactive map with pins (only a static map on the detail page may be considered later).
- Saved homes / favorites / user accounts.
- CMS / backend / database / admin panel.
- Houses & commercial listings (model should accommodate them later, but not built now).

---

## Data model (target)

Replace free-text numbers with structured, filterable fields. Target shape for
`src/types/Property.ts` / `src/data/properties.ts`:

- `id: string`
- `type: "finca" | "lote"` (extensible: `| "casa" | "comercial"`)
- `priceUsd: number` — display formatted as `$400,000`
- `landAcres: number` — display `37 acres (15 ha)`; derive ha (`acres * 0.4047`)
- `region: "guanacaste" | "south-caribbean" | "central-pacific" | "south-pacific" | "central-valley" | "northern"`
- `media: Record<"en" | "es", PropertyMedia[]>` (keep existing per-language media)
- `translations: Record<"en" | "es", { title; location; description }>`
- Optional (shown only when present): `buildingSize?`, `bedrooms?`, `bathrooms?`, `jacuzzi?`,
  plus finca/lote features (e.g. `water`, `electricity`, `forest`, `zoning`, `access`, `view`).

Filters to support: **type**, **price range**, **region**, **land size**.

---

## Stack & conventions

- React 19 + TypeScript + Vite. Keep router + i18n scaffolding; swap react-bootstrap → **Tailwind**.
- Build output: `docs/` (GitHub Pages). Branch currently published: `dev`. Active dev branch: `develop_jordan`.
- Custom domain: **beyondrealtycr.com** (see `docs/CNAME`).

### ⚠️ Known fix to apply
`vite.config.ts` sets `base: "/beyondrealtycr/"` for build, but the site is served from the
**apex custom domain** `beyondrealtycr.com`. Base should be **`/`**. Correct this during the
rebuild (the `/beyondrealtycr/` base mis-points asset URLs under a custom domain).

---

## Phase 2 — SEO & shareability (DEFERRED, do after MVP)

Goal: be findable on Google and show photo+title when a property link is pasted into
WhatsApp/Facebook. This is the lead driver for the US audience. Requires moving off the
current **hash routing** (`#/...`), which blocks per-page SEO and social previews on a
static SPA.

Backlog:
1. **Clean URLs** — switch from hash routes to real paths (e.g. `/property/<slug>`).
   On GitHub Pages this needs the SPA `404.html` redirect trick.
2. **Per-property prerendering** — generate static HTML per route with correct
   `<title>`, `<meta description>`, and **OpenGraph/Twitter** tags (image = property cover).
   Options to evaluate: `vite-react-ssg` (preferred, stays in React+Vite) or `react-snap`.
3. **Structured data** — schema.org `RealEstateListing`/`Product` JSON-LD per property for
   rich results.
4. **sitemap.xml** + **robots.txt**, generated at build.
5. **Canonical + hreflang** tags for EN/ES.
6. Per-language, per-property OG images (cover photo) so shared links preview well.

Keep MVP routes structured so this migration is low-friction.
