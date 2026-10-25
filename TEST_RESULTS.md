# Verification results — fashion exhibition refinement, 25 October 2026

## Implemented and inspected

Supporting copy is 17–18px with 1.7 line height and comfortable paragraph widths. Secondary text is at least 14px. Muted colours were strengthened; variable image backgrounds now have solid reading surfaces. Image masks/reveals are applied to image surfaces, with captions outside them; gallery captions stay stationary outside pointer/selection transforms.

Five face-free garment derivatives and one cap-pattern detail were generated from the nine previously supplied/licensed originals and inspected locally. Crop boxes, original source links, ownership status and output hashes are recorded in the asset/provenance files. All remain stock-reference. No isolated garment, mannequin, new back view, background removal, synthetic geometry or virtual try-on is claimed. The existing hands-only sewing image remains a workshop reference, not Dadinkowa's workshop. No new blocked download was attempted; the Western suit-dummy reference was not substituted for Nigerian menswear.

The manual Garment Gallery presents three photographic panels with a central look, recessed neighbours, grounding shadows, 5-degree neighbour angles and bounded central pointer tilt (4 degrees per axis). Previous/next, neighbour selection, swipes, Arrow keys/Home/End and Explore operate immediately. The gallery has no automatic rotation. Captions and controls are outside all tilting layers. Reduced motion removes spatial presentation/tilt and neighbour focus while preserving explicit selection.

## Shared motion tokens

`src/motion.ts` drives CSS variables and JavaScript scheduling/cleanup. Hero transition: 1600ms; hold after transition: 9000ms; cycle: 10600ms. Image reveal: 1100ms; supporting text: 700ms opacity entrance; detail/menu entrance/exit: 550/320ms; gallery selection: 1100ms; feedback: 180ms; filter/route: 260/220ms. Controls do not wait for these animations. Hero stops on manual selection, CTA focus, document keyboard/pointer interaction, wheel movement, hidden tabs and reduced motion.

## Actual checks performed

- `npm run format:check`: passed.
- `npm run typecheck`: passed.
- `npm run lint`: passed.
- `npm test`: **41/41 passed**, six files.
- `npm run build`: passed, 58 modules. Approximately 300KB JS (95KB gzip) and 35KB CSS (8KB gzip). These are build sizes, not performance scores.
- Production HTTP smoke check: all three routes return HTTP 200. All 30 original/derived WebP variants decode, contain no EXIF and serve byte-identically with correct `image/webp` MIME.
- Standalone HTML regenerated (approximately 5.61MB, with local original/derivative assets embedded). The actual production bundle passes its jsdom smoke check for all offline routes, anchors, filters, gallery selection/details, modal close/focus restoration and embedded photography. No simulated runtime errors.
- File integrity tests cover all 30 output hashes/byte lengths/dimensions, nine source-ID mappings and six derivative slots.
- `git diff --check`: passed.

### Focused interaction coverage

- 10 existing browsing/enquiry tests: filters, counts, image zoom, modal exit/focus, matching-image fixture, WhatsApp qualification, whitespace validation, menu cleanup, missing-image fallback and heading/directions checks.
- 10 media-state tests: illustration/stock-reference/approved-brand notices and encoded WhatsApp wording; no invented inventory, prices or second views.
- 6 navigation tests: Skip/Scroll/Atelier in both BrowserRouter and HashRouter.
- 6 hero tests: full transition-plus-hold boundary, selected image source, pause/play, user/wheel interaction, hidden tabs and reduced motion.
- 7 gallery tests: central/neighbour framing state, captions outside depth layers, next/previous/wrap/Explore, neighbour selection, keyboard/focus, horizontal versus vertical touch handling (including suppressing a swipe's incidental click), no automatic rotation, and reduced-motion focus/selection behaviour.
- 2 asset integrity tests described above.

Timers, native-dialog APIs and event behaviour are simulated in jsdom. These tests do not show that animation looks smooth or that CSS framing works in a real browser.

## Declared text-colour calculations

WCAG relative-luminance contrast was calculated for seven declared solid foreground/background pairs. This is not a browser/cascade/overlay accessibility audit.

| Pair | Ratio |
| --- | --- |
| Body `#171713` / `#f5f1e9` | 15.95:1 |
| Secondary `#49443c` / `#f5f1e9` | 8.57:1 |
| Gallery secondary `#49443c` / `#e9e2d6` | 7.50:1 |
| Dark captions `#f5f1e9` / `#171713` | 15.95:1 |
| Contact invitation `#f5f1e9` / `#6d543e` | 6.24:1 |
| Form placeholder `#595247` / `#e7e1d6` | 5.93:1 |
| Atelier secondary `#ddd9cc` / `#171a16` | 12.44:1 |

No fixed `font-size` declaration below 14px remains in the base stylesheet; the exhibition layer explicitly sets descriptive versus secondary sizes. Real wrapping/legibility still needs browser review.

## Verification limits and remaining assets

No callable browser-control tool was exposed. Home/Lookbook/Contact at 390/768/1440px, 360px overflow, actual crop edges/contrast, native focus containment, gallery perspective/clipping/pointer smoothness, rendered CSS transitions, OS reduced motion, screenshots and recording remain unrun. Local image review/contact sheets are not webpage screenshots. `MANUAL_QA.md` gives exact real-browser and standalone checks.

True isolated native garments, headless-mannequin/hanger photographs and independently photographed caps remain missing. Current framed photo crops are an explicit fallback, never evidence of a 360-degree garment model or brand inventory. The licence/source register is preserved.

No real WhatsApp message, merge, deployment, asset/domain purchase or social-profile change occurred. Originals, temporary review images, builds, previews, dependencies, secrets and uploaded reference documents are excluded from the commit.
