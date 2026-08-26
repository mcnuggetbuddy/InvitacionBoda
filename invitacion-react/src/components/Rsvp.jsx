import { useTranslation } from 'react-i18next';

export default function Rsvp() {
  const { t } = useTranslation();
  return (
    <section id="rsvp" className="rsvp-section">
      <div className="rsvp-overlay">
        <h2 className="rsvp-titulo">{t('rsvp.titulo')}</h2>
        <p className="rsvp-importante">{t('rsvp.importante')}</p>
        <p className="rsvp-descripcion">{t('rsvp.descripcion')}</p>
        <p className="rsvp-descripcion">{t('rsvp.prohibido')}</p>
        <p className="rsvp-limite"><span>{t('rsvp.limite')}</span> {t('rsvp.fecha')}</p>
        <a href="https://form.typeform.com/to/qqMnAotL" className="rsvp-btn" target="_blank" rel="noopener noreferrer">
          {t('rsvp.form')}
        </a>
      </div>
    </section>
  );
}
