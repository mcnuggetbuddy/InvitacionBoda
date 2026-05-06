import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Header({ visible }) {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside() { setLangOpen(false); }
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  function changeLanguage(lang) {
    localStorage.setItem('lang', lang);
    i18n.changeLanguage(lang);
    setLangOpen(false);
  }

  return (
    <header className={`header${visible ? ' visible' : ''}`}>
      <div className="header-inner">
        <nav className="navbar">
          <div className="navbar-pill">
            <button
              className="navbar-toggler"
              aria-label="Toggle navigation"
              onClick={e => { e.stopPropagation(); setMenuOpen(o => !o); }}
            >
              <span className="navbar-toggler-icon" />
            </button>
            <ul className={`navbar-nav${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(false)}>
              <li className="nav-item"><a className="nav-link active" href="#boda">{t('nav.boda')}</a></li>
              <li className="nav-item"><a className="nav-link" href="#nosotros">{t('nav.nosotros')}</a></li>
              <li className="nav-item"><a className="nav-link" href="#vestimenta">{t('nav.vestimenta')}</a></li>
              <li className="nav-item"><a className="nav-link" href="#regalos">{t('nav.regalo')}</a></li>
              <li className="nav-item"><a className="nav-link" href="#rsvp">{t('nav.rsvp')}</a></li>
            </ul>
          </div>
        </nav>
        <div className="lang-switcher" onClick={e => e.stopPropagation()}>
          <div className={`lang-pill${langOpen ? ' open' : ''}`}>
            <button
              className="lang-toggler"
              aria-label="Select language"
              onClick={() => setLangOpen(o => !o)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </button>
            <ul className={`lang-nav${langOpen ? ' open' : ''}`}>
              <li className="lang-item"><button className="nav-link" onClick={() => changeLanguage('es')}>ES</button></li>
              <li className="lang-item"><button className="nav-link" onClick={() => changeLanguage('en')}>EN</button></li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
