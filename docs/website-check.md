# Website-Prüfung

Stand: 10. Oktober 2026. Statische Produktwebsite, kein App-Release-Test.

## Tatsächlich ausgeführte Browser-Prüfung

- Chrome über Playwright mit echten CSS-Viewports: 320, 375, 390, 768, 1280 und 1440 px.
- Startseite, Impressum, Datenschutz und 404-Seite: keine horizontalen Überläufe, defekten sichtbaren Bilder, fehlerhaften Anker oder JavaScript-Konsolenfehler in der Responsive-Prüfung.
- axe-core: keine gemeldeten WCAG-A/AA- oder Best-Practice-Verstöße in den geprüften Zuständen. Automatisierte Prüfung ersetzt keine vollständige manuelle Barrierefreiheitsprüfung.
- Inhalte ohne JavaScript auf 390 und 1440 px geprüft.
- Helle und dunkle Darstellung, mobile Menübedienung mit Escape, Skiplink, Galerie mit Pfeiltasten/Home/End, Bilddialog, Lesemodus und Fokus-Rückkehr praktisch geprüft.
- Ablauf-Demo: Erkennen öffnet noch keinen Text; der zweite Klick zeigt die echte Ergebnisaufnahme. Zurücksetzen und reduzierte Bewegung geprüft.
- Bild-Ladefehler simuliert: sichtbare Fehlermeldung, Original-Link vorhanden, Dialog mit Escape schließbar.
- E-Mail- und Telefonlinks auf gültige URI-Form geprüft; keine Nachricht versendet und kein Anruf ausgelöst.
- Canonical, Beschreibung, vorhandenes Social-Bild, eindeutige IDs und lokale Ressourcen geprüft. Keine Cookies oder Drittanbieter-Requests durch die Seite im geprüften Kontext.
- `node --check assets/site.js`, `node --check assets/workflow.js` und `git diff --check` ausgeführt.

## Sachliche Korrekturen

OCR-Ablauf einschließlich bestätigendem Klick dargestellt. Kein erfundener Download, kein App-Store-Link und keine bereits fertigen Preise. Datenbestand mit September 2026 gekennzeichnet; EU-Abdeckung ausdrücklich eine Auswahl. Datenschutz auf das tatsächlich festgestellte Hostinger-Hosting und E-Mail-Testanfragen abgestimmt. Impressumsdaten beibehalten; Telefonlink gegen studio.luneq.eu geprüft.

## Grenzen

Browser-Prüfung ist keine Rechtsprüfung. Hosting-Vertrag, Auftragsverarbeitungsvereinbarung und betriebliche Löschprozesse sind nicht Gegenstand dieser UI-Prüfung. Die Website enthält echte App-Aufnahmen; die interaktive Ablauf-Illustration führt keine reale OCR im Browser aus.
