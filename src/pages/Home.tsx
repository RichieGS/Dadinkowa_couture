import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { business, exhibitionPhotos, photos, socialPosts, type Look } from '../data';
import { Hero } from '../components/Hero';
import { Arrow, External, MediaLabel, Photography } from '../components/Shared';
import { GarmentGallery } from '../components/GarmentGallery';

const collections = [
  {
    category: 'Tailoring',
    title: 'Made for\nyour own expression.',
    photo: exhibitionPhotos.blue,
    note: 'TAILORING & NATIVE STYLES',
  },
  {
    category: 'Fabrics',
    title: 'Begin with the cloth.',
    photo: photos.fabrics,
    note: 'COLOUR / TEXTURE / POSSIBILITY',
  },
  {
    category: 'Ready-to-Wear',
    title: 'Everyday. Elevated.',
    photo: exhibitionPhotos.earth,
    note: 'READY-TO-WEAR',
  },
  {
    category: 'Caps & Accessories',
    title: 'A final point of view.',
    photo: exhibitionPhotos.cap,
    note: 'CAPS & ACCESSORIES',
  },
];

export function Home({ onOpen }: { onOpen: (look: Look) => void }) {
  return (
    <>
      <Hero />
      <section id="collections" tabIndex={-1} className="section collection-section">
        <div className="collection-intro" data-reveal="text">
          <p className="eyebrow">01 / THE COLLECTIONS</p>
          <h2>
            A wardrobe.
            <br />
            <i>A point of view.</i>
          </h2>
          <p>
            For the everyday. For the occasion.
            <br />
            For the way you want to feel.
          </p>
        </div>
        <div className="collection-grid">
          {collections.map((item, index) => (
            <Link
              className={`collection-panel panel-${index}`}
              key={item.category}
              to={`/lookbook?category=${encodeURIComponent(item.category)}`}
              style={{ '--stagger': `${index * 90}ms` } as CSSProperties}
            >
              <div
                className="collection-photo"
                data-reveal="image"
                data-parallax={index === 0 ? '' : undefined}
              >
                <Photography {...item.photo} />
                <span className="panel-number">0{index + 1}</span>
                <span className="panel-action">
                  Explore <Arrow />
                </span>
              </div>
              <p className="eyebrow">{item.note}</p>
              <h3>{item.title}</h3>
              <MediaLabel status="stock-reference" />
            </Link>
          ))}
        </div>
      </section>
      <GarmentGallery onOpen={onOpen} />
      <section className="craft-interlude">
        <div className="craft-photo" data-parallax>
          <div className="craft-reveal" data-reveal="image">
            <Photography {...photos.texture} />
          </div>
        </div>
        <div className="craft-words">
          <p className="eyebrow">A CLOSER LOOK</p>
          <h2>
            It’s all in
            <br />
            <i>the feeling.</i>
          </h2>
        </div>
        <MediaLabel status="stock-reference" />
      </section>
      <section id="atelier" tabIndex={-1} className="atelier section">
        <div className="atelier-image">
          <div className="atelier-photo" data-reveal="image">
            <Photography {...photos.sewing} />
          </div>
          <MediaLabel status="stock-reference" />
          <p className="small-note">Tailoring reference photography · not Dadinkowa’s workshop.</p>
        </div>
        <div className="atelier-copy" data-reveal="text">
          <p className="eyebrow">03 / THE ATELIER</p>
          <h2>
            A conversation
            <br />
            before <i>the cloth.</i>
          </h2>
          <p>
            Start with an idea, a style reference, or a fabric that catches your eye. Explore
            tailoring, fabrics and finishing touches with Dadinkowa Couture in Offa.
          </p>
          <ol>
            {[
              'Tell us what you have in mind',
              'Discuss fabric, measurements and timing',
              'Confirm the details directly with the team',
            ].map((text, index) => (
              <li key={text}>
                <span>0{index + 1}</span>
                {text}
              </li>
            ))}
          </ol>
          <Link className="text-link" to="/contact?interest=Tailoring">
            Discuss your look <Arrow />
          </Link>
        </div>
      </section>
      <section className="section notes">
        <div className="row-heading" data-reveal="text">
          <div>
            <p className="eyebrow">04 / FROM THE BRAND</p>
            <h2>
              Notes from <i>Offa.</i>
            </h2>
          </div>
          <External href={business.socials.TikTok} className="text-link">
            Follow on TikTok <Arrow />
          </External>
        </div>
        <div className="notes-grid">
          {socialPosts.map((post) => (
            <External href={post.url} key={post.url} className="social-note">
              <span className="eyebrow">{post.label}</span>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <span className="text-link">
                View original post <Arrow />
              </span>
            </External>
          ))}
        </div>
      </section>
      <section className="home-contact section">
        <p className="eyebrow">YOUR NEXT LOOK STARTS HERE</p>
        <h2>
          Have something
          <br />
          <i>in mind?</i>
        </h2>
        <div>
          <p>
            A fabric question. A style reference.
            <br />
            Let’s begin with a conversation.
          </p>
          <Link to="/contact" className="button light">
            Discuss your look <Arrow />
          </Link>
        </div>
      </section>
    </>
  );
}
