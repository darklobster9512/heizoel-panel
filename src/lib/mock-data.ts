/**
 * Demo-Datenspeicher (kein Backend).
 * Alle Daten liegen im Modul-Speicher und gehen beim Neuladen verloren.
 */

export type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

export type Bank = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  logo_key: string | null;
  logo_url: string | null;
  sort_order: number;
  active: boolean;
  eff_rate: number;
  min_amount: number;
  max_amount: number;
  min_term: number;
  max_term: number;
  payout_days: number;
  company_name: string | null;
  street: string | null;
  zip: string | null;
  city: string | null;
  documents: string;
  free_special_repayment: boolean;
  free_full_repayment: boolean;
  payment_break: boolean;
  online_upload: boolean;
  online_id: boolean;
};

export type LoanApplication = {
  id: string;
  created_at: string;
  status: string | null;
  bank_id: string | null;
  bank_name: string | null;
  amount: number | null;
  term_months: number | null;
  eff_rate: number | null;
  monthly_rate: number | null;
  total_amount: number | null;
  selected_insurance: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  purpose: string | null;
  side_jobs: Json;
  loans: Json;
  full_data: Json;
  [key: string]: Json | undefined;
};

export type DocumentRow = {
  id: string;
  application_id: string;
  kind: string;
  file_name: string;
  file_path: string;
  file_size: number | null;
  mime_type: string | null;
  created_at: string;
  url: string | null;
};

export type MockUser = {
  id: string;
  email: string;
  fullName: string | null;
  createdAt: string;
};

export function newId(): string {
  return globalThis.crypto?.randomUUID?.() ?? `id-${Math.random().toString(36).slice(2, 12)}`;
}

function daysAgo(days: number): string {
  return new Date(Date.now() - days * 86_400_000).toISOString();
}

function bank(
  name: string,
  logo_key: string,
  eff_rate: number,
  sort_order: number,
  overrides: Partial<Bank> = {},
): Bank {
  return {
    id: `bank-${logo_key}`,
    created_at: daysAgo(120),
    updated_at: daysAgo(5),
    name,
    logo_key,
    logo_url: "",
    sort_order,
    active: true,
    eff_rate,
    min_amount: 1000,
    max_amount: 120000,
    min_term: 12,
    max_term: 120,
    payout_days: 5,
    company_name: `${name} AG`,
    street: "Musterstraße 1",
    zip: "10115",
    city: "Berlin",
    documents: "Kontoauszug, Gehaltsabrechnung",
    free_special_repayment: true,
    free_full_repayment: false,
    payment_break: true,
    online_upload: true,
    online_id: true,
    ...overrides,
  };
}

export const store = {
  banks: [
    bank("TARGOBANK", "targobank", 3.99, 1),
    bank("ING", "ingdiba", 4.19, 2, { max_amount: 75000, payout_days: 3 }),
    bank("Santander", "santander", 4.45, 3, { min_amount: 2500 }),
    bank("Postbank", "postbank", 4.69, 4),
    bank("CreditPlus Bank", "creditplus", 4.89, 5, { max_term: 84 }),
    bank("Commerzbank", "commerzbank", 5.15, 6),
    bank("auxmoney", "auxmoney", 6.45, 7, { max_amount: 50000, payout_days: 2 }),
    bank("DKB", "dkb", 5.49, 8, { active: false }),
  ] as Bank[],

  users: [
    { id: "user-admin", email: "admin@klaro.de", fullName: "Klaro Administrator", createdAt: daysAgo(210) },
    { id: "user-1", email: "maria.schmitt@beispiel.de", fullName: "Maria Schmitt", createdAt: daysAgo(64) },
    { id: "user-2", email: "thomas.becker@beispiel.de", fullName: "Thomas Becker", createdAt: daysAgo(31) },
    { id: "user-3", email: "l.hoffmann@beispiel.de", fullName: "Lena Hoffmann", createdAt: daysAgo(9) },
  ] as MockUser[],

  applications: [] as LoanApplication[],
  documents: [] as DocumentRow[],
};

