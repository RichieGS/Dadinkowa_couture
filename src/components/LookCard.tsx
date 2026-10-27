import { type CSSProperties } from 'react';
import type { Look } from '../data';
import { mediaCopy } from '../media';
import { Arrow, MediaLabel, Photography } from './Shared';

export function LookCard({
  look,
  onOpen,
  index = 0,
}: {
  look: Look;
  onOpen: (look: Look) => void;
  index?: number;
}) {
  return (
    <article
      className={`look-card category-${look.category.toLowerCase().replaceAll(/[^a-z]/g, '')} look-${index % 5}`}
      style={{ '--card-delay': `${Math.min(index, 4) * 20}ms` } as CSSProperties}
    >
      <button
        className="look-image"
        onClick={() => onOpen(look)}
        aria-label={`View look: ${look.title}`}
      >
        <Photography {...look.images[0]} />
        {look.images[1] && <Photography {...look.images[1]} className="alternate" />}
        <span className="inspect">
          View look <Arrow />
        </span>
      </button>
      <div className="look-meta">
        <span className="eyebrow">{look.category}</span>
        <span>{look.id}</span>
      </div>
      <h3>
        <button onClick={() => onOpen(look)}>
          {look.title} <Arrow />
        </button>
      </h3>
      <MediaLabel status={look.mediaStatus} />
      <span className="sr-only">{mediaCopy(look.mediaStatus).short}</span>
    </article>
  );
}
