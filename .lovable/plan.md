# SMS-Vorlagen im Adminbereich

Neuer Reiter **SMS** unter `/admin/sms`, analog zur E-Mail-Vorschau: links Vorlage und Branding wählen, rechts die fertige SMS als Handy-Vorschau.

## Vorlagen (bewusst kurz, ohne viele Details)

**1. Bestellbestätigung**

> Ihre Bestellung 2609-74568 bei Heizöl Online ist eingegangen. Vielen Dank! Fragen? info@heizoel-online.com

**2. Rechnung**

> Ihre Rechnung zur Bestellung 2609-74568 wurde soeben per E-Mail versendet. Vielen Dank für Ihren Einkauf bei Heizöl Online!

Keine Bankdaten in der SMS — die Rechnungs-SMS verweist auf die E-Mail mit den Überweisungsdaten. Beide Texte nutzen Shopname und Kontakt-E-Mail des gewählten Brandings.

## Seite

- Auswahl der Vorlage (zwei Einträge mit Hinweistext, wie bei E-Mails)
- Auswahl des Brandings inkl. Beispieldaten-Eintrag
- Vorschau als Handy-Sprechblase; Absender = Seven.io-Absendername aus dem Branding, sonst Shopname
- Zeichenzähler mit Anzahl SMS-Teile (160 Zeichen bzw. 70 bei Sonderzeichen)
- Button "Text kopieren"
- Navigation: neuer Punkt "SMS"

## Technisches

- `src/lib/sms-templates/index.ts`: `SmsBranding`-Typ, `renderOrderConfirmationSms()`, `renderOrderInvoiceSms()`, Demo-Daten und Segmentberechnung (GSM-7 vs. UCS-2)
- `src/routes/_authenticated/admin_.sms.tsx` mit `AdminPageShell active="sms"`, `listBrandings`, `head()` mit noindex
- `admin-nav.tsx`, `admin-page-shell.tsx`, `app-shell.tsx`: Union um `"sms"` bzw. `/admin/sms` erweitern
- Keine Datenbankänderung, kein SMS-Versand
