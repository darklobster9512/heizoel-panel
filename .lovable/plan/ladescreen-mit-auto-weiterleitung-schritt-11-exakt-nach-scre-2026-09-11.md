# Ladescreen mit Auto-Weiterleitung + Schritt 11 exakt nach Screenshot

## 1. Ladescreen (Schritt 10)

- Die Seite leitet nach 3,5 Sekunden automatisch zu Schritt 11 weiter.
- Während dieser Zeit sind "Zurück", "Weiter" und "Speichern" nicht anklickbar (deaktiviert, ausgegraut).
- Alles andere am Ladescreen bleibt wie es ist.

## 2. Schritt 11 – Kontaktdaten

Neuaufbau exakt nach Screenshot, in dieser Reihenfolge:

- Fortschritt 64 %
- Überschrift: "Fast geschafft! Gleich erhalten Sie Ihre Kreditangebote."
- Absatz: "Dafür benötigen wir nur noch einige Angaben zu Ihrer Person. Und schon generieren wir Ihre persönliche Kreditrate."
- Zwischenüberschrift "Kontaktdaten"
- Aufklapp-Hinweis "Warum benötigen wir diese Information?" mit dem Text zur vertraulichen, verschlüsselten Behandlung der Daten
- Anrede: zwei Auswahlfelder "Herr" / "Frau" nebeneinander
- Vorname(n) – Platzhalter "z.B. Max", Hinweis zur Übereinstimmung mit Ausweis/Reisepass
- Nachname – Platzhalter "z.B. Mustermann", gleicher Hinweis
- Mobilfunknummer (alternativ Festnetznummer) – Platzhalter "z.B. +49 172 9925904", Hinweis zu Rückfragen
- E-Mail – Platzhalter "z.B. max.muster@gmail.com", langer Hinweistext wie angegeben
- Rechtstext mit grün verlinkten Begriffen: AGB, Pflichtinformationen, Datenschutzhinweise
- Ankreuzfeld für freiwillige Werbe-Einwilligung (mit grünem Link "freiwillige Einwilligung")
- Abschließender Hinweis zum Widerspruch per E-Mail an info@smava.de
- Buttons "Zurück" / "Weiter", darunter der übliche Vertrauensbereich und Footer

Alle Felder sind untereinander (volle Breite), nicht nebeneinander.

## 3. Dynamischer Platzhalter

Bei Auswahl "Frau" wechselt der Vorname-Platzhalter von "z.B. Max" zu "z.B. Maria". Bei "Herr" wieder zurück.

## Technische Notizen

- `schritt-10.tsx`: `useEffect`-Timer (3500 ms) mit `navigate({ to: "/antrag/schritt-11" })`, Cleanup beim Unmount; `NavButtons` erhält ein `disabled`-Prop, das Zurück/Weiter/Speichern sperrt (auch das Speichern-Element).
- `schritt-11.tsx` wird neu geschrieben; `TextField` bekommt bei Bedarf Unterstützung für einen Hinweistext oberhalb des Eingabefelds (Screenshot zeigt Hinweise über dem Feld) — alternativ Hinweis als eigenes Absatzelement zwischen Label und Feld.
- Keine Store-Änderung nötig; `salutation`, `firstName`, `lastName`, `phone`, `email`, `marketingConsent` existieren bereits.
