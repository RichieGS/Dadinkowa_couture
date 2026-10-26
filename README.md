# Dadinkowa Couture — Living Atelier MVP

Local-only React + TypeScript + Vite website. The approved Concept A reference guides the composition: charcoal/burgundy layered hero, real “DADINKOWA COUTURE” headline and smaller “Cloth. Form. Identity.” tagline, ivory embroidery editorial and five curated category previews and a 35-concept collection. The existing supplied DK logo is unchanged. Nothing is merged or deployed.

## Run

Node 22.12+ or 24 recommended. No backend or secrets required.

```sh
npm ci
npm run dev
```

Open the printed local address. Routes: `/`, `/lookbook`, `/contact`. The site retains noindex preview metadata, verified phone/address/social links, accessible native dialogs, category filtering, router-safe section anchors and qualified WhatsApp drafts. Shareable All, Agbada, Ready-to-wear, Fabrics, Caps and Wristwatches filters show 35 total concepts, seven per category. The homepage links five curated category previews to filtered collection URLs.

## Art direction and disclosures

The original five images from `New_designs.zip` remain, with 32 newly generated individual collection assets. The two original Agbada and ivory outfit are reused in the 35-entry catalogue; original cloth/background details remain editorial-only. Three transparent garments use 500/1000px WebP; two fabric/detail assets use 700/1400px WebP. The mockup is not shipped as an image. Previous stock photographs are removed from the shipped media directory, with their source history retained in Git. See [ASSET_MANIFEST.md](ASSET_MANIFEST.md) and [concept-provenance.json](concept-provenance.json).

Every garment presentation and generated fabric detail carries `ai-concept` disclosure: “AI-generated style concept—not an actual Dadinkowa product.” Fabric imagery is additionally described as conceptual. Each concept has one distinct image; no duplicate looks, invented alternate views, 360-degree viewer, stock availability or exact-reproduction promise is offered. “Discuss this style” is used for garments; “Enquire about similar options” is used for fabrics, caps and watches. Drafts include category, ID and title, asking about feasibility or similar options. The website opens a draft only; the visitor decides whether to send it.

Hero cloth, lighting and transparent garment are separate layers. The garment entrance starts 320ms after the text and settles after 1400ms; actions stay immediately available. Hover changes are limited to 2 degrees and 5px; no oval platform or rectangular floating cards remain. Image entrances are retained. `TextReveal` and `RevealHeading` observe each heading at the lower 83% viewport boundary. Native-wrapped words on the same line share one 1100ms mask/rise/fade with 200ms line staggering (maximum 1800ms). Paragraph blocks rise 16px over 1000ms starting after 240ms. All text is single-copy selectable semantic HTML; italic/descender mask padding prevents tight clipping. Text finishes permanently on fast passage, reduced-motion changes or reflow during entrance. Fonts-ready/loadingdone and width changes recalculate line groups without resetting completed content. Missing/failed observers leave text visible. Reduced motion disables the hero/hover/section animations. Scrolling remains native. Mobile uses its own stacked layout, spaced/wrapping headline, contained garments and nearby concept controls.

`src/living-atelier.css` is the final design layer after base styles. Routes, enquiry forms and dialog lifecycle stay in their existing components. The replaced slideshow/rotating gallery and their obsolete state tests were removed; current composition regressions and preserved navigation/enquiry/dialog/filter tests cover the replacement.

## Checks and standalone preview

```sh
npm run format:check
npm run typecheck
npm run lint
npm test
npm run build
python3 scripts/pack-preview.py work/Dadinkowa-Preview.html
node scripts/check-preview.mjs work/Dadinkowa-Preview.html
```

The standalone HTML embeds the production bundle, logo and 74 responsive concept variants; it uses HashRouter for local-file browsing. External actions require a connection. Review downloads are committed in `deliverables/` so GitHub raw download links can be shared without deployment. Regenerate with `python3 scripts/package-downloads.py /absolute/path/to/Dadinkowa-Preview.html` after staging the source files. The source ZIP excludes dependencies, secrets, raw uploads and recursive deliverables. There is no attachment delivery or external preview-forwarding tool exposed in this session.

To reproduce responsive assets, install Pillow and run `python3 scripts/prepare-concepts.py /absolute/path/to/New_designs`. It preserves alpha and full supplied composition, strips metadata by re-encoding and records source hashes/dimensions. It never downloads or generates substitute imagery.

Checkpoint: tag `checkpoint/pre-living-atelier-20261025`, commit `7ed70e2`. The same branch `feat/dadinkowa-website-mvp` and draft PR #1 are used.

Browser-control tooling remains unavailable. Local compositing inspection and DOM checks do not verify live layout, computed styles, device crops, animation quality or native browser focus. Desktop/mobile screenshots and recording remain pending. See [TEST_RESULTS.md](TEST_RESULTS.md), [MANUAL_QA.md](MANUAL_QA.md) and [LAUNCH_CHECKLIST.md](LAUNCH_CHECKLIST.md).

A future host must serve SPA routes through `/index.html`, preserve genuine asset 404s and configure HTTPS/canonical URLs. Keep preview noindex until owner approval. No payments, inventory, checkout, accounts, CMS, analytics or scheduling are included.

## Brand signature refinement

The header pairs an exact CSS crop of the original DK/shirt symbol with a real two-line DADINKOWA COUTURE wordmark. Black pixels blend into the charcoal header; the original raster remains unchanged. No faithful transparent source was supplied. An image-editor derivative was inspected and rejected because it added a halo, so no approximate/reconstructed replacement is shipped. A production transparent symbol master is still needed; CSS blending is the current presentation fallback. The crop excludes the tiny source lettering.

The hero has one H1: DADINKOWA above spaced COUTURE, then the smaller italic tagline. Heading lines use the existing 1100ms/200ms reveal; tagline starts at 400ms, description at 500ms, all settled within 1.8s. Header/actions remain immediate. Mobile preserves DADINKOWA as an unbroken word, with explicit 320px header/typographic rules. “The Dadinkowa Edit”, “Inside Dadinkowa Couture” and a prominent live footer wordmark reinforce identity. Actual desktop/tablet/375×667/320px legibility, edge detail and overflow review remains pending because browser tooling is unavailable.

## Expanded collection

`src/catalogue.json` supplies 35 unique IDs/slugs/titles/categories/alt texts. All entries remain `ai-concept`; generation is not evidence of inventory. `generation-provenance.json` records the 32 actual individual image-generation calls, exact prompts, returned output paths and source/output hashes. No model identifier or licence was returned; neither is guessed. Source PNGs stay local. `scripts/prepare-catalogue.py` emits 500/1000px WebPs retaining alpha, true dimensions and full compositions. Fabric images use landscape framing, caps compact framing and watches/garments contained framing. Collection images are lazy-loaded; only hero art is eager. See COLLECTION_GENERATION.md for the review workflow and TEST_RESULTS.md for final counts/checks.
