# Plan: /preisrechner/ergebnis schmaler + CTA entfernen

## Ziel
Die Angebotsseite `/preisrechner/ergebnis` soll deutlich schmaler wirken, ähnlich der Screenshot-Vorlage. Außerdem soll die CTA-Sektion (`ReferralBanner`) entfernt werden.

## Änderungen

1. **Content-Breite reduzieren**
   - In `src/routes/preisrechner.ergebnis.tsx` den inneren Hauptcontainer (`<section className="bg-background">` mit `max-w-6xl`) auf ca. 50 % der aktuellen Breite reduzieren.
   - Vorschlag: `max-w-6xl` → `max-w-3xl` (oder `max-w-[720px]`), damit die Karte zentriert und kompakt wirkt.
   - Header (`SiteHeader`) und Footer (`SiteFooter`) bleiben weiterhin über die volle Breite.

2. **CTA-Sektion entfernen**
   - Den `<ReferralBanner compact />`-Aufruf vor dem Footer entfernen.
   - Den Import von `ReferralBanner` aus `src/components/landing/sections` entfernen, falls er danach nicht mehr verwendet wird.

3. **Visuelle Anpassungen prüfen**
   - Nach der Breitenänderung prüfen, ob die Tab-Leiste, Preisbox, Zahlungsarten und der Trust-Strip noch harmonisch aussehen.
   - Ggf. horizontale Padding/Spacing leicht anpassen, damit der schmalere Container auf Mobil nicht zu eng wirkt.

## Akzeptanzkriterien
- Die Seite `/preisrechner/ergebnis` zeigt den Angebotsbereich deutlich schmaler als bisher.
- Die CTA-Sektion über dem Footer ist nicht mehr vorhanden.
- Build läuft fehlerfrei.
