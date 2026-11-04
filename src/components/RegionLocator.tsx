import { useLanguage } from "../i18n";
import { getProvinceLabel } from "../lib/provinces";
import { getRegionLabel } from "../lib/regions";
import type { Province, Region } from "../types/Property";

/**
 * Region locator: a clean pin motif plus the property's tourist region and
 * province, orienting buyers unfamiliar with Costa Rican geography. We show
 * the region, never the exact lot — land sellers' precise locations stay
 * private until contact.
 *
 * (A geographic Costa Rica map was tried but a hand-drawn silhouette didn't
 * read as the country or match the minimalist brand; swap in a real
 * GeoJSON-derived CR SVG later if a precise map is wanted.)
 */
interface Props {
  region: Region;
  province: Province;
}

const RegionLocator = ({ region, province }: Props) => {
  const { language, t } = useLanguage();

  return (
    <div className="mb-8 max-w-2xl rounded-lg border border-line bg-surface-muted p-4">
      <h2 className="mb-3 text-lg font-semibold">{t("locationTitle")}</h2>
      <div className="flex items-center gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="currentColor">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
            />
          </svg>
        </span>
        <div>
          <p className="text-base font-medium text-ink">
            {getRegionLabel(region, language)}
          </p>
          <p className="text-sm text-muted">
            {getProvinceLabel(province, language)}, Costa Rica
          </p>
          <p className="mt-2 text-xs text-muted">{t("mapApproxNote")}</p>
        </div>
      </div>
    </div>
  );
};

export default RegionLocator;
