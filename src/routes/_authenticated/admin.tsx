import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import {
  ArrowDownRight,
  ArrowUpRight,
  Building2,
  Droplets,
  Euro,
  Fuel,
  Gauge,
  Inbox,
  Loader2,
  ShoppingCart,
} from "lucide-react";
import { useEffect } from "react";

import { InternalShell } from "@/components/internal/app-shell";
import { getAdminNav } from "@/components/internal/admin-nav";
import { getAdminStats } from "@/lib/admin-stats.functions";
import { ORDER_STATUSES, ORDER_STATUS_LABEL, type OrderStatus } from "@/lib/orders.functions";
import { getMyAccount } from "@/lib/roles.functions";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin-Bereich — HEIZKING" },
      {
        name: "description",
        content: "Interne Übersicht über Bestellungen, Umsatz und Brandings im HEIZKING-System.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Admin-Bereich — HEIZKING" },
      {
        property: "og:description",
        content: "Interne Übersicht über Bestellungen, Umsatz und Brandings.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

const euro = (value: number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(value);

const numberFmt = (value: number) => new Intl.NumberFormat("de-DE").format(value);

const dateTime = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("de-DE", { dateStyle: "short", timeStyle: "short" }).format(date);
};

const STATUS_STYLE: Record<OrderStatus, string> = {
  neu: "bg-brand-soft text-brand-hover",
  mailbox: "bg-surface text-conditions",
  kein_interesse: "bg-surface text-muted-custom",
  moechte_rechnung: "bg-surface text-conditions",
  rechnung_versendet: "bg-brand-soft text-brand-hover",
  ueberwiesen: "bg-brand-soft text-brand-hover",
  angekommen: "bg-surface text-conditions",
  exchanged: "bg-surface text-muted-custom",
};

function delta(current: number, previous: number): { text: string; up: boolean } | null {
  if (previous === 0) {
    if (current === 0) return null;
    return { text: "neu", up: true };
  }
  const pct = ((current - previous) / previous) * 100;
  const rounded = Math.round(pct * 10) / 10;
  return {
    text: `${rounded > 0 ? "+" : ""}${rounded.toLocaleString("de-DE")} %`,
    up: rounded >= 0,
  };
}

function AdminPage() {
  const navigate = useNavigate();
  const fetchAccount = useServerFn(getMyAccount);
  const fetchStats = useServerFn(getAdminStats);

  const { data, isPending } = useQuery({
    queryKey: ["my-account"],
    queryFn: () => fetchAccount({}),
  });

  const isAdmin = data?.role === "admin";

  const stats = useQuery({
    queryKey: ["admin-stats"],
    queryFn: () => fetchStats({}),
    enabled: isAdmin,
  });

  useEffect(() => {
    if (data && data.role !== "admin") navigate({ to: "/weiterleitung", replace: true });
  }, [data, navigate]);

  if (isPending || !data || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <Loader2 className="size-6 animate-spin text-brand" />
      </div>
    );
  }

  const s = stats.data;
  const maxStatus = s ? Math.max(1, ...ORDER_STATUSES.map((k) => s.statusCounts[k])) : 1;

  const kpis = s
    ? [
        {
          label: "Bestellungen heute",
          value: numberFmt(s.ordersToday),
          icon: Fuel,
          delta: delta(s.ordersToday, s.ordersYesterday),
          hint: "zu gestern",
        },
        {
          label: "Bestellungen gesamt",
          value: numberFmt(s.ordersTotal),
          icon: ShoppingCart,
          delta: null,
          hint: "",
        },
        {
          label: "Umsatz (Monat)",
          value: euro(s.revenueMonth),
          icon: Euro,
          delta: delta(s.revenueMonth, s.revenuePrevMonth),
          hint: "zum Vormonat",
        },
        {
          label: "Liter (Monat)",
          value: `${numberFmt(s.litersMonth)} L`,
          icon: Droplets,
          delta: null,
          hint: "",
        },
        {
          label: "Offene Bestellungen",
          value: numberFmt(s.openOrders),
          icon: Inbox,
          delta: null,
          hint: "Status „Neu“",
        },
        {
          label: "Ø Preis / 100 L",
          value: euro(s.avgPricePer100),
          icon: Gauge,
          delta: null,
          hint: "",
        },
      ]
    : [];

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
          Live-Daten aus der Bestelldatenbank.
        </p>
      </div>

      {stats.isError ? (
        <div className="rounded-xl border border-line bg-card p-5 text-[14px] text-destructive">
          Die Kennzahlen konnten nicht geladen werden.
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.isPending || !s
          ? Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-[112px] animate-pulse rounded-xl border border-line bg-card shadow-sm"
              />
            ))
          : kpis.map((kpi) => (
              <div key={kpi.label} className="rounded-xl border border-line bg-card p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-muted-custom">{kpi.label}</span>
                  <kpi.icon className="size-4 text-brand" />
                </div>
                <p className="mt-3 text-[22px] font-bold text-conditions">{kpi.value}</p>
                {kpi.delta ? (
                  <p
                    className={`mt-1 flex items-center gap-1 text-[12px] ${kpi.delta.up ? "text-brand-hover" : "text-muted-custom"}`}
                  >
                    {kpi.delta.up ? (
                      <ArrowUpRight className="size-3.5" />
                    ) : (
                      <ArrowDownRight className="size-3.5" />
                    )}
                    {kpi.delta.text} {kpi.hint}
                  </p>
                ) : (
                  <p className="mt-1 text-[12px] text-muted-custom">{kpi.hint || "\u00a0"}</p>
                )}
              </div>
            ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <section className="overflow-hidden rounded-xl border border-line bg-card shadow-sm">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <h2 className="text-[15px] font-bold text-conditions">Letzte Bestellungen</h2>
            <Link
              to="/admin/bestellungen"
              className="text-[12px] font-semibold text-brand hover:underline"
            >
              Alle ansehen
            </Link>
          </div>
          {stats.isPending ? (
            <div className="space-y-2 p-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-9 animate-pulse rounded-md bg-surface" />
              ))}
            </div>
          ) : !s || s.recentOrders.length === 0 ? (
            <p className="px-5 py-8 text-center text-[13px] text-muted-custom">
              Noch keine Bestellungen vorhanden.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] text-left">
                <thead>
                  <tr className="border-b border-line text-[12px] tracking-wide text-muted-custom uppercase">
                    <th className="px-5 py-3 font-semibold">Datum</th>
                    <th className="px-5 py-3 font-semibold">Nr.</th>
                    <th className="px-5 py-3 font-semibold">Kunde</th>
                    <th className="px-5 py-3 font-semibold">Ort</th>
                    <th className="px-5 py-3 font-semibold">Menge</th>
                    <th className="px-5 py-3 font-semibold">Summe</th>
                    <th className="px-5 py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {s.recentOrders.map((o) => (
                    <tr key={o.id} className="border-b border-line/70 last:border-0">
                      <td className="px-5 py-3.5 text-[13px] whitespace-nowrap text-muted-custom">
                        {dateTime(o.placedAt)}
                      </td>
                      <td className="px-5 py-3.5 text-[13px] font-medium text-conditions">
                        {o.orderNumber}
                      </td>
                      <td className="px-5 py-3.5 text-[13px] text-conditions">{o.customer}</td>
                      <td className="px-5 py-3.5 text-[13px] text-conditions">{o.city}</td>
                      <td className="px-5 py-3.5 text-[13px] whitespace-nowrap text-conditions">
                        {numberFmt(o.liters)} L
                      </td>
                      <td className="px-5 py-3.5 text-[13px] font-semibold whitespace-nowrap text-conditions">
                        {euro(o.total)}
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`rounded-full px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap ${STATUS_STYLE[o.status]}`}
                        >
                          {ORDER_STATUS_LABEL[o.status]}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <div className="flex flex-col gap-6">
          <section className="rounded-xl border border-line bg-card shadow-sm">
            <div className="border-b border-line px-5 py-4">
              <h2 className="text-[15px] font-bold text-conditions">Status-Verteilung</h2>
            </div>
            <ul className="space-y-3 px-5 py-4">
              {ORDER_STATUSES.map((status) => {
                const count = s?.statusCounts[status] ?? 0;
                return (
                  <li key={status}>
                    <div className="flex items-center justify-between text-[13px]">
                      <span className="text-conditions">{ORDER_STATUS_LABEL[status]}</span>
                      <span className="font-semibold text-conditions">{numberFmt(count)}</span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full rounded-full bg-surface">
                      <div
                        className="h-1.5 rounded-full bg-brand"
                        style={{ width: `${(count / maxStatus) * 100}%` }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="rounded-xl border border-line bg-card shadow-sm">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <h2 className="text-[15px] font-bold text-conditions">Brandings</h2>
              <Link
                to="/admin/brandings"
                className="text-[12px] font-semibold text-brand hover:underline"
              >
                Verwalten
              </Link>
            </div>
            {!s || s.brandings.length === 0 ? (
              <p className="px-5 py-8 text-center text-[13px] text-muted-custom">
                Noch keine Brandings angelegt.
              </p>
            ) : (
              <ul className="divide-y divide-line">
                {s.brandings.map((b) => (
                  <li key={b.id} className="flex items-center justify-between gap-3 px-5 py-4">
                    <div className="min-w-0">
                      <p className="truncate text-[14px] font-semibold text-conditions">{b.name}</p>
                      <p className="truncate text-[12px] text-muted-custom">
                        {b.shopName ?? "—"} · {numberFmt(b.orders)} Bestellungen
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${b.status === "active" ? "bg-brand-soft text-brand-hover" : "bg-surface text-muted-custom"}`}
                    >
                      {b.status === "active" ? "Aktiv" : "Entwurf"}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex items-center gap-2 border-t border-line px-5 py-4 text-[12px] text-muted-custom">
              <Building2 className="size-3.5 text-brand" />
              {numberFmt(s?.brandings.length ?? 0)} Brandings im System
            </div>
          </section>
        </div>
      </div>
    </InternalShell>
  );
}
