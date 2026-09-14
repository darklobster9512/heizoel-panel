# Neue Seite: Ihr persönliches Heizölangebot (`/preisrechner/ergebnis`)

## Ziel
Nach Klick auf „Jetzt Heizölpreise vergleichen" (Rechner auf Startseite und `/preisrechner`) landet der Nutzer auf einer neuen Angebotsseite mit zwei Heizölsorten, Lieferinfos, Zahlungsarten und Vorteilen — im Klaro-Design.

## Ablauf
- Der Button im Rechner führt künftig zu `/preisrechner/ergebnis` und übergibt PLZ, Menge und Abladestellen (bisher ging er zur Antragsstrecke).
- Die Angebotsseite liest diese Werte und zeigt sie in einem änderbaren Block:
  - Postleitzahl, Liefermenge, Abladestellen (bearbeitbar)
  - Schlauch: bis 40 m (Standard), bis 60 m, bis 80 m
  - Tankwagen: egal (auch mit Hänger), max. 26 t / 2,60 m breit, max. 18 t / 2,55 m breit, max. 10 t / 2,30 m breit
  - Lieferdatum: fest „ab {heute + 7 Tage}", nicht änderbar
- Änderungen an Menge wirken sofort auf den Gesamtpreis.

## Preise
- Standard (DIN 51603-1): 128,78 € / 100 L
- Premium: 133,16 € / 100 L
- Gesamtpreis = Menge / 100 × Preis, gerundet auf 2 Stellen, Ausgabe deutsch formatiert.
- Beide Preise sind Endpreise: „inkl. Lieferung" und „inkl. 19 % MwSt." — es wird nichts zusätzlich addiert.

## Seitenaufbau
1. `SiteHeader`
2. Kopf: „Ihr persönliches Heizölangebot" + „Stand: TT.MM.JJJJ, HH:MM Uhr"
3. Eingabe-/Änderungsblock (siehe oben), grüne Topline
4. Zwei Angebots-Karten nebeneinander (mobil gestapelt):
   - „Standard – Das Günstige" und „Premium – Das Sparsame" mit Badge „EMPFOHLEN"
   - Kurzbeschreibung, Preis pro 100 Liter, Gesamtpreis inkl. Lieferung, Hinweis „inkl. 19 % MwSt."
   - Hinweiszeile „Direktpreis ohne Zwischenhändler — inkl. Lieferung"
   - Lieferung: „ab {Datum}", „Deutschlandweit"
   - Zahlungsarten: Vorkasse, Bar, EC-Karte, Rechnung
   - Button „Zur Bestellung" + „100 % sicher & SSL-verschlüsselt"
5. Kleiner Vergleichs-Hinweis „Sorten im Detail vergleichen" (Link zu `/heizoel-wissen#sorten`)
6. Bewertungszeile: eKomi-Siegel, goldene Sterne, „25.000+ Bewertungen"; Hinweise „Lieferung durch Klaro oder regionalen Partnerhändler" und „Preis ist bindend bei Bestellung. Es entstehen keine weiteren Kosten!"
7. „Ihre Vorteile" mit 5 Punkten (günstigste Preise, Lieferung inklusive, Käuferschutz, über 25.000 Kunden mit 4,9/5, SSL & DSGVO)
8. `ReferralBanner compact` + `SiteFooter`

Zahlenangaben folgen dem bestehenden Stand: 25.000+ Kunden, 4,9/5 (nicht 33.000 / 4,99 wie in der Vorlage).

## Technisch
- Neue Route `src/routes/preisrechner.ergebnis.tsx` → `createFileRoute("/preisrechner/ergebnis")` mit eigenem `head()` (Titel, Description, OG/Twitter, canonical).
- Suchparameter über `validateSearch` (Zod): `plz`, `menge`, `abladestellen`, optional `schlauch`, `tankwagen`; Standardwerte, wenn nichts übergeben wird.
- `src/components/landing/offer-card.tsx`: Link-Ziel von `/antrag/schritt-1` auf `/preisrechner/ergebnis` umstellen (gilt automatisch für Startseite und `/preisrechner`).
- „Stand"-Zeit und Lieferdatum erst nach dem Hydrieren berechnen (Client-Zeit), damit keine Server/Client-Abweichung entsteht.
- Bilder: `vorauskasse.png`, `barzahlung.png`, `ec-karte.png` aus `src/assets`; „Rechnung" als Icon-Kachel im gleichen Stil, da kein Bild vorliegt.
- Nur Design-Tokens (`bg-surface`, `border-line`, `text-ink`, `border-t-brand`, `bg-brand`), keine Hardcode-Farben.
- „Zur Bestellung" führt vorerst zu `/antrag/schritt-1` mit den gewählten Werten; keine Backend-Änderungen.

## Verifikation
- Typecheck und Build-Log prüfen.
- Screenshots Desktop + Mobil von `/preisrechner/ergebnis`, inkl. Klickweg vom Rechner auf der Startseite.
