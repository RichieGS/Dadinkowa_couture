import { Link, useSearchParams } from 'react-router-dom';
import { categories, filterLooks, type Category, type Look } from '../data';
import { Arrow, MediaLabel } from '../components/Shared';
import { LookCard } from '../components/LookCard';

export function Lookbook({ onOpen }: { onOpen: (look: Look) => void }) {
  const [params, setParams] = useSearchParams();
  const category = categories.includes(params.get('category') as Category)
    ? (params.get('category') as Category)
    : 'All';
  const filtered = filterLooks(category);
  return (
    <main className="page lookbook-page">
      <div className="page-heading">
        <p className="eyebrow">THE EDIT / STYLE INSPIRATION</p>
        <h1>
          Cloth. Form.
          <br />
          <i>Individuality.</i>
        </h1>
        <p>
          Explore a direction. Make it personal.
          <br />
          Ask the team for the current collection and pricing.
        </p>
      </div>
      {filtered.some((look) => look.mediaStatus === 'stock-reference') && (
        <MediaLabel status="stock-reference" className="page-disclosure" />
      )}
      <div className="filters" aria-label="Filter lookbook by category">
        {categories.map((cat) => (
          <button
            aria-pressed={category === cat}
            key={cat}
            onClick={() =>
              setParams(cat === 'All' ? {} : { category: cat }, { preventScrollReset: true })
            }
          >
            {cat}
          </button>
        ))}
      </div>
      <p className="results-count" role="status">
        {filtered.length} {filtered.length === 1 ? 'look' : 'looks'} · {category}
      </p>
      <div className="lookbook-grid" key={category}>
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
