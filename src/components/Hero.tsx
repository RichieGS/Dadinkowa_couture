import { useCallback, useEffect, useRef, useState, type SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { media } from '../data';
import { motion } from '../motion';
import { useStagedHero } from '../hooks/useStagedHero';
import { useReducedMotion } from '../hooks/useMotion';
import { Arrow, MediaLabel, Photography, SectionLink } from './Shared';

export function Hero() {
  const reduced = useReducedMotion();
  const readiness = useRef(new Map<number, Promise<void>>());
  const prepare = useCallback((index: number) => {
    if (typeof Image.prototype.decode !== 'function') return undefined;
    if (!readiness.current.has(index)) {
      const image = new Image();
      image.sizes = '(max-width: 700px) 100vw, 65vw';
      image.srcset = media.hero[index].srcSet ?? '';
      image.src = media.hero[index].src;
      readiness.current.set(
        index,
        image.decode().catch(() => {}),
      );
    }
    return readiness.current.get(index);
  }, []);
  useEffect(() => {
    media.hero.forEach((_, index) => {
      void prepare(index);
    });
  }, [prepare]);

  const { displayed, selected, phase, cycle, request, settle } = useStagedHero(
    media.hero.length,
    reduced,
    prepare,
  );
  const [playing, setPlaying] = useState(() => !reduced && !document.hidden);
  const change = (index: number) => {
    setPlaying(false);
    request(index);
  };

  useEffect(() => {
    const stop = () => {
      if (document.hidden) {
        setPlaying(false);
        settle();
      }
    };
    document.addEventListener('visibilitychange', stop);
    return () => document.removeEventListener('visibilitychange', stop);
  }, [settle]);
  useEffect(() => {
    if (reduced) setPlaying(false);
  }, [reduced]);
  useEffect(() => {
    if (!playing || reduced || document.hidden || phase !== 'settled') return;
    const timer = window.setTimeout(() => request(displayed + 1), motion.heroHold);
    return () => window.clearTimeout(timer);
  }, [displayed, phase, playing, reduced, request]);

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
      <div className="hero-art" data-phase={phase}>
        <div className="hero-slide is-active">
          <Photography key={displayed} {...media.hero[displayed]} eager />
        </div>
        <div className="hero-curtain" key={cycle} aria-hidden="true" />
      </div>
      <div className="hero-shade" />
      <div className="hero-copy" data-phase={phase}>
        <div className="hero-reading" key={displayed}>
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
        </div>
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
          <button onClick={() => change(selected - 1)} aria-label="Previous hero photograph">
            ←
          </button>
          {media.hero.map((photo, index) => (
            <button
              key={photo.src}
              onClick={() => change(index)}
              aria-label={`Show hero photograph ${index + 1}`}
              aria-pressed={index === selected}
            >
              0{index + 1}
            </button>
          ))}
          <button onClick={() => change(selected + 1)} aria-label="Next hero photograph">
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
          Photograph {displayed + 1} of {media.hero.length}
          {reduced ? '. Slideshow disabled for reduced motion.' : ''}
        </span>
      </div>
      <MediaLabel status="stock-reference" className="hero-disclosure" />
    </section>
  );
}
