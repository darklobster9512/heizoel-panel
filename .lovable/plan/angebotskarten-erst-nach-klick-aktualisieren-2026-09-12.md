# Angebotskarten erst nach Klick aktualisieren

## Korrektur
- Die drei Felder oben bleiben frei änderbar und aktivieren bei einer Abweichung weiterhin den grünen Suchbutton.
- Während der Eingabe bleiben alle Bankkarten vollständig auf dem zuletzt bestätigten Stand: Kreditbetrag, Laufzeit, Versicherung, Monatsrate, passende Banken und Sortierung ändern sich nicht.
- Erst beim Klick auf den grünen Suchbutton werden die neuen Werte übernommen und die 10-sekündige Ladeansicht gestartet.
- Nach Abschluss der Ladeansicht zeigen Karten und Angebotsdetails durchgängig die neu bestätigten Werte.

## Technisch
- In den Bankkarten werden `searchAmount` und `searchTerm` statt der noch unbestätigten Formularwerte `amount` und `term` angezeigt.
- Berechnung, Filterung und Detailansicht verwenden bereits die bestätigten Suchwerte und bleiben darauf abgestimmt.
- Die Versicherung wirkt sich ebenfalls erst nach dem Suchklick auf Rate und Detailansicht aus.

## Prüfung
- Betrag ändern: Suchbutton wird grün, Kartenwerte und Raten bleiben unverändert.
- Laufzeit und Versicherung ändern: ebenfalls keine vorzeitige Kartenaktualisierung.
- Suchbutton klicken: Ladeansicht erscheint; danach sind alle neuen Werte, Raten und die Sortierung aktualisiert.
