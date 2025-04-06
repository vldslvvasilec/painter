import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Импортируем иконки

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
  const [imagesToDisplay, setImagesToDisplay] = useState(3); // Состояние для количества картинок

  useEffect(() => {
    // Устанавливаем количество изображений в зависимости от ширины экрана
    const updateImagesToDisplay = () => {
      if (window.innerWidth <= 550) {
        setImagesToDisplay(1);
      } else {
        setImagesToDisplay(3);
      }
    };

    updateImagesToDisplay(); // Вызовем при монтировании компонента

    // Добавим обработчик для изменения размера экрана
    window.addEventListener("resize", updateImagesToDisplay);

    // Очистим обработчик при размонтировании компонента
    return () => {
      window.removeEventListener("resize", updateImagesToDisplay);
    };
  }, []); // Пустой массив зависимостей, чтобы выполнить только один раз при монтировании

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
      <h1 className="gallery-title">{t('gallery_title')}</h1>
      <section className="gallery-container">
        <button
          className={`arrow-button left ${currentIndex === 0 ? "disabled" : ""}`}
          onClick={handlePrev}
        >
          <FaArrowLeft /> {/* Стрелка влево */}
        </button>

        <section className="images-container">
          {images.slice(currentIndex, currentIndex + imagesToDisplay).map((image, index) => (
            <img key={index} src={image} alt={`Gallery item ${index + 1}`} />
          ))}
        </section>

        <button
          className={`arrow-button right ${
            currentIndex + imagesToDisplay >= images.length ? "disabled" : ""
          }`}
          onClick={handleNext}
        >
          <FaArrowRight /> {/* Стрелка вправо */}
        </button>
      </section>
    </section>
  );
}
