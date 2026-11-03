import { Link, useParams } from "react-router-dom";
import { properties } from "../data/properties";
import { useLanguage } from "../i18n";

// Minimal placeholder for the walking skeleton. The full Zillow-style detail
// page (gallery, specs, contact paths) is rebuilt in a later slice.
const PropertyDetails = () => {
  const { id } = useParams();
  const { language, t } = useLanguage();
  const property = properties.find((p) => p.id === id);

  if (!property) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h1 className="mb-4 text-2xl font-semibold">{t("notFound")}</h1>
        <Link to="/" className="text-accent hover:text-accent-hover">
          {t("returnListings")}
        </Link>
      </main>
    );
  }

  const translation = property.translations[language];

  return (
    <main className="min-h-[70vh] bg-surface text-ink">
      <div className="mx-auto w-full max-w-4xl px-4 py-16">
        <Link
          to="/"
          className="mb-6 inline-block text-accent hover:text-accent-hover"
        >
          ← {t("returnListings")}
        </Link>
        <h1 className="mb-2 text-3xl font-semibold">{translation.title}</h1>
        <p className="mb-4 text-muted">{translation.location}</p>
        <p className="mb-6 text-xl font-medium text-accent">{property.price}</p>
        <p className="max-w-2xl leading-relaxed">{translation.description}</p>
      </div>
    </main>
  );
};

export default PropertyDetails;
