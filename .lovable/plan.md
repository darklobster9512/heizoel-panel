# Zustellung an web.de und GMX reparieren

## Was wirklich passiert

Die Ablehnung kommt nicht aus dem Panel und nicht aus dem Rechnungs- oder Bestellcode. web.de und GMX (derselbe Betreiber) blockieren die Versand-IP 54.240.3.14. Das ist eine geteilte Amazon-Versand-IP, die Resend für alle Kunden ohne eigene IP benutzt. Deshalb hat der Wechsel auf einen neuen Resend-Account nichts geändert: Der Account ist neu, die IP ist dieselbe.

Zusätzlich fehlt bei der Absenderdomain ein Eintrag, den web.de und GMX praktisch voraussetzen.

## Befund zur Domain heizoel-deutschland.com

Geprüft über öffentliche DNS-Abfragen:

- DKIM für Resend: vorhanden und korrekt
- Versand-Unterdomain für Resend: vorhanden
- Haupt-SPF: zeigt nur auf den Postfach-Anbieter, nicht auf Resend
- DMARC: **fehlt komplett** — kein `_dmarc`-Eintrag vorhanden

Fehlendes DMARC ist bei web.de und GMX ein starker Negativfaktor und macht eine Freischaltung aussichtslos, solange es fehlt.

## Schritt 1 — DNS ergänzen (bei Cloudflare, dauert 5 Minuten)

Zwei neue Einträge für heizoel-deutschland.com:

```text
Typ: TXT   Name: _dmarc
Wert: v=DMARC1; p=none; rua=mailto:dmarc@heizoel-deutschland.com; adkim=r; aspf=r
```

```text
Typ: TXT   Name: @  (bestehenden SPF-Eintrag ersetzen)
Wert: v=spf1 include:spf.cloudeu.oxcs.net include:amazonses.com ~all
```

Wichtig: nur **ein** SPF-Eintrag auf der Domain, den alten nicht zusätzlich stehen lassen.

Danach 24 Stunden warten und erneut testen — allein das löst in vielen Fällen die Blockade bei web.de/GMX auf, weil die Prüfung dort domänenbasiert nachgelagert erfolgt.

## Schritt 2 — Freischaltung beantragen

Bleibt die Meldung, Antrag über das Formular in der Fehlermeldung stellen (postmaster.web.de, Fall `r1102`). Da es eine geteilte IP von Resend ist, muss parallel der Resend-Support informiert werden — nur der IP-Betreiber kann eine IP-Reputation bereinigen. Text dafür liefere ich fertig mit.

## Ist unsere Domain jetzt dauerhaft „verbrannt"?

Nein. Die Meldung `r1102` mit dem Zusatz `v=54.240.3.14` bezieht sich ausdrücklich auf die **IP-Adresse**, nicht auf heizoel-deutschland.com. Die Mails wurden abgelehnt, bevor der Inhalt oder die Domain bewertet wurde.

Trotzdem gilt: Mit einer eigenen IP, aber weiterhin ohne DMARC, ist eine erneute Blockade wahrscheinlich — web.de und GMX bewerten dann die Domain, und die ist ohne DMARC schlecht eingestuft. Deshalb ist Schritt 1 in jedem Fall zuerst zu machen, unabhängig davon, ob wir später eine eigene IP holen.

## Schritt 3 — Dauerhafte Lösung wählen

Wenn Schritt 1 und 2 nicht innerhalb weniger Tage greifen, gibt es zwei belastbare Wege:

- **Eigene Versand-IP bei Resend** (kostenpflichtiger Tarif). Die IP gehört dann nur uns, Reputation wird sauber aufgebaut. Braucht 2–3 Wochen Einlaufzeit mit steigendem Volumen.
- **Zweiter Versanddienst für deutsche Freemail-Adressen.** Ein EU-Anbieter mit guter web.de/GMX-Reputation übernimmt nur Empfänger auf web.de, gmx.de, gmx.net und t-online.de, alles andere bleibt bei Resend.

## Technische Umsetzung im Panel

Für Schritt 1 und 2 sind keine Codeänderungen nötig — reine DNS- und Anbieterarbeit.

Für Schritt 3, Variante „zweiter Versanddienst", wäre der Eingriff klein und auf eine Stelle begrenzt: in `src/lib/notify/resend.server.ts` eine Weiche nach Empfänger-Domain, die dieselbe Nutzlast (Betreff, HTML, PDF-Anhang) an den zweiten Anbieter schickt; Zugangsdaten als Projekt-Secret. `invoices.functions.ts` und `api/public/order-confirmation.ts` bleiben unverändert.

Keine Änderungen an Oberfläche, Datenbank oder Rechnungslogik.
