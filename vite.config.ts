import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: command === "build" ? process.env.VITE_BASE_PATH || "/beyondrealtycr/" : "/",
  build: {
    outDir: "docs",
  },
  plugins: [react()],
}));
