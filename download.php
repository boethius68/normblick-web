<?php
// Zaehlt Website-Downloads je Kalendertag und leitet auf die aktuelle Datei
// weiter. Gespeichert wird nur „Datum → Anzahl“ ausserhalb des oeffentlichen
// Ordners: keine IP-Adresse, kein Browser, kein Cookie (Datenschutzerklaerung,
// Abschnitt „Downloadzählung“). Neue Fassung: DATEI anpassen.
declare(strict_types=1);

const DATEI = 'Normblick-1.0-13.dmg';

$agent = $_SERVER['HTTP_USER_AGENT'] ?? '';
$methode = $_SERVER['REQUEST_METHOD'] ?? 'GET';
// Vorschau-Abrufe von Suchmaschinen, Linkvorschauen und eigene Pruefabrufe
// sind keine Downloads.
$zaehlen = $methode === 'GET'
    && !preg_match('/bot|crawl|spider|slurp|preview|facebookexternalhit|curl|wget|python|monitor|headless/i', $agent);

if ($zaehlen) {
    $pfad = dirname(__DIR__) . '/normblick-downloads.json';
    $datei = fopen($pfad, 'c+');
    if ($datei !== false) {
        if (flock($datei, LOCK_EX)) {
            $zahlen = json_decode(stream_get_contents($datei) ?: '{}', true);
            if (!is_array($zahlen)) {
                $zahlen = [];
            }
            $tag = gmdate('Y-m-d');
            $zahlen[$tag] = ($zahlen[$tag] ?? 0) + 1;
            ksort($zahlen);
            ftruncate($datei, 0);
            rewind($datei);
            fwrite($datei, json_encode($zahlen, JSON_PRETTY_PRINT) . "\n");
            fflush($datei);
            flock($datei, LOCK_UN);
        }
        fclose($datei);
    }
}

header('Cache-Control: no-store');
header('Location: /downloads/' . DATEI, true, 302);
