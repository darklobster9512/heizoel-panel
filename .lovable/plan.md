# Dock statt Kopfleiste im Admin-Bereich

## Ziel
Die obere Kopfleiste verschwindet komplett. Alles, was dort steht (Logo, Rollen-Kennzeichen, Name/E-Mail, Kürzel-Kreis, Abmelden), wandert in die grüne Dock-Leiste am linken Rand. Die Dock hängt fest am linken Bildschirmrand und sitzt genau in der Mitte der Bildschirmhöhe.

## Aufbau der Dock (von oben nach unten)
1. Logo, darunter das Rollen-Kennzeichen
2. dünne Trennlinie
3. die Menüpunkte wie bisher (aktiver Punkt als weißer Button)
4. dünne Trennlinie
5. Kürzel-Kreis mit Name und E-Mail
6. Abmelden

Die Dock bleibt nur so hoch und breit wie ihr Inhalt, rechts abgerundet, links bündig mit dem Seitenrand, sodass sie wie aus der Kante herausgeschoben wirkt. Bei sehr kleinen Fensterhöhen wird ihr Inhalt scrollbar, damit nichts abgeschnitten wird.

## Inhaltsbereich
Ohne Kopfleiste beginnt der Seiteninhalt oben; links entsteht ein Abstand, damit die Dock nichts überdeckt. Der Inhalt darf weiterhin bis 1440px breit werden.

## Mobil
Unverändert: die Dock ist ausgeblendet, unten bleibt die Tab-Leiste. Damit Logo, Name und Abmelden auf dem Handy nicht verloren gehen, kommt oben auf der Seite eine schlanke Zeile mit Logo und Abmelden, die nur auf kleinen Bildschirmen sichtbar ist.

## Technisch
- Nur `src/components/internal/app-shell.tsx` wird geändert.
- `<header>` entfällt; die Dock wird `fixed left-0 top-1/2 -translate-y-1/2 z-40` und ist damit unabhängig vom Scrollen exakt vertikal zentriert.
- Äußerer Container ohne `min-h-[calc(100vh-64px)]`-Offset; linkes Padding auf Desktop reserviert Platz für die Dock-Breite.
