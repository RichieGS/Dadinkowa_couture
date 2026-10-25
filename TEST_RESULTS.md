# Test results — Living Atelier

25 October 2026. Source branch: `feat/dadinkowa-website-mvp`. Baseline checkpoint: `7ed70e2` / `checkpoint/pre-living-atelier-20261025`. Same draft PR #1; nothing merged or deployed.

## Passed

- Prettier format check, TypeScript build/type check, ESLint.
- **39 Vitest tests across 6 files:** browsing/enquiries/dialogs (10), router-safe navigation in BrowserRouter/HashRouter (6), concept composition and qualified drafts (5), all four media statuses (13), persistent/visible-fallback entrance initialization/reduced-motion bypass (4), concept delivery integrity (1).
- Production Vite build: 58 modules; JS 289.45 kB / gzip 91.80 kB; CSS 50.89 kB / gzip 11.01 kB.
- Regenerated standalone `/workspace/work/Dadinkowa-Preview.html`: 2,687,715 bytes. Actual embedded production bundle executed in jsdom: all three HashRouter routes, collection/skip/cross-route Atelier anchors, All/Tailoring filtering, three concept records, native-dialog lifecycle shim and focus restoration, embedded logo and concept WebPs. No simulated runtime errors.
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
