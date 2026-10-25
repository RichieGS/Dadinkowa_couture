# Dadinkowa Couture — editorial MVP (draft)

**Photography is incomplete.** The user will manually upload nine licensed originals listed in [PHOTOGRAPHY_REQUEST.md](PHOTOGRAPHY_REQUEST.md). The cloud proxy blocks image downloads with HTTP 403; at the user's direction there are no repeated attempts. Source-page metadata and licence terms were inspected, but the photographs themselves have not yet been visually reviewed, optimised or integrated. The old clothing illustrations are removed. Explicit pending-photo slots preserve the new compositions without masquerading as fashion photography.

## Run and inspect

React + TypeScript + Vite. Node 22.12+ or 24 recommended.

```sh
npm ci
npm run dev
```

Open the printed local address (normally `http://localhost:5173`). Home `/`, Lookbook `/lookbook`, Contact `/contact`. No backend or secrets are required.

```sh
npm run typecheck
npm run lint
npm run format:check
npm test
npm run build
npm exec vite preview -- --host 127.0.0.1
```

Read [MANUAL_QA.md](MANUAL_QA.md) for exact real-browser checks at 390/768/1440px, reduced motion, route/section navigation, modal/menu interaction and WhatsApp drafts. Browser-control tooling was unavailable in this session. No visual QA, screenshot, recording or animation smoothness claim is based on jsdom.

## What changed

The home composition is rebuilt: full-viewport layered hero, expressive staggered headlines, offset collection spreads, two large featured looks, a full-width texture interlude, a close-up Atelier spread and a warm, large-scale contact invitation. Contact and Lookbook retain their working enquiry and browsing flow. The DK/T-shirt raster logo, black/ivory foundation and verified business details are preserved. Research/implementation commentary lives in documentation; required image disclosures remain on the site.

One motion approach: CSS transitions/animations plus IntersectionObserver and a bounded requestAnimationFrame scroll handler. Hero transitions use a 1000ms opacity/mask reveal and 1100ms image scale; a 6500ms scheduler auto-advances until paused, interacted with, hidden or reduced motion is requested. Controls are always usable; reduced-motion users retain manual slide navigation. Scroll reveals apply image masks, short text fades and collection staggering. Two large image areas receive restrained desktop parallax. Cards zoom or swap only if a genuine second image exists. Filters fade/move into their new arrangement without a blank interval. Native dialogs/menu have entrance/exit animations; normal exits retain the modal until animation completion, while route navigation releases it immediately for correct focus. Routes use a short opacity entrance without waiting to navigate.

All motion is disabled/minimised through `prefers-reduced-motion`; parallax and slideshow scheduling stop in JavaScript as well. Content is visible by default if observation or animation fails. No scroll hijacking, custom cursor, autoplay audio or additional motion library.

## Maintainable source

- `src/data.ts`: verified business information, typed looks, proposed photo slots, site copy and WhatsApp generation.
- `src/media.ts`: distinct `illustration`, `stock-reference`, `approved-brand` disclosure/reference wording.
- `src/components/`: reusable hero, layout, image/section-link helpers, cards, modal viewer, enquiry composer.
- `src/pages/`: Home, Lookbook and Contact compositions.
- `src/hooks/`: reduced-motion/reveal/parallax behaviour and native dialog lifecycle.
- `src/styles.css`: formatted tokens, layouts, motion rules and responsive breakpoints.
- `src/photo-inventory.json`: installed image dimensions, currently empty. It is independent of ownership/approval status.

Source and tests are formatted with Prettier; `npm run format` updates formatting. The uploaded handoff documents remain local and excluded from Git. Verified facts were taken from that dated source; owner approval of design proposals is not implied. Phone, address, Maps and social URLs remain unchanged.

## Integrate the requested photos after upload

1. Inspect the actual originals for composition, quality, watermarks and suitability. The current selections are provisional; revise captions/focal points if the photographs differ from source metadata.
2. Put the named originals in a local ignored working folder. Install Pillow in your Python environment if needed.
3. Run `python3 scripts/prepare-photos.py /absolute/path/to/originals`.
4. The command preserves the full composition, emits 700/1400px WebP variants to `public/media/`, removes metadata on re-encoding and updates the inventory. It does not download, crop, upscale, manufacture detail views or claim brand approval.
5. Review focal positions/alt text and update the asset register. Real-device review is required before calling integration complete.
6. Rebuild and regenerate the standalone preview.

Photo sources, photographers, licence URLs, intended slots and replacement requirements are in [ASSET_MANIFEST.md](ASSET_MANIFEST.md). All proposed photos remain stock-reference and are not Dadinkowa inventory or workmanship evidence. Owner-approved brand media needs truthful per-image alt/caption/source as well as its `approved-brand` status. The logo is still a provisional supplied reconstruction.

## Standalone offline preview

```sh
npm run build
python3 scripts/pack-preview.py work/Dadinkowa-Preview.html
node scripts/check-preview.mjs work/Dadinkowa-Preview.html
```

Download/open the generated HTML in a modern browser. The file uses HashRouter and embeds all installed local images, CSS and JavaScript; pending-photo slots remain pending. It supports the same animations and disables automatic/spatial motion for reduced motion. Section and skip links scroll directly without replacing HashRouter's route fragment. An initial browser may restrict local-file module scripts; use the dev server if so. Contact actions require external network access, but nothing loads from social sites merely by visiting the page.

The preview was regenerated and its production bundle checked in jsdom. Generated output is kept out of Git; reproduce it with these commands. No attachment delivery or external port-forwarding tool is exposed in this session.

## Hosting later

Nothing is deployed, purchased or merged. No hosting/domain is registered. A future static host must rewrite non-file routes (`/lookbook`, `/contact`) to `/index.html` with HTTP 200, while serving assets normally and retaining genuine asset 404s. Deploy at domain root unless both Vite base and router basename are configured. Set approved canonical/social URLs, HTTPS and final sharing/favicon assets. Keep `site.previewMode` and the static robots metadata in agreement; preview remains noindex.

No stock inventory, prices, fitting confirmation, delivery guarantees or unverified brand history is invented. WhatsApp opens a qualified draft for the visitor to send. No messages have been sent. Payments, checkout, accounts, CMS, scheduling, inventory and tracking remain outside this MVP.

See [TEST_RESULTS.md](TEST_RESULTS.md) for actual checks and [LAUNCH_CHECKLIST.md](LAUNCH_CHECKLIST.md) for remaining approvals and QA.
