# Bankverbindung aus Branding-Formular entfernen

## Ziel
Im Formular „Branding hinzufügen/bearbeiten" soll die Sektion Bankverbindung (Kontoinhaber, IBAN, Bankname, BIC) komplett verschwinden.

## Änderungen

### `src/components/internal/branding-form.tsx`
- Sektion „Bankverbindung" (mit den vier Feldern Kontoinhaber, IBAN, Bankname, BIC) entfernen.
- `accountHolder`, `iban`, `bankName`, `bic` aus `FormValues`-Initialwerten (`EMPTY`) und `initialValues()` entfernen.
- Ungenutzten `Landmark`-Icon-Import entfernen.

### `src/lib/brandings.functions.ts`
- Die vier Bank-Felder aus dem Eingabe-Schema von `saveBranding` entfernen.
- Beim Speichern (`upsert`) die Spalten `account_holder`, `iban`, `bank_name`, `bic` nicht mehr mitschicken — so bleiben bereits in der Datenbank hinterlegte Bankdaten beim Bearbeiten eines Brandings erhalten, statt überschrieben zu werden.
- Der `Branding`-Typ und das Auslesen der Bankdaten bleiben unverändert, damit Rechnungs-E-Mail-/PDF-Templates weiterhin funktionieren.

### Nicht geändert
- Datenbank-Spalten bleiben bestehen (keine Migration, keine Datenlöschung).
- Branding-Karten in der Übersicht, E-Mail-Vorschau und Rechnung bleiben unverändert.

## Technik
- Kein DB-Schema-Eingriff, nur Formular- und Speicherlogik.
- Abschluss: `bunx tsgo --noEmit` und Build-Log prüfen.
