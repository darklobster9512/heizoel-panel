Vier Auszeichnungen leicht verkleinern und in eine Reihe zwingen

- In `src/components/landing/hero.tsx` die Abzeichen-Höhe leicht reduzieren (z. B. von `h-20 md:h-24` auf `h-16 md:h-20`).
- Container auf `flex-nowrap` setzen, damit alle vier Siegel zwingend in einer Reihe bleiben.
- Abstände leicht verringern (`gap-3 md:gap-4`), damit die Reihe auch auf Mobil in den Viewport passt.
- Maximale Breite (`max-w`) an die kleinere Höhe anpassen, damit keine Verzerrung entsteht.
- Build prüfen und per Screenshot Desktop/Mobil verifizieren, dass alle vier Siegel nebeneinander in einer Reihe stehen und trotzdem lesbar sind.