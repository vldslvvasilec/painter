"use client";
import { useTranslation } from "react-i18next";
import Home from "@/components/main/home";
import About from "@/components/main/about";
import Contacts from "@/components/main/contacts";
import "@/styles/main.scss";
import Gallery from "@/components/main/gallery";

export default function Page() {
  const { t } = useTranslation();

  return (
    <main>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
      <Home />
      <Gallery />
      <About />
      <Contacts />
    </main>
  );
}
