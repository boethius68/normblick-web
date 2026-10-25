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

## Gewählte Bildmarke B2 – 19. Oktober 2026

- B2 „Offener Fokus“ nach Auswahl des Betreibers als deterministische
  Vektorkontur übernommen. Freistehendes SVG in allen fünf Website-Köpfen,
  adaptives SVG-Favicon, neue PNG-Kachel für Apple-Touch-Icon und Fallback.
- Dateien aus `../Normblick/scripts/make-icon.py --web …` erzeugt; keine
  installierte Schrift erforderlich, keine externen Font-Requests. Die
  Lizenz zur ausgeschriebenen Libre-Baskerville-Kontur ist mitgeführt.
- Helle und dunkle SVG-Erscheinung in einer lokalen, anschließend entfernten
  Prüfansicht visuell angesehen. Kleine Marke zusammen mit Wortmarke geprüft.
- Startseite bei 320, 390, 768 und 1440 Pixeln kontrolliert. Übrige vier
  Seiten bei 390 Pixeln: Markenbild geladen, kein horizontaler Überlauf,
  keine protokollierten JavaScriptfehler.
- Statische Seitenprüfung, Assetversionsprüfung und App-Katalogabgleich grün.
  Alle geänderten SVG-/PNG-/CSS-Referenzen tragen Inhaltsversionen.
- Live-Abgleich nach Veröffentlichung: 28 tatsächlich referenzierte Seiten-
  und Asset-URLs ohne inhaltliche Abweichung; PNG-Optimierung pixelgleich.
  Neue Marke auf der öffentlichen Startseite nach Neuladen angesehen.

## Erster Veröffentlichungsdurchgang 25. Oktober 2026 – Zwischenstand

### Inhalte und Korrekturen

- Startseite, Free-Katalog, Impressum, Datenschutz und Fehlerseite geprüft.
  Bestandsangabe gegen `../Normblick/App/Seed/bibliothek.json` auf rund
  396.000 Normen aus 19 Quellen aktualisiert; Paketmonat Oktober 2026.
- Alle 914 Free-Identitäten gegen die App abgeglichen, darunter 32 EU-Einträge.
  Die Free-/Pro-Texte versprechen nicht mehr den gesamten EU-Bestand in Free.
  Die sichtbare Bestands-FAQ und ihr JSON-LD bleiben wortgleich.
- Spotlight als ausdrücklich zu aktivierende Funktion bezeichnet;
  Tastenkürzel als Standardbelegung und Tageskontingent als lokaler Kalendertag
  präzisiert. Geplanter Preis, Testphase und fehlender öffentlicher Download
  bleiben ausdrücklich gekennzeichnet.
- Vier Bedienungsfehler behoben: Tastaturfokus geht beim Breitenwechsel nicht
  mehr verloren; bereits vor Scriptstart fehlgeschlagene Galeriebilder erhalten
  einen Fehlerhinweis; der Bilddialog lädt das verlinkte 2000-Pixel-Original
  statt der 1200-Pixel-Vorschau; kombinierte und vorkomponierte Umlaute
  ergeben dieselben Suchtreffer. Geänderte Skripte tragen neue Inhaltsversionen.

### Tatsächlich ausgeführte Prüfung

- Chromium: alle fünf Seiten bei 320, 390, 768, 1024 und 1440 Pixeln,
  jeweils hell und dunkel: 50 Layoutfälle ohne horizontalen Überlauf.
  In der hellen Matrix keine fehlgeschlagenen geladenen Bilder.
  Desktop-/Mobil-Einstieg, mobile Lupe, Angebot, Katalog und rechtliche Seiten
  zusätzlich anhand tatsächlicher Screenshots angesehen.
- Mobile Navigation mit Escape und Fokusrückgabe, Fokusübernahme an beiden
  Richtungen des Mobil-Breakpoints, Galerie-Tasten Pfeil/Home/End,
  Bilddialog/Lesemodus/Escape/Fokusrückgabe und alle zehn FAQ geprüft.
- Die vier korrigierten Fehler gegen den unveränderten Live-Code reproduziert:
  dort Fokusverlust, 1200-Pixel-Vergrößerung, fehlender Hinweis bei bereits
  gescheitertem Bild und kein Treffer bei zerlegtem Umlaut. Lokal jeweils
  korrigiertes Verhalten beobachtet. Bildausfall gezielt im Browser simuliert;
  Originalvergrößerung in getrennten frischen Browser-Kontexten verglichen.
- Lupe: Hover allein öffnet keinen Wortlaut; § 433 und § 823 BGB über Maus/
  Tastatur geöffnet, Festhalten bei Außenklick, vollständiger Text mit
  End/Home, Wahltasten-Halten und Loslassen, Breite/Höhe per Scrollrad,
  Escape und Rechtsklick geprüft. Touch: erster Tipp aktiviert, zweiter
  öffnet § 433; Festhalten und Schließen geprüft.
