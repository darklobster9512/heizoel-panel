import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, Info, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "./logo";
import ntvAward from "@/assets/ntv-gesamtsieger-heizoel24-2025.png.asset.json";
import bildAward from "@/assets/bild-empfehlung-2026.png.asset.json";
import weltAward from "@/assets/die-welt-service-champion-2025.png.asset.json";
import dtgvAward from "@/assets/dtgv-testsieger.png.asset.json";
import barzahlungAsset from "@/assets/barzahlung.png.asset.json";
import vorauskasseAsset from "@/assets/vorauskasse.png.asset.json";
import ecKarteAsset from "@/assets/ec-karte.png.asset.json";
import eKomiLogo from "@/assets/ekomi.webp.asset.json";
import googleIcon from "@/assets/google-icon.webp.asset.json";
import trustedShopsIcon from "@/assets/trusted-shops-icon.png.asset.json";

export function SectionHead({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-brand-deep">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-semibold text-ink md:text-[38px]">{title}</h2>
      {intro ? <p className="mt-4 text-base leading-relaxed text-muted-custom">{intro}</p> : null}
    </div>
  );
}

import smavaHero from "@/assets/smava-hero.webp.asset.json";

const STATS = [
  { value: "25.429", label: "ZUFRIEDENE KUNDEN" },
  { value: "4.9/5", label: "KUNDENBEWERTUNG" },
  { value: "10+", label: "JAHRE ERFAHRUNG" },
  { value: "500+", label: "PARTNER-HÄNDLER" },
  { value: "€247", label: "Ø ERSPARNIS" },
];

