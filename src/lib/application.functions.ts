import { newId, store, type Json, type LoanApplication } from "@/lib/mock-data";
import type { WizardData } from "@/lib/wizard-store";

export type OfferSelection = {
  bankId: string | null;
  bankName: string;
  bankLogoKey: string | null;
  amount: number;
  termMonths: number;
  effRate: number;
  monthlyRate: number;
  totalAmount: number;
  insurance: string;
};

export type CreateApplicationInput = {
  wizard: WizardData;
  offer: OfferSelection;
  userId?: string | null;
};

export type ApplicationSummary = {
  id: string;
  createdAt: string;
  status: string | null;
  bankId: string | null;
  bankName: string | null;
  bankLogoKey: string | null;
  amount: number | null;
  termMonths: number | null;
  effRate: number | null;
  monthlyRate: number | null;
  totalAmount: number | null;
  insurance: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  bank: {
    name: string;
    logoKey: string | null;
    logoUrl: string | null;
    payoutDays: number;
    companyName: string | null;
    street: string | null;
    zip: string | null;
    city: string | null;
    documents: string;
    freeSpecialRepayment: boolean;
    freeFullRepayment: boolean;
    paymentBreak: boolean;
    onlineUpload: boolean;
    onlineId: boolean;
  } | null;
};

export type ApplicationDocument = {
  id: string;
  kind: string;
  fileName: string;
  fileSize: number | null;
  createdAt: string;
};

/** Legt einen Antrag im Demo-Speicher an. */
export async function createApplication(input: CreateApplicationInput): Promise<{ id: string }> {
  const w = (input.wizard ?? {}) as Record<string, unknown>;
  const o = input.offer;
  const id = newId();

  const application: LoanApplication = {
    id,
    created_at: new Date().toISOString(),
    status: "neu",
    bank_id: o.bankId,
    bank_name: o.bankName,
    amount: o.amount ?? (w["amount"] as number | undefined) ?? null,
    term_months: o.termMonths ?? (w["termMonths"] as number | undefined) ?? null,
    eff_rate: o.effRate,
    monthly_rate: o.monthlyRate,
    total_amount: o.totalAmount,
    selected_insurance: o.insurance,
    first_name: (w["firstName"] as string | undefined) ?? null,
    last_name: (w["lastName"] as string | undefined) ?? null,
    email: (w["email"] as string | undefined) ?? null,
    phone: (w["phone"] as string | undefined) ?? null,
    purpose: (w["purpose"] as string | undefined) ?? null,
    side_jobs: (w["sideJobs"] ?? null) as Json,
    loans: (w["loans"] ?? null) as Json,
    full_data: JSON.parse(JSON.stringify({ wizard: w, offer: o })) as Json,
  };

  // Alle weiteren Wizard-Angaben in snake_case übernehmen.
  for (const [key, value] of Object.entries(w)) {
    const snake = key.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`);
    if (application[snake] === undefined) {
      application[snake] = (value ?? null) as Json;
    }
  }

  store.applications.unshift(application);
  return { id };
}

/** Antrag anhand der Antrags-ID laden. */
export async function getApplication(input: { id: string }): Promise<ApplicationSummary | null> {
  const row = store.applications.find((a) => a.id === input.id);
  if (!row) return null;

  const full = (row.full_data ?? {}) as { offer?: { bankLogoKey?: string | null } };
  const bank = row.bank_id ? store.banks.find((b) => b.id === row.bank_id) : undefined;

  return {
    id: row.id,
    createdAt: row.created_at,
    status: row.status ?? null,
    bankId: row.bank_id,
    bankName: row.bank_name,
    bankLogoKey: full.offer?.bankLogoKey ?? bank?.logo_key ?? null,
    amount: row.amount,
    termMonths: row.term_months,
    effRate: row.eff_rate,
    monthlyRate: row.monthly_rate,
    totalAmount: row.total_amount,
    insurance: row.selected_insurance,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    bank: bank
      ? {
          name: bank.name,
          logoKey: bank.logo_key,
          logoUrl: bank.logo_url,
          payoutDays: bank.payout_days,
          companyName: bank.company_name,
          street: bank.street,
          zip: bank.zip,
          city: bank.city,
          documents: bank.documents,
          freeSpecialRepayment: bank.free_special_repayment,
          freeFullRepayment: bank.free_full_repayment,
          paymentBreak: bank.payment_break,
          onlineUpload: bank.online_upload,
          onlineId: bank.online_id,
        }
      : null,
  };
}

/** Dokumente eines Antrags (nur Metadaten). */
export async function listApplicationDocuments(input: {
  applicationId: string;
}): Promise<ApplicationDocument[]> {
  return store.documents
    .filter((d) => d.application_id === input.applicationId)
    .sort((a, b) => a.created_at.localeCompare(b.created_at))
    .map((d) => ({
      id: d.id,
      kind: d.kind,
      fileName: d.file_name,
      fileSize: d.file_size,
      createdAt: d.created_at,
    }));
}

/** Datei dem Antrag zuordnen (Demo: nur Name, Größe und lokale Vorschau-URL). */
export async function registerApplicationDocument(input: {
  applicationId: string;
  kind: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  url?: string | null;
}): Promise<ApplicationDocument> {
  const row = {
    id: newId(),
    application_id: input.applicationId,
    kind: input.kind,
    file_name: input.fileName,
    file_path: `demo/${input.applicationId}/${input.fileName}`,
    file_size: input.fileSize,
    mime_type: input.mimeType,
    created_at: new Date().toISOString(),
    url: input.url ?? null,
  };
  store.documents.push(row);

  return {
    id: row.id,
    kind: row.kind,
    fileName: row.file_name,
    fileSize: row.file_size,
    createdAt: row.created_at,
  };
}

/** Dokument wieder entfernen. */
export async function deleteApplicationDocument(input: {
  id: string;
  applicationId: string;
}): Promise<{ ok: boolean }> {
  const index = store.documents.findIndex(
    (d) => d.id === input.id && d.application_id === input.applicationId,
  );
  if (index === -1) return { ok: false };
  const [removed] = store.documents.splice(index, 1);
  if (removed?.url?.startsWith("blob:")) URL.revokeObjectURL(removed.url);
  return { ok: true };
}

/** Dokumente final einreichen. */
export async function submitApplicationDocuments(input: {
  applicationId: string;
}): Promise<{ ok: boolean }> {
  const app = store.applications.find((a) => a.id === input.applicationId);
  if (app) app.status = "dokumente_eingereicht";
  return { ok: true };
}
