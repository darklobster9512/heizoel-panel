Schritt 16: Icons und Warum-Info korrigieren

1. In `src/routes/antrag/schritt-16.tsx` wieder die drei angehängten SVG-Icons verwenden:
   - `user-uploads://komplettschutz-2.svg`
   - `user-uploads://kombischutz-2.svg`
   - `user-uploads://einfacherschutz-2.svg`
   Dafür für jede Datei einen Lovable-Asset-Pointer unter `src/assets/` anlegen und im Schritt per Import einbinden.
2. Den sichtbaren Einleitungstext unter dem Accordion entfernen.
3. Den Text „Möchten Sie sich und Ihre Familie im Falle einer Arbeitslosigkeit, Arbeitsunfähigkeit oder auch im Todesfall absichern, lohnt ein Versicherungsschutz. Im Risikofall übernimmt die Versicherung die Zahlung Ihrer offenen Kreditraten. Ihre Auswahl können Sie jederzeit ändern.“ als Inhalt des `WhyInfo`-Accordions verwenden, damit er erst beim Aufklappen erscheint.

Nicht im Scope: Änderungen an Kartenauswahl, Navigation, Fortschrittsbalken oder anderen Schritten.
