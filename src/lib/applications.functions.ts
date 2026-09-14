import { store, type LoanApplication } from "@/lib/mock-data";

export async function listLoanApplications(): Promise<LoanApplication[]> {
  return store.applications
    .slice()
    .sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export type AdminDocumentGroup = {
  applicationId: string;
  customer: string;
  email: string | null;
  bankName: string | null;
  amount: number | null;
  createdAt: string;
  documents: {
    id: string;
    kind: string;
    fileName: string;
    filePath: string;
    mimeType: string | null;
    fileSize: number | null;
    createdAt: string;
    url: string | null;
  }[];
};

function mapDoc(d: (typeof store.documents)[number]): AdminDocumentGroup["documents"][number] {
  return {
    id: d.id,
    kind: d.kind,
    fileName: d.file_name,
    filePath: d.file_path,
    mimeType: d.mime_type,
    fileSize: d.file_size,
    createdAt: d.created_at,
    url: d.url,
  };
}

/** Alle hochgeladenen Dokumente, gruppiert nach Antrag. */
export async function listApplicationDocumentsAdmin(): Promise<AdminDocumentGroup[]> {
  const groups = new Map<string, AdminDocumentGroup>();

  const docs = store.documents
    .slice()
    .sort((a, b) => b.created_at.localeCompare(a.created_at));

  for (const doc of docs) {
    const app = store.applications.find((a) => a.id === doc.application_id);
    let group = groups.get(doc.application_id);
    if (!group) {
      group = {
        applicationId: doc.application_id,
        customer:
          [app?.first_name, app?.last_name].filter(Boolean).join(" ") || app?.email || "—",
        email: app?.email ?? null,
        bankName: app?.bank_name ?? null,
        amount: app?.amount ?? null,
        createdAt: app?.created_at ?? doc.created_at,
        documents: [],
      };
      groups.set(doc.application_id, group);
    }
    group.documents.push(mapDoc(doc));
  }

  return [...groups.values()];
}

export type AdminApplicationDetail = {
  application: LoanApplication;
  documents: AdminDocumentGroup["documents"];
};

/** Einzelner Antrag inkl. Dokumente. */
export async function getApplicationAdmin(input: {
  applicationId: string;
}): Promise<AdminApplicationDetail | null> {
  const application = store.applications.find((a) => a.id === input.applicationId);
  if (!application) return null;

  const documents = store.documents
    .filter((d) => d.application_id === input.applicationId)
    .sort((a, b) => a.created_at.localeCompare(b.created_at))
    .map(mapDoc);

  return { application, documents };
}
