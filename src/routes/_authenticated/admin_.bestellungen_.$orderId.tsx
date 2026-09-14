import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";

import { AdminPageShell } from "@/components/internal/admin-page-shell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  ORDER_STATUSES,
  ORDER_STATUS_LABEL,
  getOrder,
  updateOrder,
  type OrderAddress,
  type OrderStatus,
} from "@/lib/orders.functions";

export const Route = createFileRoute("/_authenticated/admin_/bestellungen_/$orderId")({
  head: () => ({ meta: [
    { title: "Bestellung ansehen — Klaro Heizöl" },
    { name: "description", content: "Detailansicht einer eingegangenen Heizöl-Bestellung." },
    { name: "robots", content: "noindex, nofollow" },
    { property: "og:title", content: "Bestellung ansehen — Klaro Heizöl" },
    { property: "og:description", content: "Detailansicht einer eingegangenen Heizöl-Bestellung." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: OrderDetailPage,
});

const euro = (value: number) => new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(value);
const date = (value: string | null) => {
  if (!value) return "—";
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? value : new Intl.DateTimeFormat("de-DE", { dateStyle: "medium" }).format(parsed);
};

function OrderDetailPage() {
  const { orderId } = Route.useParams();
  const fetchOrder = useServerFn(getOrder);
  const saveOrder = useServerFn(updateOrder);
  const queryClient = useQueryClient();

  const { data, isPending } = useQuery({ queryKey: ["order", orderId], queryFn: () => fetchOrder({ data: { id: orderId } }) });

  const [status, setStatus] = useState<OrderStatus>("neu");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (data) {
      setStatus(data.status);
      setNote(data.internalNote ?? "");
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: () => saveOrder({ data: { id: orderId, status, internalNote: note } }),
    onSuccess: () => {
      toast.success("Bestellung aktualisiert.");
      void queryClient.invalidateQueries({ queryKey: ["order", orderId] });
      void queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: () => toast.error("Bestellung konnte nicht gespeichert werden."),
  });

  return (
    <AdminPageShell active="orders">
      <Button asChild variant="ghost" size="sm" className="w-fit">
        <Link to="/admin/bestellungen"><ArrowLeft /> Zurück zur Übersicht</Link>
      </Button>

      {isPending ? <div className="h-64 animate-pulse rounded-lg border border-line bg-card" /> : null}
      {!isPending && !data ? <p className="text-[14px] text-muted-custom">Diese Bestellung existiert nicht (mehr).</p> : null}

      {data ? (
        <>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-[12px] font-semibold tracking-wide text-brand-hover uppercase">Bestellung</p>
              <h1 className="mt-1 text-[24px] font-bold text-hero-text">{data.orderNumber}</h1>
              <p className="mt-1 text-[14px] text-muted-custom">
                {date(data.placedAt)} · {data.brandingName ?? "Ohne Branding"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <select value={status} onChange={(event) => setStatus(event.target.value as OrderStatus)} className="h-9 rounded-md border border-line bg-background px-3 text-[13px] text-conditions">
                {ORDER_STATUSES.map((value) => (
                  <option key={value} value={value}>{ORDER_STATUS_LABEL[value]}</option>
                ))}
              </select>
              <Button onClick={() => mutation.mutate()} disabled={mutation.isPending}>
                {mutation.isPending ? <Loader2 className="animate-spin" /> : <Save />} Speichern
              </Button>
            </div>
          </div>

          <div className="grid gap-5 xl:grid-cols-2">
            <Card title="Produkt & Preis">
              <Row label="Heizölart" value={data.variant === "premium" ? "Heizöl Premium" : "Heizöl Standard"} />
              <Row label="Liefermenge" value={`${data.liters.toLocaleString("de-DE")} Liter`} />
              <Row label="Lieferstellen" value={String(data.deliveryPoints)} />
              <Row label="Schlauchlänge" value={data.hose ?? "—"} />
              <Row label="Tankwagen" value={data.truck ?? "—"} />
              <Row label="Preis / 100 L" value={euro(data.pricePer100)} />
              <Row label="Gesamtpreis" value={euro(data.total)} strong />
              <Row label="Zahlungsart" value={data.paymentMethod ?? "—"} />
            </Card>

            <Card title="Liefertermin & Kontakt">
              <Row label="Frühestes Datum" value={date(data.earliestDate)} />
              <Row label="Gewählter Termin" value={data.slotPeriod === "telefon" ? "Telefonische Absprache" : `${date(data.slotDate)}${data.slotPeriod ? ` · ${data.slotPeriod === "nachmittag" ? "Nachmittag" : "Vormittag"}` : ""}`} />
              <Row label="E-Mail" value={data.email} />
              <Row label="Telefon" value={data.phone ?? "—"} />
              <Row label="Hinweise" value={data.notes ?? "—"} />
            </Card>

            <Card title="Lieferadresse"><AddressBlock address={data.deliveryAddress} /></Card>
            <Card title="Rechnungsadresse">
              {data.billingAddress ? <AddressBlock address={data.billingAddress} /> : <p className="text-[13px] text-muted-custom">Entspricht der Lieferadresse.</p>}
            </Card>
          </div>

          <section className="rounded-lg border border-line bg-card p-5 shadow-sm">
            <h2 className="text-[15px] font-bold text-conditions">Interne Notiz</h2>
            <p className="mt-1 text-[12px] text-muted-custom">Nur im Panel sichtbar, wird dem Kunden nicht angezeigt.</p>
            <Textarea className="mt-3" rows={4} value={note} onChange={(event) => setNote(event.target.value)} placeholder="z. B. Kunde telefonisch erreicht, Termin bestätigt" />
          </section>
        </>
      ) : null}
    </AdminPageShell>
  );
}

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-lg border border-line bg-card shadow-sm">
      <div className="border-b border-line px-5 py-4"><h2 className="text-[15px] font-bold text-conditions">{title}</h2></div>
      <div className="divide-y divide-line/70">{children}</div>
    </section>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4 px-5 py-3">
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
