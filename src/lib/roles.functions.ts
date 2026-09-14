import { createServerFn } from "@tanstack/react-start";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type AppRole = "admin" | "caller";

export type MyAccount = {
  userId: string;
  email: string | null;
  fullName: string | null;
  role: AppRole | null;
};

/** Rolle und Profil des angemeldeten Mitarbeiters. */
export const getMyAccount = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<MyAccount> => {
    const { supabase, userId, claims } = context;

    const [{ data: profile }, { data: roles }] = await Promise.all([
      supabase.from("profiles").select("email, full_name").eq("id", userId).maybeSingle(),
      supabase.from("user_roles").select("role").eq("user_id", userId),
    ]);

    const roleList = (roles ?? []).map((r) => r.role as AppRole);
    const role: AppRole | null = roleList.includes("admin")
      ? "admin"
      : roleList.includes("caller")
        ? "caller"
        : null;

    return {
      userId,
      email: profile?.email ?? (typeof claims["email"] === "string" ? claims["email"] : null),
      fullName: profile?.full_name ?? null,
      role,
    };
  });
