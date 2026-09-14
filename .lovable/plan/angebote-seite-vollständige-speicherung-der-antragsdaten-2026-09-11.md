# Angebote-Seite + vollständige Speicherung der Antragsdaten

## 1. Neue Seite "Angebote" (`/angebote`)

Nach Schritt 18 führt "Weiter" nicht mehr zur Abschlussseite, sondern zur neuen Angebote-Seite.

**Ladephase (ca. 10 Sekunden), wie im Loading-Screenshot:**
- Oben ein schmaler grüner Fortschrittsbalken, der in 10 Sekunden gleichmäßig von 0 auf 100 % läuft.
- Darunter wechselnder Statustext, z. B.:
  - "Ihre Angaben werden geprüft…"
  - "Wir fragen die Banken an…"
  - "Wir prüfen die besten Kreditangebote…"
  - "Individuelle Angebote erhalten…"
- Im Inhaltsbereich graue Platzhalter-Karten (Skeletons) im Layout der späteren Angebotskarte.
- Unten: Garantie-Hinweis "Woanders ein günstigeres Angebot gefunden? Kein Problem!" sowie der bekannte TÜV-/SCHUFA-Vertrauensblock und der Footer.

**Ergebnisphase (nach 10 Sekunden), wie im Angebote-Screenshot:**
- Kopfleiste mit drei bearbeitbaren Feldern, vorbefüllt aus den Wizard-Angaben:
  - Kreditbetrag (Eingabefeld mit €)
  - Laufzeit in Monaten (Auswahl: 12–120 Monate, Anzeige z. B. "84 Monate (7 Jahre)")
  - Restschuldversicherung (Auswahl: keine Versicherung, Einfacher Schutz, Kombi-Schutz, Komplett-Schutz)
  - Änderungen werden sofort übernommen; Rate und Zins des Angebots rechnen sich mit.
- Sortierleiste "Sortieren: monatliche Rate".
- Eine Angebotskarte "Unsere Empfehlung für Sie" mit **TARGOBANK**-Logo und Mockup-Daten:
  Kreditbetrag, Laufzeit in Monaten, effektiver Zins, monatliche Rate, Hinweis "Kostenlose Sondertilgung", Button "zum Antrag" (führt zur bestehenden Abschlussseite `/antrag/fertig`).
- Darunter Garantie-Hinweis, Vertrauensblock und Footer wie im Screenshot.

Die Rate wird aus Betrag, Laufzeit und einem festen Beispielzins (Mockup) berechnet, damit Änderungen oben sichtbar wirken.

## 2. Alle Antragsdaten speichern

Aktuell wird nur ein Teil der Angaben gespeichert. Fehlende Angaben (u. a. Verhältnis der Kreditnehmer, alle Nebentätigkeiten, sonstige Einkünfte, Details zur vermieteten Immobilie, Teilzeit-/Befristungsdetails, alle bestehenden Kredite, Zweitstaatsangehörigkeit, Bankverbindung, gewählter Versicherungsschutz, gewählter Kreditbetrag/Laufzeit von der Angebote-Seite) werden ergänzt.

Umsetzung:
- Datenbank: die Tabelle der Kreditanfragen erhält ergänzende Felder für die bisher fehlenden Einzelangaben sowie ein Sammelfeld, in dem der komplette Antrag (inklusive Listen wie Nebentätigkeiten und bestehende Kredite) unverändert abgelegt wird. Damit geht garantiert nichts verloren.
- Die Speicherung erfolgt weiterhin beim Abschluss (`/antrag/fertig`) und umfasst dann sämtliche Angaben.

## 3. Adminpanel: echte Anfragen statt Beispieldaten

- Der Bereich "Kreditanfragen" zeigt die tatsächlich gespeicherten Anfragen aus der Datenbank (nur für Administratoren).
- Tabelle: Datum, Name, E-Mail, Zweck, Betrag, Laufzeit, Nettoeinkommen.
- Klick auf eine Zeile öffnet eine Detailansicht mit **allen** Angaben des Antrags, gruppiert nach Wizard-Bereichen (Kredit, Person, Haushalt, Einkommen, Ausgaben, Beschäftigung, bestehende Kredite, Versicherung, Bankverbindung).
- Die Kennzahl "Offene Anfragen" zeigt die echte Anzahl.

## Technische Hinweise

- Neue Route `src/routes/angebote.tsx` (öffentlich, `noindex`), nutzt den Wizard-Zustand; fehlen Angaben, greifen sinnvolle Standardwerte.
- Der Wizard-Zustand liegt im Provider unter `/antrag`; für die Angebote-Seite werden Betrag/Laufzeit/Versicherung über Suchparameter bzw. `sessionStorage` (`smava-wizard`) übernommen und Änderungen dorthin zurückgeschrieben.
- Migration: zusätzliche Spalten inkl. `jsonb`-Sammelfeld auf `public.loan_applications`, bestehende Policies bleiben unverändert (Anlegen für alle, Lesen für Eigentümer und Admins).
- Neue Server-Funktion `listLoanApplications` in `src/lib/auth.functions.ts` (oder eigener Datei) mit Admin-Prüfung analog `listAllUsers`.
- Bankdaten (IBAN/Kontonummer) werden mit gespeichert; im Adminpanel nur maskiert angezeigt.
