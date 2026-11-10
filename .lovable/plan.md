# Liefergebiet-Texte je Land in den E-Mails

## Ziel
Bei Brandings mit Land Österreich steht in allen E-Mails „österreichweit“ statt „deutschlandweit“. Deutschland bleibt unverändert.

## Betroffene Texte
- Über-Block: „Günstige, zuverlässige Heizöl-Lieferung deutschlandweit.“ → „… österreichweit.“
- Fußzeile: „Tagesaktuelle Preise, deutschlandweite Lieferung.“ → „… österreichweite Lieferung.“
- Vertrauensbalken: „Deutschlandweit“ → „Österreichweit“

Gilt für Bestellbestätigung, Rechnungs-E-Mail und die Vorschau unter Einstellungen → E-Mail.

## Technische Details
- `src/lib/branding-country.ts`: Helfer `deliveryAreaFor(country)` → `{ adverb: "deutschlandweit"|"österreichweit", adjective: "deutschlandweite"|"österreichweite", label: "Deutschlandweit"|"Österreichweit" }`.
- `src/lib/email-templates/email-shared.ts`: `emailFooter` nutzt `branding.country`; `trustBar(country?)` erhält optional das Land, alle Aufrufer übergeben `branding.country`.
- Kurzer Test für den Helfer (AT → österreichweit, DE/leer → deutschlandweit), danach Typprüfung.