export function TrustBar() {
  return (
    <section aria-label="Klaro in Zahlen" className="bg-background">
      <div className="h-[3px] w-full bg-brand" />
      <div className="mx-auto max-w-6xl px-5 py-6 md:py-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-6">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-xl font-bold text-ink md:text-2xl">{stat.value}</p>
              <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-custom md:text-[11px]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const CONDITIONS_LEFT = [
  ["Literpreis:", "ca. 128,78 € bis 163,15 € je 100 Liter (Heizöl EL)"],
  ["Liefermenge:", "Min. 1500 bis Max. 32.000 Liter"],
];

const CONDITIONS_RIGHT = [
  ["Lieferzeit:", "ca. 4 bis 10 Werktage, Express möglich"],
  ["Zahlungsarten:", "Vorkasse, Bar, EC-Karte, Rechnung"],
];

function ConditionsList({ items }: { items: string[][] }) {
  return (
    <dl className="grid gap-y-2.5">
      {items.map(([label, value]) => (
        <div
          key={label}
          className="grid gap-x-3 gap-y-0.5 text-[13.5px] leading-snug sm:grid-cols-[150px_1fr]"
        >
          <dt className="font-bold text-conditions">{label}</dt>
          <dd className="tabular text-conditions">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ConditionsBox({ mobileOnly = false }: { mobileOnly?: boolean }) {
  return (
    <section
      aria-label="Preis Übersicht"
      className={mobileOnly ? "bg-surface md:hidden" : "hidden bg-background md:block"}
    >
      <div className={`mx-auto max-w-6xl px-5 ${mobileOnly ? "pb-5 pt-4" : "pb-12"}`}>
        <div className="rounded-md bg-line px-4 py-4 md:bg-surface md:px-6 md:py-5">
          <h2 className="text-[14px] font-bold text-conditions">
            Heizöl Preis-Übersicht
          </h2>
          <div className="mt-4 grid gap-x-8 gap-y-2.5 md:grid-cols-[1.25fr_1fr]">
            <ConditionsList items={CONDITIONS_LEFT} />
            <ConditionsList items={CONDITIONS_RIGHT} />
          </div>
        </div>
      </div>
    </section>
  );
}


const LOAN_TYPES = [
  { title: "Ratenkredit", rate: "ab 3,89 %", text: "Für alles, was gerade ansteht — frei verwendbar." },
  { title: "Autokredit", rate: "ab 3,89 %", text: "Barzahlerrabatt beim Händler sichern." },
  { title: "Umschuldung", rate: "ab 4,29 %", text: "Teure Altkredite und Dispo ablösen." },
  { title: "Modernisierung", rate: "ab 4,09 %", text: "Sanieren, renovieren, energetisch aufwerten." },
  { title: "Baufinanzierung", rate: "ab 3,15 %", text: "Kauf, Neubau oder Anschlussfinanzierung." },
  { title: "Gewerbekredit", rate: "ab 5,20 %", text: "Betriebsmittel und Investitionen für Selbstständige." },
];

export function LoanTypes() {
  return (
    <section id="kreditarten" className="border-y border-line bg-background">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <SectionHead eyebrow="Kreditarten" title="Für jeden Zweck der passende Kredit" />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LOAN_TYPES.map((l) => (
            <li
              key={l.title}
              className="rounded-xl border border-line bg-surface p-5 transition-colors hover:border-brand"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-base font-semibold text-ink">{l.title}</h3>
                <span className="tabular font-mono text-sm font-semibold text-brand-deep">
                  {l.rate}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-custom">{l.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const COMPARE = [
  { label: "Bestes Angebot über smava", value: 3.89, width: "26%", highlight: true },
  { label: "Durchschnitt unserer Bankpartner", value: 6.4, width: "45%" },
  { label: "Typisches Filialbank-Angebot", value: 8.9, width: "62%" },
  { label: "Dispositionskredit", value: 12.5, width: "88%" },
];

export function RateComparison() {
  return (
    <section className="border-b border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[0.85fr_1.15fr]">
        <SectionHead
          eyebrow="Zinsvergleich"
          title="Der Unterschied zur Hausbank ist selten klein"
          intro="Beispielwerte für 25.000 € über 60 Monate. Ihr Zinssatz hängt von Bonität und Laufzeit ab."
        />
        <ul className="space-y-5">
          {COMPARE.map((c) => (
            <li key={c.label}>
              <div className="flex items-baseline justify-between text-sm">
                <span className="text-ink">{c.label}</span>
                <span className="tabular font-mono font-semibold text-ink">
                  {c.value.toLocaleString("de-DE", { minimumFractionDigits: 2 })} %
                </span>
              </div>
              <div className="mt-2 h-2.5 w-full rounded-full bg-secondary">
                <div
                  className={`h-full rounded-full ${c.highlight ? "bg-brand" : "bg-muted-custom/35"}`}
                  style={{ width: c.width }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const RATES = [
  { type: "Ratenkredit", rate: "3,89 – 12,90 %", term: "12 – 120 Monate", amount: "1.000 – 100.000 €" },
  { type: "Autokredit", rate: "3,89 – 9,90 %", term: "12 – 96 Monate", amount: "2.500 – 80.000 €" },
  { type: "Umschuldung", rate: "4,29 – 11,50 %", term: "24 – 120 Monate", amount: "5.000 – 100.000 €" },
  { type: "Modernisierungskredit", rate: "4,09 – 10,40 %", term: "24 – 120 Monate", amount: "5.000 – 100.000 €" },
  { type: "Kredit für Selbstständige", rate: "5,20 – 14,90 %", term: "12 – 84 Monate", amount: "2.500 – 60.000 €" },
];

export function RatesTable() {
  return (
    <section id="konditionen" className="scroll-mt-20 border-b border-line bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <SectionHead
          eyebrow="Konditionen"
          title="Zinsübersicht nach Kreditart"
          intro="Beispielhafte Spannen unserer Bankpartner. Ihr persönlicher Zinssatz hängt von Bonität, Laufzeit und Verwendungszweck ab."
        />

        <div className="mt-10 overflow-x-auto rounded-xl border border-line bg-background">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <caption className="sr-only">Zinsspannen, Laufzeiten und Betragsrahmen je Kreditart</caption>
            <thead>
              <tr className="border-b border-line bg-secondary/60">
                <th scope="col" className="px-5 py-3.5 font-medium text-muted-custom">Kreditart</th>
                <th scope="col" className="px-5 py-3.5 font-medium text-muted-custom">eff. Jahreszins</th>
                <th scope="col" className="px-5 py-3.5 font-medium text-muted-custom">Laufzeit</th>
                <th scope="col" className="px-5 py-3.5 font-medium text-muted-custom">Betragsrahmen</th>
              </tr>
            </thead>
            <tbody>
              {RATES.map((r) => (
                <tr key={r.type} className="border-b border-line last:border-0">
                  <th scope="row" className="px-5 py-4 font-medium text-ink">{r.type}</th>
                  <td className="tabular px-5 py-4 font-mono font-medium text-brand-deep">{r.rate}</td>
                  <td className="tabular px-5 py-4 text-muted-custom">{r.term}</td>
                  <td className="tabular px-5 py-4 text-muted-custom">{r.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-muted-custom">
          Stand der Beispielwerte: laufend aktualisiert. Angaben ohne Gewähr, kein Angebot im
          Rechtssinne.
        </p>
      </div>
    </section>
  );
}

const ADVANTAGES = [
  {
    title: "31 Bankpartner in einer Abfrage",
    text: "Eine Anfrage, ein Score, alle erreichbaren Angebote — statt fünf einzelner Anträge.",
  },
  {
    title: "SCHUFA-neutrale Konditionsanfrage",
    text: "Der Vergleich hinterlässt keine Spur in Ihrem SCHUFA-Score.",
  },
  {
    title: "Keine Gebühren, keine Provision von Ihnen",
    text: "Wir werden von den Banken vergütet. Für Sie ist der Vergleich kostenfrei.",
  },
  {
    title: "Vollständig digitaler Abschluss",
    text: "Identifikation per Video oder Bank-Login, Signatur online, Papier entfällt.",
  },
  {
    title: "Persönliche Beratung aus Deutschland",
    text: "Zertifizierte Kreditberater, erreichbar Mo–Fr von 8 bis 20 Uhr.",
  },
  {
    title: "Transparente Gesamtkosten",
    text: "Effektivzins, Restschuldversicherung und Gesamtbetrag immer vollständig ausgewiesen.",
  },
];

export function Advantages() {
  return (
    <section id="vorteile" className="scroll-mt-20 border-b border-line bg-background">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <SectionHead
          eyebrow="Warum smava"
          title="Ein Vergleich, der auch der Prüfung standhält"
        />
        <ul className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {ADVANTAGES.map((a) => (
            <li key={a.title} className="border-t border-line pt-5">
              <h3 className="text-base font-semibold text-ink">{a.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-custom">{a.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

import freeInquiry from "@/assets/free-inquiry.svg.asset.json";
import getOffers from "@/assets/get-offers.svg.asset.json";
import closeApplication from "@/assets/close-application.svg.asset.json";
import coupleOnCouch from "@/assets/couple-on-couch.webp.asset.json";
import offerList from "@/assets/heizoel-offer-list.png.asset.json";
import interestIcon from "@/assets/interest.svg.asset.json";
import neutralIcon from "@/assets/neutral.svg.asset.json";
import freeIcon from "@/assets/free.svg.asset.json";
import dataSafetyIcon from "@/assets/data-safety.svg.asset.json";

export const STEPS = [
  {
    icon: freeInquiry.url,
    iconAlt: "Monitor-Symbol, Schritt 1",
    width: 128,
    height: 128,
    title: "Kostenlose\nPreisanfrage",
    text: "Geben Sie einfach Ihre Postleitzahl, die gewünschte Menge und Abladestellen ein – bequem von zu Hause aus.",
  },
  {
    icon: getOffers.url,
    iconAlt: "Listen-Symbol, Schritt 2",
    width: 67,
    height: 56,
    title: "Angebote vergleichen",
    text: "Sie erhalten aktuelle Heizölpreise von Händlern aus Ihrer Region und wählen das günstigste Angebot.",
  },
  {
    icon: closeApplication.url,
    iconAlt: "Hand mit Münzen, Schritt 3",
    width: 72,
    height: 72,
    title: "Heizöl bestellen",
    text: "Bestellen Sie direkt online beim Händler Ihrer Wahl – die Lieferung erfolgt zum Wunschtermin.",
  },
];

export function Steps() {
  return (
    <section id="ablauf" className="scroll-mt-20 bg-background">
      <div className="mx-auto max-w-6xl px-5 py-12 md:py-14">
        <h2 className="text-[22px] font-bold tracking-tight text-conditions md:text-2xl">
          In 3 Schritten zum günstigen Heizöl
        </h2>
        <ol className="mt-9 grid gap-9 md:grid-cols-3 md:gap-x-12">
          {STEPS.map((s) => (
            <li key={s.title} className="flex items-start gap-5">
              <img
                src={s.icon}
                alt={s.iconAlt}
                width={s.width}
                height={s.height}
                className="h-[72px] w-[72px] shrink-0 object-contain"
              />
              <div className="max-w-[250px] pt-0.5">
                <h3 className="whitespace-pre-line text-[21px] font-bold leading-[1.18] text-conditions">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.55] text-conditions/85">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>

  );
}

export function PersonalDataInfo() {
  return (
    <section className="bg-surface" aria-labelledby="personal-data-title">
      <div className="mx-auto grid max-w-6xl items-center gap-8 pb-14 md:grid-cols-[1.45fr_1fr] md:gap-20 md:px-5 md:py-[106px]">
        <div className="order-2 max-w-[610px] px-5 text-conditions md:order-1 md:px-0">
          <h2
            id="personal-data-title"
            className="max-w-[560px] text-[25px] font-bold leading-[1.3] md:text-[28px]"
          >
            Heizöl günstig einkaufen
          </h2>

          <div className="mt-8 space-y-4 text-[16px] leading-[1.5]">
            <p>
              <strong>Heizöl</strong> ist neben Gas der wichtigste Energieträger – besonders in der
              kalten Jahreszeit spielen die <strong>Heizölpreise</strong> eine große Rolle.
            </p>
            <p>
              Die Preise für Heizöl schwanken stark. Sie hängen ab vom <strong>Dollarkurs</strong>,
              der weltweiten <strong>Ölnachfrage</strong> und der politischen Lage in den
              ölfördernden Ländern.
            </p>
            <p>
              Deshalb lohnt es sich, das ganze Jahr über die Marktentwicklung zu beobachten und bei{" "}
              <strong>günstigen Preisen</strong> zuzugreifen.
            </p>
            <p>
              Vor einer Bestellung sollten Verbraucher die Angebote mit einem{" "}
              <strong>Heizölrechner vergleichen</strong> – denn auch zwischen den Händlern gibt es
              deutliche Unterschiede.
            </p>
          </div>
        </div>

        <img
          src={coupleOnCouch.url}
          alt="Ein Paar betrachtet gemeinsam ein Smartphone"
          width={400}
          height={400}
          loading="lazy"
          className="order-1 aspect-square w-full object-cover md:order-2 md:max-w-[400px] md:justify-self-end"
        />
      </div>
    </section>
  );
}

const OFFER_ADVANTAGES = [
  {
    icon: interestIcon.url,
    iconAlt: "Lupe mit Preisdiagramm",
    title: "Günstige Preise",
    text: "Sparen Sie durch den direkten Preisvergleich von über 300 Heizölhändlern aus Ihrer Region.",
  },
  {
    icon: neutralIcon.url,
    iconAlt: "Regionale Händler",
    title: "Regionale Händler",
    text: "Wir vergleichen nur Händler, die auch tatsächlich in Ihre Region liefern.",
  },
  {
    icon: freeIcon.url,
    iconAlt: "Kostenlose Preisanfrage",
    title: "Kostenlos &\nunverbindlich",
    text: "Es warten keine versteckten Kosten auf Sie und Sie können die Anfrage jederzeit widerrufen.",
  },
  {
    icon: dataSafetyIcon.url,
    iconAlt: "Geschützte Datenübertragung",
    title: "Datensicherheit",
    text: "Für eine sichere Übermittlung Ihrer persönlichen Daten sorgen unsere strengen Datenschutzrichtlinien.",
  },
];

export function MatchingOffers() {
  return (
    <section className="overflow-hidden bg-background" aria-labelledby="matching-offers-title">
      <div className="mx-auto grid max-w-6xl items-center gap-8 pt-0 md:h-[557px] md:grid-cols-[404px_1fr] md:gap-[74px] md:px-5 md:pt-8">
        <div className="order-1 h-[258px] w-full overflow-hidden md:contents">
          <img
            src={offerList.url}
            alt="Beispielhafte Heizöl-Angebote verschiedener Händler"
            width={404}
            height={575}
            loading="lazy"
            className="mx-auto w-full max-w-[404px] self-start md:order-1 md:-translate-x-[78px]"
          />
        </div>

        <div className="order-2 flex flex-col justify-center px-5 pb-10 pt-0 md:h-[557px] md:px-0 md:pb-14">
          <h2
            id="matching-offers-title"
            className="text-center text-[25px] font-bold leading-[1.25] text-conditions md:text-[28px]"
          >
            Mit Klaro zum günstigsten Heizölpreis
          </h2>

          <ul className="mt-8 grid gap-x-[72px] gap-y-8 sm:grid-cols-2 md:-ml-[94px] md:w-[calc(100%+94px)]">
            {OFFER_ADVANTAGES.map((advantage) => (
              <li key={advantage.title} className="flex items-start gap-3">
                <img
                  src={advantage.icon}
                  alt={advantage.iconAlt}
                  width={40}
                  height={40}
                  className="size-10 shrink-0 object-contain"
                />
                <div className="max-w-[280px] text-conditions">
                  <h3 className="whitespace-pre-line text-[21px] font-bold leading-[1.2]">
                    {advantage.title}
                  </h3>
                  <p className="mt-1 text-[16px] leading-[1.5]">{advantage.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex justify-center md:mt-8">
            <Button className="h-12 w-full max-w-[298px] text-[13px] font-bold !text-white shadow-md">
              Jetzt Heizölpreise vergleichen
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}


const VOICES = [
  {
    quote:
      "Drei Angebote innerhalb einer Stunde, das beste lag 1,4 Prozentpunkte unter dem meiner Hausbank.",
    name: "Martin K.",
    role: "Umschuldung, 32.000 €",
  },
  {
    quote:
      "Klare Zahlen, keine Lockangebote. Der ausgewiesene Effektivzins war am Ende auch der im Vertrag.",
    name: "Sabine R.",
    role: "Autokredit, 18.500 €",
  },
  {
    quote:
      "Als Selbstständige war es sonst mühsam. Hier hatte ich in zwei Tagen eine Zusage.",
    name: "Elena T.",
    role: "Betriebsmittel, 45.000 €",
  },
];

export function Testimonials() {
  return (
    <section className="border-b border-line bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <SectionHead
          eyebrow="Kundenstimmen"
          title="4,8 von 5 Sternen aus 2.318 Bewertungen"
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {VOICES.map((v) => (
            <li key={v.name} className="rounded-xl border border-line bg-background p-6">
              <p className="font-mono text-xs tracking-[0.2em] text-brand-deep" aria-label="5 von 5 Sternen">
                ★★★★★
              </p>
              <blockquote className="mt-4 text-sm leading-relaxed text-ink">
                „{v.quote}“
              </blockquote>
              <footer className="mt-5 border-t border-line pt-4 text-xs text-muted-custom">
                <span className="font-medium text-ink">{v.name}</span> · {v.role}
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const HEIZOEL_ROWS: { label: string; info: string; standard: boolean; premium: boolean }[] = [
  {
    label: "mit anderen Heizölsorten mischbar",
    info: "Mit anderen Ölsorten mischbar: Heizöl Standard und Premium lassen sich auch bei Restbeständen im Tank untereinander mischen. Mischbarkeit von Bioheizöl mit Heizöl Standard und Premium ist abhängig von Ihrer Heizanlage. Fragen Sie im Zweifelsfall den Hersteller Ihres Heizgerätes.",
    standard: true,
    premium: true,
  },
  {
    label: "für alle Ölheizungen geeignet",
    info: "Für alle Ölheizungen geeignet: Einsatz für alle Ölheizungen inkl. Brennwerttechnik.",
    standard: true,
    premium: true,
  },
  {
    label: "geringerer Verbrauch",
    info: "Reduzierter Verbrauch: Nahezu rückstandfreie Verbrennung führt zu höherer Effizienz und dadurch Reduzierung des Ölverbrauchs, verhindert Ablagerungen und sorgt so für eine bessere Wärme- bzw. Energieausbeute. Es bildet sich weniger Ruß und somit werden die Umwelt-Emissionen gesenkt.",
    standard: false,
    premium: true,
  },
  {
    label: "angenehmer Geruch",
    info: "Angenehmer Geruch: Geruchszusätze neutralisieren den typischen Ölgeruch und sorgen für angenehmen Duft, sowohl während der Betankung als auch im Regelbetrieb der Heizung.",
    standard: false,
    premium: true,
  },
  {
    label: "verbesserte Lagerfähigkeit",
    info: "Höhere Lagerstabilität des Heizöls: Stabilitätsverbesserer verhindern die Bildung von Sedimenten, Ablagerungen und Schlamm und verlangsamen somit die natürliche Alterung des Öls und machen es länger lagerfähig.",
    standard: false,
    premium: true,
  },
  {
    label: "höhere Betriebssicherheit & Lebenszeit der Heizungsanlage",
    info: "Höhere Betriebssicherheit & Lebenszeit der Heizung: Die Minimierung von Ablagerungen und Ruß reduziert nicht nur den Verbrauch, sondern schützt auch vor störungsbedingten Ausfällen. Spezielle Additive unterbinden beispielsweise die Rostbildung im Brennersystem. Eine erhöhte Schmierfähigkeit schützt die Förderpumpe. Insgesamt erhöht dies die Nutzungsdauer, schützt vor teuren Reparaturen und senkt den Wartungsaufwand.",
    standard: false,
    premium: true,
  },
  {
    label: "umweltschonende Biokomponenten",
    info: "Schwefelarmes Heizöl: Enthält Komponenten aus nachwachsenden Rohstoffen, meist durch Beimischung von Rapsöl oder anderen veresterten Pflanzenölen. Hierdurch wird eine Reduzierung der CO2-Emissionen erreicht.",
    standard: false,
    premium: false,
  },
];

function Mark({ yes }: { yes: boolean }) {
  return yes ? (
    <Check className="h-5 w-5 text-brand" strokeWidth={3} aria-label="Ja" />
  ) : (
    <X className="h-5 w-5 text-muted-foreground" strokeWidth={3} aria-label="Nein" />
  );
}

import dropGreen from "@/assets/drop-green.png.asset.json";
import dropBrown from "@/assets/drop-brown.png.asset.json";

function InfoCell({ info, label }: { info: string; label: string }) {
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setPinned(false);
      }}
    >
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={`Info: ${label}`}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => {
            if (!pinned) setOpen(false);
          }}
          onClick={(e) => {
            e.preventDefault();
            if (pinned) {
              setPinned(false);
              setOpen(false);
            } else {
              setPinned(true);
              setOpen(true);
            }
          }}
          className="mx-auto flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-conditions"
        >
          <Info className="h-[18px] w-[18px]" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => {
          if (!pinned) setOpen(false);
        }}
        className="max-w-[320px] text-left text-[13px] leading-relaxed text-conditions"
      >
        <p className="mb-1.5 text-[14px] font-semibold text-ink">{label}</p>
        {info}
      </PopoverContent>
    </Popover>
  );
}

const GRID = "grid grid-cols-[1fr_40px_76px_76px] gap-2 md:grid-cols-[1fr_60px_220px_220px]";

export function HeizoelSorten() {
  return (
    <section id="heizoelsorten" className="scroll-mt-20 bg-surface">
      <div className="mx-auto max-w-[1283px] px-5 py-16 md:py-20">
        <p className="text-center text-[11px] font-light uppercase tracking-[0.2em] text-muted-custom">
          Welches Heizöl brauche ich?
        </p>
        <h2 className="mt-3 text-center text-[28px] font-bold leading-[1.2] text-conditions md:text-[34px]">
          Heizölsorten im Überblick
        </h2>

        <div className="mt-10 overflow-hidden rounded-xl border border-line bg-card shadow-sm">
          {/* Kopfzeile */}
          <div className={`${GRID} items-end border-b border-line bg-muted/40 px-5 py-4 md:px-8 md:py-5`}>
            <div />
            <div />
            <div className="text-center">
              <p className="text-[12px] font-bold leading-tight text-conditions md:text-[15px]">
                Heizöl Standard
              </p>
              <p className="mt-1 flex items-center justify-center gap-1.5 text-[11px] md:text-xs" style={{ color: "#7AB616" }}>
                <img src={dropGreen.url} alt="" className="h-3.5 w-3.5 object-contain" /> Das Günstige
              </p>
            </div>
            <div className="text-center">
              <p className="text-[12px] font-bold leading-tight text-conditions md:text-[15px]">
                Heizöl Premium
              </p>
              <p className="mt-1 flex items-center justify-center gap-1.5 text-[11px] md:text-xs" style={{ color: "#A0522D" }}>
                <img src={dropBrown.url} alt="" className="h-3.5 w-3.5 object-contain" /> Das Sparsame
              </p>
            </div>
          </div>

          {HEIZOEL_ROWS.map((row, i) => (
            <div
              key={row.label}
              className={`${GRID} items-center px-5 py-4 md:px-8 md:py-5 ${i > 0 ? "border-t border-line" : ""}`}
            >
              <p className="text-[13px] font-semibold leading-snug text-conditions md:text-[15px]">
                {row.label}
              </p>
              <InfoCell info={row.info} label={row.label} />
              <div className="flex justify-center">
                <Mark yes={row.standard} />
              </div>
              <div className="flex justify-center">
                <Mark yes={row.premium} />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

const TRUST_CARDS = [
  {
    title: "Heizöl günstig bestellen – so einfach geht's",
    links: [
      { label: "Heizöl Preisvergleich", href: "/preisrechner" },
      { label: "Aktuelle Heizölpreise", href: "/preisrechner" },
      { label: "Heizöl EL Standard", href: "/preisrechner" },
      { label: "Premium-Heizöl", href: "/preisrechner" },
    ],
  },
  {
    title: "Der richtige Zeitpunkt für Ihre Bestellung",
    links: [
      { label: "Preisentwicklung", href: "/faq" },
      { label: "Heizöl im Sommer kaufen", href: "/faq" },
      { label: "Sammelbestellungen", href: "/faq" },
      { label: "Preisgarantie", href: "/faq" },
    ],
  },
  {
    title: "Lieferung und Zahlung im Überblick",
    links: [
      { label: "Lieferzeiten", href: "/lieferung-zahlung" },
      { label: "Expresslieferung", href: "/lieferung-zahlung" },
      { label: "Zahlungsarten", href: "/lieferung-zahlung" },
      { label: "Mindestbestellmenge", href: "/lieferung-zahlung" },
    ],
  },
  {
    title: "Heizöl-Wissen für Ihr Zuhause",
    links: [
      { label: "Sorten im Vergleich", href: "/heizoel-wissen#sorten" },
      { label: "Tank richtig pflegen", href: "/heizoel-wissen#tank" },
      { label: "Verbrauch senken", href: "/heizoel-wissen#verbrauch" },
      { label: "Heizöl-Glossar", href: "/heizoel-wissen#glossar" },
    ],
  },
  {
    title: "Ihr Wegweiser zu Preisen, Händlern und Beratung",
    links: [
      { label: "Preisrechner", href: "/preisrechner" },
      { label: "Händler in Ihrer Region", href: "/preisrechner" },
      { label: "Beratung", href: "/kontakt" },
      { label: "Häufige Fragen", href: "/faq" },
    ],
  },
];



export function TrustLinks() {
  return (
    <section aria-label="Weitere Heizöl-Themen" className="bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="pr-4">
            <h2 className="text-[26px] font-bold leading-[1.25] text-conditions">
              Vertrauen Sie auf Klaro – Ihr Heizöl-Preisvergleich
            </h2>
            <p className="mt-5 text-[15px] leading-[1.6] text-conditions">
              Entdecken Sie jetzt weitere Themen und Vergleichsmöglichkeiten rund um
              Heizöl, Lieferung und den besten Preis für Ihre Region.
            </p>
          </div>

          {TRUST_CARDS.map((card) => (
            <div key={card.title} className="rounded-sm bg-background px-6 py-6">
              <p className="text-[15px] leading-[1.45] text-footer-text">{card.title}</p>
              <ul className="mt-5 space-y-3">
                {card.links.map((l) => {
                  return (
                  <li key={l.label}>
                    <span
                      className="group flex items-start gap-3 text-[15px] font-semibold text-brand-deep"
                    >
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="mt-[3px] h-4 w-4 shrink-0 text-brand"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9 6l6 6-6 6" />
                      </svg>
                      <span>{l.label}</span>
                    </span>
                  </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

const FOOTER_SERVICES = [
  { label: "Hilfe", href: "/faq" },
  { label: "Kontakt", href: "/kontakt" },
  { label: "Bewertungen", href: "/bewertungen" },
  { label: "Lieferung & Zahlung", href: "/lieferung-zahlung" },
];

const FOOTER_RECHTLICHES = [
  { label: "AGB", href: "#" },
  { label: "Impressum", href: "#" },
  { label: "Datenschutz", href: "#" },
  { label: "Cookie-Einstellungen", href: "#" },
  { label: "Widerruf", href: "#" },
];

const FOOTER_AWARDS = [
  { src: ntvAward.url, alt: "ntv Gesamtsieger Heizöl-Preisvergleich 2025" },
  { src: bildAward.url, alt: "Bild Höchste Empfehlung 2026" },
  { src: weltAward.url, alt: "Die Welt Service-Champion 2025" },
  { src: dtgvAward.url, alt: "DtGV Testsieger Heizölportale" },
];

function FooterStars() {
  return (
    <span className="inline-flex gap-0.5" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 24 24" className="size-4 fill-[#f1a319]">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.45 4.73L5.82 21 12 17.27z" />
        </svg>
      ))}
    </span>
  );
}

function FooterLinkList({ items }: { items: { label: string; href: string }[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((l) => (
        <li key={l.label}>
          <span className="inline-block text-[13px] leading-5 text-footer-text">{l.label}</span>
        </li>
      ))}
    </ul>
  );
}

export function SiteFooter() {
  return (
    <>
      <CitySeo />

      <footer className="border-t border-line bg-card text-ink">
      <div className="mx-auto max-w-[1283px] px-5 py-10 md:px-[66px] md:py-12">
        <div className="grid gap-8 md:grid-cols-[1.25fr_0.9fr_0.9fr_1.15fr] md:gap-10">
          <div>
            <a href="#top" aria-label="Klaro Startseite" className="inline-block text-smava-logo">
              <Logo />
            </a>
            <p className="mt-3 max-w-[280px] text-[13px] leading-[1.5] text-footer-text">
              Heizöl online günstig bestellen. Tagesaktuelle Preise, deutschlandweite Lieferung,
              über 25.000 zufriedene Kunden.
            </p>
            <div className="mt-4 flex items-center gap-5">
              <img
                src={eKomiLogo.url}
                alt="eKomi Bewertungen"
                className="h-7 w-auto object-contain"
                loading="lazy"
              />
              <img
                src={googleIcon.url}
                alt="Google Bewertungen"
                className="h-7 w-auto object-contain"
                loading="lazy"
              />
              <img
                src={trustedShopsIcon.url}
                alt="Trusted Shops"
                className="h-7 w-auto object-contain"
                loading="lazy"
              />
            </div>
          </div>

          <nav aria-label="Services">
            <h4 className="text-[12px] font-semibold uppercase tracking-[0.08em] text-ink">
              Services
            </h4>
            <FooterLinkList items={FOOTER_SERVICES} />
          </nav>

          <nav aria-label="Rechtliches">
            <h4 className="text-[12px] font-semibold uppercase tracking-[0.08em] text-ink">
              Rechtliches
            </h4>
            <FooterLinkList items={FOOTER_RECHTLICHES} />
          </nav>

          <div>
            <h4 className="text-[12px] font-semibold uppercase tracking-[0.08em] text-ink">
              Zahlungsarten
            </h4>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <img
                src={barzahlungAsset.url}
                alt="Barzahlung"
                className="h-10 w-auto object-contain md:h-12"
                loading="lazy"
              />
              <img
                src={vorauskasseAsset.url}
                alt="Vorauskasse"
                className="h-10 w-auto object-contain md:h-12"
                loading="lazy"
              />
              <img
                src={ecKarteAsset.url}
                alt="EC-Karte"
                className="h-10 w-auto object-contain md:h-12"
                loading="lazy"
              />
            </div>
            <h4 className="mt-5 text-[12px] font-semibold uppercase tracking-[0.08em] text-ink">
              Kundenbewertung
            </h4>
            <p className="mt-2 flex items-center gap-2 text-[13px] text-footer-text">
              <FooterStars />
              <span>
                <strong className="font-semibold text-ink">4,9</strong>/5 – 25.000+ Bewertungen
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="border-y border-line bg-surface">
        <div className="mx-auto max-w-[1283px] px-5 py-8 md:px-[66px]">
          <h4 className="text-center text-[12px] font-semibold uppercase tracking-[0.12em] text-footer-text">
            Auszeichnungen &amp; Vertrauen
          </h4>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-5 md:gap-8">
            {FOOTER_AWARDS.map((a) => (
              <img
                key={a.alt}
                src={a.src}
                alt={a.alt}
                className="h-14 w-auto max-w-[130px] object-contain md:h-16 md:max-w-[150px]"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1283px] flex-col gap-2 px-5 py-4 text-[12px] text-footer-text md:flex-row md:items-center md:justify-between md:px-[66px]">
        <p>© 2026 Klaro GmbH | Heizöl online günstig bestellen</p>
        <div className="flex gap-5">
          <a href="#" className="hover:underline">
            Impressum
          </a>
          <a href="#" className="hover:underline">
            Datenschutz
          </a>
          <a href="#" className="hover:underline">
            AGB
          </a>
        </div>
      </div>
      </footer>
    </>
  );
}


export function ReferralBanner({ compact = false }: { compact?: boolean }) {
  return (
    <section aria-label="Freunde werben" className="relative bg-white">
      <div className="hidden md:block">
        <div className={`${compact ? "h-[60px]" : "h-[150px]"} bg-white`} />
        <div className="relative bg-surface">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-0 px-5">
            <div className="relative">
              <img
                src={smavaHero.url}
                alt="Klaro Beraterin mit Tablet"
                className="absolute bottom-0 left-[40px] h-[350px] w-auto object-contain object-bottom"
              />
            </div>
            <div className="-ml-32 flex min-h-[290px] flex-col justify-center py-10">
              <h2 className="text-[26px] font-bold leading-tight text-conditions">
                Jetzt Heizöl günstiger bestellen!
              </h2>
              <p className="mt-5 max-w-[540px] text-[15px] leading-[1.7] text-muted-custom">
                Schließen Sie sich <strong>25.000+ zufriedenen Kunden</strong> an und sparen Sie durchschnittlich €247
              </p>
              <div className="mt-7">
                <Button className="h-12 w-full max-w-[250px] text-[13px] font-bold !text-white shadow-md">
                  Heizölpreis berechnen
                </Button>
              </div>
              <p className="mt-4 max-w-[540px] text-[13px] leading-[1.6] text-muted-custom/70">
                Keine Anmeldung nötig • Sofortiger Preisvergleich • Garantiert günstigste Preise
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <div className={`flex justify-center bg-white ${compact ? "pt-2" : "pt-6"}`}>
          <img
            src={smavaHero.url}
            alt="Klaro Beraterin mit Tablet"
            className="h-[240px] w-auto object-contain"
          />
        </div>
        <div className="-mt-[120px] bg-surface px-5 pb-10 pt-[132px] text-center">
          <h2 className="text-[22px] font-bold leading-tight text-conditions">
            Jetzt Heizöl günstiger bestellen!
          </h2>
          <p className="mt-4 text-[15px] leading-[1.7] text-muted-custom">
            Schließen Sie sich <strong>25.000+ zufriedenen Kunden</strong> an und sparen Sie durchschnittlich €247
          </p>
          <div className="mt-6 flex justify-center">
            <Button className="h-12 w-full max-w-[280px] text-[13px] font-bold !text-white shadow-md">
              Heizölpreis berechnen
            </Button>
          </div>
          <p className="mt-4 px-2 text-[13px] leading-[1.6] text-muted-custom/70">
            Keine Anmeldung nötig • Sofortiger Preisvergleich • Garantiert günstigste Preise
          </p>
        </div>
      </div>
    </section>
  );
}

export function HeizoelServiceIntro() {
  return (
    <section className="bg-white" aria-labelledby="heizoel-service-title">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <h2
          id="heizoel-service-title"
          className="text-center text-[25px] font-bold leading-[1.25] text-conditions md:text-[30px]"
        >
          Heizölpreise heute & Heizöl online bestellen
        </h2>
        <div className="mx-auto mt-8 max-w-[920px] space-y-5 text-[16px] leading-[1.65] text-conditions">
          <p>
            klaro.de ist Deutschlands führender Online-Service für günstige Heizölpreise. Seit{" "}
            <strong>2014</strong> können Kunden bei uns Heizöl online kaufen — einfach, schnell und zum garantiert
            besten Preis. Unser Preisrechner vergleicht automatisch die Heizölpreise heute von über{" "}
            <strong>500 zertifizierten Partnerhändlern</strong> deutschlandweit und findet den optimalen
            Bestellzeitpunkt für maximale Ersparnis.
          </p>
          <p>
            Über <strong>25.000 zufriedene Kunden</strong> bewerten unseren Service mit durchschnittlich{" "}
            <strong>4,9 von 5 Sternen</strong>. Die Kundenzufriedenheit liegt bei <strong>98,9%</strong>.
            Kunden sparen durchschnittlich <strong>€247</strong> pro Heizöl-Bestellung gegenüber dem
            Marktdurchschnitt. Wir bieten eine <strong>Festpreisgarantie</strong> — Ihr Heizölpreis pro Liter
            bleibt auch bei steigenden Ölpreisen fixiert bis zur Lieferung.
          </p>
          <p>
            Heizöl bestellen war noch nie so einfach: PLZ und Menge eingeben, Preis vergleichen, online bestellen —
            ohne Registrierung in <strong>2 Minuten</strong>. Wir bieten sowohl{" "}
            <strong>Heizöl Standard</strong> (günstige Basisvariante) als auch <strong>Heizöl Premium</strong> (mit
            Additiven für geringeren Verbrauch und längere Lagerfähigkeit). Alle Preise sind{" "}
            <strong>Endpreise inklusive MwSt. und Lieferung</strong> — angegeben in <strong>€/100L</strong>.
          </p>
          <p>
            Flexible Zahlungsarten ohne Aufpreis: Barzahlung, EC-Karte, Rechnung oder Vorauskasse. Standard-Lieferzeit
            ca. <strong>7 Werktage</strong>. Bei Verspätung erhalten Sie <strong>50€ Entschädigung</strong>.{" "}
            klaro.de — Ihr vertrauenswürdiger Partner für günstiges Heizöl in ganz Deutschland.
          </p>
        </div>
      </div>
    </section>
  );
}

const REGIONAL_BUTTONS: { label: string; state: string }[] = [
  { label: "Heizölpreise Baden-Württemberg", state: "baden-wuerttemberg" },
  { label: "Heizöl Bayern kaufen", state: "bayern" },
  { label: "Heizölpreise Berlin", state: "berlin" },
  { label: "Heizöl Brandenburg bestellen", state: "brandenburg" },
  { label: "Heizölpreise Bremen", state: "bremen" },
  { label: "Heizöl Hamburg kaufen", state: "hamburg" },
  { label: "Heizölpreise Hessen", state: "hessen" },
  { label: "Heizöl Meckl.-Vorpommern", state: "mecklenburg-vorpommern" },
  { label: "Heizölpreise Niedersachsen", state: "niedersachsen" },
  { label: "Heizöl NRW kaufen", state: "nordrhein-westfalen" },
  { label: "Heizölpreise Rheinland-Pfalz", state: "rheinland-pfalz" },
  { label: "Heizöl Saarland bestellen", state: "saarland" },
  { label: "Heizölpreise Sachsen", state: "sachsen" },
  { label: "Heizöl Sachsen-Anhalt", state: "sachsen-anhalt" },
  { label: "Heizölpreise Schleswig-Holstein", state: "schleswig-holstein" },
  { label: "Heizöl Thüringen bestellen", state: "thueringen" },
];

export function RegionalSeo() {
  return (
    <section className="bg-white" aria-labelledby="regional-seo-title">
      <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
        <div className="text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-custom">
            Heizölpreise nach Region
          </p>
          <h2
            id="regional-seo-title"
            className="mt-2 text-[20px] font-semibold leading-[1.25] text-conditions md:text-[24px]"
          >
            Heizöl in Ihrem Bundesland bestellen
          </h2>
          <p className="mx-auto mt-3 max-w-[720px] text-[13px] leading-[1.7] text-muted-custom">
            Tagesaktuelle Heizölpreise für alle 16 Bundesländer — Lieferung deutschlandweit, Festpreisgarantie.
          </p>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-2 md:grid-cols-4">
          {REGIONAL_BUTTONS.map((item) => (
            <span
              key={item.label}
              title={item.label}
              className="block rounded-lg border border-line bg-card px-3.5 py-2.5 text-left text-[13px] font-medium leading-snug text-conditions"
            >
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

const CITY_LINKS: { label: string; city: string }[] = [
  { label: "Heizölpreise Berlin", city: "berlin-berlin" },
  { label: "Heizöl Hamburg kaufen", city: "hamburg-hamburg" },
  { label: "Heizölpreis München heute", city: "muenchen-bayern" },
  { label: "Heizöl Köln bestellen", city: "koeln-nordrhein-westfalen" },
  { label: "Heizölpreise Frankfurt", city: "frankfurt-am-main-hessen" },
  { label: "Heizöl Düsseldorf bestellen", city: "duesseldorf-nordrhein-westfalen" },
  { label: "Heizölpreis Dortmund heute", city: "dortmund-nordrhein-westfalen" },
  { label: "Heizöl Essen kaufen", city: "essen-nordrhein-westfalen" },
  { label: "Heizölpreise Leipzig", city: "leipzig-sachsen" },
  { label: "Heizöl Bremen bestellen", city: "bremen-bremen" },
  { label: "Heizölpreise Dresden", city: "dresden-sachsen" },
  { label: "Heizöl Hannover kaufen", city: "hannover-niedersachsen" },
  { label: "Heizölpreis Nürnberg heute", city: "nuernberg-bayern" },
  { label: "Heizöl Duisburg bestellen", city: "duisburg-nordrhein-westfalen" },
  { label: "Heizölpreise Bielefeld", city: "bielefeld-nordrhein-westfalen" },
  { label: "Heizöl Bochum bestellen", city: "bochum-nordrhein-westfalen" },
  { label: "Heizölpreise Bonn", city: "bonn-nordrhein-westfalen" },
  { label: "Heizöl Münster kaufen", city: "muenster-nordrhein-westfalen" },
  { label: "Heizölpreis Kiel heute", city: "kiel-schleswig-holstein" },
  { label: "Heizölpreise Chemnitz", city: "chemnitz-sachsen" },
];

const STATE_LINKS: { label: string; state: string }[] = [
  { label: "Heizölpreise Baden-Württemberg", state: "baden-wuerttemberg" },
  { label: "Heizöl Bayern kaufen", state: "bayern" },
  { label: "Heizölpreise Berlin", state: "berlin" },
  { label: "Heizöl Brandenburg bestellen", state: "brandenburg" },
  { label: "Heizölpreise Bremen", state: "bremen" },
  { label: "Heizöl Hamburg kaufen", state: "hamburg" },
  { label: "Heizölpreise Hessen", state: "hessen" },
  { label: "Heizöl Meckl.-Vorpommern bestellen", state: "mecklenburg-vorpommern" },
  { label: "Heizölpreise Niedersachsen", state: "niedersachsen" },
  { label: "Heizöl NRW kaufen", state: "nordrhein-westfalen" },
  { label: "Heizölpreise Rheinland-Pfalz", state: "rheinland-pfalz" },
  { label: "Heizöl Saarland bestellen", state: "saarland" },
  { label: "Heizölpreise Sachsen", state: "sachsen" },
  { label: "Heizöl Sachsen-Anhalt kaufen", state: "sachsen-anhalt" },
  { label: "Heizölpreise Schleswig-Holstein", state: "schleswig-holstein" },
  { label: "Heizöl Thüringen bestellen", state: "thueringen" },
];

const seoLinkClass =
  "block text-left text-[12px] leading-snug text-conditions transition-colors hover:text-brand md:text-[13px]";

function SeoLinkGrid({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-10 first:mt-0">
      {title ? (
        <h3 className="text-left text-[16px] font-semibold leading-[1.3] text-conditions md:text-[18px]">
          {title}
        </h3>
      ) : null}
      <div className={`grid grid-cols-4 gap-x-4 ${title ? "mt-4" : "mt-6"} gap-y-2`}>
        {children}
      </div>
    </div>
  );
}

export function CitySeo() {
  return (
    <section className="bg-surface" aria-labelledby="city-seo-title">
      <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
        <h2
          id="city-seo-title"
          className="text-left text-[20px] font-semibold leading-[1.25] text-conditions md:text-[24px]"
        >
          Heizöl &amp; Heizölpreise in deutschen Städten
        </h2>
        <SeoLinkGrid title="">
          {CITY_LINKS.map((item) => (
            <span key={item.label} title={item.label} className={seoLinkClass}>
              {item.label}
            </span>
          ))}
        </SeoLinkGrid>
        <SeoLinkGrid title="Heizölpreise nach Bundesland">
          {STATE_LINKS.map((item) => (
            <span key={item.label} title={item.label} className={seoLinkClass}>
              {item.label}
            </span>
          ))}
        </SeoLinkGrid>
      </div>
    </section>
  );
}
