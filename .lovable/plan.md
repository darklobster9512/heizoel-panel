# Plan: Zahlungsart-Spalte in Bestellungen-Tabelle

## Ziel
In der Bestellungen-Übersicht soll eine zusätzliche Spalte „Zahlungsart" zwischen „Branding" und „Status" angezeigt werden.

## Änderungen
- `src/routes/_authenticated/admin_.bestellungen.tsx`
  - Neue Hilfsfunktion `paymentMethodLabel(order)` für lesbare Labels der gespeicherten Werte (`vorkasse` → „Vorkasse", `ec` → „EC-Karte", `barzahlung` → „Barzahlung", etc.).
  - Desktop-Tabelle: Spaltenkopf und Zelle zwischen „Branding" und „Status" einfügen.
  - Mobile Kartenansicht: Zeile „Zahlungsart" ergänzen.

## Verifikation
- `bunx tsgo --noEmit`
- Build-Log prüfen
