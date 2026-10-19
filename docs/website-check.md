# Website-Prüfung

Stand: 10. Oktober 2026. Statische Produktwebsite, kein App-Release-Test.

## Tatsächlich ausgeführte Browser-Prüfung

- Chrome über Playwright mit echten CSS-Viewports: 320, 375, 390, 768, 1280 und 1440 px.
- Zweispaltiger Hero zusätzlich in Chromium und WebKit jeweils über 22 Kombinationen geprüft: 320/390/768/1024/1199/1200/1280/1440/1470/1920/2560 px, Hell/Dunkel. Ab 1200 px Information links und Simulation rechts in derselben Zeile; darunter gestapelt, kein horizontaler Überlauf. Normwechsel mit offenem Ergebnis auf breiten Viewports geprüft; schmaleres Ergebnisfenster verdeckt den zweiten Einstieg nicht. Matrix ohne Fehler; Interaktionen erneut 67/67 je Engine. Aktuelle Belege: `~/.hermes/cache/scratch/normblick-split-verified-matrix-{chromium,webkit}/`, `normblick-split-verified-{chromium,webkit}/` und `normblick-split-verified-site/`.
- Startseite, Impressum, Datenschutz und 404-Seite: keine horizontalen Überläufe, defekten sichtbaren Bilder, fehlerhaften Anker oder JavaScript-Konsolenfehler in der Responsive-Prüfung.
- axe-core: keine gemeldeten WCAG-A/AA- oder Best-Practice-Verstöße in den geprüften Zuständen. Automatisierte Prüfung ersetzt keine vollständige manuelle Barrierefreiheitsprüfung.
- Inhalte ohne JavaScript auf 390 und 1440 px geprüft.
- Helle und dunkle Darstellung, mobile Menübedienung mit Escape, Skiplink, Galerie mit Pfeiltasten/Home/End, Bilddialog, Lesemodus und Fokus-Rückkehr praktisch geprüft.
- Hero-Lupe: beide Fundstellen (§ 433 Abs. 1 S. 1 und § 823 Abs. 1 BGB), Wahltaste-Haltedauer, Loslassen ohne Abbruch, kurzes Antippen, modifizierte Tasten, Größenänderung per Scrollen/Umschalt-Scrollen, leere Auswahl, Esc/Rechtsklick, Tastatur-Fokus und Festhalten geprüft. Kein Wortlaut ohne bestätigenden Klick.
- Zusätzlicher echter Browser-Interaktionstest: Chromium und WebKit, jeweils 67/67 Checks erfolgreich. Touch mit zwei Taps auf 320, 375, 390 und 768 px; Ergebnis bleibt innerhalb der Demo, kein horizontaler Überlauf. Read-only-Abgleich beider angezeigter BGB-Absätze mit der App-Datenbank.
- Hover-Einstieg mit realen Mausereignissen in Chromium und WebKit geprüft: Lupe ohne Button/Shortcut, kein Lookup vor dem Klick, weiterer Normwechsel mit einem Klick und ohne Verlust des bisherigen Ergebnisses beim Hover. Normale Cursor und Scrollbedienung im Ergebnis, kein Start über der Titelleiste, Esc unterdrückt erneutes Einschalten bis zur Wiederkehr in den Dokumentbereich. Kein Scroll-Trap; die Lupe bleibt beim Seitenscrollen am tatsächlichen Mauszeiger. Unveränderte Button-/Shortcut-/Touch-Prüfungen erneut 67/67 je Engine; Volltextprüfungen erneut 192/192 je Engine. Allgemeine Seitenprüfung erneut ohne Fehler. Belege unter `~/.hermes/cache/scratch/normblick-hover-final-{chromium,webkit,site-qa}/` und `normblick-hover-fulltext-{chromium,webkit}/`.
- Volltext-Ergänzung: § 433 und § 823 BGB jeweils mit beiden Absätzen vollständig gegen die Offline-Datenbank read-only abgeglichen. Nur die zitierte Stelle bleibt hervorgehoben. Der Wortlaut ist per Scrollrad und Tastatur bis zum Ende erreichbar; Kopfzeile und Buttons bleiben fest. Erneutes Öffnen setzt die Scrollposition zurück.
- Volltext-/Scrollprüfung: Chromium **192/192**, WebKit **192/192** Checks, jeweils 16 Kombinationen aus beiden Paragraphen, 320/390/768/1440 px und Hell/Dunkel. Erneute allgemeine Seitenprüfung ohne Fehler: 24 responsive Fälle, 8 axe-Prüfungen, 8 Ohne-JavaScript-Fälle und 4 Interaktionsfälle. Berichte unter `~/.hermes/cache/scratch/normblick-fullparagraph-final-{chromium,webkit,regression}/`.
- Separate Responsive-/Accessibility-Prüfung: 24 Seiten-/Viewportfälle, 8 axe-Fälle, 8 JavaScript-off-Fälle, 4 Themen-/Bedienungsfälle; Exit 0. Zusätzlich axe bei beiden offenen Normergebnissen in Hell/Dunkel auf 390 und 1440 px.
- Bild-Ladefehler simuliert: sichtbare Fehlermeldung, Original-Link vorhanden, Dialog mit Escape schließbar.
- E-Mail- und Telefonlinks auf gültige URI-Form geprüft; keine Nachricht versendet und kein Anruf ausgelöst.
- Canonical, Beschreibung, vorhandenes Social-Bild, eindeutige IDs und lokale Ressourcen geprüft. Keine Cookies oder Drittanbieter-Requests durch die Seite im geprüften Kontext.
- `node --check assets/site.js`, `node --check assets/workflow.js` und `git diff --check` ausgeführt.

