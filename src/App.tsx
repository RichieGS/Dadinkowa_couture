import { useEffect, useRef, useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { business, type Look } from './data';
import { Header, Footer } from './components/Layout';
import { LookDialog } from './components/LookDialog';
import { Arrow, SectionLink, focusSection } from './components/Shared';
import { Home } from './pages/Home';
import { Lookbook } from './pages/Lookbook';
import { Contact } from './pages/Contact';
import { useEditorialMotion } from './hooks/useMotion';
import './styles.css';
import './exhibition.css';
import './refinements.css';

export function App() {
  const location = useLocation();
  const [selected, setSelected] = useState<Look | null>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  useEditorialMotion(location.pathname);

  useEffect(() => {
    const titles: Record<string, string> = {
      '/': 'Tailoring, fabrics & personal expression',
      '/lookbook': 'The edit · Style inspiration',
      '/contact': 'Contact & WhatsApp enquiries',
    };
    document.title = `${titles[location.pathname] || 'Page not found'} | Dadinkowa Couture`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        'content',
        location.pathname === '/contact'
          ? `Contact Dadinkowa Couture at ${business.address}. Call ${business.phone} or start a WhatsApp enquiry.`
          : 'Explore tailoring, fabrics and accessories from Dadinkowa Couture in Offa. Discuss your look with the team.',
      );
    if (location.hash) {
      const frame = requestAnimationFrame(() => focusSection(location.hash.slice(1)));
      return () => cancelAnimationFrame(frame);
    }
    window.scrollTo(0, 0);
    mainRef.current?.focus({ preventScroll: true });
  }, [location.pathname, location.hash]);

  return (
    <>
      <SectionLink id="main" className="skip-link">
        Skip to content
      </SectionLink>
      <Header />
      <div id="main" ref={mainRef} tabIndex={-1}>
        <div className="route-content" key={location.pathname}>
          <Routes>
            <Route
              path="/"
              element={
                <main>
                  <Home onOpen={setSelected} />
                </main>
              }
            />
            <Route path="/lookbook" element={<Lookbook onOpen={setSelected} />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="*"
              element={
                <main className="page not-found">
                  <h1>
                    A different <i>direction.</i>
                  </h1>
                  <p>This page could not be found.</p>
                  <Link to="/" className="button dark">
                    Return home <Arrow />
                  </Link>
                </main>
              }
            />
          </Routes>
        </div>
      </div>
      <Footer />
      <LookDialog look={selected} onClose={() => setSelected(null)} />
    </>
  );
}
