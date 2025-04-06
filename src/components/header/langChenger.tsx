"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import i18n from "@/i18n";
import Cookies from "js-cookie";

interface LangChangerProps {
  closeMenu?: () => void;
}

export default function LangChanger({ closeMenu }: LangChangerProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const currentLanguage = i18n.language;
  const availableLanguages = ["en", "ru", "fr", "de"];

  const changeLanguage = (lang: string) => {
    if (lang === currentLanguage) {
      return;
    }
    i18n.changeLanguage(lang);
    Cookies.set("language", lang, { expires: 365 }); // Записываем новый язык в куки
    router.refresh();
    setIsOpen(false); // Закрываем меню после выбора языка
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false); // Закрываем меню при клике вне его
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => {
    // Если меню закрыто, то открываем, если открыто — закрываем
    setIsOpen((prevState) => !prevState);
  };

  const formatLanguageName = (lang: string) =>
    lang.charAt(0).toUpperCase() + lang.slice(1).toLowerCase();

  const handleButtonClick = () => {
    toggleMenu(); // Переключаем состояние меню
    // Дополнительно можно добавить действия, которые нужно выполнить при нажатии на кнопку
  };

  return (
    <div className="languageSelector">
      <button className="languageButton" onClick={handleButtonClick}>
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
                onClick={() => changeLanguage(lang)} // Изменяем язык при клике
              >
                {formatLanguageName(lang)}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
