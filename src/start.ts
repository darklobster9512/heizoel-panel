import "./lib/server-websocket-polyfill";

import { createStart, createCsrfMiddleware, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

// Eigene Adressen, unter denen das Panel erreichbar ist.
const ALLOWED_ORIGINS = ["https://backend.heizoel-deutschland.com"];

// Start installs this automatically when src/start.ts is absent; defining the
// file opts out, so re-add it explicitly to keep server functions protected
// from cross-site requests.
const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === "serverFn",
  origin: (value, ctx) => {
    if (ALLOWED_ORIGINS.includes(value)) return true;
    try {
      return value === new URL(ctx.request.url).origin;
    } catch {
      return false;
    }
  },
});

// Hängt das Supabase-Zugriffstoken an jeden Server-Funktionsaufruf.
const attachSupabaseAuth = createMiddleware({ type: "function" }).client(async ({ next }) => {
  if (typeof window === "undefined") return next();
  try {
    const { supabase } = await import("./integrations/supabase/client");
    let { data } = await supabase.auth.getSession();
    let token = data.session?.access_token;
    if (!token) {
      // Auf eigenen Domains kann die Sitzung beim ersten Aufruf noch nicht
      // geladen sein — einmal auffrischen, bevor ohne Token gesendet wird.
      const refreshed = await supabase.auth.refreshSession();
      token = refreshed.data.session?.access_token;
    }
    if (token) {
      return next({ headers: { Authorization: `Bearer ${token}` } });
    }
  } catch (error) {
    console.error("[auth] Token konnte nicht angehängt werden", error);
  }
  return next();
});

export const startInstance = createStart(() => ({
  requestMiddleware: [errorMiddleware, csrfMiddleware],
  functionMiddleware: [attachSupabaseAuth],
}));
