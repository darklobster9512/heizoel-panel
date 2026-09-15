# allowedHosts in Vite ergänzen

## Ziel
Damit der Vite-Dev-Server (bzw. Preview) Anfragen von `backend.heizoel-deutschland.com` akzeptiert, soll diese Domain in `vite.config.ts` unter `server.allowedHosts` eingetragen werden.

## Aktueller Stand
`vite.config.ts` nutzt `defineConfig` aus `@lovable.dev/vite-tanstack-config` und enthält bisher nur die `tanstackStart.server.entry`-Konfiguration. `server.allowedHosts` ist noch nicht gesetzt.

## Änderung
In `vite.config.ts` wird der `server`-Block erweitert:

```ts
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  server: {
    allowedHosts: ["backend.heizoel-deutschland.com"],
  },
});
```

## Prüfung nach Umsetzung
- `bunx tsgo --noEmit` ausführen (sofern relevant für Config-Änderungen).
- Build-Log `/tmp/observability/build-errors.log` prüfen.
- Optional: Vite-Dev-Server erneut auf Anfragen von der Domain prüfen lassen, sofern möglich.
