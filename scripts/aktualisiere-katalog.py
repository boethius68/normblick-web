#!/usr/bin/env python3
"""Erzeugt nur den öffentlichen Free-Katalog aus der tatsächlich verwendeten App-Auswahl."""
import argparse
import csv
import html
import json
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
QUELLEN = {'': 'Bund', 'lbw': 'Baden-Württemberg', 'lby': 'Bayern', 'lbe': 'Berlin',
           'lbb': 'Brandenburg', 'lhb': 'Bremen', 'lhh': 'Hamburg', 'lhe': 'Hessen',
           'lmv': 'Mecklenburg-Vorpommern', 'lni': 'Niedersachsen', 'lnw': 'Nordrhein-Westfalen',
           'lrp': 'Rheinland-Pfalz', 'lsl': 'Saarland', 'lsn': 'Sachsen', 'lsa': 'Sachsen-Anhalt',
           'lsh': 'Schleswig-Holstein', 'lth': 'Thüringen', 'eu': 'Europäische Union', 'coe': 'Europarat'}

def katalog(app):
    with (app / 'docs/katalog/free-aktuell.csv').open() as f:
        zeilen = list(csv.DictReader(f))
    auswahl = json.loads((app / 'Sources/Normblick/Katalog/free.json').read_text())['gesetze']
    if {(r['quelle'], r['gesetz']) for r in zeilen} != {(r['quelle'], r['gesetz']) for r in auswahl}:
        raise ValueError('CSV und App-Auswahl unterscheiden sich. Erst die Datenquelle klären.')
    if set(r['quelle'] for r in zeilen) - QUELLEN.keys():
        raise ValueError('Unbekannte Quelle: öffentliche Bezeichnung ergänzen.')
    gruppen = []
    for quelle, name in QUELLEN.items():
        gruppe = [r for r in zeilen if r['quelle'] == quelle]
        if not gruppe:
            continue
        eintraege = '\n'.join(f'<li data-law><strong>{html.escape(r["gesetz"])}</strong><span>{html.escape(r["titel"])}</span></li>' for r in gruppe)
        gruppen.append(f'<details class="catalog-group" data-source="{quelle or "bund"}"><summary>{name} <span data-group-count>{len(gruppe)} Gesetze</span></summary><ul class="law-list">{eintraege}</ul></details>')
    return ''.join(gruppen), len(zeilen), len(gruppen)

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--app-root', type=Path, default=ROOT.parent / 'Normblick')
    parser.add_argument('--pruefen', action='store_true')
    args = parser.parse_args()
    daten, anzahl, quellen = katalog(args.app_root)
    p = ROOT / 'gesetze.html'
    alt = p.read_text()
    neu, n = re.subn(r'(?<=<div id="gesetzliste">).*?(?=</div>)', lambda _: daten, alt, flags=re.S)
    assert n == 1
    neu = re.sub(r'\d+ Gesetze und Rechtsakte aus Bund', f'{anzahl} Gesetze und Rechtsakte aus Bund', neu)
    neu = re.sub(r'(?<=data-catalog-status>)\d+ Gesetze in \d+ Rechtskreisen', f'{anzahl} Gesetze in {quellen} Rechtskreisen', neu)
    if args.pruefen:
        if alt != neu:
            raise SystemExit('Katalog weicht von der App-Auswahl ab.')
    else:
        p.write_text(neu)
    print(f'{anzahl} Gesetze aus {quellen} Quellen mit der App-Auswahl abgeglichen.')

if __name__ == '__main__':
    main()
