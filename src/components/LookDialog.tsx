import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { enquiryLabel, type Look } from '../data';
import { useDialog } from '../hooks/useDialog';
import { Arrow, MediaLabel, Photography } from './Shared';

export function LookDialog({ look, onClose }: { look: Look | null; onClose: () => void }) {
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const lastLook = useRef<Look | null>(null);
  if (look) lastLook.current = look;
  const displayed = look ?? lastLook.current;
  const ref = useRef<HTMLDialogElement>(null);
  const { phase, dismissForNavigation, ...events } = useDialog(!!look, ref, onClose);
  useEffect(() => {
    if (look) {
      setIndex(0);
      setZoom(false);
    }
  }, [look]);
  if (!displayed) return null;
  const imageIndex = Math.min(index, displayed.images.length - 1);
  const hasMedia = displayed.images[imageIndex].available !== false;
  const move = (step: number) => {
    setIndex((current) => (current + step + displayed.images.length) % displayed.images.length);
    setZoom(false);
  };
  return (
    <dialog
      ref={ref}
      className={`look-dialog category-${displayed.category.toLowerCase().replaceAll(/[^a-z]/g, '')} modal-${phase}`}
      aria-labelledby="look-title"
      {...events}
      onKeyDown={(event) => {
        if (displayed.images.length < 2) return;
        if (event.key === 'ArrowRight') move(1);
        if (event.key === 'ArrowLeft') move(-1);
      }}
    >
      <header className="dialog-header">
        <span>
          {displayed.category} · {displayed.id}
        </span>
        <button className="dialog-close" onClick={onClose} aria-label="Close look details">
          Close ×
        </button>
      </header>
      <div className="dialog-scroll-body">
        <div className="dialog-layout">
          <div className={`dialog-visual ${zoom ? 'zoomed' : ''}`}>
            <Photography {...displayed.images[imageIndex]} key={`${displayed.id}-${imageIndex}`} />
            <button
              className="zoom-button"
              disabled={!hasMedia}
              onClick={() => setZoom(!zoom)}
              aria-pressed={zoom}
            >
              {!hasMedia ? 'Zoom available after upload' : zoom ? '− Zoom out' : '+ Zoom in'}
            </button>
          </div>
          <div className="dialog-copy">
            <p className="eyebrow">
              {displayed.category} / LOOK {displayed.id}
            </p>
            <h2 id="look-title">{displayed.title}</h2>
            <p>{displayed.description}</p>
            <MediaLabel status={displayed.mediaStatus} />
            {displayed.images.length > 1 && (
              <>
                <p className="image-caption" aria-live="polite">
                  Image {imageIndex + 1} of {displayed.images.length}
                </p>
                <div className="image-controls">
                  <button onClick={() => move(-1)} aria-label="Previous image">
                    ← Previous
                  </button>
                  <span>Use arrow keys</span>
                  <button onClick={() => move(1)} aria-label="Next image">
                    Next →
                  </button>
                </div>
              </>
            )}
            <p>Discuss feasibility, fabrics and possible alternatives with the team.</p>
          </div>
        </div>
      </div>
      <footer className="dialog-footer">
        {' '}
        <Link
          className="button dark"
          to={`/contact?look=${encodeURIComponent(displayed.slug)}`}
          onClick={dismissForNavigation}
        >
          {enquiryLabel(displayed.category)} <Arrow />
        </Link>
        <span>No order is placed here.</span>
      </footer>
    </dialog>
  );
}
