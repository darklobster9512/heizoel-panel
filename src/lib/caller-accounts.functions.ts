import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type CallerAccount = {
  userId: string;
  email: string | null;
  fullName: string | null;
  createdAt: string | null;
  brandingIds: string[];
  visibleFrom: string | null;
};

type AdminContext = {
  supabase: {
    rpc: (
      name: "has_role",
      args: { _user_id: string; _role: "admin" },
    ) => PromiseLike<{ data: boolean | null; error: unknown }>;
  };
  userId: string;
};

async function requireAdmin(context: AdminContext) {
  const { data, error } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });
  if (error) throw new Error("Die Berechtigung konnte nicht geprüft werden.");
  if (data !== true) throw new Error("Kein Zugriff auf die Caller-Verwaltung.");
}

const visibleFromSchema = z
  .string()
  .trim()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Bitte ein gültiges Datum angeben.")
  .nullish();

/** Setzt Branding-Zuordnung und Sichtbarkeitsdatum eines Callers neu. */
async function applyCallerAccess(userId: string, brandingIds: string[], visibleFrom: string | null) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  await supabaseAdmin.from("caller_brandings").delete().eq("user_id", userId);
  const unique = [...new Set(brandingIds)];
  if (unique.length > 0) {
    await supabaseAdmin
      .from("caller_brandings")
      .insert(unique.map((brandingId) => ({ user_id: userId, branding_id: brandingId })));
  }
  await supabaseAdmin
    .from("caller_settings")
    .upsert({ user_id: userId, visible_from: visibleFrom }, { onConflict: "user_id" });
}

const passwordSchema = z.string().min(8, "Das Passwort muss mindestens 8 Zeichen haben.").max(72);

export const listCallerAccounts = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<CallerAccount[]> => {
    await requireAdmin(context);

    const { data: roles, error } = await context.supabase
      .from("user_roles")
      .select("user_id")
      .eq("role", "caller");
    if (error) throw new Error("Caller-Konten konnten nicht geladen werden.");

    const ids = (roles ?? []).map((row) => String(row.user_id));
    if (ids.length === 0) return [];

    const { data: profiles } = await context.supabase
      .from("profiles")
      .select("id, email, full_name, created_at")
      .in("id", ids);

    const [{ data: assignments }, { data: settings }] = await Promise.all([
      context.supabase.from("caller_brandings").select("user_id, branding_id").in("user_id", ids),
      context.supabase.from("caller_settings").select("user_id, visible_from").in("user_id", ids),
    ]);

    const brandingsByUser = new Map<string, string[]>();
    for (const row of assignments ?? []) {
      const key = String(row.user_id);
      brandingsByUser.set(key, [...(brandingsByUser.get(key) ?? []), String(row.branding_id)]);
    }
    const visibleByUser = new Map(
      (settings ?? []).map((row) => [String(row.user_id), (row.visible_from as string | null) ?? null]),
    );

    const byId = new Map((profiles ?? []).map((p) => [String(p.id), p]));
    return ids
      .map((id) => {
        const profile = byId.get(id);
        return {
          userId: id,
          email: profile?.email ?? null,
          fullName: profile?.full_name ?? null,
          createdAt: profile?.created_at ?? null,
          brandingIds: brandingsByUser.get(id) ?? [],
          visibleFrom: visibleByUser.get(id) ?? null,
        };
      })
      .sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""));
  });

export const createCallerAccount = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (input: {
      email: string;
      password: string;
      fullName?: string;
      brandingIds?: string[];
      visibleFrom?: string | null;
    }) =>
      z
        .object({
          email: z.string().trim().email("Bitte eine gültige E-Mail-Adresse angeben.").max(160),
          password: passwordSchema,
          fullName: z.string().trim().max(160).optional(),
          brandingIds: z.array(z.string().uuid()).max(100).optional(),
          visibleFrom: visibleFromSchema,
        })
        .parse(input),
  )
  .handler(async ({ data, context }): Promise<{ userId: string }> => {
    await requireAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: created, error } = await supabaseAdmin.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true,
      user_metadata: data.fullName ? { full_name: data.fullName } : {},
    });
    if (error || !created.user) {
      throw new Error(
        error?.message?.toLowerCase().includes("already")
          ? "Für diese E-Mail-Adresse existiert bereits ein Konto."
          : "Das Caller-Konto konnte nicht angelegt werden.",
      );
    }

    const userId = created.user.id;

    await supabaseAdmin
      .from("profiles")
      .upsert(
        { id: userId, email: data.email, full_name: data.fullName ?? null },
        { onConflict: "id" },
      );

    const { error: roleError } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: userId, role: "caller" });
    if (roleError) {
      await supabaseAdmin.auth.admin.deleteUser(userId);
      throw new Error("Die Rolle konnte nicht zugewiesen werden.");
    }

    await applyCallerAccess(userId, data.brandingIds ?? [], data.visibleFrom ?? null);

    return { userId };
  });

export const updateCallerAccess = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { userId: string; brandingIds: string[]; visibleFrom?: string | null }) =>
    z
      .object({
        userId: z.string().uuid(),
        brandingIds: z.array(z.string().uuid()).max(100),
        visibleFrom: visibleFromSchema,
      })
      .parse(input),
  )
  .handler(async ({ data, context }): Promise<{ ok: true }> => {
    await requireAdmin(context);
    await applyCallerAccess(data.userId, data.brandingIds, data.visibleFrom ?? null);
    return { ok: true };
  });

export const resetCallerPassword = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { userId: string; password: string }) =>
    z.object({ userId: z.string().uuid(), password: passwordSchema }).parse(input),
  )
  .handler(async ({ data, context }): Promise<{ ok: true }> => {
    await requireAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: roles } = await supabaseAdmin
      .from("user_roles")
      .select("user_id")
      .eq("user_id", data.userId)
      .eq("role", "caller");
    if (!roles || roles.length === 0) throw new Error("Dieses Konto ist kein Caller-Konto.");

    const { error } = await supabaseAdmin.auth.admin.updateUserById(data.userId, {
      password: data.password,
    });
    if (error) throw new Error("Das Passwort konnte nicht geändert werden.");
    return { ok: true };
  });

export const deleteCallerAccount = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { userId: string }) => z.object({ userId: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }): Promise<{ ok: true }> => {
    await requireAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: roles } = await supabaseAdmin
      .from("user_roles")
      .select("user_id")
      .eq("user_id", data.userId)
      .eq("role", "caller");
    if (!roles || roles.length === 0) throw new Error("Dieses Konto ist kein Caller-Konto.");

    await supabaseAdmin.from("caller_brandings").delete().eq("user_id", data.userId);
    await supabaseAdmin.from("caller_settings").delete().eq("user_id", data.userId);
    await supabaseAdmin.from("user_roles").delete().eq("user_id", data.userId);
    const { error } = await supabaseAdmin.auth.admin.deleteUser(data.userId);
    if (error) throw new Error("Das Konto konnte nicht gelöscht werden.");
    return { ok: true };
  });
