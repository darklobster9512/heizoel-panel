import { newId, store, type Bank } from "@/lib/mock-data";

export type { Bank };
export type BankInput = Partial<Bank> & { name: string; id?: string };

/** Öffentliche Liste aller aktiven Banken (für /angebote). */
export async function listActiveBanks(): Promise<Bank[]> {
  return store.banks
    .filter((b) => b.active)
    .slice()
    .sort((a, b) => a.sort_order - b.sort_order);
}

/** Alle Banken inkl. inaktiver (Demo-Verwaltung). */
export async function listBanks(): Promise<Bank[]> {
  return store.banks.slice().sort((a, b) => a.sort_order - b.sort_order);
}

export async function upsertBank(input: BankInput): Promise<Bank> {
  const now = new Date().toISOString();

  if (input.id) {
    const index = store.banks.findIndex((b) => b.id === input.id);
    if (index === -1) throw new Error("Bank nicht gefunden");
    const updated = { ...store.banks[index]!, ...input, updated_at: now } as Bank;
    store.banks[index] = updated;
    return updated;
  }

  const created: Bank = {
    id: newId(),
    created_at: now,
    updated_at: now,
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
    ...input,
    name: input.name,
  };
  store.banks.push(created);
  return created;
}

export async function deleteBank(input: { id: string }): Promise<{ ok: boolean }> {
  const index = store.banks.findIndex((b) => b.id === input.id);
  if (index !== -1) store.banks.splice(index, 1);
  return { ok: index !== -1 };
}