function demoApplication(
  id: string,
  createdAt: string,
  values: Partial<LoanApplication>,
): LoanApplication {
  const base: LoanApplication = {
    id,
    created_at: createdAt,
    status: "neu",
    bank_id: null,
    bank_name: null,
    amount: null,
    term_months: null,
    eff_rate: null,
    monthly_rate: null,
    total_amount: null,
    selected_insurance: "ohne",
    first_name: null,
    last_name: null,
    email: null,
    phone: null,
    purpose: null,
    side_jobs: null,
    loans: null,
    full_data: null,
    salutation: "Frau",
    birthdate: "1988-04-17",
    birthplace: "Köln",
    birthcountry: "Deutschland",
    nationality: "Deutschland",
    more_nationalities: false,
    marital_status: "verheiratet",
    marketing_consent: true,
    zip: "50667",
    city: "Köln",
    street: "Musterstraße",
    house_number: "12a",
    country: "Deutschland",
    resident_since: 2016,
    housing: "Miete",
    adults: 2,
    children: 1,
    children_kindergeld: 1,
    owns_car: true,
    profession: "Angestellte",
    net_income: 3200,
    income_variation: false,
    side_job: false,
    other_income: false,
    rented_property: false,
    warm_rent: 1150,
    private_health: false,
    alimony_spouse: false,
    alimony_child: false,
    employer: "Beispiel GmbH",
    employed_since: "2018-03-01",
    part_time: false,
    temporary_contract: false,
    existing_loans: 0,
    insurance: "ohne",
    referral_source: "Suchmaschine",
    borrowers: 1,
    down_payment: 0,
    bank_detail_type: "iban",
    bank_iban: "DE02120300000000202051",
  };
  return { ...base, ...values };
}

store.applications = [
  demoApplication("a1b2c3d4-0001-4000-8000-000000000001", daysAgo(2), {
    first_name: "Maria",
    last_name: "Schmitt",
    email: "maria.schmitt@beispiel.de",
    phone: "0221 1234567",
    purpose: "Umschuldung",
    amount: 15000,
    term_months: 48,
    eff_rate: 3.99,
    monthly_rate: 338.42,
    total_amount: 16244.16,
    bank_id: "bank-targobank",
    bank_name: "TARGOBANK",
    status: "dokumente_eingereicht",
  }),
  demoApplication("a1b2c3d4-0002-4000-8000-000000000002", daysAgo(6), {
    salutation: "Herr",
    first_name: "Thomas",
    last_name: "Becker",
    email: "thomas.becker@beispiel.de",
    phone: "030 9876543",
    purpose: "Autokredit",
    amount: 24500,
    term_months: 60,
    eff_rate: 4.19,
    monthly_rate: 452.9,
    total_amount: 27174,
    bank_id: "bank-ingdiba",
    bank_name: "ING",
    zip: "10115",
    city: "Berlin",
    net_income: 4100,
    status: "in_pruefung",
  }),
  demoApplication("a1b2c3d4-0003-4000-8000-000000000003", daysAgo(14), {
    first_name: "Lena",
    last_name: "Hoffmann",
    email: "l.hoffmann@beispiel.de",
    phone: "040 5551234",
    purpose: "Modernisierung",
    amount: 8000,
    term_months: 36,
    eff_rate: 4.45,
    monthly_rate: 237.6,
    total_amount: 8553.6,
    bank_id: "bank-santander",
    bank_name: "Santander",
    zip: "20095",
    city: "Hamburg",
    status: "neu",
  }),
];

store.documents = [
  {
    id: "doc-1",
    application_id: "a1b2c3d4-0001-4000-8000-000000000001",
    kind: "gehaltsabrechnung",
    file_name: "Gehaltsabrechnung-Maerz.pdf",
    file_path: "demo/gehaltsabrechnung-maerz.pdf",
    file_size: 184_320,
    mime_type: "application/pdf",
    created_at: daysAgo(2),
    url: null,
  },
  {
    id: "doc-2",
    application_id: "a1b2c3d4-0001-4000-8000-000000000001",
    kind: "kontoauszug",
    file_name: "Kontoauszug-Q1.pdf",
    file_path: "demo/kontoauszug-q1.pdf",
    file_size: 260_096,
    mime_type: "application/pdf",
    created_at: daysAgo(2),
    url: null,
  },
  {
    id: "doc-3",
    application_id: "a1b2c3d4-0002-4000-8000-000000000002",
    kind: "gehaltsabrechnung",
    file_name: "Lohnabrechnung-Februar.pdf",
    file_path: "demo/lohnabrechnung-februar.pdf",
    file_size: 151_552,
    mime_type: "application/pdf",
    created_at: daysAgo(6),
    url: null,
  },
];
