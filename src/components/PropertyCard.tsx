import { Link } from "react-router-dom";
import { useLanguage } from "../i18n";
import { formatLandSize, formatPrice, formatPricePerAcre } from "../lib/format";
import { getRegionLabel } from "../lib/regions";
import { propertySlug } from "../lib/slug";
import type { Property } from "../types/Property";

interface Props {
  property: Property;
}

const PropertyCard = ({ property }: Props) => {
  const { language, t } = useLanguage();
  const translation = property.translations[language];
  const cover =
    property.media[language].find((item) => item.type === "cover") ??
    property.media[language][0];

  const typeLabel =
    property.type === "finca" ? t("propertyTypeFinca") : t("propertyTypeLote");
  const regionLabel = getRegionLabel(property.region, language);
  const pricePerAcre = formatPricePerAcre(property.priceUsd, property.landAcres);

  const factParts = [typeLabel, formatLandSize(property.landAcres)];
  if (property.bedrooms !== undefined) {
    factParts.push(`${property.bedrooms} ${t("bedsAbbr")}`);
  }
  if (property.bathrooms !== undefined) {
    factParts.push(`${property.bathrooms} ${t("bathsAbbr")}`);
  }

  return (
    <Link
      to={`/property/${propertySlug(property)}`}
      className="group block overflow-hidden rounded-lg border border-line bg-surface shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-surface-muted">
        {cover && (
          <img
            src={cover.poster ?? cover.url}
            alt={translation.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>
      <div className="p-4">
        <p className="mb-1 text-lg font-semibold text-ink">
          {formatPrice(property.priceUsd)}
        </p>
        {pricePerAcre !== "" && (
          <p className="mb-1 text-sm text-muted">{pricePerAcre}</p>
        )}
        <h3 className="mb-1 truncate text-base font-medium text-ink">
          {translation.title}
        </h3>
        <p className="mb-2 text-sm text-muted">
          {translation.location} &middot; {regionLabel}
        </p>
        <p className="text-sm text-muted">{factParts.join(" · ")}</p>
      </div>
    </Link>
  );
};

export default PropertyCard;
