import { Col, Container, Row } from "react-bootstrap";
import { FaEnvelope, FaPhone, FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "../i18n";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer id="footer" className="bg-black text-light border-top border-secondary mt-5">
      <Container className="py-5">
        <Row className="g-4">
          <Col xs={12} md={6}>
            <h5 className="mb-4">{t("whyInvest")}</h5>
            <ul className="list-unstyled text-secondary">
              <li className="mb-2">• {t("tourism")}</li>
              <li className="mb-2">• {t("nature")}</li>
              <li className="mb-2">• {t("people")}</li>
              <li className="mb-2">• {t("opportunities")}</li>
            </ul>
          </Col>
          <Col xs={12} md={6}>
            <h5 className="mb-4">{t("contactUs")}</h5>
            <div className="d-flex align-items-center mb-3">
              <FaWhatsapp className="me-3 text-success" size={22} />
              <a
                href="https://wa.me/50663286941"
                className="text-light text-decoration-none"
              >
                WhatsApp: +506 6328 6941
              </a>
            </div>
            <div className="d-flex align-items-center mb-3">
              <FaPhone className="me-3 text-warning" size={20} />
              <a
                href="tel:+50663286941"
                className="text-light text-decoration-none"
              >
                {t("phone")}: +506 6328 6941 | +1 206 730 5157
              </a>
            </div>
            <div className="d-flex align-items-center">
              <FaEnvelope className="me-3 text-info" size={20} />
              <a
                href="mailto:beyondrealty@outlook.com"
                className="text-light text-decoration-none"
              >
                beyondrealtycr@outlook.com
              </a>
            </div>
          </Col>
        </Row>
        <Row className="mt-4 pt-4 border-top border-secondary">
          <Col className="text-center text-secondary small">
            © {new Date().getFullYear()} Beyond Realty Costa Rica. {t("allRightsReserved")}
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;