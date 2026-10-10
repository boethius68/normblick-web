#!/usr/bin/env python3
"""Reject stale or unversioned local CSS/JS URLs before publishing."""
import hashlib
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import parse_qs, urlsplit

ROOT = Path(__file__).resolve().parents[1]

class Assets(HTMLParser):
    def __init__(self):
        super().__init__()
        self.urls = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'script' and attrs.get('src'):
            self.urls.append(attrs['src'])
        elif tag == 'link' and attrs.get('rel') == 'stylesheet':
            self.urls.append(attrs['href'])

def main():
    failures = []
    count = 0
    for page in sorted(ROOT.glob('*.html')):
        parser = Assets()
        parser.feed(page.read_text())
        for url in parser.urls:
            parts = urlsplit(url)
            if parts.scheme or parts.netloc:
                continue
            asset = ROOT / parts.path.lstrip('/')
            if asset.suffix not in {'.css', '.js'}:
                continue
            count += 1
            if not asset.is_file():
                failures.append(f'{page.name}: missing asset {url}')
                continue
            version = hashlib.sha256(asset.read_bytes()).hexdigest()[:12]
            if parse_qs(parts.query).get('v') != [version]:
                failures.append(f'{page.name}: {url} must use ?v={version}')
    for failure in failures:
        print(failure)
    print(f'{count} local CSS/JS references checked; {len(failures)} failures')
    return 1 if failures or not count else 0

if __name__ == '__main__':
    raise SystemExit(main())
