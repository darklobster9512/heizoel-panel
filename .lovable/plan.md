# Bestell-Details als Popup in /admin/bestellungen

## Ziel

Klick auf eine Bestellung in der Liste öffnet ein Popup (Dialog) mit allen übertragenen Bestelldaten — statt der bisherigen separaten Detailseite. Bearbeiten von Status und interner Notiz bleibt, ebenfalls im Popup.

## Inhalt des Popups

Kopf: Bestellnummer, Datum, Branding, Status-Badge.

- **Produkt & Preis:** Heizölart, Liefermenge, Lieferstellen, Schlauchlänge, Tankwagen, Preis/100 L, Gesamtpreis, Zahlungsart
- **Liefertermin & Kontakt:** frühestes Datum, gewählter Termin (Datum + Vormittag/Nachmittag/telefonisch), E-Mail, Telefon, Hinweise
- **Lieferadresse** und **Rechnungsadresse** (Hinweis „Entspricht der Lieferadresse", wenn keine abweichende)
- **Status bearbeiten:** Auswahl + interne Notiz + Speichern-Button (mit Erfolgs-/Fehlermeldung), wie bisher

## Verhalten

- Desktop: Klick auf die Tabellenzeile öffnet das Popup. Mobil: Klick auf die Karte.
- Popup ist scrollbar, schließt per X-Button, Klick daneben oder Escape.
- Nach dem Speichern aktualisiert sich die Liste im Hintergrund.
- Die bisherige Detail-Route `/admin/bestellungen/$orderId` entfällt; bestehende Links darauf werden nicht mehr verwendet.

## Technische Details

- `src/routes/_authenticated/admin_.bestellungen.tsx`: Zeilen/Karten werden zu Buttons; State `selectedId`; shadcn `Dialog` rendert den Detail-Inhalt (aus der bestehenden Detailseite übernommen: Karten, Zeilen, Adressblock, Status-Select, Notiz-Textarea, `updateOrder`-Mutation). `getOrder` wird per Query mit `enabled: !!selectedId` geladen.
- `src/routes/_authenticated/admin_.bestellungen_.$orderId.tsx` wird gelöscht; Exporte (`formatEuro`, `formatDate`, `customerName`, `slotLabel`, `STATUS_STYLE`) bleiben in der Listen-Datei.
- Prüfen, ob andere Stellen auf `/admin/bestellungen/$orderId` verlinken (z. B. Einstellungen/Rechnung) und ggf. anpassen.
- Keine Datenbankänderung, keine Änderung an Serverfunktionen.
