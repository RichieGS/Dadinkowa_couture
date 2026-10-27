"""Package the unchanged Vite production bundle as an offline, single HTML preview.
Run from project root after npm run build. An optional output path may be supplied.
"""
import base64
import json
import mimetypes
from pathlib import Path
import re
import sys
root = Path(__file__).resolve().parents[1]
dist = root / 'dist'
html = (dist / 'index.html').read_text()
def data_url(path):
    kind = mimetypes.guess_type(path.name)[0] or 'application/octet-stream'
    return 'data:' + kind + ';base64,' + base64.b64encode(path.read_bytes()).decode()
assets = {'/' + str(p.relative_to(dist)): data_url(p) for p in (dist / 'media').iterdir() if p.is_file()}
css_path = re.search(r'<link[^>]*href="(/assets/[^\"]+\.css)"[^>]*>', html)
js_path = re.search(r'<script[^>]*src="(/assets/[^\"]+\.js)"[^>]*></script>', html)
if not css_path or not js_path:
    raise SystemExit('Build assets not found; run npm run build first.')
html = html.replace(css_path.group(0), '<style>' + (dist / css_path.group(1).lstrip('/')).read_text() + '</style>')
js = (dist / js_path.group(1).lstrip('/')).read_text().replace('</script', '<\\/script')
html = html.replace(js_path.group(0), '<script>window.__DADINKOWA_ASSETS__=' + json.dumps(assets) + ';</script><script type="module">' + js + '</script>')
html = html.replace('/favicon.svg',data_url(dist/'favicon.svg')).replace('/media/og-placeholder.svg',assets['/media/og-placeholder.svg'])
out = Path(sys.argv[1]) if len(sys.argv)>1 else root/'work'/'Dadinkowa-Preview.html'
out.parent.mkdir(parents=True,exist_ok=True)
out.write_text(html)
print(f'Offline preview: {out} ({out.stat().st_size:,} bytes)')
