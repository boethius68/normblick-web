# Visuelle Grundlage

Die ausgewählte Bildmarke heißt **B2 – Offener Fokus**: ein typografisches Paragraphzeichen mit zwei feinen diagonalen Fokuswinkeln. Das Markenrot der bisherigen Farbwelt bleibt RGB 179/38/43, entsprechend OKLch 50.271% / 0.17678 / 24.815°. Die kühlen Neutraltokens und nativen Font-Stacks bleiben erhalten.

```css
--bg: oklch(99% 0.002 240);
--surface: oklch(100% 0 0);
--fg: oklch(18% 0.012 250);
--muted: oklch(54% 0.012 250);
--border: oklch(92% 0.005 250);
--accent: oklch(50.271% 0.17678 24.815);
--font-display: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
--font-body: -apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif;
--font-mono: 'SFMono-Regular', Consolas, 'Liberation Mono', monospace;
```

1. Echte App-Fenster liefern die visuelle Substanz, ohne zusätzliche Browser-Chrome.
2. Präzise Sans-Typografie begleitet die Serifenschrift der Gesetzestexte in den Aufnahmen.
3. Markenrot gehört den Fokuswinkeln und der primären Testanfrage; übrige Links bleiben neutral.
4. Inhalt wird mit Weißraum und sparsamen Trennlinien organisiert, nicht mit dekorativen Karten.
5. Jede Interaktion bleibt bewusst ausgelöst; der Inhalt ist jederzeit sichtbar.

## Reproduzierbare Marke

`assets/marke.svg` ist die freistehende Bildmarke für den Website-Kopf und folgt
dem hellen oder dunklen Systemthema. Das adaptive `favicon.svg` verwendet dieselbe
Kontur. Apple-Touch-Icon und PNG-Fallback verwenden die App-Kachel.

Die Konturen und Größen kommen aus `../Normblick/scripts/make-icon.py`; die
erzeugten Dateien hier nicht von Hand verändern:

```bash
cd ../Normblick
python3 scripts/make-icon.py --web ../normblick-web/assets
```

Danach die Inhaltsversionen in den HTML-Verweisen aktualisieren und die
Website-Prüfung ausführen. Für das Paragraphzeichen ist die Kontur aus
Libre Baskerville Regular ausgeschrieben. Es wird keine Schriftdatei geladen;
die SIL-OFL-Lizenz wird als `assets/LibreBaskerville-OFL.txt` mitgeführt.
