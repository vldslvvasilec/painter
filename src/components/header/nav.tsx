"use client";
import { useTranslation } from "react-i18next";

export default function Nav() {
  const { t } = useTranslation();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = window.innerHeight * 0.1;
      const position = element.offsetTop - offset;

      window.scrollTo({
        top: position,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav>
      <button className="nav-button" onClick={() => scrollToSection("home")}>
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
