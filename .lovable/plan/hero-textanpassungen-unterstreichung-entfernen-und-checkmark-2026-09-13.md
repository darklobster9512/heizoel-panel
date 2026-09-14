Hero-Textanpassungen: Unterstreichung entfernen und Checkmarks neu formulieren

- In `src/components/landing/hero.tsx` die grüne Unterstreichung bei „garantiert!" entfernen (nur noch der rohe Text ohne `underline`-Klassen).
- Die drei Checkmark-Texte in `CHECKS` ersetzen durch:
  1. „Bis zu **20% günstiger** als der Marktdurchschnitt"
  2. „Über **500 zertifizierte Händler** deutschlandweit"
  3. „**Festpreis-Garantie** — auch bei steigenden Ölpreisen"
- Dazu `CHECKS` auf ein Array von Objekten mit `prefix`, `bold`, `suffix` umstellen, damit die fett hervorgehobenen Teile korrekt gerendert werden.
- Build prüfen und per Screenshot Desktop/Mobil verifizieren.