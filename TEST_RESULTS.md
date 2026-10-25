# Verification results — recording-led refinement, 25 October 2026

## Visual feedback actually inspected

The supplied recording is approximately 31.23 seconds at 1916×874 pixels. Local frame inspection at 0/4/5.5/7/12/17/18/19/24/30 seconds showed the existing hero double-image overlap and gallery frame movement, with the garment and reading/control area separated by excessive vertical space. Extracted frames/video/audio remain outside Git and are not site assets.

This is evidence about the previous presentation. It does not establish the new site's computed styles, browser zoom, device-pixel ratio, cropping, motion quality or viewport fit.

## Implemented response

- **Hero:** one mounted photograph, not two opacity-blended layers. The current view stays while a responsive image decodes, then a 220ms opaque cover precedes a source change and 1180ms unveil/slight movement. Total visual transition is 1400ms, followed by 9000ms settled hold. The initial view holds 9 seconds. Late decoding can extend the current readable view. Latest requests replace timers/readiness generations; no transition queue is maintained. Hidden tabs/reduced motion settle pending phases. Image failures do not poison later slides.
- **Text coordination:** heading and supporting copy enter after the image begins revealing; CTAs are outside that sequence. During reading, text is stationary. A separate reading wrapper avoids older direct-child paragraph rules; main copy is 17–18px, normally 18px, with smaller headline caps and no container-scale treatment on reading areas.
- **Gallery:** white mat borders removed. A backdrop, projected floor, recessed neighbours and active foreground plane/shadow establish depth. Captions and explicit controls are in a stationary side rail on desktop and directly below the garment on mobile. A reserved two-line title area avoids control shifts between shorter/longer titles. Stage height is viewport/header-aware; images stay contained instead of being clipped to force a fit. Actual fit remains unverified.
- **Section entrances:** one group observes a 22% useful portion with an 8% lower viewport inset. Image/heading/copy start at 0/140/280ms and settle by roughly 930ms. Groups are unobserved after entry; content is visible before initialization and survives an unavailable/failed observer. Native scroll remains intact.

No new image was downloaded, purchased, isolated or fabricated. Existing face-free Nigerian clothing references retain their stock-reference disclosure/source records. Clean native garment/mannequin/hanger assets remain a gap; current scenery/model backgrounds were not forced into poor cutouts. No 360-degree geometry is claimed.

## Checks actually passed

| Check | Result |
| --- | --- |
| `npm run format:check` | Passed |
| `npm run typecheck` | Passed |
| `npm run lint` | Passed |
| `npm test` | **49/49**, seven files |
| `npm run build` | Passed, 60 modules; approximately 302KB JS (95KB gzip), 43KB CSS (9KB gzip) |
| Production routes | Home/Lookbook/Contact return HTTP 200 and noindex metadata |
| Media integrity/HTTP | All 30 WebP files decode, have no EXIF and serve correct MIME/identical bytes |
| Standalone preview | Regenerated, approximately 5.62MB; all 30 exact WebP files embedded, no remote photo dependency |
| Offline production bundle | Three HashRouter routes, section/skip/Atelier links, filters, gallery selection/details, modal close/focus restoration and installed images pass in jsdom; no simulated runtime errors |
| `git diff --check` | Passed |

### Regression scope

- 11 hero tests: first hold, cover/source-change boundary, single mounted image, post-settle hold, rapid latest-request-wins navigation, selecting current image cancels pending work, pointer pause/play, wheel/CTA stops, hidden-tab settlement, reduced-motion manual operation, image-failure recovery, stale decoded-image promises and actual component/readiness integration. Some tests exercise multiple related assertions.
- 3 entrance tests: one group rather than nested independent observations, persistent entry/unobserve, visible content before initialization and fallback when the observer is unavailable or throws.
- 7 gallery tests: central/neighbour state, caption outside tilt layers, immediate controls/wrap/Explore, neighbour selection, keyboard/focus, horizontal versus vertical touch/swipe click suppression, no autoplay and reduced-motion controls/focus.
- 10 browsing/enquiry, 10 media-status, 6 dual-router navigation and 2 image integrity tests remain passing.

These are state, event, source and integrity checks. They do not prove that a wipe looks clean, that dimensional depth is convincing or that animation is smooth.

## Readability and visual-QA limits

The cascade/source audit covers paragraph rules, heading scale, line lengths, settled opacity, unscaled caption containers and stable solid reading surfaces. Existing declared solid colour pairs remain above 4.5:1 (representative minimum 5.93:1). No new computed-style measurement or rendered contrast audit could be performed.

Tool discovery exposed no callable browser-control tool. Therefore the revised page has **not** been inspected in a live browser at the recording size, desktop or mobile. Actual computed styles/inherited opacity/scale, viewport fit, horizontal overflow, caption stability, native focus trapping, reduced-motion visuals, image crop edges and rendered animation remain unverified. No new desktop/mobile screenshots or motion recording were captured. Local extracted feedback frames are not new-page screenshots.

`MANUAL_QA.md` includes exact checks at 1916×874, 1440×900, 768×1024 and 390×844, including browser zoom, throttled decoding, rapid controls and offline routing. Short windows may need natural scrolling; the implementation does not clip garments to guarantee a one-screen claim.

No merge, deployment, purchase or message to the business occurred. Raw uploads, video/frames, generated previews/builds, dependencies, caches and credentials are excluded from the commit.
