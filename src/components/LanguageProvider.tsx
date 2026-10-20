import { useEffect, useState, type ReactNode } from "react";
import {
  getTranslation,
  LanguageContext,
  type Language,
} from "../i18n";

interface Props {
  children: ReactNode;
}

const LanguageProvider = ({ children }: Props) => {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: (key) => getTranslation(language, key),
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
