import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Building2, Check, Copy, Edit3, Globe2, Mail, MapPin, MessageSquare, Plus, RefreshCw } from "lucide-react";
import type { ReactNode } from "react";
import { toast } from "sonner";

import { AdminPageShell } from "@/components/internal/admin-page-shell";
import { Button } from "@/components/ui/button";
import { listBrandings } from "@/lib/brandings.functions";

export const Route = createFileRoute("/_authenticated/admin_/brandings")({
  head: () => ({ meta: [
    { title: "Brandings verwalten — Klaro Heizöl" },
    { name: "description", content: "Interne Verwaltung der Heizöl-Shop-Brandings." },
    { name: "robots", content: "noindex, nofollow" },
    { property: "og:title", content: "Brandings verwalten — Klaro Heizöl" },
    { property: "og:description", content: "Interne Verwaltung der Heizöl-Shop-Brandings." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: BrandingsPage,
});

function BrandingsPage() {
  const fetchBrandings = useServerFn(listBrandings);
  const { data, isPending, isError, refetch } = useQuery({ queryKey: ["brandings"], queryFn: () => fetchBrandings({}) });

  return (
    <AdminPageShell>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div><p className="text-[12px] font-semibold tracking-wide text-brand-hover uppercase">Mandantenverwaltung</p><h1 className="mt-1 text-[24px] font-bold text-hero-text">Brandings</h1><p className="mt-1 text-[14px] text-muted-custom">Heizöl-Shops, Firmendaten und Versandkonfigurationen zentral verwalten.</p></div>
        <Button asChild><Link to="/admin/brandings/neu"><Plus /> Branding hinzufügen</Link></Button>
      </div>

      {isPending ? <div className="grid gap-5 md:grid-cols-2"><LoadingCard /><LoadingCard /></div> : null}
      {isError ? <div className="flex min-h-56 flex-col items-center justify-center rounded-lg border border-line bg-card text-center"><p className="text-sm font-semibold text-conditions">Brandings konnten nicht geladen werden.</p><Button className="mt-4" variant="outline" onClick={() => void refetch()}><RefreshCw /> Erneut laden</Button></div> : null}
      {!isPending && !isError && data?.length === 0 ? (
        <div className="flex min-h-80 flex-col items-center justify-center rounded-lg border border-dashed border-line bg-card px-6 text-center"><span className="flex size-12 items-center justify-center rounded-md bg-brand-soft text-brand-hover"><Building2 /></span><h2 className="mt-4 text-[17px] font-bold text-conditions">Noch kein Branding angelegt</h2><p className="mt-2 max-w-md text-[13px] text-muted-custom">Lege den ersten Shop als Entwurf an. Die öffentliche ID wird automatisch erzeugt.</p><Button asChild className="mt-5"><Link to="/admin/brandings/neu"><Plus /> Erstes Branding anlegen</Link></Button></div>
      ) : null}
      {data && data.length > 0 ? (
        <div className="grid gap-5 xl:grid-cols-2">
          {data.map((branding) => (
            <article key={branding.id} className="overflow-hidden rounded-lg border border-line bg-card shadow-sm">
              <div className="flex items-start gap-4 border-b border-line p-5">
                <div className="flex size-16 shrink-0 items-center justify-center rounded-md border border-line bg-surface">
                  {branding.logoUrl ? <img src={branding.logoUrl} alt={`${branding.shopName ?? "Shop"} Logo`} className="h-full w-full object-contain p-2" /> : <Building2 className="size-6 text-muted-custom" />}
                </div>
                <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h2 className="truncate text-[17px] font-bold text-conditions">{branding.shopName || "Unbenannter Entwurf"}</h2><span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${branding.status === "active" ? "bg-brand-soft text-brand-hover" : "bg-surface text-muted-custom"}`}>{branding.status === "active" ? "Aktiv" : "Entwurf"}</span></div><p className="mt-1 truncate text-[13px] text-muted-custom">{branding.companyName || "Unternehmensname noch offen"}</p></div>
              </div>
              <div className="grid gap-4 p-5 sm:grid-cols-2">
                <Info icon={<MapPin />} label="Anschrift" value={[branding.streetAddress, [branding.postalCode, branding.city].filter(Boolean).join(" ")].filter(Boolean).join(", ") || "Noch nicht hinterlegt"} />
                <Info icon={<Globe2 />} label="Domain" value={branding.domain || "Noch nicht hinterlegt"} />
                <Info icon={<Mail />} label="Resend" value={branding.resendApiKey ? "Konfiguriert" : "Nicht konfiguriert"} success={Boolean(branding.resendApiKey)} />
                <Info icon={<MessageSquare />} label="Seven.io" value={branding.sevenApiKey ? "Konfiguriert" : "Nicht konfiguriert"} success={Boolean(branding.sevenApiKey)} />
              </div>
              <div className="border-t border-line bg-surface/60 px-5 py-4"><p className="text-[10px] font-semibold tracking-wide text-muted-custom uppercase">Public Branding ID</p><div className="mt-1.5 flex items-center gap-2"><code className="min-w-0 flex-1 truncate text-[12px] text-conditions">{branding.publicId}</code><Button size="icon" variant="ghost" title="Branding-ID kopieren" aria-label="Branding-ID kopieren" onClick={() => { void navigator.clipboard.writeText(branding.publicId); toast.success("Branding-ID kopiert."); }}><Copy /></Button></div></div>
              <div className="flex items-center justify-between border-t border-line px-5 py-3"><span className="text-[11px] text-muted-custom">Geändert {new Intl.DateTimeFormat("de-DE", { dateStyle: "medium", timeStyle: "short" }).format(new Date(branding.updatedAt))}</span><Button asChild variant="outline" size="sm"><Link to="/admin/brandings/$brandingId" params={{ brandingId: branding.id }}><Edit3 /> Bearbeiten</Link></Button></div>
            </article>
          ))}
        </div>
      ) : null}
    </AdminPageShell>
  );
}

function Info({ icon, label, value, success }: { icon: ReactNode; label: string; value: string; success?: boolean }) {
  return <div className="flex min-w-0 gap-3 text-muted-custom"><span className="mt-0.5 [&>svg]:size-4">{icon}</span><div className="min-w-0"><p className="text-[10px] font-semibold tracking-wide uppercase">{label}</p><p className={`mt-1 truncate text-[13px] ${success ? "text-brand-hover" : "text-conditions"}`}>{success ? <Check className="mr-1 inline size-3" /> : null}{value}</p></div></div>;
}

function LoadingCard() { return <div className="h-80 animate-pulse rounded-lg border border-line bg-card" />; }