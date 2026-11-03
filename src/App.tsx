import { lazy, Suspense } from "react";
import { HashRouter, Link, Route, Routes } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LanguageProvider from "./components/LanguageProvider";
import ScrollToTop from "./components/ScrollToTop";
import { useLanguage } from "./i18n";

const Home = lazy(() => import("./pages/Home"));
const PropertyDetails = lazy(() => import("./pages/PropertyDetails"));

function AppContent() {
  const { t } = useLanguage();

  return (
    <HashRouter>
      <ScrollToTop />
      <Header />
      <ErrorBoundary
        errorMessage={t("errorMessage")}
        errorTitle={t("errorTitle")}
        tryAgainLabel={t("tryAgain")}
      >
        <Suspense
          fallback={
            <div className="flex min-h-[90vh] items-center justify-center bg-surface text-ink">
              {t("loading")}
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route
              path="*"
              element={
                <main className="mx-auto max-w-4xl px-4 py-20 text-center">
                  <h1 className="mb-4 text-2xl font-semibold">
                    {t("pageNotFound")}
                  </h1>
                  <Link to="/" className="text-accent hover:text-accent-hover">
                    {t("returnHome")}
                  </Link>
                </main>
              }
            />
          </Routes>
        </Suspense>
      </ErrorBoundary>
      <Footer />
    </HashRouter>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
