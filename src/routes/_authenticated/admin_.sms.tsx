import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin_/sms")({
  beforeLoad: () => {
    throw redirect({ to: "/admin/settings", search: { tab: "sms" }, replace: true });
  },
});
