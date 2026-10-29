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

Build the site and commit the generated `docs/` directory to the `main` branch:

```sh
npm run build
git add docs
git commit -m "Build site for GitHub Pages"
git push origin main
```

In the repository's **Settings → Pages**, choose **Deploy from a branch**, select
`main` and the `/docs` folder, then save. For this project repository, the
asset base is fixed to `/beyondrealtycr/`. If the repository name changes, update
the `base` value in `vite.config.ts`. For a user or organization site
(`owner.github.io`), use `/`.

The app uses hash-based routes so property detail pages also work when opened
or refreshed on GitHub Pages. Local development continues to use Vite's root
URL.

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
