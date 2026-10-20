import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import PropertyGallery from "../components/PropertyGallery";
import { properties } from "../data/properties";
import { useLanguage } from "../i18n";

const PropertyDetails = () => {
  const { id } = useParams();
  const { language, t } = useLanguage();
  const property = properties.find((p) => p.id === id);

  if (!property) {
    return (
      <Container className="py-5 text-light">
        <h1>{t("notFound")}</h1>
        <Link to="/">{t("returnListings")}</Link>
      </Container>
    );
  }

  return (
    <main className="bg-dark text-light min-vh-100">
      <Container className="py-5">
        <Row className="g-4">
          <Col xs={12}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title className="mb-2">
                  {property.translations[language].title}
                </Card.Title>
                <Card.Subtitle className="mb-3 text-muted">
                  {property.translations[language].location}
                </Card.Subtitle>
                <h4 className="text-primary mb-3">{property.price}</h4>
                <Card.Text>{property.translations[language].description}</Card.Text>
                <ListGroup variant="flush" className="mt-3">
                  {property.bathrooms != null && (
                    <ListGroup.Item>
                      🚿 {t("bathrooms")}: {property.bathrooms}
                    </ListGroup.Item>
                  )}
                  {property.bedrooms != null && (
                    <ListGroup.Item>
                      🛏 {t("bedrooms")}: {property.bedrooms}
                    </ListGroup.Item>
                  )}
                  {property.buildingSize && (
                    <ListGroup.Item>
                      🏡 {t("building")}: {property.buildingSize}
                    </ListGroup.Item>
                  )}
                  {property.jacuzzi != null && (
                    <ListGroup.Item>
                      🛁 {t("jacuzzi")}: {property.jacuzzi}
                    </ListGroup.Item>
                  )}
                  {property.landSize && (
                    <ListGroup.Item>
                      🌳 {t("landArea")}: {property.landSize}
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12}>
            <PropertyGallery media={property.media[language]} />
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default PropertyDetails;