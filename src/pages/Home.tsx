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
        <div className="living-detail-copy">
          <p className="eyebrow">01 / A CLOSER LOOK</p>
          <h2 data-sequence-part="heading">
            The art is
            <br /> in <i>the detail.</i>
          </h2>
          <div data-sequence-part="copy">
            <p>
              Raised lines. Tonal texture. A different rhythm in every fold. A conceptual study of
              colour and surface.
            </p>
            <MediaLabel status="ai-concept" />
            <p className="small-note">Generated fabric detail · conceptual imagery.</p>
          </div>
        </div>
      </section>
      <section id="collections" tabIndex={-1} className="living-collection section">
        <div className="living-collection-heading" data-reveal="text">
          <p className="eyebrow">02 / FORM & EXPRESSION</p>
          <h2>
            Three studies.
            <br />
            <i>Your point of view.</i>
          </h2>
          <p>
            Explore silhouette, colour and proportion. Discuss what might be possible with the team.
          </p>
        </div>
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
              <div className="living-look-copy">
                <p className="eyebrow">CONCEPT / {look.id}</p>
                <h3 data-sequence-part="heading">{look.title}</h3>
                <div data-sequence-part="copy">
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
              </div>
            </article>
          ))}
        </div>
        <Link to="/lookbook" className="text-link">
          Explore all concepts <Arrow />
        </Link>
      </section>
      <section id="atelier" tabIndex={-1} className="living-atelier section" data-sequence>
        <p className="eyebrow">03 / THE ATELIER · OFFA</p>
        <h2 data-sequence-part="heading">
          Begin with
          <br />
          <i>a conversation.</i>
        </h2>
        <div data-sequence-part="copy">
          <p>
            Bring an idea, a colour or a style reference. Discuss fabric, fit and timing directly
            with Dadinkowa Couture.
          </p>
          <p>
            Services and enquiries: tailoring, ready-to-wear, fabrics, caps and accessories. Ask the
            team about current options.
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
      </section>
    </>
  );
}
