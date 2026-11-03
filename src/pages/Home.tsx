import PropertyCard from "../components/PropertyCard";
import SellWithUs from "../components/SellWithUs";
import { properties } from "../data/properties";
import { useLanguage } from "../i18n";

function Home() {
  const { t } = useLanguage();
  const heroVideo = "/media/hero.mp4";

  const scrollToListings = () =>
    document
      .getElementById("listings")
      ?.scrollIntoView({ behavior: "smooth" });

  return (
    <div>
      {/* Dark cinematic video hero (brand). */}
      <section className="relative flex min-h-[82vh] items-center justify-center overflow-hidden text-center">
        <video
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-white">
          <h1 className="mb-6 text-4xl font-semibold sm:text-5xl">
            {t("heroTitle")}
          </h1>
          <p className="mb-8 text-lg text-white/80">{t("description")}</p>
          <button
            type="button"
            onClick={scrollToListings}
            className="rounded-md bg-accent px-6 py-3 text-base font-medium text-accent-contrast transition-colors hover:bg-accent-hover"
          >
            {t("viewListings")}
          </button>
        </div>
      </section>

      {/* Light, airy content section (Zillow readability). */}
      <section
        id="listings"
        className="scroll-mt-header bg-surface text-ink"
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-16">
          <h2 className="mb-4 text-2xl font-semibold sm:text-3xl">
            {t("viewListings")}
          </h2>
          {properties.length === 0 ? (
            <p className="max-w-2xl text-muted">{t("listingsPlaceholder")}</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>

      <SellWithUs />
    </div>
  );
}

export default Home;
