import { Outlet } from "react-router-dom";
import { useLanguage } from "../i18n";
import ErrorBoundary from "./ErrorBoundary";
import Footer from "./Footer";
import Header from "./Header";
import LanguageProvider from "./LanguageProvider";
import ScrollToTop from "./ScrollToTop";
import WhatsAppFab from "./WhatsAppFab";

/**
 * App shell shared by every route: language context, sticky header, the
 * routed page (<Outlet/>), footer, and the floating WhatsApp lead button.
 * Rendered as the root route element by the SSG router (see src/App.tsx).
 */
function Shell() {
  const { t } = useLanguage();

  return (
    <>
      <ScrollToTop />
      <Header />
      <ErrorBoundary
        errorMessage={t("errorMessage")}
        errorTitle={t("errorTitle")}
        tryAgainLabel={t("tryAgain")}
      >
        <Outlet />
      </ErrorBoundary>
      <Footer />
      <WhatsAppFab />
    </>
  );
}

const Layout = () => (
  <LanguageProvider>
    <Shell />
  </LanguageProvider>
);

export default Layout;
