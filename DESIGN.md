# Normblick

Die Lupe ist das Key-Feature und trägt den Hero. Ein bedienbarer Vorschautext mit zwei echten Fundstellen zeigt den Wechsel vom Dokument zum amtlichen Wortlaut. Der Gesetzesbrowser folgt darunter, nicht als Ersatz für die Lupe. Die Bildmarke wird nach der Auswahl vom 19. Oktober 2026 als B2 – Offener Fokus geführt: Paragraphzeichen und zwei leichte diagonale Winkel.

- Grundlage: Modern minimal, mit dem aus dem echten Icon gewonnenen Markenrot. Tokens in `assets/site.css`; Herkunft in `brand-spec.md`.
- Schrift: SF Pro Display und SF Pro Text mit System-Fallbacks. Keine Font-Downloads.
- DESIGN_VARIANCE: 5. Asymmetrischer Einstieg, danach wechselnde Inhaltsdichte.
- MOTION_INTENSITY: 2. Nur Rückmeldung auf Bedienung; keine automatischen Animationen.
- VISUAL_DENSITY: 4. Ausführliche Erklärungen, kurze Absätze, klare Lesereihenfolge.
- Breiter Hero ab 1200 px zweispaltig: links App-Erklärung, drei sachliche Vorteile und Testzugang, rechts die bedienbare Simulation. Gesamtbreite 1240 px begrenzt; die Simulation bleibt etwa 620–700 px breit, statt den Bildschirm auszufüllen. Darunter gestapelte Darstellung. Ergebnisfenster in der Desktop-Spalte auf 360 px begrenzt, damit die andere Fundstelle zugänglich bleibt. Keine Verkleinerung per CSS-Transform; Dokument bleibt lesbar und bedienbar.
- Formen: 12 px für Mac-nahe Bedienelemente, 28 px für Screenshotrahmen, 18 px konzentrisch für das Bild innen. Dezente Materialverläufe und eingelassene Kanten statt schwebender SaaS-Buttons. Galerieauswahl als natives Segment-Control. Screenshots bleiben vollständig sichtbar.
- Website folgt dem Systemfarbschema. Helle und dunkle App-Aufnahmen sind unabhängig davon auswählbar.
- Alle Funktionen als statisches HTML zugänglich; JavaScript ergänzt Galerie, mobile Navigation und Bilddialog. Keine Drittanbieter, Cookies, Telemetrie oder Webfonts.
- Impressumsangaben bewahrt und Telefonlink gegen Luneq Studio geprüft. Datenschutz für tatsächliches Hostinger-Hosting, lokale OCR und E-Mail-Testanfragen berichtigt. Die Website nennt die sichtbare Satzmarkierung, ohne ein abweichendes Satzzitat zu ergänzen.
- Hero-Simulation aus dem tatsächlichen App-Code abgeleitet: Glaskapsel 260×34, Rand 22 % der Höhe (7–16 px), Mitte klar, Umgebung 20 % abgedunkelt. Keine Beschriftung oder angebliche Erkennung im Ring. Wahltaste 500 ms halten, mit dem Zeiger auswählen, erst mit Klick den Wortlaut öffnen. Scrollen ändert die Breite und halbproportional die Höhe; Umschalt-Scrollen nur die Höhe. Esc/Rechtsklick bricht ab, kurzes Antippen von ⌥ blendet aus; Loslassen nach einem Hold nicht.
- Der stationäre Ring ist vor der ersten Bedienung als Vorschau sichtbar. Kein automatischer Film und kein Loop. Browser-/Touch-Fallback mit Schaltfläche bzw. zwei Taps auf eine Fundstelle. Die Simulation nutzt die vollständigen Paragraphen § 433 und § 823 BGB; hervorgehoben werden § 433 Abs. 1 S. 1 bzw. § 823 Abs. 1. Der Wortlaut scrollt innerhalb des Ergebnisfensters, Kopfzeile und Buttons bleiben fest. Jede neue Fundstelle startet wieder bei der markierten Stelle. Keine reale Browser-OCR. Die vollständigen Normtexte sind aus der App-Datenbank read-only abgeglichen.
- Zugänglicher Browser-Einstieg: Über dem Schriftsatz wird der Mauszeiger automatisch zur Lupe; ein Klick bestätigt die Fundstelle. Button und Wahltaste bleiben gleichwertige Alternativen. Der Hover-Einstieg gilt nur für die Website, nicht als abweichende Behauptung über die App. Ergebnisfenster behalten normale Cursor und Scrollbedienung, auch während eine weitere Fundstelle ausgewählt wird. Esc bleibt wirksam bis zum erneuten Betreten des Dokumentbereichs. Gewöhnliches Seitenscrollen bleibt im Hover-Modus frei; Lupengröße ändern nur nach explizitem Start per Button oder Wahltaste.

## Aktualisierung 19. Oktober 2026

- Direkter Produkteinstieg mit „Gesetze direkt vom Bildschirm“, ergänzt um
  drei kurze Bedienungsschritte. Interaktive Lupe, Markenrot und Systemschriften
  bleiben die visuelle Grundlage.
- Aktuelle Aufnahmen von Gesetzesfenster, Wortsuche und Satzmarkierung;
  Beschreibung der getrennten Fundstellen- und Wortsuche sowie klickbarer Verweise.
- Free und Pro als ruhige, zweispaltige Gegenüberstellung mit einer gemeinsamen
  Erklärung der Lupenwoche. Auf schmalen Displays stehen die Stufen untereinander.
  Der geplante Preis steht unmittelbar neben der jährlichen Abrechnung.
- Separater Free-Katalog mit Suche und Rechtskreisfilter. Statisches HTML bleibt
  die Inhaltsquelle und ohne JavaScript zugänglich. Keine simulierte App-Suche,
  keine OCR im Browser, kein neuer externer Dienst.

## Übernahme der gewählten Bildmarke B2

Die Website verwendet im Kopf die freistehende Vektormarke, nicht die verkleinerte
App-Kachel. Tinte und Fokuswinkel passen sich im SVG an das Systemthema an. Die
Kachel bleibt im Testzugang-Abschluss und als Apple-Touch-Icon. Die Wortmarke
bleibt im Systemschrift-Stack, mit etwas ruhigerem Gewicht. Herkunft, Export und
Lizenz stehen in `brand-spec.md`.
