# Auszahlungsdauer der Banken anpassen

## Ziel

Die Auszahlungsdauer der 14 Banken wird nicht mehr einheitlich auf 5 Tage gesetzt, sondern variiert zwischen 2 und 3 Tagen. auxmoney erhält die Auszahlung „sofort“.

## Was entsteht

### 1. Datenbankwerte aktualisieren

- Per SQL-UPDATE werden die `payout_days` der 14 Banken neu verteilt:
  - 2 Tage für 7 Banken
  - 3 Tage für 6 Banken
  - `0` Tage für auxmoney, damit im Frontend „sofort“ angezeigt werden kann
- Die genaue Zuordnung wird beim Ausführen der Updates festgelegt, damit die Verteilung gleichmäßig ist.

### 2. Anzeige im Detailpanel anpassen

- In `src/routes/angebote.tsx` im Text "Auszahlung in {bank.payout_days} Tagen" wird eine Hilfsfunktion eingeführt.
- Ist `payout_days` gleich `0`, wird "sofort" angezeigt.
- Andernfalls bleibt die bisherige Mehrzahl-Form "X Tagen" erhalten.

## Technische Hinweise

- Da nur Daten in einer bestehenden Tabelle geändert werden, kommt `supabase--run_sql` zum Einsatz.
- Die Code-Anpassung beschränkt sich auf eine bedingte Textausgabe im bereits vorhandenen `OfferDetailsPanel`.
