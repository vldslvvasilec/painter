import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Image from "next/image";

const images = [
  "/1.webp",
  "/2.webp",
  "/3.webp",
  "/1.webp",
  "/2.webp",
  "/3.webp",
  "/2.webp",
  "/1.webp",
];

export default function Gallery() {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesToDisplay, setImagesToDisplay] = useState(3);

  useEffect(() => {
    const updateImagesToDisplay = () => {
      if (window.innerWidth <= 550) {
        setImagesToDisplay(1);
      } else {
        setImagesToDisplay(3);
      }
    };

    updateImagesToDisplay();
    window.addEventListener("resize", updateImagesToDisplay);
    return () => window.removeEventListener("resize", updateImagesToDisplay);
  }, []);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < images.length - imagesToDisplay) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <section id="gallery" className="gallery">
      <h1 className="gallery-title">{t("gallery_title")}</h1>
      <section className="gallery-container">
        <button
          className={`arrow-button left ${currentIndex === 0 ? "disabled" : ""}`}
          onClick={handlePrev}
        >
          <FaArrowLeft />
        </button>

        <section className="images-container">
          {images.slice(currentIndex, currentIndex + imagesToDisplay).map((image, index) => (
            <div key={index} style={{ position: "relative", width: "100%", height: "250px" }}>
              <Image
                src={image}
                alt={`Gallery item ${index + 1}`}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 550px) 100vw, 33vw"
              />
            </div>
          ))}
        </section>

        <button
          className={`arrow-button right ${
            currentIndex + imagesToDisplay >= images.length ? "disabled" : ""
          }`}
          onClick={handleNext}
        >
          <FaArrowRight />
        </button>
      </section>
    </section>
  );
}
