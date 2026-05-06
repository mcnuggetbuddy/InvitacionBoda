import { useEffect, useState } from 'react';
import './i18n';
import './estilos.css';

import Preloader from './components/Preloader';
import Header from './components/Header';
import Animation from './components/Animation';
import Boda from './components/Boda';
import Versiculo from './components/Versiculo';
import Nosotros from './components/Nosotros';
import Vestimenta from './components/Vestimenta';
import Regalos from './components/Regalos';
import Rsvp from './components/Rsvp';
import Footer from './components/Footer';

const R2 = 'https://pub-848e497284a14e3babf4a1c6d1838bf0.r2.dev/';

const BG_IMAGES = [
  `${R2}background.jpeg`,
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

    Promise.all([
      fetch('/animation.json').then(r => r.json()).then(data => {
        const imageAssets = (data.assets || []).filter(a => a.p && typeof a.u === 'string');
        imageAssets.forEach(a => { a.u = R2; });
        return Promise.all(imageAssets.map(a => preloadImage(R2 + a.p))).then(() => data);
      }).catch(() => null),
      ...BG_IMAGES.map(preloadImage),
    ]).then(([data]) => {
      setAnimationData(data);
      const scrollTarget = savedScroll !== null ? parseInt(savedScroll, 10) : 0;
      if (savedScroll !== null && scrollTarget > window.innerHeight) {
        setReady(true);
        setVisible(true);
        window.scrollTo(0, scrollTarget);
      } else {
        setReady(true);
      }
    }).catch(() => {
      setReady(true);
      setVisible(true);
    });
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
        <Nosotros />
        <Vestimenta />
        <Regalos />
        <Rsvp />
        <Footer />
      </div>
    </>
  );
}
