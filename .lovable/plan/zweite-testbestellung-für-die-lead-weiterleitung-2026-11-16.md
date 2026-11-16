# Zweite Testbestellung für die Lead-Weiterleitung

## Ergebnis des ersten Tests
Die Bestellung 1611-57446 wurde an shopmanagement.lol gesendet. Das System hat mit „Doppelung“ geantwortet (`accepted: 0, duplicate: true`). Es kennt igor.maier60@web.de also schon und hat deshalb keinen neuen Lead angelegt.

## Schritte
1. Vorher prüfen, welche Daten genau gesendet werden (E-Mail, Vorname, Nachname, source `heizoel-at`).
2. Neue Testbestellung mit igor.maier60@web.de anlegen (Heizöl Austria, Zahlungsart Rechnung).
3. Antwort von shopmanagement.lol auslesen und melden:
   - `accepted: 1` heißt: Lead angelegt.
   - `duplicate: true` heißt: Diese E-Mail muss zuerst in shopmanagement.lol gelöscht werden. Danach kann der Test wiederholt werden.
4. Keine zusätzliche manuelle Sendung. Die Testbestellungen bleiben im Panel, bis du sie löschen lassen willst.
