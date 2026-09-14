import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { SiteHeader } from "@/components/landing/site-header";
import { ReferralBanner, SiteFooter } from "@/components/landing/sections";
import {
  CityGrid,
  CopyBlocks,
  CtaRow,
  PriceFacts,
  RegionFaq,
  RegionHero,
} from "@/components/regional/region-ui";
import { CITY_BY_SLUG, nearbyCities } from "@/data/city-index";
import { cityBlocks, cityFaq } from "@/data/region-copy";
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

export const Route = createFileRoute("/heizoelpreise/$city")({
  loader: ({ params }) => {
    const city = CITY_BY_SLUG[params.city];
    const state = city ? STATE_BY_SLUG[city.state] : undefined;
    if (!city || !state) throw notFound();
    return { city, state };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Ort nicht gefunden" }, { name: "robots", content: "noindex" }] };
    }
    const { city, state } = loaderData;
    const title = `Heizölpreise ${city.name} – ab ${euro(PRICE_PER_100)} €/100 L | Klaro`;
    const description = `Heizölpreis ${city.name} (${state.name}) heute ab ${euro(PRICE_PER_100)} € pro 100 Liter, ${num(SAMPLE_LITERS)} Liter ca. ${euro(sampleTotal())} €. Lieferung in ${DELIVERY_DAYS} Werktagen, PLZ ${city.plz}.`;
    const url = `/heizoelpreise/${params.city}`;
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
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: state.name,
                    item: `/heizoelpreise/bundesland/${state.slug}`,
                  },
                  { "@type": "ListItem", position: 4, name: city.name, item: url },
                ],
              },
              {
                "@type": "Product",
                name: `Heizöl in ${city.name}`,
                category: "Heizöl EL, DIN 51603-1",
                offers: {
                  "@type": "Offer",
                  price: PRICE_PER_100.toFixed(2),
                  priceCurrency: "EUR",
                  availability: "https://schema.org/InStock",
                  eligibleQuantity: { "@type": "QuantitativeValue", value: 100, unitCode: "LTR" },
                  areaServed: {
                    "@type": "City",
                    name: city.name,
                    address: {
                      "@type": "PostalAddress",
                      postalCode: city.plz,
                      addressRegion: state.name,
                      addressCountry: "DE",
                    },
                  },
                },
              },
              {
                "@type": "FAQPage",
                mainEntity: cityFaq(city, state).map((f) => ({
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
  component: CityPage,
});

function CityPage() {
  const { city, state } = Route.useLoaderData();
  const nearby = nearbyCities(city, 12);

  return (
    <div className="min-h-screen bg-background font-body text-ink">
      <SiteHeader />
      <main>
        <RegionHero
          crumbs={[
            { label: "Startseite", to: "/" },
            { label: "Heizölpreise", to: "/heizoelpreise" },
            {
              label: state.name,
              to: "/heizoelpreise/bundesland/$state",
              params: { state: state.slug },
            },
            { label: city.name },
          ]}
          title={`Heizölpreise ${city.name} (${state.name}) – Heizöl bestellen`}
          subtitle={`Aktueller Heizölpreis für ${city.name} ab ${euro(PRICE_PER_100)} € pro 100 Liter (Stand: ${todayStamp()}). ${num(SAMPLE_LITERS)} Liter kosten ca. ${euro(sampleTotal())} € — Lieferung in ${DELIVERY_DAYS} Werktagen frei Haus im PLZ-Gebiet ${city.plz}.`}
          plz={city.plz}
        />

        <PriceFacts
          extra={[{ label: "Postleitzahl", value: city.plz }]}
        />

        <CopyBlocks blocks={cityBlocks(city, state)} />

        <CityGrid cities={nearby} title={`Heizöl in Orten rund um ${city.name}`} />

        <RegionFaq items={cityFaq(city, state)} title={`Häufige Fragen zu Heizöl in ${city.name}`} />

        <section className="bg-surface">
          <div className="mx-auto max-w-6xl px-5 py-10 md:py-14">
            <h2 className="text-[20px] font-semibold leading-[1.3] text-ink md:text-[24px]">
              Heizölpreise in {state.name}
            </h2>
            <p className="mt-3 max-w-[720px] text-[14px] leading-[1.75] text-hero-text">
              {city.name}
              {city.district ? ` (Landkreis ${city.district})` : ""} liegt in {state.name} mit rund{" "}
              {num(city.population)} Einwohnern. Eine Übersicht aller Orte mit Heizöl-Lieferung
              finden Sie auf der Landesseite.
            </p>
            <div className="mt-4">
              <Link
                to="/heizoelpreise/bundesland/$state"
                params={{ state: state.slug }}
                className="text-[13px] font-medium text-brand underline underline-offset-2"
              >
                Alle Heizölpreise in {state.name} ansehen
              </Link>
            </div>
            <CtaRow label={`Heizölpreis für ${city.name} berechnen`} plz={city.plz} />
          </div>
        </section>

        <ReferralBanner compact />
      </main>
      <SiteFooter />
    </div>
  );
}
