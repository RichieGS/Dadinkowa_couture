"""Optimise individual image_gen outputs from local tool-result JSON records.
Usage: python scripts/prepare-catalogue.py /absolute/path/to/records-directory
Model/licence are not inferred. Source files are retained outside the repository.
"""
from pathlib import Path
from PIL import Image
import hashlib
import json
import re
import sys

root = Path(__file__).resolve().parents[1]
records_dir = Path(sys.argv[1])
rows = json.loads((root / 'src/catalogue.json').read_text())
by_id = {row['id'].lower(): row for row in rows}
provenance_path = root / 'generation-provenance.json'
prior = json.loads(provenance_path.read_text()) if provenance_path.exists() else {'assets': []}
assets = {record['id']: record for record in prior['assets']}
for file in sorted(records_dir.glob('generated-*.json')):
    record = json.loads(file.read_text())
    row = by_id[record['id']]
    source = Path(re.findall(r'/workspace/generated_images/[^\s]+\.png', record['output_hint'])[-1])
    original = Image.open(source)
    variants = []
    for width in (500, 1000):
        target = root / 'public/media' / f'catalogue-{record["id"]}-{width}.webp'
        if not target.exists():
            resized = original.copy()
            resized.thumbnail((width, 10000))
            resized.save(target, 'WEBP', quality=86, method=6, exact=True)
        decoded = Image.open(target)
        decoded.load()
        variants.append({'path': str(target.relative_to(root)), 'width': decoded.width,
                         'height': decoded.height, 'alpha': decoded.mode == 'RGBA',
                         'bytes': target.stat().st_size,
                         'sha256': hashlib.sha256(target.read_bytes()).hexdigest()})
    row['width'], row['height'] = variants[-1]['width'], variants[-1]['height']
    assets[record['id']] = {
        'id': record['id'], 'category': row['category'], 'title': row['title'],
        'tool': 'image_gen.imagegen', 'prompt': record['prompt'],
        'toolOutputPath': str(source), 'sourceWidth': original.width,
        'sourceHeight': original.height, 'sourceMode': original.mode,
        'sourceSha256': hashlib.sha256(source.read_bytes()).hexdigest(),
        'mediaStatus': 'ai-concept', 'variants': variants,
    }
for row in rows:
    row.setdefault('width', 1000)
    row.setdefault('height', 1500)
(root / 'src/catalogue.json').write_text(json.dumps(rows, indent=2) + '\n')
provenance_path.write_text(json.dumps({
    'tool': 'image_gen.imagegen',
    'note': 'Individual images generated in this session. Model identifier and licence were not supplied by the tool; neither is inferred. Prompt and output paths are recorded from actual calls. Three reused concepts retain their separate user-upload provenance.',
    'assets': sorted(assets.values(), key=lambda item: item['id']),
}, indent=2) + '\n')
print(f'Optimised {len(assets)} new individual assets; all source PNGs retained locally.')
