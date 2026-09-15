# Bestellbestätigungs-SMS seriöser gestalten

## Ziel
Die Vorlage für die Bestellbestätigungs-SMS (`Bestellbestätigung` im SMS-Tab unter Einstellungen) soll professioneller klingen und darf keine E-Mail-Adresse enthalten.

## Aktueller Stand
- Vorlage liegt in `src/lib/sms-templates/index.ts` als `renderOrderConfirmationSms`.
- Aktueller Text: `Ihre Bestellung {orderNumber} bei {shopName} ist eingegangen. Vielen Dank!` plus optional `Fragen? {email}`.
- Die Vorlage wird im SMS-Panel unter `/admin/settings?tab=sms` als Vorschau angezeigt.
- Aktuell wird diese SMS **nicht automatisch versendet** — beim Eingang einer neuen Bestellung wird nur die Bestellbestätigungs-E-Mail verschickt. Versendet wird nur die Rechnungs-SMS (`renderOrderInvoiceSms`) nach Rechnungsgenerierung.

## Geplante Änderung
1. `renderOrderConfirmationSms` in `src/lib/sms-templates/index.ts` anpassen:
   - Kein E-Mail-Appendix mehr.
   - Seriösere Formulierung, z. B.:
     ```
     Vielen Dank für Ihre Bestellung {orderNumber} bei {shopName}. Wir haben diese erfolgreich erhalten und bearbeiten sie umgehend.
     ```
2. Vorschau-Daten (`DEMO_SMS`) und Fallback-Branding (`SMS_FALLBACK_BRANDING`) bleiben unverändert, da keine E-Mail mehr referenziert wird.
3. Typecheck und Build-Log prüfen.

## Offene Frage
Soll die Bestellbestätigungs-SMS auch automatisch beim Eingang einer neuen Bestellung per Seven.io versendet werden — oder reicht es, die Vorlage im SMS-Panel zu ändern?
