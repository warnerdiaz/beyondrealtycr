import { Button, Col, Container, Row } from "react-bootstrap";
import { useLanguage } from "../i18n";
import styles from "./SellWithUs.module.css";

const SellWithUs = () => {
  const { t } = useLanguage();

  return (
    <section className={`py-5 ${styles.section}`}>
      <Container>
        <div
          className={`p-4 p-md-5 rounded-4 border border-white border-opacity-10 ${styles.card}`}
        >
          <Row className="align-items-center">
            <Col md={8}>
              <h2 className="mb-2">{t("sellTitle")}</h2>
              <p className="mb-0 text-secondary">
                {t("sellDescription")}
              </p>
            </Col>
            <Col md={4} className="text-md-end mt-3 mt-md-0">
              <Button
                variant="outline-secondary"
                size="lg"
                onClick={() => document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" })}
              >
                {t("contactUs")}
              </Button>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default SellWithUs;
