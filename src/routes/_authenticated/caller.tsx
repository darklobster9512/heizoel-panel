import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import {
  CalendarClock,
  CheckCircle2,
  Fuel,
  Headphones,
  ListChecks,
  Loader2,
  MapPin,
  Phone,
  PhoneOff,
  Star,
} from "lucide-react";
import { useEffect } from "react";

import { InternalShell } from "@/components/internal/app-shell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getMyAccount } from "@/lib/roles.functions";

export const Route = createFileRoute("/_authenticated/caller")({
  head: () => ({
    meta: [
      { title: "Caller-Arbeitsplatz — Klaro Heizöl" },
      {
        name: "description",
        content: "Interner Arbeitsplatz für Telefonisten: Kontakte, Anrufe und Notizen.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Caller-Arbeitsplatz — Klaro Heizöl" },
      {
        property: "og:description",
        content: "Interner Arbeitsplatz für Telefonisten im Klaro Heizöl-System.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CallerPage,
});

const STATS = [
  { label: "Anrufe heute", value: "42", icon: Phone },
  { label: "Erreicht", value: "29", icon: CheckCircle2 },
  { label: "Abschlüsse", value: "7", icon: Star },
];

const QUEUE = [
  { name: "Familie Hoffmann", ort: "04109 Leipzig", menge: "2.000 L", wartet: "vor 3 Min." },
  { name: "Petra Lindner", ort: "99084 Erfurt", menge: "1.500 L", wartet: "vor 11 Min." },
  { name: "Bauer & Söhne GbR", ort: "39104 Magdeburg", menge: "5.000 L", wartet: "vor 18 Min." },
  { name: "Jens Kowalski", ort: "14467 Potsdam", menge: "1.200 L", wartet: "vor 24 Min." },
  { name: "Heike Radtke", ort: "18055 Rostock", menge: "3.500 L", wartet: "vor 31 Min." },
];

function CallerPage() {
  const navigate = useNavigate();
  const fetchAccount = useServerFn(getMyAccount);
  const { data, isPending } = useQuery({
    queryKey: ["my-account"],
    queryFn: () => fetchAccount({}),
  });

  useEffect(() => {
    if (data && data.role === null) navigate({ to: "/weiterleitung", replace: true });
  }, [data, navigate]);

  if (isPending || !data || data.role === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <Loader2 className="size-6 animate-spin text-brand" />
      </div>
    );
  }

  return (
    <InternalShell
      role={data.role === "admin" ? "Admin" : "Caller"}
      name={data.fullName ?? "Mitarbeiter"}
      email={data.email ?? ""}
      nav={[
        { label: "Arbeitsplatz", icon: <Headphones className="size-4" />, active: true },
        { label: "Meine Kontakte", icon: <ListChecks className="size-4" /> },
        { label: "Termine", icon: <CalendarClock className="size-4" /> },
        { label: "Heizölpreise", icon: <Fuel className="size-4" /> },
      ]}
    >
      <div>
        <h1 className="text-[22px] font-bold text-hero-text">Arbeitsplatz</h1>
        <p className="mt-1 text-[14px] text-muted-custom">
          Beispieldaten — Kontakte und Zahlen sind Platzhalter.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {STATS.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-line bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-muted-custom">{stat.label}</span>
              <stat.icon className="size-4 text-brand" />
            </div>
            <p className="mt-3 text-[22px] font-bold text-conditions">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <section className="space-y-6">
          <div className="rounded-xl border border-line bg-card p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="size-2 animate-pulse rounded-full bg-brand" />
              <span className="text-[11px] font-semibold tracking-wide text-brand-hover uppercase">
                Nächster Kontakt
              </span>
            </div>

            <h2 className="mt-4 text-[22px] font-bold text-hero-text">Familie Hoffmann</h2>
            <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-[14px] text-conditions">
              <span className="flex items-center gap-1.5">
                <MapPin className="size-4 text-muted-custom" /> 04109 Leipzig
              </span>
              <span className="flex items-center gap-1.5">
                <Fuel className="size-4 text-muted-custom" /> 2.000 Liter Standard
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="size-4 text-muted-custom" /> 0341 555 21 08
              </span>
            </div>

            <dl className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                ["Angefragter Preis", "128,78 €/100L"],
                ["Gesamtsumme", "2.575,60 €"],
                ["Anfrage eingegangen", "vor 3 Minuten"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border border-line bg-surface px-4 py-3">
                  <dt className="text-[12px] text-muted-custom">{label}</dt>
                  <dd className="mt-1 text-[14px] font-semibold text-conditions">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button className="h-11 bg-brand px-5 text-[14px] font-semibold text-white hover:bg-brand-hover">
                <CheckCircle2 className="size-4" />
                Erreicht
              </Button>
              <Button variant="outline" className="h-11 border-line px-5 text-conditions">
                <PhoneOff className="size-4" />
                Nicht erreicht
              </Button>
              <Button variant="outline" className="h-11 border-line px-5 text-conditions">
                <CalendarClock className="size-4" />
                Termin vereinbaren
              </Button>
            </div>
          </div>

          <div className="rounded-xl border border-line bg-card p-6 shadow-sm">
            <h3 className="text-[15px] font-bold text-conditions">Gesprächsnotiz</h3>
            <Textarea
              rows={5}
              placeholder="Was wurde besprochen? Liefertermin, Tankgröße, Rückruf …"
              className="mt-3 resize-none border-line text-[14px]"
            />
            <div className="mt-3 flex justify-end">
              <Button
                variant="outline"
                className="border-line text-[13px] text-conditions"
                size="sm"
              >
                Notiz speichern
              </Button>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-line bg-card shadow-sm">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <h2 className="text-[15px] font-bold text-conditions">Warteschlange</h2>
            <span className="text-[12px] text-muted-custom">{QUEUE.length} offen</span>
          </div>
          <ul className="divide-y divide-line">
            {QUEUE.map((item, index) => (
              <li key={item.name} className="flex items-start gap-3 px-5 py-4">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-surface text-[11px] font-bold text-muted-custom">
                  {index + 1}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[14px] font-semibold text-conditions">{item.name}</p>
                  <p className="text-[12px] text-muted-custom">
                    {item.ort} · {item.menge}
                  </p>
                  <p className="mt-0.5 text-[12px] text-muted-custom">{item.wartet}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </InternalShell>
  );
}
