# Plan: Kontaktformular erweitern — Anliegen-Auswahl + mehr Pflichtfelder

## Ziel
Das Kontaktformular auf `/kontakt` soll zuerst eine Kategorie („Anliegen") abfragen. Erst nach der Auswahl werden die restlichen Eingabefelder eingeblendet. Zusätzlich kommen die Felder Anrede, PLZ und Stadt hinzu.

## Geplante Umsetzung

### 1. Neues Feld „Anliegen" als erste Frage
- Oberhalb des restlichen Formulars ein Pflicht-Dropdown (`Select` aus shadcn/ui) einbauen.
- Platzhalter-Option: „Bitte wählen Sie Ihr Anliegen".
- Vorausgewählte Optionen (kannst du anpassen):
  - Allgemeine Anfrage
  - Frage zur Bestellung
  - Frage zur Lieferung
  - Frage zur Zahlung
  - Reklamation / Beschwerde
  - Preis- und Angebotsanfrage
  - Technische Beratung
  - Sonstiges

### 2. Formularfelder erst nach Auswahl einblenden
- State `selectedTopic` (string) speichert das gewählte Anliegen.
- Solange kein Anliegen gewählt ist, bleiben die weiteren Felder ausgeblendet (`hidden` oder bedingtes Rendering).
- Sobald ein Anliegen gewählt ist, erscheinen die Felder mit einer sanften Animation oder einfach direkt.

### 3. Erweiterte Felder
Reihenfolge und Aufteilung:
- **Anliegen** (Select, volle Breite, Pflicht)
- **Anrede** (Select mit Herr / Frau / Divers, halbe Breite)
- **Name** (Input, halbe Breite)
- **E-Mail** (Input, halbe Breite)
- **Telefon** (Input, halbe Breite)
- **PLZ** (Input, halbe Breite)
- **Stadt** (Input, halbe Breite)
- **Ihre Nachricht** (Textarea, volle Breite)
- **Datenschutz-Checkbox** (volle Breite)
- **Absenden-Button**

### 4. Validierung
- Client-seitige HTML5-Validierung (`required`) auf allen Pflichtfeldern.
- Maximale Längen für Input-Felder (z. B. Name 100 Zeichen, E-Mail 255 Zeichen, Nachricht 1000 Zeichen, PLZ 10 Zeichen, Stadt 100 Zeichen).
- E-Mail-Feld behält `type="email"`.
- Keine Server-Funktion, kein Versand — reines Mockup bleibt erhalten.

### 5. Layout-Anpassungen
- Formular bleibt in der grün getoppten Card.
- Zweispaltiges Grid auf Desktop, einspaltig auf Mobile.
- Select-Trigger-Styling an die bestehenden Inputs anpassen (`rounded-md`, `h-9`, passende Border).

## Akzeptanzkriterien
- `/kontakt` zeigt zuerst nur das „Anliegen"-Dropdown.
- Nach Auswahl erscheinen Anrede, Name, E-Mail, Telefon, PLZ, Stadt, Nachricht.
- Absenden ist nur möglich, wenn alle Pflichtfelder ausgefüllt sind.
- Build läuft fehlerfrei.

## Offene Frage an dich
Die Optionen für das Anliegen-Dropdown sind oben als Vorschlag aufgeführt. Soll ich genau diese nehmen oder hast du andere/speziellere Optionen (aus deinem Screenshot)?
