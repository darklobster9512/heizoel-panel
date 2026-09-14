import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Check, Copy, Loader2, MessageSquareText, RefreshCw, Smartphone } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { listBrandings } from "@/lib/brandings.functions";
import {
  DEMO_SMS,
  SMS_FALLBACK_BRANDING,
  renderOrderConfirmationSms,
  renderOrderInvoiceSms,
  smsSegments,
  smsSender,
  type SmsBranding,
} from "@/lib/sms-templates";

type TemplateId = "order-confirmation" | "order-invoice";

const TEMPLATES: { id: TemplateId; label: string; hint: string }[] = [
  { id: "order-confirmation", label: "Bestellbestätigung", hint: "Wird direkt nach dem Absenden der Bestellung versendet." },
  { id: "order-invoice", label: "Rechnung", hint: "Verweist auf die Rechnungs-E-Mail — ohne Bankdaten in der SMS." },
];

export function SmsPanel() {
  const fetchBrandings = useServerFn(listBrandings);
  const { data, isPending, isError, refetch } = useQuery({ queryKey: ["brandings"], queryFn: () => fetchBrandings({}) });
  const [brandingId, setBrandingId] = useState<string>("demo");
  const [templateId, setTemplateId] = useState<TemplateId>("order-confirmation");
  const [copied, setCopied] = useState(false);

  const selected = useMemo<SmsBranding>(() => {
    const branding = data?.find((entry) => entry.id === brandingId);
    return branding ?? SMS_FALLBACK_BRANDING;
  }, [data, brandingId]);

  const text = useMemo(
    () => (templateId === "order-invoice" ? renderOrderInvoiceSms(selected, DEMO_SMS) : renderOrderConfirmationSms(selected, DEMO_SMS)),
    [selected, templateId],
  );

  const segments = useMemo(() => smsSegments(text), [text]);
  const sender = smsSender(selected);

  async function copyText() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-[12px] font-semibold tracking-wide text-brand-hover uppercase">Kommunikation</p>
          <h1 className="mt-1 text-[24px] font-bold text-hero-text">SMS-Vorlagen</h1>
          <p className="mt-1 text-[14px] text-muted-custom">Vorschau der Kunden-SMS mit Shopname, E-Mail und Absender des jeweiligen Brandings.</p>
        </div>
        <Button variant={copied ? "default" : "outline"} size="sm" onClick={() => void copyText()}>
          {copied ? <Check /> : <Copy />} {copied ? "Kopiert" : "Text kopieren"}
        </Button>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-6">
          <div className="rounded-lg border border-line bg-card p-4">
            <p className="text-[10px] font-semibold tracking-wide text-muted-custom uppercase">Vorlage</p>
            <div className="mt-3 space-y-2">
              {TEMPLATES.map((template) => {
                const active = templateId === template.id;
                return (
                  <button
                    key={template.id}
                    type="button"
                    onClick={() => setTemplateId(template.id)}
                    className={`w-full rounded-md border p-3 text-left transition ${active ? "border-brand/40 bg-brand-soft/50" : "border-line bg-background hover:border-brand/40"}`}
                  >
                    <p className="flex items-center gap-2 text-[13px] font-bold text-conditions"><MessageSquareText className={`size-4 ${active ? "text-brand-hover" : "text-muted-custom"}`} /> {template.label}</p>
                    <p className="mt-1 text-[12px] text-muted-custom">{template.hint}</p>
                  </button>
                );
              })}
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
            <p className="text-[12px] font-semibold text-conditions">Absender: {sender}</p>
            <span className="text-[11px] text-muted-custom">
              {text.length} Zeichen · {segments.segments} SMS (à {segments.perSegment}){segments.isGsm ? "" : " · Sonderzeichen"}
            </span>
          </div>
          <div className="flex justify-center p-6">
            <div className="w-full max-w-sm rounded-3xl border border-line bg-background p-5 shadow-sm">
              <div className="flex items-center gap-3 border-b border-line pb-3">
                <span className="flex size-9 items-center justify-center rounded-full bg-brand-soft text-brand-hover"><Smartphone className="size-4" /></span>
                <div>
                  <p className="text-[13px] font-semibold text-conditions">{sender}</p>
                  <p className="text-[11px] text-muted-custom">SMS · Beispiel-Daten</p>
                </div>
              </div>
              <div className="mt-4 rounded-2xl rounded-tl-sm bg-brand-soft px-4 py-3">
                <p className="text-[14px] leading-relaxed text-conditions">{text}</p>
              </div>
              <p className="mt-3 text-right text-[11px] text-muted-custom">Jetzt · Zugestellt</p>
            </div>
          </div>
        </div>
      </div>
    </>
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
