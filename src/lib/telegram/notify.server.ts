import { PAYMENT_LABEL } from "@/lib/notify/order-payloads";

const TELEGRAM_API_BASE = "https://api.telegram.org";

const euro = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" });
const number = new Intl.NumberFormat("de-DE");

function esc(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function sendTelegramMessage(chatId: string, text: string): Promise<void> {
  const botToken = process.env["TELEGRAM_BOT_TOKEN"];
  if (!botToken) {
    throw new Error("TELEGRAM_BOT_TOKEN ist nicht gesetzt.");
  }

  const response = await fetch(`${TELEGRAM_API_BASE}/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML", disable_web_page_preview: true }),
  });

  if (!response.ok) {
    const body = await response.text();
    console.error(`[telegram] api error [${response.status}]: ${body}`);
    throw new Error(`Telegram-Versand fehlgeschlagen [${response.status}]: ${body}`);
  }

  const result = (await response.json()) as { ok?: boolean; description?: string };
  if (result.ok === false) {
    console.error(`[telegram] api error: ${result.description ?? "unbekannt"}`);
    throw new Error(`Telegram-Versand fehlgeschlagen: ${result.description ?? "unbekannt"}`);
  }
}

export type OrderNotification = {
  orderNumber: string;
  brandingId: string | null;
  brandingName: string | null;
  customerName: string | null;
  email: string;
  phone: string | null;
  liters: number;
  variant: string | null;
  total: number;
  pricePer100: number;
  postalCode: string | null;
  city: string | null;
  paymentMethod: string | null;
};

const VARIANT_LABEL: Record<string, string> = {
  standard: "Standard",
  premium: "Premium",
};

export function renderOrderNotification(order: OrderNotification): string {
  const lines = [
    `🛢️ <b>Neue Bestellung ${esc(order.orderNumber)}</b>`,
    "",
    `<b>Branding:</b> ${esc(order.brandingName ?? "—")}`,
    `<b>Kunde:</b> ${esc(order.customerName ?? "—")}`,
    `<b>E-Mail:</b> ${esc(order.email)}`,
    `<b>Telefon:</b> ${esc(order.phone ?? "—")}`,
    `<b>Menge:</b> ${number.format(order.liters)} Liter`,
    `<b>Heizöl:</b> ${esc(VARIANT_LABEL[order.variant ?? ""] ?? order.variant ?? "—")}`,
    `<b>Zahlungsart:</b> ${esc(PAYMENT_LABEL[order.paymentMethod ?? ""] ?? order.paymentMethod ?? "—")}`,
    `<b>Preis:</b> ${euro.format(order.total)} (${euro.format(order.pricePer100)} / 100 L)`,
    `<b>Lieferort:</b> ${esc([order.postalCode, order.city].filter(Boolean).join(" ") || "—")}`,
  ];
  return lines.join("\n");
}

export async function sendOrderNotification(order: OrderNotification): Promise<void> {
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    let query = supabaseAdmin.from("telegram_recipients").select("chat_id, branding_id").eq("is_active", true);
    query = order.brandingId
      ? query.or(`branding_id.is.null,branding_id.eq.${order.brandingId}`)
      : query.is("branding_id", null);

    const { data, error } = await query;
    if (error) {
      console.error("[telegram] recipients query failed", error);
      return;
    }
    const recipients = data ?? [];
    if (recipients.length === 0) return;

    const text = renderOrderNotification(order);
    await Promise.all(
      recipients.map(async (recipient) => {
        try {
          await sendTelegramMessage(String(recipient.chat_id), text);
        } catch (err) {
          console.error("[telegram] send failed", err);
        }
      }),
    );
  } catch (err) {
    console.error("[telegram] notification failed", err);
  }
}
