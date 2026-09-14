import { Building2, FileText, Landmark, LayoutDashboard, Mail, MessageSquareText, Send, ShoppingCart } from "lucide-react";

import type { NavItem } from "@/components/internal/app-shell";

export function getAdminNav(active: "overview" | "brandings" | "bank" | "orders" | "invoice" | "emails" | "sms" | "telegram"): NavItem[] {
  return [
    { label: "Übersicht", icon: <LayoutDashboard className="size-4" />, to: "/admin", active: active === "overview" },
    { label: "Brandings", icon: <Building2 className="size-4" />, to: "/admin/brandings", active: active === "brandings" },
    { label: "Bankkonten", icon: <Landmark className="size-4" />, to: "/admin/bankkonten", active: active === "bank" },
    { label: "Bestellungen", icon: <ShoppingCart className="size-4" />, to: "/admin/bestellungen", active: active === "orders" },
    { label: "Rechnung", icon: <FileText className="size-4" />, to: "/admin/rechnung", active: active === "invoice" },
    { label: "E-Mails", icon: <Mail className="size-4" />, to: "/admin/emails", active: active === "emails" },
    { label: "SMS", icon: <MessageSquareText className="size-4" />, to: "/admin/sms", active: active === "sms" },
    { label: "Telegram", icon: <Send className="size-4" />, to: "/admin/telegram", active: active === "telegram" },
  ];
}
