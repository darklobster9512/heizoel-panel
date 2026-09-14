import { Building2, Fuel, LayoutDashboard, Settings, Tags, Users } from "lucide-react";

import type { NavItem } from "@/components/internal/app-shell";

export function getAdminNav(active: "overview" | "brandings"): NavItem[] {
  return [
    { label: "Übersicht", icon: <LayoutDashboard className="size-4" />, to: "/admin", active: active === "overview" },
    { label: "Brandings", icon: <Building2 className="size-4" />, to: "/admin/brandings", active: active === "brandings" },
    { label: "Anfragen", icon: <Fuel className="size-4" /> },
    { label: "Mitarbeiter", icon: <Users className="size-4" /> },
    { label: "Preise", icon: <Tags className="size-4" /> },
    { label: "Einstellungen", icon: <Settings className="size-4" /> },
  ];
}