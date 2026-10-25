import { useEffect, useState } from 'react';

export function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () =>
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  useEffect(() => {
    if (!window.matchMedia) return;
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return reduced;
}

// Content is visible by default. Animation is opt-in at the moment of entry;
// a missing observer or CSS never leaves content hidden.
export function useEditorialMotion(route: string) {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [route, reduced]);

  useEffect(() => {
    if (reduced || !window.matchMedia?.('(min-width: 1000px)').matches) return;
    const elements = [...document.querySelectorAll<HTMLElement>('[data-parallax]')];
    let frame = 0;
    const update = () => {
      frame = 0;
      elements.forEach((element) => {
        const bounds = element.getBoundingClientRect();
        if (bounds.bottom > 0 && bounds.top < window.innerHeight) {
          const progress =
            (window.innerHeight / 2 - (bounds.top + bounds.height / 2)) / window.innerHeight;
          element.style.setProperty(
            '--parallax',
            `${Math.max(-24, Math.min(24, progress * 40))}px`,
          );
        }
      });
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', scroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', scroll);
      cancelAnimationFrame(frame);
      elements.forEach((element) => element.style.removeProperty('--parallax'));
    };
  }, [route, reduced]);
}
