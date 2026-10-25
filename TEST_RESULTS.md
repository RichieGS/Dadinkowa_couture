# Verification results — uploaded photograph integration, 25 October 2026

## Photography inspection and mapping

All nine images in the user-supplied `DDK_img.zip` matched the requested unique photo IDs. **No ambiguous filename matches were found.** The originals were visually inspected locally using a labelled contact sheet. The initial metadata description for 37766536 was corrected: it shows a burgundy tunic, sunglasses and baseball cap, not Agbada and a traditional cap. The sand-kaftan photograph's clothing tag is visible and retained; the cap image is a rear three-quarter view. No visible image watermarks were observed. These observations concern the actual image files, not a rendered browser page.

Every image remains `stock-reference`. Source URLs, photographer credits, licence URLs, intended use and inspection notes are in `ASSET_MANIFEST.md` / `PHOTOGRAPHY_REQUEST.md`. `photo-provenance.json` records uploaded filenames, source IDs, original hashes, and all output dimensions/bytes/hashes. No original upload, archive or review contact sheet is committed.

Eighteen responsive WebP files (700/1400px, quality 82) preserve the full source compositions, with no upscaling, retouching or fabricated alternate views. EXIF is removed. Original image bytes total 19,866,025; both responsive sets total 2,147,150. The first hero's 1400px photograph is 357,476 bytes. These are actual file sizes, not performance measurements.

## Checks performed and passed

| Check | Actual result |
| --- | --- |
| `npm run format:check` | Formatted source/tests/configuration pass |
| `npm run typecheck` | TypeScript passes |
| `npm run lint` | ESLint passes |
| `npm test` | 33/33 Vitest checks across five files pass |
| `npm run build` | Production build passes, 55 modules |
| Production HTTP routes | Home, Lookbook and Contact return HTTP 200 with noindex metadata |
| Production HTTP photographs | All 18 WebP files return correct `image/webp` MIME and byte-identical content |
| Image decoding/metadata | All 18 WebP files decode in Pillow, have expected dimensions and no EXIF |
| Standalone packaging | Regenerated HTML is 3,926,083 bytes and embeds all 18 exact WebP files; no remote photograph loading |
| Offline production-bundle smoke check | All 3 HashRouter routes, Skip/Scroll/Atelier links, filtering, modal close/focus restoration and installed embedded WebP images pass in jsdom; no simulated runtime errors |
| `git diff --check` | No whitespace errors |

JavaScript is approximately 295KB (93KB gzip), CSS approximately 27KB (6KB gzip). No Lighthouse, Core Web Vitals or accessibility scores are claimed.

## Functional/motion coverage with the installed images

- 10 browsing/enquiry tests: filters/counts, installed-photo zoom, disabled unrelated-view controls, modal cancel/exit/focus restoration, matching-view keyboard controls using a test fixture, stock-qualified WhatsApp drafts, whitespace validation, menu navigation/scroll-lock cleanup, pending and failed-image fallbacks, H1 and verified directions.
- 10 media-status tests: distinct illustration/stock-reference/approved-brand card/dialog notices and WhatsApp wording, with no fake stock/prices or fabricated second views.
- 6 navigation tests: Skip, Scroll to discover and cross-route Atelier in both BrowserRouter and HashRouter.
- 5 hero scheduling tests: auto-advance at 6500ms, the actual installed image source changes with the active slide, pause/play including pointer interaction, CTA/manual interaction stops, hidden-tab stops and reduced-motion behaviour.
- 2 photo-integrity tests: all nine unique ID/slot matches, installed responsive WebP signatures/dimensions/byte lengths/SHA-256 records.

Existing CSS mask/crossfade, scaling, reveals, filter, dialog/menu and route animations remain implemented. Tests verify scheduling, event/state changes, image selection and control behaviour. **They do not verify actual rendered CSS animation or its smoothness.** No change to timing required for the local images was observed in these programmatic checks, but a browser remains necessary for visual acceptance.

## Framing implementation and remaining limits

Human-subject images use contained frames, edge padding and per-photo neutral backgrounds. Desktop hero images sit below the header and above controls. On mobile, imagery is above the headline/CTAs instead of obscured by them; the hero may grow taller to preserve the photograph. Fabric images use focal crops; the Atelier uses the sewing photograph's native landscape ratio to preserve hands and needle. The responsive source compositions are preserved, and these CSS rules are configured, but actual desktop/mobile rendering has not been measured.

No callable browser-control tool was exposed after discovery. Real-browser checks at 390/768/1440px, 360px overflow, rendered crop/contrast checks, native focus traps, actual motion/reduced-motion visuals, screenshots and recording remain unrun. `MANUAL_QA.md` provides exact steps. Local image inspection and jsdom checks are not browser screenshots or visual QA.

No real WhatsApp messages were sent; outbound handoffs are mocked in tests. No merge, deployment, asset/domain purchase or social-profile change was performed. Dependencies, generated builds/previews, raw originals, research attachments and temporary review files are excluded from Git.
