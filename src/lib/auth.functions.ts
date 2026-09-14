import { getSession, type AppRole } from "@/lib/mock-auth";
import { store } from "@/lib/mock-data";

export type { AppRole };

export async function getMyAccount() {
  const session = getSession();
  const profile = session
    ? store.users.find((u) => u.email.toLowerCase() === session.email.toLowerCase())
    : undefined;

  return {
    userId: session?.userId ?? "demo",
    email: session?.email ?? null,
    fullName: profile?.fullName ?? null,
    createdAt: profile?.createdAt ?? session?.createdAt ?? null,
    role: (session?.role ?? "user") as AppRole,
  };
}

export async function listAllUsers() {
  return store.users.map((u) => ({
    id: u.id,
    email: u.email,
    fullName: u.fullName,
    createdAt: u.createdAt,
    role: (u.email.toLowerCase().startsWith("admin@") ? "admin" : "user") as AppRole,
  }));
}
