const SEVEN_URL = "https://gateway.seven.io/api/sms";

export type SevenPayload = {
  apiKey: string;
  to: string;
  text: string;
  from?: string | null;
};

/** Normalisiert deutsche Rufnummern auf das internationale Format. */
export function normalizePhone(input: string): string {
  const raw = input.replace(/[^\d+]/g, "");
  if (raw.startsWith("+")) return raw;
  if (raw.startsWith("00")) return `+${raw.slice(2)}`;
  if (raw.startsWith("0")) return `+49${raw.slice(1)}`;
  return raw;
}

export async function sendSevenSms(payload: SevenPayload): Promise<void> {
  const body = new URLSearchParams({
    to: normalizePhone(payload.to),
    text: payload.text,
    json: "1",
  });
  const from = (payload.from ?? "").trim().slice(0, 11);
  if (from) body.set("from", from);

  const response = await fetch(SEVEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Api-Key": payload.apiKey,
      Accept: "application/json",
    },
    body: body.toString(),
  });

  const text = await response.text();
  if (!response.ok) {
    console.error(`[seven] send failed [${response.status}]: ${text}`);
    throw new Error(`SMS-Versand fehlgeschlagen [${response.status}]: ${text}`);
  }

  // Seven.io antwortet mit success "100" bei Erfolg.
  try {
    const parsed = JSON.parse(text) as { success?: string };
    if (parsed.success && parsed.success !== "100") {
      console.error(`[seven] api code ${parsed.success}`);
      throw new Error(`SMS-Versand fehlgeschlagen (Code ${parsed.success}).`);
    }
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("SMS-Versand")) throw error;
    // Keine JSON-Antwort: Statuscode 200 gilt als Erfolg.
  }
}
