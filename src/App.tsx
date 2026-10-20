import { lazy, Suspense } from "react";
import { Container } from "react-bootstrap";
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
            <div
              className="d-flex justify-content-center align-items-center bg-dark text-light"
              style={{ minHeight: "90vh" }}
            >
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
                <Container className="py-5 text-center text-light">
                  <h1>{t("pageNotFound")}</h1>
                  <Link to="/">{t("returnHome")}</Link>
                </Container>
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
