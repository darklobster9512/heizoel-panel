import { createFileRoute } from "@tanstack/react-router";

const UPSTREAM =
  "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,monero,solana&vs_currencies=eur&include_24hr_change=true";

const TTL_MS = 60_000;

let cache: { at: number; payload: unknown } | null = null;

export const Route = createFileRoute("/api/public/crypto-prices")({
  server: {
    handlers: {
      GET: async () => {
        const now = Date.now();
        if (cache && now - cache.at < TTL_MS) {
          return Response.json(cache.payload, {
            headers: { "Cache-Control": "public, max-age=60" },
          });
        }

        try {
          const response = await fetch(UPSTREAM, {
            headers: { accept: "application/json" },
          });
          if (!response.ok) throw new Error(`upstream ${response.status}`);
          const payload = await response.json();
          cache = { at: now, payload };
          return Response.json(payload, {
            headers: { "Cache-Control": "public, max-age=60" },
          });
        } catch {
          if (cache) {
            return Response.json(cache.payload, {
              headers: { "Cache-Control": "public, max-age=30" },
            });
          }
          return Response.json({ error: "upstream_unavailable" }, { status: 502 });
        }
      },
    },
  },
});
