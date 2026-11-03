import { Link } from "react-router-dom";
import { useLanguage } from "../i18n";

const Header = () => {
  const logo = "/media/logo.svg";
  const { language, setLanguage, t } = useLanguage();

  const toggleBase =
    "rounded-md px-3 py-1 text-sm font-medium transition-colors";
  const activeToggle = "bg-white text-ink";
  const inactiveToggle =
    "border border-white/40 text-white hover:bg-white/10";

  return (
    <header className="sticky top-0 z-50 h-header w-full bg-ink text-white shadow-sm">
      <div className="mx-auto flex h-full w-full max-w-7xl items-center gap-4 px-4">
        <Link to="/" aria-label={t("home")} className="flex h-full items-center">
          <img
            src={logo}
            alt="Beyond Realty CR"
            className="h-3/5 w-auto object-contain"
          />
        </Link>
        <span className="flex-1 text-center text-xs font-medium tracking-[0.2em] sm:text-sm">
          {t("footerBrand")}
        </span>
        <div
          className="flex gap-2"
          role="group"
          aria-label={t("language")}
        >
          <button
            type="button"
            className={`${toggleBase} ${language === "en" ? activeToggle : inactiveToggle}`}
            aria-pressed={language === "en"}
            onClick={() => setLanguage("en")}
          >
            EN
          </button>
          <button
            type="button"
            className={`${toggleBase} ${language === "es" ? activeToggle : inactiveToggle}`}
            aria-pressed={language === "es"}
            onClick={() => setLanguage("es")}
          >
            ES
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
