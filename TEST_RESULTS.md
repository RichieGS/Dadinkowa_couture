# Test results — expanded Dadinkowa collection

27 October 2026. Branch `feat/dadinkowa-website-mvp`, same draft PR #1. Nothing merged, deployed or purchased.

## Actual generation and integration

| Category | Newly generated | Reused | Integrated distinct concepts |
| --- | ---: | ---: | ---: |
| Agbada | 5 | 2 | 7 |
| Ready-to-wear | 6 | 1 | 7 |
| Fabrics | 7 | 0 | 7 |
| Caps | 7 | 0 | 7 |
| Wristwatches | 7 | 0 | 7 |
| Total | 32 | 3 | 35 |

All 32 new assets were generated in individual image_gen.imagegen calls. All are inspected, locally optimised and integrated; none is a contact-sheet crop or simple recolour counted as an extra concept. No outputs required regeneration after local inspection. The original fabric background and embroidery detail remain editorial-only, outside the 35 catalogue entries. Source PNGs remain local; generated responsive sizes are not extra concepts.

Actual output review covered garment silhouettes/necklines/sleeves, fabric texture/pattern/drape, cap crowns/folds, and watch cases/dials/hands/straps. Charcoal/ivory garment and ivory cap/watch compositing showed no conspicuous unwanted backdrop or malformed/clipped object at the inspected scale. No visible manufacturer logos, text, watermarks, people or interface elements were found. Watch descriptions were adjusted to visual appearance rather than asserting requested marker counts or technical specifications. Small-size/browser-scale visual acceptance remains pending.

## Passed

- **62 Vitest tests across 10 files:** journeys/enquiries/dialogs (10), collection integrity/filters/direct URLs/category-qualified enquiries (7), BrowserRouter/HashRouter anchors (6), brand identity/accessibility (3), Living Atelier composition (5), media status (13), text reveal lifecycle (9), entrance initialization/reduced-motion bypass (4), original/generated delivery integrity (2), stable browsing/history/dialog restoration (3).
- Unique 35 IDs/slugs/source images; seven per category. New source hashes are unique across all 32 generated files. All entries are ai-concept with descriptive alt text and responsive media.
- Formatting, TypeScript, ESLint and production build. 60 modules; JS 306.69 kB / gzip 95.43 kB; CSS 60.69 kB / gzip 12.83 kB.
- Standalone regenerated: **10,497,005 bytes**. Actual embedded production bundle executed in jsdom with no simulated runtime errors. Checked three HashRouter routes, five homepage category previews, 35 catalogue records, counted filtering, all five direct category hash URLs, modal close/focus restoration and embedded local media.
- All **64 new responsive WebPs** decoded with recorded dimensions, SHA-256 hashes and no EXIF. Alpha preserved. Combined shipped imagery: **74 WebPs / 7,038,030 bytes**, including **56 alpha-bearing variants**. New variants total 5,833,678 bytes.
- The DK raster and five approved original concept assets remain unchanged. No external hotlinks, dependencies or CSS illustrations substitute for missing imagery.
- Source ZIP integrity/exclusions and embedded standalone identity checked during packaging. Dependencies, secrets, raw generated PNGs, uploads and recursive deliverables are excluded.

Provenance records exact submitted prompts, actual tool-returned local paths, source/output hashes, dimensions/mode and processing. The tool supplied no model identifier or licence terms; neither is inferred. Original user-upload provenance remains in concept-provenance.json.

## Pending / limitations

Browser-tool discovery found no browser-control capability. No actual desktop/tablet/mobile (including 375×667 and 320px) rendering, computed-style/overflow measurement, live reveal pacing, native dialog focus trapping, device WhatsApp handoff or browser-scale image framing/alpha review was performed. No new website screenshots or recording could be captured. Automated DOM tests and local image review do not establish visual pacing or responsive layout acceptance; MANUAL_QA.md contains the pending steps.

No hosted preview was started or deployed. Runnable source and standalone downloads are in deliverables/. The original DK source remains provisional and black-backed, shown through the existing exact-raster CSS crop/blend; a faithful transparent production master remains a separate launch requirement. Owner asset-rights/brand approval remains outstanding. There is no incomplete generation or missing category asset in this task.

## Collection-experience refinement

No images were regenerated or modified. All 35 concepts, five categories and 74 WebPs remain unchanged. The collection H1 is now The Dadinkowa Edit; homepage branding/reveal components are unchanged.

Source inspection found overlapping filter/observer card animations, whole-route animation and inherited card offsets/widths, plus an absolute dialog-close button inside a scrolling container. Those were removed or isolated. Cards now enter in 320ms with at most 80ms staggering and a visible 85% starting opacity; they do not use the slow observer reveal. The keyed grid survives filtering, retaining surviving card nodes. The collection route does not fade the entire grid. This addresses concrete source risks; the recorded blank interval was not directly observed.

Dialog close/enquiry controls occupy non-scrolling header/footer layout rows around a scrollable body; they are not overlays. There is exactly one disclosure per dialog, with no counter or image arrows for a one-image record. Existing genuine multi-image navigation, zoom, Escape, native modal behavior, body lock and focus restoration tests pass. Close restores captured window coordinates; enquiry navigation does not restore stale coordinates.

New tests exercise BrowserRouter and HashRouter back/forward, selected-category URL/counts, the mobile selector, explicit-change result-heading focus, stable grid/card identities, persistent-control DOM placement, disclosure deduplication and close restoration of category/focus/scroll position. The standalone checker additionally exercises the real built mobile selector, all direct category hash URLs and single-image detail markup. Native focus containment, sticky geometry, scroll physics and animation quality are not established by these tests.

The attached 20261026-2149-29.4804431.mp4 could not be transferred: it exceeds the file tool's 32 MiB limit. Its frames/timestamps were not inspected; the user's written timestamp feedback guided the fixes. Browser-control tooling remains unavailable, so desktop/375×667/320px visual QA, screenshots and demonstration recording remain pending. No merge or deployment.
