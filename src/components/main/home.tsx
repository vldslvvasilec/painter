import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  return (
    <section id="home" className="home">
      <h1 className="home-title">{t('texts.top-text')}</h1>
      <section className="home-section colors">
        <p className="home-section-p">{t('texts.text-1')}</p>
        <section className="image-wrap">
          <Image
            src="/3.webp"
            alt="A vibrant artistic painting created with colorful paints in an abstract style."
            width={600} 
            height={400}
            className="home-section-img"
          />
          <Image
            src="/3.webp"
            alt="Blurred shadow"
            width={600}
            height={400}
            className="blurred-shadow"
          />
        </section>
      </section>
      <section className="home-section chaotic">
        <p className="home-section-p">{t('texts.text-2')}</p>
        <section className="image-wrap">
          <Image
            src="/2.webp"
            alt="A chaotic, energetic abstract painting filled with expression and movement."
            width={600}
            height={400}
            className="home-section-img"
          />
          <Image
            src="/2.webp"
            alt="Blurred shadow"
            width={600}
            height={400}
            className="blurred-shadow"
          />
        </section>
      </section>
    </section>
  )
}
