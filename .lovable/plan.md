# Bestellbestätigung per SMS ergänzen

## Warum keine SMS ankam

Bei einer neuen Bestellung wird aktuell ausschließlich die Bestätigungs-E-Mail verschickt. Der automatische Ablauf für eingehende Bestellungen enthält keinen SMS-Versand — die Bestellbestätigungs-SMS existiert bisher nur als Vorschautext in den Einstellungen. Versendet wird SMS bislang nur beim Erzeugen einer Rechnung.

## Was ich ändere

Beim Eingang einer Bestellung geht zusätzlich zur E-Mail automatisch die Bestellbestätigungs-SMS an die Telefonnummer der Bestellung — über den Seven.io-Zugang und Absendernamen des Brandings der Bestellung.

- Fehlt die Telefonnummer oder der Seven.io-Zugang des Brandings, wird nur die E-Mail verschickt; das wird protokolliert, die Bestellung bleibt unberührt.
- Ein Fehler beim SMS-Versand verhindert nie die E-Mail und nie die Bestellung.

## Technische Details

- `src/routes/api/public/order-confirmation.ts`: nach dem E-Mail-Versand zusätzlich `sendSevenSms` (`@/lib/notify/seven.server`) mit `renderOrderConfirmationSms(smsBrandingFrom(brandingRaw), smsDataFrom(order))`, `apiKey` aus `branding.seven_api_key`, `from` aus `seven_sender_name`, `to` aus `order.phone`.
- E-Mail- und SMS-Versand jeweils in eigenem `try/catch`; Antwort um `{ emailSent, smsSent }` erweitert, damit im Test sichtbar ist, was lief.
- Anschließend Test mit einer echten Testbestellung und Prüfung der Antwort.
