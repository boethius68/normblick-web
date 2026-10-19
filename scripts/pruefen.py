#!/usr/bin/env python3
"""Prüft lokale Ziele, Assetversionen und die Übereinstimmung sichtbarer FAQ mit JSON-LD."""
import hashlib
from html.parser import HTMLParser
import json
from pathlib import Path
import re
from urllib.parse import parse_qs, unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]

class Seite(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.ids = set()
        self.doppelte = []
        self.urls = []
        self.faqs = []
        self.details = False
        self.summary = False
        self.frage = []
        self.antwort = []
        self.json = None
        self.schemas = []
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if 'id' in a:
            if a['id'] in self.ids:
                self.doppelte.append(a['id'])
            self.ids.add(a['id'])
        for key in ('src', 'href'):
            if a.get(key):
                self.urls.append(a[key])
        if a.get('srcset'):
            self.urls.extend(x.strip().split()[0] for x in a['srcset'].split(','))
        if tag == 'script' and a.get('type') == 'application/ld+json':
            self.json = []
        if tag == 'details':
            self.details = True
            self.frage = []
            self.antwort = []
        if self.details and tag == 'summary':
            self.summary = True

    def handle_endtag(self, tag):
        if tag == 'summary':
            self.summary = False
        if tag == 'p' and self.details:
            self.antwort.append(' ')
        if tag == 'details':
            self.faqs.append((''.join(self.frage).strip(), re.sub(r'\s+', ' ', ''.join(self.antwort)).strip()))
            self.details = False
        if tag == 'script' and self.json is not None:
            self.schemas.append(json.loads(''.join(self.json)))
            self.json = None

    def handle_data(self, data):
        if self.json is not None:
            self.json.append(data)
        if self.details:
            (self.frage if self.summary else self.antwort).append(data)

def main():
    seiten = {p.name: Seite(p.read_text()) for p in ROOT.glob('*.html')}
    fehler = []
    for name, seite in seiten.items():
        for id in seite.doppelte:
            fehler.append(f'{name}: doppelte ID {id}')
        for url in seite.urls:
            teile = urlsplit(url)
            if teile.scheme or teile.netloc:
                continue
            ziel = unquote(teile.path).lstrip('/') or name
            pfad = ROOT / ziel
            if not pfad.is_file():
                fehler.append(f'{name}: fehlendes Ziel {url}')
                continue
            if teile.fragment and ziel in seiten and unquote(teile.fragment) not in seiten[ziel].ids:
                fehler.append(f'{name}: fehlender Anker {url}')
            version = parse_qs(teile.query).get('v')
            if pfad.suffix in {'.js', '.css'} or version:
                erwartet = hashlib.sha256(pfad.read_bytes()).hexdigest()[:12]
                if version != [erwartet]:
                    fehler.append(f'{name}: veraltete Assetversion {url}')
        for schema in seite.schemas:
            if schema.get('@type') == 'FAQPage':
                daten = [(q['name'], q['acceptedAnswer']['text']) for q in schema['mainEntity']]
                if daten != seite.faqs:
                    fehler.append(f'{name}: sichtbare FAQ und JSON-LD unterscheiden sich')
    print('\n'.join(fehler) if fehler else f'{len(seiten)} HTML-Seiten: Ziele, IDs, Assetversionen und FAQ-Daten in Ordnung.')
    return bool(fehler)

if __name__ == '__main__':
    raise SystemExit(main())
