import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

import { BANK_LOGOS, bankLogoSrc } from "@/lib/bank-logos";
import { deleteBank, listBanks, upsertBank, type Bank, type BankInput } from "@/lib/banks.functions";

const EMPTY: BankInput = {
  name: "",
  logo_key: "",
  logo_url: "",
  sort_order: 99,
  active: true,
  eff_rate: 3.99,
  min_amount: 1000,
  max_amount: 120000,
  min_term: 12,
  max_term: 120,
  payout_days: 5,
  company_name: "",
  street: "",
  zip: "",
  city: "",
  documents: "Kontoauszug, Gehaltsabrechnung",
  free_special_repayment: true,
  free_full_repayment: false,
  payment_break: true,
  online_upload: true,
  online_id: true,
};

const inputClass =
  "h-10 w-full border border-[#dcdcdc] bg-white px-3 text-[14px] text-[#323232] outline-none focus:border-[#39a949]";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[12px] text-[#5b5b5b]">{label}</span>
      {children}
    </label>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-[13.5px] text-[#323232]">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="size-4 accent-[#39a949]"
      />
      {label}
    </label>
  );
}

export function BanksAdmin() {
  const queryClient = useQueryClient();
  const banks = useQuery({ queryKey: ["banks-admin"], queryFn: () => listBanks() });
  const [form, setForm] = useState<BankInput | null>(null);

  const save = useMutation({
    mutationFn: (input: BankInput) => upsertBank(input),
    onSuccess: async () => {
      toast.success("Bank gespeichert");
      setForm(null);
      await queryClient.invalidateQueries({ queryKey: ["banks-admin"] });
      await queryClient.invalidateQueries({ queryKey: ["active-banks"] });
    },
    onError: () => toast.error("Speichern fehlgeschlagen"),
  });

  const del = useMutation({
    mutationFn: (id: string) => deleteBank({ id }),
    onSuccess: async () => {
      toast.success("Bank gelöscht");
      setForm(null);
      await queryClient.invalidateQueries({ queryKey: ["banks-admin"] });
      await queryClient.invalidateQueries({ queryKey: ["active-banks"] });
    },
    onError: () => toast.error("Löschen fehlgeschlagen"),
  });

  const set = <K extends keyof BankInput>(key: K, value: BankInput[K]) =>
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));

  return (
    <section className="bg-white p-5 shadow-sm md:p-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-[18px] font-medium text-[#323232]">Banken</h2>
        <button
          type="button"
          onClick={() => setForm({ ...EMPTY })}
          className="bg-[#39a949] px-4 py-2 text-[14px] font-medium text-white transition-colors duration-300 ease-in-out hover:bg-[#1b5426]"
        >
          Bank hinzufügen
        </button>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-[14px]">
          <thead>
            <tr className="border-b border-[#e5e7eb] text-[13px] text-[#5b5b5b]">
              <th className="py-2 pr-4 font-medium">Logo</th>
              <th className="py-2 pr-4 font-medium">Name</th>
              <th className="py-2 pr-4 font-medium">Zins (eff.)</th>
              <th className="py-2 pr-4 font-medium">Betrag</th>
              <th className="py-2 pr-4 font-medium">Laufzeit</th>
              <th className="py-2 pr-4 font-medium">Status</th>
              <th className="py-2 font-medium">Aktion</th>
            </tr>
          </thead>
          <tbody>
            {banks.isPending ? (
              <tr>
                <td colSpan={7} className="py-3 text-[#5b5b5b]">
                  Wird geladen …
                </td>
              </tr>
            ) : (banks.data ?? []).length === 0 ? (
              <tr>
                <td colSpan={7} className="py-3 text-[#5b5b5b]">
                  Noch keine Banken angelegt.
                </td>
              </tr>
            ) : (
              (banks.data ?? []).map((b: Bank) => {
                const src = bankLogoSrc(b.logo_key, b.logo_url);
                return (
                  <tr key={b.id} className="border-b border-[#f0f1f2] last:border-0">
                    <td className="py-3 pr-4">
                      {src ? (
                        <img src={src} alt={b.name} className="h-5 w-auto max-w-[110px]" />
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="py-3 pr-4 text-[#323232]">{b.name}</td>
                    <td className="py-3 pr-4 text-[#323232]">
                      {Number(b.eff_rate).toLocaleString("de-DE", { minimumFractionDigits: 2 })} %
                    </td>
                    <td className="py-3 pr-4 text-[#5b5b5b]">
                      {b.min_amount.toLocaleString("de-DE")} – {b.max_amount.toLocaleString("de-DE")} €
                    </td>
                    <td className="py-3 pr-4 text-[#5b5b5b]">
                      {b.min_term} – {b.max_term} Mon.
                    </td>
                    <td className="py-3 pr-4">
                      <span
                        className={
                          b.active
                            ? "bg-[#eff8f1] px-2 py-1 text-[12px] font-medium text-[#39a949]"
                            : "bg-[#f3f4f6] px-2 py-1 text-[12px] font-medium text-[#5b5b5b]"
                        }
                      >
                        {b.active ? "aktiv" : "inaktiv"}
                      </span>
                    </td>
                    <td className="py-3">
                      <button
                        type="button"
                        onClick={() => setForm({ ...(b as BankInput) })}
                        className="text-[13px] font-medium text-[#39a949] hover:underline"
                      >
                        bearbeiten
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {form && (
        <form
          className="mt-6 border border-[#e5e7eb] p-5"
          onSubmit={(e) => {
            e.preventDefault();
            save.mutate(form);
          }}
        >
          <h3 className="text-[16px] font-medium text-[#323232]">
            {form.id ? "Bank bearbeiten" : "Neue Bank"}
          </h3>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <Field label="Name">
              <input
                required
                className={inputClass}
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
              />
            </Field>
            <Field label="Logo">
              <select
                className={inputClass}
                value={form.logo_key ?? ""}
                onChange={(e) => set("logo_key", e.target.value)}
              >
                <option value="">— eigenes Bild (URL) —</option>
                {BANK_LOGOS.map((l) => (
                  <option key={l.key} value={l.key}>
                    {l.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Logo-Adresse (optional)">
              <input
                className={inputClass}
                value={form.logo_url ?? ""}
                onChange={(e) => set("logo_url", e.target.value)}
                placeholder="https://…"
              />
            </Field>

            <Field label="Zins (eff.) in %">
              <input
                type="number"
                step="0.01"
                className={inputClass}
                value={String(form.eff_rate ?? "")}
                onChange={(e) => set("eff_rate", Number(e.target.value))}
              />
            </Field>
            <Field label="Kreditbetrag von (€)">
              <input
                type="number"
                className={inputClass}
                value={String(form.min_amount ?? "")}
                onChange={(e) => set("min_amount", Number(e.target.value))}
              />
            </Field>
            <Field label="Kreditbetrag bis (€)">
              <input
                type="number"
                className={inputClass}
                value={String(form.max_amount ?? "")}
                onChange={(e) => set("max_amount", Number(e.target.value))}
              />
            </Field>

            <Field label="Laufzeit von (Monate)">
              <input
                type="number"
                className={inputClass}
                value={String(form.min_term ?? "")}
                onChange={(e) => set("min_term", Number(e.target.value))}
              />
            </Field>
            <Field label="Laufzeit bis (Monate)">
              <input
                type="number"
                className={inputClass}
                value={String(form.max_term ?? "")}
                onChange={(e) => set("max_term", Number(e.target.value))}
              />
            </Field>
            <Field label="Auszahlung in Tagen">
              <input
                type="number"
                className={inputClass}
                value={String(form.payout_days ?? "")}
                onChange={(e) => set("payout_days", Number(e.target.value))}
              />
            </Field>

            <Field label="Firmenname">
              <input
                className={inputClass}
                value={form.company_name ?? ""}
                onChange={(e) => set("company_name", e.target.value)}
              />
            </Field>
            <Field label="Straße">
              <input
                className={inputClass}
                value={form.street ?? ""}
                onChange={(e) => set("street", e.target.value)}
              />
            </Field>
            <div className="grid grid-cols-[110px_1fr] gap-3">
              <Field label="PLZ">
                <input
                  className={inputClass}
                  value={form.zip ?? ""}
                  onChange={(e) => set("zip", e.target.value)}
                />
              </Field>
              <Field label="Ort">
                <input
                  className={inputClass}
                  value={form.city ?? ""}
                  onChange={(e) => set("city", e.target.value)}
                />
              </Field>
            </div>

            <Field label="Benötigte Dokumente (Komma-getrennt)">
              <input
                className={inputClass}
                value={form.documents ?? ""}
                onChange={(e) => set("documents", e.target.value)}
              />
            </Field>
            <Field label="Reihenfolge">
              <input
                type="number"
                className={inputClass}
                value={String(form.sort_order ?? 0)}
                onChange={(e) => set("sort_order", Number(e.target.value))}
              />
            </Field>
          </div>

          <div className="mt-4 flex flex-wrap gap-5">
            <Toggle
              label="aktiv (auf /angebote sichtbar)"
              checked={Boolean(form.active)}
              onChange={(v) => set("active", v)}
            />
            <Toggle
              label="Kostenlose Sondertilgung"
              checked={Boolean(form.free_special_repayment)}
              onChange={(v) => set("free_special_repayment", v)}
            />
            <Toggle
              label="Kostenlose Gesamttilgung"
              checked={Boolean(form.free_full_repayment)}
              onChange={(v) => set("free_full_repayment", v)}
            />
            <Toggle
              label="Ratenpause"
              checked={Boolean(form.payment_break)}
              onChange={(v) => set("payment_break", v)}
            />
            <Toggle
              label="Dokumente online hochladen"
              checked={Boolean(form.online_upload)}
              onChange={(v) => set("online_upload", v)}
            />
            <Toggle
              label="Online-Legitimation"
              checked={Boolean(form.online_id)}
              onChange={(v) => set("online_id", v)}
            />
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={save.isPending}
              className="bg-[#39a949] px-5 py-2 text-[14px] font-medium text-white transition-colors duration-300 ease-in-out hover:bg-[#1b5426] disabled:opacity-60"
            >
              {save.isPending ? "Speichern …" : "Speichern"}
            </button>
            <button
              type="button"
              onClick={() => setForm(null)}
              className="border border-[#dcdcdc] px-5 py-2 text-[14px] text-[#323232]"
            >
              Abbrechen
            </button>
            {form.id && (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm(`„${form.name}“ wirklich löschen?`)) del.mutate(form.id!);
                }}
                className="ml-auto text-[13px] font-medium text-[#e02b2b] hover:underline"
              >
                Bank löschen
              </button>
            )}
          </div>
        </form>
      )}
    </section>
  );
}
