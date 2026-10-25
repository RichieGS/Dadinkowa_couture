import { useEffect, useState, type SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { media } from '../data';
import { heroCycle } from '../motion';
import { useReducedMotion } from '../hooks/useMotion';
import { Arrow, MediaLabel, Photography, SectionLink } from './Shared';

export function Hero() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(() => !reduced && !document.hidden);
  const change = (index: number) => {
    setPlaying(false);
    setActive((index + media.hero.length) % media.hero.length);
  };

  useEffect(() => {
    const stop = () => {
      if (document.hidden) setPlaying(false);
    };
    document.addEventListener('visibilitychange', stop);
    return () => document.removeEventListener('visibilitychange', stop);
  }, []);
  useEffect(() => {
    if (reduced) setPlaying(false);
  }, [reduced]);
  useEffect(() => {
    if (!playing || reduced || document.hidden) return;
    const timer = window.setTimeout(
      () => setActive((index) => (index + 1) % media.hero.length),
      heroCycle,
    );
    return () => window.clearTimeout(timer);
  }, [active, playing, reduced]);

  useEffect(() => {
    const stop = (event: Event) => {
      if (!(event.target instanceof Element) || !event.target.closest('.hero-pause'))
        setPlaying(false);
    };
    document.addEventListener('pointerdown', stop, { passive: true });
    document.addEventListener('keydown', stop);
    document.addEventListener('wheel', stop, { passive: true });
    return () => {
      document.removeEventListener('pointerdown', stop);
      document.removeEventListener('keydown', stop);
      document.removeEventListener('wheel', stop);
    };
  }, []);

  const stopOnInteraction = (event: SyntheticEvent) => {
    if (!(event.target as HTMLElement).closest('.hero-pause')) setPlaying(false);
  };
  return (
    <section
      className="hero"
      aria-label="Fashion inspiration"
      onPointerDown={stopOnInteraction}
      onFocusCapture={stopOnInteraction}
    >
      <div className="hero-art">
        {media.hero.map((photo, index) => (
          <div
            className={`hero-slide ${index === active ? 'is-active' : ''}`}
            key={photo.src}
            aria-hidden={index !== active}
          >
            <Photography {...photo} eager={index === 0} />
          </div>
        ))}
      </div>
      <div className="hero-shade" />
      <div className="hero-copy">
        <p className="eyebrow hero-enter" style={{ '--delay': '0ms' } as React.CSSProperties}>
          DADINKOWA COUTURE · OFFA, NIGERIA
        </p>
        <h1>
          <span className="hero-enter" style={{ '--delay': '80ms' } as React.CSSProperties}>
            Considered style.
          </span>
          <i className="hero-enter" style={{ '--delay': '180ms' } as React.CSSProperties}>
            Personal
            <br />
            expression.
          </i>
        </h1>
        <p
          className="hero-enter hero-description"
          style={{ '--delay': '280ms' } as React.CSSProperties}
        >
          Tailoring, fabrics and finishing touches.
          <br />A point of view that’s entirely your own.
        </p>
        <div
          className="hero-links hero-enter"
          style={{ '--delay': '360ms' } as React.CSSProperties}
        >
          <Link to="/lookbook" className="button light">
            Explore the edit <Arrow />
          </Link>
          <Link to="/contact" className="text-link">
            Discuss your look <Arrow />
          </Link>
        </div>
      </div>
      <div className="hero-side-note" aria-hidden="true">
        THE ART OF GETTING DRESSED / DADINKOWA
      </div>
      <div className="hero-bottom">
        <SectionLink id="collections" label="Scroll to discover">
          SCROLL TO DISCOVER <span aria-hidden="true">↓</span>
        </SectionLink>
        <div className="hero-controls" aria-label="Hero slideshow controls">
          <button onClick={() => change(active - 1)} aria-label="Previous hero photograph">
            ←
          </button>
          {media.hero.map((photo, index) => (
            <button
              key={photo.src}
              onClick={() => change(index)}
              aria-label={`Show hero photograph ${index + 1}`}
              aria-pressed={index === active}
            >
              0{index + 1}
            </button>
          ))}
          <button onClick={() => change(active + 1)} aria-label="Next hero photograph">
            →
          </button>
          <button
            className="hero-pause"
            disabled={reduced}
            aria-label={playing && !reduced ? 'Pause slideshow' : 'Play slideshow'}
            aria-pressed={playing && !reduced}
            onClick={() => setPlaying((value) => !value)}
          >
            {playing && !reduced ? 'Ⅱ Pause' : '▷ Play'}
          </button>
        </div>
        <span className="sr-only" role="status">
          Photograph {active + 1} of {media.hero.length}
          {reduced ? '. Slideshow disabled for reduced motion.' : ''}
        </span>
      </div>
      <MediaLabel status="stock-reference" className="hero-disclosure" />
    </section>
  );
}
