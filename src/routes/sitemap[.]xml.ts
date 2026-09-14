import { createFileRoute } from "@tanstack/react-router";

import { STATES } from "@/data/regions";
import { CITIES } from "@/data/cities";

const STATIC_PATHS = [
  "/",
  "/preisrechner",
  "/heizoelpreise",
  "/lieferung-zahlung",
  "/bewertungen",
  "/faq",
  "/kontakt",
  "/heizoel-wissen",
];

function buildSitemap(origin: string) {
  const today = new Date().toISOString().slice(0, 10);
  const entries: { loc: string; priority: string }[] = [
    ...STATIC_PATHS.map((p) => ({ loc: origin + p, priority: p === "/" ? "1.0" : "0.8" })),
    ...STATES.map((s) => ({
      loc: `${origin}/heizoelpreise/bundesland/${s.slug}`,
      priority: "0.7",
    })),
    ...CITIES.map((c) => ({ loc: `${origin}/heizoelpreise/${c.slug}`, priority: "0.6" })),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) =>
      `  <url><loc>${e.loc}</loc><lastmod>${today}</lastmod><changefreq>daily</changefreq><priority>${e.priority}</priority></url>`,
  )
  .join("\n")}
</urlset>
`;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const origin = new URL(request.url).origin;
        return new Response(buildSitemap(origin), {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
