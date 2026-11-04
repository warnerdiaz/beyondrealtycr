# Beyond Realty CR — Project Guide

Real-estate lead-generation site for selling Costa Rican **fincas and lotes** to a
primarily **US ("gringo") audience**. Business model: we source listings and earn a
commission on sales, so every listing must have strong contact paths.

Design north star: the **navigation and listing format of Zillow**, adapted to a small
curated catalog, while keeping our **minimalist, monochrome brand**.

**Status:** Phase 1 (visual redesign MVP) and Phase 2 (SEO/prerender + gallery, trust
sections, WhatsApp FAB, price/acre, region locator) are both **implemented and deployed**
to `dev` / production (`beyondrealtycr.com`) — see "SSG / prerendering" below. Remaining
nice-to-haves are in the backlog near the end.

---

## Agent workflow (how to run work here)

**Orchestrate, delegate implementation.** The expensive top-level model (Opus) should
act primarily as an **orchestrator**: plan, decide, and review — then hand the actual
implementation to **subagents running cheaper models** (e.g. the `general-purpose` or
`claude` agent on Sonnet/Haiku) via the Agent tool. Reserve Opus-level direct editing for
orchestration, tricky judgement calls, and final review. Spawn subagents for self-contained
implementation chunks and have them report back; keep the orchestrator's own tool use lean.

---

## Stack

