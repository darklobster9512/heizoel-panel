import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import {
  ArrowDownRight,
  ArrowUpRight,
  Euro,
  Fuel,
  Loader2,
  Phone,
  Tags,
} from "lucide-react";
import { useEffect } from "react";

import { InternalShell } from "@/components/internal/app-shell";
import { getAdminNav } from "@/components/internal/admin-nav";
import { getMyAccount } from "@/lib/roles.functions";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin-Bereich — Klaro Heizöl" },
      {
        name: "description",
        content: "Interne Übersicht über Anfragen, Team und Preise im Klaro Heizöl-System.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Admin-Bereich — Klaro Heizöl" },
      {
        property: "og:description",
        content: "Interne Übersicht über Anfragen, Team und Preise.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

const KPIS = [
  { label: "Anfragen heute", value: "148", delta: "+12,4 %", up: true, icon: Fuel },
  { label: "Offene Angebote", value: "37", delta: "-4,1 %", up: false, icon: Tags },
  { label: "Umsatz (Monat)", value: "412.980 €", delta: "+8,9 %", up: true, icon: Euro },
  { label: "Ø Literpreis", value: "128,78 €/100L", delta: "-1,2 %", up: false, icon: Euro },
];

const REQUESTS = [
  {
    id: "#A-10482",
    plz: "01067 Dresden",
    menge: "3.000 L",
    preis: "3.863,40 €",
    status: "Neu",
    caller: "—",
  },
  {
    id: "#A-10481",
    plz: "04109 Leipzig",
    menge: "1.500 L",
    preis: "1.945,20 €",
    status: "In Bearbeitung",
    caller: "S. Wagner",
  },
  {
    id: "#A-10480",
    plz: "99084 Erfurt",
    menge: "2.500 L",
    preis: "3.212,50 €",
    status: "Angebot raus",
    caller: "M. Keller",
  },
  {
    id: "#A-10479",
    plz: "80331 München",
    menge: "5.000 L",
    preis: "6.401,00 €",
    status: "Abgeschlossen",
    caller: "S. Wagner",
  },
  {
    id: "#A-10478",
    plz: "30159 Hannover",
    menge: "1.800 L",
    preis: "2.318,04 €",
    status: "Kein Interesse",
    caller: "L. Brandt",
  },
];

const STATUS_STYLES: Record<string, string> = {
  Neu: "bg-brand-soft text-brand-hover",
  "In Bearbeitung": "bg-surface text-conditions",
  "Angebot raus": "bg-surface text-conditions",
  Abgeschlossen: "bg-brand-soft text-brand-hover",
  "Kein Interesse": "bg-surface text-muted-custom",
};

const TEAM = [
  { name: "Sarah Wagner", role: "Caller", calls: 42, status: "Online" },
  { name: "Marco Keller", role: "Caller", calls: 38, status: "Im Gespräch" },
  { name: "Lena Brandt", role: "Caller", calls: 27, status: "Pause" },
  { name: "Tom Ziegler", role: "Admin", calls: 0, status: "Online" },
];

function AdminPage() {
  const navigate = useNavigate();
  const fetchAccount = useServerFn(getMyAccount);
  const { data, isPending } = useQuery({
    queryKey: ["my-account"],
    queryFn: () => fetchAccount({}),
  });

  useEffect(() => {
    if (data && data.role !== "admin") navigate({ to: "/weiterleitung", replace: true });
  }, [data, navigate]);

  if (isPending || !data || data.role !== "admin") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <Loader2 className="size-6 animate-spin text-brand" />
      </div>
    );
  }

  return (
    <InternalShell
      role="Admin"
      name={data.fullName ?? "Admin"}
      email={data.email ?? ""}
      nav={getAdminNav("overview")}
    >
      <div>
        <h1 className="text-[22px] font-bold text-hero-text">Übersicht</h1>
        <p className="mt-1 text-[14px] text-muted-custom">
          Beispieldaten — Stand heute, 10:30 Uhr. Alle Werte sind Platzhalter.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {KPIS.map((kpi) => (
          <div key={kpi.label} className="rounded-xl border border-line bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-muted-custom">{kpi.label}</span>
              <kpi.icon className="size-4 text-brand" />
            </div>
            <p className="mt-3 text-[22px] font-bold text-conditions">{kpi.value}</p>
            <p
              className={`mt-1 flex items-center gap-1 text-[12px] ${kpi.up ? "text-brand-hover" : "text-muted-custom"}`}
            >
              {kpi.up ? (
                <ArrowUpRight className="size-3.5" />
              ) : (
                <ArrowDownRight className="size-3.5" />
              )}
              {kpi.delta} zur Vorwoche
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <section className="overflow-hidden rounded-xl border border-line bg-card shadow-sm">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <h2 className="text-[15px] font-bold text-conditions">Letzte Anfragen</h2>
            <span className="text-[12px] text-muted-custom">5 von 148</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left">
              <thead>
                <tr className="border-b border-line text-[12px] tracking-wide text-muted-custom uppercase">
                  <th className="px-5 py-3 font-semibold">Nr.</th>
                  <th className="px-5 py-3 font-semibold">Ort</th>
                  <th className="px-5 py-3 font-semibold">Menge</th>
                  <th className="px-5 py-3 font-semibold">Summe</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold">Caller</th>
                </tr>
              </thead>
              <tbody>
                {REQUESTS.map((r) => (
                  <tr key={r.id} className="border-b border-line/70 last:border-0">
                    <td className="px-5 py-3.5 text-[13px] font-medium text-conditions">{r.id}</td>
                    <td className="px-5 py-3.5 text-[13px] text-conditions">{r.plz}</td>
                    <td className="px-5 py-3.5 text-[13px] text-conditions">{r.menge}</td>
                    <td className="px-5 py-3.5 text-[13px] font-semibold text-conditions">
                      {r.preis}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${STATUS_STYLES[r.status]}`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-[13px] text-muted-custom">{r.caller}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-xl border border-line bg-card shadow-sm">
          <div className="border-b border-line px-5 py-4">
            <h2 className="text-[15px] font-bold text-conditions">Team</h2>
          </div>
          <ul className="divide-y divide-line">
            {TEAM.map((member) => (
              <li key={member.name} className="flex items-center justify-between px-5 py-4">
                <div>
                  <p className="text-[14px] font-semibold text-conditions">{member.name}</p>
                  <p className="text-[12px] text-muted-custom">
                    {member.role}
                    {member.role === "Caller" ? ` · ${member.calls} Anrufe heute` : ""}
                  </p>
                </div>
                <span className="flex items-center gap-1.5 text-[12px] text-muted-custom">
                  <span
                    className={`size-2 rounded-full ${member.status === "Pause" ? "bg-line" : "bg-brand"}`}
                  />
                  {member.status}
                </span>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2 border-t border-line px-5 py-4 text-[12px] text-muted-custom">
            <Phone className="size-3.5 text-brand" />
            107 Anrufe im Team heute
          </div>
        </section>
      </div>
    </InternalShell>
  );
}
