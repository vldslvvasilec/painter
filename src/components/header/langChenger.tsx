"use client";
import { useRouter } from "next/navigation";
import i18next from "i18next";
import { useState, useRef, useEffect } from "react";

export default function LangChanger() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const currentLanguage = i18next.language;
  const availableLanguages = ["en", "ru", "fr", "de"];

  const changeLanguage = (lang: string) => {
    if (lang === currentLanguage) {
      return;
    }
    i18next.changeLanguage(lang);
    router.refresh();
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState); // Меняем состояние на противоположное (открыть/закрыть)
  };

  const formatLanguageName = (lang: string) => {
    return lang.charAt(0).toUpperCase() + lang.slice(1).toLowerCase();
  };

  return (
    <div className="languageSelector">
      <button className="languageButton" onClick={toggleMenu}>
        {formatLanguageName(currentLanguage)}
      </button>
      {isOpen && (
        <div className="languageMenu" ref={menuRef}>
          {availableLanguages
            .filter((lang) => lang !== currentLanguage)
            .map((lang) => (
              <button
                key={lang}
                className="languageOption"
                onClick={() => changeLanguage(lang)}
              >
                {formatLanguageName(lang)}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
