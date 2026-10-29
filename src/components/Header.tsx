import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLanguage } from "../i18n";
import styles from "./Header.module.css";

const Header = () => {
  const logo = "media/logo.svg";
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" aria-label={t("home")}>
          <img src={logo} alt="Beyond Realty CR" className={styles.logo} />
        </Link>
        <span className={styles.brand}>{t("footerBrand")}</span>
        <div className={styles.languagePicker} role="group" aria-label={t("language")}>
          <Button
            variant={language === "en" ? "light" : "outline-light"}
            size="sm"
            aria-pressed={language === "en"}
            onClick={() => setLanguage("en")}
          >
            EN
          </Button>
          <Button
            variant={language === "es" ? "light" : "outline-light"}
            size="sm"
            aria-pressed={language === "es"}
            onClick={() => setLanguage("es")}
          >
            ES
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
