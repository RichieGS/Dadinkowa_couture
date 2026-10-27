"""Optimise manually supplied, licensed originals. Never downloads remote assets.
Usage: python3 scripts/prepare-photos.py /path/to/originals
Requires Pillow. Full compositions are preserved: no generated views or cropping.
"""
import argparse
import json
from pathlib import Path
from PIL import Image, ImageOps

NAMES = (
    'portrait', 'cap-portrait', 'agbada-burgundy', 'agbada-blue', 'sewing',
    'fabric-stack', 'kaftan-sand', 'kaftan-earth', 'fabric-bronze',
)

def prepare(source, destination, inventory_path):
    destination.mkdir(parents=True, exist_ok=True)
    inventory_path.parent.mkdir(parents=True, exist_ok=True)
    inventory = json.loads(inventory_path.read_text()) if inventory_path.exists() else {'photos': {}}
    for name in NAMES:
        candidates = [p for p in source.iterdir() if p.stem == name and p.suffix.lower() in {'.jpg', '.jpeg', '.png', '.webp'}]
        if len(candidates) > 1:
            raise ValueError(f'Multiple originals for {name}; keep one exact named source.')
        if not candidates:
            print(f'PENDING: {name}.jpg')
            continue
        with Image.open(candidates[0]) as original:
            image = ImageOps.exif_transpose(original).convert('RGB')
            if image.width < 1400:
                raise ValueError(f'{name}: use the original download (at least 1400 pixels wide). No upscaling performed.')
            for width in (700, 1400):
                resized = image.resize((width, round(image.height * width / image.width)), Image.Resampling.LANCZOS)
                target = destination / f'{name}-{width}.webp'
                resized.save(target, 'WEBP', quality=82, method=6)
                print(f'PREPARED: {target.name}, {target.stat().st_size:,} bytes')
            inventory['photos'][name] = {'width': 1400, 'height': round(image.height * 1400 / image.width)}
    inventory_path.write_text(json.dumps(inventory, indent=2) + '\n')

if __name__ == '__main__':
    root = Path(__file__).resolve().parents[1]
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('originals', type=Path)
    parser.add_argument('--destination', type=Path, default=root/'public'/'media')
    parser.add_argument('--inventory', type=Path, default=root/'src'/'photo-inventory.json')
    options = parser.parse_args()
    prepare(options.originals, options.destination, options.inventory)
