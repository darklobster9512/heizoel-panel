# Plan: Live-Bestellungen-Element im Preisrechner

## Ziel
Die Bewertungszeile („4,9 / 5 Sternen / Ausgezeichnet / Basierend auf über 33.000 Kundenbewertungen") in der rechten Hälfte der Hero-Karte auf `/preisrechner` wird durch ein Live-Bestellungs-Element ersetzt. Es wechselt alle 5 Sekunden zwischen verschiedenen Bestellungen und wirkt wie ein Echtzeit-Feed.

## Änderungen (nur `src/routes/preisrechner.tsx`)

### 1. Altes Element entfernen
- Den Bewertungsblock unter den 3 Schritten (Stars + 4,9/5 + „Ausgezeichnet" + „Basierend auf …") aus `CompactSteps` entfernen.
- Die Bewertungs-Kachel im Abschnitt „Warum bei Klaro bestellen?" bleibt unverändert.

### 2. Neues `LiveOrders`-Element (unterhalb der 3 Schritte, gleiche Position)
Aufbau, gut platzausnutzend und detailliert:

```text
┌─────────────────────────────────────────────┐
│ ● LIVE  ·  Aktuelle Bestellungen            │
│─────────────────────────────────────────────│
│  [Bestellung aus Dresden (01067)      ↺    ]│
│  [1.800 Liter — 128,78 €/100L              ]│
│  [● vor 1 Min. · Gesamt: 2.318,04 €        ]│
└─────────────────────────────────────────────┘
```

Details:
- **Kopfzeile:** grüner blinkender Punkt („pulse"-Animation: sanftes Aufleuchten + Halo-Ring, dezent), daneben „LIVE" in kleiner Caps-Schrift und „Aktuelle Bestellungen bei Klaro" als Zusatztext.
- **Bestellzeile:** Stadt + PLZ (z. B. „Bestellung aus Dresden (01067)"), darunter Menge + Preis („1.800 Liter — 128,78 €/100L"), darunter klein: Zeitstempel („vor 52 Sek.") und Gesamtbetrag (Menge × Preis, formatiert mit Tausenderpunkt + 2 Nachkommastellen, z. B. „Gesamt: 2.318,04 €").
- **Daten:** fester Pool von ~15–20 deutschen Städten mit echter PLZ (Dresden, Leipzig, Erfurt, München, Nürnberg, Hannover, Kiel, Köln, Stuttgart, Rostock, Magdeburg, Potsdam, Karlsruhe, Bremen, Kassel, Augsburg …). Mengen zufällig 1.500–5.000 Liter (in 100er-Schritten), Preis leicht variierend um 126–133 €/100L.
- **Wechsel:** alle 5 Sekunden neue Bestellung, mit kurzer Fade-/Slide-Transition (dezent, kein verspielter Effekt). Zeitanzeige passt zur Rotationslogik: „vor 52 Sek.", „vor 1 Min.", „vor 2 Min.", „vor 3 Min." etc. — wirkt wie gerade reingekommen.
- **Styling:** konsistent zur Seite — weißer/neutraler Hintergrund, feine `border-line`-Umrandung, Grün nur als Akzent (Punkt + evtl. Betrag), `text-conditions`-Typografie, Trennlinie oben wie bisher (`border-t border-line pt-4` bleibt).
- **Technik:** React-Komponente mit `useState`/`useEffect`-Intervall (5 s), Intervall wird beim Unmount aufgeräumt; Initialwert fest, damit SSR/Client identisch rendern (kein Hydration-Flackern); Intervall startet erst clientseitig.
- Fortschrittsbalken über den 5 s bis zum nächsten Wechsel (schmale Linie unten am Element) als Detail-Plus, falls es ruhig wirkt — sonst weglassen. Entscheidung nach Screenshot-Check.

### 3. Verifikation
- Build-Log `/tmp/observability/build-errors.log` prüfen.
- Playwright-Screenshot (Desktop + Mobile) nach `/tmp/browser/preisrechner-live-orders/screenshots/`, zweimal aufnehmen (Abstand >5 s), um den Wechsel sichtbar zu bestätigen.

## Hinweis
Die „Bestellungen" sind simulierte Beispieldaten (wie bisherige Platzhalter-Zahlen auf der Seite). Für echte Live-Daten wäre später ein Backend nötig — hier zunächst bewusst lokal simuliert.
