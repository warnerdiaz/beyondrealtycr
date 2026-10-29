import { Button, Col, Container, Row } from "react-bootstrap";
import PropertyCard from "../components/PropertyCard";
import SellWithUs from "../components/SellWithUs";
import { properties } from "../data/properties";
import { useLanguage } from "../i18n";
import styles from "./Home.module.css";

function Home() {
  const { t } = useLanguage();
  const heroVideo = "media/hero.mp4";

  return (
    <div className="bg-dark text-light">
      <section
        className={`d-flex align-items-center justify-content-center text-center position-relative ${styles.hero}`}
      >
        <video
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          className={styles.heroVideo}
        />
        <div className={styles.heroOverlay} />
        <Container className={`position-relative text-white ${styles.heroContent}`}>
          <h1 className="display-4 fw-semibold mb-4">
            {t("heroTitle")}
          </h1>
          <p className="lead mb-4 text-white-50">{t("description")}</p>
          <Button
            variant="outline-secondary"
            size="lg"
            onClick={() => document.getElementById("listings")?.scrollIntoView({ behavior: "smooth" })}
          >
            {t("viewListings")}
          </Button>
        </Container>
      </section>
      <Row id="listings" className={`g-4 p-4 ${styles.listings}`}>
        {properties.map((property) => (
          <Col md={4} key={property.id}>
            <PropertyCard property={property} />
          </Col>
        ))}
      </Row>
      <SellWithUs />
    </div>
  );
}

export default Home;
