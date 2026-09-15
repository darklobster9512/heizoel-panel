import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Headphones, KeyRound, Loader2, Trash2, UserPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { AdminPageShell } from "@/components/internal/admin-page-shell";
import { SettingsMobileTabs, SettingsSubDock } from "@/components/internal/settings/settings-dock";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  createCallerAccount,
  deleteCallerAccount,
  listCallerAccounts,
  resetCallerPassword,
  type CallerAccount,
} from "@/lib/caller-accounts.functions";

export const Route = createFileRoute("/_authenticated/admin_/caller")({
  head: () => ({
    meta: [
      { title: "Caller-Konten — Klaro Heizöl" },
      { name: "description", content: "Mitarbeiter-Konten mit Caller-Rang anlegen und verwalten." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Caller-Konten — Klaro Heizöl" },
      { property: "og:description", content: "Mitarbeiter-Konten mit Caller-Rang anlegen und verwalten." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CallerAccountsPage,
});

function errorText(error: unknown, fallback: string) {
  return error instanceof Error && error.message ? error.message : fallback;
}

function CallerAccountsPage() {
  const queryClient = useQueryClient();
  const fetchAccounts = useServerFn(listCallerAccounts);
  const createAccount = useServerFn(createCallerAccount);
  const removeAccount = useServerFn(deleteCallerAccount);

  const accounts = useQuery({ queryKey: ["caller-accounts"], queryFn: () => fetchAccounts({}) });

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [resetFor, setResetFor] = useState<CallerAccount | null>(null);

  const create = useMutation({
    mutationFn: () => createAccount({ data: { email, password, fullName: fullName || undefined } }),
    onSuccess: () => {
      toast.success("Caller-Konto angelegt");
      setEmail("");
      setFullName("");
      setPassword("");
      void queryClient.invalidateQueries({ queryKey: ["caller-accounts"] });
    },
    onError: (error) => toast.error(errorText(error, "Konto konnte nicht angelegt werden.")),
  });

  const remove = useMutation({
    mutationFn: (userId: string) => removeAccount({ data: { userId } }),
    onSuccess: () => {
      toast.success("Konto gelöscht");
      void queryClient.invalidateQueries({ queryKey: ["caller-accounts"] });
    },
    onError: (error) => toast.error(errorText(error, "Konto konnte nicht gelöscht werden.")),
  });

  const rows = accounts.data ?? [];

  return (
    <AdminPageShell active="settings" subDock={<SettingsSubDock active="caller" />}>
      <SettingsMobileTabs active="caller" />

      <div>
        <p className="text-[12px] font-semibold tracking-wide text-brand-hover uppercase">Team</p>
        <h1 className="mt-1 text-[24px] font-bold text-hero-text">Caller-Konten</h1>
        <p className="mt-1 text-[14px] text-muted-custom">
          Caller melden sich mit E-Mail und Passwort an und sehen im Panel ausschließlich die Bestellungen.
        </p>
      </div>

      <section className="rounded-lg border border-line bg-card p-5 shadow-sm">
        <h2 className="text-[15px] font-bold text-conditions">Neues Caller-Konto</h2>
        <form
          className="mt-4 grid gap-3 sm:grid-cols-3"
          onSubmit={(event) => {
            event.preventDefault();
            create.mutate();
          }}
        >
          <div>
            <label className="text-[12px] font-semibold text-muted-custom" htmlFor="caller-email">E-Mail</label>
            <Input
              id="caller-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@firma.de"
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-[12px] font-semibold text-muted-custom" htmlFor="caller-name">Name (optional)</label>
            <Input
              id="caller-name"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              placeholder="Max Mustermann"
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-[12px] font-semibold text-muted-custom" htmlFor="caller-password">Passwort</label>
            <Input
              id="caller-password"
              type="text"
              required
              minLength={8}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="mind. 8 Zeichen"
              className="mt-1"
            />
          </div>
          <div className="sm:col-span-3">
            <Button type="submit" disabled={create.isPending}>
              {create.isPending ? <Loader2 className="animate-spin" /> : <UserPlus />}
              Caller anlegen
            </Button>
          </div>
        </form>
      </section>

      <section className="overflow-hidden rounded-lg border border-line bg-card shadow-sm">
        {accounts.isPending ? (
          <div className="h-32 animate-pulse bg-surface/60" />
        ) : rows.length === 0 ? (
          <div className="flex min-h-40 flex-col items-center justify-center px-6 text-center">
            <span className="flex size-12 items-center justify-center rounded-md bg-brand-soft text-brand-hover">
              <Headphones />
            </span>
            <p className="mt-3 text-[14px] font-semibold text-conditions">Noch keine Caller-Konten</p>
            <p className="mt-1 text-[13px] text-muted-custom">Lege oben das erste Konto an.</p>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-line text-[12px] tracking-wide text-muted-custom uppercase">
                <th className="px-4 py-3 font-semibold">E-Mail</th>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Angelegt</th>
                <th className="px-4 py-3 font-semibold">Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((account) => (
                <tr key={account.userId} className="border-b border-line/70 last:border-0">
                  <td className="px-4 py-3 text-[13px] font-semibold text-conditions">{account.email ?? "—"}</td>
                  <td className="px-4 py-3 text-[13px] text-conditions">{account.fullName ?? "—"}</td>
                  <td className="px-4 py-3 text-[13px] text-muted-custom">
                    {account.createdAt
                      ? new Intl.DateTimeFormat("de-DE", { dateStyle: "medium" }).format(new Date(account.createdAt))
                      : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" onClick={() => setResetFor(account)}>
                        <KeyRound /> Passwort
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={remove.isPending}
                        onClick={() => {
                          if (window.confirm(`Konto ${account.email ?? ""} wirklich löschen?`)) {
                            remove.mutate(account.userId);
                          }
                        }}
                      >
                        <Trash2 /> Löschen
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <ResetPasswordDialog account={resetFor} onClose={() => setResetFor(null)} />
    </AdminPageShell>
  );
}

function ResetPasswordDialog({ account, onClose }: { account: CallerAccount | null; onClose: () => void }) {
  const resetPassword = useServerFn(resetCallerPassword);
  const [password, setPassword] = useState("");

  const reset = useMutation({
    mutationFn: () => resetPassword({ data: { userId: account!.userId, password } }),
    onSuccess: () => {
      toast.success("Passwort geändert");
      setPassword("");
      onClose();
    },
    onError: (error) => toast.error(errorText(error, "Passwort konnte nicht geändert werden.")),
  });

  return (
    <Dialog open={Boolean(account)} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Passwort neu setzen</DialogTitle>
        </DialogHeader>
        <p className="text-[13px] text-muted-custom">{account?.email}</p>
        <form
          className="mt-2 space-y-3"
          onSubmit={(event) => {
            event.preventDefault();
            reset.mutate();
          }}
        >
          <Input
            type="text"
            required
            minLength={8}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Neues Passwort (mind. 8 Zeichen)"
          />
          <Button type="submit" disabled={reset.isPending}>
            {reset.isPending ? <Loader2 className="animate-spin" /> : <KeyRound />}
            Passwort speichern
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
