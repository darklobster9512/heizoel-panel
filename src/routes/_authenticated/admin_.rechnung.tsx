import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin_/rechnung")({
  beforeLoad: () => {
    throw redirect({ to: "/admin/settings", search: { tab: "rechnung" }, replace: true });
  },
});
