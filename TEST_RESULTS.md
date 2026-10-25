# Verification results — editorial redesign, 25 October 2026

## Status boundaries

Layout/motion implementation and technical fixes are complete for the current pending-photo state. **Photography is incomplete:** no photograph bytes have been visually reviewed, optimised or integrated. Nine provisional source-page selections and licences are recorded in `PHOTOGRAPHY_REQUEST.md` / `ASSET_MANIFEST.md`. Proxy HTTP 403 prevented downloads; the user requested manual upload rather than further retries. Current media slots are explicitly marked pending. No claim of a finished photographic fashion experience is made.

## Checks performed and passed

| Check | Actual result |
| --- | --- |
| `npm run format:check` | Prettier passes for formatted application, tests and configuration |
| `npm run typecheck` | TypeScript passes |
| `npm run lint` | ESLint passes |
| `npm test` | 31/31 tests across four files pass in Vitest/jsdom |
| `npm run build` | Production build passes, 55 modules |
| Vite production HTTP smoke check | `/`, `/lookbook`, `/contact` return HTTP 200 and noindex metadata |
| Local optimisation script fixture | A synthetic image fixture emits 700px/1400px WebP with preserved aspect ratio and no EXIF; real inventory remains empty |
| `scripts/pack-preview.py` | Standalone HTML regenerated with current application and pending-photo state |
| `scripts/check-preview.mjs` | Actual embedded production bundle runs in jsdom at a file URL: three HashRouter routes, section/skip/Atelier navigation, filtering, modal close/focus restoration, embedded logo and pending-photo slots pass, with no simulated runtime errors |
| `git diff --check` | No whitespace errors |

Production bundle is approximately 293KB JavaScript (93KB gzip), 25KB CSS (6KB gzip). These are build-size reports, not performance or Core Web Vitals measurements. Final asset/page weights cannot be measured until the photography is installed.

### Regression coverage

- **10 browsing/enquiry tests:** category filtering and empty data; rendered filter counts; pending-media controls; animated modal cancel/focus restoration; explicit/keyboard matching-image navigation and zoom using test-only fixtures; correct stock-qualified WhatsApp handoff; whitespace validation; menu navigation releases focus lock; pending-image slots do not request missing files; failed installed-image fallback; one H1 and verified directions per route.
- **10 media tests:** distinct card notices, detail notices and encoded WhatsApp wording for `illustration`, `stock-reference`, `approved-brand`; current data has no invented price/stock and no fake second view. Approved-brand labels/drafts are not described as stock or illustrations.
- **6 navigation tests:** Skip, Scroll to discover and cross-route Atelier work under both BrowserRouter and HashRouter, without creating nonexistent routes or replacing the standalone route fragment.
- **5 hero scheduling tests:** 6500ms auto-advance; manual interaction stops it; pointer pause/play works; CTA focus stops it; hidden tabs stop it; reduced motion disables scheduling/play while preserving manual slide choice.

Timers and dialog APIs are simulated in jsdom. These tests check state and events, not animation smoothness, visual contrast, actual cropping, platform-level focus traps or native WhatsApp behaviour. Test images are synthetic fixtures, never published as photography.

## Not performed

No callable browser-control tool was exposed. Real-browser Home/Lookbook/Contact inspection at 390/768/1440px, 360px overflow measurement, real keyboard/native focus containment, actual CSS transition/reveal/parallax rendering, OS reduced-motion behaviour, screenshots and motion recording remain unrun. No Lighthouse/accessibility audit or Core Web Vitals measurements were run. Exact local-browser steps are in `MANUAL_QA.md`.

The source pages were inspected through the web research tool. Direct photograph downloads were blocked. Source text is not visual inspection: image selection, colour, pose, watermarks, garment framing and suitability must be reviewed after the user uploads originals. Stock-photo integration and its visual acceptance remain open requirements.

No real WhatsApp message was sent; outgoing calls are mocked in tests. No merge, deployment, domain purchase, asset purchase or social-profile change was performed. Generated builds, standalone HTML, dependencies, temporary optimisation fixtures, secrets and uploaded handoff documents remain excluded from Git.
