# Normblick

Die Lupe ist das Key-Feature und trägt den Hero. Ein bedienbarer Vorschautext mit zwei echten Fundstellen zeigt den Wechsel vom Dokument zum amtlichen Wortlaut. Der Gesetzesbrowser folgt darunter, nicht als Ersatz für die Lupe. Das App-Icon bleibt unverändert.

- Grundlage: Modern minimal, mit dem aus dem echten Icon gewonnenen Markenrot. Tokens in `assets/site.css`; Herkunft in `brand-spec.md`.
- Schrift: SF Pro Display und SF Pro Text mit System-Fallbacks. Keine Font-Downloads.
- DESIGN_VARIANCE: 5. Asymmetrischer Einstieg, danach wechselnde Inhaltsdichte.
- MOTION_INTENSITY: 2. Nur Rückmeldung auf Bedienung; keine automatischen Animationen.
- VISUAL_DENSITY: 4. Ausführliche Erklärungen, kurze Absätze, klare Lesereihenfolge.
- Formen: 12 px für Mac-nahe Bedienelemente, 28 px für Screenshotrahmen, 18 px konzentrisch für das Bild innen. Dezente Materialverläufe und eingelassene Kanten statt schwebender SaaS-Buttons. Galerieauswahl als natives Segment-Control. Screenshots bleiben vollständig sichtbar.
- Website folgt dem Systemfarbschema. Helle und dunkle App-Aufnahmen sind unabhängig davon auswählbar.
- Alle Funktionen als statisches HTML zugänglich; JavaScript ergänzt Galerie, mobile Navigation und Bilddialog. Keine Drittanbieter, Cookies, Telemetrie oder Webfonts.
- Impressumsangaben bewahrt und Telefonlink gegen Luneq Studio geprüft. Datenschutz für tatsächliches Hostinger-Hosting, lokale OCR und E-Mail-Testanfragen berichtigt. Die Website nennt die sichtbare Satzmarkierung, ohne ein abweichendes Satzzitat zu ergänzen.
- Hero-Simulation aus dem tatsächlichen App-Code abgeleitet: Glaskapsel 260×34, Rand 22 % der Höhe (7–16 px), Mitte klar, Umgebung 20 % abgedunkelt. Keine Beschriftung oder angebliche Erkennung im Ring. Wahltaste 500 ms halten, mit dem Zeiger auswählen, erst mit Klick den Wortlaut öffnen. Scrollen ändert die Breite und halbproportional die Höhe; Umschalt-Scrollen nur die Höhe. Esc/Rechtsklick bricht ab, kurzes Antippen von ⌥ blendet aus; Loslassen nach einem Hold nicht.
- Der stationäre Ring ist vor der ersten Bedienung als Vorschau sichtbar. Kein automatischer Film und kein Loop. Browser-/Touch-Fallback mit Schaltfläche bzw. zwei Taps auf eine Fundstelle. Die Simulation nutzt die vollständigen Paragraphen § 433 und § 823 BGB; hervorgehoben werden § 433 Abs. 1 S. 1 bzw. § 823 Abs. 1. Der Wortlaut scrollt innerhalb des Ergebnisfensters, Kopfzeile und Buttons bleiben fest. Jede neue Fundstelle startet wieder bei der markierten Stelle. Keine reale Browser-OCR. Die vollständigen Normtexte sind aus der App-Datenbank read-only abgeglichen.
