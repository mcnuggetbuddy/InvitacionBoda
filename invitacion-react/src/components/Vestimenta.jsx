import { useTranslation } from 'react-i18next';

const R2 = 'https://pub-848e497284a14e3babf4a1c6d1838bf0.r2.dev/';

export default function Vestimenta() {
  const { t } = useTranslation();
  return (
    <section id="vestimenta" className="vestimenta-section">
      <div className="vestimenta-grid">
        <div className="vestimenta-text">
          <h2>{t('vestimenta.titulo')}</h2>
          <p>{t('vestimenta.descripcion')}</p>
          <p className="vestimenta-prohibido">{t('vestimenta.prohibido')}</p>
        </div>
        <div className="vestimenta-outfits">
          <div className="outfit-card">
            <p className="outfit-title">{t('vestimenta.mujer')}</p>
            <a href="https://pin.it/1KsZvCdN6" target="_blank" rel="noopener noreferrer">
              <img
                src={`${R2}drawing_mujer.png`}
                alt="Vestimenta mujer"
                className="outfit-img"
                loading="lazy"
                decoding="async"
                width="400"
                height="600"
              />
            </a>
            <p className="outfit-click">{t('vestimenta.click')}</p>
          </div>
          <div className="outfit-card">
            <p className="outfit-title">{t('vestimenta.hombre')}</p>
            <a href="https://pin.it/1xiaX9CSR" target="_blank" rel="noopener noreferrer">
              <img
                src={`${R2}drawing_hombre.png`}
                alt="Vestimenta hombre"
                className="outfit-img"
                loading="lazy"
                decoding="async"
                width="400"
                height="600"
              />
            </a>
            <p className="outfit-click">{t('vestimenta.click')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