## Sachliche Korrekturen

CSS-/JavaScript-URLs tragen einen Inhalts-Hash als `?v=…`. Vor jedem Push `python3 scripts/check-asset-versions.py` ausführen und veränderte Hashes in allen betroffenen HTML-Verweisen aktualisieren. Der Hostinger-Cache liefert unversionierte Asset-URLs teils eine Woche lang aus; ein erfolgreicher Abruf mit zufälligem Release-Query beweist deshalb nicht, was der Browser über die tatsächlich im HTML referenzierte URL erhält. Beim Live-Test die echten Netzwerkantworten und die Bedienung prüfen, nicht nur Repository-/Server-Hashes.

Lupengeometrie und Bedienung gegen `ScannerOverlay.swift`, `OptionKeyWatcher.swift`, `KeyGesture.swift` und `NormOverlayPanel.swift` im App-Repo geprüft. Die vorherige Behauptung, Loslassen schließe die Lupe, entfernt. Berechtigungsangaben in Startseite und Datenschutz korrigiert: Bildschirmaufnahme erforderlich, Bedienungshilfen nicht. Kein erfundener Download, kein App-Store-Link und keine bereits fertigen Preise. Datenbestand mit September 2026 gekennzeichnet; EU-Abdeckung ausdrücklich eine Auswahl. Impressumsdaten beibehalten.

## Änderungen 11. Oktober 2026

