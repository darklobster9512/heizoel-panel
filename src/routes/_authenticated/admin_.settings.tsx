import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, Mail, MessageSquareText, Send } from "lucide-react";
import type { ReactNode } from "react";

import { AdminPageShell } from "@/components/internal/admin-page-shell";
import { EmailsPanel } from "@/components/internal/settings/emails-panel";
import { InvoicePanel } from "@/components/internal/settings/invoice-panel";
import { SmsPanel } from "@/components/internal/settings/sms-panel";
import { TelegramPanel } from "@/components/internal/settings/telegram-panel";

export type SettingsTab = "rechnung" | "emails" | "sms" | "telegram";

const TABS: { id: SettingsTab; label: string; icon: ReactNode }[] = [
  { id: "rechnung", label: "Rechnung", icon: <FileText className="size-4" /> },
  { id: "emails", label: "E-Mails", icon: <Mail className="size-4" /> },
  { id: "sms", label: "SMS", icon: <MessageSquareText className="size-4" /> },
  { id: "telegram", label: "Telegram", icon: <Send className="size-4" /> },
];

export const Route = createFileRoute("/_authenticated/admin_/settings")({
  validateSearch: (search: Record<string, unknown>): { tab: SettingsTab } => {
    const tab = search["tab"];
    return {
      tab: tab === "emails" || tab === "sms" || tab === "telegram" ? tab : "rechnung",
    };
  },
  head: () => ({
    meta: [
      { title: "Einstellungen — Klaro Heizöl" },
      { name: "description", content: "Rechnung, E-Mails, SMS und Telegram an einem Ort." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Einstellungen — Klaro Heizöl" },
      { property: "og:description", content: "Rechnung, E-Mails, SMS und Telegram an einem Ort." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { tab } = Route.useSearch();

  const subDock = (
    <>
      {TABS.map((entry) => {
        const active = entry.id === tab;
        return (
          <Link
            key={entry.id}
            to="/admin/settings"
            search={{ tab: entry.id }}
            className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-3 py-2 text-[13px] transition-colors ${
              active ? "bg-white font-semibold text-brand shadow-sm" : "text-white/90 hover:bg-white/10"
            }`}
          >
            {entry.icon}
            {entry.label}
          </Link>
        );
      })}
    </>
  );

  return (
    <AdminPageShell active="settings" subDock={subDock}>
      <div className="flex flex-wrap items-center gap-1 rounded-lg border border-line bg-card p-1.5 lg:hidden">
        {TABS.map((entry) => {
          const active = entry.id === tab;
          return (
            <Link
              key={entry.id}
              to="/admin/settings"
              search={{ tab: entry.id }}
              className={`flex items-center gap-2 rounded-md px-3.5 py-2 text-[13px] font-semibold transition-colors ${
                active ? "bg-brand-soft text-brand-hover" : "text-muted-custom hover:bg-surface"
              }`}
            >
              {entry.icon}
              {entry.label}
            </Link>
          );
        })}
      </div>

      <div className="mt-6">
        {tab === "rechnung" ? <InvoicePanel /> : null}
        {tab === "emails" ? <EmailsPanel /> : null}
        {tab === "sms" ? <SmsPanel /> : null}
        {tab === "telegram" ? <TelegramPanel /> : null}
      </div>
    </AdminPageShell>
  );
}
