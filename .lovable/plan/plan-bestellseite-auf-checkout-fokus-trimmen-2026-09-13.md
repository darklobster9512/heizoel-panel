# Plan: Bestellseite auf Checkout-Fokus trimmen

## Ziel
Die `/bestellen`-Seite soll ablenkungsfreier werden: keine "soeben gebucht"-Hinweise, keine vollständige Navbar, keine Footer-Navigation. Stattdessen bleibt nur die sticky Preisleiste mit Weiter-Button am unteren Rand.

## Änderungen

### 1. "soeben gebucht" entfernen
- In `src/routes/bestellen.tsx` wird die Logik `morningBooked` entfernt.
- Der Vormittag-Button wird für alle drei Tage gleich behandelt und ist immer wählbar.
- Die durchgestrichene Variante mit dem roten "soeben gebucht"-Badge fällt komplett weg.

### 2. Header/Navbar auf `/bestellen` ausblenden
- `SiteHeader` wird in `BestellenPage` nicht mehr gerendert.
- Sticky-Zusammenfassung rutscht nach oben (`top-0` statt `top-[52px]`, da kein Header mehr darüber liegt).
- Ladezustand und "Keine Auswahl gefunden"-Fehlerseite erhalten ebenfalls keinen Header.

### 3. Footer auf `/bestellen` ausblenden
- `SiteFooter` wird in `BestellenPage` nicht mehr gerendert.
- Die bestehende sticky Preisleiste am unteren Rand bleibt und übernimmt die Footer-Funktion.

### 4. Keine weiteren Seiten betroffen
- `SiteHeader` und `SiteFooter` bleiben auf allen anderen Seiten unverändert.
- Keine Änderungen an Routing, Layout-Dateien oder globalen Komponenten.

## Prüfung
- Build-Fehler prüfen.
- `/bestellen` im Browser öffnen: keine Navbar, kein SiteFooter, Vormittag-Buttons sind aktiv, sticky Preisleiste mit Preis und Weiter-Button sichtbar.
