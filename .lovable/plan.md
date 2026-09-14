# Telegram-Benachrichtigungen bei neuen Bestellungen

Neuer Reiter **Telegram** im Adminbereich (`/admin/telegram`), in dem du Chat-IDs pflegst. Sobald eine Bestellung über die Bestell-Schnittstelle eingeht, geht automatisch eine Nachricht an alle aktiven Chats.

## Reiter /admin/telegram

Liste aller hinterlegten Empfänger mit Formular zum Anlegen und Bearbeiten:

- **Bezeichnung** (z. B. "Team Disposition") – Pflicht
- **Chat-ID** – Pflicht, eindeutig
- **Branding** – optional; leer = Benachrichtigung für alle Brandings, sonst nur für dieses eine
- **Aktiv** – Schalter zum Stummschalten ohne Löschen

Aktionen: anlegen, bearbeiten, löschen, aktiv/inaktiv schalten. Zusätzlich ein Button **Testnachricht senden**, der eine Beispielmeldung an den jeweiligen Chat schickt, damit du die ID direkt prüfen kannst. Zugriff nur für Admins.

## Inhalt der Benachrichtigung

Beim Eingang einer Bestellung:

```text
🛢️ Neue Bestellung 2609-74568
Branding: Heizöl Online
Kunde: Max Mustermann
E-Mail: max@example.com
Telefon: 017035829853
Menge: 2.000 Liter
Heizöl: Standard
Preis: 2.561,40 € (128,07 € / 100 L)
Lieferort: 12345 Musterstadt
```

Der Versand läuft im Hintergrund: Schlägt Telegram fehl, wird die Bestellung trotzdem gespeichert und die Bestellnummer normal an den Shop zurückgegeben. Fehler landen nur im Server-Log.

## Voraussetzung

Für den Versand wird eine Telegram-Verbindung benötigt. Ich öffne dafür beim Umsetzen die Verbindungs-Karte im Chat – dort wählst du deinen Bot aus bzw. legst ihn an. Ohne Verbindung bleibt der Reiter nutzbar, es werden aber keine Nachrichten verschickt.

Damit ein Chat Nachrichten empfangen kann, muss der Bot vorher im jeweiligen Chat bzw. der Gruppe gestartet/hinzugefügt worden sein.

## Technische Umsetzung

- Migration: Tabelle `public.telegram_recipients` (`label`, `chat_id` unique, `branding_id` nullable → `brandings`, `is_active`, `created_by`/`updated_by`, Zeitstempel + Update-Trigger), GRANTs für `authenticated`/`service_role`, RLS admin-only über `has_role`.
- `src/lib/telegram.functions.ts`: `listTelegramRecipients`, `saveTelegramRecipient`, `deleteTelegramRecipient`, `sendTelegramTest` – jeweils `requireSupabaseAuth` + Admin-Check (Muster analog `bank-accounts.functions.ts`).
- `src/lib/telegram/notify.server.ts`: `sendOrderNotification()` – lädt aktive Empfänger (passendes Branding oder ohne Branding) per `supabaseAdmin` und postet `sendMessage` über den Connector-Gateway (`LOVABLE_API_KEY` + `TELEGRAM_API_KEY`, beide serverseitig). Fehler werden geloggt, nie geworfen.
- `src/routes/api/public/orders.ts`: nach erfolgreichem Insert Branding-Name + Bestelldaten laden und `sendOrderNotification()` in `try/catch` aufrufen, bevor die Antwort zurückgeht.
- `src/routes/_authenticated/admin_.telegram.tsx` mit `AdminPageShell active="telegram"`, `noindex`-Head; `admin-nav.tsx`, `admin-page-shell.tsx`, `app-shell.tsx` um `"telegram"` / `/admin/telegram` erweitern.
