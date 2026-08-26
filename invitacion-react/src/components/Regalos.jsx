import { useTranslation } from 'react-i18next';

const R2 = 'https://pub-848e497284a14e3babf4a1c6d1838bf0.r2.dev/';

export default function Regalos() {
  const { t } = useTranslation();
  return (
    <section id="regalos" className="regalos-section">
      <div className="regalos-grid">
        <div className="regalos-image">
          <img
            src={`${R2}Isra&Paula-4.jpg`}
            alt="Israel y Paula"
            loading="lazy"
            decoding="async"
            width="800"
            height="1000"
          />
        </div>
        <div className="regalos-text">
          <h2>{t('regalos.titulo')}</h2>
          <p>{t('regalos.descripcion')}</p>
          <p><strong>{t('regalos.sinpe')}</strong> {t('regalos.sinpe_num')}</p>
          <p><strong>{t('regalos.iban_crc')}</strong> {t('regalos.iban_crc_num')}</p>
          <p><strong>{t('regalos.iban_usd')}</strong> {t('regalos.iban_usd_num')}</p>
          <a href="https://wa.me/50685827555" className="regalos-btn" target="_blank" rel="noopener noreferrer">
            {t('regalos.boton')}
          </a>
        </div>
      </div>
    </section>
  );
}
