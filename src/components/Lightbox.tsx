import { useCallback, useEffect } from "react";
import { useLanguage } from "../i18n";

interface Props {
  images: { url: string; alt: string }[];
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

/**
 * Lightweight, dependency-free full-screen lightbox. Supports click-away,
 * Escape-to-close, and left/right arrow navigation. Deliberately avoids
 * window.alert/confirm and any browser-native dialogs.
 */
const Lightbox = ({ images, index, onClose, onIndexChange }: Props) => {
  const { t } = useLanguage();
  const total = images.length;

  const goPrev = useCallback(
    () => onIndexChange((index - 1 + total) % total),
    [index, total, onIndexChange],
  );
  const goNext = useCallback(
    () => onIndexChange((index + 1) % total),
    [index, total, onIndexChange],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, goPrev, goNext]);

  const current = images[index];
  if (!current) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label={t("closeGallery")}
        onClick={onClose}
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20"
      >
        &times;
      </button>

      {total > 1 && (
        <button
          type="button"
          aria-label={t("previousImage")}
          onClick={(event) => {
            event.stopPropagation();
            goPrev();
          }}
          className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20 sm:left-4"
        >
          &#8249;
        </button>
      )}

      <img
        src={current.url}
        alt={current.alt}
        onClick={(event) => event.stopPropagation()}
        className="max-h-[90vh] max-w-full select-none object-contain"
      />

      {total > 1 && (
        <button
          type="button"
          aria-label={t("nextImage")}
          onClick={(event) => {
            event.stopPropagation();
            goNext();
          }}
          className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20 sm:right-4"
        >
          &#8250;
        </button>
      )}

      {total > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
          {index + 1} / {total}
        </div>
      )}
    </div>
  );
};

export default Lightbox;
