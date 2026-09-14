# Sektion „In 3 Schritten zum Wunschkredit“

Direkt unter dem Bewertungsbereich kommt die Schritte-Sektion aus der Vorlage (Referenz: Screenshot, 1362×484). Die bestehende Karten-Version des Ablaufs wird durch dieses schlichte Layout ersetzt.

## Aufbau wie in der Vorlage

- **Weißer Hintergrund**, ruhig, ohne Karten oder Rahmen.
- **Überschrift:** „In 3 Schritten zum Wunschkredit“ — fett, dunkel, linksbündig.
- **Drei Spalten nebeneinander** (auf dem Handy untereinander). Jede Spalte: links das grüne Linien-Icon, rechts daneben fette Überschrift und darunter grauer Fließtext.

| Icon (hochgeladen) | Überschrift | Text |
|---|---|---|
| free-inquiry.svg (Monitor mit Badge 1) | Kostenlose Kreditanfrage | Zuerst stellen Sie unverbindlich und kostenlos ihre Kreditanfrage ganz bequem von zu Hause aus. |
| get-offers.svg (Listen mit Badge 2) | Angebote erhalten | Sie erhalten Kreditangebote von verschiedenen Banken. Den passenden Kredit können Sie direkt online beantragen. |
| close-application.svg (Hand mit Münzen, Badge 3) | Kreditantrag abschließen | Sind Ihre Unterlagen vollständig und alle Voraussetzungen erfüllt, erhalten Sie innerhalb kürzester Zeit Ihr Geld. |

Die Icons enthalten bereits die Schritt-Nummern (1/2/3) als kleine grüne Kreise — wie in der Vorlage.

## Technische Umsetzung

1. Die drei hochgeladenen SVGs als CDN-Assets hochladen: `free-inquiry.svg`, `get-offers.svg`, `close-application.svg` → jeweils `.asset.json` unter `src/assets/`.
2. `src/components/landing/sections.tsx`: `Steps()` ersetzen — neue Sektion mit weißem Hintergrund, Überschrift, 3-Spalten-Grid (`md:grid-cols-3`), Icon links (ca. 56–72 px hoch), Text rechts daneben (`flex items-start gap-4`). Alte Karten-Optik, Nummern-Badges und Zeitangaben entfallen; Anker `id="ablauf"` bleibt.
3. Position in `src/routes/index.tsx`: die Sektion direkt nach `CustomerVoices` verschieben (vor `LoanTypes` bleibt unverändert — nur die Reihenfolge wird geprüft und ggf. angepasst).
4. Prüfung per Typecheck und Browser-Screenshot (Desktop + Mobil).
