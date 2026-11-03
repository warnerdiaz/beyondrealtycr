import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  // Served from the apex custom domain beyondrealtycr.com, so assets live at root.
  base: "/",
  build: {
    outDir: "docs",
  },
  plugins: [react(), tailwindcss()],
});
