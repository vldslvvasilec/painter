"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Cookies from "js-cookie";

import en from "./locales/en.json";
import ru from "./locales/ru.json";
import fr from "./locales/fr.json";
import de from "./locales/de.json";

const availableLanguages = ["en", "ru", "fr", "de"];

// Функция для получения языка из куков или браузера
const getInitialLanguage = () => {
  if (typeof window !== "undefined") {
    const savedLanguage = Cookies.get("language");
    if (savedLanguage && availableLanguages.includes(savedLanguage)) {
      return savedLanguage;
    }

    // Если куков нет, берем язык браузера
    const browserLanguage = navigator.language.split("-")[0];
    if (availableLanguages.includes(browserLanguage)) {
      return browserLanguage;
    }
  }
  return "en"; // Если ничего не найдено, ставим английский
};

// Устанавливаем язык до инициализации i18n
const initialLanguage = getInitialLanguage();
Cookies.set("language", initialLanguage, { expires: 365 });

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
    fr: { translation: fr },
    de: { translation: de },
  },
  lng: initialLanguage,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
