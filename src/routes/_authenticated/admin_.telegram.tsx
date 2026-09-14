import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin_/telegram")({
  beforeLoad: () => {
    throw redirect({ to: "/admin/settings", search: { tab: "telegram" }, replace: true });
  },
});
