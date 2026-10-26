# Current collection assets

The Living Atelier catalogue now contains 35 concepts: seven each in Agbada, Ready-to-wear, Fabrics, Caps and Wristwatches. Five category previews link to the full filtered catalogue. The two existing Agbada and ivory outfit are reused; 32 individual assets were generated with image_gen.imagegen. The original fabric background and embroidery are retained editorial imagery, not extra catalogue entries.

See `generation-provenance.json` for exact prompts, actual returned paths, source/output hashes, dimensions and transparency. Model and licence were not supplied by the tool. No guesses or third-party licensing claims are made. No external image hotlinks, CSS substitute illustrations or contact-sheet product assets are shipped. The original PNGs remain local; responsive variants are separate sizes of one asset and do not inflate concept counts.

Every concept carries **AI-generated style concept—not an actual Dadinkowa product.** Watch descriptions describe appearance, not technical/material specifications. No prices, stock or promises of exact reproduction are invented. Owner rights/brand review and actual browser QA remain release requirements. Generation/review method is in COLLECTION_GENERATION.md.

The following original-supplied-asset register is retained for source history; later catalogue generation supersedes its former three-look limit.

# Living Atelier asset register

Source: user-supplied `New_designs.zip`, 25 October 2026. The user identifies these as generated concepts and approves Concept A as the visual direction. Package filenames are asset identifiers, not instructions or evidence of brand products. The board's unverified heritage/workmanship claims were not adopted.

| Supplied file | Website use | Output |
| --- | --- | --- |
| Sculptural oxblood agbada with tonal embroidery-1.png | Layered hero; burgundy collection/lookbook/dialog | concept-burgundy-500/1000.webp |
| Ivory Nigerian Senator-Style Ensemble-2.png | Ivory collection/lookbook/dialog | concept-ivory-500/1000.webp |
| Midnight navy sculptural agbada-3.png | Midnight collection/lookbook/dialog | concept-midnight-500/1000.webp |
| Oxblood fabric folds in warm light-4.png | Separate hero background | concept-folds-700/1400.webp |
| Oxblood geometric embroidery in relief-5.png | First ivory editorial section | concept-embroidery-700/1400.webp |
| Dadinkowa Couture living atelier board.png | Visual reference only | Not shipped or embedded |

All five assets are `ai-concept`. Required visible notice: **AI-generated style concept—not an actual Dadinkowa product.** Generated cloth/embroidery is conceptual too. No asset depicts a verified Dadinkowa workshop, product, customer, material stock or production technique. There are exactly three garment concepts; no accessory/fabric-product/ready-to-wear looks are fabricated to fill old slots.

Three garment PNGs are RGBA, 1024×1536, alpha extrema 0–254; fabric folds are RGB 2048×768 and embroidery RGB 1536×1024. Local composite review on charcoal #1c191a and ivory #f5f0e6 found no conspicuous fringe at the inspected scale. No destructive thresholding, background flattening or new cutout was applied. Full supplied silhouettes and alpha are retained. All six responsive garment WebPs decode with alpha; all ten variants decode, match recorded dimensions and carry no EXIF. Live browser-scale halo/framing inspection is pending.

`concept-provenance.json` records exact source filenames, SHA-256 hashes, status, output dimensions/bytes/alpha. `scripts/prepare-concepts.py` reproduces the encoding (Pillow WebP quality 88, no upscaling). Outputs total 1,204,352 bytes. Originals, mockup and review composites stay local, outside Git.

Generation provider/model/prompt and licence terms were not supplied. Owner rights/brand review remains a launch requirement; no third-party licence has been inferred from the files. No purchases/downloads were made.

The existing `logo-draft.png` is preserved byte-for-byte. It is still the provisional user-supplied DK/T-shirt reconstruction, requiring a production master before launch. The social-placeholder and favicon remain provisional. Historic stock source records in `photo-provenance.json` and earlier Git history are archival; those files are no longer displayed or shipped. `PHOTOGRAPHY_REQUEST.md` now explains the superseded stock-image request.

## Header symbol presentation, 26 October 2026

Only the black-backed reconstructed logo is available. The original file and hash are unchanged. A generated background-removal attempt was inspected, showed a strong halo and was rejected; it is not shipped. The header therefore uses the exact original raster through a fixed CSS crop and screen blend on charcoal, excluding tiny source lettering while retaining DK/shirt/needle geometry. This is a presentation fallback, not a new approved logo master or standalone transparent derivative. Supply a faithful transparent production symbol (preferably vector) for launch. Fine-detail legibility at compact header size still needs actual browser review.
