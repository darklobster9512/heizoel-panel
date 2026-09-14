import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Edit3, Plus, RefreshCw, Send, Trash2, Zap } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { listBrandings } from "@/lib/brandings.functions";
import {
  deleteTelegramRecipient,
  listTelegramRecipients,
  saveTelegramRecipient,
  sendTelegramTest,
  type TelegramRecipient,
} from "@/lib/telegram.functions";

type FormState = {
  id?: string;
  label: string;
  chatId: string;
  brandingId: string;
  isActive: boolean;
};

const EMPTY_FORM: FormState = { label: "", chatId: "", brandingId: "", isActive: true };

export function TelegramPanel() {
  const queryClient = useQueryClient();
  const fetchRecipients = useServerFn(listTelegramRecipients);
  const fetchBrandings = useServerFn(listBrandings);
  const saveRecipient = useServerFn(saveTelegramRecipient);
  const removeRecipient = useServerFn(deleteTelegramRecipient);
  const testRecipient = useServerFn(sendTelegramTest);

  const { data, isPending, isError, refetch } = useQuery({ queryKey: ["telegram-recipients"], queryFn: () => fetchRecipients({}) });
  const { data: brandings } = useQuery({ queryKey: ["brandings"], queryFn: () => fetchBrandings({}) });

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [formError, setFormError] = useState<string | null>(null);

  const brandingName = (id: string | null) => {
    if (!id) return "Alle Brandings";
    const match = brandings?.find((b) => b.id === id);
    return match?.shopName ?? match?.companyName ?? "Unbekanntes Branding";
  };

  const saveMutation = useMutation({
    mutationFn: saveRecipient,
    onSuccess: () => {
      toast.success(form.id ? "Empfänger aktualisiert." : "Empfänger angelegt.");
      setOpen(false);
      setForm(EMPTY_FORM);
      setFormError(null);
      void queryClient.invalidateQueries({ queryKey: ["telegram-recipients"] });
    },
    onError: (error: Error) => setFormError(error.message || "Empfänger konnte nicht gespeichert werden."),
  });

  const deleteMutation = useMutation({
    mutationFn: removeRecipient,
    onSuccess: () => {
      toast.success("Empfänger gelöscht.");
      void queryClient.invalidateQueries({ queryKey: ["telegram-recipients"] });
    },
    onError: () => toast.error("Empfänger konnte nicht gelöscht werden."),
  });

  const testMutation = useMutation({
    mutationFn: testRecipient,
    onSuccess: () => toast.success("Testnachricht gesendet."),
    onError: (error: Error) => toast.error(error.message || "Testnachricht fehlgeschlagen."),
  });

  function openCreate() {
    setForm(EMPTY_FORM);
    setFormError(null);
    setOpen(true);
  }

  function openEdit(recipient: TelegramRecipient) {
    setForm({
      id: recipient.id,
      label: recipient.label,
      chatId: recipient.chatId,
      brandingId: recipient.brandingId ?? "",
      isActive: recipient.isActive,
    });
    setFormError(null);
    setOpen(true);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!form.label.trim() || !form.chatId.trim()) {
      setFormError("Bezeichnung und Chat-ID sind Pflichtfelder.");
      return;
    }
    setFormError(null);
    saveMutation.mutate({
      data: {
        id: form.id,
        label: form.label,
        chatId: form.chatId,
        brandingId: form.brandingId ? form.brandingId : null,
        isActive: form.isActive,
      },
    });
  }

  return (
    <>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-[12px] font-semibold tracking-wide text-brand-hover uppercase">Benachrichtigungen</p>
          <h1 className="mt-1 text-[24px] font-bold text-hero-text">Telegram</h1>
          <p className="mt-1 text-[14px] text-muted-custom">Chats, die bei jedem Bestelleingang automatisch informiert werden.</p>
        </div>
        <Button onClick={openCreate}><Plus /> Chat hinzufügen</Button>
      </div>

      {data && !data.connected ? (
        <div className="rounded-lg border border-line bg-brand-soft px-4 py-3 text-[13px] text-conditions">
          Es ist noch kein Bot-Token hinterlegt. Empfänger lassen sich bereits anlegen, Nachrichten werden aber erst nach dem Hinterlegen des Tokens versendet.
        </div>
      ) : null}

      {isPending ? <div className="grid gap-5 md:grid-cols-2"><div className="h-40 animate-pulse rounded-lg border border-line bg-card" /><div className="h-40 animate-pulse rounded-lg border border-line bg-card" /></div> : null}

      {isError ? (
        <div className="flex min-h-56 flex-col items-center justify-center rounded-lg border border-line bg-card text-center">
          <p className="text-sm font-semibold text-conditions">Empfänger konnten nicht geladen werden.</p>
          <Button className="mt-4" variant="outline" onClick={() => void refetch()}><RefreshCw /> Erneut laden</Button>
        </div>
      ) : null}

      {data && data.recipients.length === 0 ? (
        <div className="flex min-h-80 flex-col items-center justify-center rounded-lg border border-dashed border-line bg-card px-6 text-center">
          <span className="flex size-12 items-center justify-center rounded-md bg-brand-soft text-brand-hover"><Send /></span>
          <h2 className="mt-4 text-[17px] font-bold text-conditions">Noch kein Chat hinterlegt</h2>
          <p className="mt-2 max-w-md text-[13px] text-muted-custom">
            Füge die Chat-ID hinzu, an die neue Bestellungen gemeldet werden sollen. Der Bot muss vorher im Chat bzw. in der Gruppe gestartet worden sein.
          </p>
          <Button className="mt-5" onClick={openCreate}><Plus /> Ersten Chat anlegen</Button>
        </div>
      ) : null}

      {data && data.recipients.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {data.recipients.map((recipient) => (
            <article key={recipient.id} className="overflow-hidden rounded-lg border border-line bg-card shadow-sm">
              <div className="flex items-start justify-between gap-3 border-b border-line p-5">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-brand-soft text-brand-hover"><Send className="size-5" /></span>
                  <div className="min-w-0">
                    <h2 className="truncate text-[16px] font-bold text-conditions">{recipient.label}</h2>
                    <p className="truncate text-[12px] text-muted-custom">Chat-ID {recipient.chatId}</p>
                  </div>
                </div>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${recipient.isActive ? "bg-brand-soft text-brand-hover" : "bg-surface text-muted-custom"}`}>
                  {recipient.isActive ? "Aktiv" : "Inaktiv"}
                </span>
              </div>
              <div className="p-5">
                <p className="text-[10px] font-semibold tracking-wide text-muted-custom uppercase">Benachrichtigt für</p>
                <p className="mt-0.5 text-[13px] font-medium text-conditions">{brandingName(recipient.brandingId)}</p>
              </div>
              <div className="flex items-center justify-between border-t border-line px-5 py-3">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={testMutation.isPending}
                  onClick={() => testMutation.mutate({ data: { id: recipient.id } })}
                >
                  <Zap /> Testnachricht
                </Button>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" title="Bearbeiten" aria-label="Empfänger bearbeiten" onClick={() => openEdit(recipient)}><Edit3 /></Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    title="Löschen"
                    aria-label="Empfänger löschen"
                    disabled={deleteMutation.isPending}
                    onClick={() => { if (window.confirm(`Chat „${recipient.label}" wirklich löschen?`)) deleteMutation.mutate({ data: { id: recipient.id } }); }}
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
            <DialogTitle>{form.id ? "Chat bearbeiten" : "Chat hinzufügen"}</DialogTitle>
            <DialogDescription>Bezeichnung und Chat-ID sind Pflichtfelder.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="tg-label">Bezeichnung</Label>
              <Input id="tg-label" required value={form.label} onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))} placeholder="Team Disposition" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tg-chat">Chat-ID</Label>
              <Input id="tg-chat" required value={form.chatId} onChange={(e) => setForm((f) => ({ ...f, chatId: e.target.value }))} placeholder="-1001234567890" />
              <p className="text-[12px] text-muted-custom">Numerische ID (Gruppen beginnen mit -100) oder @Benutzername.</p>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tg-branding">Branding</Label>
              <select
                id="tg-branding"
                value={form.brandingId}
                onChange={(e) => setForm((f) => ({ ...f, brandingId: e.target.value }))}
                className="h-10 w-full rounded-md border border-line bg-card px-3 text-[14px] text-conditions"
              >
                <option value="">Alle Brandings</option>
                {(brandings ?? []).map((branding) => (
                  <option key={branding.id} value={branding.id}>{branding.shopName ?? branding.companyName ?? "Ohne Namen"}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-line px-3 py-2.5">
              <Label htmlFor="tg-active" className="cursor-pointer">Benachrichtigungen aktiv</Label>
              <Switch id="tg-active" checked={form.isActive} onCheckedChange={(checked) => setForm((f) => ({ ...f, isActive: checked }))} />
            </div>
            {formError ? <p className="text-[13px] font-medium text-destructive">{formError}</p> : null}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Abbrechen</Button>
              <Button type="submit" disabled={saveMutation.isPending}>{saveMutation.isPending ? "Speichern…" : "Speichern"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
