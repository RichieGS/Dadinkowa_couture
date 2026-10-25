"""Create inspected face-free editorial crops from the supplied originals.
No retouching, background removal, generated views or remote downloads.
Usage: python3 scripts/prepare-exhibition-crops.py /path/to/named/originals
"""
import argparse
import hashlib
import json
from pathlib import Path
from PIL import Image, ImageOps

# Relative boxes chosen by inspecting the actual images. Top edges fall below
# faces and above garment collars where possible; cap crop is a worn-cap detail.
CROPS = {
    'portrait-garment': ('portrait', (0.10, 0.325, 0.93, 1.0)),
    'blue-garment': ('agbada-blue', (0.0, 0.395, 1.0, 1.0)),
    'burgundy-garment': ('agbada-burgundy', (0.02, 0.365, 0.98, 1.0)),
    'sand-garment': ('kaftan-sand', (0.06, 0.305, 0.96, 1.0)),
    'earth-garment': ('kaftan-earth', (0.15, 0.433, 0.78, 1.0)),
    'cap-detail': ('cap-portrait', (0.30, 0.065, 0.83, 0.19)),
}

def prepare(source, root):
    inventory_path = root/'src/photo-inventory.json'
    inventory = json.loads(inventory_path.read_text())
    provenance_path = root/'photo-provenance.json'
    provenance = json.loads(provenance_path.read_text())
    records = []
    for name, (original_name, box) in CROPS.items():
        with Image.open(source/(original_name+'.jpg')) as opened:
            original = ImageOps.exif_transpose(opened).convert('RGB')
            pixels = tuple(round(v * (original.width if i % 2 == 0 else original.height)) for i,v in enumerate(box))
            image = original.crop(pixels)
            for width in (700,1400):
                if image.width < width:
                    raise ValueError(f'{name}: would require upscaling')
                height = round(image.height*width/image.width)
                path = root/f'public/media/{name}-{width}.webp'
                image.resize((width,height),Image.Resampling.LANCZOS).save(path,'WEBP',quality=82,method=6)
                records.append({'path':str(path.relative_to(root)), 'width':width, 'height':height, 'bytes':path.stat().st_size,'sha256':hashlib.sha256(path.read_bytes()).hexdigest()})
            inventory['photos'][name] = {'width':1400,'height':round(image.height*1400/image.width)}
            print(name, original_name, pixels)
    provenance['editorialCrops'] = [{'slot':name,'originalSlot':value[0],'relativeBox':value[1],'classification':'stock-reference'} for name,value in CROPS.items()]
    provenance['optimised'] = [record for record in provenance['optimised'] if record['path'] not in {r['path'] for r in records}] + records
    inventory_path.write_text(json.dumps(inventory,indent=2)+'\n')
    provenance_path.write_text(json.dumps(provenance,indent=2)+'\n')

if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('originals',type=Path)
    options=parser.parse_args()
    prepare(options.originals,Path(__file__).resolve().parents[1])
