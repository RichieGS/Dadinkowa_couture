import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Look } from '../data';
import { mediaCopy } from '../media';
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
      className={`look-dialog modal-${phase}`}
      aria-labelledby="look-title"
      {...events}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') move(1);
        if (event.key === 'ArrowLeft') move(-1);
      }}
    >
      <button className="dialog-close" onClick={onClose} aria-label="Close look details">
        Close ×
      </button>
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
          <p className="image-caption" aria-live="polite">
            {imageIndex + 1} / {displayed.images.length} · {displayed.images[imageIndex].caption}
          </p>
          <div className="image-controls">
            <button
              disabled={displayed.images.length < 2}
              onClick={() => move(-1)}
              aria-label="Previous image"
            >
              ← Previous
            </button>
            <span>{displayed.images.length < 2 ? 'Single photograph' : 'Use arrow keys'}</span>
            <button
              disabled={displayed.images.length < 2}
              onClick={() => move(1)}
              aria-label="Next image"
            >
              Next →
            </button>
          </div>
          <p>Enquire for availability and pricing.</p>
          <Link
            className="button dark"
            to={`/contact?look=${encodeURIComponent(displayed.slug)}`}
            onClick={dismissForNavigation}
          >
            Enquire about this look <Arrow />
          </Link>
          <small>{mediaCopy(displayed.mediaStatus).short} · no order is placed here.</small>
        </div>
      </div>
    </dialog>
  );
}
