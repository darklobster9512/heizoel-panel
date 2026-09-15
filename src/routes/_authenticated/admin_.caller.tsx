import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Headphones, KeyRound, Loader2, ShieldCheck, Trash2, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { AdminPageShell } from "@/components/internal/admin-page-shell";
import { SettingsMobileTabs, SettingsSubDock } from "@/components/internal/settings/settings-dock";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { listBrandings } from "@/lib/brandings.functions";
import {
  createCallerAccount,
  updateCallerAccess,
  deleteCallerAccount,
  listCallerAccounts,
  resetCallerPassword,
  type CallerAccount,
} from "@/lib/caller-accounts.functions";

export const Route = createFileRoute("/_authenticated/admin_/caller")({
  head: () => ({
    meta: [
      { title: "Caller-Konten — HEIZKING" },
      { name: "description", content: "Mitarbeiter-Konten mit Caller-Rang anlegen und verwalten." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Caller-Konten — HEIZKING" },
      { property: "og:description", content: "Mitarbeiter-Konten mit Caller-Rang anlegen und verwalten." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CallerAccountsPage,
});

const dateLabel = (value: string | null) =>
  value ? new Intl.DateTimeFormat("de-DE", { dateStyle: "medium" }).format(new Date(value)) : null;

function BrandingPicker({
  brandings,
  selected,
  onToggle,
}: {
  brandings: { id: string; label: string }[];
  selected: string[];
  onToggle: (id: string) => void;
}) {
  if (brandings.length === 0) {
    return <p className="text-[13px] text-muted-custom">Noch keine Brandings angelegt.</p>;
  }
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {brandings.map((branding) => (
        <label key={branding.id} className="flex items-center gap-2 text-[13px] text-conditions">
          <input
            type="checkbox"
            className="size-4 accent-[var(--color-brand)]"
            checked={selected.includes(branding.id)}
            onChange={() => onToggle(branding.id)}
          />
          {branding.label}
        </label>
      ))}
    </div>
  );
}

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
  const [accessFor, setAccessFor] = useState<CallerAccount | null>(null);
  const [brandingIds, setBrandingIds] = useState<string[]>([]);
  const [visibleFrom, setVisibleFrom] = useState("");

  const fetchBrandings = useServerFn(listBrandings);
  const brandingsQuery = useQuery({ queryKey: ["brandings"], queryFn: () => fetchBrandings({}) });
  const brandingOptions = (brandingsQuery.data ?? []).map((branding) => ({
    id: branding.id,
    label: branding.shopName || branding.companyName || "Ohne Namen",
  }));
  const brandingLabel = (id: string) => brandingOptions.find((option) => option.id === id)?.label ?? "Branding";
  const toggleBranding = (id: string) =>
    setBrandingIds((prev) => (prev.includes(id) ? prev.filter((entry) => entry !== id) : [...prev, id]));

  const create = useMutation({
    mutationFn: () =>
      createAccount({
        data: {
          email,
          password,
          ...(fullName ? { fullName } : {}),
          brandingIds,
          visibleFrom: visibleFrom || null,
        },
      }),
    onSuccess: () => {
      toast.success("Caller-Konto angelegt");
      setEmail("");
      setFullName("");
      setPassword("");
      setBrandingIds([]);
      setVisibleFrom("");
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
          <div className="sm:col-span-2">
            <span className="text-[12px] font-semibold text-muted-custom">Brandings (leer = alle)</span>
            <div className="mt-2">
              <BrandingPicker brandings={brandingOptions} selected={brandingIds} onToggle={toggleBranding} />
            </div>
          </div>
          <div>
            <label className="text-[12px] font-semibold text-muted-custom" htmlFor="caller-visible">
              Bestellungen sichtbar ab (optional)
            </label>
            <Input
              id="caller-visible"
              type="date"
              value={visibleFrom}
              onChange={(event) => setVisibleFrom(event.target.value)}
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
                <th className="px-4 py-3 font-semibold">Brandings</th>
                <th className="px-4 py-3 font-semibold">Sichtbar ab</th>
                <th className="px-4 py-3 font-semibold">Angelegt</th>
                <th className="px-4 py-3 font-semibold">Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((account) => (
                <tr key={account.userId} className="border-b border-line/70 last:border-0">
                  <td className="px-4 py-3 text-[13px] font-semibold text-conditions">{account.email ?? "—"}</td>
                  <td className="px-4 py-3 text-[13px] text-conditions">{account.fullName ?? "—"}</td>
                  <td className="px-4 py-3">
                    {account.brandingIds.length === 0 ? (
                      <span className="text-[13px] text-muted-custom">Alle</span>
                    ) : (
                      <div className="flex flex-wrap gap-1">
                        {account.brandingIds.map((id) => (
                          <span key={id} className="rounded-full bg-brand-soft px-2 py-0.5 text-[11px] font-semibold text-brand-hover">
                            {brandingLabel(id)}
                          </span>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-[13px] text-conditions">
                    {dateLabel(account.visibleFrom) ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-[13px] text-muted-custom">
                    {account.createdAt
                      ? new Intl.DateTimeFormat("de-DE", { dateStyle: "medium" }).format(new Date(account.createdAt))
                      : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" onClick={() => setAccessFor(account)}>
                        <ShieldCheck /> Zugriff
                      </Button>
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
      <AccessDialog
        account={accessFor}
        brandings={brandingOptions}
        onClose={() => setAccessFor(null)}
        onSaved={() => void queryClient.invalidateQueries({ queryKey: ["caller-accounts"] })}
      />
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

function AccessDialog({
  account,
  brandings,
  onClose,
  onSaved,
}: {
  account: CallerAccount | null;
  brandings: { id: string; label: string }[];
  onClose: () => void;
  onSaved: () => void;
}) {
  const saveAccess = useServerFn(updateCallerAccess);
  const [selected, setSelected] = useState<string[]>([]);
  const [visibleFrom, setVisibleFrom] = useState("");

  useEffect(() => {
    setSelected(account?.brandingIds ?? []);
    setVisibleFrom(account?.visibleFrom ?? "");
  }, [account?.userId, account]);

  const save = useMutation({
    mutationFn: () =>
      saveAccess({
        data: { userId: account!.userId, brandingIds: selected, visibleFrom: visibleFrom || null },
      }),
    onSuccess: () => {
      toast.success("Zugriff gespeichert");
      onSaved();
      onClose();
    },
    onError: (error) => toast.error(errorText(error, "Zugriff konnte nicht gespeichert werden.")),
  });

  return (
    <Dialog open={Boolean(account)} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Zugriff bearbeiten</DialogTitle>
        </DialogHeader>
        <p className="text-[13px] text-muted-custom">{account?.email}</p>
        <div className="space-y-4">
          <div>
            <span className="text-[12px] font-semibold text-muted-custom">Brandings (leer = alle)</span>
            <div className="mt-2">
              <BrandingPicker
                brandings={brandings}
                selected={selected}
                onToggle={(id) =>
                  setSelected((prev) => (prev.includes(id) ? prev.filter((entry) => entry !== id) : [...prev, id]))
                }
              />
            </div>
          </div>
          <div>
            <label className="text-[12px] font-semibold text-muted-custom" htmlFor="access-visible">
              Bestellungen sichtbar ab (optional)
            </label>
            <Input
              id="access-visible"
              type="date"
              value={visibleFrom}
              onChange={(event) => setVisibleFrom(event.target.value)}
              className="mt-1"
            />
          </div>
          <Button onClick={() => save.mutate()} disabled={save.isPending}>
            {save.isPending ? <Loader2 className="animate-spin" /> : <ShieldCheck />}
            Speichern
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
