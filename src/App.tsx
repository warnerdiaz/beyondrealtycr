import type { RouteRecord } from "vite-react-ssg";
import Layout from "./components/Layout";
import { properties } from "./data/properties";
import { propertySlug } from "./lib/slug";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import PropertyDetails from "./pages/PropertyDetails";

/**
 * Data-router route table consumed by vite-react-ssg (see src/main.tsx). The
 * root route renders the shared layout; `/property/:slug` is prerendered into
 * one static page per listing via getStaticPaths. The catch-all handles
 * in-app navigations to unknown routes; static deep-link misses fall back to
 * public/404.html on GitHub Pages.
 */
export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "property/:slug",
        element: <PropertyDetails />,
        getStaticPaths: () =>
          properties.map((property) => `/property/${propertySlug(property)}`),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
];
