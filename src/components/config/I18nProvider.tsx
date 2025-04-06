"use client";

import { ReactNode, useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import Cookies from "js-cookie";
import i18n from "@/i18n";
import en from "@/locales/en.json";
import ru from "@/locales/ru.json";
import fr from "@/locales/fr.json";
import de from "@/locales/de.json";

const availableLanguages = ["en", "ru", "fr", "de"];

// Функция для получения языка из куков или браузера
const getInitialLanguage = () => {
  if (typeof window !== "undefined") {
    // Если куков нет или они пустые, берем язык браузера
    const browserLanguage = navigator.language.split("-")[0];
    if (availableLanguages.includes(browserLanguage)) {
      return browserLanguage;
    }
    const savedLanguage = Cookies.get("language");
    // Проверяем, если язык в куках существует
    if (savedLanguage && availableLanguages.includes(savedLanguage)) {
      return savedLanguage;
    }

  }
  return "en"; // Если ничего не найдено, ставим английский
};

export default function I18nProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initialLanguage = getInitialLanguage();

    // Устанавливаем язык в куки и i18n
    Cookies.set("language", initialLanguage, { expires: 365 });

    i18n.init({
      resources: {
        en: { translation: en },
        ru: { translation: ru },
        fr: { translation: fr },
        de: { translation: de },
      },
      lng: initialLanguage, // Устанавливаем язык
      fallbackLng: "en",
      interpolation: { escapeValue: false },
    });

    setIsReady(true);
  }, []);

  // Не рендерить компоненты, пока i18n не будет инициализирован
  if (!isReady) return null;

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
