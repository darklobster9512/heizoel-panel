TÜV-Abzeichen in Hero durch vier Auszeichnungen ersetzen

- Die vier hochgeladenen Abzeichen-Bilder über `lovable-assets create` als CDN-Assets in `src/assets/` anlegen:
  - ntv Gesamtsieger
  - Bild Empfehlung 2026
  - Die Welt Service-Champion 2025
  - DtGV Testsieger
- In `src/components/landing/hero.tsx` das einzelne TÜV-`img` in `trustBadges` entfernen und stattdessen die vier neuen Abzeichen anzeigen.
- Layout anpassen: auf Desktop nebeneinander in einer Reihe, auf Mobil kompakt (z. B. zweimal zwei oder horizontal scrollbar), sodass alle Siegel lesbar bleiben.
- Alt-Texte für die neuen Bilder vergeben.
- Build prüfen und kurz in der Vorschau auf Desktop und Mobil verifizieren.