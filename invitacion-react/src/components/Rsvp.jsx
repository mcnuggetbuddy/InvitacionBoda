import { useTranslation } from 'react-i18next';
import RsvpForm from './RsvpForm';

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
        <p className="rsvp-descripcion rsvp-individual">{t('rsvp.individual')}</p>
        <RsvpForm />
      </div>
    </section>
  );
}
