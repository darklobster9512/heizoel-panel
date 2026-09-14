/**
 * Demo-Anmeldung ohne Backend: die Sitzung liegt nur im Browser (localStorage).
 * E-Mail-Adressen, die mit "admin@" beginnen, erhalten die Rolle "admin".
 */
import { useEffect, useState } from "react";

import { newId, store } from "@/lib/mock-data";

export type AppRole = "admin" | "user";

export type MockSession = {
  userId: string;
  email: string;
  role: AppRole;
  createdAt: string;
};

const KEY = "klaro-demo-session";

function roleFor(email: string): AppRole {
  return email.trim().toLowerCase().startsWith("admin@") ? "admin" : "user";
}

export function getSession(): MockSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as MockSession;
    return parsed?.email ? parsed : null;
  } catch {
    return null;
  }
}

function persist(session: MockSession | null) {
  if (typeof window === "undefined") return;
  if (session) window.localStorage.setItem(KEY, JSON.stringify(session));
  else window.localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("klaro-demo-session"));
}

export async function signIn(email: string, _password: string): Promise<MockSession> {
  const existing = store.users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
  const session: MockSession = {
    userId: existing?.id ?? newId(),
    email: email.trim(),
    role: roleFor(email),
    createdAt: existing?.createdAt ?? new Date().toISOString(),
  };
  persist(session);
  return session;
}

export async function signUp(email: string, password: string): Promise<MockSession> {
  const normalized = email.trim();
  if (!store.users.some((u) => u.email.toLowerCase() === normalized.toLowerCase())) {
    store.users.push({
      id: newId(),
      email: normalized,
      fullName: null,
      createdAt: new Date().toISOString(),
    });
  }
  return signIn(normalized, password);
}

export async function signOut(): Promise<void> {
  persist(null);
}

/** Reaktive Sitzung für Komponenten. */
export function useSession(): { session: MockSession | null; ready: boolean } {
  const [session, setSession] = useState<MockSession | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const read = () => setSession(getSession());
    read();
    setReady(true);
    window.addEventListener("klaro-demo-session", read);
    window.addEventListener("storage", read);
    return () => {
      window.removeEventListener("klaro-demo-session", read);
      window.removeEventListener("storage", read);
    };
  }, []);

  return { session, ready };
}
