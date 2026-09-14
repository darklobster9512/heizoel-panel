import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, Loader2 } from "lucide-react";

import { AdminPageShell } from "@/components/internal/admin-page-shell";
import { BrandingForm } from "@/components/internal/branding-form";
import { Button } from "@/components/ui/button";
import { getBranding } from "@/lib/brandings.functions";

export const Route = createFileRoute("/_authenticated/admin_/brandings_/$brandingId")({
  head: () => ({ meta: [
    { title: "Branding bearbeiten — Klaro Heizöl" },
    { name: "description", content: "Heizöl-Shop-Branding bearbeiten." },
    { name: "robots", content: "noindex, nofollow" },
    { property: "og:title", content: "Branding bearbeiten — Klaro Heizöl" },
    { property: "og:description", content: "Heizöl-Shop-Branding bearbeiten." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: EditBrandingPage,
});

function EditBrandingPage() {
  const { brandingId } = Route.useParams();
  const fetchBranding = useServerFn(getBranding);
  const { data, isPending } = useQuery({ queryKey: ["branding", brandingId], queryFn: () => fetchBranding({ data: { id: brandingId } }) });
  if (isPending) return <AdminPageShell><div className="flex min-h-72 items-center justify-center"><Loader2 className="size-6 animate-spin text-brand" /></div></AdminPageShell>;
  if (!data) throw notFound();
  return <AdminPageShell><div><Button asChild variant="ghost" size="sm" className="-ml-3 mb-3"><Link to="/admin/brandings"><ArrowLeft /> Zurück zu Brandings</Link></Button><div className="flex flex-wrap items-center gap-3"><h1 className="text-[24px] font-bold text-hero-text">Branding bearbeiten</h1><span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${data.status === "active" ? "bg-brand-soft text-brand-hover" : "bg-surface text-muted-custom"}`}>{data.status === "active" ? "Aktiv" : "Entwurf"}</span></div><p className="mt-1 text-[14px] text-muted-custom">Firmendaten, Logo und Versandkonfiguration aktualisieren.</p></div><BrandingForm branding={data} /></AdminPageShell>;
}