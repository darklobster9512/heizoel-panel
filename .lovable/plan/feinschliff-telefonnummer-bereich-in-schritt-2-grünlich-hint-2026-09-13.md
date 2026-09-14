# Feinschliff: Telefonnummer-Bereich in Schritt 2 grünlich hinterlegen

## Ziel
Die grünliche Hinterlegung soll nicht mehr bei der Telefon-Option in Schritt 1 liegen, sondern beim Telefonnummer-Eingabebereich in Schritt 2 („Daten & Zahlung").

## Änderungen in `src/routes/bestellen.tsx`

### 1. Telefon-Option in Schritt 1 zurücksetzen
- Hintergrund der Telefon-Card wieder auf den ursprünglichen neutralen Wert setzen (kein `bg-brand/5` mehr).
- Hover-Rahmen optional beibehalten oder ebenfalls zurücknehmen — je nach vorherigem Zustand `bg-background` bzw. `bg-surface`.

### 2. Telefonnummer-Bereich in Schritt 2 grünlich hinterlegen
- Das Feld „Telefonnummer" im Kontakt-Formular (Schritt 2) erhält einen dezent grünlichen Hintergrund, z. B. `bg-brand/5`.
- Der Hinweis „Wichtig: Der Lieferfahrer ruft Sie 30 Min. vor Ankunft an." soll innerhalb dieses grünlichen Bereichs bleiben.
- Rahmen/Linien anpassen, damit es optisch wie eine eigene kleine Info-Box innerhalb der Kontakt-Karte wirkt.

## Prüfung
- Screenshot Schritt 1: Telefon-Card hat neutralen Hintergrund.
- Screenshot Schritt 2: Telefonnummer-Feld hat grünlichen Hintergrund und Hinweistext ist sichtbar.