- **React 19** + **TypeScript** + **Vite 7**.
- **Tailwind CSS v4** via `@tailwindcss/vite` (CSS-first `@theme` tokens; NO `tailwind.config.js`).
- **react-router-dom v6** (data-router `RouteRecord` array in `src/App.tsx`), **BrowserRouter**
  with **clean URLs** (`/property/<slug>`), prerendered by **vite-react-ssg**.
  > NOTE: pinned to **RR v6** on purpose — `vite-react-ssg@0.9.2` imports `react-router-dom/server.js`,
  > a subpath RR **v7 removed**, so the SSG server render breaks on v7. Do not bump to v7 until
  > vite-react-ssg supports it. (The app's RR usage is identical across v6/v7.)
- **Vitest** for unit tests (node environment).
- Static site, **prerendered to static HTML per route** and deployed to **GitHub Pages** from the
  `dev` branch's `/docs` folder.
- No backend, CMS, or database. Listings are data in the repo.

### Scripts
- `npm run dev` — local dev server (`vite-react-ssg dev`; the SSG entry only exports
  `createRoot`, so plain `vite` would not mount — use this script).
- `npm run build` — `tsc -b && vite-react-ssg build` → prerenders one HTML file per route
  into `docs/` (plus `sitemap.xml`; see below).
- `npm test` — `vitest run` (currently **70 tests** passing).
- `npm run lint` — ESLint (uses the **React Compiler** rules — avoid unnecessary `useMemo`/
  manual memoization; derive values directly in render).

### Environment note
Node 22+ is recommended. On Node 20.17 Vite prints a version warning but the build still
succeeds (exit 0). That warning is expected and harmless.

---

## Project structure

```
src/
  main.tsx                  app entry; imports styles/globals.css
  App.tsx                   routes: "/" → Home, "/property/:id" → PropertyDetails
  i18n.ts                   useLanguage() hook + EN/ES string table (default EN)
  styles/globals.css        Tailwind entry (@import "tailwindcss") + @theme tokens
  types/Property.ts         Property data model (see below)
  data/properties.ts        the listings (hand-edited)
  config/contact.ts         WhatsApp number / Web3Forms key / contact email (env-driven)
  lib/                      PURE, TESTED modules (no React, no I/O)
    format.ts  (+test)      formatPrice, formatLandSize (acres→ha), slugify
    regions.ts              REGIONS, REGION_LABELS, getRegionLabel(region, lang)
    provinces.ts            PROVINCES, PROVINCE_LABELS, getProvinceLabel(province, lang)
    media.ts   (+test)      selectCoverMedia, selectTourVideo
    whatsapp.ts (+test)     buildWhatsAppUrl(phone, property, lang)
    filter.ts  (+test)      filterProperties(properties, filters); PropertyFilters type
    filterOptions.ts (+test) getFilterOptions(properties) → present type/province/region values
  components/
    Header.tsx              sticky nav, logo, EN/ES toggle
    Footer.tsx              light footer
    PropertyCard.tsx        Zillow-style card (links to /property/:id)
    FilterBar.tsx           controlled type/province/region/price/land-size filters
    ContactForm.tsx         Web3Forms email form with idle/submitting/success/error states
    SellWithUs.tsx          CTA band for property owners (mailto)
    LanguageProvider.tsx    i18n context provider
    ScrollToTop.tsx, ErrorBoundary.tsx
  pages/
    Home.tsx                dark video hero → light #listings (FilterBar + card grid)
    PropertyDetails.tsx     autoplaying looping tour video + key facts + contact section
```

**Architecture rule:** business logic lives in the pure `src/lib/*` modules (deep modules,
unit-tested through their public interface). Components stay presentational and delegate to
those modules. When adding logic, prefer a pure function in `lib/` with a co-located
`*.test.ts` over logic embedded in a component.

---

## Data model (`src/types/Property.ts`)

```ts
type PropertyType = "finca" | "lote";                 // extensible: | "casa" | "comercial"
type Region = "guanacaste" | "south-caribbean" | "central-pacific"
            | "south-pacific" | "central-valley" | "northern";
type Province = "san-jose" | "alajuela" | "cartago" | "heredia"
               | "guanacaste" | "puntarenas" | "limon";

interface PropertyFeatures {
  water?: boolean; electricity?: boolean; forest?: boolean;
  zoning?: string; access?: string; view?: string;
}
interface Property {
  id: string;
  type: PropertyType;
  priceUsd: number;          // numeric; displayed via formatPrice → "$400,000"
  landAcres: number;         // numeric; displayed via formatLandSize → "37 acres (15 ha)"
  region: Region;
  province: Province;
  media: Record<"en" | "es", PropertyMedia[]>;        // item: {type: "image"|"video"|"cover", url, poster?}
  translations: Record<"en" | "es", { title; location; description }>;
  buildingSize?: string; bedrooms?: number; bathrooms?: number; jacuzzi?: number;
  features?: PropertyFeatures;
}
```

Rules:
- Price is **USD**; land size is **acres** with **hectares** derived (`acres * 0.4047`) and
  shown in parentheses. Store numbers, never pre-formatted strings.
- Optional fields render **only when present** — a `lote` shows no bedrooms/baths; a `finca`
  with construction shows building size/amenities; absent `features` rows are omitted.
- Dual location taxonomy, both **hand-assigned** (neither is derived from the other, since
  the mapping isn't 1:1): `region` (tourist region, chosen so a US buyer recognizes the
  area — labels in `src/lib/regions.ts`) and `province` (official Costa Rican province —
  labels in `src/lib/provinces.ts`). Both are filter dimensions; `province` is filter-only
  and is never rendered as its own chip. The town/province name also lives as free text in
  `translations[lang].location`, displayed as "location · region" on the card.

### Adding a new listing
Edit `src/data/properties.ts`: add a `Property` with a unique `id`, numeric `priceUsd` /
`landAcres`, a `region` AND a `province` (hand-assign both independently), EN+ES
`translations`, and per-language `media`. Put media files under
`public/media/properties/<slug>/<lang>/`. Then rebuild & deploy (see below).

---

## Design system (tokens in `src/styles/globals.css` `@theme`)

Hybrid palette: a **dark cinematic video hero** (brand) over otherwise **light, airy**
content (Zillow readability). Monochrome base + one restrained **green/teal** accent. Do NOT
introduce new ad-hoc colors — reuse these tokens:

- Monochrome base: `bg-ink` (#121212), `text-surface`/`bg-surface` (#fff),
  `bg-surface-muted` (#f5f5f4), `text-muted`, `border-line`.
- Accent (green/teal): `bg-accent` (#0f766e), `text-accent`, `hover:bg-accent-hover` (#115e59),
  `accent-contrast` (#fff).
- Layout: `--spacing-header` (4rem) → `h-header`; listings anchor uses `scroll-mt-header`.

The logo (`public/media/logo.svg`) is monochrome. The look should read as *ours* (monochrome
+ green/teal), not a Zillow clone — Zillow informs navigation/format, not colors.

---

## Internationalization

- Bilingual **EN/ES, default EN**. All visible strings go through `t(key)` from
  `useLanguage()`; add new keys to **both** the `en` and `es` objects in `src/i18n.ts`.
- There is no interpolation helper; compose strings inline (e.g. singular/plural keys, or
  `` `${count} ${label}` ``), matching existing patterns.
- Media is per-language (`media.en` / `media.es`) — title, description, and the tour video
  all switch with the active language.

---

## Lead capture

- **WhatsApp**: `buildWhatsAppUrl(phone, property, lang)` builds a `wa.me` link with a
  localized, property-specific prefilled message. Rendered as a prominent accent button on
  the detail page.
- **Email form**: `ContactForm` POSTs to **Web3Forms** (`https://api.web3forms.com/submit`)
  with hidden `property_id`/`property_title`. States: idle → submitting → success / error,
  plus a graceful **not-configured** state (directs to WhatsApp) when no key is set.
- Config is centralized in `src/config/contact.ts`, read from Vite env vars with placeholder
  fallbacks so the app always builds.

### Required production env vars (build-time — see `.env.example`)
Because the site is static, these are baked in **at build time**. After setting real values
you must **rebuild `docs/` and redeploy**.
- `VITE_WHATSAPP_PHONE` — digits only, international format (e.g. `50660000000`).
- `VITE_WEB3FORMS_KEY` — access key from web3forms.com.
- `VITE_CONTACT_EMAIL` — contact email (default placeholder: `beyondrealtycr@outlook.com`).

Never commit real secrets; keep them in `.env.local` (gitignored) or the build environment.

---

## Deployment (GitHub Pages)

- **Source:** branch `dev`, folder `/docs`. `vite.config.ts` sets `base: "/"` and
  `build.outDir: "docs"`.
- **Custom domain:** `beyondrealtycr.com`. `public/CNAME` holds the domain so every build
  copies it into `docs/CNAME` — do NOT delete it, or builds will drop the custom domain.
  `public/.nojekyll` is likewise required.
- **Deploy flow:**
  ```sh
  npm run build          # prerenders docs/ (per-route HTML + sitemap.xml; CNAME + .nojekyll)
  git add -A && git commit -m "chore(deploy): build site"
  git push origin dev
  ```
- **DNS (GoDaddy):** apex `@` → GitHub Pages A records
  `185.199.108.153 / .109.153 / .110.153 / .111.153`; `www` CNAME → `warnerdiaz.github.io`.
  Leave NS/TXT/SOA untouched.
- **HTTPS:** enable "Enforce HTTPS" in GitHub → Settings → Pages once the certificate is
  provisioned (after DNS propagation).

---

## Branches

- `dev` — **default + production** (GitHub Pages publishing source).
- `last-version` — backup snapshot of the pre-redesign site (do not delete).
- `develop_jordan` — the redesign integration branch used during Phase 1.
- `feature/phase2-seo-ux` — Phase 2 work (SSG/SEO + gallery/trust/FAB/UX). **Merged to `dev`
  and deployed to production 2026-11-04.**
- `backup/pre-phase2-seo-ux` + tag `rollback/pre-phase2-seo-2026-11-04` — snapshot of
  production **before** the Phase 2 deploy (commit `9a40881`), pushed to origin. To roll back:
  `git checkout dev && git reset --hard backup/pre-phase2-seo-ux && git push origin dev --force-with-lease`.
- Feature branches used conventional commits and were merged via stacked PRs.

### Workflow conventions
- Conventional Commits. Co-author trailer: `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.
- Keep logic in tested `lib/` modules; components presentational.
- Do **not** commit build churn piecemeal — `docs/` is only rebuilt as a deliberate deploy
  commit on `dev`.

---

## Product decisions (reference)

| Topic | Decision |
|---|---|
| Inventory scale | Small curated catalog (**5–30** listings). No mass map-search. |
| Data management | **Static**, repo-edited, GitHub Pages. No CMS/backend. |
| Zillow features replicated | Detail page, card grid, filter bar. **No interactive map.** |
| Property types | Fincas + Lotes (model extensible to casas/commercial). |
| Palette | Dark hero + light content; monochrome + green/teal accent. |
| Currency / units | USD price + acres (ha secondary). Numeric for filtering. |
| Location taxonomy | Dual taxonomy, both hand-assigned per listing (not derived from each other): the official **province** (7, `src/lib/provinces.ts`) and the tourist **region** (6, `src/lib/regions.ts`). Both are filter dimensions; the free-text location string still shows "location · region". |
| Languages | Bilingual EN/ES, default EN. |
| Traffic strategy | Google + link sharing → SEO matters (Phase 2). |

### Out of scope (for now)
- Interactive map with pins (a static map on the detail page may come later).
- Saved homes / favorites / user accounts / authentication.
- CMS / backend / database / admin panel.
- Houses & commercial listings (model accommodates them; not built/displayed yet).

---

## SSG / prerendering (`src/main.tsx`, `src/App.tsx`, `vite.config.ts`)

`vite-react-ssg` prerenders one static HTML file per route at build time and hydrates the
same routes on the client.
- **Entry** (`src/main.tsx`): exports `createRoot = ViteReactSSG({ routes })`.
- **Routes** (`src/App.tsx`): a `RouteRecord[]` data table. Root route renders `Layout`
  (providers + Header/Outlet/Footer/WhatsApp FAB). `/property/:slug` carries a
  `getStaticPaths`; `vite.config.ts` `ssgOptions.includedRoutes` expands it to one page per
  listing. The catch-all renders `NotFound`.
- **URL identity**: `/property/<slug>`, where slug comes from `src/lib/slug.ts`
  (`propertySlug` = explicit `Property.slug` else `slugify(title.en)`; `findPropertyBySlug`
  resolves the route param). Media URLs in `src/data/properties.ts` are **root-absolute**
  (`/media/...`) so they resolve from any route path.
- **Per-page SEO**: pages set head tags via `<Head>` from `vite-react-ssg` (react-helmet):
  `<title>`, description, `canonical`, OpenGraph/Twitter (property `og:image` = cover.jpg,
  absolute via `src/config/site.ts`), and a `RealEstateListing` JSON-LD on the detail page.
  `index.html` holds ONLY constants (`og:site_name`) — never duplicate `<Head>`-managed tags
  there, or they appear twice in the prerendered HTML.
- **Build-generated**: `sitemap.xml` (written by `ssgOptions.onFinished`). `public/robots.txt`
  and `public/404.html` (branded GitHub Pages fallback) are static.
- **Prerendered in English only** (primary US audience); the EN/ES toggle still switches
  on-page copy client-side. Per-language URLs + hreflang + per-language OG images are deferred.

### Phase 2 UX additions (on this branch)
- **Gallery** (`src/components/Gallery.tsx` + `Lightbox.tsx`): detail-page stage + thumbnail
  strip + fullscreen image lightbox; video-first; ordering/visibility logic is pure in
  `src/lib/media.ts` (`galleryItems`, `galleryImages`, `shouldShowThumbStrip`). Degrades to
  the inline video alone for today's video-only listings.
- **Trust sections** (`WhyCostaRica.tsx`, `HowItWorks.tsx`) on the Home page
  (hero → listings → Why CR → How it works → SellWithUs), plus a compact process note on the
  detail page. The footer's old "why invest" block moved into `WhyCostaRica`.
- **WhatsApp FAB** (`WhatsAppFab.tsx`): global teal floating button, generic localized
  greeting (`buildGenericWhatsAppUrl`); property-specific CTAs stay on the detail page.
- **Hero poster**: `public/media/hero-poster.jpg` (an `ffmpeg` frame of `hero.mp4`); also the
  default home `og:image`.
- **Price per acre**: `formatPricePerAcre` in `src/lib/format.ts`, shown on the card + detail
  key-facts.
- **Region locator** (`RegionLocator.tsx`): a pin motif + region/province labels (no exact
  lot). A hand-drawn Costa Rica silhouette was tried and dropped — it didn't read as the
  country; drop in a real GeoJSON-derived CR SVG later if a precise map is wanted.

### Phase 2 backlog — remaining
- **Per-language routes** (`/en/*`, `/es/*`) + **hreflang** + per-language OG images — deferred
  until ES traffic justifies the extra routing (would move language from state to URL-derived).

See the full PRD in `specs/zillow-style-redesign.prd.md`.
