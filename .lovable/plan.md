# Telegram-Bot-Token als Secret

## Ziel
Statt der abgelehnten Telegram-Verbindung wird der Bot-Token direkt als Secret gespeichert. Der Versand von Bestell-Benachrichtigungen und Testnachrichten läuft dann direkt über die Telegram Bot API.

## Ablauf

1. **Secret anfordern**
   - Du bekommst ein sicheres Eingabeformular für `TELEGRAM_BOT_TOKEN`.
   - Den Token erhältst du von @BotFather in Telegram (Bot erstellen oder bestehenden Bot auswählen → API Token).
   - Wichtig: Der Bot muss im Ziel-Chat bzw. der Ziel-Gruppe gestartet bzw. hinzugefügt worden sein, sonst kann er nichts senden.

2. **Versand anpassen**
   - `src/lib/telegram/notify.server.ts`: Der Versand ruft `https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/sendMessage` direkt auf (statt Connector-Gateway mit `LOVABLE_API_KEY`/`TELEGRAM_API_KEY`).
   - Fehlender Token → geloggter Hinweis „TELEGRAM_BOT_TOKEN ist nicht gesetzt", kein Fehler nach außen.
   - `src/lib/telegram.functions.ts`: `sendTelegramTest` nutzt denselben direkten Versand; ohne Token kommt eine verständliche Fehlermeldung im Admin-Bereich.

3. **Prüfung**
   - Typecheck und Build.
   - Testnachricht über /admin/telegram, sobald der Token hinterlegt ist.

## Technik (Details)
- `process.env.TELEGRAM_BOT_TOKEN` wird serverseitig im Handler gelesen.
- Nachrichtenformat (HTML, de-DE-Formatierung, Template) bleibt unverändert.
- Kein Secret im Frontend; der Token verlässt den Server nicht.
