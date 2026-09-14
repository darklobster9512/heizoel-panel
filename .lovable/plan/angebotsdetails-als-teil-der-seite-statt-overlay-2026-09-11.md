# Angebotsdetails als Teil der Seite statt Overlay

## Ziel
Das Detail-Panel wird kein Overlay mehr, sondern Teil des Seitenlayouts: Beim Öffnen schiebt sich die Angebots-Card nach links und rechts daneben erscheint das Detail-Panel. Geöffnet wird es per Klick auf die Angebots-Card (nicht nur über den „zum Antrag“-Button).

## Änderungen in `src/routes/angebote.tsx`

1. **Overlay entfernen**
   - Das dunkle Hintergrund-Overlay (`bg-black/40`) und die `fixed`-Positionierung des `OfferDetailsPanel` entfallen.
   - Das Panel bleibt als eigene Komponente erhalten (Tabs „Kreditinformationen“ / „Finanzierungskosten“, Schließen-Button, beide „zum Antrag“-Buttons, Inhalte unverändert), wird aber statisch im Layout gerendert statt `fixed inset-y-0 right-0`.

2. **Seitenlayout mit zwei Spalten**
   - Desktop: Wenn das Panel geöffnet ist, wird der Inhaltsbereich zu einer zweispaltigen Ansicht:
     - Links (ca. 55–60 %): Sortier-Hinweis + Angebots-Card (schmaler, rückt nach links).
     - Rechts (ca. 40–45 %): Detail-Panel, fließend in die Seite eingebettet, ohne Overlay und ohne Schatten über dem Inhalt.
   - Wenn geschlossen: bisherige zentrierte Einzelspalte (max. 770px), unverändert.
   - Der Übergang animiert sich sanft (Breiten-/Transform-Transition, ~300 ms).
   - Mobil (unter `md`): Panel erscheint unterhalb der Card im normalen Fluss, ebenfalls ohne Overlay.

3. **Öffnen per Card-Klick**
   - Die gesamte TARGOBANK-Angebots-Card wird klickbar (inkl. Tastaturbedienung per Enter/Leertaste, `role="button"`, Hover-Zeiger) und öffnet das Panel.
   - Der „zum Antrag“-Button in der Card behält seine bisherige Funktion (öffnet das Panel), löst aber kein doppeltes Öffnen aus (Event-Propagation gestoppt, wo nötig).
   - „zum Antrag“-Buttons im Panel navigieren wie bisher zu `/antrag/fertig`.

4. **Schließen**
   - Schließen über den X-Button im Panel und per Escape-Taste (bestehend). Kein Overlay-Klick mehr nötig/möglich.

## Technische Details
- Zustand `detailsOpen` bleibt; Rendering wechselt von Portal-artigem `fixed`-Overlay zu einem Flex-/Grid-Layout (`md:flex-row`, Panel-Spalte animiert über `max-width`/Opacity oder Grid-Spalten-Transition).
- Header (Sticky-Filterleiste), TrustBlock, Garantie-Hinweis und Footer bleiben unverändert; Garantie-Hinweis/TrustBlock bleiben zentriert unter dem Inhalt.
- Keine Änderungen an Daten, Wizard-Store oder anderen Routen.
- Verifikation: Typecheck + Playwright-Klicktest (Card-Klick öffnet Panel inline, kein Overlay, kein horizontaler Overflow auf Desktop und Mobil).
