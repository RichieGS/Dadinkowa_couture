# Photography handoff — supplied and integrated

All nine requested photographs were supplied in `DDK_img.zip`, matched by exact source IDs, inspected locally, optimised and integrated on 25 October 2026. **No ambiguous filename matches were found.** No further online downloads were attempted. The upload filenames differ from the requested slot names but retain each platform's unique photo ID; `photo-provenance.json` records the exact mapping, original SHA-256 and output integrity data.

Visual inspection corrected two source-page descriptions: photo 37766536 shows a burgundy tunic with a baseball cap, not Agbada with a traditional cap; the `agbada-burgundy` slot name is retained for mapping stability, while its alt text is corrected. The sand kaftan has a visible clothing tag, retained unaltered in the stock reference. The cap portrait is a rear three-quarter view. No visible image watermarks were observed.

The originals are retained in local working storage and excluded from Git. Eighteen responsive WebP files are installed under `public/media/`. All remain **stock-reference**. The following source register records the requested names and their original photo pages; it does not claim these are Dadinkowa products or customers.

| Filename | Photographer / source page | Planned placement |
| --- | --- | --- |
| `portrait.jpg` | [Chidera Faustina Okeke / Unsplash DdNa5AdiRdo](https://unsplash.com/photos/man-in-traditional-nigerian-attire-DdNa5AdiRdo) | Hero slide 1 |
| `cap-portrait.jpg` | [Chidera Faustina Okeke / Unsplash xZpVJsIcaiM](https://unsplash.com/photos/man-wearing-traditional-african-attire-with-striped-headwrap-xZpVJsIcaiM) | Accessories collection / look |
| `agbada-burgundy.jpg` | [mk_photoz / Pexels 37766536](https://www.pexels.com/photo/stylish-african-man-wearing-traditional-agbada-37766536/) | Featured tailoring look (burgundy tunic; corrected description) |
| `agbada-blue.jpg` | [Taiye Salawu / Pexels 37320670](https://www.pexels.com/photo/man-wearing-traditional-nigerian-agbada-outfit-37320670/) | Hero slide 2 / main native styles collection / look |
| `sewing.jpg` | [Cemrecan Yurtman / Pexels 17710255](https://www.pexels.com/photo/sewing-close-up-17710255/) | Atelier detail, never represented as Dadinkowa’s workshop |
| `fabric-stack.jpg` | [Tima Miroshnichenko / Pexels 6766360](https://www.pexels.com/photo/a-stack-of-assorted-folded-fabrics-on-a-shelf-6766360/) | Fabric collection / look |
| `kaftan-sand.jpg` | [Skylight Views / Pexels 34362606](https://www.pexels.com/photo/man-in-traditional-african-kaftan-outfit-34362606/) | Hero slide 3 / featured ready-to-wear direction |
| `kaftan-earth.jpg` | [Taiye Salawu / Pexels 38188493](https://www.pexels.com/photo/modern-portrait-of-man-in-traditional-nigerian-kaftan-38188493/) | Ready-to-wear collection / look |
| `fabric-bronze.jpg` | [Kaboompics / Pexels 4938322](https://www.pexels.com/photo/brown-folded-fabric-4938322/) | Full-width texture interlude |

[Unsplash licence](https://unsplash.com/license) permits free commercial use and modification, with the listed restrictions against selling unmodified copies or building a competing image service. [Pexels licence](https://www.pexels.com/license/) permits free use and modification; attribution is optional, and endorsement by pictured people must not be implied. This project will credit sources in its asset register and display the stock-reference disclosure. No model is represented as a customer, and no stock garment as inventory.

## Processing and framing

`python3 scripts/prepare-photos.py /path/to/originals` produced 700px/1400px WebP variants at quality 82, preserving full compositions and removing EXIF. Original photo bytes total 19,866,025; all eighteen variants total 2,147,150 bytes. The 1400px primary hero is 357,476 bytes. No upscaling, retouching, fabricated alternate views or stock/brand ownership relabelling was performed.

Human-subject placements use contained framing, per-photo neutral backgrounds and edge padding. On mobile, the hero image sits above the copy instead of underneath it, allowing more vertical space rather than concealing the garment. Fabric references use focal crops; the Atelier preserves the sewing image's native landscape ratio so hands and needle remain visible. These framing rules and the source/optimised images were inspected; their actual browser rendering remains unverified because browser tooling is unavailable. Follow `MANUAL_QA.md` before accepting final crops or motion.
