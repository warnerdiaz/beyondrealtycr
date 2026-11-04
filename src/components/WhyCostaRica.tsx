import { useLanguage } from "../i18n";

/**
 * "Why Costa Rica" section — the canonical home for the whyInvest/tourism/
 * nature/people/opportunities i18n keys (moved out of the footer), as a
 * clean, minimal 4-point grid between the listings and the trust band.
 */
const WhyCostaRica = () => {
  const { t } = useLanguage();

  const points = [t("tourism"), t("nature"), t("people"), t("opportunities")];

  return (
    <section className="bg-surface-muted text-ink">
      <div className="mx-auto w-full max-w-7xl px-4 py-16">
        <h2 className="mb-8 text-center text-2xl font-semibold sm:text-3xl">
          {t("whyInvest")}
        </h2>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((point) => (
            <li
              key={point}
              className="rounded-lg border border-line bg-surface p-6 text-center text-muted"
            >
              {point}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default WhyCostaRica;
