import { createFileRoute } from "@tanstack/react-router";
import { Award, BadgeCheck, Lock, ShieldCheck } from "lucide-react";

import { SiteHeader } from "@/components/landing/site-header";
import { ReferralBanner, SiteFooter } from "@/components/landing/sections";

const TITLE = "Kundenbewertungen | Klaro";
const DESCRIPTION =
  "Über 25.000 zufriedene Kunden bewerten Klaro mit 4,9 von 5 Sternen. Lesen Sie echte Erfahrungen zu Preisen, Lieferung und Service beim Heizöl-Kauf.";

export const Route = createFileRoute("/bewertungen")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
  }),
  component: BewertungenPage,
});

const STATS = [
  { value: "25.000", label: "Kunden" },
  { value: "4,9/5", label: "Bewertung" },
  { value: "98,9 %", label: "Zufriedenheit" },
  { value: "500+", label: "Händler" },
  { value: "10+", label: "Jahre Erfahrung" },
];

const REVIEWS = [
  {
    name: "Sabine Krüger",
    text: "Bestelle inzwischen zum dritten Mal über Klaro. Der Preis war jedes Mal spürbar günstiger als bei meinem örtlichen Händler, und die Lieferung kam immer zum vereinbarten Termin.",
  },
  {
    name: "Thomas Meier",
    text: "Preis eingegeben, Menge gewählt, fertig — die Bestellung war in wenigen Minuten erledigt. Der Fahrer war pünktlich und sehr freundlich. Klare Empfehlung.",
  },
  {
    name: "Julia Fischer",
    text: "Ich war anfangs skeptisch, Heizöl online zu bestellen. Aber alles hat reibungslos geklappt: von der Preisberechnung bis zur Lieferung. Beim nächsten Mal wieder.",
  },
  {
    name: "Michael Wagner",
    text: "Durch den Vergleich habe ich gegenüber meinem bisherigen Anbieter über 200 Euro gespart. Die Abwicklung war unkompliziert, die Rechnung kam litergenau.",
  },
  {
    name: "Petra Schulz",
    text: "Wir bestellen als Familie schon seit zwei Jahren hier. Immer faire Preise, immer zuverlässig. Die Sammelbestellung mit den Nachbarn hat zusätzlich gespart.",
  },
  {
    name: "Andreas Becker",
    text: "Als Handwerker bin ich auf verlässliche Lieferungen angewiesen. Klaro hat bisher jeden Termin gehalten, und der Festpreis gibt mir Planungssicherheit.",
  },
  {
    name: "Monika Lang",
    text: "Sehr übersichtliche Bestellstrecke, keine versteckten Kosten. Bezahlt habe ich bequem am Tankwagen mit EC-Karte. So einfach sollte Heizöl-Kauf immer sein.",
  },
  {
    name: "Ralf Zimmermann",
    text: "Die Lieferung kam sogar einen Tag früher als angekündigt. Preis-Leistung top, Kommunikation vorbildlich. Ich werde definitiv wieder hier bestellen.",
  },
];

const CERTS = [
  {
    icon: Award,
    title: "eKomi Gold",
    text: "Höchste Auszeichnung für Kundenzufriedenheit. Nur vergeben an Unternehmen mit mindestens 4,8/5 Sternen.",
  },
  {
    icon: Lock,
    title: "SSL-Verschlüsselung",
    text: "256-bit SSL-Verschlüsselung nach Bankstandard. Ihre Daten sind jederzeit geschützt.",
  },
  {
    icon: ShieldCheck,
    title: "DSGVO-konform",
    text: "Vollständig DSGVO-konform. Keine Datenweitergabe an Dritte.",
  },
  {
    icon: BadgeCheck,
    title: "Festpreis-Garantie",
    text: "Schriftliche Preisbindung. Ihr Preis bleibt fixiert bis zur Lieferung.",
  },
];

function Stars({ className = "size-4" }: { className?: string }) {
  return (
    <span className="inline-flex gap-0.5" aria-label="5 von 5 Sternen" role="img">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 24 24" className={`${className} fill-[#f1a319]`} aria-hidden="true">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.45 4.73L5.82 21 12 17.27z" />
        </svg>
      ))}
    </span>
  );
}

