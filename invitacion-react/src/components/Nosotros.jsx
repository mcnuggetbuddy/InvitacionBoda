import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const R2 = 'https://pub-848e497284a14e3babf4a1c6d1838bf0.r2.dev/';
const slides = [
  { src: `${R2}Israel&Paula-76.jpg`, alt: 'Israel y Paula' },
  { src: `${R2}Israel&Paula-46.jpg`, alt: 'Israel y Paula' },
  { src: `${R2}Israel&Paula-52.jpg`, alt: 'Israel y Paula' },
  { src: `${R2}Israel&Paula-106.jpg`, alt: 'Israel y Paula' },
];

export default function Nosotros() {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent(i => (i + 1) % slides.length), 3000);
    return () => clearInterval(timer);
  }, []);

  const touchStartX = useRef(null);

  function prev() { setCurrent(i => (i - 1 + slides.length) % slides.length); }
  function next() { setCurrent(i => (i + 1) % slides.length); }

  function onTouchStart(e) { touchStartX.current = e.touches[0].clientX; }
  function onTouchEnd(e) {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    touchStartX.current = null;
  }

  return (
    <section id="nosotros" className="nosotros-section">
      <div className="nosotros-grid">
        <div className="nosotros-text">
          <h2>{t('nosotros.titulo')}</h2>
          <p>{t('nosotros.descripcion')}</p>
        </div>
        <div className="nosotros-main-image">
          <img src={`${R2}Israel&Paula-69.jpg`} alt="Israel y Paula" />
        </div>
      </div>
      <div className="nosotros-carousel" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div className="carousel-indicators">
          {slides.map((_, i) => (
            <button key={i} type="button" data-bs-target="#nosotrosCarousel" className={i === current ? 'active' : ''} onClick={() => setCurrent(i)} />
          ))}
        </div>
        <div className="carousel-inner">
          {slides.map((s, i) => (
            <div key={i} className={`carousel-item${i === current ? ' active' : ''}`}>
              <img src={s.src} alt={s.alt} className="d-block nosotros-carousel-img" />
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" onClick={prev}>
          <span className="carousel-control-prev-icon" aria-hidden="true" />
        </button>
        <button className="carousel-control-next" type="button" onClick={next}>
          <span className="carousel-control-next-icon" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
