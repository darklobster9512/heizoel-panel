# Schritt 10: Ladebildschirm 1:1 wie im Screenshot

Der Schritt nach „Weiter" aus Schritt 9 wird an die Vorlage angeglichen: Überschrift, persönliche Zusammenfassung und drei Angebots-Karten mit den echten Banklogos (ING, DKB, TARGOBANK) als Lade-Skelett.

## Aufbau (wie im Screenshot)

1. **Fortschrittsbalken** bleibt bei 64 % („64 % geschafft"), unverändert.
2. **Überschrift:** „Fast geschafft! Einen Augenblick noch." — fett, zentriert.
3. **Zusammenfassung „Ihre Angaben:"** als zweispaltige Liste (Label links, Wert rechts, ohne Box/Hintergrund — direkt auf weißem Grund), Zeilen:
   - Anzahl Kreditnehmer → Wert aus dem Wizard (`borrowers`)
   - Familienstand → `maritalStatus`
   - Wohnsituation → `housing`
   - Erwachsene im Haushalt (ab 18 Jahre) → `adults`
   - Kinder im Haushalt (unter 18 Jahre) → `children`
   - Vermietete Immobilie → „Kein Immobilienbesitz" bei `rentedProperty = false`, sonst „Vermietete Immobilie"
   - Beruf → `profession`
   - Nettoeinkommen → `netIncome` (Zahl, wie im Screenshot ohne „€/Monat" dahinter)
4. **Drei Angebots-Karten** (ING, DKB, TARGOBANK) untereinander mit Abstand:
   - Weiße Karte mit feiner grauer Border, leichtem Schatten und leicht abgerundeten Ecken.
   - Links oben das echte Banklogo aus den Landingpage-Assets (`ingdiba`, `dkb`, `targobank`).
   - Darunter fünf graue Skelett-Spalten (abgerundete Balken, `#e5e5e5` o. ä.) als Platzhalter für die ladenden Konditionen — die letzte Spalte auf leicht grauer vertikaler Fläche wie im Screenshot.
5. **Trust-Zeile darunter:** hellgrauer Streifen mit „TÜV geprüft + SCHUFA-neutral" (fett, zentriert).
6. Navigation „Zurück/Weiter" und TrustBlock bleiben wie bisher; der bisherige Häkchen-Lade-Countdown und die alte Überblick-Box entfallen.

## Technisch

- Nur `src/routes/antrag/schritt-10.tsx` wird umgeschrieben.
- Logos kommen aus den vorhandenen Assets: `@/assets/ingdiba.svg.asset.json`, `@/assets/dkb.svg.asset.json`, `@/assets/targobank.svg.asset.json`.
- Die bestehende Lade-Animation (Spinner/Häkchen) entfällt; die Skelett-Karten übernehmen die Rolle des Ladezustands.

## Prüfung

Build/Typecheck plus Browser-Screenshot von `/antrag/schritt-10` und Abgleich mit der Vorlage (Abstände, Logo-Größen, Skelett-Karten).
