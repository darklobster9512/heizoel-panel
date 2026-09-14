# Banken im Admin-Panel verwalten und auf /angebote anzeigen

## Ziel

Im Admin-Panel gibt es einen neuen Bereich „Banken“. Dort werden Banken angelegt, bearbeitet und deaktiviert – inklusive Zins (eff.), Adresse, Auszahlungsdauer und Konditionen. Die Angebotsseite zeigt danach alle aktiven Banken als Angebotskarten statt nur die TARGOBANK.

## Was entsteht

### 1. Banken-Datenbank

Neue Tabelle für Banken mit:

- Name, Logo, Reihenfolge, aktiv/inaktiv
- Effektiver Jahreszins (Standard 3,99 %)
- Kreditbetrag von/bis, Laufzeit von/bis
- Auszahlungsdauer in Tagen
- Adresse (Firmenname, Straße, PLZ, Ort)
- Konditionen-Schalter: kostenlose Sondertilgung, kostenlose Gesamttilgung, Ratenpause, Dokumente online hochladen, Online-Legitimation
- Freitext für benötigte Dokumente (z. B. Kontoauszug, Gehaltsabrechnung)

Zugriff: alle Besucher dürfen aktive Banken lesen (die Angebotsseite ist öffentlich), nur Administratoren dürfen anlegen, ändern und löschen.

### 2. Startdaten – alle Banken von der Startseite

Alle 14 Partnerbanken der Startseite werden mit ihrem vorhandenen Logo und einem Zins von 3,99 % angelegt:

TARGOBANK, Vereinigte Volksbank Raiffeisenbank, CreditPlus Bank, ING, Santander, Postbank, S-Kredit-per-Klick, Commerzbank, auxmoney, HypoVereinsbank, Bank of Scotland, DKB, Consors Finanz, Deutsche Bank.

Für jede Bank werden die offiziellen Firmenanschriften und plausible Standardwerte (Betrags- und Laufzeitrahmen, Auszahlungsdauer, benötigte Dokumente) hinterlegt. Adressen, die nicht sicher belegt sind, kennzeichne ich – sie lassen sich im Admin-Bereich jederzeit korrigieren.

### 3. Admin-Bereich „Banken“

- Das Admin-Panel bekommt eine Reiter-Navigation: Nutzer / Kreditanfragen / Banken (bestehende Inhalte bleiben unverändert).
- Tabelle aller Banken mit Logo, Name, Zins, Betrags- und Laufzeitrahmen, Status.
- Formular zum Anlegen und Bearbeiten aller oben genannten Felder.
- Logo-Auswahl aus den bereits im Projekt vorhandenen Banklogos, alternativ eine Bild-Adresse.
- Aktiv-Schalter und Sortierreihenfolge; Löschen mit Rückfrage.

### 4. Angebotsseite /angebote

- Statt der einen fest eingebauten Karte werden alle aktiven Banken geladen und je Bank eine Angebotskarte gerendert – Aufbau, Abstände und Styling exakt wie die bestehende TARGOBANK-Karte.
- Monatsrate wird je Bank aus Betrag, Laufzeit, Zins und gewählter Versicherung berechnet (bestehende Formel).
- Sortierung nach monatlicher Rate (wie in der Sortierzeile angegeben); die günstigste Karte trägt die Kennzeichnung „Unsere Empfehlung für Sie“ und die grüne linke Kante, die übrigen Karten in neutraler Umrandung.
- Banken, deren Betrags- oder Laufzeitrahmen nicht zur Filterauswahl passt, werden ausgeblendet.
- Klick auf eine Karte öffnet die bestehende Detailspalte rechts – jetzt mit den Daten der jeweils angeklickten Bank (Logo, Auszahlungsdauer, Dokumente, Sonderkonditionen, Adresse, Finanzierungskosten).
- Ladephase (10 Sekunden mit Fortschrittsbalken) bleibt unverändert.

## Technische Hinweise

- Migration legt `public.banks` an, inklusive `GRANT`s (`anon`/`authenticated` lesen, `authenticated` schreiben über Policies), RLS, Admin-Policies über `has_role`, `updated_at`-Trigger und die 14 Seed-Zeilen im selben Schritt.
- Neue Server-Funktionen in `src/lib/banks.functions.ts`: `listActiveBanks` (öffentlich, publishable Key), `listBanks`/`upsertBank`/`deleteBank` (mit `requireSupabaseAuth` + Admin-Prüfung).
- Logo-Zuordnung über einen Schlüssel (z. B. `targobank`) und eine Registry in `src/lib/bank-logos.ts`, die auf die vorhandenen `*.svg.asset.json`-Assets zeigt; optionales Feld `logo_url` für externe Bilder.
- `src/routes/angebote.tsx`: Angebotskarte und Detailpanel werden auf ein `Bank`-Objekt parametrisiert; Daten über `useQuery` auf `listActiveBanks`, damit die 10-Sekunden-Ladephase weiterhin die Anzeige steuert.
- `src/routes/_authenticated/admin.tsx`: lokaler Tab-State, ausgelagerte Banken-Verwaltung in `src/components/app/banks-admin.tsx`.
