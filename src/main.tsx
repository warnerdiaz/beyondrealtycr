import { ViteReactSSG } from "vite-react-ssg";
import { routes } from "./App";
import "./styles/globals.css";

/**
 * SSG + client entry. vite-react-ssg builds a static HTML file per route at
 * build time and hydrates the same routes on the client. `createRoot` is the
 * named export it looks for.
 */
export const createRoot = ViteReactSSG({ routes });
