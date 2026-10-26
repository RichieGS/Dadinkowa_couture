import { TextReveal, RevealHeading } from '../components/TextReveal';
import { Link } from 'react-router-dom';
import { concepts, looks, type Look } from '../data';
import { Hero } from '../components/Hero';
import { Arrow, MediaLabel, Photography } from '../components/Shared';

export function Home({ onOpen }: { onOpen: (look: Look) => void }) {
  return (
    <>
      <Hero />
      <section className="living-detail" data-sequence>
        <div className="living-detail-image" data-sequence-part="image">
          <Photography {...concepts.embroidery} />
        </div>
        <TextReveal className="living-detail-copy">
          <p className="eyebrow">01 / A CLOSER LOOK</p>
          <RevealHeading as="h2">
            The art is
            <br /> in <i>the detail.</i>
          </RevealHeading>
          <div>
            <p>
              Raised lines. Tonal texture. A different rhythm in every fold. A conceptual study of
              colour and surface.
            </p>
            <MediaLabel status="ai-concept" />
            <p className="small-note">Generated fabric detail · conceptual imagery.</p>
          </div>
        </TextReveal>
      </section>
      <section id="collections" tabIndex={-1} className="living-collection section">
        <TextReveal className="living-collection-heading">
          <p className="eyebrow">02 / FORM & EXPRESSION</p>
          <RevealHeading as="h2">
            Three studies.
            <br /> <i>Your point of view.</i>
          </RevealHeading>
          <p>
            Explore silhouette, colour and proportion. Discuss what might be possible with the team.
          </p>
        </TextReveal>
        <div className="living-looks">
          {looks.map((look, index) => (
            <article className={`living-look living-look-${index}`} key={look.id} data-sequence>
              <button
                className="living-look-image"
                onClick={() => onOpen(look)}
                aria-label={`View look: ${look.title}`}
                data-sequence-part="image"
              >
                <span className="concept-light" aria-hidden="true" />
                <Photography {...look.images[0]} />
              </button>
              <TextReveal className="living-look-copy">
                <p className="eyebrow">CONCEPT / {look.id}</p>
                <RevealHeading as="h3">{look.title}</RevealHeading>
                <div>
                  <p>{look.description}</p>
                  <MediaLabel status={look.mediaStatus} />
                  <div className="living-look-actions">
                    <button className="text-link" onClick={() => onOpen(look)}>
                      View concept <Arrow />
                    </button>
                    <Link className="text-link" to={`/contact?look=${look.slug}`}>
                      Discuss this style <Arrow />
                    </Link>
                  </div>
                </div>
              </TextReveal>
            </article>
          ))}
        </div>
        <Link to="/lookbook" className="text-link">
          Explore all concepts <Arrow />
        </Link>
      </section>
      <section id="atelier" tabIndex={-1} className="living-atelier section" data-sequence>
        <p className="eyebrow">03 / THE ATELIER · OFFA</p>
        <TextReveal className="atelier-text-group">
          <RevealHeading as="h2">
            Begin with
            <br /> <i>a conversation.</i>
          </RevealHeading>
          <div>
            <p>
              Bring an idea, a colour or a style reference. Discuss fabric, fit and timing directly
              with Dadinkowa Couture.
            </p>
            <p>
              Services and enquiries: tailoring, ready-to-wear, fabrics, caps and accessories. Ask
              the team about current options.
            </p>
            <ol>
              <li>Share the direction you have in mind.</li>
              <li>Discuss materials, measurements and timing.</li>
              <li>Confirm feasibility and details with the team.</li>
            </ol>
            <Link to="/contact" className="button dark">
              Discuss your look <Arrow />
            </Link>
          </div>
        </TextReveal>
      </section>
    </>
  );
}
