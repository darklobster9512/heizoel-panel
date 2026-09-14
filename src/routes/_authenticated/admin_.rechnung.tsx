import { useQuery, useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Download, FileText, Loader2, RefreshCw, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { AdminPageShell } from "@/components/internal/admin-page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { listBrandings } from "@/lib/brandings.functions";
import { renderInvoicePdf } from "@/lib/invoice.functions";
import {
  buildInvoiceModel,
  DEMO_INVOICE_ORDER,
  euro,
  formatDate,
  INVOICE_FALLBACK_BRANDING,
  type InvoiceBranding,
} from "@/lib/invoice/invoice-data";
import { renderInvoiceHtml } from "@/lib/invoice/invoice-html";
import { listOrders, type Order } from "@/lib/orders.functions";

export const Route = createFileRoute("/_authenticated/admin_/rechnung")({
  head: () => ({
    meta: [
      { title: "Rechnung — Klaro Heizöl" },
      { name: "description", content: "Vorschau und PDF-Export der Kundenrechnung." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Rechnung — Klaro Heizöl" },
      { property: "og:description", content: "Vorschau und PDF-Export der Kundenrechnung." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: InvoicePage,
});

function customerOf(order: Order) {
  const address = order.billingAddress ?? order.deliveryAddress;
  return (
    [address.firstName, address.lastName].filter(Boolean).join(" ").trim() ||
    (address.company ?? "").trim() ||
    order.email
  );
}

function InvoicePage() {
  const fetchOrders = useServerFn(listOrders);
  const fetchBrandings = useServerFn(listBrandings);
  const createPdf = useServerFn(renderInvoicePdf);

  const orders = useQuery({ queryKey: ["orders"], queryFn: () => fetchOrders({}) });
  const brandings = useQuery({ queryKey: ["brandings"], queryFn: () => fetchBrandings({}) });

  const [orderId, setOrderId] = useState<string>("demo");
  const [brandingId, setBrandingId] = useState<string>("auto");
  const [query, setQuery] = useState("");
  const [zoom, setZoom] = useState(0.75);

  const order = useMemo<Order>(
    () => orders.data?.find((entry) => entry.id === orderId) ?? DEMO_INVOICE_ORDER,
    [orders.data, orderId],
  );

  const branding = useMemo<InvoiceBranding>(() => {
    const wanted = brandingId === "auto" ? order.brandingId : brandingId;
    const found = brandings.data?.find((entry) => entry.id === wanted);
    return found ?? INVOICE_FALLBACK_BRANDING;
  }, [brandings.data, brandingId, order.brandingId]);

  const model = useMemo(() => buildInvoiceModel(order, branding), [order, branding]);
  const html = useMemo(() => renderInvoiceHtml(model), [model]);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    const list = orders.data ?? [];
    if (!term) return list.slice(0, 60);
    return list
      .filter(
        (entry) =>
          entry.orderNumber.toLowerCase().includes(term) ||
          customerOf(entry).toLowerCase().includes(term) ||
          entry.email.toLowerCase().includes(term),
      )
      .slice(0, 60);
  }, [orders.data, query]);

  const download = useMutation({
    mutationFn: () => createPdf({ data: { model } }),
    onSuccess: (result) => {
      const binary = atob(result.base64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
      const url = URL.createObjectURL(new Blob([bytes], { type: "application/pdf" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = result.fileName;
      link.click();
      URL.revokeObjectURL(url);
    },
    onError: () => toast.error("Das PDF konnte nicht erstellt werden."),
  });

  return (
    <AdminPageShell active="invoice">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-[12px] font-semibold tracking-wide text-brand-hover uppercase">Dokumente</p>
          <h1 className="mt-1 text-[24px] font-bold text-hero-text">Rechnung</h1>
          <p className="mt-1 text-[14px] text-muted-custom">
            DIN-A4-Vorschau der Rechnung zu einer Bestellung — mit den Daten des zugehörigen Brandings.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setZoom((value) => (value === 0.75 ? 1 : 0.75))}>
            {zoom === 1 ? "100 %" : "75 %"}
          </Button>
          <Button size="sm" onClick={() => download.mutate()} disabled={download.isPending}>
            {download.isPending ? <Loader2 className="animate-spin" /> : <Download />} PDF herunterladen
          </Button>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[300px_1fr]">
        <aside className="space-y-6">
          <div className="rounded-lg border border-line bg-card p-4">
            <p className="text-[10px] font-semibold tracking-wide text-muted-custom uppercase">Bestellung</p>
            <div className="relative mt-3">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-custom" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Nummer, Name oder E-Mail"
                className="pl-9"
              />
            </div>
            <div className="mt-3 max-h-[420px] space-y-2 overflow-y-auto pr-1">
              <OptionButton
                label="Beispielrechnung"
                hint="Demo"
                active={orderId === "demo"}
                onSelect={() => setOrderId("demo")}
              />
              {orders.isPending ? (
                <p className="flex items-center gap-2 py-2 text-[13px] text-muted-custom">
                  <Loader2 className="size-4 animate-spin" /> Bestellungen werden geladen …
                </p>
              ) : null}
              {orders.isError ? (
                <Button size="sm" variant="outline" onClick={() => void orders.refetch()}>
                  <RefreshCw /> Erneut laden
                </Button>
              ) : null}
              {filtered.map((entry) => (
                <OptionButton
                  key={entry.id}
                  label={`${entry.orderNumber} · ${customerOf(entry)}`}
                  hint={`${formatDate(entry.placedAt)} · ${euro.format(entry.total)}`}
                  active={orderId === entry.id}
                  onSelect={() => setOrderId(entry.id)}
                />
              ))}
              {!orders.isPending && !orders.isError && filtered.length === 0 ? (
                <p className="py-2 text-[12px] text-muted-custom">Keine passende Bestellung gefunden.</p>
              ) : null}
            </div>
          </div>

          <div className="rounded-lg border border-line bg-card p-4">
            <p className="text-[10px] font-semibold tracking-wide text-muted-custom uppercase">Branding</p>
            <div className="mt-3 space-y-2">
              <OptionButton
                label="Automatisch"
                hint="Aus Bestellung"
                active={brandingId === "auto"}
                onSelect={() => setBrandingId("auto")}
              />
              {(brandings.data ?? []).map((entry) => (
                <OptionButton
                  key={entry.id}
                  label={entry.shopName || "Unbenannter Entwurf"}
                  hint={entry.status === "active" ? "Aktiv" : "Entwurf"}
                  active={brandingId === entry.id}
                  onSelect={() => setBrandingId(entry.id)}
                />
              ))}
            </div>
          </div>
        </aside>

        <div className="overflow-hidden rounded-lg border border-line bg-surface">
          <div className="flex items-center justify-between border-b border-line bg-card px-4 py-2.5">
            <p className="flex items-center gap-2 text-[12px] font-semibold text-conditions">
              <FileText className="size-4 text-brand-hover" /> Rechnung Nr. {model.invoiceNumber}
            </p>
            <span className="text-[11px] text-muted-custom">DIN A4 · 210 × 297 mm</span>
          </div>
          <div className="overflow-auto p-4">
            <div style={{ width: 794 * zoom, height: 1123 * zoom, margin: "0 auto" }}>
              <iframe
                title="Rechnungsvorschau"
                srcDoc={html}
                sandbox=""
                style={{
                  width: 794,
                  height: 1123,
                  border: "1px solid var(--color-line, #E5E7EB)",
                  background: "#fff",
                  transform: `scale(${zoom})`,
                  transformOrigin: "top left",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </AdminPageShell>
  );
}

function OptionButton({
  label,
  hint,
  active,
  onSelect,
}: {
  label: string;
  hint: string;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex w-full items-center justify-between gap-2 rounded-md border px-3 py-2.5 text-left transition ${active ? "border-brand bg-brand-soft" : "border-line bg-background hover:border-brand/40"}`}
    >
      <span className="min-w-0 truncate text-[13px] font-semibold text-conditions">{label}</span>
      <span className="shrink-0 text-[10px] font-bold text-muted-custom uppercase">{hint}</span>
    </button>
  );
}
