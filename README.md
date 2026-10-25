# Dadinkowa Couture — unpublished MVP

React + TypeScript + Vite. Three routes: Home `/`, Lookbook `/lookbook`, Contact `/contact`. No backend, account, checkout, purchases, social mutations, messages or deployment was performed.

## Run locally

Node 22.12+ or 24 recommended. From this folder:

```sh
npm ci
npm run dev
```

Open the printed local URL (normally `http://localhost:5173`). Vite serves direct loads of all three routes. For production output:

```sh
npm run typecheck
npm run lint
npm test
npm run build
npm exec vite preview -- --host 127.0.0.1
```

The delivered `/workspace/work/Dadinkowa-Preview.html` is a self-contained offline preview. Download it and open it in a modern browser; all imagery, CSS and JavaScript are embedded. It uses hash navigation only for file URLs, so its three routes work without a web server. Contact actions require network access and WhatsApp as usual. No external resources load until a visitor follows a link. If a browser/file viewer blocks module scripts, use the local development commands above.

Recreate the standalone preview after changes with `python3 scripts/pack-preview.py /absolute/path/Dadinkowa-Preview.html` after `npm run build`.

## Implemented

- Editorial home, asymmetrical collection panels, Atelier enquiry guide and two selected external TikTok references.
- Manual hero illustration crossfade, card/detail illustration swaps, filter transitions, one-time scroll reveals and reduced-motion CSS.
- Filterable data-driven lookbook, native modal detail viewer, image navigation and zoom. Native dialog provides focus containment, Escape/cancel and focus restoration; touch uses explicit viewer controls.
- Contact composer with selected study context, validation and encoded WhatsApp draft to **2348033895505**. It never says a message was sent or a fitting booked. Phone, copy-number fallback and verified directions/social links.
- Visible demonstration labels, noindex, per-route titles/descriptions, verified-only business schema, media failure fallback and noscript contact fallback.

## Content and provenance

The uploaded handoff research was the dated source of truth for verified business details. The handoff documents remain local and are excluded from this repository. Proposed copy and visual direction are not owner-approved business claims. Research was not independently refreshed.

Edit typed content in `src/data.ts`: `business`, `looks`, `media`, `site`, `socialPosts`. Layout/components live in `src/App.tsx`; tokens, responsive rules and CSS transitions live in `src/styles.css`. `src/main.tsx` handles bootstrapping and verified schema. The only live destination is the contact number; no messages were sent during testing (window.open is mocked).

No authentic garment media was provided. Five original, visibly labelled vector studies keep browsing functional without inventing products, stock, prices or craftsmanship evidence. Enlarged views are of the same illustrations; they are not claimed as photographs. The supplied reconstructed raster logo retains the T-shirt motif and is provisional. See `ASSET_MANIFEST.md` for every visual and replacement requirement.

To replace a study: supply rights-cleared local media with explicit sizes; set truthful alt/captions, source and approval status, and revise the description to verified facts. Use a second view only if it actually belongs to the same garment. Do not enable a real catalogue simply by removing a label. Header/preview wording and helper labels also need editorial review. Keep previews noindex until all content is approved. No approved video exists, so the hero uses still illustrations, with no autoplay or parallax.

## Hosting later

No domain/provider has been selected and nothing is registered or deployed. The production files are in `dist/`. A future static host must rewrite unknown non-file paths (including `/lookbook` and `/contact`) to `/index.html` with HTTP 200, while serving assets normally; keep genuine asset errors as 404. Serve at domain root, or set Vite `base` and router basename for a subpath. Confirm HTTPS, permissions, ownership and caching. Add a verified absolute canonical domain, social image URL and approved favicon/OG image at launch. `site.previewMode` and the static robots tag control indexing; keep them in agreement. No secrets are needed.

## Verification and limitations

See `TEST_RESULTS.md` for actual results and `LAUNCH_CHECKLIST.md` for owner decisions. Automated UI checks run in jsdom, not a real browser. Native focus trapping, visual layout at 360/390/768/1440px, reduced-motion rendering and screenshots still require a real browser because the browser-control tool was not exposed in this session. No Lighthouse/Core Web Vitals measurements are claimed.

Deferred as requested: payments, cart, inventory, account/CMS/admin, scheduling, virtual try-on and automatic social feeds.
