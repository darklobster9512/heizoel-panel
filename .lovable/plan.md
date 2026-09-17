# Zustellung an web.de und GMX reparieren

## Was wirklich passiert

Die Ablehnung kommt nicht aus dem Panel und nicht aus dem Rechnungs- oder Bestellcode. web.de und GMX (derselbe Betreiber) blockieren die von Resend verwendeten Versand-IPs. Beim alten Account war es `54.240.3.14`, beim neuen Account ist es `54.240.3.25`. Beide gehören zum selben geteilten Amazon-Versandpool von Resend. Deshalb hat der Accountwechsel nichts geändert: Der neue Account bekam zwar eine andere IP, aber wieder eine bereits blockierte Gemeinschafts-IP.

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

Nein. Die beiden Meldungen `r1102` mit `v=54.240.3.14` und `v=54.240.3.25` beziehen sich ausdrücklich auf die **IP-Adressen**, nicht auf heizoel-deutschland.com. Dass zwei neue Resend-Zugangsdaten zwei verschiedene blockierte IPs liefern, ist ein sehr deutlicher Nachweis für ein Problem mit dem gemeinsamen Resend-Versandpool.

Trotzdem gilt: Mit einer eigenen IP, aber weiterhin ohne DMARC, ist eine erneute Blockade wahrscheinlich — web.de und GMX bewerten dann die Domain, und die ist ohne DMARC schlecht eingestuft. Deshalb ist Schritt 1 in jedem Fall zuerst zu machen, unabhängig davon, ob wir später eine eigene IP holen.

## Wichtig zum bereits gebuchten Resend-Tarif

Der neue Versandversuch lief über `54.240.3.28` — erneut eine Gemeinschafts-IP, nicht über eine eigene IP. Ein Upgrade auf Resend Pro weist **keine** eigene IP zu. Resend bietet die „Managed Dedicated IP" als separates Add-on erst ab Scale an und empfiehlt sie nur bei mehr als 3.000 E-Mails pro Tag. Der gebuchte Tarif löst dieses Problem daher nicht und sollte bei Resend storniert bzw. erstattet werden.

## Schritt 3 — Dauerhafte Lösung wählen

Wenn Schritt 1 und 2 nicht innerhalb weniger Tage greifen, gibt es zwei belastbare Wege:

- **Eigene Versand-IP bei Resend** ist bei unserem niedrigen Versandvolumen ausdrücklich nicht empfohlen und nur als separates Scale-Add-on erhältlich. Diese Variante streichen wir daher, sofern das Volumen nicht dauerhaft über 3.000 Mails pro Tag liegt.
- **Zweiter Versanddienst für deutsche Freemail-Adressen.** Ein EU-Anbieter mit guter web.de/GMX-Reputation übernimmt nur Empfänger auf web.de, gmx.de, gmx.net und t-online.de, alles andere bleibt bei Resend.

## Technische Umsetzung im Panel

Für Schritt 1 und 2 sind keine Codeänderungen nötig — reine DNS- und Anbieterarbeit.

Für Schritt 3, Variante „zweiter Versanddienst", wäre der Eingriff klein und auf eine Stelle begrenzt: in `src/lib/notify/resend.server.ts` eine Weiche nach Empfänger-Domain, die dieselbe Nutzlast (Betreff, HTML, PDF-Anhang) an den zweiten Anbieter schickt; Zugangsdaten als Projekt-Secret. `invoices.functions.ts` und `api/public/order-confirmation.ts` bleiben unverändert.

Keine Änderungen an Oberfläche, Datenbank oder Rechnungslogik.
