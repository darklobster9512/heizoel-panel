import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";

import { SiteHeader } from "@/components/landing/site-header";
import { ReferralBanner, SiteFooter } from "@/components/landing/sections";
import { Breadcrumbs, CopyBlocks, PriceFacts } from "@/components/regional/region-ui";
import { citiesOfState } from "@/data/city-index";
import {
  DELIVERY_DAYS,
  MIN_LITERS,
  PRICE_PER_100,
  REVIEW_COUNT,
  REVIEW_SCORE,
  SAMPLE_LITERS,
  STATES,
  euro,
  num,
  sampleTotal,
  todayStamp,
} from "@/data/regions";

const TITLE = "Heizölpreise nach Bundesland & Stadt – aktuell | Klaro";
const DESCRIPTION =
  "Aktuelle Heizölpreise für alle 16 Bundesländer und über 700 Städte: ab 128,78 €/100 L, kostenlose Lieferung in 7 Werktagen und Festpreisgarantie.";

export const Route = createFileRoute("/heizoelpreise/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/heizoelpreise" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/heizoelpreise" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Startseite", item: "/" },
            { "@type": "ListItem", position: 2, name: "Heizölpreise", item: "/heizoelpreise" },
          ],
        }),
      },
    ],
  }),
  component: OverviewPage,
});

function OverviewPage() {
  return (
    <div className="min-h-screen bg-background font-body text-ink">
      <SiteHeader />
      <main>
        <section className="border-b-[3px] border-b-brand bg-surface">
          <div className="mx-auto max-w-6xl px-5 py-8 md:py-12">
            <Breadcrumbs items={[{ label: "Startseite", to: "/" }, { label: "Heizölpreise" }]} />
            <h1 className="mt-4 text-[26px] font-semibold leading-[1.2] text-ink md:text-[36px]">
              Heizölpreise nach Bundesland und Stadt
            </h1>
            <p className="mt-3 max-w-[720px] text-[14px] leading-[1.75] text-hero-text md:text-[15px]">
              Tagesaktuelle Heizölpreise ab {euro(PRICE_PER_100)} € pro 100 Liter (Stand:{" "}
              {todayStamp()}) für alle 16 Bundesländer und über 700 Städte in Deutschland.
              Kostenlose Lieferung in {DELIVERY_DAYS} Werktagen, Festpreisgarantie ab
              Bestellabschluss.
            </p>
          </div>
        </section>

        <PriceFacts />

        <section className="bg-surface">
          <div className="mx-auto max-w-6xl px-5 py-10 md:py-14">
            <h2 className="text-[20px] font-semibold leading-[1.3] text-ink md:text-[26px]">
              Heizölpreise in allen 16 Bundesländern
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
              {STATES.map((state) => (
                <Link
                  key={state.slug}
                  to="/heizoelpreise/bundesland/$state"
                  params={{ state: state.slug }}
                  title={`Heizölpreise ${state.name}`}
                  className="rounded-lg border border-line bg-card px-4 py-3.5 transition-colors hover:border-brand"
                >
                  <span className="flex items-center gap-1.5 text-[14px] font-semibold text-conditions">
                    <MapPin className="size-3.5 text-brand" aria-hidden />
                    {state.name}
                  </span>
                  <span className="mt-1 block text-[11px] text-muted-custom">
                    {num(citiesOfState(state.slug).length)} Orte · ab {euro(PRICE_PER_100)} €/100 L
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CopyBlocks
          blocks={[
            {
              heading: "Heizölpreise heute in Deutschland",
              paragraphs: [
                `Der Heizölpreis in Deutschland beginnt aktuell bei ${euro(PRICE_PER_100)} € pro 100 Liter (Stand: ${todayStamp()}). Für eine durchschnittliche Bestellung von ${num(SAMPLE_LITERS)} Litern ergibt das einen Gesamtpreis von ca. ${euro(sampleTotal())} € inklusive kostenloser Lieferung und Mehrwertsteuer.`,
                `Heizölpreise ändern sich täglich — maßgeblich sind der Rohölpreis (Brent), der Euro-Dollar-Kurs, die Raffineriemargen und die saisonale Nachfrage. Regional kommen Transportwege und Wettbewerb zwischen den Händlern hinzu, weshalb sich die Preise je Bundesland leicht unterscheiden können.`,
              ],
            },
            {
              heading: "Heizöl bestellen: Ablauf, Menge und Zahlung",
              paragraphs: [
                `Die Mindestbestellmenge beträgt ${num(MIN_LITERS)} Liter, größere Mengen senken den Preis pro 100 Liter. Die Bestellung erfolgt in drei Schritten: Postleitzahl und Menge eingeben, Heizölsorte wählen, Zahlungsart und Wunschtermin festlegen.`,
                `Bezahlt wird per Vorkasse, EC-Karte oder bar bei Lieferung; Bestandskunden können auf Rechnung bestellen. Über ${REVIEW_COUNT} Kunden bewerten Klaro mit ${REVIEW_SCORE}/5 Sternen.`,
              ],
            },
          ]}
        />

        <ReferralBanner compact />
      </main>
      <SiteFooter />
    </div>
  );
}