- Katalog: drei Schreibweisen von „bürgerliches gesetzbuch“ finden BGB,
  EU-Filter zeigt 32 Einträge; Leerzustand und Reset auf 914 mit Fokus im
  Suchfeld geprüft. Ohne JavaScript bleiben Navigation, vier Galerieansichten,
  native FAQ und alle 914 Katalogeinträge mit aufklappbaren Gruppen erreichbar.
- Live: 25 tatsächlich referenzierte Seiten-/Asset-/Crawler-URLs mit HTTP 200;
  Hostinger-Datenschutzlink erreichbar. HTTP leitet mit 301 auf HTTPS um.
  Unbekannte URL liefert HTTP 404 mit eigener Fehlerseite und `noindex`.
  Beim öffentlichen Seitenaufruf keine externen Ressourcen, Cookies oder
  Local-/Session-Storage-Einträge beobachtet. Keine protokollierten
  JavaScriptfehler in den beiden regulären Browser-Prüftabs.
- Bestehende Prüfungen erfolgreich: `scripts/pruefen.py` (fünf HTML-Seiten,
  lokale Ziele/Anker/IDs/Versionen/FAQ), `scripts/check-asset-versions.py`
  (neun CSS-/JS-Referenzen), App-Katalogabgleich (914/19) und `node --check`
  für alle drei JavaScript-Dateien.

### Freigabegrenzen und Veröffentlichung

- Keine Veröffentlichung, kein Upload, kein Push und keine Änderung bei Apple.
  Die öffentliche Domain enthält weiterhin den vorherigen Stand; die oben
  beschriebenen Korrekturen sind ausschließlich lokal vorbereitet.
- Build 11: `pkgutil --check-signature` und `codesign --verify --deep --strict`
  am tatsächlichen Export erfolgreich. Installer mit
  „3rd Party Mac Developer Installer“, App mit Apple-Distribution-Signatur.
  Das ist kein notarisierter Developer-ID-Direktdownload.
- Die öffentliche deutsche Apple-Abfrage zur App-ID 6824618858 lieferte
  `resultCount: 0`. Noch keinen funktionsfähigen Store-Bezug behaupten.
  Vor Live-Schaltung: ausdrückliche Freigabe von Philipp, verfügbaren
  Bezugsweg und finalen Preis prüfen; Website-Bestand gegen die tatsächlich
  öffentlich ausgelieferte Version abgleichen, insbesondere bei Build 5
  vor Build 11. Für Direktvertrieb ist ein aktueller Developer-ID-/Notarisierungs-
  und Kaufweg-Nachweis erforderlich; die alte Build-2-Testkopie nicht einsetzen.
- Safari-Abnahme offen: Safari 27.0.1 und `safaridriver` sind vorhanden,
  aber der native WebDriver verweigert die Sitzung, weil „Allow remote automation“
  in den Safari-Entwicklereinstellungen ausgeschaltet ist. Diese Einstellung
  wurde nicht eigenmächtig geändert. Auch die WebKit-Alternative benötigt
  einen hier nicht vorhandenen Tern-Pane. Keine neue Safari-, VoiceOver-
  oder axe-Freigabe behaupten.
  Hosting-AVV, konkrete Server-Log-Löschfristen, betriebliche Löschprozesse,
  App-Store-Käufe und eine verbindliche Rechtsprüfung bleiben außerhalb
  dieses technischen Website-Nachweises.

## Zwischenstand mit App-Store-Links – durch Direktdownload ersetzt

Die folgenden Nachweise ersetzen die zuvor noch offenen technischen
Voraussetzungen dieses Tages. Es gibt keinen Auftrag für einen neuen
Direktvertrieb: Der festgelegte Weg ist bereits der Mac App Store.

### Store und Preis tatsächlich nachgelesen

- In der bestehenden Safari-Anmeldung ausschließlich lesend geprüft:
  macOS-Version 1.0, Build 5, `IN_REVIEW`, Build-Verarbeitung `VALID`,
  Veröffentlichung `MANUAL`. Die Einreichung wurde weder entfernt noch geändert.
- Produkt `de.normblick.pro.jahr` / 6824617816 ist ebenfalls `IN_REVIEW`,
  Laufzeit `ONE_YEAR`. Der aktuelle Preisplan für `DEU` liefert
  `customerPrice: 4.99`, `currency: EUR`, jährliche Vorauszahlung.
  Quelle: zugehörige `iris/v1`-Datensätze in App Store Connect, keine
  Übernahme allein aus alten Projekttexten. Keine Preise oder Verträge geändert.
- Das bereits geprüfte, signierte Build-11-Paket bleibt lokal zur späteren
  Einreichung bereit. Developer-ID und Notarisierung sind für diesen
  App-Store-Vertriebsweg keine fehlenden Arbeiten.

