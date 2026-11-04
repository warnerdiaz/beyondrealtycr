import { useState } from "react";
import { useLanguage } from "../i18n";
import {
  galleryImages,
  galleryItems,
  selectCoverMedia,
  shouldShowThumbStrip,
} from "../lib/media";
import type { PropertyMedia } from "../types/Property";
import Lightbox from "./Lightbox";

interface Props {
  media: PropertyMedia[];
  title: string;
}

/**
 * Detail-page media gallery: a large stage on top (the tour video, inline
 * with native controls, or the active image) plus a thumbnail strip below
 * for switching the stage. Clicking an image on the stage opens a
 * fullscreen lightbox to browse every image; the video never appears in the
 * lightbox — it always stays inline on the stage.
 *
 * Graceful degradation: when the gallery has at most one browsable item
 * (e.g. a video + cover only, or a single image), there is nothing to
 * switch between, so the thumbnail strip is suppressed entirely — this
 * matches today's listings, which only have a video + cover.
 */
const Gallery = ({ media, title }: Props) => {
  const { t } = useLanguage();
  const items = galleryItems(media);
  const cover = selectCoverMedia(media);
  const images = galleryImages(items);

  const [stageIndex, setStageIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (items.length === 0) {
    return (
      cover && (
        <img
          src={cover.poster ?? cover.url}
          alt={title}
          className="aspect-[16/10] w-full rounded-lg bg-surface-muted object-cover"
        />
      )
    );
  }

  const activeItem = items[Math.min(stageIndex, items.length - 1)];
  const showStrip = shouldShowThumbStrip(items);
  const posterUrl = cover?.poster ?? cover?.url;

  return (
    <div>
      {/* Stage */}
      <div className="mb-3">
        {activeItem.kind === "video" ? (
          <video
            src={activeItem.media.url}
            poster={posterUrl}
            autoPlay
            muted
            loop
            playsInline
            controls
            aria-label={title}
            className="aspect-video w-full rounded-lg bg-black object-contain"
          >
            <track kind="captions" />
          </video>
        ) : (
          <button
            type="button"
            aria-label={t("galleryItem")}
            onClick={() => {
              const imageIndex = images.indexOf(activeItem.media);
              setLightboxIndex(imageIndex === -1 ? 0 : imageIndex);
            }}
            className="block w-full cursor-zoom-in"
          >
            <img
              src={activeItem.media.url}
              alt={title}
              className="aspect-[16/10] w-full rounded-lg bg-surface-muted object-cover"
            />
          </button>
        )}
      </div>

      {/* Thumbnail strip */}
      {showStrip && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {items.map((item, itemIndex) => {
            const isActive = itemIndex === stageIndex;
            const thumbSrc =
              item.kind === "video"
                ? posterUrl ?? item.media.url
                : item.media.poster ?? item.media.url;

            return (
              <button
                key={`${item.kind}-${item.media.url}`}
                type="button"
                aria-label={
                  item.kind === "video" ? t("playVideo") : t("galleryThumbAlt")
                }
                aria-current={isActive}
                onClick={() => setStageIndex(itemIndex)}
                className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-md border-2 bg-surface-muted transition-colors ${
                  isActive ? "border-accent" : "border-line hover:border-accent"
                }`}
              >
                {thumbSrc && (
                  <img
                    src={thumbSrc}
                    alt={
                      item.kind === "video"
                        ? t("video")
                        : t("galleryThumbAlt")
                    }
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                )}
                {item.kind === "video" && (
                  <span className="absolute inset-0 flex items-center justify-center bg-ink/20">
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="h-6 w-6 text-surface drop-shadow"
                      fill="currentColor"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          index={lightboxIndex}
          alt={title}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
};

export default Gallery;
