import { Link } from "@tanstack/react-router";
import { FileText, Headphones, Mail, MessageSquareText, Send } from "lucide-react";
import type { ReactNode } from "react";

export type SettingsTab = "rechnung" | "emails" | "sms" | "telegram";
export type SettingsSection = SettingsTab | "caller";

const TABS: { id: SettingsTab; label: string; icon: ReactNode }[] = [
  { id: "rechnung", label: "Rechnung", icon: <FileText className="size-4" /> },
  { id: "emails", label: "E-Mails", icon: <Mail className="size-4" /> },
  { id: "sms", label: "SMS", icon: <MessageSquareText className="size-4" /> },
  { id: "telegram", label: "Telegram", icon: <Send className="size-4" /> },
];

const CALLER_TAB = { label: "Caller", icon: <Headphones className="size-4" /> };

export function SettingsSubDock({ active }: { active: SettingsSection }) {
  const className = (isActive: boolean) =>
    `flex items-center gap-2 whitespace-nowrap rounded-xl px-3 py-2 text-[13px] transition-colors ${
      isActive ? "bg-white font-semibold text-brand shadow-sm" : "text-white/90 hover:bg-white/10"
    }`;

  return (
    <>
      {TABS.map((entry) => (
        <Link
          key={entry.id}
          to="/admin/settings"
          search={{ tab: entry.id }}
          className={className(entry.id === active)}
        >
          {entry.icon}
          {entry.label}
        </Link>
      ))}
      <Link to="/admin/caller" className={className(active === "caller")}>
        {CALLER_TAB.icon}
        {CALLER_TAB.label}
      </Link>
    </>
  );
}

export function SettingsMobileTabs({ active }: { active: SettingsSection }) {
  const className = (isActive: boolean) =>
    `flex items-center gap-2 rounded-md px-3.5 py-2 text-[13px] font-semibold transition-colors ${
      isActive ? "bg-brand-soft text-brand-hover" : "text-muted-custom hover:bg-surface"
    }`;

  return (
    <div className="flex flex-wrap items-center gap-1 rounded-lg border border-line bg-card p-1.5 lg:hidden">
      {TABS.map((entry) => (
        <Link
          key={entry.id}
          to="/admin/settings"
          search={{ tab: entry.id }}
          className={className(entry.id === active)}
        >
          {entry.icon}
          {entry.label}
        </Link>
      ))}
      <Link to="/admin/caller" className={className(active === "caller")}>
        {CALLER_TAB.icon}
        {CALLER_TAB.label}
      </Link>
    </div>
  );
}
