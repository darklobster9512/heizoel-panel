const RESEND_URL = "https://api.resend.com/emails";

export type ResendAttachment = {
  filename: string;
  content: string; // Base64
};

export type ResendPayload = {
  apiKey: string;
  from: string;
  to: string;
  subject: string;
  html: string;
  replyTo?: string | null;
  attachments?: ResendAttachment[];
};

export async function sendResendEmail(payload: ResendPayload): Promise<void> {
  const body: Record<string, unknown> = {
    from: payload.from,
    to: [payload.to],
    subject: payload.subject,
    html: payload.html,
  };
  if (payload.replyTo) body["reply_to"] = payload.replyTo;
  if (payload.attachments?.length) body["attachments"] = payload.attachments;

  const response = await fetch(RESEND_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${payload.apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text();
    console.error(`[resend] send failed [${response.status}]: ${text}`);
    throw new Error(`E-Mail-Versand fehlgeschlagen [${response.status}]: ${text}`);
  }
}

export function senderLine(name: string | null, email: string): string {
  const clean = (name ?? "").trim();
  return clean ? `"${clean.replace(/"/g, "")}" <${email}>` : email;
}

export function toBase64(bytes: Uint8Array): string {
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}
