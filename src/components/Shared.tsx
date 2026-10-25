import { useState, type ReactNode, type CSSProperties, type MouseEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { mediaCopy, type MediaStatus } from '../media';
import type { Photo } from '../data';

export function External({
  href,
  children,
  className = '',
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
export function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export function Photography({
  src,
  alt,
  srcSet,
  width = 1000,
  height = 1400,
  position = '50% 35%',
  available = true,
  slot,
  className = '',
  eager = false,
}: Photo & { className?: string; eager?: boolean }) {
  const [failed, setFailed] = useState(false);
  if (!available)
    return (
      <div
        className={`photo-slot ${className}`}
        role="img"
        aria-label={`Photography pending: ${alt}`}
      >
        <span className="slot-corner" aria-hidden="true">
          DC / REFERENCE {slot?.toUpperCase()}
        </span>
        <div>
          <span className="slot-symbol" aria-hidden="true">
            ＋
          </span>
          <span>Photography pending</span>
          <small>Style inspiration awaits the selected photograph.</small>
        </div>
        <span className="slot-file">{slot}.jpg</span>
      </div>
    );
  if (failed)
    return (
      <div
        className={`media-fallback ${className}`}
        role="img"
        aria-label={`Photography unavailable: ${alt}`}
      >
        <span>Photography unavailable</span>
        <small>Explore the edit or discuss your look with the team.</small>
      </div>
    );
  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes="(max-width: 700px) 100vw, 65vw"
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={{ objectPosition: position } as CSSProperties}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : undefined}
      onError={() => setFailed(true)}
    />
  );
}
export function MediaLabel({
  status,
  className = '',
}: {
  status: MediaStatus;
  className?: string;
}) {
  const copy = mediaCopy(status);
  return copy.disclosure ? <p className={`media-label ${className}`}>{copy.disclosure}</p> : null;
}

export function focusSection(id: string) {
  const target = document.getElementById(id);
  target?.scrollIntoView({
    behavior: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
      ? 'instant'
      : 'smooth',
    block: 'start',
  });
  target?.focus({ preventScroll: true });
}

// Router-aware links preserve #/path in the offline preview. Same-page links
// scroll directly instead of overwriting HashRouter's route fragment.
export function SectionLink({
  id,
  children,
  className = '',
  label,
  home = false,
}: {
  id: string;
  children: ReactNode;
  className?: string;
  label?: string;
  home?: boolean;
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const hashRouter = window.location.protocol === 'file:' || window.location.hash.startsWith('#/');
  const href = hashRouter
    ? `#/${home ? '' : location.pathname.slice(1)}#${id}`
    : `${home ? '/' : location.pathname}#${id}`;
  const click = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (home && location.pathname !== '/') navigate(`/#${id}`);
    else focusSection(id);
  };
  return (
    <a href={href} onClick={click} className={className} aria-label={label}>
      {children}
    </a>
  );
}
