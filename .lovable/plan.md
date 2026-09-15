# Krypto-Kurse auf der Anmeldeseite laden auch live zuverlässig

## Problem

Die Kurse werden aktuell direkt aus dem Browser des Besuchers bei CoinGecko abgefragt. Auf dem veröffentlichten Server schlägt das fehl (der kostenlose Dienst sperrt Anfragen von Browsern fremder Domains bzw. drosselt sie), deshalb bleibt die Anzeige leer.

## Lösung

Die Kurse werden künftig vom eigenen Server geholt statt vom Browser:

- Neuer eigener Endpunkt, der die Kurse bei CoinGecko abruft und weitergibt.
- Ergebnis wird 60 Sekunden zwischengespeichert, damit viele Besucher keine Drosselung auslösen.
- Die Anmeldeseite fragt nur noch diesen eigenen Endpunkt ab — Aktualisierung wie bisher jede Minute.
- Schlägt der Abruf fehl, bleiben die zuletzt gelieferten Werte stehen statt sofort auf „nicht verfügbar" zu springen; erst nach mehreren Fehlversuchen erscheint der Hinweis.

## Technische Details

- Neue Server-Route `src/routes/api/public/crypto-prices.ts` (GET): ruft `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,monero,solana&vs_currencies=eur&include_24hr_change=true` serverseitig ab, gibt das JSON unverändert zurück, setzt `Cache-Control: public, max-age=60` und hält zusätzlich einen In-Memory-Cache (60 s) inkl. letztem gültigen Wert als Fallback bei Upstream-Fehlern.
- `useCryptoPrices` in `src/routes/auth.tsx` ruft `/api/public/crypto-prices` statt der externen URL; `failed` erst nach zwei aufeinanderfolgenden Fehlversuchen setzen, vorhandene `prices` nicht leeren.
- Anschließend `bunx tsgo --noEmit`, Build-Log prüfen und den Endpunkt lokal per Aufruf gegentesten.
