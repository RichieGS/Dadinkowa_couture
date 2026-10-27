# Collection generation and review

The image-generation tool is available and was used directly in this session. Each call requests **one individual asset**; no generated contact sheet, responsive crop or recolour is counted as a new concept. The approved original burgundy/midnight Agbada and ivory Senator-style outfit are reused. The two original fabric background/detail images remain editorial assets and are not counted as collection entries.

Target collection: 35 concepts, seven per Agbada, Ready-to-wear, Fabrics, Caps and Wristwatches. New generation target: 5 + 6 + 7 + 7 + 7 = 32. Final delivered counts and review results are recorded in TEST_RESULTS.md and generation-provenance.json after processing.

`generation-provenance.json` records the actual tool name, submitted prompt, returned local output path, dimensions/mode, source hash and responsive output hashes. The tool did not identify a model or supply licence terms; neither is guessed. The three reused source assets retain concept-provenance.json records. All collection entries are `ai-concept`, not owner-approved products, stock or workmanship evidence.

Sources are retained in the session's generated_images directory. Only local responsive WebPs are shipped: 500/1000px, Pillow quality 86, full composition retained and alpha preserved where present. `scripts/prepare-catalogue.py` reproduces processing from saved local tool-result records; it does not generate missing images. No external image hotlinks or CSS substitute illustrations are used.

Review uses actual individual outputs and local review sheets to inspect silhouettes, visible supports/people, clipping, embroidery, unwanted text/logos/backgrounds, repeated designs and watch construction. Review sheets are inspection aids created after individual generation, not product assets. Rejected/regenerated outputs, if any, must be recorded rather than silently counted as accepted concepts. Browser visual QA remains a separate requirement.

Generated watches are unbranded aesthetic concepts. Case/dial/strap descriptions refer to visual appearance, not verified materials, movements, dimensions, water resistance or other technical specifications. Exact reproduction, stock, prices and availability are not asserted.

## Completed review

32 individual outputs generated and accepted: five Agbada, six ready-to-wear, seven fabrics, seven caps and seven watches. No regeneration was needed after inspecting all outputs. Distinctions include Agbada shoulder/sleeve/bib construction; native tunic collars, plackets, panels and hems; seven cloth weaves/patterns/drapes; varied cap crowns/folds/embroidery; and round/rectangular/cushion/octagonal/tonneau/oval watch concepts with distinct straps and dials. Alpha was verified and preserved in every non-fabric generated asset. Watch marker/hand counts and material descriptions are kept non-technical and based on visible appearance, rather than assuming exact compliance with the requested prompt. Browser visual QA is pending.
