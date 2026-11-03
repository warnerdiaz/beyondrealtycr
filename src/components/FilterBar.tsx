import { useLanguage } from "../i18n";
import type { PropertyFilters } from "../lib/filter";
import { getRegionLabel, REGIONS } from "../lib/regions";
import type { PropertyType, Region } from "../types/Property";

interface Props {
  filters: PropertyFilters;
  onChange: (filters: PropertyFilters) => void;
  onClear: () => void;
}

const inputClasses =
  "w-full rounded-md border border-line bg-surface px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";
const labelClasses = "mb-1 block text-sm font-medium text-ink";

function parseOptionalNumber(value: string): number | undefined {
  if (value === "") {
    return undefined;
  }
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
}

/**
 * Controlled filter bar over the property catalog: type, region, price
 * range, and land size range. Reports changes via `onChange`; the caller
 * (Home) owns the filter state and derives the visible list.
 */
const FilterBar = ({ filters, onChange, onClear }: Props) => {
  const { language, t } = useLanguage();

  const updateType = (value: string) => {
    onChange({
      ...filters,
      type: value === "" ? undefined : (value as PropertyType),
    });
  };

  const updateRegion = (value: string) => {
    onChange({
      ...filters,
      region: value === "" ? undefined : (value as Region),
    });
  };

  const updatePriceMin = (value: string) => {
    onChange({
      ...filters,
      priceRange: { ...filters.priceRange, min: parseOptionalNumber(value) },
    });
  };

  const updatePriceMax = (value: string) => {
    onChange({
      ...filters,
      priceRange: { ...filters.priceRange, max: parseOptionalNumber(value) },
    });
  };

  const updateLandMin = (value: string) => {
    onChange({
      ...filters,
      landSizeRange: {
        ...filters.landSizeRange,
        min: parseOptionalNumber(value),
      },
    });
  };

  const updateLandMax = (value: string) => {
    onChange({
      ...filters,
      landSizeRange: {
        ...filters.landSizeRange,
        max: parseOptionalNumber(value),
      },
    });
  };

  return (
    <div className="mb-8 rounded-lg border border-line bg-surface-muted p-4">
      <div className="flex flex-wrap items-end gap-4">
        <div className="min-w-[8rem] flex-1">
          <label className={labelClasses} htmlFor="filter-type">
            {t("filterType")}
          </label>
          <select
            id="filter-type"
            className={inputClasses}
            value={filters.type ?? ""}
            onChange={(event) => updateType(event.target.value)}
          >
            <option value="">{t("filterAllTypes")}</option>
            <option value="finca">{t("propertyTypeFinca")}</option>
            <option value="lote">{t("propertyTypeLote")}</option>
          </select>
        </div>

        <div className="min-w-[10rem] flex-1">
          <label className={labelClasses} htmlFor="filter-region">
            {t("filterRegion")}
          </label>
          <select
            id="filter-region"
            className={inputClasses}
            value={filters.region ?? ""}
            onChange={(event) => updateRegion(event.target.value)}
          >
            <option value="">{t("filterAllRegions")}</option>
            {REGIONS.map((region) => (
              <option key={region} value={region}>
                {getRegionLabel(region, language)}
              </option>
            ))}
          </select>
        </div>

        <div className="min-w-[12rem] flex-1">
          <span className={labelClasses}>{t("filterPriceRange")}</span>
          <div className="flex gap-2">
            <input
              type="number"
              inputMode="numeric"
              min={0}
              aria-label={`${t("filterPriceRange")} ${t("filterMinPlaceholder")}`}
              placeholder={t("filterMinPlaceholder")}
              className={inputClasses}
              value={filters.priceRange?.min ?? ""}
              onChange={(event) => updatePriceMin(event.target.value)}
            />
            <input
              type="number"
              inputMode="numeric"
              min={0}
              aria-label={`${t("filterPriceRange")} ${t("filterMaxPlaceholder")}`}
              placeholder={t("filterMaxPlaceholder")}
              className={inputClasses}
              value={filters.priceRange?.max ?? ""}
              onChange={(event) => updatePriceMax(event.target.value)}
            />
          </div>
        </div>

        <div className="min-w-[12rem] flex-1">
          <span className={labelClasses}>{t("filterLandSizeRange")}</span>
          <div className="flex gap-2">
            <input
              type="number"
              inputMode="numeric"
              min={0}
              aria-label={`${t("filterLandSizeRange")} ${t("filterMinPlaceholder")}`}
              placeholder={t("filterMinPlaceholder")}
              className={inputClasses}
              value={filters.landSizeRange?.min ?? ""}
              onChange={(event) => updateLandMin(event.target.value)}
            />
            <input
              type="number"
              inputMode="numeric"
              min={0}
              aria-label={`${t("filterLandSizeRange")} ${t("filterMaxPlaceholder")}`}
              placeholder={t("filterMaxPlaceholder")}
              className={inputClasses}
              value={filters.landSizeRange?.max ?? ""}
              onChange={(event) => updateLandMax(event.target.value)}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={onClear}
          className="rounded-md border border-line bg-surface px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-surface-muted"
        >
          {t("filterClear")}
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
