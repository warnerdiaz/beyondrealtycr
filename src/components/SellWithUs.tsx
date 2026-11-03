import { useLanguage } from "../i18n";

/**
 * CTA section inviting property owners to list with us. Minimal/on-brand
 * placeholder for this slice — a real lead-capture form (Web3Forms) lands
 * in a later slice; for now a mailto CTA keeps the path to contact working.
 */
const SellWithUs = () => {
  const { t } = useLanguage();

  return (
    <section className="bg-ink text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 text-center">
        <h2 className="mb-4 text-2xl font-semibold sm:text-3xl">
          {t("sellWithUsTitle")}
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-white/80">
          {t("sellWithUsDescription")}
        </p>
        <a
          href="mailto:beyondrealtycr@outlook.com?subject=I%20want%20to%20sell%20my%20property"
          className="inline-block rounded-md bg-accent px-6 py-3 text-base font-medium text-accent-contrast transition-colors hover:bg-accent-hover"
        >
          {t("sellWithUsCta")}
        </a>
      </div>
    </section>
  );
};

export default SellWithUs;
