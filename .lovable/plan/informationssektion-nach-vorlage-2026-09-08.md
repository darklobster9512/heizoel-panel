# Informationssektion nach Vorlage

Direkt unter „In 3 Schritten zum Wunschkredit“ entsteht der gezeigte Informationsbereich in derselben visuellen Anordnung.

## Umsetzung

- Vollbreiter, sehr hellgrauer Abschnitt mit den kompakten Abständen der Vorlage.
- Zweispaltiger Aufbau auf großen Bildschirmen:
  - links die zweizeilige Überschrift „Wir erklären, warum wir Ihre persönlichen Angaben benötigen“;
  - darunter drei Textabsätze mit denselben Zeilenlängen, Abständen und fett hervorgehobenen Schlüsselbegriffen;
  - rechts das hochgeladene Foto des Paars, rechteckig und im Seitenverhältnis bzw. Bildausschnitt der Vorlage.
- Der Markenbezug im Text lautet „Klaro“ statt „smava“, da „Klaro“ aktuell als Platzhaltermarke der Seite verwendet wird.
- Auf Mobilgeräten stehen Text und Foto sauber untereinander, ohne abgeschnittene Inhalte.
- Die vorhandene Sektion „In 3 Schritten zum Wunschkredit“ und alle übrigen Bereiche bleiben unverändert.

## Technische Details

- Das hochgeladene `couple-on-couch.webp` wird als CDN-Asset eingebunden.
- In `src/components/landing/sections.tsx` wird eine eigene, kleine Abschnittskomponente ergänzt.
- In `src/routes/index.tsx` wird sie direkt nach `<Steps />` und vor `<LoanTypes />` eingesetzt.
- Schriftgrößen, Zeilenhöhen, Spaltenbreiten, Bildgröße und Innenabstände werden anhand der 1336 × 612 px großen Referenz justiert.
- Abschließend erfolgt eine visuelle Prüfung in Desktop- und Mobilansicht sowie eine Prüfung auf Darstellungsfehler.
