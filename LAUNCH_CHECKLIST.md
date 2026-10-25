# Remaining requirements — draft, not deployed

## Immediate photography handoff (INCOMPLETE)

- [ ] User downloads/uploads the nine exact originals in `PHOTOGRAPHY_REQUEST.md`. No further blocked-download retries are planned.
- [ ] Inspect actual images for composition, quality, suitability, watermarks and source consistency. Page metadata is not visual inspection.
- [ ] Optimise to 700/1400px WebP using `scripts/prepare-photos.py`, update inventory/asset manifest and integrate the real images. Current preview shows explicit pending slots, not the old clothing illustrations.
- [ ] Review hero and mobile focal positions/crops after integration. Confirm all disclosures, alt text and captions are accurate.
- [ ] Regenerate standalone preview with installed photos and repeat browser QA.

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
