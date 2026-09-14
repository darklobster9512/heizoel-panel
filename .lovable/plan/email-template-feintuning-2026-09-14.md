# Email-Template Feintuning

## Ziel
Die Auftragsbestätigungs-Vorlage in `/admin/emails` an vier Stellen korrigieren:

1. Sterne-Bewertung weiterhin in **Gold** darstellen (aktuell wahrscheinlich durch grüne Akzentfarbe überschrieben).
2. Vertrauens-Statistik: **„33.000+ Kunden“ → „25.000+ Kunden“**.
3. Bewertungszahl: **„4,99 / 5“ → „4,9 / 5“** (auch im Header-Sterne-Block).
4. Lieferbedingung: **„ab 500 Liter Lieferung inklusive“ → „ab 1500 Liter Lieferung inklusive“**.

## Umsetzung
- In `src/lib/email-templates/order-confirmation.ts`:
  - Stern-Icons explizit `#F59E0B` (Gold) setzen, nicht über die grüne Akzentvariable.
  - Statistik-Texte und Bewertungszahl in den Trust-Tiles / Header / Footer anpassen.
  - Schwellenwert für kostenfreie Lieferung auf 1500 Liter ändern.
- Keine neuen Routen, keine DB-Änderungen.
- Abschließend Typecheck und Build prüfen.
