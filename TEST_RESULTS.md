# Verification results — 25 October 2026

## Passed

- `npm run typecheck` — TypeScript passes.
- `npm run lint` — ESLint passes across application, tests, configuration and preview verification script.
- `npm test` — 11/11 Vitest checks pass in jsdom:
  1. Every category filters correctly; empty input is handled.
  2. WhatsApp uses `2348033895505`, with correctly encoded punctuation, Unicode, newlines and illustrative-reference qualification.
  3. Every demonstration record is marked illustration and has no invented price/stock fields.
  4. Lookbook filters the rendered records and announces counts.
  5. Detail viewer advances images, zooms, handles native cancel and restores trigger focus in the DOM simulation.
  6. Selected look flows into the contact composer and opens the correct mocked WhatsApp draft.
  7. Whitespace-only message is rejected without opening WhatsApp.
  8. Menu opens and closes on navigation.
  9. Image failure displays a usable fallback.
  10. Every route has one H1 and the verified Maps destination.
  11. Hero changes only in response to manual controls and updates the active state.
- `npm run build` — Vite production bundle built successfully, 42 modules. Approximate output: 287KB JavaScript (91KB gzip), 21KB CSS (5KB gzip). These are build sizes, not Core Web Vitals measurements.
- Production HTTP smoke check via Vite preview: `/`, `/lookbook`, `/contact` each return HTTP 200 and the noindex SPA entry. Production JS/CSS return 200.
- All original SVG assets parse as valid XML.
- `python3 scripts/pack-preview.py /workspace/work/Dadinkowa-Preview.html` — creates 1,066,095-byte self-contained offline preview.
- `node scripts/check-preview.mjs /workspace/work/Dadinkowa-Preview.html` — executes the actual embedded production bundle in jsdom with a file URL; Home, Lookbook and Contact hash routes render; filtering and embedded logo/illustrations work; no simulated runtime errors.

The dialog tests exposed and resolved focus restoration being disrupted by premature React autofocus. Native dialog focusing is now allowed to occur after the trigger is captured.

## Not run / practical limits

No callable browser-control tool was exposed after discovery. No real-browser screenshots, viewport layout/overflow measurements at 360/390/768/1440px, native focus-trap validation, actual OS reduced-motion checks, Lighthouse/accessibility audit or Core Web Vitals run was performed. jsdom checks do not prove visual quality or native browser interaction. Responsive CSS, touch controls, native dialog semantics and reduced-motion rules are implemented and need the real-device QA listed in the launch checklist.

No WhatsApp messages were sent, no real orders/fittings were made, and no external social destination was mutated. Outgoing window.open is mocked in tests. External links are grounded in the supplied research, not independently revalidated this session.

The designated `/codex/browser/projectless/0001-files-mentioned-by-the-user-uploaded-file-pointe/output` export directory does not exist on this attached execution host and cannot be created with its filesystem permissions. Implementation remains in `/workspace/Dadinkowa_couture`; the standalone preview and source ZIP are staged in `/workspace/work`. This is a delivery-path limitation, not a build failure. No site registration, deployment or purchase occurred.
