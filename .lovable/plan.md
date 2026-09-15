# Klaro → HEIZKING umbenennen

Der Projektname „Klaro" wird überall in „HEIZKING" geändert — Logo, Texte, Seitentitel, Admin-Bereich, Auth-Seite, Telegram-Testnachricht.

## Was sich ändert

- **Logo (Landingpage + interner Bereich):** „klaro." wird zu „heizking." — klein mit grünem Punkt, wie bisher. Alt-Texte/ARIA-Labels entsprechend.
- **Fließtexte:** In Sätzen steht „Heizking" (z. B. „Heizking liefert Heizöl in alle Städte …"), in Überschriften und Badges „HEIZKING".
- **SEO-Titel & -Beschreibungen:** Startseite („HEIZKING — Heizöl-Preisvergleich für Deutschland"), Auth-Seite, alle Admin-Seiten.
- **Auth-Seite:** Badge „KLARO / AUTH" → „HEIZKING / AUTH", Meta-Texte angepasst.
- **Regionstexte (Städte/Bundesländer):** Alle „Klaro"-Nennungen → „Heizking".
- **Footer:** „© 2026 Klaro GmbH" → „© 2026 HEIZKING GmbH".
- **Telegram-Testnachricht:** „Testnachricht aus dem Klaro-Backend" → „…HEIZKING-Backend".
- **Projekt-Memory:** Arbeitsname wird auf HEIZKING aktualisiert.

## Bleibt unverändert

- **Domain-Texte „klaro.de"** bleiben wie gewünscht stehen (Footer-Texte „klaro.de ist Deutschlands führender …").
- **E-Mail-/Rechnungsvorlagen:** Unverändert — die nutzen ohnehin die Branding-Daten, nicht den Projektnamen.
- **Interne Speicherschlüssel** (`klaro.order.v1`, `klaro-demo-session`) bleiben, damit gespeicherte Entwürfe/Sitzungen nicht verloren gehen — rein technisch, nicht sichtbar.
- Platzhalter `placeholder="name@klaro.de"` im Login bleibt.

## Technische Details

- Ca. 20 Dateien, jeweils gezielte Textersetzung (kein globales Suchen/Ersetzen, damit `klaro.de` und Speicherschlüssel erhalten bleiben).
- Anschließend Typecheck (`bunx tsgo --noEmit`) und Build-Prüfung.
