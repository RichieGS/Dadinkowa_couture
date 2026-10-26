# Test results — Living Atelier

26 October 2026. Source branch: `feat/dadinkowa-website-mvp`. Baseline checkpoint: `7ed70e2` / `checkpoint/pre-living-atelier-20261025`. Same draft PR #1; nothing merged or deployed.

## Passed

- Prettier format check, TypeScript build/type check, ESLint.
- **51 Vitest tests across 8 files:** browsing/enquiries/dialogs (10), router-safe navigation in BrowserRouter/HashRouter (6), concept composition and qualified drafts (5), all four media statuses (13), persistent/visible-fallback entrance initialization/reduced-motion bypass (4), concept delivery integrity (1), single-copy text reveal lifecycle (9), brand identity/accessibility (3).
- Production Vite build: 59 modules; JS 292.34 kB / gzip 92.72 kB; CSS 55.68 kB / gzip 12.00 kB.
- Regenerated standalone `/workspace/work/Dadinkowa-Preview.html`: 2,695,400 bytes. Actual embedded production bundle executed in jsdom: all three HashRouter routes, collection/skip/cross-route Atelier anchors, All/Tailoring filtering, three concept records, native-dialog lifecycle shim and focus restoration, embedded logo and concept WebPs. No simulated runtime errors.
- Pillow decoded all ten responsive WebPs; dimensions match concept-provenance.json; no EXIF. All six garment outputs retain alpha with transparent pixels and opaque garment interior. Total WebP bytes: **1,204,352**.
- Source PNG transparency inspected by local charcoal/ivory composites: no conspicuous halo at reviewed scale. Full silhouettes retained; no destructive edge removal. This is image inspection, not website/browser QA.
- Preserved logo SHA-256 matches checkpoint: `afd052d45ce3f99f246d8587a8ddd6c4d3b8e00887e542cf0d1271ccea9973e4`.
- Old stock WebPs removed from shipped directory; exactly three unique garment concepts and two conceptual cloth/details in ten responsive files. Mockup is not embedded. Diff whitespace check passed.

The replaced slideshow/rotating gallery no longer exists, so their 18 obsolete state tests were replaced with five current-composition tests. Stock-delivery checks now verify current concept assets. Navigation/enquiry/dialog regression coverage remains. Test counts are not a claim of equivalent visual coverage.

During standalone validation, the first checker treated the shared Home/Lookbook heading as proof of route completion; another attempt selected a trigger before the filter rerender finished. The checker now waits for the route container and pressed filter state, then checks the connected trigger. Final run passes. These were checker synchronization errors, not live browser evidence.

## Not performed / pending

Tool discovery found no browser-control or Node browser REPL capability. No actual desktop/mobile rendering, computed-style inspection, horizontal-overflow measurement, motion smoothness, native dialog focus trapping, device WhatsApp handoff, live reduced-motion appearance, browser-scale alpha review, Lighthouse or performance measurement was performed. **375×667 visual QA is pending**, alongside desktop/tablet/390px review. No updated-site screenshots or short recording could be captured.

No server was started for browser QA because the managed environment has no browser-control tool. No external preview forwarding or file-attachment upload capability is available. The standalone preview and a clean source ZIP are available in `deliverables/` for GitHub download and can be reproduced with README commands. No hosted preview/deployment link is claimed.

Use MANUAL_QA.md for the exact pending steps and LAUNCH_CHECKLIST.md for release requirements.

## Text-entrance refinement

Single-copy heading words retain native whitespace and italic markup. Measured visual lines share 1100ms mask/rise/fade timing at 200ms increments, capped at 1800ms including the last line. Padding around word masks protects italic overhangs and descenders. Paragraphs animate as blocks (16px / 1000ms / 240ms overlap), with no per-word body animation. Hero garment begins 320ms later and settles; controls, notices and contact/form details stay immediately usable. Fabric intensity is reduced and AI notice contrast strengthened. Explicit spaces around responsive line breaks fix “enquiry. Speak”.

Nine lifecycle tests check heading-level observation at 83%, semantic spaces/italics/single-copy text, shared line delays, persistent completion, no restart on unchanged resize/font readiness, finalization on changed wrapping/width, fast scrolling/passed headings, dynamic reduced motion and visible fallback without a working observer. Existing route/menu/filter/dialog/enquiry tests still pass. These tests do not establish line clipping, actual responsive geometry or perceived pacing.

No new desktop/mobile recording was attached to this request. The workspace contains only the earlier pre-Living-Atelier recording, which is not evidence about this text refinement. Browser-tool discovery again found no browser-control capability. Actual slow/fast/back scroll, font/resize visual behavior, live reduced motion, 375×667 framing/readability/masks and a demonstration recording remain explicitly pending.

## Brand-led identity

Three regressions verify the single live DADINKOWA COUTURE H1, intact name, separate tagline, one home-link name with decorative signature hidden from repeat announcement, edit/atelier/footer identity and preserved actions. The original DK raster/garment assets are unchanged. Source transparency attempt was rejected due to a halo; the shipped exact-raster crop/screen-blend fallback has no new invented symbol. A faithful transparent master remains outstanding.

Browser discovery again returned no browser-control tool. Actual desktop/tablet/375×667/320px rendering, shirt/needle/crop-edge fidelity at small size, wordmark wrapping/overflow, contrast and brand-entrance pacing remain pending. No screenshots or recording captured. Automated text assertions do not establish visual legibility. No merge or deployment.
