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
        const offset = window.innerHeight * 0.17;
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
      <button className="nav-button" onClick={() => scrollToSection("home", true)}>
        {t("header.home")}
      </button>
      <button className="nav-button" onClick={() => scrollToSection("gallery")}>
        {t("header.gallery")}
      </button>
      <button className="nav-button" onClick={() => scrollToSection("about")}>
        {t("header.about")}
      </button>
      <button className="nav-button" onClick={() => scrollToSection("contacts")}>
        {t("header.contacts")}
      </button>
    </nav>
  );
}
