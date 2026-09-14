# Schritt 13: Aktuelle Wohnanschrift 1:1 wie Referenz

## Ziel
Die Seite `/antrag/schritt-13` soll exakt dem Screenshot entsprechen: 69-%-Fortschrittsbalken, Überschrift „Aktuelle Wohnanschrift" und die Felder in der Referenz-Reihenfolge — ohne „Warum benötigen wir diese Information?".

## Änderungen an `src/routes/antrag/schritt-13.tsx`

1. **Überschrift:** „Aktuelle Wohnanschrift" (statt „Ihre aktuelle Adresse").
2. **Feldreihenfolge und Layout:**
   - **PLZ** — volle Breite, Platzhalter „z.B. 11011" (statt 2-Spalten-Grid mit Wohnort).
   - **Wohnort** — volle Breite, Platzhalter „z.B. Musterstadt".
   - **Straße + Hausnummer** — zwei Spalten nebeneinander (Straße ca. 3/4, Hausnummer ca. 1/4), Platzhalter „z.B. Musterstraße" / „z.B. 73".
   - **Land** — Select, Standard „Deutschland" (bleibt).
   - **Dort wohnhaft seit (Jahr)** — statt Select ein einfaches Textfeld mit Platzhalter „JJJJ" (max. 4 Ziffern, nur Zahlen), wie im Screenshot.
3. **Focus-Hinweis bei Straße:** Beim Anklicken des Straße-Felds erscheint oberhalb in klein: „Bitte achten Sie darauf, dass Ihre Angabe mit Ihrem Personalausweis oder Reisepass übereinstimmt." — wie bei Schritt 11 (vorhandene `focusHint`-Funktion von `TextField`).
4. **WhyInfo entfernen** — die Info-Box unter den Feldern wird komplett gestrichen.
5. **Labels:** „PLZ" statt „Postleitzahl", „Hausnummer" statt „Hausnr.", „Dort wohnhaft seit (Jahr)" statt „Wohnhaft seit (Jahr)".

Keine Store-Änderungen nötig — alle Felder (zip, city, street, houseNumber, country, residentSince) existieren bereits; `residentSince` wird vom Select-String zum Textfeld-Wert, Typ bleibt String.

## Verifikation
Typecheck/Build, danach kurzer Browser-Check von `/antrag/schritt-13` gegen den Screenshot (Layout, Platzhalter, Focus-Hinweis).
