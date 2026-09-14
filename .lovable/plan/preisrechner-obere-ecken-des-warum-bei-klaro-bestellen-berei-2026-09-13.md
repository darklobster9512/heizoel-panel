# `/preisrechner`: Obere Ecken des "Warum bei Klaro bestellen?"-Bereichs abrunden

## Ziel
Der direkt unter die Preisrechner-Hero-Card angedockte Vorteils-Bereich soll auch oben abgerundete Ecken erhalten, damit er als eigenständige Card-Einheit wirkt.

## Änderung
- In `src/routes/preisrechner.tsx` die Klasse des "Warum bei Klaro bestellen?"-Containers von `rounded-b-xl` auf `rounded-xl` ändern (obere und untere Ecken abgerundet).
- Alle anderen Stile (Rahmen, Padding, Grid, Inhalte) bleiben unverändert.

## Verifikation
- Build prüfen (`/tmp/observability/build-errors.log`).
- Screenshot Desktop/Mobil der `/preisrechner`-Seite, um zu prüfen, dass der Bereich oben und unten abgerundet ist.
