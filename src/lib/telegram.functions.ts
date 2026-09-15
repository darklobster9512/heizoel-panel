import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";

type RecipientRow = Database["public"]["Tables"]["telegram_recipients"]["Row"];

const recipientInputSchema = z.object({
  id: z.string().uuid().optional(),
  label: z.string().trim().min(1, "Bezeichnung ist ein Pflichtfeld.").max(160),
  chatId: z
    .string()
    .trim()
    .min(1, "Chat-ID ist ein Pflichtfeld.")
    .max(60)
    .regex(/^-?\d+$|^@[A-Za-z0-9_]{3,}$/, "Bitte eine numerische Chat-ID oder einen @Benutzernamen angeben."),
  brandingId: z.string().uuid().nullable().optional(),
  isActive: z.boolean(),
});

export type TelegramRecipientInput = z.input<typeof recipientInputSchema>;

export type TelegramRecipient = {
  id: string;
  label: string;
  chatId: string;
  brandingId: string | null;
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
  const { data, error } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
  if (error) throw new Error("Die Berechtigung konnte nicht geprüft werden.");
  if (data !== true) throw new Error("Kein Zugriff auf die Telegram-Verwaltung.");
}

function mapRow(row: RecipientRow): TelegramRecipient {
  return {
    id: String(row.id),
    label: String(row.label),
    chatId: String(row.chat_id),
    brandingId: row.branding_id ? String(row.branding_id) : null,
    isActive: row.is_active === true,
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

export const listTelegramRecipients = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<{ recipients: TelegramRecipient[]; connected: boolean }> => {
    await requireAdmin(context);
    const { data, error } = await context.supabase
      .from("telegram_recipients")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error("Telegram-Empfänger konnten nicht geladen werden.");
    const connected = Boolean(process.env["TELEGRAM_BOT_TOKEN"]);
    return { recipients: (data ?? []).map(mapRow), connected };
  });

export const saveTelegramRecipient = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: TelegramRecipientInput) => recipientInputSchema.parse(input))
  .handler(async ({ data, context }): Promise<{ id: string }> => {
    await requireAdmin(context);
    const payload = {
      label: data.label,
      chat_id: data.chatId,
      branding_id: data.brandingId ?? null,
      is_active: data.isActive,
      updated_by: context.userId,
    };
    const query = data.id
      ? context.supabase.from("telegram_recipients").update(payload).eq("id", data.id)
      : context.supabase.from("telegram_recipients").insert({ ...payload, created_by: context.userId });
    const { data: saved, error } = await query.select("id").single();
    if (error) {
      const code = (error as { code?: string }).code;
      if (code === "23505") throw new Error("Diese Chat-ID ist bereits hinterlegt.");
      throw new Error("Empfänger konnte nicht gespeichert werden.");
    }
    return { id: saved.id };
  });

export const deleteTelegramRecipient = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string }) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }): Promise<{ ok: true }> => {
    await requireAdmin(context);
    const { error } = await context.supabase.from("telegram_recipients").delete().eq("id", data.id);
    if (error) throw new Error("Empfänger konnte nicht gelöscht werden.");
    return { ok: true };
  });

export const sendTelegramTest = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string }) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }): Promise<{ ok: true }> => {
    await requireAdmin(context);
    const { data: row, error } = await context.supabase
      .from("telegram_recipients")
      .select("chat_id")
      .eq("id", data.id)
      .maybeSingle();
    if (error || !row) throw new Error("Empfänger wurde nicht gefunden.");

    const { sendTelegramMessage, renderOrderNotification } = await import("@/lib/telegram/notify.server");
    const text = `✅ <b>Testnachricht aus dem HEIZKING-Backend</b>\n\n${renderOrderNotification({
      orderNumber: "2609-74568",
      brandingId: null,
      brandingName: "Heizöl Online",
      customerName: "Max Mustermann",
      email: "max@example.com",
      phone: "017035829853",
      liters: 2000,
      variant: "standard",
      total: 2561.4,
      pricePer100: 128.07,
      postalCode: "12345",
      city: "Musterstadt",
    })}`;
    await sendTelegramMessage(String(row.chat_id), text);
    return { ok: true };
  });
