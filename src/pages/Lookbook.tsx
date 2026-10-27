import { useLayoutEffect, useRef } from 'react';
import { TextReveal, RevealHeading } from '../components/TextReveal';
import { Link, useSearchParams } from 'react-router-dom';
import { categories, filterLooks, looks, type Category, type Look } from '../data';
import { Arrow, MediaLabel } from '../components/Shared';
import { LookCard } from '../components/LookCard';

export function Lookbook({ onOpen }: { onOpen: (look: Look) => void }) {
  const [params, setParams] = useSearchParams();
  const results = useRef<HTMLHeadingElement>(null);
  const explicitChange = useRef(false);
  const category = categories.includes(params.get('category') as Category)
    ? (params.get('category') as Category)
    : 'All';
  const filtered = filterLooks(category);
  const changeCategory = (value: Category) => {
    if (value === category) return;
    explicitChange.current = true;
    setParams(value === 'All' ? {} : { category: value }, { preventScrollReset: true });
  };
  useLayoutEffect(() => {
    if (!explicitChange.current) return;
    explicitChange.current = false;
    results.current?.scrollIntoView({ block: 'start', behavior: 'instant' });
    results.current?.focus({ preventScroll: true });
  }, [category]);
  return (
    <main className="page lookbook-page">
      <TextReveal className="page-heading">
        <p className="eyebrow">THE LIVING ATELIER / AI CONCEPTS</p>
        <RevealHeading as="h1">The Dadinkowa Edit</RevealHeading>
        <p className="collection-tagline">
          <i>Cloth. Form. Identity.</i>
        </p>
        <p>
          Explore a direction. Make it personal. {looks.length} generated concepts across five
          categories. Discuss whether something similar is possible.
        </p>
      </TextReveal>
      <MediaLabel status="ai-concept" className="page-disclosure" />
      <div className="collection-category-bar">
        <div className="filters" aria-label="Filter lookbook by category">
          {categories.map((cat) => (
            <button key={cat} aria-pressed={category === cat} onClick={() => changeCategory(cat)}>
              {cat} ({filterLooks(cat).length})
            </button>
          ))}
        </div>
        <div className="mobile-category-control">
          <label htmlFor="collection-category">Collection category</label>
          <select
            id="collection-category"
            value={category}
            onChange={(event) => changeCategory(event.target.value as Category)}
          >
            {categories.map((cat) => (
              <option value={cat} key={cat}>
                {cat} ({filterLooks(cat).length})
              </option>
            ))}
          </select>
        </div>
      </div>
      <h2 className="results-heading" ref={results} tabIndex={-1}>
        {category === 'All' ? 'All concepts' : category}
      </h2>
      <p className="results-count" role="status">
        {filtered.length} {filtered.length === 1 ? 'look' : 'looks'} · {category}
      </p>
      <div className="lookbook-grid">
        {filtered.map((look, index) => (
          <LookCard look={look} key={look.id} index={index} onOpen={onOpen} />
        ))}
      </div>
      {!filtered.length && (
        <p>
          No looks in this category yet. <Link to="/contact">Ask about current options.</Link>
        </p>
      )}
      <div className="lookbook-end">
        <span className="eyebrow">YOUR STYLE STARTS WITH A CONVERSATION</span>
        <Link to="/contact" className="text-link">
          Discuss an idea of your own <Arrow />
        </Link>
      </div>
    </main>
  );
}
