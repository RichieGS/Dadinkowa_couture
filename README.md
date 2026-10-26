# Dadinkowa Couture — Living Atelier MVP

Local-only React + TypeScript + Vite website. The approved Concept A reference guides the composition: charcoal/burgundy layered hero, real “Cloth. Form. Identity.” headline, ivory embroidery editorial and three asymmetric garment studies. The existing supplied DK logo is unchanged. Nothing is merged or deployed.

## Run

Node 22.12+ or 24 recommended. No backend or secrets required.

```sh
npm ci
npm run dev
```

Open the printed local address. Routes: `/`, `/lookbook`, `/contact`. The site retains noindex preview metadata, verified phone/address/social links, accessible native dialogs, category filtering, router-safe section anchors and qualified WhatsApp drafts. Ready-to-wear, fabrics, caps and accessories remain service text and enquiry options; only Tailoring has suitable garment concept imagery, so the visual filter offers All/Tailoring. Old category URLs still show a truthful empty state.

## Art direction and disclosures

The five separate images from `New_designs.zip` are the only displayed concept media. Three transparent garments use 500/1000px WebP; two fabric/detail assets use 700/1400px WebP. The mockup is not shipped as an image. Previous stock photographs are removed from the shipped media directory, with their source history retained in Git. See [ASSET_MANIFEST.md](ASSET_MANIFEST.md) and [concept-provenance.json](concept-provenance.json).

Every garment presentation and generated fabric detail carries `ai-concept` disclosure: “AI-generated style concept—not an actual Dadinkowa product.” Fabric imagery is additionally described as conceptual. Each garment has one actual supplied image; no duplicated looks, fabricated views, 360-degree viewer, stock availability or exact-reproduction promise is offered. “Discuss this style” selects the correct AI concept and asks whether the team could create something similar. The website opens a draft only; the visitor decides whether to send it.

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

The standalone HTML embeds the production bundle, logo and ten responsive concept variants; it uses HashRouter for local-file browsing. External actions require a connection. Review downloads are committed in `deliverables/` so GitHub raw download links can be shared without deployment. Regenerate with `python3 scripts/package-downloads.py /absolute/path/to/Dadinkowa-Preview.html` after staging the source files. The source ZIP excludes dependencies, secrets, raw uploads and recursive deliverables. There is no attachment delivery or external preview-forwarding tool exposed in this session.

To reproduce responsive assets, install Pillow and run `python3 scripts/prepare-concepts.py /absolute/path/to/New_designs`. It preserves alpha and full supplied composition, strips metadata by re-encoding and records source hashes/dimensions. It never downloads or generates substitute imagery.

Checkpoint: tag `checkpoint/pre-living-atelier-20261025`, commit `7ed70e2`. The same branch `feat/dadinkowa-website-mvp` and draft PR #1 are used.

Browser-control tooling remains unavailable. Local compositing inspection and DOM checks do not verify live layout, computed styles, device crops, animation quality or native browser focus. Desktop/mobile screenshots and recording remain pending. See [TEST_RESULTS.md](TEST_RESULTS.md), [MANUAL_QA.md](MANUAL_QA.md) and [LAUNCH_CHECKLIST.md](LAUNCH_CHECKLIST.md).

A future host must serve SPA routes through `/index.html`, preserve genuine asset 404s and configure HTTPS/canonical URLs. Keep preview noindex until owner approval. No payments, inventory, checkout, accounts, CMS, analytics or scheduling are included.
