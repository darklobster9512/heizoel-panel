# /auth-Seite im hellen Landingpage-Stil

## Zielbild

Die bestehende `/auth`-Seite wird vom dunklen Tactical-Terminal-Look in den hellen, seriösen Klaro-Landingpage-Stil überführt: weißer/neutral-grauer Hintergrund, dezente Linien, Grün nur als Akzent. Anmeldung, Registrierung, Weiterleitung und alle bestehenden Funktionen bleiben unverändert.

## Feste Gestaltung

- **Hintergrund:** reines Weiß (`--background`, `--surface`) mit feinen neutralen Linien (`--line`).
- **Akzent:** Klaro-Grün aus den semantischen Tokens (`--brand`, `--brand-hover`, `--smava-logo`), nie flächig grün getönt.
- **Text:** dunkles Ink (`--ink`, `--conditions-text`) für Überschriften, `--muted-custom` für Sekundärtexte.
- **Schrift:** Roboto bleibt die einzige Schrift.
- **Karten/Formularbereich:** helle, leicht abgesetzte Flächen (`--card`, `--surface`) mit dezenten Schatten (`shadow-card`) statt dunkler Panels.
- **Keine** dunklen Ops-Farben (`ops-canvas`, `ops-panel`, `ops-line`) mehr auf der Auth-Seite; diese Tokens bleiben für andere Seiten erhalten.

## Aufbau

- Beibehaltung des bewährten 5/7-Splits auf Desktop und der einspaltigen Darstellung auf Mobilgeräten.
- **Linke Spalte (Desktop):**
  - Klaro-Logo in Grün.
  - Kopfzeile „MITARBEITERPORTAL" und Live-Status „System online" in dezentem Grün.
  - Kurze Sicherheitsbotschaft im hellen Stil.
  - Crypto-Board mit Bitcoin, Ethereum, Monero, Solana: helle Karten mit feinen Rändern, grüne Positive-Trends, rote Negative-Trends (bestehende `--destructive`).
  - Betriebsstatus-Module (Status / Zugriff / Kanal) als helle, unterteilte Zeile.
- **Rechte Spalte:**
  - Klarer Login-/Registrierungsbereich auf hellem Grund.
  - Modus-Umschalter „Anmelden / Registrieren" als Segment-Control im hellen Stil.
  - Eingabefelder mit hellen Hintergründen, grünem Fokus-Ring und grünem Aktionsbutton mit weißem Text.
  - Mobile Crypto-Kurse kompakt oberhalb des Formulars, dann das Formular.

## Anmeldung und Registrierung

- Keine funktionale Änderung.
- E-Mail, Passwort, Passwortwiederholung, Ladezustand, Weiterleitung und Fehlermeldungen bleiben erhalten.
- Primärer Button behält weißen Text auf grünem Grund, bekommt aber den hellen Hover-Sweep-Effekt passend zur Seite.

## Details und Animationen

- Ruhiges, gestaffeltes Einblenden der linken Spalte, des Formulars und der Statuszeilen bleibt erhalten.
- Dezenter Puls am Online-Status und animierter Kurs-Refresh weiterhin vorhanden.
- Sanfter Übergang zwischen Anmelden und Registrieren; Formularhöhe bleibt stabil.
- Präzise Fokus-, Hover- und Klickzustände für Felder, Sichtbarkeitsknopf, Moduswahl und Hauptaktion.
- Reduzierte Bewegung in den Systemeinstellungen wird respektiert.

## Technische Umsetzung

- `src/routes/auth.tsx` wird visuell neu gestaltet; Auth-Logik und Supabase-Aufrufe bleiben unverändert.
- Bestehende helle semantische Tokens aus `src/styles.css` werden verwendet (`--background`, `--surface`, `--line`, `--brand`, `--brand-hover`, `--ink`, `--muted-custom`, `--card`, `--destructive`).
- Keine neuen Farbvariablen nötig, solange der aktuelle helle Theme ausreicht.
- `shadow-card` und ähnliche Utilities aus `src/styles.css` nutzen.
- Seitentitel, Meta-Beschreibung und `noindex` bleiben erhalten.

## Prüfung

- Visuelle Prüfung der Auth-Seite auf Desktop und Mobil.
- Anmeldung und Registrierung durchspielen.
- Crypto-Kurse, Ladezustand und Fehlerzustand prüfen.
- Typecheck und Build-Fehler vor Fertigstellung beheben.
