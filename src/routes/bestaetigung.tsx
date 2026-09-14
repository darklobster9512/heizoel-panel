import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, CheckCircle2, Mail, MapPin, Phone, ThumbsUp } from "lucide-react";

import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/sections";
import { loadOrderConfirmation, type OrderConfirmation } from "@/lib/order-draft";
import ekomi from "@/assets/ekomi.webp.asset.json";
import trustedShops from "@/assets/trusted-shops-icon.png.asset.json";

const TITLE = "Bestellung eingegangen | Klaro";
const DESCRIPTION = "Ihre Heizölbestellung ist bei uns eingegangen. Vielen Dank für Ihren Auftrag.";

export const Route = createFileRoute("/bestaetigung")({
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
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/bestaetigung" }],
  }),
  component: BestaetigungPage,
});

const fmtEuro = (v: number) =>
  v.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtLiters = (v: number) => v.toLocaleString("de-DE");

const ADVANTAGES = [
  {
    title: "Garantiert günstigste Preise",
    text: "Direkter Handel ohne Zwischenhändler-Aufschläge.",
  },
  {
    title: "Deutschlandweite Lieferung inklusive",
    text: "Alle Lieferkosten sind bereits im Preis enthalten.",
  },
  {
    title: "100 % Käuferschutz garantiert",
    text: "Ihre Bestellung ist durch unsere Liefergarantie abgesichert.",
  },
];

