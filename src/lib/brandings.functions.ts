import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";

type BrandingRow = Database["public"]["Tables"]["brandings"]["Row"];

const nullableText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .nullable()
    .transform((value) => value || null);

const brandingInputSchema = z.object({
  id: z.string().uuid().optional(),
  status: z.enum(["draft", "active"]),
  logoPath: nullableText(500),
  companyName: nullableText(160),
  shopName: nullableText(160),
  streetAddress: nullableText(200),
  postalCode: nullableText(10),
  city: nullableText(120),
  registryCourt: nullableText(160),
  commercialRegisterNumber: nullableText(80),
  managingDirector: nullableText(160),
  vatId: z.union([z.string().trim().regex(/^DE[0-9]{9}$/i), z.literal(""), z.null()]).optional(),
  email: z.union([z.string().trim().email().max(255), z.literal(""), z.null()]).optional(),
  domain: z
    .union([
      z
        .string()
        .trim()
        .max(255)
        .regex(
          /^(https?:\/\/)?([a-z0-9]([a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}(\/[^\s]*)?$/i,
          "Bitte eine gültige Domain angeben.",
        ),
      z.literal(""),
      z.null(),
    ])
    .optional(),
  resendApiKey: nullableText(500),
  resendSenderEmail: z.union([z.string().trim().email().max(255), z.literal(""), z.null()]).optional(),
  resendSenderName: nullableText(160),
  sevenApiKey: nullableText(500),
  sevenSenderName: nullableText(11),
});

export type BrandingInput = z.input<typeof brandingInputSchema>;

export type Branding = {
  id: string;
  publicId: string;
  status: "draft" | "active";
  logoPath: string | null;
  logoUrl: string | null;
  companyName: string | null;
  shopName: string | null;
  streetAddress: string | null;
  postalCode: string | null;
  city: string | null;
  registryCourt: string | null;
  commercialRegisterNumber: string | null;
  managingDirector: string | null;
  vatId: string | null;
  email: string | null;
  domain: string | null;
  resendApiKey: string | null;
  resendConfigured: boolean;
  resendSenderEmail: string | null;
  resendSenderName: string | null;
  sevenApiKey: string | null;
  sevenConfigured: boolean;
  sevenSenderName: string | null;
  accountHolder: string | null;
  iban: string | null;
  bankName: string | null;
  bic: string | null;
  createdAt: string;
  updatedAt: string;
};

async function requireAdmin(context: {
  supabase: Parameters<typeof checkAdmin>[0];
  userId: string;
}) {
  const isAdmin = await checkAdmin(context.supabase, context.userId);
  if (!isAdmin) throw new Error("Kein Zugriff auf die Branding-Verwaltung.");
}

async function checkAdmin(
  supabase: {
    rpc: (name: "has_role", args: { _user_id: string; _role: "admin" }) => PromiseLike<{ data: boolean | null; error: unknown }>;
  },
  userId: string,
) {
  const { data, error } = await supabase.rpc("has_role", {
    _user_id: userId,
    _role: "admin",
  });
  if (error) throw new Error("Die Berechtigung konnte nicht geprüft werden.");
  return data === true;
}

async function withLogoUrl(
  supabase: { storage: { from: (bucket: string) => { createSignedUrl: (path: string, expiresIn: number) => Promise<{ data: { signedUrl: string } | null }> } } },
  row: BrandingRow,
): Promise<Branding> {
  const logoPath = typeof row.logo_path === "string" ? row.logo_path : null;
  const signed = logoPath
    ? await supabase.storage.from("branding-logos").createSignedUrl(logoPath, 3600)
    : null;
  return {
    id: String(row.id),
    publicId: String(row.public_id),
    status: row.status === "active" ? "active" : "draft",
    logoPath,
    logoUrl: signed?.data?.signedUrl ?? null,
    companyName: typeof row.company_name === "string" ? row.company_name : null,
    shopName: typeof row.shop_name === "string" ? row.shop_name : null,
    streetAddress: typeof row.street_address === "string" ? row.street_address : null,
    postalCode: typeof row.postal_code === "string" ? row.postal_code : null,
    city: typeof row.city === "string" ? row.city : null,
    registryCourt: typeof row.registry_court === "string" ? row.registry_court : null,
    commercialRegisterNumber: typeof row.commercial_register_number === "string" ? row.commercial_register_number : null,
    managingDirector: typeof row.managing_director === "string" ? row.managing_director : null,
    vatId: typeof row.vat_id === "string" ? row.vat_id : null,
    email: typeof row.email === "string" ? row.email : null,
    domain: typeof row.domain === "string" ? row.domain : null,
    resendApiKey: null,
    resendConfigured: Boolean(row.resend_api_key),
    resendSenderEmail: typeof row.resend_sender_email === "string" ? row.resend_sender_email : null,
    resendSenderName: typeof row.resend_sender_name === "string" ? row.resend_sender_name : null,
    sevenApiKey: null,
    sevenConfigured: Boolean(row.seven_api_key),
    sevenSenderName: typeof row.seven_sender_name === "string" ? row.seven_sender_name : null,
    accountHolder: typeof row.account_holder === "string" ? row.account_holder : null,
    iban: typeof row.iban === "string" ? row.iban : null,
    bankName: typeof row.bank_name === "string" ? row.bank_name : null,
    bic: typeof row.bic === "string" ? row.bic : null,
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

export const listBrandings = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<Branding[]> => {
    await requireAdmin(context);
    const { data, error } = await context.supabase
      .from("brandings")
      .select("*")
      .order("updated_at", { ascending: false });
    if (error) throw new Error("Brandings konnten nicht geladen werden.");
    return Promise.all((data ?? []).map((row) => withLogoUrl(context.supabase, row)));
  });

export const getBranding = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string }) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }): Promise<Branding | null> => {
    await requireAdmin(context);
    const { data: row, error } = await context.supabase
      .from("brandings")
      .select("*")
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Error("Branding konnte nicht geladen werden.");
    return row ? withLogoUrl(context.supabase, row) : null;
  });

