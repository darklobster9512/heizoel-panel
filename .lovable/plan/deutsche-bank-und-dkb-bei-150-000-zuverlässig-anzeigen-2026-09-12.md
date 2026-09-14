# Deutsche Bank und DKB bei 150.000 € zuverlässig anzeigen

## Befund

- In der Bankverwaltung stehen Deutsche Bank und DKB bereits auf 1.000–5.000.000 € und 12–120 Monate, Zins 2,99 %.
- Ein Test der Angebotsseite mit 150.000 € / 84 Monate zeigt beide Banken korrekt mit 2,99 % und 1.981,32 € Monatsrate.
- Die Angebotsseite lädt die Bankdaten nur einmal beim Öffnen der Seite und behält sie danach im Zwischenspeicher. Ein Tab, der vor der Datenänderung geöffnet wurde, zeigt deshalb weiter die alten Kreditrahmen – dort verschwinden beide Banken ab ca. 80.000 €.

## Was geändert wird

- Beim Klick auf den grünen Suchbutton werden die Bankdaten frisch geladen, nicht aus dem Zwischenspeicher.
- Die Bankliste wird nicht mehr dauerhaft zwischengespeichert, sondern bei jedem Seitenaufruf neu geholt.
- Alle übrigen Banken, Zinssätze, Sortierung, Ladeanimation und Kartenlayout bleiben unverändert.

## Technisch

- `src/routes/angebote.tsx`: `useQuery({ queryKey: ["active-banks"] })` erhält `staleTime: 0` und `gcTime: 0`; `handleSearch` ruft zusätzlich `banksQuery.refetch()` auf, bevor die 10-Sekunden-Ladephase startet.

## Prüfung

- Seite neu laden, 150.000 € eingeben, Suchbutton klicken: Deutsche Bank und DKB stehen oben in der Liste.
- Gegenprobe mit 5.000 €, 80.000 € und 5.000.000 €.
