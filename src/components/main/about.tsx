import Image from 'next/image';
import { useTranslation } from "react-i18next";


export default function About() {
  const { t } = useTranslation();
  return (
    <section id="about" className="about">
      <h1 className="aboutTittle">{t('about.tittle')}</h1>
      <section className="about-section">
        <p
          className="about-p"
          dangerouslySetInnerHTML={{ __html: t('about.1p') }}
        />
        <p
          className="about-p"
          dangerouslySetInnerHTML={{ __html: t('about.2p') }}
        />
        <section className="about-p-wi">
          <Image
            src="/images/young-artist-fechin.png"
            alt="Молодой художник с мастером"
            width={400}
            height={150}
            className="about-img"
            priority
          />
          <p
            className="about-p"
            dangerouslySetInnerHTML={{ __html: t('about.3p') }}
          />
          <p
            className="about-p"
            dangerouslySetInnerHTML={{ __html: t('about.4p') }}
          />
        </section>
        <section className="about-p-wi">
          <Image
            src="/images/artist-in-tatra.png"
            alt="Отшельник в деревне в горах"
            width={400}
            height={150}
            className="about-img"
          />
          <p
            className="about-p"
            dangerouslySetInnerHTML={{ __html: t('about.5p') }}
          />
          <p
            className="about-p"
            dangerouslySetInnerHTML={{ __html: t('about.6p') }}
          />
          <p
            className="about-p"
            dangerouslySetInnerHTML={{ __html: t('about.7p') }}
          />
        </section>
        <h3 className="about-subtitle">{t('about.8pt')}</h3>
        <p
          className="about-p"
          dangerouslySetInnerHTML={{ __html: t('about.9p') }}
        />
        <p
          className="about-p"
          dangerouslySetInnerHTML={{ __html: t('about.10p') }}
        />
      </section>
    </section>
  )
}
