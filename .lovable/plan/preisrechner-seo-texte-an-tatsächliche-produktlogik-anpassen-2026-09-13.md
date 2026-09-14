# `/preisrechner`: SEO-Texte an tatsächliche Produktlogik anpassen

## Ziel
Die SEO-Textblöcke unterhalb der Vorteils-Sektion auf `/preisrechner` enthalten zwei falsche Angaben: Es werden 4 Schritte beschrieben, obwohl der Prozess nur 3 Schritte hat, und als Mindestbestellmenge werden 500 Liter genannt, obwohl sie 1.500 Liter beträgt. Diese Texte werden korrigiert.

## Änderungen

### 1. `src/routes/preisrechner.tsx` — SEO-Textblöcke korrigieren

#### Abschnitt „Heizölpreis pro Liter — was kostet 1 Liter Heizöl?"
- Satz „In der Praxis wird Heizöl ausschließlich in Mengen ab 500 Litern verkauft" wird auf die tatsächliche Mindestbestellmenge von **1.500 Litern** angepasst.
- Der Rest des Abschnitts bleibt inhaltlich unverändert.

#### Abschnitt „Heizöl kaufen — direkt vom Händler ab 128,78 €/100L"
- Satz „Der gesamte Bestellprozess dauert weniger als 2 Minuten: PLZ und Liefermenge eingeben, Standard- oder Premium-Heizöl wählen, Zahlungsart bestimmen — fertig." wird beibehalten, da er bereits 3 Schritte beschreibt.
- Keine weiteren Änderungen.

#### Abschnitt „Heizöl bestellen — in 4 Schritten zum besten Preis"
- Überschrift wird zu „Heizöl bestellen — in 3 Schritten zum besten Preis".
- Der bisherige 4-Schritte-Ablauf wird auf den tatsächlichen 3-Schritte-Ablauf reduziert:
  1. PLZ und Liefermenge eingeben — sofort Heizölpreise für die Region in €/100L sehen.
  2. Zwischen Heizöl Standard (DIN 51603-1, günstigster Preis ab 128,78 €/100L) und Heizöl Premium wählen.
  3. Zahlungsart bestimmen und Wunsch-Liefertermin in den nächsten 7 Werktagen festlegen.
- Der Hinweis auf Vorkasse, Rechnung, EC-Karte oder Bar bei Lieferung sowie die Heizölpreis-Garantie bleiben erhalten.

### 2. Keine weiteren Änderungen
- Keine Änderungen an Überschrift „Heizölpreise heute & Heizöl online bestellen".
- Keine Änderungen an den anderen beiden SEO-Abschnitten außer der Mindestbestellmenge.
- Keine Änderungen an `/antrag/*`, `/angebote`, `/dashboard`, `/admin` oder der Startseite.
- Keine Backend-/Antragsstrecken-Änderungen.

## Verifikation
- Build prüfen (`/tmp/observability/build-errors.log`).
- Screenshots Desktop/Mobil der `/preisrechner`-Seite, um zu prüfen, dass die korrigierten Texte angezeigt werden.
