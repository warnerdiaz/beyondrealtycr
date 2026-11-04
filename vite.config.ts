import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
// Type-only import activates the `ssgOptions` augmentation on Vite's UserConfig.
import type {} from "vite-react-ssg";
import { SITE_URL } from "./src/config/site";
import { properties } from "./src/data/properties";
import { propertySlug } from "./src/lib/slug";

/** All concrete paths to prerender: the home page plus one per listing. */
function staticPaths(): string[] {
  return ["/", ...properties.map((p) => `/property/${propertySlug(p)}`)];
}

/** Writes a sitemap.xml covering every prerendered route into the output dir. */
async function writeSitemap(outDir: string): Promise<void> {
  const today = new Date().toISOString().slice(0, 10);
  const urls = staticPaths()
    .map(
      (path) =>
        `  <url><loc>${SITE_URL}${path}</loc><lastmod>${today}</lastmod></url>`,
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  await writeFile(join(outDir, "sitemap.xml"), xml, "utf8");
}

// https://vite.dev/config/
export default defineConfig({
  // Served from the apex custom domain beyondrealtycr.com, so assets live at root.
  base: "/",
  build: {
    outDir: "docs",
  },
  plugins: [react(), tailwindcss()],
  ssgOptions: {
    entry: "src/main.tsx",
    // Expand the dynamic /property/:slug route into one page per listing.
    includedRoutes: () => staticPaths(),
    onFinished: writeSitemap,
  },
});
