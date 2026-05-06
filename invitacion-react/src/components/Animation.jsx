import { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';

export default function Animation({ animationData, onComplete }) {
  const containerRef = useRef(null);
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    if (!animationData || !containerRef.current) return;

    const anim = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      animationData,
    });

    anim.addEventListener('complete', () => {
      setShowArrow(true);
      onComplete?.();
    });

    return () => anim.destroy();
  }, [animationData]);

  if (!animationData) return null;

  return (
    <section className="animation-section">
      <div ref={containerRef} className="lottie-wrapper played" />
      <div id="scroll-arrow" className={`scroll-arrow${showArrow ? ' visible' : ''}`}>↓</div>
    </section>
  );
}
