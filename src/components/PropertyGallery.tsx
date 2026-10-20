import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import type { Slide } from "yet-another-react-lightbox";
import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import { useLanguage } from "../i18n";
import type { PropertyMedia } from "../types/Property";
import "yet-another-react-lightbox/styles.css";
import styles from "./PropertyGallery.module.css";

interface Props {
  media: PropertyMedia[];
}

const PropertyGallery = ({ media }: Props) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const { t } = useLanguage();
  const cover = media.find((item) => item.type === "cover");

  const slides: Slide[] = media.map((m) => {
    if (m.type === "video") {
      return {
        type: "video",
        poster: m.poster ?? cover?.url,
        sources: [{ src: m.url, type: "video/mp4" }],
        width: 1280,
        height: 720,
        preload: "none",
      };
    }
    return { src: m.url };
  });

  return (
    <>
      {media[0] && (
        <button
          type="button"
          className={styles.mainWrapper}
          onClick={() => {
            setIndex(0);
            setOpen(true);
          }}
          aria-label={t("propertyGallery")}
        >
          <img
            src={media[0].type === "video" ? media[0].poster ?? cover?.url : media[0].url}
            className={`img-fluid rounded ${styles.mainImage}`}
            alt="Property gallery preview"
          />
        </button>
      )}

      <Row className="g-2">
        {media.slice(1).map((item, i) => {
          const thumbnail = item.type === "video" ? item.poster ?? cover?.url : item.url;

          return (
            <Col xs={3} key={item.url}>
              <button
                type="button"
                className={styles.thumbnailButton}
                onClick={() => {
                  setIndex(i + 1);
                  setOpen(true);
                }}
                aria-label={`${t("galleryItem")} ${i + 2}`}
              >
                {thumbnail && (
                  <img
                    src={thumbnail}
                    className={`img-fluid rounded ${styles.thumbnail}`}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                )}
                {item.type === "video" && <span className={styles.videoBadge}>{t("video")}</span>}
              </button>
            </Col>
          );
        })}
      </Row>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        index={index}
        plugins={[Video]}
        video={{ controls: true, playsInline: true }}
        on={{ view: ({ index }) => setIndex(index) }}
      />
    </>
  );
};

export default PropertyGallery;
