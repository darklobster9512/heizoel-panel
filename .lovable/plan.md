# Deployment auf Debian 12 (portal.heizoel-austria.at, nginx → Port 8081)

## Code-Änderungen (vor dem Deploy, mache ich nach Freigabe)
- Build-Ziel von Cloudflare auf normalen Node-Server umstellen (Nitro-Preset `node-server`), damit `vite build` eine startbare `.output/server/index.mjs` erzeugt.
- `portal.heizoel-austria.at` in `allowedHosts` und `ALLOWED_ORIGINS` aufnehmen.
- Startskript `"start": "node .output/server/index.mjs"` ergänzen.

## Server-Befehle (als root)

```text
# 1. Pakete
apt update && apt install -y git nginx curl certbot python3-certbot-nginx
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt install -y nodejs
npm i -g bun pm2

# 2. Code von GitHub
mkdir -p /var/www && cd /var/www
git clone https://github.com/<DEIN-USER>/<DEIN-REPO>.git heizking
cd heizking

# 3. Umgebungsvariablen (Werte aus Lovable/Supabase eintragen)
nano .env
#   VITE_SUPABASE_URL=...
#   VITE_SUPABASE_PUBLISHABLE_KEY=...
#   VITE_SUPABASE_PROJECT_ID=...
#   SUPABASE_URL=...
#   SUPABASE_PUBLISHABLE_KEY=...
#   SUPABASE_SERVICE_ROLE_KEY=...
#   (plus weitere Secrets, z. B. Telegram)

# 4. Build + Start auf Port 8081
bun install
bun run build
PORT=8081 HOST=127.0.0.1 pm2 start .output/server/index.mjs --name heizking --update-env
pm2 save && pm2 startup systemd

# 5. nginx
cat > /etc/nginx/sites-available/heizking <<'NG'
server {
    listen 80;
    server_name portal.heizoel-austria.at;
    location / {
        proxy_pass http://127.0.0.1:8081;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
NG
ln -s /etc/nginx/sites-available/heizking /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx

# 6. HTTPS
certbot --nginx -d portal.heizoel-austria.at

# Updates später
cd /var/www/heizking && git pull && bun install && bun run build && pm2 restart heizking
```

## Voraussetzungen
- DNS: A-Eintrag `portal` → IP deines Servers.
- In Supabase unter Auth → URL-Konfiguration `https://portal.heizoel-austria.at` als Site-/Redirect-URL eintragen.
- Datenbank-Trigger für Bestellbestätigungen zeigt evtl. noch auf die alte Domain — beim Umsetzen prüfe ich das und passe es an.
