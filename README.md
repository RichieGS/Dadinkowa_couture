# Dadinkowa Couture — editorial MVP (draft)

Nine user-supplied stock-reference photographs are now integrated in the hero, collections, lookbook and Atelier. All files matched the requested source IDs without ambiguity. The images were inspected locally and optimised to 700px/1400px WebP variants; no originals are committed. The burgundy tunic/baseball-cap photo's inaccurate Agbada description was corrected, and the visible tag in the sand-kaftan reference is documented.

Visible garment placements now use inspected face-free derivatives. The mobile hero separates image and text to keep garment details readable; the Atelier uses the sewing image's landscape ratio. These are implemented framing choices, **not a claim of real-browser visual QA**. Browser tooling remains unavailable.

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

Read [MANUAL_QA.md](MANUAL_QA.md) for exact real-browser checks at 1916×874 (recording size), 390/768/1440px, reduced motion, route/section navigation, modal/menu interaction and WhatsApp drafts. Browser-control tooling was unavailable in this session. No visual QA, screenshot, recording or animation smoothness claim is based on jsdom.

## Exhibition presentation

The homepage now frames clothing as an exhibition. A garment-led hero, asymmetric collections, manual Garment Gallery, tactile fabric interlude, quiet hands-only Atelier and calm contact section give each part a distinct role. Descriptive text is 17–18px with 1.7 line height; secondary labels, hints and disclosures are at least 14px. Readable solid panels replace text over variable fabric tones. Text stays stationary after its brief opacity entrance; gallery captions never tilt or slide with the images. Headline scale is reduced relative to descriptive copy, and the hero description sits in a separate unscaled reading wrapper rather than inheriting older direct-child paragraph rules.

The **Garment Gallery** presents blue Agbada, an earth-toned kaftan and a sand kaftan as photographic planes. The white mat/frame treatment is removed. A foreground garment plane, recessed neighbours, arched backdrop and projected floor/shadows establish distinct depth layers. The image and stationary reading rail share a compact viewport-aware presentation; mobile places the reading rail directly below the image. Previous/next, neighbour selection, Arrow keys/Home/End and horizontal touch swipes select a look immediately; Explore opens the correct accessible detail dialog. Vertical scrolling remains native, and a swipe does not accidentally open a detail. There is no gallery autoplay. Pointer tilt is bounded to 4 degrees on each axis on the central panel; neighbours rotate only 6 degrees. Captions and controls sit outside the tilting layer. Reduced motion removes spatial effects and neighbour focus, retaining explicit controls. This is photographic depth, not 360-degree rendering or a generated garment back.

Six deterministic face-free derivatives were inspected and generated from the supplied stock originals: five garment crops and one cap-pattern detail. Necklines, sleeves and the photographed silhouettes are retained where the source composition allows; the sand garment's original tag remains visible. No background isolation, retouching, unseen geometry or fabricated views are used. Original full-frame references remain in the asset history; visible garment browsing uses the face-free derivatives. No Western suit is substituted for Nigerian menswear. The supplied suit-dummy page was read for presentation context only; no new asset download was attempted. Approved Nigerian garment-on-mannequin/hanger images and independent accessory photographs remain useful future additions, not blockers to the current photographic panels.

### Motion timing

`src/motion.ts` is the shared timing source. `installMotionTokens()` exposes its values to CSS; JavaScript uses the same values for scheduling and native-dialog cleanup.

| Treatment | Timing |
| --- | --- |
| Hero staged transition | 1400ms: 220ms opaque cover, then 1180ms unveil |
| Hero hold after transition | 9000ms after settling (normally 10400ms between transition starts) |
| Coordinated section image | 900ms |
| Coordinated heading / copy | 650ms, starting 140ms / 280ms after the image |
| Detail/menu entrance / exit | 550ms / 320ms |
| Gallery selection | 1100ms |
| Button/pointer feedback | 180ms |
| Filter / route response | 260ms / 220ms |

The hero mounts exactly one photograph. It keeps the outgoing photograph while the next responsive image decodes, covers the source change with an opaque curtain, then unveils the incoming photograph with slight movement. `useStagedHero` cancels previous phase timers and ignores stale readiness promises on repeated requests. Heading and copy settle in after the image begins revealing; CTAs remain outside that sequence. An unavailable image retains the normal fallback, and later slides can recover. There is no opacity blend between two garment photographs.

Major image-led sections are observed as groups at a 22% threshold with an 8% lower viewport inset. Image, heading and copy start at 0/140/280ms and finish by about 930ms. Content is visible before initialization, stays visible after entrance and remains available if observer creation fails. Local recording feedback was inspected at 0/4/5.5/7/12/17/18/19/24/30 seconds; that is evidence about the previous presentation, not a browser test of these new changes.

