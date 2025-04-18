"use client";
import { useTranslation } from "react-i18next";

interface NavProps {
  closeMenu?: () => void;
}

export default function Nav({ closeMenu }: NavProps) {
  const { t } = useTranslation();

  const scrollToSection = (id: string, isHome: boolean = false) => {
    if (isHome) {
      // Прокрутка до самого верха страницы
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      // Прокрутка до элемента с учетом отступа
      const element = document.getElementById(id);
      if (element) {
        // Получаем значение 1rem в пикселях
        const remInPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
        
        // Условный отступ в rem
        const offsetRem = window.innerWidth < 600 ? 8 : 5; // 6rem или 4rem
        const offset = offsetRem * remInPx;

        const position = element.offsetTop - offset;

        window.scrollTo({
          top: position,
          behavior: "smooth",
        });
      }
    }

    if (closeMenu) {
      closeMenu();
    }
  };

  return (
    <nav>
      <button className="nav-button" onClick={() => scrollToSection("about", true)}>
        {t("header.home")}
      </button>
      <button className="nav-button" onClick={() => scrollToSection("gallery")}>
        {t("header.gallery")}
      </button>
      <button className="nav-button" onClick={() => scrollToSection("contacts")}>
        {t("header.contacts")}
      </button>
    </nav>
  );
}
