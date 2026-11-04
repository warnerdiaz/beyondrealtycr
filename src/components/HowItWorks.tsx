import { useLanguage } from "../i18n";

/**
 * "How it works" trust band — 3 honest steps describing our process
 * (curate/vet, you reach out, we guide the purchase). No fabricated
 * guarantees, history, or testimonials; just a plain description of what
 * happens when you contact us.
 */
const HowItWorks = () => {
  const { t } = useLanguage();

  const steps = [
    { title: t("howStep1Title"), body: t("howStep1Body") },
    { title: t("howStep2Title"), body: t("howStep2Body") },
    { title: t("howStep3Title"), body: t("howStep3Body") },
  ];

  return (
    <section className="bg-surface text-ink">
      <div className="mx-auto w-full max-w-7xl px-4 py-16">
        <h2 className="mb-8 text-center text-2xl font-semibold sm:text-3xl">
          {t("howItWorksTitle")}
        </h2>
        <ol className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="text-center">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-base font-semibold text-accent-contrast">
                {index + 1}
              </div>
              <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
              <p className="text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default HowItWorks;
