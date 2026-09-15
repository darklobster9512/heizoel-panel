# Status-Workflow für Bestellungen anpassen

## Ziel
Die Status-Spalte in `/admin/bestellungen` soll ein Dropdown mit genau diesen sieben Werten bekommen:

- Neu
- Mailbox
- Möchte Rechnung
- Rechnung versendet
- Überwiesen
- Angekommen
- Exchanged

## Technische Umsetzung

### 1. Datenbank: `order_status`-Enum austauschen
- Neuer Enum-Typ mit den Werten: `neu`, `mailbox`, `moechte_rechnung`, `rechnung_versendet`, `ueberwiesen`, `angekommen`, `exchanged`
- Bestehende Bestellungen werden vor dem Typwechsel umgemappt:
  - `neu` → `neu`
  - `in_bearbeitung` → `mailbox`
  - `bestaetigt` → `moechte_rechnung`
  - `geliefert` → `angekommen`
  - `storniert` → `exchanged`
- `public.orders.status`-Spalte auf den neuen Enum umstellen, Default bleibt `neu`
- Supabase-Typen (`src/integrations/supabase/types.ts`) werden automatisch neu generiert

### 2. Frontend: Konstanten und Labels
In `src/lib/orders.functions.ts`:
- `ORDER_STATUSES` und `ORDER_STATUS_LABEL` auf die sieben neuen Werte umstellen
- `OrderStatus`-Type leitet sich weiterhin aus dem Array ab

### 3. Admin-Oberfläche
In `src/routes/_authenticated/admin_.bestellungen.tsx`:
- `STATUS_STYLE` für die neuen sieben Status erweitern
- Dropdown im Filter und im Bestell-Popup nutzt automatisch die neuen Labels

### 4. Abhängigkeiten prüfen
- E-Mail-Templates und Rechnung verwenden den Status nicht für Inhalte, daher keine Anpassung nötig
- Edge-Function `create-order.ts` speichert nur den Default `neu`, bleibt gültig
- Öffentliche API `/api/public/orders` berührt Status-Werte nicht

### 5. Qualitätssicherung
- `bunx tsgo --noEmit` ausführen
- Build prüfen
- In `/admin/bestellungen` verifizieren, dass das Status-Dropdown alle sieben Werte zeigt und sich speichern lässt
