# Supabase Edge Function `create-order` fertigstellen

## Ziel

Eine echte, getestete Supabase Edge Function unter:

```text
https://fdlhjoxmxryquecocwjv.supabase.co/functions/v1/create-order
```

## Vorgehen

1. Im verbundenen Supabase-Projekt einmalig die Funktionshülle `create-order` anlegen. Dieser Schritt ist nötig, weil der aktuelle TanStack-Projekteditor nur bereits vorhandene Supabase Edge Functions bearbeiten darf.
2. Danach die vollständige Bestelllogik in diese bestehende Funktion einsetzen und deployen:
   - CORS für den externen Shop
   - vollständige Prüfung der Bestelldaten
   - Branding über `public_id` oder interne ID auflösen
   - Bestellung in `public.orders` speichern
   - eindeutige Bestellnummer über `generate_order_number()` erzeugen
   - Telegram-Empfänger nach Branding auswählen und benachrichtigen
   - Telegram-Fehler dürfen die Bestellung nicht verhindern
3. `verify_jwt = false` für den öffentlichen Shop-Aufruf konfigurieren.
4. Den Supabase-Endpunkt mit einer echten Testbestellung prüfen und kontrollieren, dass Bestellung und Branding-Zuordnung im Adminbereich erscheinen.
5. Anschließend den endgültigen Link, das genaue JSON-Format und die Antwortstruktur für das externe Projekt liefern.

## Einmaliger Schritt in Supabase

Im Supabase-Dashboard unter **Edge Functions** eine Funktion mit exakt diesem Namen erstellen:

```text
create-order
```

Der Inhalt der Hülle ist egal; er wird anschließend vollständig ersetzt. Es werden keine Zugangsdaten benötigt und keine Datenbankänderungen vorgenommen.
