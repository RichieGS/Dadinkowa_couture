"""Package staged/tracked source and the built standalone preview for review.
Run after build + pack-preview.py; pass the standalone HTML path.
Excludes deleted files, deliverables, ignored uploads, secrets and dependencies.
"""
from pathlib import Path
import subprocess
import sys
import zipfile

root = Path(__file__).resolve().parents[1]
preview = Path(sys.argv[1])
output = root / 'deliverables'
output.mkdir(exist_ok=True)
(output / 'Dadinkowa-Preview.html').write_bytes(preview.read_bytes())
paths = subprocess.check_output(['git', 'ls-files', '-z'], cwd=root).decode().split('\0')
with zipfile.ZipFile(output / 'Dadinkowa-Couture-MVP.zip', 'w', zipfile.ZIP_DEFLATED) as archive:
    for name in paths:
        path = root / name
        if not name or name.startswith('deliverables/') or not path.is_file():
            continue
        archive.write(path, 'Dadinkowa-Couture-MVP/' + name)
    archive.write(preview, 'Dadinkowa-Couture-MVP/Dadinkowa-Preview.html')
print('Packaged standalone preview and source ZIP in deliverables/.')
