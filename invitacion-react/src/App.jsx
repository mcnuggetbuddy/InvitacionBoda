import { useEffect, useState, lazy, Suspense } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import './i18n';
import './estilos.css';

import Preloader from './components/Preloader';
import Header from './components/Header';
import Animation from './components/Animation';
import Boda from './components/Boda';
import Versiculo from './components/Versiculo';

const Nosotros = lazy(() => import('./components/Nosotros'));
const Vestimenta = lazy(() => import('./components/Vestimenta'));
const Regalos = lazy(() => import('./components/Regalos'));
const Rsvp = lazy(() => import('./components/Rsvp'));
const Footer = lazy(() => import('./components/Footer'));

const R2 = 'https://pub-848e497284a14e3babf4a1c6d1838bf0.r2.dev/';
const CRITICAL_BG = `${R2}background.jpeg`;
const SECONDARY_BG = [
  `${R2}foto-versiculo.jpg`,
  `${R2}foto-vestimenta.jpg`,
  `${R2}foto_rsvp.jpg`,
];

function preloadImage(src) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = resolve;
    img.src = src;
  });
}

export default function App() {
  const [animationData, setAnimationData] = useState(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const savedScroll = sessionStorage.getItem('scrollRestore');
    if (savedScroll !== null) sessionStorage.removeItem('scrollRestore');
    const scrollTarget = savedScroll !== null ? parseInt(savedScroll, 10) : 0;
    const restoringScroll = savedScroll !== null && scrollTarget > window.innerHeight;

    const animationPromise = fetch('/animation.json')
      .then(r => r.json())
      .then(data => {
        const imageAssets = (data.assets || []).filter(a => a.p && typeof a.u === 'string');
        imageAssets.forEach(a => { a.u = R2; });
        return Promise.all(imageAssets.map(a => preloadImage(R2 + a.p))).then(() => data);
      })
      .catch(() => null);

    Promise.all([preloadImage(CRITICAL_BG), animationPromise]).then(([, data]) => {
      setAnimationData(data);
      setReady(true);
      document.getElementById('initial-loader')?.remove();
      if (restoringScroll) {
        setVisible(true);
        window.scrollTo(0, scrollTarget);
      } else if (!data) {
        setVisible(true);
      }
    });

    SECONDARY_BG.forEach(preloadImage);
  }, []);

  function handleAnimationComplete() {
    setVisible(true);
  }

  return (
    <>
      <Preloader hidden={ready} />
      <div className="hero-section">
        <Header visible={visible} />
        <Animation animationData={animationData} onComplete={handleAnimationComplete} />
      </div>
      <div id="page-content" className={`page-content${visible ? ' visible' : ''}`}>
        <Boda />
        <Versiculo />
        <Suspense fallback={null}>
          <Nosotros />
          <Vestimenta />
          <Regalos />
          <Rsvp />
          <Footer />
        </Suspense>
      </div>
      <SpeedInsights />
      <Analytics />
    </>
  );
}
