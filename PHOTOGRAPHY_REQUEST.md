# Photography handoff — INCOMPLETE

The network proxy rejected direct image downloads with HTTP 403. The user cannot change its allowlist and will manually download and upload originals. No further blocked download attempts will be made. No photograph has been downloaded, optimised, visually inspected or integrated in this pass. Source-page metadata and free-use licence pages were inspected on 25 October 2026. Selections remain provisional until the actual images can be reviewed for quality, composition, watermarks and suitability.

Please download the full-resolution original from each photo page. Use these exact names (JPEG/PNG/WebP extensions accepted) and upload the files, individually or in a ZIP:

| Filename | Photographer / source page | Planned placement |
| --- | --- | --- |
| `portrait.jpg` | [Chidera Faustina Okeke / Unsplash DdNa5AdiRdo](https://unsplash.com/photos/man-in-traditional-nigerian-attire-DdNa5AdiRdo) | Hero slide 2 |
| `cap-portrait.jpg` | [Chidera Faustina Okeke / Unsplash xZpVJsIcaiM](https://unsplash.com/photos/man-wearing-traditional-african-attire-with-striped-headwrap-xZpVJsIcaiM) | Accessories collection / look |
| `agbada-burgundy.jpg` | [mk_photoz / Pexels 37766536](https://www.pexels.com/photo/stylish-african-man-wearing-traditional-agbada-37766536/) | Hero slide 1 / featured tailoring look |
| `agbada-blue.jpg` | [Taiye Salawu / Pexels 37320670](https://www.pexels.com/photo/man-wearing-traditional-nigerian-agbada-outfit-37320670/) | Main native styles collection / look |
| `sewing.jpg` | [Cemrecan Yurtman / Pexels 17710255](https://www.pexels.com/photo/sewing-close-up-17710255/) | Atelier detail, never represented as Dadinkowa’s workshop |
| `fabric-stack.jpg` | [Tima Miroshnichenko / Pexels 6766360](https://www.pexels.com/photo/a-stack-of-assorted-folded-fabrics-on-a-shelf-6766360/) | Fabric collection / look |
| `kaftan-sand.jpg` | [Skylight Views / Pexels 34362606](https://www.pexels.com/photo/man-in-traditional-african-kaftan-outfit-34362606/) | Hero slide 3 / featured ready-to-wear direction |
| `kaftan-earth.jpg` | [Taiye Salawu / Pexels 38188493](https://www.pexels.com/photo/modern-portrait-of-man-in-traditional-nigerian-kaftan-38188493/) | Ready-to-wear collection / look |
| `fabric-bronze.jpg` | [Kaboompics / Pexels 4938322](https://www.pexels.com/photo/brown-folded-fabric-4938322/) | Full-width texture interlude |

[Unsplash licence](https://unsplash.com/license) permits free commercial use and modification, with the listed restrictions against selling unmodified copies or building a competing image service. [Pexels licence](https://www.pexels.com/license/) permits free use and modification; attribution is optional, and endorsement by pictured people must not be implied. This project will credit sources in its asset register and display the stock-reference disclosure. No model is represented as a customer, and no stock garment as inventory.

After upload: inspect the originals first, approve or replace selections based on actual visual suitability, then run `python3 scripts/prepare-photos.py /path/to/originals`. It writes local 700px/1400px WebP variants and the inventory used by the application. It preserves the full image composition, strips metadata on re-encoding and never invents another view. Originals must be at least 1400 pixels wide. Review focal positions and mobile crops after integration. Rebuild and regenerate the offline preview. The script does not constitute visual review or mark stock media as approved brand photography.
