import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Lightbox from "../components/Lightbox";
import { properties } from "../data/properties";
import { useLanguage } from "../i18n";
import { formatLandSize, formatPrice } from "../lib/format";
import { getGalleryImages, getGalleryVideos, selectCoverMedia } from "../lib/media";
import { getRegionLabel } from "../lib/regions";

const PropertyDetails = () => {
  const { id } = useParams();
  const { language, t } = useLanguage();
  const property = properties.find((p) => p.id === id);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [videoOpened, setVideoOpened] = useState(false);

  const media = property?.media[language] ?? [];
  const galleryImages = getGalleryImages(media);
  const videos = getGalleryVideos(media);
  const cover = selectCoverMedia(media);
  const video = videos[0];

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

  // Thumbnails shown in the strip: all still images, in cover-first order.
  // The hero shows either the lightbox-selected image or the cover/first image.
  const heroImage =
    lightboxIndex !== null ? galleryImages[lightboxIndex] : galleryImages[0];

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

        {/* Media gallery */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() => setLightboxIndex(0)}
            aria-label={t("propertyGallery")}
            className="block aspect-[16/10] w-full overflow-hidden rounded-lg bg-surface-muted"
          >
            {heroImage && (
              <img
                src={heroImage.url}
                alt={translation.title}
                className="h-full w-full object-cover"
              />
            )}
          </button>

          {(galleryImages.length > 1 || video) && (
            <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
              {galleryImages.map((item, i) => (
                <button
                  key={item.url}
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  aria-label={`${t("galleryThumbAlt")} ${i + 1}`}
                  className="h-20 w-28 flex-shrink-0 overflow-hidden rounded-md border border-line"
                >
                  <img
                    src={item.url}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}

              {video && (
                <button
                  type="button"
                  onClick={() => setVideoOpened(true)}
                  aria-label={t("playVideo")}
                  className="relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-md border border-line"
                >
                  {cover && (
                    <img
                      src={cover.poster ?? cover.url}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  )}
                  <span className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-ink">
                      ▶
                    </span>
                  </span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Video player — only mounted with a src once the user opts in */}
        {video && videoOpened && (
          <div className="mb-8 aspect-video w-full overflow-hidden rounded-lg bg-black">
            <video
              src={video.url}
              controls
              autoPlay
              className="h-full w-full"
            >
              <track kind="captions" />
            </video>
          </div>
        )}

        {/* Price + title */}
        <h1 className="mb-1 text-3xl font-semibold">{translation.title}</h1>
        <p className="mb-4 text-muted">{translation.location}</p>
        <p className="mb-6 text-2xl font-semibold text-accent">
          {formatPrice(property.priceUsd)}
        </p>

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
        <div className="mb-4 max-w-2xl leading-relaxed whitespace-pre-line">
          {translation.description}
        </div>

        <Link
          to="/"
          className="mt-8 inline-block text-accent hover:text-accent-hover"
        >
          ← {t("returnListings")}
        </Link>
      </div>

      {lightboxIndex !== null && galleryImages.length > 0 && (
        <Lightbox
          images={galleryImages.map((item) => ({
            url: item.url,
            alt: translation.title,
          }))}
          index={lightboxIndex}
          onIndexChange={setLightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </main>
  );
};

export default PropertyDetails;
