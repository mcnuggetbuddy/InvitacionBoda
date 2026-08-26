import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const R2 = 'https://pub-848e497284a14e3babf4a1c6d1838bf0.r2.dev/';
const slides = [
  { src: `${R2}Israel&Paula-69.jpg`, alt: 'Israel y Paula' },
  { src: `${R2}Israel&Paula-76.jpg`, alt: 'Israel y Paula' },
  { src: `${R2}Israel&Paula-46.jpg`, alt: 'Israel y Paula' },
  { src: `${R2}Israel&Paula-52.jpg`, alt: 'Israel y Paula' },
  { src: `${R2}Israel&Paula-106.jpg`, alt: 'Israel y Paula' },
];

const AUTOPLAY_MS = 3500;

export default function Nosotros() {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  useEffect(() => {
    if (!sectionRef.current || hasStarted) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setHasStarted(true);
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (paused || !hasStarted) return;
    const timer = setTimeout(() => setCurrent(i => (i + 1) % slides.length), AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [current, paused, hasStarted]);

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
    <section id="nosotros" className="nosotros-section" ref={sectionRef}>
      <div className="nosotros-grid">
        <div className="nosotros-text">
          <h2>{t('nosotros.titulo')}</h2>
          {t('nosotros.descripcion').split('\n\n').map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div
          className="nosotros-main-image nosotros-carousel"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="carousel-indicators">
            {slides.map((_, i) => (
              <button key={i} type="button" className={i === current ? 'active' : ''} onClick={() => setCurrent(i)} />
            ))}
          </div>
          <div className="carousel-inner">
            {slides.map((s, i) => (
              <div key={i} className={`carousel-item${i === current ? ' active' : ''}`}>
                <img src={s.src} alt={s.alt} className="d-block" />
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
      </div>
    </section>
  );
}
