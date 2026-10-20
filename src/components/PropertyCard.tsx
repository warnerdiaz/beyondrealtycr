import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLanguage } from "../i18n";
import type { Property } from "../types/Property";

interface Props {
  property: Property;
}

const PropertyCard = ({ property }: Props) => {
  const { language, t } = useLanguage();
  const cover = property.media[language].find((item) => item.type === "cover");
  const translation = property.translations[language];

  return (
    <Link
      to={`/property/${property.id}`}
      className="text-decoration-none text-reset"
      aria-label={`${t("viewDetails")}: ${translation.title}`}
    >
      <Card bg="dark" text="light" className="border-secondary h-100">
        {cover && (
          <Card.Img
            variant="top"
            src={cover.url}
            alt={`${translation.title}, ${translation.location}`}
            loading="lazy"
            decoding="async"
          />
        )}
        <Card.Body>
          <Card.Title>
            {translation.title} – {translation.location}
          </Card.Title>
          <Card.Text className="text-secondary">
            {property.price}
          </Card.Text>
          <span className="btn btn-outline-secondary btn-sm">{t("viewDetails")}</span>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default PropertyCard;