import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin_/emails")({
  beforeLoad: () => {
    throw redirect({ to: "/admin/settings", search: { tab: "emails" }, replace: true });
  },
});
