# Plan: Checklisten-Punkte im Ladescreen mittig zentrieren

## Ziel
Nicht nur Titel und Spinner, sondern auch die drei Checklisten-Punkte („Aktuelle Marktdaten eingelesen“, „Günstigsten Lieferanten gefunden“, „Tagesaktueller Preis berechnet") sollen im Ladescreen exakt horizontal mittig zentriert sein.

## Aktueller Zustand
Die Punkte stehen in einer `text-left`-Liste mit `items-start`, sodass sie trotz zentriertem Container links ausgerichtet wirken.

## Umsetzung
1. In `src/components/landing/price-search-loading.tsx` die `<ul>` von `text-left` auf `text-center` umstellen.
2. Die `<li>`-Elemente mit `inline-flex items-center justify-center` statt `flex items-start` rendern, damit jede Zeile als Ganzes in der Mitte steht.
3. Icon und Text weiterhin nebeneinander belassen; der Text bleibt linksbündig zum Icon, die gesamte Zeile ist aber horizontal zentriert.
4. Sicherstellen, dass die Animationen (`translate-y-0/2`, `opacity`) weiterhin funktionieren.

## Prüfung
- Ladescreen auf Startseite und `/preisrechner` auslösen.
- Screenshot prüfen: alle drei Punkte inklusive Häkchen bilden eine senkrechte Mittelachse.
- Desktop und Mobil vergleichen.
