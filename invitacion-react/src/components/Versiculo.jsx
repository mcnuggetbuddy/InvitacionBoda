import { useTranslation } from 'react-i18next';

export default function Versiculo() {
  const { t } = useTranslation();
  return (
    <section className="versiculo-section">
      <div className="versiculo-overlay">
        <blockquote className="versiculo-text">
          {t('versiculo.texto').split('\n\n').map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <cite>{t('versiculo.cita')}</cite>
        </blockquote>
      </div>
    </section>
  );
}
