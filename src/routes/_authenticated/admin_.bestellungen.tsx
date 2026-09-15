import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, RefreshCw, Save, Search, ShoppingCart } from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";

import { AdminPageShell } from "@/components/internal/admin-page-shell";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { listBrandings } from "@/lib/brandings.functions";
import {
  ORDER_STATUSES,
  ORDER_STATUS_LABEL,
  getOrder,
  listOrders,
  updateOrder,
  type Order,
  type OrderAddress,
  type OrderStatus,
} from "@/lib/orders.functions";

export const Route = createFileRoute("/_authenticated/admin_/bestellungen")({
  head: () => ({ meta: [
    { title: "Bestellungen verwalten — Klaro Heizöl" },
    { name: "description", content: "Interne Übersicht aller eingegangenen Heizöl-Bestellungen." },
    { name: "robots", content: "noindex, nofollow" },
    { property: "og:title", content: "Bestellungen verwalten — Klaro Heizöl" },
    { property: "og:description", content: "Interne Übersicht aller eingegangenen Heizöl-Bestellungen." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: OrdersPage,
});

export function formatEuro(value: number) {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(value);
}

export function formatDate(value: string | null) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("de-DE", { dateStyle: "medium" }).format(date);
}

export function customerName(order: Order) {
  const a = order.deliveryAddress;
  return [a.firstName, a.lastName].filter(Boolean).join(" ") || a.company || order.email;
}

export function slotLabel(order: Order) {
  if (order.slotPeriod === "telefon") return "Telefonisch";
  if (!order.slotDate) return "—";
  const period = order.slotPeriod === "nachmittag" ? "Nachmittag" : order.slotPeriod === "vormittag" ? "Vormittag" : "";
  return `${formatDate(order.slotDate)}${period ? ` · ${period}` : ""}`;
}

export const STATUS_STYLE: Record<OrderStatus, string> = {
  neu: "bg-brand-soft text-brand-hover",
  mailbox: "bg-surface text-conditions",
  moechte_rechnung: "bg-surface text-conditions",
  rechnung_versendet: "bg-brand-soft text-brand-hover",
  ueberwiesen: "bg-brand-soft text-brand-hover",
  angekommen: "bg-surface text-conditions",
  exchanged: "bg-surface text-muted-custom",
};

function OrdersPage() {
  const fetchOrders = useServerFn(listOrders);
  const fetchBrandings = useServerFn(listBrandings);
  const { data, isPending, isError, refetch } = useQuery({ queryKey: ["orders"], queryFn: () => fetchOrders({}) });
  const brandings = useQuery({ queryKey: ["brandings"], queryFn: () => fetchBrandings({}) });

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<OrderStatus | "alle">("alle");
  const [branding, setBranding] = useState<string>("alle");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const rows = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return (data ?? []).filter((order) => {
      if (status !== "alle" && order.status !== status) return false;
      if (branding !== "alle" && order.brandingId !== branding) return false;
      if (!needle) return true;
      return [order.orderNumber, customerName(order), order.deliveryAddress.city ?? "", order.email]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [data, search, status, branding]);

  return (
    <AdminPageShell active="orders">
      <div>
        <p className="text-[12px] font-semibold tracking-wide text-brand-hover uppercase">Vertrieb</p>
        <h1 className="mt-1 text-[24px] font-bold text-hero-text">Bestellungen</h1>
        <p className="mt-1 text-[14px] text-muted-custom">Alle über die Schnittstelle eingegangenen Bestellungen, je Branding.</p>
      </div>

      <div className="flex flex-col gap-3 rounded-lg border border-line bg-card p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-custom" />
          <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Bestellnummer, Name oder Ort suchen" className="pl-9" />
        </div>
        <select value={branding} onChange={(event) => setBranding(event.target.value)} className="h-9 rounded-md border border-line bg-background px-3 text-[13px] text-conditions">
          <option value="alle">Alle Brandings</option>
          {(brandings.data ?? []).map((item) => (
            <option key={item.id} value={item.id}>{item.shopName || item.companyName || "Unbenannt"}</option>
          ))}
        </select>
        <select value={status} onChange={(event) => setStatus(event.target.value as OrderStatus | "alle")} className="h-9 rounded-md border border-line bg-background px-3 text-[13px] text-conditions">
          <option value="alle">Alle Status</option>
          {ORDER_STATUSES.map((value) => (
            <option key={value} value={value}>{ORDER_STATUS_LABEL[value]}</option>
          ))}
        </select>
        <Button variant="outline" size="sm" onClick={() => void refetch()}><RefreshCw /> Aktualisieren</Button>
      </div>

      {isError ? (
        <div className="flex min-h-40 flex-col items-center justify-center rounded-lg border border-line bg-card text-center">
          <p className="text-sm font-semibold text-conditions">Bestellungen konnten nicht geladen werden.</p>
          <Button className="mt-4" variant="outline" onClick={() => void refetch()}><RefreshCw /> Erneut laden</Button>
        </div>
      ) : null}

      {isPending ? <div className="h-40 animate-pulse rounded-lg border border-line bg-card" /> : null}

      {!isPending && !isError && rows.length === 0 ? (
        <div className="flex min-h-64 flex-col items-center justify-center rounded-lg border border-dashed border-line bg-card px-6 text-center">
          <span className="flex size-12 items-center justify-center rounded-md bg-brand-soft text-brand-hover"><ShoppingCart /></span>
          <h2 className="mt-4 text-[17px] font-bold text-conditions">Keine Bestellungen gefunden</h2>
          <p className="mt-2 max-w-md text-[13px] text-muted-custom">Sobald das Shop-Frontend eine Bestellung an die Schnittstelle sendet, erscheint sie hier.</p>
        </div>
      ) : null}

      {rows.length > 0 ? (
        <>
          <section className="hidden overflow-hidden rounded-lg border border-line bg-card shadow-sm lg:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[960px] text-left">
                <thead>
                  <tr className="border-b border-line text-[12px] tracking-wide text-muted-custom uppercase">
                    <th className="px-4 py-3 font-semibold">Nr.</th>
                    <th className="px-4 py-3 font-semibold">Datum</th>
                    <th className="px-4 py-3 font-semibold">Branding</th>
                    <th className="px-4 py-3 font-semibold">Kunde</th>
                    <th className="px-4 py-3 font-semibold">Ort</th>
                    <th className="px-4 py-3 font-semibold">Menge</th>
                    <th className="px-4 py-3 font-semibold">Summe</th>
                    <th className="px-4 py-3 font-semibold">Zahlung</th>
                    <th className="px-4 py-3 font-semibold">Termin</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((order) => (
                    <tr
                      key={order.id}
                      onClick={() => setSelectedId(order.id)}
                      className="cursor-pointer border-b border-line/70 last:border-0 hover:bg-surface/60"
                    >
                      <td className="px-4 py-3 text-[13px] font-semibold text-conditions">{order.orderNumber}</td>
                      <td className="px-4 py-3 text-[13px] text-muted-custom">{formatDate(order.placedAt)}</td>
                      <td className="px-4 py-3 text-[13px] text-conditions">{order.brandingName ?? "—"}</td>
                      <td className="px-4 py-3 text-[13px] text-conditions">{customerName(order)}</td>
                      <td className="px-4 py-3 text-[13px] text-conditions">{[order.deliveryAddress.plz, order.deliveryAddress.city].filter(Boolean).join(" ") || "—"}</td>
                      <td className="px-4 py-3 text-[13px] text-conditions">{order.liters.toLocaleString("de-DE")} L</td>
                      <td className="px-4 py-3 text-[13px] font-semibold text-conditions">{formatEuro(order.total)}</td>
                      <td className="px-4 py-3 text-[13px] text-muted-custom">{order.paymentMethod ?? "—"}</td>
                      <td className="px-4 py-3 text-[13px] text-muted-custom">{slotLabel(order)}</td>
                      <td className="px-4 py-3"><span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${STATUS_STYLE[order.status]}`}>{ORDER_STATUS_LABEL[order.status]}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <div className="grid gap-4 lg:hidden">
            {rows.map((order) => (
              <button
                key={order.id}
                type="button"
                onClick={() => setSelectedId(order.id)}
                className="rounded-lg border border-line bg-card p-4 text-left shadow-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[14px] font-bold text-conditions">{order.orderNumber}</span>
                  <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${STATUS_STYLE[order.status]}`}>{ORDER_STATUS_LABEL[order.status]}</span>
                </div>
                <p className="mt-1 text-[13px] text-muted-custom">{formatDate(order.placedAt)} · {order.brandingName ?? "Ohne Branding"}</p>
                <p className="mt-2 text-[13px] text-conditions">{customerName(order)} · {[order.deliveryAddress.plz, order.deliveryAddress.city].filter(Boolean).join(" ")}</p>
                <p className="mt-1 text-[13px] text-conditions">{order.liters.toLocaleString("de-DE")} L · <span className="font-semibold">{formatEuro(order.total)}</span></p>
              </button>
            ))}
          </div>
        </>
      ) : null}

      <OrderDetailDialog orderId={selectedId} onClose={() => setSelectedId(null)} />
    </AdminPageShell>
  );
}

function OrderDetailDialog({ orderId, onClose }: { orderId: string | null; onClose: () => void }) {
  const fetchOrder = useServerFn(getOrder);
  const saveOrder = useServerFn(updateOrder);
  const queryClient = useQueryClient();

  const { data, isPending } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => fetchOrder({ data: { id: orderId! } }),
    enabled: Boolean(orderId),
  });

  const [status, setStatus] = useState<OrderStatus>("neu");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (data) {
      setStatus(data.status);
      setNote(data.internalNote ?? "");
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: () => saveOrder({ data: { id: orderId!, status, internalNote: note } }),
    onSuccess: () => {
      toast.success("Bestellung aktualisiert.");
      void queryClient.invalidateQueries({ queryKey: ["order", orderId] });
      void queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: () => toast.error("Bestellung konnte nicht gespeichert werden."),
  });

  return (
    <Dialog open={Boolean(orderId)} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        {isPending || !data ? (
          <>
            <DialogHeader>
              <DialogTitle>Bestellung wird geladen …</DialogTitle>
            </DialogHeader>
            <div className="h-64 animate-pulse rounded-lg border border-line bg-surface" />
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex flex-wrap items-center gap-3">
                <span>Bestellung {data.orderNumber}</span>
                <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${STATUS_STYLE[data.status]}`}>{ORDER_STATUS_LABEL[data.status]}</span>
              </DialogTitle>
              <p className="text-[13px] text-muted-custom">
                {formatDate(data.placedAt)} · {data.brandingName ?? "Ohne Branding"}
              </p>
            </DialogHeader>

            <div className="flex items-center gap-2">
              <select value={status} onChange={(event) => setStatus(event.target.value as OrderStatus)} className="h-9 rounded-md border border-line bg-background px-3 text-[13px] text-conditions">
                {ORDER_STATUSES.map((value) => (
                  <option key={value} value={value}>{ORDER_STATUS_LABEL[value]}</option>
                ))}
              </select>
              <Button size="sm" onClick={() => mutation.mutate()} disabled={mutation.isPending}>
                {mutation.isPending ? <Loader2 className="animate-spin" /> : <Save />} Speichern
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card title="Produkt & Preis">
                <Row label="Heizölart" value={data.variant === "premium" ? "Heizöl Premium" : "Heizöl Standard"} />
                <Row label="Liefermenge" value={`${data.liters.toLocaleString("de-DE")} Liter`} />
                <Row label="Lieferstellen" value={String(data.deliveryPoints)} />
                <Row label="Schlauchlänge" value={data.hose ?? "—"} />
                <Row label="Tankwagen" value={data.truck ?? "—"} />
                <Row label="Preis / 100 L" value={formatEuro(data.pricePer100)} />
                <Row label="Gesamtpreis" value={formatEuro(data.total)} strong />
                <Row label="Zahlungsart" value={data.paymentMethod ?? "—"} />
              </Card>

              <Card title="Liefertermin & Kontakt">
                <Row label="Frühestes Datum" value={formatDate(data.earliestDate)} />
                <Row label="Gewählter Termin" value={data.slotPeriod === "telefon" ? "Telefonische Absprache" : slotLabel(data)} />
                <Row label="E-Mail" value={data.email} />
                <Row label="Telefon" value={data.phone ?? "—"} />
                <Row label="Hinweise" value={data.notes ?? "—"} />
              </Card>

              <Card title="Lieferadresse"><AddressBlock address={data.deliveryAddress} /></Card>
              <Card title="Rechnungsadresse">
                {data.billingAddress ? <AddressBlock address={data.billingAddress} /> : <p className="px-5 py-4 text-[13px] text-muted-custom">Entspricht der Lieferadresse.</p>}
              </Card>
            </div>

            <section className="rounded-lg border border-line bg-card p-5 shadow-sm">
              <h2 className="text-[15px] font-bold text-conditions">Interne Notiz</h2>
              <p className="mt-1 text-[12px] text-muted-custom">Nur im Panel sichtbar, wird dem Kunden nicht angezeigt.</p>
              <Textarea className="mt-3" rows={3} value={note} onChange={(event) => setNote(event.target.value)} placeholder="z. B. Kunde telefonisch erreicht, Termin bestätigt" />
            </section>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-lg border border-line bg-card shadow-sm">
      <div className="border-b border-line px-5 py-3"><h2 className="text-[14px] font-bold text-conditions">{title}</h2></div>
      <div className="divide-y divide-line/70">{children}</div>
    </section>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4 px-5 py-2.5">
      <span className="text-[12px] tracking-wide text-muted-custom uppercase">{label}</span>
      <span className={`text-right text-[13px] ${strong ? "font-bold text-brand-hover" : "text-conditions"}`}>{value}</span>
    </div>
  );
}

function AddressBlock({ address }: { address: OrderAddress }) {
  const lines = [
    [address.salutation, address.firstName, address.lastName].filter(Boolean).join(" "),
    address.company ?? "",
    [address.street, address.streetNo].filter(Boolean).join(" "),
    [address.plz, address.city].filter(Boolean).join(" "),
  ].filter(Boolean);
  return (
    <div className="px-5 py-4">
      {lines.length > 0 ? lines.map((line) => <p key={line} className="text-[13px] text-conditions">{line}</p>) : <p className="text-[13px] text-muted-custom">Keine Angaben.</p>}
    </div>
  );
}
