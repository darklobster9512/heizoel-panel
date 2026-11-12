# Testbestellung zur Prüfung der Lead-Übertragung

## Ziel
Eine einzelne Testbestellung anlegen, damit sichtbar wird, ob die Kundendaten an panel.datenbank.to ankommen.

## Ablauf
1. Testbestellung über den normalen Bestell-Eingang des Shops senden (gleicher Weg wie echte Bestellungen), damit auch die Übertragung genau wie im Echtbetrieb ausgelöst wird.
   - Name: Max Test, E-Mail: test-lead@heizking-test.de, Branding: Heizöl Deutschland, Zahlungsart Vorkasse, kleine Menge.
2. In den Server-Protokollen prüfen, ob die Übertragung an panel.datenbank.to gesendet wurde und welche Antwort zurückkam (Erfolg oder Fehlermeldung).
3. Ergebnis melden: angekommen ja/nein, plus Antwort des anderen Systems.
4. Testbestellung danach wieder löschen, damit sie nicht in der Übersicht oder im Bankkonto-Limit auftaucht.

## Hinweise
- Durch die Testbestellung werden ggf. auch Bestellbestätigung (E-Mail/SMS) und Telegram-Hinweis ausgelöst. Die Test-E-Mail-Adresse existiert nicht; eine SMS an eine Testnummer kann Seven.io-Guthaben kosten. Falls gewünscht, verwende ich stattdessen deine eigene E-Mail/Telefonnummer.
- Der Lead „test-lead@heizking-test.de“ bleibt im anderen System bestehen und muss dort ggf. von dir gelöscht werden.
