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
