# Angebotsseite näher an die Vorlage bringen

Umbau von `/preisrechner/ergebnis`, damit die Seite dem Screenshot entspricht und die Lieferdaten nur nach Klick auf „Ändern" bearbeitbar sind.

## 1. Sortenauswahl als Reiter statt zwei Karten

Statt zwei nebeneinander stehender Karten gibt es oben zwei Reiter:

```text
[ Standard – Das Günstige ] [ Premium – Das Sparsame  EMPFOHLEN ]
-------------------------------------------------------------
 Beschreibung der Sorte
 Preis pro 100 Liter        128,78 €
 Gesamtpreis inkl. Lieferung  1.905,15 €   (inkl. 19 % MwSt.)
 Direktpreis ohne Zwischenhändler — inkl. Lieferung

 Lieferung: ab TT.MM.JJJJ        Deutschlandweit
 Zahlungsarten: Vorkasse · Bar · EC-Karte · Rechnung

 [ Zur Bestellung ]      100 % sicher & SSL-verschlüsselt
 Sorten im Detail vergleichen
-------------------------------------------------------------
 eKomi / Trustami · ★★★★★ · 25.000+ Bewertungen
 Lieferung durch Klaro oder regionalen Partnerhändler
 Preis ist bindend bei Bestellung. Es entstehen keine weiteren Kosten!
```

Der aktive Reiter ist grün hervorgehoben, der Premium-Reiter trägt das Badge „EMPFOHLEN". Vertrauensleiste (Siegel, Sterne, Hinweistexte) sitzt direkt unten in derselben Karte statt als eigene Sektion.

## 2. Lieferdaten nur nach Klick auf „Ändern"

Standardmäßig erscheint eine kompakte, einzeilige Zusammenfassung:

```text
PLZ 50667 · 3.000 Liter · 1 Abladestelle · Schlauch bis 40 m · Tankwagen egal   [ Ändern ]
```

Erst nach Klick auf „Ändern" klappen die Eingabefelder (PLZ, Liefermenge, Abladestellen, Schlauch, Tankwagen) auf. Darunter „Preis neu berechnen" (übernimmt die Werte und schließt den Bereich) und „Abbrechen" (verwirft die Änderungen). Das Lieferdatum bleibt fest (heute + 7 Tage) und wird nur angezeigt.

## 3. Rest

Preise unverändert (Standard 128,78 €/100 L, Premium 133,16 €/100 L, Gesamtpreis inkl. Lieferung und 19 % MwSt.). Kopfzeile mit „Stand: …", Vorteile-Sektion, CTA-Banner und Footer bleiben wie sie sind.

## Technisch

- Nur `src/routes/preisrechner.ergebnis.tsx` wird geändert.
- Reiter-Umschaltung über lokalen State (`variant`), gemeinsame Inhaltskomponente statt zweifachem `OfferTile`.
- Lieferdaten: `editing`-State plus Entwurfswerte; beim Bestätigen werden die echten Werte gesetzt, damit der Gesamtpreis erst dann neu rechnet.
- Bestehende Design-Tokens (`bg-surface`, `border-line`, `text-ink`, `border-t-brand`) und goldene Sterne wie auf `/bewertungen`.
