"""Re-encode the five user-supplied Living Atelier assets, retaining garment alpha.
Usage: python scripts/prepare-concepts.py /absolute/path/to/New_designs
Requires Pillow. The approved mockup is deliberately excluded.
"""
from pathlib import Path
from PIL import Image
import hashlib
import json
import sys

root = Path(__file__).resolve().parents[1]
source = Path(sys.argv[1])
records = []
files = [
    ('concept-burgundy', 'Sculptural oxblood agbada with tonal embroidery-1.png'),
    ('concept-ivory', 'Ivory Nigerian Senator-Style Ensemble-2.png'),
    ('concept-midnight', 'Midnight navy sculptural agbada-3.png'),
    ('concept-folds', 'Oxblood fabric folds in warm light-4.png'),
    ('concept-embroidery', 'Oxblood geometric embroidery in relief-5.png'),
]
for stem, filename in files:
    image = Image.open(source / filename)
    variants = []
    for width in ([500, 1000] if image.mode == 'RGBA' else [700, 1400]):
        resized = image.copy()
        resized.thumbnail((width, 10000))
        target = root / 'public/media' / f'{stem}-{width}.webp'
        resized.save(target, 'WEBP', quality=88, method=6, exact=True)
        decoded = Image.open(target)
        variants.append({
            'file': str(target.relative_to(root)), 'width': decoded.width,
            'height': decoded.height, 'alpha': decoded.mode == 'RGBA',
            'bytes': target.stat().st_size,
        })
    records.append({
        'name': stem, 'source': filename,
        'sha256': hashlib.sha256((source / filename).read_bytes()).hexdigest(),
        'mediaStatus': 'ai-concept', 'variants': variants,
    })
(root / 'concept-provenance.json').write_text(json.dumps({
    'source': 'User-supplied New_designs.zip; generated concepts. Model, prompt and generation licence not supplied. Owner rights review required. Mockup reference only, not rendered.',
    'assets': records,
}, indent=2) + '\n')
