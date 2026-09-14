# Kontaktseite: Anliegen-Dropdown mit Gruppen

## Ziel
Das „Anliegen"-Dropdown im Kontaktformular auf `/kontakt` soll in optisch getrennte, nicht anklickbare Gruppen mit fettem Titel unterteilt werden. Die bisherige Einzelliste wird ersetzt.

## Gewünschte Gruppenstruktur

```text
Fragen zum Heizölpreis
  Ich möchte den aktuellen Heizölpreis erfahren
  Bitte machen Sie mir ein Heizöl-Preisangebot

Fragen zur Bestellung
  Ich möchte Heizöl bestellen
  Ich habe Fragen zur Lieferzeit
  Ich habe Fragen zum Lieferanten

Ich habe bereits Heizöl bestellt
  Ich möchte einen Liefertermin vereinbaren

Sonstiges
  Mein Anliegen ist hier nicht ausgeführt
```

## Umsetzung

1. **Datenstruktur anpassen**
   - `TOPICS` als Array von Gruppen definieren, jede Gruppe hat `title` und `options` mit `value` und `label`.

2. **Dropdown-Rendering umbauen**
   - Statt flacher `<SelectItem>`-Liste: `<SelectGroup>` pro Gruppe mit `<SelectLabel>` für den Titel.
   - `<SelectLabel>` bekommt fette Schrift (`font-bold`) und ist nativ nicht auswählbar.
   - Einzelne Optionen bleiben normale `<SelectItem>`.

3. **Verhalten beibehalten**
   - Auswahl eines Options-Wertes öffnet weiterhin den Rest des Formulars.
   - `required`-Validierung bleibt erhalten.
   - Placeholder-Text bleibt: „Bitte wählen Sie Ihr Anliegen".

4. **Design-Regeln beachten**
   - Keine hartkodierten Farben, nur bestehende Tokens (`text-ink`, `border-line`, etc.).
   - Gruppen optisch voneinander trennen, z. B. durch Abstand oder feine Trennlinie zwischen Gruppen.

## Datei
- `src/routes/kontakt.tsx`

## Nicht im Scope
- Keine Änderung an anderen Seiten, Header oder Footer.
- Keine Backend-Anbindung (Formular bleibt Demo).