function BewertungenPage() {
  return (
    <div className="min-h-screen bg-background font-body text-ink">
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="border-b border-line" aria-labelledby="bew-title">
          <div className="bg-surface">
            <div className="mx-auto max-w-6xl px-5 py-12 text-center md:py-16">
              <h1
                id="bew-title"
                className="text-[28px] font-bold leading-tight text-conditions md:text-[36px]"
              >
                Kundenbewertungen &amp; Vertrauen
              </h1>
              <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-[1.7] text-muted-custom md:text-[16px]">
                Über{" "}
                <strong className="font-bold text-conditions">25.000 zufriedene Kunden</strong>{" "}
                bewerten uns mit{" "}
                <strong className="font-bold text-conditions">4,9 von 5 Sternen</strong>
              </p>

              <div className="mt-7 flex flex-col items-center">
                <Stars className="size-7 md:size-8" />
                <p className="mt-3 text-[34px] font-bold leading-none text-conditions md:text-[42px]">
                  4,9{" "}
                  <span className="text-[20px] font-semibold text-muted-custom md:text-[26px]">
                    / 5
                  </span>
                </p>
                <p className="mt-2.5 text-[13px] text-muted-custom md:text-[14px]">
                  Basierend auf 25.000 verifizierten Bewertungen
                </p>
              </div>
            </div>
          </div>

          {/* Grüne Trennlinie */}
          <div className="h-1 bg-brand" aria-hidden="true" />

          {/* Kennzahlen-Band */}
          <div className="bg-background">
            <dl className="mx-auto grid w-full grid-cols-2 gap-y-8 px-5 py-8 sm:grid-cols-3 md:grid-cols-5 md:divide-x md:divide-line md:py-10">
              {STATS.map((stat) => (
                <div key={stat.label} className="px-4 text-center md:px-6">
                  <dd className="text-[24px] font-bold leading-tight text-conditions md:text-[28px]">
                    {stat.value}
                  </dd>
                  <dt className="mt-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-custom md:text-xs">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Zertifizierungen & Siegel */}
        <section className="bg-background" aria-labelledby="certs-title">
          <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
            <h2
              id="certs-title"
              className="text-center text-[22px] font-bold leading-tight text-conditions md:text-[26px]"
            >
              Unsere Zertifizierungen &amp; Siegel
            </h2>
            <p className="mt-2 text-center text-[14px] text-muted-custom md:text-[15px]">
              Geprüfte Qualität und Sicherheit — von unabhängigen Instituten bestätigt
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
              {CERTS.map((cert) => (
                <div
                  key={cert.title}
                  className="rounded-xl border border-line bg-card p-5 text-center shadow-sm md:p-6"
                >
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-surface text-conditions">
                    <cert.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-[15px] font-bold text-ink md:text-[16px]">
                    {cert.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-[1.7] text-muted-custom">
                    {cert.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bewertungen */}
        <section className="border-t border-line bg-surface" aria-labelledby="reviews-title">
          <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
            <h2
              id="reviews-title"
              className="text-[22px] font-bold leading-tight text-conditions md:text-[26px]"
            >
              Das sagen unsere Kunden
            </h2>
            <p className="mt-2 text-[14px] text-muted-custom md:text-[15px]">
              Echte Erfahrungen von verifizierten Käufern
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2 md:gap-6">
              {REVIEWS.map((review) => (
                <article
                  key={review.name}
                  className="rounded-xl border border-line bg-card p-5 shadow-sm md:p-6"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-[15px] font-bold text-ink">{review.name}</h3>
                    <Stars />
                  </div>
                  <p className="mt-3 text-[13px] leading-[1.7] text-muted-custom md:text-[14px]">
                    {review.text}
                  </p>
                  <p className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-semibold text-brand">
                    <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                    Verifizierter Kauf
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <ReferralBanner compact />
      </main>
      <SiteFooter />
    </div>
  );
}
