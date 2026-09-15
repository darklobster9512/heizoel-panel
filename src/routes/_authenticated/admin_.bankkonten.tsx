import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Edit3, Landmark, Plus, RefreshCw, Trash2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { AdminPageShell } from "@/components/internal/admin-page-shell";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { deleteBankAccount, formatIban, listBankAccounts, saveBankAccount, type BankAccount } from "@/lib/bank-accounts.functions";

export const Route = createFileRoute("/_authenticated/admin_/bankkonten")({
  head: () => ({ meta: [
    { title: "Bankkonten verwalten — Klaro Heizöl" },
    { name: "description", content: "Interne Verwaltung der Bankkonten." },
    { name: "robots", content: "noindex, nofollow" },
    { property: "og:title", content: "Bankkonten verwalten — Klaro Heizöl" },
    { property: "og:description", content: "Interne Verwaltung der Bankkonten." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: BankkontenPage,
});

type FormState = {
  id?: string;
  name: string;
  iban: string;
  bic: string;
  bankName: string;
  limitAmount: string;
  isActive: boolean;
};

const EMPTY_FORM: FormState = { name: "", iban: "", bic: "", bankName: "", limitAmount: "20000", isActive: true };

const euro = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" });

function BankkontenPage() {
  const queryClient = useQueryClient();
  const fetchAccounts = useServerFn(listBankAccounts);
  const saveAccount = useServerFn(saveBankAccount);
  const removeAccount = useServerFn(deleteBankAccount);
  const { data, isPending, isError, refetch } = useQuery({ queryKey: ["bank-accounts"], queryFn: () => fetchAccounts({}) });

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [formError, setFormError] = useState<string | null>(null);

  const saveMutation = useMutation({
    mutationFn: saveAccount,
    onSuccess: () => {
      toast.success(form.id ? "Bankkonto aktualisiert." : "Bankkonto angelegt.");
      setOpen(false);
      setForm(EMPTY_FORM);
      setFormError(null);
      void queryClient.invalidateQueries({ queryKey: ["bank-accounts"] });
    },
    onError: () => toast.error("Bankkonto konnte nicht gespeichert werden."),
  });

  const deleteMutation = useMutation({
    mutationFn: removeAccount,
    onSuccess: () => {
      toast.success("Bankkonto gelöscht.");
      void queryClient.invalidateQueries({ queryKey: ["bank-accounts"] });
    },
    onError: () => toast.error("Bankkonto konnte nicht gelöscht werden."),
  });

  function openCreate() {
    setForm(EMPTY_FORM);
    setFormError(null);
    setOpen(true);
  }

  function openEdit(account: BankAccount) {
    setForm({
      id: account.id,
      name: account.name,
      iban: account.iban,
      bic: account.bic,
      bankName: account.bankName,
      limitAmount: String(account.limitAmount),
      isActive: account.isActive,
    });
    setFormError(null);
    setOpen(true);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const limitAmount = Number(String(form.limitAmount).replace(",", "."));
    if (!form.name.trim() || !form.iban.trim() || !form.bic.trim() || !form.bankName.trim()) {
      setFormError("Bitte alle Pflichtfelder ausfüllen.");
      return;
    }
    if (!Number.isFinite(limitAmount) || limitAmount <= 0) {
      setFormError("Bitte ein gültiges Limit größer als 0 angeben.");
      return;
    }
    setFormError(null);
    saveMutation.mutate({
      data: {
        id: form.id,
        name: form.name,
        iban: form.iban,
        bic: form.bic,
        bankName: form.bankName,
        limitAmount,
        isActive: form.isActive,
      },
    });
  }

  return (
    <AdminPageShell active="bank">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-[12px] font-semibold tracking-wide text-brand-hover uppercase">Zahlungsabwicklung</p>
          <h1 className="mt-1 text-[24px] font-bold text-hero-text">Bankkonten</h1>
          <p className="mt-1 text-[14px] text-muted-custom">Globale Bankkonten für den Zahlungseingang verwalten.</p>
        </div>
        <Button onClick={openCreate}><Plus /> Bankkonto hinzufügen</Button>
      </div>

      {isPending ? <div className="grid gap-5 md:grid-cols-2"><div className="h-56 animate-pulse rounded-lg border border-line bg-card" /><div className="h-56 animate-pulse rounded-lg border border-line bg-card" /></div> : null}
      {isError ? (
        <div className="flex min-h-56 flex-col items-center justify-center rounded-lg border border-line bg-card text-center">
          <p className="text-sm font-semibold text-conditions">Bankkonten konnten nicht geladen werden.</p>
          <Button className="mt-4" variant="outline" onClick={() => void refetch()}><RefreshCw /> Erneut laden</Button>
        </div>
      ) : null}
      {!isPending && !isError && data?.length === 0 ? (
        <div className="flex min-h-80 flex-col items-center justify-center rounded-lg border border-dashed border-line bg-card px-6 text-center">
          <span className="flex size-12 items-center justify-center rounded-md bg-brand-soft text-brand-hover"><Landmark /></span>
          <h2 className="mt-4 text-[17px] font-bold text-conditions">Noch kein Bankkonto angelegt</h2>
          <p className="mt-2 max-w-md text-[13px] text-muted-custom">Lege das erste Bankkonto an. Das Limit ist standardmäßig mit 20.000 € vorbelegt.</p>
          <Button className="mt-5" onClick={openCreate}><Plus /> Erstes Bankkonto anlegen</Button>
        </div>
      ) : null}
      {data && data.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {data.map((account) => (
            <article key={account.id} className="overflow-hidden rounded-lg border border-line bg-card shadow-sm">
              <div className="flex items-start justify-between gap-3 border-b border-line p-5">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-brand-soft text-brand-hover"><Landmark className="size-5" /></span>
                  <div className="min-w-0">
                    <h2 className="truncate text-[16px] font-bold text-conditions">{account.name}</h2>
                    <p className="truncate text-[12px] text-muted-custom">{account.bankName}</p>
                  </div>
                </div>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${account.isActive ? "bg-brand-soft text-brand-hover" : "bg-surface text-muted-custom"}`}>
                  {account.isActive ? "Aktiv" : "Inaktiv"}
                </span>
              </div>
              <dl className="space-y-3 p-5">
                <div>
                  <dt className="text-[10px] font-semibold tracking-wide text-muted-custom uppercase">IBAN</dt>
                  <dd className="mt-0.5 text-[13px] font-medium break-all text-conditions">{account.iban}</dd>
                </div>
                <div className="flex gap-6">
                  <div>
                    <dt className="text-[10px] font-semibold tracking-wide text-muted-custom uppercase">BIC</dt>
                    <dd className="mt-0.5 text-[13px] font-medium text-conditions">{account.bic}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] font-semibold tracking-wide text-muted-custom uppercase">Limit</dt>
                    <dd className="mt-0.5 text-[13px] font-medium text-conditions">{euro.format(account.limitAmount)}</dd>
                  </div>
                </div>
              </dl>
              <div className="flex items-center justify-between border-t border-line px-5 py-3">
                <span className="text-[11px] text-muted-custom">Geändert {new Intl.DateTimeFormat("de-DE", { dateStyle: "medium" }).format(new Date(account.updatedAt))}</span>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" title="Bearbeiten" aria-label="Bankkonto bearbeiten" onClick={() => openEdit(account)}><Edit3 /></Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    title="Löschen"
                    aria-label="Bankkonto löschen"
                    disabled={deleteMutation.isPending}
                    onClick={() => { if (window.confirm(`Bankkonto „${account.name}" wirklich löschen?`)) deleteMutation.mutate({ data: { id: account.id } }); }}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : null}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{form.id ? "Bankkonto bearbeiten" : "Bankkonto hinzufügen"}</DialogTitle>
            <DialogDescription>Alle Felder sind Pflichtfelder.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="ba-name">Name / Kontoinhaber</Label>
              <Input id="ba-name" required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Musterheizöl GmbH" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ba-iban">IBAN</Label>
              <Input id="ba-iban" required value={form.iban} onChange={(e) => setForm((f) => ({ ...f, iban: e.target.value }))} placeholder="DE89 3704 0044 0532 0130 00" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="ba-bic">BIC</Label>
                <Input id="ba-bic" required value={form.bic} onChange={(e) => setForm((f) => ({ ...f, bic: e.target.value }))} placeholder="COBADEFFXXX" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ba-limit">Limit (€)</Label>
                <Input id="ba-limit" required inputMode="decimal" value={form.limitAmount} onChange={(e) => setForm((f) => ({ ...f, limitAmount: e.target.value }))} placeholder="20000" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ba-bank">Bankname</Label>
              <Input id="ba-bank" required value={form.bankName} onChange={(e) => setForm((f) => ({ ...f, bankName: e.target.value }))} placeholder="Musterbank" />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-line px-3 py-2.5">
              <Label htmlFor="ba-active" className="cursor-pointer">Konto aktiv</Label>
              <Switch id="ba-active" checked={form.isActive} onCheckedChange={(checked) => setForm((f) => ({ ...f, isActive: checked }))} />
            </div>
            {formError ? <p className="text-[13px] font-medium text-destructive">{formError}</p> : null}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Abbrechen</Button>
              <Button type="submit" disabled={saveMutation.isPending}>{saveMutation.isPending ? "Speichern…" : "Speichern"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AdminPageShell>
  );
}
