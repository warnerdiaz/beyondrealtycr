# Beyond Realty Costa Rica

Real-estate property showcase built with React, TypeScript, and Vite.

## Requirements

- Node.js 22 or newer
- npm

## Local development

```sh
npm ci
npm run dev
```

## Production checks

```sh
npm run lint
npm run build
npm run preview
```

## GitHub Pages

The `main` branch is deployed automatically by
`.github/workflows/deploy.yml`. Before enabling the workflow:

1. Replace `/REPOSITORY_NAME/` in the workflow's `VITE_BASE_PATH` value
   with the repository name, keeping the leading and trailing `/`. For a
   user or organization site (`owner.github.io`), use `/`.
2. In the repository's **Settings → Pages**, set the publishing source to
   **GitHub Actions**.
3. Push to `main` to deploy, or run the workflow manually from the Actions tab.

The app uses hash-based routes so property detail pages also work when opened
or refreshed on GitHub Pages. For local builds and previews, the base path
defaults to `/`.

## Languages

The site supports English and Spanish. It loads in English by default; use the
EN/ES buttons in the header to change the language for the current visit.

## Branches

- `main`: production releases and GitHub Pages deployment.
- `dev`: ongoing development; merge tested changes into `main` to publish.

## Media

Static media is stored in `public/media/` and served from the configured Vite
base path. Each property's localized media is stored in
`public/media/properties/<property>/<language>/`. Property videos are loaded
only when opened in the gallery.
