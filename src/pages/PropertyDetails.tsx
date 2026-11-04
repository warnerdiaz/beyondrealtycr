import { Link, useParams } from "react-router-dom";
import { Head } from "vite-react-ssg";
import ContactForm from "../components/ContactForm";
import Gallery from "../components/Gallery";
import RegionLocator from "../components/RegionLocator";
import { WHATSAPP_PHONE } from "../config/contact";
import { absoluteUrl } from "../config/site";
import { properties } from "../data/properties";
import { useLanguage } from "../i18n";
import { formatLandSize, formatPrice, formatPricePerAcre } from "../lib/format";
import { selectCoverMedia } from "../lib/media";
import { getRegionLabel } from "../lib/regions";
import { findPropertyBySlug, propertySlug } from "../lib/slug";
import { buildWhatsAppUrl } from "../lib/whatsapp";

const PropertyDetails = () => {
  const { slug } = useParams();
  const { language, t } = useLanguage();
  const property = findPropertyBySlug(properties, slug);

  const media = property?.media[language] ?? [];
  const cover = selectCoverMedia(media);

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

  const typeLabel =
    property.type === "finca" ? t("propertyTypeFinca") : t("propertyTypeLote");
  const regionLabel = getRegionLabel(property.region, language);
  const pricePerAcre = formatPricePerAcre(property.priceUsd, property.landAcres);

  // SEO/social metadata. Prerendered in English (the default language), so
  // the crawler-visible tags use the English translation; the client toggle
  // updates them after hydration.
  const canonical = absoluteUrl(`/property/${propertySlug(property)}`);
  const ogImage = cover ? absoluteUrl(cover.poster ?? cover.url) : undefined;
  const pageTitle = `${translation.title} — Beyond Realty CR`;
  const metaDescription =
    translation.description.length > 160
      ? `${translation.description.slice(0, 157).trimEnd()}…`
      : translation.description;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: translation.title,
    description: translation.description,
    url: canonical,
    ...(ogImage ? { image: ogImage } : {}),
    offers: {
      "@type": "Offer",
      price: property.priceUsd,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: translation.location,
      addressCountry: "CR",
    },
  };

  const features = property.features;
  const featureRows: { label: string; value: string }[] = [];
  if (features?.water) featureRows.push({ label: t("featureWater"), value: "✓" });
  if (features?.electricity)
    featureRows.push({ label: t("featureElectricity"), value: "✓" });
  if (features?.forest) featureRows.push({ label: t("featureForest"), value: "✓" });
  if (features?.zoning)
    featureRows.push({ label: t("featureZoning"), value: features.zoning });
  if (features?.access)
    featureRows.push({ label: t("featureAccess"), value: features.access });
  if (features?.view) featureRows.push({ label: t("featureView"), value: features.view });

  return (
    <main className="min-h-[70vh] bg-surface text-ink">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={translation.title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonical} />
        {ogImage && <meta property="og:image" content={ogImage} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={translation.title} />
        <meta name="twitter:description" content={metaDescription} />
        {ogImage && <meta name="twitter:image" content={ogImage} />}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>
      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:py-12">
        <Link
          to="/"
          className="mb-6 inline-block text-accent hover:text-accent-hover"
        >
          ← {t("returnListings")}
        </Link>

        {/* Media gallery — tour video (if any) first, then browsable photos.
            The video autoplays on loop (muted) so visitors immediately see
            it is a video, with native controls to unmute, pause, scrub, and
            go fullscreen. The cover is only ever a poster/thumbnail source.
            When there's only a video (no photos), this renders just the
            inline video with no thumbnail strip. */}
        <div className="mb-8">
          <Gallery media={media} title={translation.title} />
        </div>

        {/* Price + title */}
        <h1 className="mb-1 text-3xl font-semibold">{translation.title}</h1>
        <p className="mb-4 text-muted">{translation.location}</p>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-2xl font-semibold text-accent">
            {formatPrice(property.priceUsd)}
          </p>
          <a
            href={buildWhatsAppUrl(WHATSAPP_PHONE, property, language)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-md bg-accent px-6 py-3 text-base font-medium text-accent-contrast transition-colors hover:bg-accent-hover"
          >
            {t("whatsAppCta")}
          </a>
        </div>

        {/* Key facts strip */}
        <dl className="mb-8 grid grid-cols-2 gap-4 rounded-lg border border-line bg-surface-muted p-4 sm:grid-cols-4">
          <div>
            <dt className="text-xs uppercase tracking-wide text-muted">
              {t("propertyType")}
            </dt>
            <dd className="text-base font-medium">{typeLabel}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-muted">
              {t("landSize")}
            </dt>
            <dd className="text-base font-medium">
              {formatLandSize(property.landAcres)}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-muted">
              {t("region")}
            </dt>
            <dd className="text-base font-medium">{regionLabel}</dd>
          </div>
          {pricePerAcre !== "" && (
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted">
                {t("pricePerAcre")}
              </dt>
              <dd className="text-base font-medium">{pricePerAcre}</dd>
            </div>
          )}
          {property.buildingSize !== undefined && (
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted">
                {t("building")}
              </dt>
              <dd className="text-base font-medium">{property.buildingSize}</dd>
            </div>
          )}
          {property.bedrooms !== undefined && (
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted">
                {t("bedrooms")}
              </dt>
              <dd className="text-base font-medium">{property.bedrooms}</dd>
            </div>
          )}
          {property.bathrooms !== undefined && (
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted">
                {t("bathrooms")}
              </dt>
              <dd className="text-base font-medium">{property.bathrooms}</dd>
            </div>
          )}
          {property.jacuzzi !== undefined && (
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted">
                {t("jacuzzi")}
              </dt>
              <dd className="text-base font-medium">{property.jacuzzi}</dd>
            </div>
          )}
        </dl>

        {/* Where this is — stylized region locator (approximate, not the lot). */}
        <RegionLocator region={property.region} province={property.province} />

        {/* Features */}
        {featureRows.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-3 text-lg font-semibold">
              {t("propertyFeatures")}
            </h2>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {featureRows.map((row) => (
                <li
                  key={row.label}
                  className="flex items-center justify-between rounded-md border border-line px-3 py-2 text-sm"
                >
                  <span className="text-muted">{row.label}</span>
                  <span className="font-medium">{row.value}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Description */}
        <div className="mb-8 max-w-2xl leading-relaxed whitespace-pre-line">
          {translation.description}
        </div>

        {/* Contact / lead capture */}
        <section className="mb-8 max-w-2xl rounded-lg border border-line bg-surface-muted p-6">
          <h2 className="mb-2 text-lg font-semibold">
            {t("contactSectionTitle")}
          </h2>
          <p className="mb-4 text-sm text-muted">
            {t("contactSectionDescription")}
          </p>
          <a
            href={buildWhatsAppUrl(WHATSAPP_PHONE, property, language)}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-6 inline-block rounded-md bg-accent px-6 py-3 text-base font-medium text-accent-contrast transition-colors hover:bg-accent-hover"
          >
            {t("whatsAppCta")}
          </a>
          <ContactForm property={property} />

          {/* Compact process reassurance — echoes the full "How it works"
              section on the home page without repeating its bulk. Honest
              process description only, no fabricated guarantees. */}
          <div className="mt-6 border-t border-line pt-4">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted">
              {t("howItWorksDetailNote")}
            </p>
            <ol className="flex flex-col gap-2 text-sm text-muted sm:flex-row sm:gap-4">
              {[t("howStep1Title"), t("howStep2Title"), t("howStep3Title")].map(
                (step, index) => (
                  <li key={step} className="flex items-center gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-contrast">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ),
              )}
            </ol>
          </div>
        </section>

        <Link
          to="/"
          className="mt-8 inline-block text-accent hover:text-accent-hover"
        >
          ← {t("returnListings")}
        </Link>
      </div>
    </main>
  );
};

export default PropertyDetails;
