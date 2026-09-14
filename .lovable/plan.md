# SMS-Vorlagen im Adminbereich

Neuer Reiter **SMS** unter `/admin/sms`, analog zur E-Mail-Vorschau: links Vorlage und Branding wählen, rechts die fertige SMS als Handy-Vorschau.

## Vorlagen

**1. Bestellbestätigung**

> Ihre Bestellung 2609-74568 bei Heizöl Online ist eingegangen. 2.000 Liter Heizöl Standard, 2.561,40 EUR. Liefertermin: Di 22.09.2026, 8-12 Uhr. Fragen? info@heizoel-online.com

**2. Rechnung**

> Rechnung RE-2609-74568 zu Bestellung 2609-74568 bei Heizöl Online: 2.561,40 EUR. Bitte überweisen an Muster-Energie GmbH, IBAN DE89 3704 0044 0532 0130 00, Verwendungszweck 2609-74568.

Beide Texte werden aus den Branding-Daten befüllt (Shopname, Kontakt-E-Mail, Bankverbindung) und nutzen dieselben Beispiel-Bestelldaten wie die E-Mail-Vorschau, damit beides zusammenpasst.

## Seite

- Auswahl der Vorlage (zwei Einträge, Hinweistext wie bei E-Mails)
- Auswahl des Brandings inkl. Beispieldaten-Eintrag
- Vorschau als Handy-Sprechblase mit Absendername (Seven.io-Absendername aus dem Branding, sonst Shopname)
- Zeichenzähler mit Anzahl SMS-Teile (160 Zeichen bzw. 70 bei Sonderzeichen), Warnung ab 2 Teilen
- Button "Text kopieren"
- Navigation: neuer Punkt "SMS" zwischen E-Mails und Ende

## Technisches

- `src/lib/sms-templates/index.ts`: `SmsBranding`-Typ, `renderOrderConfirmationSms()`, `renderOrderInvoiceSms()`, Demo-Daten und Helfer für Segmentberechnung (GSM-7 vs. UCS-2)
- `src/routes/_authenticated/admin_/sms.tsx` (Dateiname `admin_.sms.tsx`) mit `AdminPageShell active="sms"`, `listBrandings`, `head()` mit noindex
- `admin-nav.tsx`, `admin-page-shell.tsx`, `app-shell.tsx`: Union um `"sms"` bzw. `/admin/sms` erweitern
- Branding-Feld `seven_sender_name` wird für den Absender genutzt; keine Datenbankänderung, kein SMS-Versand
