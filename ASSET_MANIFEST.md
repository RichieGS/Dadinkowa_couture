# Asset and permission register — 25 October 2026

## Current status

All nine requested originals were supplied in `DDK_img.zip` and integrated after local visual inspection. Exact source-ID matches resolve every file; there are no ambiguous matches. The original names, IDs and SHA-256 hashes are in `photo-provenance.json`, together with dimensions, byte sizes and SHA-256 for all eighteen local WebP outputs. No new remote downloads were attempted.

The originals total 19,866,025 bytes. Two responsive variants per image total 2,147,150 bytes. Variants preserve the full photograph, with no image retouching, upscaling or fabricated views; EXIF was removed. Actual browser screenshots/crop checks remain unrun.

All photo slots are `stock-reference`. The disclosure is “Style inspiration — reference photography, not Dadinkowa products.” No model is a claimed customer; the sewing reference is not Dadinkowa’s workshop. Each current look has one image: no unrelated shots are treated as matching views.

## Integrated photographs (all stock-reference)

Paths are under `public/media/`; each stem has `-700.webp` and `-1400.webp` variants. See `PHOTOGRAPHY_REQUEST.md` for original filenames and placement. Inspected alt text, contained framing and focal positions live in `src/data.ts`. Browser-level framing review is still required.

| Output stem | Photo page / photographer | Licence | Intended slot and inspected description | Replacement requirement |
| --- | --- | --- | --- | --- |
| `portrait` | [Unsplash DdNa5AdiRdo](https://unsplash.com/photos/man-in-traditional-nigerian-attire-DdNa5AdiRdo), Chidera Faustina Okeke | [Unsplash](https://unsplash.com/license) | Hero 1; reference portrait of a Nigerian man in patterned traditional attire | Integrated; later replace with approved brand campaign photograph |
| `cap-portrait` | [Unsplash xZpVJsIcaiM](https://unsplash.com/photos/man-wearing-traditional-african-attire-with-striped-headwrap-xZpVJsIcaiM), Chidera Faustina Okeke | [Unsplash](https://unsplash.com/license) | Accessories; reference rear three-quarter portrait with striped traditional cap | Integrated; approved actual accessory photograph before catalogue launch |
| `agbada-burgundy` | [Pexels 37766536](https://www.pexels.com/photo/stylish-african-man-wearing-traditional-agbada-37766536/), mk_photoz | [Pexels](https://www.pexels.com/license/) | Featured tailoring; burgundy tunic, sunglasses and baseball cap (source metadata corrected) | Integrated; actual approved garment photo |
| `agbada-blue` | [Pexels 37320670](https://www.pexels.com/photo/man-wearing-traditional-nigerian-agbada-outfit-37320670/), Taiye Salawu | [Pexels](https://www.pexels.com/license/) | Hero 2 / native collection / look; reference blue Agbada portrait | Integrated; actual approved garment photo |
| `sewing` | [Pexels 17710255](https://www.pexels.com/photo/sewing-close-up-17710255/), Cemrecan Yurtman | [Pexels](https://www.pexels.com/license/) | Atelier; reference sewing machine close-up | Integrated; approved Dadinkowa process media, never claim stock workshop is the brand's |
| `fabric-stack` | [Pexels 6766360](https://www.pexels.com/photo/a-stack-of-assorted-folded-fabrics-on-a-shelf-6766360/), Tima Miroshnichenko | [Pexels](https://www.pexels.com/license/) | Fabric collection / look; reference folded fabric shelves | Integrated; approved fabric selection with truthful availability |
| `kaftan-sand` | [Pexels 34362606](https://www.pexels.com/photo/man-in-traditional-african-kaftan-outfit-34362606/), Skylight Views | [Pexels](https://www.pexels.com/license/) | Hero 3 / feature; reference sand-toned kaftan portrait with visible clothing tag | Integrated; actual approved garment photograph |
| `kaftan-earth` | [Pexels 38188493](https://www.pexels.com/photo/modern-portrait-of-man-in-traditional-nigerian-kaftan-38188493/), Taiye Salawu | [Pexels](https://www.pexels.com/license/) | Ready-to-wear collection; reference earth-toned Nigerian attire | Integrated; actual approved ready-to-wear photograph |
| `fabric-bronze` | [Pexels 4938322](https://www.pexels.com/photo/brown-folded-fabric-4938322/), Kaboompics | [Pexels](https://www.pexels.com/license/) | Full-width craft interlude; reference brown cloth folds | Integrated; approved brand fabric macro |

## Inspection notes

- All nine originals were inspected via a labelled contact sheet, and output dimensions/formats/aspect ratios were checked with Pillow. No visible watermarks were observed.
- `37766536` is a tunic/baseball-cap portrait, despite the original source-page Agbada title. Alt text and this register are corrected; the stable output stem remains `agbada-burgundy`.
- The sand kaftan photograph has a visible clothing tag. It is retained without claiming Dadinkowa ownership or endorsement.
- No second photograph is assigned as a front/back/detail view. The original Unsplash pair appears to share an outfit, but remains independently assigned rather than manufacturing a catalogue view set.
- Portraits are contained with padding; mobile hero text is placed below the photo. Macro/process crops use explicit focal positions and a native-ratio Atelier frame. Real-browser verification remains open.

The free-use licence terms were verified on the platforms, but no separate releases have been obtained or claimed. Endorsement is not implied. No images are purchased, hotlinked, scraped from a brand catalogue or rehosted through an alternate download service. There is no remote photo loading in the current application.

## Bundled assets

| Path | Source / status | Use | Replacement requirement |
| --- | --- | --- | --- |
| `public/media/logo-draft.png` | User-supplied reconstructed raster PNG; provisional | Header; original DK/T-shirt motif retained without stretching | Owner-approved production logo master |
| `public/favicon.svg` | Original type-only DK placeholder | Browser tab, not certified logo | Approved favicon derived from final logo |
| `public/media/og-placeholder.svg` | Original type-only placeholder | Sharing metadata | Approved social sharing graphic with final domain |

System serif and sans-serif stacks only; no third-party font downloads. TikTok items are external links only. Supplied original-logo screenshot and superseded horizontal concept remain references and are not displayed. No screenshot phone controls appear on the site.

## Media state contract

`illustration`, `stock-reference` and `approved-brand` have distinct card/dialog notices and WhatsApp qualifications in `src/media.ts`. Approved-brand images receive no illustrative/stock disclosure. The record's factual image alt/caption/source must also be updated with the actual approved asset; changing a status is not a substitute for approval. `photo-inventory.json` tracks whether an optimised local file exists, independently of ownership status; all nine are installed.
