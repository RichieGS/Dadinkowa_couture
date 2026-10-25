import { installMotionTokens } from './motion';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { App } from './App';
import { business, site } from './data';
installMotionTokens();
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'ClothingStore',
  name: business.name,
  telephone: business.phoneRaw,
  address: business.address,
  sameAs: Object.values(business.socials),
  hasMap: business.map,
};
const schema = document.createElement('script');
schema.type = 'application/ld+json';
schema.textContent = JSON.stringify(structuredData);
document.head.append(schema);
if (!site.previewMode)
  document.querySelector('meta[name="robots"]')?.setAttribute('content', 'index,follow');
const Router = window.location.protocol === 'file:' ? HashRouter : BrowserRouter;
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
);
