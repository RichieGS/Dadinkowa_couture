import { TextReveal, RevealHeading } from './TextReveal';
import { Link } from 'react-router-dom';
import { concepts } from '../data';
import { Arrow, MediaLabel, Photography, SectionLink } from './Shared';

export function Hero() {
  return (
    <section className="living-hero" aria-label="Living Atelier">
      <div className="living-fabric" aria-hidden="true">
        <Photography {...concepts.folds} eager alt="" />
      </div>
      <div className="living-light" aria-hidden="true" />
      <TextReveal className="living-copy" hero>
        <p className="eyebrow">DADINKOWA COUTURE · OFFA, NIGERIA</p>
        <RevealHeading as="h1">
          Cloth. <br className="desktop-break" />
          Form. <br className="desktop-break" />
          <i>Identity.</i>
        </RevealHeading>
        <p className="living-description">
          Tailoring, fabrics and personal expression. Offa, Nigeria.
        </p>
        <div className="living-actions">
          <SectionLink id="collections" className="button light">
            Explore the collection <Arrow />
          </SectionLink>
          <Link to="/contact" className="text-link">
            Discuss your look <Arrow />
          </Link>
        </div>
      </TextReveal>
      <div className="living-garment">
        <Photography {...concepts.burgundy} eager />
      </div>
      <div className="living-disclosure">
        <MediaLabel status="ai-concept" />
        <span>Garment and fabric imagery are conceptual.</span>
      </div>
    </section>
  );
}
