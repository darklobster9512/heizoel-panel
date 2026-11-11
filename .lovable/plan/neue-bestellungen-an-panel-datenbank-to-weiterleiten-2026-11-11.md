# Neue Bestellungen an panel.datenbank.to weiterleiten

## Was passiert
Sobald eine Bestellung erfolgreich gespeichert wurde, sendet das Panel automatisch die Kundendaten an
`POST https://panel.datenbank.to/api/leads/webhook`:

```json
{
  "email": "<E-Mail der Bestellung>",
  "first_name": "<Vorname Lieferadresse>",
  "last_name": "<Nachname Lieferadresse>",
  "source": "heizoel-shop"
}
```

- Gilt für alle Brandings (Deutschland und Österreich).
- Fällt das andere System aus oder antwortet mit Fehler, wird die Bestellung trotzdem normal angenommen; der Fehler wird nur protokolliert.
- Telegram, Bestellbestätigung und SMS laufen unverändert weiter.

## Technische Details
- Neue Datei `src/lib/notify/lead-webhook.server.ts` mit `sendLeadWebhook({ email, firstName, lastName })`: `fetch` mit `Content-Type: application/json`, Timeout 5 s (AbortController), leere Namen als `""`.
- Aufruf in `src/routes/api/public/orders.ts` direkt nach erfolgreichem Insert, parallel zur Telegram-Benachrichtigung, in eigenem try/catch.
- `source` fest `"heizoel-shop"`; URL als Konstante. Kein Auth-Header, da keiner angegeben wurde — falls das Ziel einen Schlüssel braucht, wird er als Secret ergänzt.
- Prüfung: Typecheck, Build, eine Testbestellung und Kontrolle des Server-Logs.
