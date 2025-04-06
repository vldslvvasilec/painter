import { useTranslation } from "react-i18next";


export default function About() {
  const { t } = useTranslation();
  return (
    <section id="about" className="about">
      <h1 className="aboutTittle">Philippe Thorin</h1>
      <p className="about-p">{t('about')}</p>
    </section>
  )
}