export const saveBranding = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: BrandingInput) => brandingInputSchema.parse(input))
  .handler(async ({ data, context }): Promise<{ id: string; publicId: string }> => {
    await requireAdmin(context);
    let savedResendApiKey = data.resendApiKey;
    let savedSevenApiKey = data.sevenApiKey;
    if (data.id && (!savedResendApiKey || !savedSevenApiKey)) {
      const { data: existing, error: existingError } = await context.supabase
        .from("brandings")
        .select("resend_api_key, seven_api_key")
        .eq("id", data.id)
        .maybeSingle();
      if (existingError) throw new Error("Bestehende Konfiguration konnte nicht geladen werden.");
      if (!savedResendApiKey) savedResendApiKey = existing?.resend_api_key ?? null;
      if (!savedSevenApiKey) savedSevenApiKey = existing?.seven_api_key ?? null;
    }
    const payload = {
      status: data.status,
      logo_path: data.logoPath,
      company_name: data.companyName,
      shop_name: data.shopName,
      street_address: data.streetAddress,
      postal_code: data.postalCode,
      city: data.city,
      registry_court: data.registryCourt,
      commercial_register_number: data.commercialRegisterNumber,
      managing_director: data.managingDirector,
      vat_id: data.vatId || null,
      email: data.email || null,
      domain: data.domain || null,
      resend_api_key: savedResendApiKey,
      resend_sender_email: data.resendSenderEmail || null,
      resend_sender_name: data.resendSenderName,
      seven_api_key: savedSevenApiKey,
      seven_sender_name: data.sevenSenderName,
      updated_by: context.userId,
    };

    const query = data.id
      ? context.supabase.from("brandings").update(payload).eq("id", data.id)
      : context.supabase.from("brandings").insert({ ...payload, created_by: context.userId });
    const { data: saved, error } = await query.select("id, public_id").single();
    if (error) throw new Error("Branding konnte nicht gespeichert werden.");
    return { id: saved.id, publicId: saved.public_id };
  });