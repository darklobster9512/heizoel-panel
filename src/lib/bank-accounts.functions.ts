import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";

type BankAccountRow = Database["public"]["Tables"]["bank_accounts"]["Row"];

export { formatIban } from "@/lib/iban";

const requiredText = (max: number, label: string) =>
  z.string().trim().min(1, `${label} ist ein Pflichtfeld.`).max(max);

const bankAccountInputSchema = z.object({
  id: z.string().uuid().optional(),
  name: requiredText(160, "Name"),
  iban: requiredText(40, "IBAN").transform((v) => v.replace(/\s+/g, "").toUpperCase()),
  bic: requiredText(20, "BIC").transform((v) => v.replace(/\s+/g, "").toUpperCase()),
  bankName: requiredText(160, "Bankname"),
  limitAmount: z.coerce.number().positive("Das Limit muss größer als 0 sein.").max(999999999),
  isActive: z.boolean(),
});

export type BankAccountInput = z.input<typeof bankAccountInputSchema>;

export type BankAccount = {
  id: string;
  name: string;
  iban: string;
  bic: string;
  bankName: string;
  limitAmount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

type AdminContext = {
  supabase: {
    rpc: (name: "has_role", args: { _user_id: string; _role: "admin" }) => PromiseLike<{ data: boolean | null; error: unknown }>;
  };
  userId: string;
};

async function requireAdmin(context: AdminContext) {
  const { data, error } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });
  if (error) throw new Error("Die Berechtigung konnte nicht geprüft werden.");
  if (data !== true) throw new Error("Kein Zugriff auf die Bankkonten-Verwaltung.");
}

function mapRow(row: BankAccountRow): BankAccount {
  return {
    id: String(row.id),
    name: String(row.name),
    iban: String(row.iban),
    bic: String(row.bic),
    bankName: String(row.bank_name),
    limitAmount: Number(row.limit_amount),
    isActive: row.is_active === true,
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

export const listBankAccounts = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<BankAccount[]> => {
    await requireAdmin(context);
    const { data, error } = await context.supabase
      .from("bank_accounts")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error("Bankkonten konnten nicht geladen werden.");
    return (data ?? []).map(mapRow);
  });

export const saveBankAccount = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: BankAccountInput) => bankAccountInputSchema.parse(input))
  .handler(async ({ data, context }): Promise<{ id: string }> => {
    await requireAdmin(context);
    const payload = {
      name: data.name,
      iban: data.iban,
      bic: data.bic,
      bank_name: data.bankName,
      limit_amount: data.limitAmount,
      is_active: data.isActive,
      updated_by: context.userId,
    };
    const query = data.id
      ? context.supabase.from("bank_accounts").update(payload).eq("id", data.id)
      : context.supabase.from("bank_accounts").insert({ ...payload, created_by: context.userId });
    const { data: saved, error } = await query.select("id").single();
    if (error) throw new Error("Bankkonto konnte nicht gespeichert werden.");
    return { id: saved.id };
  });

export const deleteBankAccount = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string }) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }): Promise<{ ok: true }> => {
    await requireAdmin(context);
    const { error } = await context.supabase.from("bank_accounts").delete().eq("id", data.id);
    if (error) throw new Error("Bankkonto konnte nicht gelöscht werden.");
    return { ok: true };
  });
