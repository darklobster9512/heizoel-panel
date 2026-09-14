Platzhaltertexte für alle Eingabefelder im Branding-Formular ergänzen.

## Was geändert wird
- In `src/components/internal/branding-form.tsx` bekommt jedes `<Field>` einen aussagekräftigen `placeholder`.
- Pflichtfelder zeigen ein typisches Beispiel; optionale Felder zeigen einen Hinweis auf den erwarteten Inhalt.
- Bestehende Platzhalter (USt-ID, Domain, Seven.io-Absendername) bleiben erhalten.

## Technische Details
- Betroffene Felder:
  - Unternehmensname → z. B. "Musterheizöl GmbH"
  - Shopname → z. B. "Heizöl-Shop Musterstadt"
  - Straße & Hausnummer → z. B. "Industriestraße 12"
  - PLZ → z. B. "12345"
  - Stadt → z. B. "Musterstadt"
  - Amtsgericht → z. B. "Musterstadt"
  - Handelsregisternummer → z. B. "HRB 12345"
  - Geschäftsführer → z. B. "Max Mustermann"
  - E-Mail → z. B. "info@muster-shop.de"
  - Resend Absender-E-Mail → z. B. "noreply@muster-shop.de"
  - Resend Absendername → z. B. "Musterheizöl"
- Keine Änderung an Validierung, Speicherlogik oder API.
- Nach der Änderung: Typecheck und Build-Log prüfen.