Hero CTAs, filters and navigation do not wait for animations. Pause/play and manual slides remain visible; document interaction, wheel scrolling, hidden tabs and reduced motion stop automatic advance. The gallery is entirely manual. One CSS/IntersectionObserver/requestAnimationFrame approach is retained, with no 3D engine or extra animation dependency. Reduced motion disables spatial motion, parallax and automatic scheduling. Content is visible if observation/animation fails. No scroll hijacking, particles or custom cursor.

## Maintainable source

- `src/data.ts`: verified business information, typed looks, proposed photo slots, site copy and WhatsApp generation.
- `src/media.ts`: distinct `illustration`, `stock-reference`, `approved-brand` disclosure/reference wording.
- `src/components/`: reusable hero, layout, image/section-link helpers, cards, modal viewer, enquiry composer.
- `src/pages/`: Home, Lookbook and Contact compositions.
- `src/hooks/`: reduced-motion/reveal/parallax behaviour and native dialog lifecycle; `useStagedHero` owns latest-request-wins reveal phases.
- `src/styles.css`: base layouts and responsive rules; `src/exhibition.css`: initial exhibition rules; `src/refinements.css`: recording-led cascade, staged hero and compact layered gallery; `src/motion.ts`: shared timing tokens.
- `src/photo-inventory.json`: installed image dimensions, populated with the nine supplied photographs and six editorial derivatives. It is independent of ownership/approval status.

Source and tests are formatted with Prettier; `npm run format` updates formatting. The uploaded handoff documents remain local and excluded from Git. Verified facts were taken from that dated source; owner approval of design proposals is not implied. Phone, address, Maps and social URLs remain unchanged.

## Replace or reprocess the photographs

1. Inspect the actual originals for composition, quality, watermarks and suitability. The supplied originals have been inspected; future replacements must also be reviewed rather than relying on source metadata.
2. Put the named originals in a local ignored working folder. Install Pillow in your Python environment if needed.
3. Run `python3 scripts/prepare-photos.py /absolute/path/to/originals`.
4. The command preserves the full composition, emits 700/1400px WebP variants to `public/media/`, removes metadata on re-encoding and updates the inventory. It does not download, crop, upscale, manufacture detail views or claim brand approval.
5. Review focal positions/alt text and update the asset register. Real-device review is required before calling integration complete.
6. Run `python3 scripts/prepare-exhibition-crops.py /absolute/path/to/originals` to reproduce the six inspected derivatives, then rebuild and regenerate the standalone preview. Crop boxes are recorded in the script and provenance register.

Photo sources, photographers, licence URLs, intended slots and replacement requirements are in [ASSET_MANIFEST.md](ASSET_MANIFEST.md). All supplied photos remain stock-reference and are not Dadinkowa inventory or workmanship evidence. Owner-approved brand media needs truthful per-image alt/caption/source as well as its `approved-brand` status. The logo is still a provisional supplied reconstruction.

## Standalone offline preview

```sh
npm run build
python3 scripts/pack-preview.py work/Dadinkowa-Preview.html
node scripts/check-preview.mjs work/Dadinkowa-Preview.html
```

Download/open the generated HTML in a modern browser. The file uses HashRouter and embeds all installed local images, CSS and JavaScript; all supplied photographs and six face-free derivatives, in both responsive sizes, are embedded. It supports the same animations and disables automatic/spatial motion for reduced motion. Section and skip links scroll directly without replacing HashRouter's route fragment. An initial browser may restrict local-file module scripts; use the dev server if so. Contact actions require external network access, but nothing loads from social sites merely by visiting the page.

The preview was regenerated and its production bundle checked in jsdom. Generated output is kept out of Git; reproduce it with these commands. No attachment delivery or external port-forwarding tool is exposed in this session.

## Hosting later

Nothing is deployed, purchased or merged. No hosting/domain is registered. A future static host must rewrite non-file routes (`/lookbook`, `/contact`) to `/index.html` with HTTP 200, while serving assets normally and retaining genuine asset 404s. Deploy at domain root unless both Vite base and router basename are configured. Set approved canonical/social URLs, HTTPS and final sharing/favicon assets. Keep `site.previewMode` and the static robots metadata in agreement; preview remains noindex.

No stock inventory, prices, fitting confirmation, delivery guarantees or unverified brand history is invented. WhatsApp opens a qualified draft for the visitor to send. No messages have been sent. Payments, checkout, accounts, CMS, scheduling, inventory and tracking remain outside this MVP.

See [TEST_RESULTS.md](TEST_RESULTS.md) for actual checks and [LAUNCH_CHECKLIST.md](LAUNCH_CHECKLIST.md) for remaining approvals and QA.
