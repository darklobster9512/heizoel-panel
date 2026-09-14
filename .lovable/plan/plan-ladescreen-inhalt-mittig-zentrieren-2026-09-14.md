# Plan: Ladescreen-Inhalt mittig zentrieren

## Ziel
Der Inhalt des gemeinsamen Ladescreens (`PriceSearchLoading`) soll exakt in der Mitte des verfügbaren Bereichs unter dem Header stehen — horizontal und vertikal zentriert.

## Aktueller Zustand
Die Komponente ist bereits mit `items-center justify-center` ausgerichtet, enthält aber eine zusätzliche Verschiebung nach oben (`-translate-y-8` / `md:-translate-y-10`), die den visuellen Mittelpunkt verfälscht.

## Umsetzung
1. In `src/components/landing/price-search-loading.tsx` die vertikale Verschiebung entfernen, sodass der innere Container exakt in der Mitte liegt.
2. Sicherstellen, dass `min-h-[calc(100vh-100px)] md:min-h-[calc(100vh-112px)]` weiterhin den Header freihält.
3. Horizontale Zentrierung bleibt durch `text-center` und `mx-auto` erhalten.
4. Optional: Falls nötig, den inneren Container mit `flex flex-col items-center` umschreiben, damit auch Listen/Häkchen exakt mittig ausgerichtet sind.

## Prüfung
- Ladescreen auf der Startseite und auf `/preisrechner` aufrufen.
- Screenshot prüfen: Spinner, Titel, Untertitel, Checkliste und Trust-Zeile bilden eine senkrechte Mitte.
- Desktop und Mobil vergleichen.
