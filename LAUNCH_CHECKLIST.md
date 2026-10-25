# Remaining requirements — draft, not deployed

## Temporary stock photography (integrated; browser QA pending)

- [x] User downloads/uploads the nine exact originals in `PHOTOGRAPHY_REQUEST.md`. No further blocked-download retries are planned.
- [x] Inspect actual images for composition, quality, suitability, watermarks and source consistency. Page metadata is not visual inspection.
- [x] Optimise to 700/1400px WebP using `scripts/prepare-photos.py`, update inventory/asset manifest and integrate the real images. All nine supplied photos are installed; originals and working review sheets are excluded from Git.
- [x] Set contained human-subject framing and mobile hero separation; inspect originals and correct alt text/content discrepancies.
- [ ] Verify those framing choices in actual desktop/mobile browser renders. All stock disclosures remain visible.
- [x] Regenerate standalone preview with installed photos.
- [ ] Repeat real-browser QA for crops and animations.

## Design and functional review

- [x] Rebuild editorial page compositions and readable component structure.
- [x] Implement hero schedule/pause/interaction handling, reveal/stagger/parallax rules, filter/card/dialog/menu/route transitions and reduced-motion behaviour.
- [x] Fix section/skip navigation in BrowserRouter and standalone HashRouter; add media-state regressions.
- [ ] Run the real-browser matrix and exact steps in `MANUAL_QA.md` at 390/768/1440px (plus 360px overflow check). Confirm actual animation, contrast, cropping, focus trapping, mobile menu and keyboard operation.
- [ ] Capture screenshots and an optional motion recording. Neither was available in this session.
- [ ] Verify native WhatsApp handoff on actual devices without unintended sending; verify phone/copy and directions.
- [ ] Measure performance/accessibility once representative real media is present. No Core Web Vitals or Lighthouse scores are claimed.

## Owner approval before launch

- [ ] Approve DK/T-shirt logo fidelity and supply a production master, favicon and social sharing image.
- [ ] Replace temporary stock references with approved brand media and truthful catalogue descriptions; set each record's status/captions/source correctly.
- [ ] Approve editorial copy, palette and typography; no owner/founder/history claims are invented.
- [ ] Confirm catalogue, availability, prices, sizing/fitting process, production times, deposits, cancellation/alteration/return policies.
- [ ] Confirm delivery coverage/charges and visiting arrangements. Hours/email remain omitted until verified.
- [ ] Confirm the second contact number's role; it remains excluded. Recheck primary phone, WhatsApp, Maps/social links and landmark wording with the owner.
- [ ] Select hosting/domain ownership with explicit authorisation; configure HTTPS, SPA fallback and genuine asset 404s. No deployment, domain purchase or merge is authorised in this pass.
- [ ] Approve canonical/social URLs and enable indexing only after the content is ready. Preview remains noindex.

Payments, inventory, checkout, accounts/CMS/admin, scheduling and analytics remain outside scope.

## Exhibition refinement

- [x] Increase descriptive text to 17–18px, secondary text to 14px minimum, strengthen muted contrast and add solid reading surfaces.
- [x] Centralise motion timings; slow hero/storytelling while leaving controls immediately responsive.
- [x] Inspect and generate five face-free garment crops plus a cap-pattern detail, retaining stock-reference provenance.
- [x] Add manual 2.5D photographic Garment Gallery with explicit buttons, neighbour selection, swipes, keyboard access and reduced-motion handling.
- [ ] Review the actual gallery depth, crop edges, type wrapping and overflow at 390/768/1440px in a real browser. State tests are not visual acceptance.
- [ ] Capture screenshots and a short recording of the slow hero and manual gallery. Browser tooling remains unavailable in this session.
- [ ] Obtain approved native garment-on-mannequin/hanger images or isolated garment layers and independent accessory shots if those become part of the production art direction. Do not substitute unrelated Western suiting or fabricate back views.

## Recording-led refinement

- [x] Inspect representative feedback frames, including hero double-image overlap at 4–7 seconds and gallery navigation/caption separation at 17–19 seconds.
- [x] Replace multi-photo opacity blending with a single-photo, decode-aware staged cover/unveil and latest-request-wins cancellation.
- [x] Remove white frame chrome; add background/floor/foreground separation and a compact side/below reading rail with explicit controls.
- [x] Coordinate image/heading/copy entrances at 0/140/280ms with a roughly 930ms total sequence and visible initialization fallback.
- [x] Strengthen descriptive copy and reduce excessive heading-to-copy scale; remove heading container width restrictions and older direct-child copy inheritance from the hero reading block.
- [ ] Inspect new computed styles and actual render at the recording size (1916×874), 1440×900, 768×1024 and 390×844. Also test browser zoom and shorter windows.
- [ ] Confirm no visible double exposure, awkward wipe, gallery overflow or garment clipping; capture desktop/mobile screenshots and a short recording. Browser tooling remains unavailable.
- [ ] Obtain the exact clean native garment/mannequin/hanger assets described in ASSET_MANIFEST.md if a genuinely isolated garment presentation is required; do not force a cutout from the current references.
