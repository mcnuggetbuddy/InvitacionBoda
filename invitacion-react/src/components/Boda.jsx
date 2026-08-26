import { useTranslation } from 'react-i18next';

const R2 = 'https://pub-848e497284a14e3babf4a1c6d1838bf0.r2.dev/';

export default function Boda() {
  const { t } = useTranslation();
  return (
    <section id="boda" className="boda-section">
      <div className="boda-grid">
        <div className="boda-image">
          <img src={`${R2}Israel&Paula-17.jpg`} alt="Israel y Paula" />
        </div>
        <div className="boda-horario">
          <h2>{t('horario.titulo')}</h2>
          <p>{t('horario.fecha')}</p>
          <p>{t('horario.hora')}</p>
          <p>{t('horario.finca')}</p>
          <p>{t('horario.locacion')}</p>       
          <div className="waze-row">
            <img src={`${R2}waze.png`} alt="Waze" className="waze-icon" />
            <a href="https://waze.com/ul/hd1u1m2r0n" className="waze-btn" target="_blank" rel="noopener noreferrer">Waze</a>
          </div>
          <p>{t('horario.descripcion')}</p>
        </div>
      </div>
    </section>
  );
}
