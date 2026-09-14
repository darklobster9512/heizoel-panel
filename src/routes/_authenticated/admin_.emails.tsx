import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Mail, Monitor, RefreshCw, Smartphone } from "lucide-react";
import { useMemo, useState } from "react";

import { AdminPageShell } from "@/components/internal/admin-page-shell";
import { Button } from "@/components/ui/button";
import { listBrandings } from "@/lib/brandings.functions";
import { DEMO_ORDER, renderOrderConfirmationEmail, type EmailBranding } from "@/lib/email-templates/order-confirmation";

export const Route = createFileRoute("/_authenticated/admin_/emails")({
  head: () => ({ meta: [
    { title: "E-Mail-Vorlagen — Klaro Heizöl" },
    { name: "description", content: "Vorschau der Kunden-E-Mails je Branding." },
    { name: "robots", content: "noindex, nofollow" },
    { property: "og:title", content: "E-Mail-Vorlagen — Klaro Heizöl" },
    { property: "og:description", content: "Vorschau der Kunden-E-Mails je Branding." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: EmailsPage,
});

const FALLBACK: EmailBranding = {
  shopName: "Heizöl Online",
  companyName: "Muster-Energie GmbH",
  streetAddress: "Unter den Linden 16",
  postalCode: "19357",
  city: "Karstädt",
  registryCourt: "AG Neuruppin",
  commercialRegisterNumber: "10344",
  managingDirector: "Max Mustermann",
  vatId: "DE289578199",
  email: "info@heizoel-online.com",
  domain: "https://heizoel-online.com",
  logoUrl: null,
};

const TEMPLATES = [{ id: "order-confirmation", label: "Auftragsbestätigung", hint: "Wird direkt nach dem Absenden der Bestellung versendet." }] as const;

function EmailsPage() {
  const fetchBrandings = useServerFn(listBrandings);
  const { data, isPending, isError, refetch } = useQuery({ queryKey: ["brandings"], queryFn: () => fetchBrandings({}) });
  const [brandingId, setBrandingId] = useState<string>("demo");
  const [width, setWidth] = useState<"desktop" | "mobile">("desktop");

  const selected = useMemo<EmailBranding>(() => {
    const branding = data?.find((entry) => entry.id === brandingId);
    return branding ?? FALLBACK;
  }, [data, brandingId]);

  const html = useMemo(() => renderOrderConfirmationEmail(selected, DEMO_ORDER), [selected]);

  return (
    <AdminPageShell active="emails">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-[12px] font-semibold tracking-wide text-brand-hover uppercase">Kommunikation</p>
          <h1 className="mt-1 text-[24px] font-bold text-hero-text">E-Mail-Vorlagen</h1>
          <p className="mt-1 text-[14px] text-muted-custom">Vorschau der Kunden-E-Mails mit den Daten des jeweiligen Brandings.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant={width === "desktop" ? "default" : "outline"} size="sm" onClick={() => setWidth("desktop")}><Monitor /> Desktop</Button>
          <Button variant={width === "mobile" ? "default" : "outline"} size="sm" onClick={() => setWidth("mobile")}><Smartphone /> Handy</Button>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-6">
          <div className="rounded-lg border border-line bg-card p-4">
            <p className="text-[10px] font-semibold tracking-wide text-muted-custom uppercase">Vorlage</p>
            <div className="mt-3 space-y-2">
              {TEMPLATES.map((template) => (
                <div key={template.id} className="rounded-md border border-brand/40 bg-brand-soft/50 p-3">
                  <p className="flex items-center gap-2 text-[13px] font-bold text-conditions"><Mail className="size-4 text-brand-hover" /> {template.label}</p>
                  <p className="mt-1 text-[12px] text-muted-custom">{template.hint}</p>
                </div>
              ))}
              <p className="px-1 text-[11px] text-muted-custom">Weitere Vorlagen folgen.</p>
            </div>
          </div>

          <div className="rounded-lg border border-line bg-card p-4">
            <p className="text-[10px] font-semibold tracking-wide text-muted-custom uppercase">Branding</p>
            {isPending ? <p className="mt-3 flex items-center gap-2 text-[13px] text-muted-custom"><Loader2 className="size-4 animate-spin" /> Brandings werden geladen …</p> : null}
            {isError ? (
              <div className="mt-3"><p className="text-[13px] text-muted-custom">Brandings konnten nicht geladen werden.</p><Button className="mt-3" size="sm" variant="outline" onClick={() => void refetch()}><RefreshCw /> Erneut laden</Button></div>
            ) : null}
            {!isPending && !isError ? (
              <div className="mt-3 space-y-2">
                <BrandingOption label="Beispieldaten" hint="Ohne Branding" active={brandingId === "demo"} onSelect={() => setBrandingId("demo")} />
                {(data ?? []).map((branding) => (
                  <BrandingOption
                    key={branding.id}
                    label={branding.shopName || "Unbenannter Entwurf"}
                    hint={branding.status === "active" ? "Aktiv" : "Entwurf"}
                    active={brandingId === branding.id}
                    onSelect={() => setBrandingId(branding.id)}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </aside>

        <div className="overflow-hidden rounded-lg border border-line bg-surface">
          <div className="flex items-center justify-between border-b border-line bg-card px-4 py-2.5">
            <p className="text-[12px] font-semibold text-conditions">Betreff: Bestellbestätigung {DEMO_ORDER.orderNumber} — {selected.shopName ?? "Heizöl Shop"}</p>
            <span className="text-[11px] text-muted-custom">{width === "desktop" ? "640 px" : "390 px"}</span>
          </div>
          <div className="flex justify-center p-4">
            <iframe
              title="E-Mail-Vorschau"
              srcDoc={html}
              sandbox=""
              className="h-[760px] w-full rounded-md border border-line bg-white"
              style={{ maxWidth: width === "desktop" ? 680 : 390 }}
            />
          </div>
        </div>
      </div>
    </AdminPageShell>
  );
}

function BrandingOption({ label, hint, active, onSelect }: { label: string; hint: string; active: boolean; onSelect: () => void }) {
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
