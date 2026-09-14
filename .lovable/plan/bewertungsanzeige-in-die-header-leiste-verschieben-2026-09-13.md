Bewertungsanzeige in die Header-Leiste verschieben

- In `src/components/landing/hero.tsx` befindet sich aktuell unter `trustBadges` die Bewertungsanzeige: eKomi-Logo, 5 Sterne, "4.9/5" und "aus 705 Bewertungen der letzten 12 Monate – Stand 8.9.2026".
- Diesen Block als wiederverwendbare `RatingBadge`-Komponente extrahieren und in `src/components/landing/site-header.tsx` einbauen.
- In `site-header.tsx` das Telefon-Icon und die Telefonnummer (sowohl in der mobilen als auch in der Desktop-Ansicht) durch die kompakte Bewertungsanzeige ersetzen.
- In `hero.tsx` die verschobenen Bewertungselemente aus `trustBadges` entfernen; das verbleibende TÜV-Siegel bleibt im Hero.
- Auf saubere Darstellung in der schmalen Header-Leiste achten (Sterne, Score und Bewertungsanzahl kompakt, eKomi-Logo klein).
- Build prüfen und kurz in der Vorschau auf Desktop und Mobil verifizieren.