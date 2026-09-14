import { Link } from "@tanstack/react-router";
import { ChevronRight, MapPin } from "lucide-react";

import {
  DELIVERY_DAYS,
  PRICE_PER_100,
  SAMPLE_LITERS,
  euro,
  num,
  pricePerLiter,
  sampleTotal,
  todayStamp,
  type City,
} from "@/data/regions";
import type { CopyBlock } from "@/data/region-copy";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export interface Crumb {
  label: string;
  to?: string;
  params?: Record<string, string>;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Brotkrumen-Navigation" className="text-[12px] text-muted-custom">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1">
            {i > 0 ? <ChevronRight className="size-3 shrink-0" aria-hidden /> : null}
            {item.to ? (
              <Link
                to={item.to}
                params={item.params as never}
                className="transition-colors hover:text-brand"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-conditions">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function RegionHero({
  crumbs,
  title,
  subtitle,
  plz,
}: {
  crumbs: Crumb[];
  title: string;
  subtitle: string;
  plz?: string;
}) {
  return (
    <section className="border-b-[3px] border-b-brand bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-8 md:py-12">
        <Breadcrumbs items={crumbs} />
        <div className="mt-4 grid gap-6 md:grid-cols-[1fr_320px] md:items-center">
          <div>
            <h1 className="text-[26px] font-semibold leading-[1.2] text-ink md:text-[36px]">
              {title}
            </h1>
            <p className="mt-3 max-w-[620px] text-[14px] leading-[1.75] text-hero-text md:text-[15px]">
              {subtitle}
            </p>
          </div>

          <div className="rounded-xl border border-line bg-background p-5 shadow-card">
            <p className="text-[12px] font-medium uppercase tracking-wide text-muted-custom">
              Aktueller Heizölpreis
            </p>
            <p className="mt-1 text-[28px] font-bold leading-none text-ink">
              ab {euro(PRICE_PER_100)} €
              <span className="ml-1 text-[13px] font-medium text-muted-custom">/100 L</span>
            </p>
            <p className="mt-1 text-[12px] text-muted-custom">Stand: {todayStamp()}</p>
            <Link
              to="/preisrechner"
              search={plz ? { plz } : {}}
              className="mt-4 flex h-11 w-full items-center justify-center rounded-md bg-brand text-[14px] font-semibold text-white shadow-cta transition-colors hover:bg-brand-hover"
            >
              Jetzt Preis berechnen
            </Link>
            <p className="mt-2 text-center text-[11px] text-muted-custom">
              Kostenlos & unverbindlich · Lieferung in {DELIVERY_DAYS} Werktagen
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PriceFacts({ extra }: { extra?: { label: string; value: string }[] }) {
  const facts = [
    { label: "Preis pro 100 Liter", value: `ab ${euro(PRICE_PER_100)} €` },
    { label: "Preis pro Liter", value: `ca. ${euro(pricePerLiter())} €` },
    { label: `${num(SAMPLE_LITERS)} Liter gesamt`, value: `ca. ${euro(sampleTotal())} €` },
    { label: "Lieferzeit", value: `${DELIVERY_DAYS} Werktage` },
    ...(extra ?? []),
  ];
  return (
    <section aria-label="Preisübersicht" className="bg-background">
      <div className="mx-auto max-w-6xl px-5 py-8">
        <dl
          className={`grid grid-cols-2 gap-4 md:divide-x md:divide-line ${
            facts.length === 5 ? "md:grid-cols-5" : "md:grid-cols-4"
          }`}
        >
          {facts.map((f) => (
            <div key={f.label} className="px-2 text-center md:px-4">
              <dt className="text-[11px] font-medium uppercase tracking-wide text-muted-custom">
                {f.label}
              </dt>
              <dd className="mt-1 text-[18px] font-bold text-ink md:text-[20px]">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function CopyBlocks({ blocks }: { blocks: CopyBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => (
        <section
          key={block.heading}
          className={i % 2 === 0 ? "bg-background" : "bg-surface"}
        >
          <div className="mx-auto max-w-6xl px-5 py-10 md:py-14">
            <h2 className="text-[20px] font-semibold leading-[1.3] text-ink md:text-[26px]">
              {block.heading}
            </h2>
            <div className="mt-4 max-w-[860px] space-y-4">
              {block.paragraphs.map((p) => (
                <p key={p.slice(0, 40)} className="text-[14px] leading-[1.8] text-hero-text md:text-[15px]">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}

export function CtaRow({ label, plz }: { label: string; plz?: string }) {
  return (
    <div className="mt-6">
      <Link
        to="/preisrechner"
        search={plz ? { plz } : {}}
        className="inline-flex h-11 items-center justify-center rounded-md bg-brand px-6 text-[14px] font-semibold text-white shadow-cta transition-colors hover:bg-brand-hover"
      >
        {label}
      </Link>
    </div>
  );
}

export function CityGrid({ cities, title }: { cities: City[]; title: string }) {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-6xl px-5 py-10 md:py-14">
        <h2 className="text-[20px] font-semibold leading-[1.3] text-ink md:text-[26px]">{title}</h2>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {cities.map((c) => (
            <Link
              key={c.slug}
              to="/heizoelpreise/$city"
              params={{ city: c.slug }}
              title={`Heizölpreise ${c.name}`}
              className="rounded-lg border border-line bg-card px-4 py-3 transition-colors hover:border-brand"
            >
              <span className="flex items-center gap-1.5 text-[14px] font-semibold text-conditions">
                <MapPin className="size-3.5 text-brand" aria-hidden />
                {c.name}
              </span>
              <span className="mt-0.5 block text-[11px] text-muted-custom">
                {num(c.population)} Einwohner · PLZ {c.plz}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CityLinkList({ cities, title }: { cities: City[]; title: string }) {
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-10 md:py-14">
        <h2 className="text-[20px] font-semibold leading-[1.3] text-ink md:text-[24px]">{title}</h2>
        <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 md:grid-cols-4">
          {cities.map((c) => (
            <Link
              key={c.slug}
              to="/heizoelpreise/$city"
              params={{ city: c.slug }}
              title={`Heizöl bestellen in ${c.name}`}
              className="block text-[12px] leading-snug text-conditions transition-colors hover:text-brand md:text-[13px]"
            >
              Heizölpreise {c.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function RegionFaq({ items, title }: { items: { q: string; a: string }[]; title: string }) {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-6xl px-5 py-10 md:py-14">
        <h2 className="text-[20px] font-semibold leading-[1.3] text-ink md:text-[26px]">{title}</h2>
        <Accordion type="multiple" className="mt-5 max-w-[860px]">
          {items.map((item) => (
            <AccordionItem key={item.q} value={item.q} className="border-line">
              <AccordionTrigger className="text-left text-[14px] font-semibold text-conditions md:text-[15px]">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-[14px] leading-[1.8] text-hero-text">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