### Website fertig auf den Store-Start umgestellt

- Testzugangs-Anfragen durch drei konsistente Store-Buttons ersetzt.
  Ziel: `https://apps.apple.com/de/app/normblick/id6824618858?mt=12`.
  Download-Abschnitt, interne Anker, CSS-Selektoren und Metadaten migriert;
  keine alten Testzugangs-IDs, Klassen oder Angebotszusagen im auslieferbaren Code.
- Free-Download, optionales Jahresabo für 4,99 € im deutschen Store,
  verbindlicher lokaler Kaufpreis, automatische Verlängerung und Kündigung
  über Apple ausdrücklich benannt. FAQ und JSON-LD stimmen überein.
- Katalog, Fehlerseite und Kontaktabschnitt tragen dieselbe Launch-Sprache.
  App-Store-Freigabe oder erfolgte Veröffentlichung wird nicht behauptet.
- Statische Seiten-/Versions-/FAQ-Prüfung, 914er-App-Katalogabgleich und
  Syntaxprüfung aller drei Skripte nach Integration erfolgreich.

### Browsernachweis erledigt

- Vorhandenen Playwright-WebKit-2359-Browser mit installiertem
  `playwright-core` 1.58.2 wiederverwendet; keine neue Projektabhängigkeit.
  Alle fünf Seiten in fünf Breiten von 320 bis 1440 Pixeln, hell/dunkel:
  50 Fälle ohne Überlauf, fehlgeschlagene referenzierte Bilder,
  HTTP-Fehler oder Seiten-Ausnahmen.
- Mobile Navigation einschließlich Escape und Fokuswechsel am Breakpoint,
  Galerie-Tasten, 2000×1400-Original, Lesemodus und Dialog-Fokusrückgabe
  tatsächlich bedient. Beide Demo-Normen über Maus/Tastatur und emulierte
  Touch-Eingabe geöffnet; Wahltaste, Scrollrad/Umschalt, Festhalten,
  Textscrollen und Escape geprüft.
- Drei Umlautdarstellungen ergeben dieselben Suchtreffer; EU-Filter 32,
  Reset 914/19, Leerzustand und JavaScript-freie Listen funktionieren.
  Adaptive SVG-Marke in frischen hellen/dunklen WebKit-Kontexten sichtbar
  geprüft; die dunkle Zeichenfarbe ist RGB(237,232,224), nicht die helle
  Variante. Lesbare Desktop-/Mobil-/Angebotsaufnahmen angesehen.
- Abschließend Chromium-Downloadanker, alle drei Store-Ziele,
  vollständige Preis-FAQ und 390-Pixel-Layout praktisch geprüft.
  Ein zusätzlicher langer Chromium-Matrixlauf lief in einen
  Automatisierungs-Timeout; er wird nicht als neuer erfolgreicher
  50-Fälle-Nachweis gezählt. Die vollständige WebKit-Matrix ist erfolgreich.
- Playwright-WebKit ist kein Betrieb des installierten Safari. Dessen
  deaktivierte Automatisierung wurde nicht verändert; sie ist nicht mehr
  als unerledigter Website-Prüfauftrag an Philipp zurückzugeben.

### Auslieferung

- Fertige Website-Dateien als
  `../../Normblick/output/website-appstore-build11-2026-10-25.zip` gepackt.
  Kein App-Binärdownload, keine Repository-/Kontodaten im Website-Paket.
- Der registrierte Store-Link liefert vor Apples Freigabe und manueller
  Veröffentlichung noch HTTP 404. Das ist der belegte externe Review-Stand,
  kein fehlender Website-Vertriebsentwurf und kein Auftrag an Philipp,
  Preise oder Browserprüfungen selbst nachzuholen.
- Keine Veröffentlichung, kein Upload, kein Deployment und kein Push.
  Freischaltung bleibt ausschließlich auf ausdrücklichen Auftrag.
- ZIP-Integritätsprüfung (`unzip -t`) erfolgreich. SHA-256 des Freigabepakets:
  `8b7c14c7326ee294d68687c9bc640c9026d8e915a0bb3c803b7c6df4b83eb78c`.

## Direktdownload als Übergang – 25. Oktober 2026

Philipp hat klargestellt, dass die aktuelle App bis zur Store-Verfügbarkeit
direkt auf der Website angeboten werden soll. Die vorherige Annahme eines
ausschließlichen Store-Starts war falsch; das reine Store-Websitepaket ist ersetzt.

### Tatsächliches Release-Artefakt

- Version 1.0 (11) aus dem vorhandenen aktuellen Release-Archiv mit
  `method=developer-id`, Cloud-Managed Developer ID, exportiert.
  Kein Neubau und keine Änderung der App- oder Lizenzlogik.
