import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { AdminPageShell } from "@/components/internal/admin-page-shell";
import { BrandingForm } from "@/components/internal/branding-form";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/admin_/brandings_/neu")({
  head: () => ({ meta: [
    { title: "Branding hinzufügen — Klaro Heizöl" },
    { name: "description", content: "Neues Heizöl-Shop-Branding anlegen." },
    { name: "robots", content: "noindex, nofollow" },
    { property: "og:title", content: "Branding hinzufügen — Klaro Heizöl" },
    { property: "og:description", content: "Neues Heizöl-Shop-Branding anlegen." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: NewBrandingPage,
});

function NewBrandingPage() {
  return <AdminPageShell><div><Button asChild variant="ghost" size="sm" className="-ml-3 mb-3"><a href="/admin/brandings"><ArrowLeft /> Zurück zu Brandings</a></Button><h1 className="text-[24px] font-bold text-hero-text">Branding hinzufügen</h1><p className="mt-1 text-[14px] text-muted-custom">Du kannst jederzeit unvollständig als Entwurf speichern.</p></div><BrandingForm /></AdminPageShell>;
}