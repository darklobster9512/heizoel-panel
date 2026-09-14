import type { LoanApplication } from "@/lib/mock-data";

export type Application = LoanApplication;

export const GROUPS: { title: string; fields: [keyof Application, string][] }[] = [
  {
    title: "Kreditwunsch",
    fields: [
      ["purpose", "Verwendungszweck"],
      ["amount", "Kreditbetrag"],
      ["term_months", "Laufzeit (Monate)"],
      ["down_payment", "Anzahlung"],
      ["borrowers", "Anzahl Kreditnehmer"],
      ["relationship", "Verhältnis der Kreditnehmer"],
      ["loan_amount_adjust", "Kreditbetrag anpassen"],
      ["loan_amount_custom", "Individueller Kreditbetrag"],
    ],
  },
  {
    title: "Person",
    fields: [
      ["salutation", "Anrede"],
      ["first_name", "Vorname"],
      ["last_name", "Nachname"],
      ["email", "E-Mail"],
      ["phone", "Telefon"],
      ["birthdate", "Geburtsdatum"],
      ["birthplace", "Geburtsort"],
      ["birthcountry", "Geburtsland"],
      ["nationality", "Staatsangehörigkeit"],
      ["more_nationalities", "Weitere Staatsangehörigkeiten"],
      ["second_nationality", "Zweite Staatsangehörigkeit"],
      ["marital_status", "Familienstand"],
      ["marketing_consent", "Werbeeinwilligung"],
    ],
  },
  {
    title: "Anschrift",
    fields: [
      ["zip", "PLZ"],
      ["city", "Wohnort"],
      ["street", "Straße"],
      ["house_number", "Hausnummer"],
      ["country", "Land"],
      ["resident_since", "Wohnhaft seit"],
    ],
  },
  {
    title: "Haushalt",
    fields: [
      ["housing", "Wohnsituation"],
      ["adults", "Erwachsene"],
      ["children", "Kinder"],
      ["children_kindergeld", "Kindergeldberechtigte Kinder"],
      ["owns_car", "PKW vorhanden"],
    ],
  },
  {
    title: "Einkommen",
    fields: [
      ["profession", "Berufsgruppe"],
      ["net_income", "Nettoeinkommen"],
      ["income_variation", "Einkommensschwankungen"],
      ["side_job", "Nebentätigkeit"],
      ["side_job_count", "Anzahl Nebentätigkeiten"],
      ["other_income", "Sonstige Einkünfte"],
      ["alimony_spouse_amount", "Ehegattenunterhalt (Einnahme)"],
      ["pension_amount", "Rente"],
      ["child_support_amount", "Kindesunterhalt (Einnahme)"],
      ["rented_property", "Vermietete Immobilie"],
      ["rented_property_type", "Art der Immobilie"],
      ["rented_property_area", "Fläche (qm)"],
      ["rental_income", "Mieteinnahmen"],
    ],
  },
  {
    title: "Ausgaben",
    fields: [
      ["warm_rent", "Warmmiete"],
      ["private_health", "Private Krankenversicherung"],
      ["private_health_amount", "Beitrag PKV"],
      ["alimony_spouse", "Zahlt Ehegattenunterhalt"],
      ["alimony_child", "Zahlt Kindesunterhalt"],
      ["alimony_child_amount", "Kindesunterhalt (Zahlung)"],
    ],
  },
  {
    title: "Beschäftigung",
    fields: [
      ["employer", "Arbeitgeber"],
      ["employed_since", "Beschäftigt seit"],
      ["part_time", "Teilzeit"],
      ["part_time_type", "Teilzeit / Kurzarbeit"],
      ["temporary_contract", "Befristet"],
      ["temporary_contract_until", "Befristet bis"],
      ["contract_extended", "Vertrag verlängert"],
    ],
  },
  {
    title: "Bestehende Kredite & Sonstiges",
    fields: [
      ["existing_loans", "Anzahl bestehender Kredite"],
      ["insurance", "Restschuldversicherung"],
      ["referral_source", "Woher kennen Sie uns?"],
    ],
  },
  {
    title: "Bankverbindung",
    fields: [
      ["bank_detail_type", "Art"],
      ["bank_iban", "IBAN"],
      ["bank_country", "Land"],
      ["bank_account_number", "Kontonummer"],
      ["bank_code", "Bankleitzahl"],
    ],
  },
];

const MASKED: (keyof Application)[] = ["bank_iban", "bank_account_number"];

function mask(value: string): string {
  if (value.length <= 4) return "••••";
  return `${"•".repeat(Math.max(0, value.length - 4))}${value.slice(-4)}`;
}

export function formatValue(key: keyof Application, value: unknown): string {
  if (value === null || value === undefined || value === "") return "—";
  if (typeof value === "boolean") return value ? "Ja" : "Nein";
  if (MASKED.includes(key)) return mask(String(value));
  return String(value);
}

export function formatBytes(bytes: number | null) {
  if (!bytes) return "";
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
