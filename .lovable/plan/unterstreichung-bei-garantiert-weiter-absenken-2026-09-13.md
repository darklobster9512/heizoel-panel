Unterstreichung bei „garantiert!" weiter absenken

- In `src/components/landing/hero.tsx` den `underline-offset` des „garantiert!"-Spans deutlich erhöhen (z. B. auf `underline-offset-12` oder einen größeren Wert), damit die 3 px dicke grüne Linie klar unter dem Buchstaben „g" verläuft und nicht mehr durch die Unterlänge unterbrochen wirkt.
- `decoration-skip-ink-none` beibehalten, damit die Linie nicht automatisch um Unterlängen ausweicht.
- Build prüfen und per Screenshot Desktop/Mobil verifizieren.