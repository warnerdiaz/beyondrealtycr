import { useEffect, useRef } from "react";
import { useLanguage } from "../i18n";
import type { PropertyMedia } from "../types/Property";

interface Props {
  images: PropertyMedia[];
  index: number;
  alt: string;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

/**
 * Fullscreen image lightbox for the detail-page gallery. Images only — the
 * tour video always stays inline on the stage and never opens here. Modal
 * semantics: traps initial focus on open, restores focus to the trigger on
 * close, closes on Escape / overlay click, and ArrowLeft/ArrowRight paginate
 * the images. SSR-safe: all window/document access is inside effects or
 * handlers, never at module scope or during render.
 */
const Lightbox = ({ images, index, alt, onClose, onNavigate }: Props) => {
  const { t } = useLanguage();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerElementRef = useRef<Element | null>(null);

  useEffect(() => {
    triggerElementRef.current = document.activeElement;
    closeButtonRef.current?.focus();

    return () => {
      if (triggerElementRef.current instanceof HTMLElement) {
        triggerElementRef.current.focus();
      }
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowLeft") {
        onNavigate((index - 1 + images.length) % images.length);
      } else if (event.key === "ArrowRight") {
        onNavigate((index + 1) % images.length);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [index, images.length, onClose, onNavigate]);

  const image = images[index];
  if (!image) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t("propertyGallery")}
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-4"
    >
      <button
        ref={closeButtonRef}
        type="button"
        aria-label={t("closeGallery")}
        onClick={(event) => {
          event.stopPropagation();
          onClose();
        }}
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-surface/10 text-surface transition-colors hover:bg-surface/20 focus:outline-none focus:ring-2 focus:ring-accent"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {images.length > 1 && (
        <button
          type="button"
          aria-label={t("previousImage")}
          onClick={(event) => {
            event.stopPropagation();
            onNavigate((index - 1 + images.length) % images.length);
          }}
          className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-surface/10 text-surface transition-colors hover:bg-surface/20 focus:outline-none focus:ring-2 focus:ring-accent sm:left-4"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      )}

      <img
        src={image.url}
        alt={alt}
        onClick={(event) => event.stopPropagation()}
        className="max-h-full max-w-full rounded-lg object-contain"
      />

      {images.length > 1 && (
        <button
          type="button"
          aria-label={t("nextImage")}
          onClick={(event) => {
            event.stopPropagation();
            onNavigate((index + 1) % images.length);
          }}
          className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-surface/10 text-surface transition-colors hover:bg-surface/20 focus:outline-none focus:ring-2 focus:ring-accent sm:right-4"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Lightbox;
