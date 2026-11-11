const LEAD_WEBHOOK_URL = "https://panel.datenbank.to/api/leads/webhook";

export async function sendLeadWebhook(input: {
  email: string;
  firstName?: string | null;
  lastName?: string | null;
}): Promise<void> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  try {
    const res = await fetch(LEAD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: input.email,
        first_name: input.firstName ?? "",
        last_name: input.lastName ?? "",
        source: "heizoel-shop",
      }),
      signal: controller.signal,
    });
    if (!res.ok) {
      console.error("[lead-webhook] failed", res.status, (await res.text()).slice(0, 300));
    }
  } finally {
    clearTimeout(timer);
  }
}
