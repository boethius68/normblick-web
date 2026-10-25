# Normblick – Website

Öffentliche Website zur nativen macOS-App **Normblick** (macOS 26+).

## Deploy

Quellcode: GitHub, Branch `main`. Öffentliche Auslieferung unter [normblick.luneq.eu](https://normblick.luneq.eu) über Hostinger. Die separate GitHub-Pages-Konfiguration ist nicht der Hostingnachweis für die öffentliche Domain. Nach Veröffentlichung den tatsächlichen Inhalt der Domain prüfen.

Veröffentlichung von Website, Direktdownload oder App im Store nur nach
ausdrücklicher Freigabe von Philipp. Die technische Übermittlung an Apples
Notarisierungsdienst ist keine App-Store-Einreichung und keine Veröffentlichung.

Bis zur App-Store-Verfügbarkeit wird die aktuelle App direkt als DMG angeboten.
Die enthaltene App ist mit Developer ID signiert und notarisiert. Build 5 bleibt
unverändert in Apples Review; der Direktdownload enthält Build 11.

## App

Der lokale Auftritt bietet den direkten kostenlosen Mac-Download an. Neue Pro-Abos sind vor der App-Store-Freigabe nicht erhältlich. Vorhandene von Apple bestätigte Berechtigungen werden weiterhin geprüft; keine künstliche Freischaltung oder Änderung der Lizenzlogik. Support: `studio@luneq.eu`. Die öffentliche Domain wurde nicht verändert.

## Aufbau

Statisches HTML/CSS/JavaScript, keine Build-Abhängigkeiten, keine externen Fonts oder Tracker. Echte App-Aufnahmen in `assets/shots/`, als WebP für die Website optimiert. Galerie und Bilddialog sind progressive Erweiterungen; die Produktinhalte bleiben ohne JavaScript verfügbar.

Der ursprüngliche Entwurf wurde in OpenDesign erstellt. Der Hero wurde durch eine bedienbare Simulation der tatsächlichen Lupenfunktion ersetzt: zwei Fundstellen im Vorschautext, Glaskapsel am Zeiger, Wahltaste, Größenänderung und bestätigender Klick. Die Browser-Simulation nutzt zwei hinterlegte BGB-Texte; sie führt keine OCR aus. Die Nachschlagegalerie darunter zeigt echte App-Aufnahmen. Gestaltungsrichtung und native Referenzgeometrie: `DESIGN.md`.

Lokale Vorschau: `python3 -m http.server 8877 --bind 127.0.0.1`.

## Lokaler Prüfstand 25. Oktober 2026

Die Download-Texte, Installationsschritte, FAQ und strukturierten Daten sind
fertig vorbereitet. Alle drei Buttons heißen „Für Mac herunterladen“.
Das Dateiformat erscheint nicht in den sichtbaren Nutzertexten.
Die sieben kostenlosen Tage ohne Lupenlimit und anschließend zehn erfolgreiche
Bildschirm-Nachschläge täglich bleiben von einem Abo getrennt. Der für die
spätere App-Store-Version konfigurierte deutsche Preis von 4,99 €/Jahr ist
bestätigt, aber kein aktuelles Kaufangebot für den Direktdownload.
Die Datenschutzseite beschreibt Download-Zugriffe, vorhandene StoreKit-
Berechtigungen und die lokale Lupenzählung.

`gesetze.html` enthält die vollständige Free-Auswahl als statisches HTML.
Die lokale Suche ergänzt einen Filter nach Rechtskreis, ohne API, Speicherung
oder zusätzliche Abhängigkeit. Ohne JavaScript bleiben die aufklappbaren Listen
nutzbar. Der Katalog lässt sich gegen die tatsächlich verwendete App-Ressource
abgleichen und aus der öffentlichen Titelliste neu erzeugen:

```bash
python3 scripts/aktualisiere-katalog.py --pruefen --app-root ../Normblick
python3 scripts/aktualisiere-katalog.py --app-root ../Normblick
```

Danach das Prüfdatum in der Katalogeinleitung bewusst aktualisieren. Bei einem
neuen Datenpaket auch den gerundeten Umfang und den Paketmonat auf der Startseite
abgleichen. Der Paketmonat ist kein einheitlicher Rechtsstand aller Gesetze.
Der aktuelle Abgleich ergibt 914 Free-Identitäten, darunter 32 EU-Einträge;
der vollständige vorbereitete App-Bestand enthält rund 396.000 Normen.
Free umfasst nicht den gesamten mitgelieferten EU-Bestand. Spotlight setzt
die ausdrückliche Aktivierung in den App-Einstellungen voraus.

Navigation bei einem Wechsel zwischen Mobil- und Desktopbreite, vorzeitig
fehlgeschlagene Galeriebilder, die Originalauflösung im Bilddialog und
kanonisch gleichwertige Umlaut-Suchen wurden korrigiert und im Browser geprüft.
Prüfumfang, Live-Befunde und Grenzen: `docs/website-check.md`.


Vor Veröffentlichung:

```bash
python3 scripts/pruefen.py
python3 scripts/check-asset-versions.py
node --check assets/site.js
node --check assets/workflow.js
node --check assets/katalog.js
```

Die neuen App-Aufnahmen stammen aus dem Entwicklungsbau vom 19. Oktober 2026;
Bilder sowie CSS und JavaScript tragen Inhaltsversionen in den HTML-Referenzen,
damit der Hostingcache keinen alten Stand unter neuen Texten zeigt.

## Bildmarke B2 – Offener Fokus

Seit der Auswahl vom 19. Oktober 2026 verwenden Website und App-Icon dieselben
Vektorkonturen. Die Web-Dateien werden aus dem App-Projekt exportiert; siehe
`brand-spec.md`. Im Kopf steht die freigestellte adaptive SVG-Marke, als
Apple-Touch-Icon und PNG-Fallback die App-Kachel. Alle geänderten Referenzen
tragen Inhaltsversionen gegen veraltete Hostingcache-Dateien.

## Freigabepaket

Die auslieferbaren Dateien liegen unter
`../Normblick/output/website-direkt-build11-2026-10-25.zip`: fünf HTML-Seiten,
Assets samt Lizenz, `robots.txt`, `sitemap.xml`, `.htaccess` und der echte
Download unter `downloads/Normblick-1.0-11.dmg`.
Keine Repositorydaten, Zugangsdaten oder Prüfskripte.

WebKit wurde mit dem vorhandenen Browserlaufwerk tatsächlich ausgeführt;
50 Layoutfälle und die interaktiven Wege sind geprüft. Native Safari-
Automatisierung bleibt ausgeschaltet und ist kein zusätzlicher Auftrag
an den Betreiber. Der konkrete Nachweis steht in `docs/website-check.md`.

Der Download funktioniert unabhängig vom noch nicht veröffentlichten
App-Store-Eintrag. Die DMG ist 208.990.479 Byte groß; SHA-256:
`2b5f7a23a16ed5f1634432acb9bba5be807276b44a0c91db99b9670993eed933`.

`downloads/*.dmg` ist als erzeugtes Release-Artefakt von Git ausgeschlossen.
Das vollständige Freigabepaket enthält die Datei trotzdem. Bei einer späteren
Auslieferung dürfen HTML und Download nicht getrennt aktualisiert werden.
