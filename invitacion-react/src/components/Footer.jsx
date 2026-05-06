import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="footer">
      <ul className="footer-nav">
        <li><a href="#boda">{t('nav.boda')}</a></li>
        <li><a href="#nosotros">{t('nav.nosotros')}</a></li>
        <li><a href="#vestimenta">{t('nav.vestimenta')}</a></li>
        <li><a href="#regalos">{t('nav.regalo')}</a></li>
        <li><a href="#rsvp">{t('nav.rsvp')}</a></li>
      </ul>
    </footer>
  );
}
