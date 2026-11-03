import { useLanguage } from "../i18n";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer
      id="footer"
      className="border-t border-line bg-surface-muted text-ink"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-lg font-semibold">{t("whyInvest")}</h2>
            <ul className="space-y-2 text-muted">
              <li>• {t("tourism")}</li>
              <li>• {t("nature")}</li>
              <li>• {t("people")}</li>
              <li>• {t("opportunities")}</li>
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-lg font-semibold">{t("contactUs")}</h2>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://wa.me/50663286941"
                  className="text-accent hover:text-accent-hover"
                >
                  WhatsApp: +506 6328 6941
                </a>
              </li>
              <li className="text-muted">
                {t("phone")}: +506 6328 6941 | +1 206 730 5157
              </li>
              <li>
                <a
                  href="mailto:beyondrealtycr@outlook.com"
                  className="text-accent hover:text-accent-hover"
                >
                  beyondrealtycr@outlook.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-line pt-6 text-center text-sm text-muted">
          © {new Date().getFullYear()} Beyond Realty Costa Rica.{" "}
          {t("allRightsReserved")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