- FAQ „Welche Rechtsnormen sind enthalten?" (früher „Welche Rechtsgebiete…"): jetzt exakte Aufzählung nach Rechtskreisen. Gegen die Datenlage geprüft: 19 Quellen = gesetze-im-internet.de + 16 Landesportale + EUR-Lex + Europarat (`BIBLIOTHEK.md` Quellentabelle); EU-Katalog exakt die 25 Rechtsakte aus `EurLexImporter.swift` (EUV, AEUV, GRCh, DSGVO, Brüssel Ia/IIb, Rom I–III, EuErbVO, EuUntVO, EuInsVO, EuZustVO, EuBVO, EuMahnVO, EuVTVO, EuGFVO, FreizügRL, AMM-VO, KI-VO, DSA, DMA, Fluggastrechte-VO, Klausel-RL, VRRL); EMRK + ZP 1, 4, 6, 7, 12, 13, 16 (`README.md` „Die EMRK"). Bei Katalogänderungen im App-Repo diese FAQ und die JSON-LD-Antwort mitführen.

- Systemangaben: „Apple Silicon“ vollständig gestrichen (Vorgabe des Betreibers), es gilt nur noch „macOS 26 oder neuer“. Nicht als Anforderung zurückbringen; Intel-Build bei Bedarf nachgereicht. Betrifft Hero, Produkt-Kontextzeile, FAQ (sichtbar + JSON-LD), Testzugang-Abschluss und README.

- Impressum: Telefonnummer vollständig entfernt (ausdrückliche Vorgabe des Betreibers: nicht veröffentlichen). Kontakt ist ausschließlich per E-Mail; die Nummer nicht in href, sichtbarem Text oder Dokumentation ergänzen. § 5 DDG verlangt nur eine elektronische Kontaktmöglichkeit.
- Ungenutzte Rohbilder aus `assets/shots/` gelöscht (alle PNG/JPG außer `gesetze-hell.jpg` als og:image; `spotlight.*` waren 1:1-Dubletten von `gesetze-hell`). Verbleibend: 5 WebP + og-JPG.
- `ergebnis-dunkel.webp` ergänzt und im Tab „Dunkle Ansicht“ als zweites Figure gezeigt.
- JSON-LD im Head der Startseite: `SoftwareApplication` und `FAQPage` (Antworttexte = sichtbarer FAQ-Wortlaut, bei Textänderungen mitführen).
- `srcset` mit 1200w-Varianten (`*-1200.webp`) für die drei großen Galeriebilder; `sizes` entsprechend der Galeriebreite (max. 1014 px).
- `site.css`: Abstand zwischen zwei Figuren in derselben Galerie-Ansicht (`.gallery-panel figure + figure`).

## Grenzen

Browser-Prüfung ist keine Rechtsprüfung. Hosting-Vertrag, Auftragsverarbeitungsvereinbarung und betriebliche Löschprozesse sind nicht Gegenstand dieser UI-Prüfung. Die Website enthält echte App-Aufnahmen; die Hero-Simulation führt keine reale OCR im Browser aus. Die Glaskapsel wird mit Browser-Masken und Materialeffekten nachgebildet, nicht mit der nativen macOS-Glass-API gerendert. WebKit-Test ist ein Safari-Engine-Test, keine Bedienung des installierten Safari.

## Aktualisierung 19. Oktober 2026

- Free-/Pro-Abgrenzung gegen `docs/entscheidungen/012-preispolitik.md`,
  `014-lupenwoche-und-tageskontingent.md` und die aktuellen Store-Texte im
  App-Projekt abgeglichen. Zielpreis als geplant, Testphase weiter sichtbar.
- Paketmonat Oktober 2026 und gerundeter Umfang gegen das Seed-Manifest vom
  17. Oktober geprüft. Kein Versprechen eines einheitlichen Rechtsstands
  oder einer vollständigen EU-Abdeckung.
- Alle 914 Katalogidentitäten gegen die tatsächlich verwendete
  `Sources/Normblick/Katalog/free.json` geprüft. Öffentliche Titel kommen aus
  `docs/katalog/free-aktuell.csv`; keine internen Vergleichsdaten veröffentlicht.
- Aktuelle Diagnosebilder des Entwicklungsbaus aufgenommen und angesehen:
  Gesetzesfenster hell/dunkel, Wortsuche „Verjährung“, Ergebnisfenster hell.
  Die dunkle Galerie zeigt das Gesetzesfenster. Das dunkle Ergebnisfenster
  wurde wegen eines Kontrastbefunds im Diagnosebild nicht übernommen.
- Browserprüfung im In-App-Browser: Startseite bei 320, 390, 768, 1024, 1280
  und 1440 px; Katalog bei 320, 390, 768, 1024 und 1440 px. Kein horizontaler
  Überlauf. Desktop-Einstieg, Angebotsabschnitt, mobile Navigation und
  Katalogsuche visuell angesehen.
- Katalogsuche „buergerliches gesetzbuch“ findet BGB; Rechtskreisfilter EU,
  Leerzustand und Zurücksetzen auf 914 Einträge praktisch geprüft.
- Bestehende Lupen-Demo mit Touch-Einstieg, § 433 BGB, Festhalten und Schließen
  geprüft; Wortsuche-Tab und Bilddialog geöffnet und geschlossen. Keine
  protokollierten JavaScriptfehler in diesen Fällen.
- Statische Prüfung aller fünf HTML-Seiten: lokale Ziele und Anker,
  eindeutige IDs, gültige Inhaltsversionen und identischer FAQ-Wortlaut im
  sichtbaren HTML und JSON-LD. Syntaxprüfung aller drei JavaScript-Dateien.
- Datenschutz um die bereitgestellten Abschnitte zu StoreKit und lokaler
  Lupenzählung ergänzt. Impressumsdaten unverändert.

Die frühere Browsermatrix und axe-Prüfung oben wurde für diese Änderung nicht
vollständig wiederholt. Die neue Katalogliste ist statisch im HTML enthalten;
eine gesonderte Browserprüfung mit abgeschaltetem JavaScript erfolgte für diese
Änderung nicht. App-Release, App-Store-Veröffentlichung und echte Store-Käufe
sind nicht Gegenstand dieser Website-Aktualisierung.
