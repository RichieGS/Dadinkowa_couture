import {
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type KeyboardEvent,
  type TouchEvent,
} from 'react';
import { looks, type Look } from '../data';
import { useReducedMotion } from '../hooks/useMotion';
import { Arrow, MediaLabel, Photography } from './Shared';

export const galleryLooks = [looks[2], looks[3], looks[5]];

export function GarmentGallery({ onOpen }: { onOpen: (look: Look) => void }) {
  const [active, setActive] = useState(1);
  const reduced = useReducedMotion();
  const stage = useRef<HTMLDivElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const frame = useRef(0);
  const swiped = useRef(false);
  const look = galleryLooks[active];
  const select = (index: number) => setActive((index + galleryLooks.length) % galleryLooks.length);
  const move = (step: number) =>
    setActive((index) => (index + step + galleryLooks.length) % galleryLooks.length);
  const resetDepth = () => {
    cancelAnimationFrame(frame.current);
    frame.current = 0;
    stage.current?.querySelectorAll<HTMLElement>('.gallery-photo').forEach((element) => {
      element.style.setProperty('--tilt-x', '0deg');
      element.style.setProperty('--tilt-y', '0deg');
    });
  };
  useEffect(() => {
    resetDepth();
  }, [active, reduced]);
  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const tilt = (event: PointerEvent<HTMLButtonElement>, current: boolean) => {
    if (
      !current ||
      reduced ||
      event.pointerType !== 'mouse' ||
      !window.matchMedia?.('(hover: hover)').matches
    )
      return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    const x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2));
    const y = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2));
    const layer = event.currentTarget.querySelector<HTMLElement>('.gallery-photo');
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      layer?.style.setProperty('--tilt-x', `${-y * 4}deg`);
      layer?.style.setProperty('--tilt-y', `${x * 4}deg`);
    });
  };
  const keys = (event: KeyboardEvent<HTMLElement>) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      move(1);
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      move(-1);
    }
    if (event.key === 'Home') {
      event.preventDefault();
      select(0);
    }
    if (event.key === 'End') {
      event.preventDefault();
      select(galleryLooks.length - 1);
    }
  };
  const swipe = (event: TouchEvent<HTMLDivElement>) => {
    const start = touch.current;
    touch.current = null;
    if (!start || !event.changedTouches[0]) return;
    const dx = event.changedTouches[0].clientX - start.x;
    const dy = event.changedTouches[0].clientY - start.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.25) {
      swiped.current = true;
      move(dx < 0 ? 1 : -1);
    }
  };

  return (
    <section
      id="garment-gallery"
      className="section garment-gallery"
      aria-labelledby="gallery-heading"
      aria-roledescription="carousel"
      onKeyDown={keys}
      data-reduced={reduced}
      data-sequence
    >
      <div className="gallery-heading">
        <div>
          <p className="eyebrow">02 / AN EXHIBITION IN CLOTH</p>
          <h2 id="gallery-heading" data-sequence-part="heading">
            The Garment <i>Gallery.</i>
          </h2>
        </div>
        <p>Three garment references. Bring one forward and explore its details.</p>
      </div>
      <div className="gallery-presentation">
        <div
          className="gallery-stage"
          data-sequence-part="image"
          ref={stage}
          onTouchStart={(event) => {
            swiped.current = false;
            const point = event.touches[0];
            if (point) touch.current = { x: point.clientX, y: point.clientY };
          }}
          onTouchEnd={swipe}
          onTouchCancel={() => {
            touch.current = null;
          }}
        >
          <div className="gallery-backdrop" aria-hidden="true" />
          <div className="gallery-floor" aria-hidden="true" />
          {galleryLooks.map((item, index) => {
            const offset = (index - active + galleryLooks.length) % galleryLooks.length;
            const position = offset === 0 ? 'current' : offset === 1 ? 'next' : 'previous';
            return (
              <button
                key={item.id}
                className="gallery-panel"
                data-position={position}
                aria-label={offset === 0 ? `Inspect ${item.title}` : `Bring ${item.title} forward`}
                aria-describedby="gallery-instructions"
                aria-hidden={reduced && offset !== 0 ? true : undefined}
                tabIndex={reduced && offset !== 0 ? -1 : 0}
                onPointerDown={(event) => {
                  if (event.pointerType === 'mouse') swiped.current = false;
                }}
                onClick={(event) => {
                  if (swiped.current && event.detail > 0) {
                    swiped.current = false;
                    return;
                  }
                  if (offset === 0) onOpen(item);
                  else select(index);
                }}
                onPointerMove={(event) => tilt(event, offset === 0)}
                onPointerLeave={resetDepth}
              >
                <span className="gallery-photo">
                  <Photography {...item.images[0]} />
                </span>
                <span className="gallery-plinth" aria-hidden="true" />
              </button>
            );
          })}
        </div>
        <div className="gallery-caption">
          <div
            className="gallery-description"
            data-sequence-part="copy"
            aria-live="polite"
            aria-atomic="true"
          >
            <p className="eyebrow">
              {look.category} / {String(active + 1).padStart(2, '0')} OF 03
            </p>
            <h3>{look.title}</h3>
            <MediaLabel status={look.mediaStatus} />
          </div>
          <div className="gallery-actions">
            <div className="gallery-controls" aria-label="Garment Gallery controls">
              <button onClick={() => move(-1)} aria-label="Previous gallery look">
                ←
              </button>
              <span aria-hidden="true">{String(active + 1).padStart(2, '0')} / 03</span>
              <button onClick={() => move(1)} aria-label="Next gallery look">
                →
              </button>
            </div>
            <button className="button dark" onClick={() => onOpen(look)}>
              Explore this look <Arrow />
            </button>
          </div>
          <p className="gallery-cue" id="gallery-instructions">
            <span aria-hidden="true">← &nbsp; →</span> Swipe or use the arrows to explore.
          </p>
          <p className="gallery-note">
            One reference view per look. Ask the team about your preferred style.
          </p>
        </div>
      </div>
    </section>
  );
}
