import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { SiteHeader } from "@/components/landing/site-header";
import { ReferralBanner, SiteFooter } from "@/components/landing/sections";
import {
  CityGrid,
  CityLinkList,
  CopyBlocks,
  CtaRow,
  PriceFacts,
  RegionFaq,
  RegionHero,
} from "@/components/regional/region-ui";
import { citiesOfState, citiesOfStateAlpha } from "@/data/city-index";
import { stateBlocks, stateFaq } from "@/data/region-copy";
import {
  DELIVERY_DAYS,
  PRICE_PER_100,
  SAMPLE_LITERS,
  STATE_BY_SLUG,
  euro,
  num,
  sampleTotal,
  todayStamp,
} from "@/data/regions";

export const Route = createFileRoute("/heizoelpreise/bundesland/$state")({
  loader: ({ params }) => {
    const state = STATE_BY_SLUG[params.state];
    if (!state) throw notFound();
    return { state };
  },
  head: ({ params, loaderData }) => {
    const state = loaderData?.state;
    if (!state) {
      return { meta: [{ title: "Bundesland nicht gefunden" }, { name: "robots", content: "noindex" }] };
    }
    const title = `Heizölpreise ${state.name} heute – ab ${euro(PRICE_PER_100)} €/100 L | Klaro`;
    const description = `Aktueller Heizölpreis in ${state.name}: ab ${euro(PRICE_PER_100)} € pro 100 Liter, ${num(SAMPLE_LITERS)} Liter ca. ${euro(sampleTotal())} €. Kostenlose Lieferung in ${DELIVERY_DAYS} Werktagen.`;
    const url = `/heizoelpreise/bundesland/${params.state}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Startseite", item: "/" },
                  { "@type": "ListItem", position: 2, name: "Heizölpreise", item: "/heizoelpreise" },
                  { "@type": "ListItem", position: 3, name: state.name, item: url },
                ],
              },
              {
                "@type": "Product",
                name: `Heizöl in ${state.name}`,
                category: "Heizöl EL, DIN 51603-1",
                offers: {
                  "@type": "Offer",
                  price: PRICE_PER_100.toFixed(2),
                  priceCurrency: "EUR",
                  priceValidUntil: new Date(Date.now() + 864e5).toISOString().slice(0, 10),
                  availability: "https://schema.org/InStock",
                  eligibleQuantity: { "@type": "QuantitativeValue", value: 100, unitCode: "LTR" },
                  areaServed: { "@type": "AdministrativeArea", name: state.name },
                },
              },
              {
                "@type": "FAQPage",
                mainEntity: stateFaq(state).map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              },
            ],
          }),
        },
      ],
    };
  },
  component: StatePage,
});

function StatePage() {
  const { state } = Route.useLoaderData();
  const all = citiesOfStateAlpha(state.slug);
  const big = citiesOfState(state.slug).slice(0, 12);
  const neighbours = state.neighbours
    .map((slug) => STATE_BY_SLUG[slug])
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <div className="min-h-screen bg-background font-body text-ink">
      <SiteHeader />
      <main>
        <RegionHero
          crumbs={[
            { label: "Startseite", to: "/" },
            { label: "Heizölpreise", to: "/heizoelpreise" },
            { label: state.name },
          ]}
          title={`Heizölpreise ${state.name} – Heizöl günstig bestellen`}
          subtitle={`Tagesaktueller Heizölpreis in ${state.name} ab ${euro(PRICE_PER_100)} € pro 100 Liter (Stand: ${todayStamp()}). ${num(SAMPLE_LITERS)} Liter kosten ca. ${euro(sampleTotal())} € — kostenlose Lieferung in ${DELIVERY_DAYS} Werktagen inklusive.`}
        />

        <PriceFacts
          extra={[{ label: "Landeshauptstadt", value: state.capital }]}
        />

        <CopyBlocks blocks={stateBlocks(state)} />

        <CityGrid cities={big} title={`Große Städte in ${state.name}`} />

        <CityLinkList cities={all} title={`Alle Orte in ${state.name} mit Heizöl-Lieferung`} />

        <RegionFaq items={stateFaq(state)} title={`Häufige Fragen zu Heizöl in ${state.name}`} />

        {neighbours.length > 0 ? (
          <section className="bg-surface">
            <div className="mx-auto max-w-6xl px-5 py-10 md:py-14">
              <h2 className="text-[20px] font-semibold leading-[1.3] text-ink md:text-[24px]">
                Heizölpreise in angrenzenden Bundesländern
              </h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {neighbours.map((n) => (
                  <Link
                    key={n.slug}
                    to="/heizoelpreise/bundesland/$state"
                    params={{ state: n.slug }}
                    title={`Heizölpreise ${n.name}`}
                    className="rounded-lg border border-line bg-card px-3.5 py-2 text-[13px] font-medium text-conditions transition-colors hover:border-brand hover:text-brand"
                  >
                    Heizölpreise {n.name}
                  </Link>
                ))}
              </div>
              <CtaRow label={`Heizölpreis für ${state.name} berechnen`} />
            </div>
          </section>
        ) : null}

        <ReferralBanner compact />
      </main>
      <SiteFooter />
    </div>
  );
}
