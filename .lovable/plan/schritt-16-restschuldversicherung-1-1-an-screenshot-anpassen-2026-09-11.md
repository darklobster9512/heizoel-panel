Schritt 16: Restschuldversicherung 1:1 an Screenshot anpassen

Ziel: `/antrag/schritt-16` soll exakt wie der hochgeladene Screenshot aussehen.

1. In `src/routes/antrag/schritt-16.tsx` die Struktur umstellen:
   - Titel „Restschuldversicherung“
   - Direkt darunter das `WhyInfo`-Accordion mit dem Titel „Warum benötigen wir diese Information?"
   - Dann der Einleitungstext:
     „Möchten Sie sich und Ihre Familie im Falle einer Arbeitslosigkeit, Arbeitsunfähigkeit oder auch im Todesfall absichern, lohnt ein Versicherungsschutz. Im Risikofall übernimmt die Versicherung die Zahlung Ihrer offenen Kreditraten. Ihre Auswahl können Sie jederzeit ändern.“
2. Die bisherigen SVG-Icon-Importe (`komplettschutz`, `kombischutz`, `einfacherschutz`) entfernen und stattdessen ein Lucide-`Shield`-Outline-Icon verwenden.
3. Die drei Versicherungskarten nebeneinander als 3-Spalten-Grid darstellen:
   - Komplett-Schutz: Arbeitslosigkeit, Arbeitsunfähigkeit, Todesfall – alle mit Haken
   - Kombi-Schutz: Arbeitslosigkeit (X), Arbeitsunfähigkeit (Haken), Todesfall (Haken)
   - Einfacher Schutz: Arbeitslosigkeit (X), Arbeitsunfähigkeit (X), Todesfall (Haken)
   - Pro Karte oben das Shield-Icon, darunter der Titel, darunter die Liste, unten ein durchgehend grün-umrandeter „Wählen“-Button.
   - Auswahl weiterhin in `data.insurance` speichern; ausgewählte Karte optional mit grünem Rahmen markieren.
4. Unter den Karten eine Checkbox-Zeile mit exaktem Text:
   „Keine Versicherung - Ich wähle keinen Versichungsschutz und trage das Risiko möglicher Zahlungsausfälle selbst."
   (inkl. der im Screenshot sichtbaren Schreibweise „Versichungsschutz").
5. `NavButtons` und `TrustBlock` am Ende beibehalten, Fortschritt bei 89 % lassen.

Nicht im Scope: Änderungen an anderen Wizard-Schritten, dem Datenmodell oder der Speicherlogik.
