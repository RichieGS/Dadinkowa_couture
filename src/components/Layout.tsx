import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { business, media, whatsappUrl } from '../data';
import { useDialog } from '../hooks/useDialog';
import { Arrow, External, SectionLink } from './Shared';

export function Header() {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(() => window.scrollY > 40);
  const ref = useRef<HTMLDialogElement>(null);
  const location = useLocation();
  const { phase, dismissForNavigation, ...events } = useDialog(menu, ref, () => setMenu(false));
  useEffect(() => setMenu(false), [location.pathname, location.hash]);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  const nav = (
    <>
      <NavLink to="/lookbook">Collections</NavLink>
      <SectionLink id="atelier" home>
        Atelier
      </SectionLink>
      <NavLink to="/contact">Contact</NavLink>
    </>
  );
  return (
    <>
      <header
        className={`site-header ${location.pathname === '/' && !scrolled ? 'over-hero' : 'solid'}`}
      >
        <Link to="/" className="brand" aria-label="Dadinkowa Couture home">
          <span className="brand-symbol" aria-hidden="true">
            <img src={media.logo.src} width="100" height="100" alt="" />
          </span>
          <span className="brand-wordmark" aria-hidden="true">
            <span>DADINKOWA</span>
            <span>COUTURE</span>
          </span>
        </Link>
        <nav aria-label="Main navigation" className="desktop-nav">
          {nav}
        </nav>
        <External href={whatsappUrl()} className="header-enquire">
          Discuss your look <Arrow />
        </External>
        <button
          className="menu-toggle"
          onClick={() => setMenu(true)}
          aria-haspopup="dialog"
          aria-expanded={menu}
        >
          Menu <span aria-hidden="true">☰</span>
        </button>
      </header>
      <dialog
        ref={ref}
        className={`mobile-menu modal-${phase}`}
        aria-labelledby="menu-title"
        {...events}
      >
        <div className="menu-top">
          <span id="menu-title">DADINKOWA COUTURE</span>
          <button onClick={() => setMenu(false)}>Close ×</button>
        </div>
        <nav
          aria-label="Mobile navigation"
          onClick={(event) => {
            if (
              (event.target as HTMLElement).closest('a') &&
              !event.metaKey &&
              !event.ctrlKey &&
              !event.shiftKey &&
              !event.altKey
            )
              dismissForNavigation();
          }}
        >
          <Link to="/">Home</Link>
          {nav}
          <Link to="/contact">
            Discuss your look <Arrow />
          </Link>
        </nav>
        <p>OFFA, KWARA · PERSONAL EXPRESSION</p>
      </dialog>
    </>
  );
}
export function Footer() {
  return (
    <footer>
      <p className="footer-wordmark">
        DADINKOWA <span>COUTURE</span>
      </p>
      <div className="footer-main">
        <div>
          <p className="eyebrow">DADINKOWA COUTURE / OFFA</p>
          <h2>
            Let’s talk
            <br />
            <i>about your next look.</i>
          </h2>
          <Link to="/contact" className="text-link">
            Start a conversation <Arrow />
          </Link>
        </div>
        <div className="footer-contact">
          <p>{business.address}</p>
          <a href={`tel:${business.phoneRaw}`}>{business.phone}</a>
          <External href={business.map}>
            Get directions <Arrow />
          </External>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Dadinkowa Couture</span>
        <div>
          {Object.entries(business.socials).map(([name, url]) => (
            <External key={name} href={url}>
              {name} <Arrow />
            </External>
          ))}
        </div>
        <span>Preview · provisional logo</span>
      </div>
    </footer>
  );
}
