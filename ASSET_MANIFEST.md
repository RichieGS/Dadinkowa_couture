# Asset and permission register — 25 October 2026

## Current status

**Photography is incomplete.** The original clothing SVG illustrations have been removed. No replacement photo bytes are bundled yet. Each proposed photograph has an explicit pending slot; the site does not request nonexistent files or imply that pending slots are real product images. Download attempts received proxy HTTP 403. At the user's direction, downloads are not retried; the user will supply manually downloaded originals. Source pages and licence pages were read; actual image composition/quality has not been visually verified.

All photo slots are `stock-reference`. The disclosure is “Style inspiration — reference photography, not Dadinkowa products.” No model is a claimed customer; the sewing reference is not Dadinkowa’s workshop. Each current look has one image: no unrelated shots are treated as matching views.

## Proposed photographs (all PENDING upload, visual review, optimisation and integration)

Paths are under `public/media/`; each stem will have `-700.webp` and `-1400.webp` variants. See `PHOTOGRAPHY_REQUEST.md` for original filenames and placement. Actual alt text and focal positions live in `src/data.ts` and remain provisional until the images are inspected.

| Output stem | Photo page / photographer | Licence | Intended slot and provisional alt | Replacement requirement |
| --- | --- | --- | --- | --- |
| `portrait` | [Unsplash DdNa5AdiRdo](https://unsplash.com/photos/man-in-traditional-nigerian-attire-DdNa5AdiRdo), Chidera Faustina Okeke | [Unsplash](https://unsplash.com/license) | Hero 2; reference portrait of a Nigerian man in patterned traditional attire | Upload and visually inspect original; later replace with approved brand campaign photograph |
| `cap-portrait` | [Unsplash xZpVJsIcaiM](https://unsplash.com/photos/man-wearing-traditional-african-attire-with-striped-headwrap-xZpVJsIcaiM), Chidera Faustina Okeke | [Unsplash](https://unsplash.com/license) | Accessories; reference side portrait with striped traditional cap | Upload/review; approved actual accessory photograph before catalogue launch |
| `agbada-burgundy` | [Pexels 37766536](https://www.pexels.com/photo/stylish-african-man-wearing-traditional-agbada-37766536/), mk_photoz | [Pexels](https://www.pexels.com/license/) | Hero 1 / featured tailoring; reference burgundy Agbada portrait | Upload/review; actual approved garment photo |
| `agbada-blue` | [Pexels 37320670](https://www.pexels.com/photo/man-wearing-traditional-nigerian-agbada-outfit-37320670/), Taiye Salawu | [Pexels](https://www.pexels.com/license/) | Native collection / look; reference blue Agbada portrait | Upload/review; actual approved garment photo |
| `sewing` | [Pexels 17710255](https://www.pexels.com/photo/sewing-close-up-17710255/), Cemrecan Yurtman | [Pexels](https://www.pexels.com/license/) | Atelier; reference sewing machine close-up | Upload/review; approved Dadinkowa process media, never claim stock workshop is the brand's |
| `fabric-stack` | [Pexels 6766360](https://www.pexels.com/photo/a-stack-of-assorted-folded-fabrics-on-a-shelf-6766360/), Tima Miroshnichenko | [Pexels](https://www.pexels.com/license/) | Fabric collection / look; reference folded fabric shelves | Upload/review; approved fabric selection with truthful availability |
| `kaftan-sand` | [Pexels 34362606](https://www.pexels.com/photo/man-in-traditional-african-kaftan-outfit-34362606/), Skylight Views | [Pexels](https://www.pexels.com/license/) | Hero 3 / feature; reference sand-toned kaftan portrait | Upload/review; actual approved garment photograph |
| `kaftan-earth` | [Pexels 38188493](https://www.pexels.com/photo/modern-portrait-of-man-in-traditional-nigerian-kaftan-38188493/), Taiye Salawu | [Pexels](https://www.pexels.com/license/) | Ready-to-wear collection; reference earth-toned Nigerian attire | Upload/review; actual approved ready-to-wear photograph |
| `fabric-bronze` | [Pexels 4938322](https://www.pexels.com/photo/brown-folded-fabric-4938322/), Kaboompics | [Pexels](https://www.pexels.com/license/) | Full-width craft interlude; reference brown cloth folds | Upload/review; approved brand fabric macro |

The free-use licence terms were verified on the platforms, but no separate releases have been obtained or claimed. Endorsement is not implied. No images are purchased, hotlinked, scraped from a brand catalogue or rehosted through an alternate download service. There is no remote photo loading in the current application.

## Bundled assets

| Path | Source / status | Use | Replacement requirement |
| --- | --- | --- | --- |
| `public/media/logo-draft.png` | User-supplied reconstructed raster PNG; provisional | Header; original DK/T-shirt motif retained without stretching | Owner-approved production logo master |
| `public/favicon.svg` | Original type-only DK placeholder | Browser tab, not certified logo | Approved favicon derived from final logo |
| `public/media/og-placeholder.svg` | Original type-only placeholder | Sharing metadata | Approved social sharing graphic with final domain |

System serif and sans-serif stacks only; no third-party font downloads. TikTok items are external links only. Supplied original-logo screenshot and superseded horizontal concept remain references and are not displayed. No screenshot phone controls appear on the site.

## Media state contract

`illustration`, `stock-reference` and `approved-brand` have distinct card/dialog notices and WhatsApp qualifications in `src/media.ts`. Approved-brand images receive no illustrative/stock disclosure. The record's factual image alt/caption/source must also be updated with the actual approved asset; changing a status is not a substitute for approval. `photo-inventory.json` tracks whether an optimised local file exists, independently of ownership status.
