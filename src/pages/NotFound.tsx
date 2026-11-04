import { Link } from "react-router-dom";
import { useLanguage } from "../i18n";

/**
 * Client-side 404 for unknown in-app routes. Static deep links that miss a
 * prerendered page are caught by the static `public/404.html` GitHub Pages
 * fallback; this handles navigations within the hydrated app.
 */
const NotFound = () => {
  const { t } = useLanguage();

  return (
    <main className="mx-auto max-w-4xl px-4 py-20 text-center">
      <h1 className="mb-4 text-2xl font-semibold">{t("pageNotFound")}</h1>
      <Link to="/" className="text-accent hover:text-accent-hover">
        {t("returnHome")}
      </Link>
    </main>
  );
};

export default NotFound;
