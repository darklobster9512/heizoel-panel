import { createFileRoute } from "@tanstack/react-router";

import { AdminPageShell } from "@/components/internal/admin-page-shell";
import { EmailsPanel } from "@/components/internal/settings/emails-panel";
import { InvoicePanel } from "@/components/internal/settings/invoice-panel";
import {
  SettingsMobileTabs,
  SettingsSubDock,
  type SettingsTab,
} from "@/components/internal/settings/settings-dock";
import { SmsPanel } from "@/components/internal/settings/sms-panel";
import { TelegramPanel } from "@/components/internal/settings/telegram-panel";

export type { SettingsTab };

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

  return (
    <AdminPageShell active="settings" subDock={<SettingsSubDock active={tab} />}>
      <SettingsMobileTabs active={tab} />

      <div className="mt-6">
        {tab === "rechnung" ? <InvoicePanel /> : null}
        {tab === "emails" ? <EmailsPanel /> : null}
        {tab === "sms" ? <SmsPanel /> : null}
        {tab === "telegram" ? <TelegramPanel /> : null}
      </div>
    </AdminPageShell>
  );
}