function Stars({ className = "size-3.5" }: { className?: string }) {
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

function slotText(order: OrderConfirmation): string {
  const slot = order.slot;
  if (!slot) return "wird telefonisch abgestimmt";
  if (slot.period === "telefon") return "wird telefonisch abgestimmt";
  const d = new Date(`${slot.date}T00:00:00`);
  const day = Number.isNaN(d.getTime())
    ? ""
    : `${d.toLocaleDateString("de-DE", { weekday: "short" })} ${d.toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })} `;
  const period = slot.period === "vormittag" ? "8:00 - 12:00 Uhr" : "15:00 - 18:00 Uhr";
  return `${day}${period}`;
}

function BestaetigungPage() {
  const [order, setOrder] = useState<OrderConfirmation | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setOrder(loadOrderConfirmation());
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <div className="min-h-screen bg-surface font-body text-ink" />;
  }

  if (!order) {
    return (
      <div className="flex min-h-screen flex-col bg-surface font-body text-ink">
        <SiteHeader />
        <main className="flex-1 px-4 py-14">
          <div className="mx-auto max-w-md rounded-xl border border-line bg-background px-6 py-8 text-center shadow-card">
            <h1 className="text-[20px] font-bold text-conditions">Keine Bestellung gefunden</h1>
            <p className="mt-2 text-[14px] text-muted-custom">
              Hier erscheint Ihre Bestellbestätigung, sobald Sie eine Bestellung abgeschlossen haben.
            </p>
            <Link
              to="/preisrechner"
              className="mt-5 inline-flex items-center justify-center rounded-md bg-brand px-5 py-3 text-[15px] font-bold text-white shadow-cta transition-colors hover:bg-brand-hover"
            >
              Zum Preisrechner
            </Link>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const sortLabel = order.variant === "premium" ? "Heizöl Premium" : "Heizöl Standard";
  const name =
    order.delivery.salutation === "Firma"
      ? (order.delivery.company ?? "")
      : `${order.delivery.firstName} ${order.delivery.lastName}`.trim();

  return (
    <div className="flex min-h-screen flex-col bg-surface font-body text-ink">
      <SiteHeader />

      <main className="flex-1 px-4 py-10">
        <div className="mx-auto max-w-xl">
          {/* Kopf */}
          <div className="text-center">
            <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-brand text-white">
              <CheckCircle2 className="size-8" aria-hidden="true" />
            </span>
            <h1 className="mt-4 text-[26px] font-bold text-conditions md:text-[30px]">
              Bestellung eingegangen!
            </h1>
            <p className="mt-1.5 text-[14px] text-muted-custom">
              Vielen Dank für Ihre Heizölbestellung.
            </p>
            <p className="mt-3 inline-flex rounded-full border border-line bg-background px-4 py-1.5 text-[13px] text-muted-custom shadow-card">
              Bestellnr.&nbsp;<span className="font-bold text-conditions">#{order.orderNo}</span>
            </p>
          </div>

          {/* Hinweis E-Mail */}
          <div className="mt-6 flex gap-3 rounded-xl border border-brand/30 bg-brand/5 px-4 py-4">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand text-white">
              <Phone className="size-4" aria-hidden="true" />
            </span>
            <div>
              <p className="text-[15px] font-bold text-conditions">
                Fast geschafft — es kommt noch eine E-Mail
              </p>
              <p className="mt-1 text-[13px] leading-[1.6] text-hero-text">
                Ihre Bestellung ist bei uns eingegangen und wird jetzt geprüft. In wenigen Minuten
                erhalten Sie eine zweite E-Mail zur Bestätigung Ihres Liefertermins — das ist online
                in einer Minute erledigt. Nur wenn etwas unklar sein sollte, melden wir uns
                telefonisch unter <span className="font-bold text-conditions">{order.phone}</span>.
                Sie müssen sonst nichts tun.
              </p>
            </div>
          </div>

          {/* Bestellübersicht */}
          <div className="mt-4 overflow-hidden rounded-xl border border-line bg-background shadow-card">
            <div className="border-b border-line px-4 py-3.5">
              <p className="text-[15px] font-bold text-conditions">{sortLabel}</p>
              <p className="text-[13px] text-muted-custom">Ihre Bestellübersicht</p>
            </div>
            <dl className="divide-y divide-line text-[14px]">
              <div className="flex items-center justify-between px-4 py-3">
                <dt className="text-muted-custom">Menge</dt>
                <dd className="font-bold text-conditions">{fmtLiters(order.liters)} Liter</dd>
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <dt className="text-muted-custom">Preis / 100 Liter</dt>
                <dd className="font-bold text-conditions">{fmtEuro(order.pricePer100)} €</dd>
              </div>
              <div className="flex items-center justify-between gap-3 px-4 py-3">
                <dt className="text-muted-custom">Liefertermin</dt>
                <dd className="text-right font-bold text-conditions">{slotText(order)}</dd>
              </div>
              <div className="flex flex-wrap items-end justify-between gap-3 bg-surface px-4 py-4">
                <div>
                  <dt className="text-[11px] uppercase tracking-wide text-muted-custom">
                    Gesamtpreis
                  </dt>
                  <dd className="text-[24px] font-bold leading-tight text-conditions">
                    {fmtEuro(order.total)} €
                  </dd>
                  <p className="text-[12px] text-muted-custom">inkl. Lieferung &amp; MwSt.</p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] uppercase tracking-wide text-muted-custom">
                    Preisgarantie
                  </p>
                  <p className="text-[15px] font-bold text-brand">Festpreis ✓</p>
                  <p className="text-[12px] text-muted-custom">bindend bei Bestellung</p>
                </div>
              </div>
            </dl>
          </div>

          {/* Lieferort & E-Mail */}
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-line bg-background px-4 py-3.5 shadow-card">
              <p className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-muted-custom">
                <MapPin className="size-3.5" aria-hidden="true" /> Lieferort
              </p>
              <p className="mt-1.5 text-[14px] font-bold text-conditions">{name}</p>
              <p className="text-[13px] text-hero-text">
                {order.delivery.street} {order.delivery.streetNo}
              </p>
              <p className="text-[13px] text-hero-text">
                {order.delivery.plz} {order.delivery.city}
              </p>
            </div>
            <div className="rounded-xl border border-line bg-background px-4 py-3.5 shadow-card">
              <p className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-muted-custom">
                <Mail className="size-3.5" aria-hidden="true" /> Bestätigung per E-Mail
              </p>
              <p className="mt-1.5 text-[13px] text-muted-custom">geht an</p>
              <p className="break-all text-[14px] font-bold text-conditions">{order.email}</p>
              <p className="mt-1 text-[12px] text-muted-custom">
                Nicht im Posteingang? Auch den Spam-Ordner prüfen.
              </p>
            </div>
          </div>

          {/* Vertrauensband */}
          <div className="mt-4 overflow-hidden rounded-xl border border-line bg-background shadow-card">
            <p className="border-b border-line px-4 py-3 text-center text-[14px] font-bold text-conditions">
              Preis ist bindend bei Bestellung. Es entstehen keine weiteren Kosten!
            </p>
            <div className="flex items-center justify-center gap-5 px-4 py-4">
              <img src={ekomi.url} alt="eKomi Siegel" className="h-9 w-auto object-contain" />
              <img
                src={trustedShops.url}
                alt="Trusted Shops Käuferschutz"
                className="h-9 w-auto object-contain"
              />
              <div className="text-center">
                <Stars />
                <p className="text-[14px] font-bold text-conditions">4,9/5</p>
                <p className="text-[11px] text-muted-custom">25.000+ Bewertungen</p>
              </div>
            </div>
          </div>

          {/* Vorteile */}
          <div className="mt-4 rounded-xl border border-line bg-background px-4 py-4 shadow-card">
            <p className="inline-flex items-center gap-2 text-[15px] font-bold text-conditions">
              <ThumbsUp className="size-4 text-brand" aria-hidden="true" /> Ihre Vorteile
            </p>
            <ul className="mt-3 space-y-3">
              {ADVANTAGES.map((a) => (
                <li key={a.title} className="flex gap-2.5">
                  <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
                  <div>
                    <p className="text-[14px] font-bold text-conditions">{a.title}</p>
                    <p className="text-[13px] text-muted-custom">{a.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-[15px] font-bold text-white shadow-cta transition-colors hover:bg-brand-hover"
            >
              Zurück zur Startseite
            </Link>
            <Link
              to="/preisrechner"
              className="text-[14px] font-semibold text-brand underline hover:no-underline"
            >
              Heizölpreis berechnen
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
