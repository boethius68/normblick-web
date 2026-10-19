# Normblick – Website

Öffentliche Website zur nativen macOS-App **Normblick** (macOS 26+).

## Deploy

Quellcode: GitHub, Branch `main`. Öffentliche Auslieferung unter [normblick.luneq.eu](https://normblick.luneq.eu) über Hostinger. Die separate GitHub-Pages-Konfiguration ist nicht der Hostingnachweis für die öffentliche Domain. Nach Veröffentlichung den tatsächlichen Inhalt der Domain prüfen.

## App

Die App befindet sich in der Testphase. Noch kein öffentlicher Download oder App-Store-Link; Testanfragen gehen per E-Mail an `studio@luneq.eu`.

## Aufbau

Statisches HTML/CSS/JavaScript, keine Build-Abhängigkeiten, keine externen Fonts oder Tracker. Echte App-Aufnahmen in `assets/shots/`, als WebP für die Website optimiert. Galerie und Bilddialog sind progressive Erweiterungen; die Produktinhalte bleiben ohne JavaScript verfügbar.

Der ursprüngliche Entwurf wurde in OpenDesign erstellt. Der Hero wurde durch eine bedienbare Simulation der tatsächlichen Lupenfunktion ersetzt: zwei Fundstellen im Vorschautext, Glaskapsel am Zeiger, Wahltaste, Größenänderung und bestätigender Klick. Die Browser-Simulation nutzt zwei hinterlegte BGB-Texte; sie führt keine OCR aus. Die Nachschlagegalerie darunter zeigt echte App-Aufnahmen. Gestaltungsrichtung und native Referenzgeometrie: `DESIGN.md`.

Lokale Vorschau: `python3 -m http.server 8877 --bind 127.0.0.1`.

## Stand 19. Oktober 2026

Der öffentliche Auftritt beschreibt das vorbereitete Free-/Pro-Launchmodell,
die sieben kostenlosen Tage ohne Lupenlimit und anschließend zehn erfolgreiche
Bildschirm-Nachschläge täglich. 4,99 €/Jahr ist als geplanter Zielpreis gekennzeichnet;
die App bleibt bis zur tatsächlichen Veröffentlichung in der Testphase.
Die Datenschutzseite enthält die im App-Projekt vorbereiteten Abschnitte zu
StoreKit und der lokalen Lupenzählung.

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
