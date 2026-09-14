# Neue Auswahl-Karte im Startbereich + helleres Grün

## Neue Karte statt Rechner

Die Karte rechts im Startbereich zeigt künftig keine Rate mehr, sondern nur eine schlanke Auswahl mit Auswahlfeldern und einem Button „Jetzt Kreditvergleich starten“.

### Feld 1 — Verwendung
Freie Verwendung · Auto / Motorrad · Wohnen / Modernisierung · Bau-/ Immobilienfinanzierung · Umschuldung · Gewerbe · Kreditkarte

### Feld 2 — Betrag
Standard-Staffelung: 1.000 € bis 15.000 € in 250er-Schritten, danach bis 120.000 € in 1.000er-Schritten.

Bei Bau-/ Immobilienfinanzierung stattdessen: 300.000–400.000 in 10.000er-Schritten, 400.000–500.000 in 20.000er-Schritten, 500.000–600.000 in 50.000er-Schritten, 600.000–1.000.000 in 100.000er-Schritten, 1.000.000–5.000.000 in 1.000.000er-Schritten.

### Feld 3 — Laufzeit
12 bis 120 Monate in 12er-Schritten. Entfällt bei Bau-/ Immobilienfinanzierung und bei Kreditkarte.

### Verhalten je Verwendung

| Verwendung | Betragsfeld | Standardbetrag | Laufzeit |
| --- | --- | --- | --- |
| Freie Verwendung | Nettokreditbetrag | 30.000 € | 84 Monate |
| Auto / Motorrad | „Kaufpreis €“ als Eingabefeld + zusätzliches Feld „Anzahlung €“ | 30.000 € / Anzahlung 0 € | 84 Monate |
| Wohnen / Modernisierung | Nettokreditbetrag | 30.000 € | 84 Monate |
| Bau-/ Immobilienfinanzierung | Nettokreditbetrag (große Staffel) | 300.000 € | ausgeblendet |
| Umschuldung | Nettokreditbetrag | 30.000 € | 84 Monate |
| Gewerbe | Nettokreditbetrag | 30.000 € | 84 Monate |
| Kreditkarte | Nettokreditbetrag | 5.000 € | ausgeblendet |

Beim Wechsel der Verwendung werden Betrag und Laufzeit auf die jeweiligen Standardwerte gesetzt. Der Pflichthinweis zum repräsentativen Beispiel bleibt unter der Karte stehen.

## Neue Akzentfarbe

Das dunkle Grün wird durch ein helleres, positives Grün ersetzt (#22C55E als Hauptton, #4ADE80 heller, #DCFCE7 als sehr helle Fläche). Es gilt überall: Buttons, Zahlen, Hervorhebungen, aktive Zustände, Fokusrahmen, Diagramm-/Tabellenakzente — weiterhin nur als Akzent, nicht flächig. Auf farbigen Buttons wird der Text dunkel gesetzt, damit der Kontrast lesbar bleibt.

## Technische Umsetzung

- `src/styles.css`: `--brand`, `--brand-deep`, `--primary`, `--ring`, `--chart-*`, Sidebar-Token auf die neuen Grüntöne (oklch) umstellen; `--primary-foreground` auf dunkles Slate, damit Text auf Grün AA-konform bleibt. Dark-Mode-Werte analog anpassen.
- `src/components/landing/hero.tsx`: Rechnerlogik (Annuitätenformel, Ergebnisblock) entfernen; neue Konfigurations-Komponente mit `PURPOSES`-Definition, die pro Verwendung Betragsstaffel, Standardbetrag, Laufzeit-Sichtbarkeit, Feldbezeichnung und Zusatzfeld „Anzahlung“ beschreibt. Betragsoptionen aus Staffel-Ranges generiert, Beträge in `de-DE` formatiert.
- Auto/Motorrad nutzt Zahleneingabefelder statt Auswahlliste; alle Felder mit sichtbaren Labels und Fokusrahmen.
- Button „Jetzt Kreditvergleich starten“ verlinkt wie bisher auf den Kontaktbereich.
- Abschließende Prüfung per Browser-Screenshot in Desktop- und Mobilbreite.