- Über Xcode ausschließlich an den Notarisierungsdienst übermittelt
  (`uploadDestination: Developer ID`), anschließend mit
  `xcodebuild -exportNotarizedApp` samt angeheftetem Ticket exportiert.
  [Apple beschreibt diesen separaten Ablauf](https://developer.apple.com/documentation/security/notarizing-macos-software-before-distribution).
  Das ist keine App-Store-Einreichung; Build 5 bleibt in dessen Review.
- `stapler validate` erfolgreich; strenge Codesign-Prüfung erfolgreich;
  Gatekeeper: `accepted`, `source=Notarized Developer ID`. Hardened Runtime,
  Sandbox, Intel und Apple Silicon, Mindestversion macOS 26.0 bestätigt.
- DMG enthält die notarisierte App und eine Verknüpfung nach `/Applications`.
  `hdiutil verify` erfolgreich; read-only eingebunden, Ticket/Signatur/
  Gatekeeper nochmals am tatsächlich enthaltenen App-Bundle erfolgreich.
  Die Notarisierungsnachweise beziehen sich auf die enthaltene App;
  das Datenträgerabbild ist deren Transportcontainer.
- Ressourcen stimmen mit dem freigegebenen Build-11-Paket überein:
  Datenbankpaket `88d83efb…`, Free-Katalog `a1320e17…`, Manifest `4efb8d4f…`.
- Aus dem eingebundenen Abbild als eigener Prozess gestartet (PID 44782).
  Über normale Menü-/Tastaturbedienung BGB § 823 geöffnet; Titel,
  „Schadensersatzpflicht“, tatsächlicher Wortlaut und Bestand Oktober 2026
  durch native, PID-gebundene Accessibility gelesen. Eigener Prozess beendet;
  der schon laufende Entwicklungsbau PID 1326 blieb unangetastet.
- Auf diesem Testkonto erkennt StoreKit bereits eine gültige Pro-Berechtigung.
  Kein Zurücksetzen, Kauf, Restore oder Kontowechsel. Deshalb keine behauptete
  Prüfung eines frischen Free-Kontos. Website/Datenschutz beschreiben vorhandene
  Berechtigungen korrekt; neue Pro-Abos werden vor der Store-Freigabe nicht beworben.
  Native App-Screenshots waren wegen fehlender Aufnahmerechte nicht möglich.

### Website und echter Download

- Alle drei sichtbaren Buttons heißen nach Philipps Korrektur
  **„Für Mac herunterladen“**. „DMG“ aus Nutzertexten, FAQ, Metadaten,
  Katalog und rechtlichen Seiten entfernt; nur Dateiname/URL behalten das Format.
- Installationsschritte ohne Dateiformat-Fachsprache; nummerierte Anleitung
  nach tatsächlichem Sichtbefund lesbar linksbündig begrenzt.
  Dateigröße als 209 MB ausgewiesen. Keine technischen Dummy-Dateien.
- Echtes Ziel `downloads/Normblick-1.0-11.dmg`, 208.990.479 Byte.
  SHA-256: `2b5f7a23a16ed5f1634432acb9bba5be807276b44a0c91db99b9670993eed933`.
- WebKit-Download über den tatsächlichen Button abgeschlossen, Dateiname korrekt,
  kein Downloadfehler. Heruntergeladene Datei bytegleich nach SHA-256 und Größe.
  Lokaler HTTP-Nachweis: 200, `application/x-apple-diskimage`, korrekter
  Content-Length. `.htaccess` legt denselben Medientyp für Hostinger fest.
- Finale fünf Seiten × fünf Breiten × hell/dunkel erneut in WebKit geprüft:
  50 Fälle ohne horizontalen Überlauf oder fehlgeschlagene geladene Bilder.
  Desktop-/Mobil-Downloadabschnitt tatsächlich angesehen; alle drei
  Buttontexte und das Fehlen sichtbarer „DMG“-Texte im Browser beobachtet.
  Keine Seitenfehler im abschließenden WebKit-Downloadlauf.
- Sichtbare FAQ und JSON-LD, alle lokalen Ziele einschließlich echter Download-
  Datei, Inhaltsversionen, 914er-Katalogabgleich und JavaScript-Syntax erfolgreich.
- Neues vollständiges Paket:
  `../../Normblick/output/website-direkt-build11-2026-10-25.zip`.
  Download-Binärdatei gehört zum Paket, aber nicht in Git.
  Keine Veröffentlichung, kein Website-Upload, kein Push und keine neue
  App-Store-Einreichung. Die frühere Store-Link-Veröffentlichungsvorbereitung
  ist nicht das nun freizugebende Paket.
- Vollständiges Direktdownload-ZIP mit `unzip -t` erfolgreich geprüft.
  SHA-256: `444ec182186e091dc9f352465d28f689c40be0918c11f734a51a99b709bb39ae`.
