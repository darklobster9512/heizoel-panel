# Domain backend.heizoel-austria.at freigeben

## Änderung
- In `vite.config.ts` bei `server.allowedHosts` zusätzlich `backend.heizoel-austria.at` eintragen (neben `backend.heizoel-deutschland.com`).
- In `src/start.ts` `https://backend.heizoel-austria.at` zu `ALLOWED_ORIGINS` hinzufügen, damit Anmeldung und Aktionen im Panel nicht blockiert werden.

## Danach auf dem Server
```text
cd /var/www/heizking && git pull
# Dienst neu starten, z. B.:
pm2 restart heizking
```
