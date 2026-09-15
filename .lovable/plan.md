# Logo beim Branding optional machen

Aktuell verlangt das Branding-Formular ein Logo, bevor ein Branding aktiviert werden kann — und auch die Datenbank blockiert aktive Brandings ohne Logo. Künftig ist das Logo überall freiwillig.

## Was sich ändert

- Im Formular „Branding hinzufügen/bearbeiten" verliert das Logo-Feld den Pflicht-Stern; die Beschriftung weist es als optional aus.
- Ein Branding lässt sich ohne Logo als Entwurf speichern und auch aktivieren.
- Die Fehlermeldung beim Aktivieren nennt nur noch die Pflichtfelder, nicht mehr das Logo.
- Alle anderen Pflichtangaben (Unternehmensname, Shopname, Adresse, Register, USt-IdNr., E-Mail, Domain) bleiben unverändert.
- E-Mails und Rechnungen zeigen ohne Logo weiterhin den bestehenden Text-Ersatz mit dem Shopnamen.

## Technisch

- `src/components/internal/branding-form.tsx`: `"logoPath"` aus der `REQUIRED`-Liste entfernen, Stern am Label „Logo" durch „(optional)" ersetzen, Aktivierungs-Fehlertext anpassen.
- Migration: `public.validate_branding()` neu anlegen ohne die `logo_path`-Prüfung im `status = 'active'`-Block; die 11-Zeichen-Regel für den Seven.io-Absender bleibt.
- `saveBranding` akzeptiert `logoPath` bereits als optional — keine Änderung nötig.
- Abschluss: Typecheck und Build prüfen.
