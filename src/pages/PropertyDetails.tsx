import { Link, useParams } from "react-router-dom";
import ContactForm from "../components/ContactForm";
import { WHATSAPP_PHONE } from "../config/contact";
import { properties } from "../data/properties";
import { useLanguage } from "../i18n";
import { formatLandSize, formatPrice } from "../lib/format";
import { selectCoverMedia, selectTourVideo } from "../lib/media";
import { getRegionLabel } from "../lib/regions";
import { buildWhatsAppUrl } from "../lib/whatsapp";

const PropertyDetails = () => {
  const { id } = useParams();
  const { language, t } = useLanguage();
  const property = properties.find((p) => p.id === id);

  const media = property?.media[language] ?? [];
  const cover = selectCoverMedia(media);
  const video = selectTourVideo(media);

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
  const posterUrl = cover?.poster ?? cover?.url;

  const typeLabel =
    property.type === "finca" ? t("propertyTypeFinca") : t("propertyTypeLote");
  const regionLabel = getRegionLabel(property.region, language);

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
      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:py-12">
        <Link
          to="/"
          className="mb-6 inline-block text-accent hover:text-accent-hover"
        >
          ← {t("returnListings")}
        </Link>

        {/* Media — the tour video autoplays on loop (muted) so visitors
            immediately see it is a video, with native controls to unmute,
            pause, scrub, and go fullscreen. The cover is only the poster.
            Falls back to the cover still when a listing has no video. */}
        <div className="mb-8">
          {video ? (
            <video
              src={video.url}
              poster={posterUrl}
              autoPlay
              muted
              loop
              playsInline
              controls
              aria-label={translation.title}
              className="aspect-video w-full rounded-lg bg-black object-contain"
            >
              <track kind="captions" />
            </video>
          ) : (
            cover && (
              <img
                src={cover.poster ?? cover.url}
                alt={translation.title}
                className="aspect-[16/10] w-full rounded-lg bg-surface-muted object-cover"
              />
            )
          )}
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
