import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type SideJob = {
  income?: number;
  provable?: boolean;
  kind?: string;
  since?: string;
  temporary?: boolean;
  temporaryUntil?: string;
  probation?: boolean;
};

export type LoanEntry = {
  kind?: string;
  originalAmount?: number;
  monthlyRate?: number;
  startDate?: string;
  endDate?: string;
  refinance?: boolean;
  remainingDebt?: number;
  bankDetailType?: "iban" | "konto";
  iban?: string;
  accountNumber?: string;
  bankCode?: string;
};

export type WizardData = {
  purpose?: string;
  amount?: number;
  termMonths?: number;
  downPayment?: number;
  borrowers?: 1 | 2;
  relationship?: string;
  maritalStatus?: string;
  profession?: string;
  housing?: string;
  adults?: number;
  children?: number;
  childrenKindergeld?: number;
  netIncome?: number;
  incomeVariation?: boolean;
  sideJob?: boolean;
  sideJobCount?: number;
  sideJobs?: SideJob[];
  otherIncome?: boolean;
  alimonySpouseAmount?: number;
  pensionAmount?: number;
  childSupportAmount?: number;
  rentedProperty?: boolean;
  rentedPropertyType?: string;
  rentedPropertyArea?: number;
  rentalIncome?: number;
  warmRent?: number;
  privateHealth?: boolean;
  privateHealthAmount?: number;
  alimonySpouse?: boolean;
  alimonyChild?: boolean;
  alimonyChildAmount?: number;
  ownsCar?: boolean;
  salutation?: "herr" | "frau";
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  marketingConsent?: boolean;
  birthdate?: string;
  birthplace?: string;
  birthcountry?: string;
  nationality?: string;
  moreNationalities?: boolean;
  secondNationality?: string;
  zip?: string;
  city?: string;
  street?: string;
  houseNumber?: string;
  country?: string;
  residentSince?: string;
  employer?: string;
  employedSince?: string;
  partTime?: boolean;
  partTimeType?: "teilzeit" | "kurzarbeit";
  temporaryContract?: boolean;
  temporaryContractUntil?: string;
  contractExtended?: boolean;
  existingLoans?: number;
  loans?: LoanEntry[];
  loanAmountAdjust?: "keep" | "increase" | "custom";
  loanAmountCustom?: number;
  insurance?: string;
  referralSource?: string;
  bankDetailType?: "iban" | "konto";
  bankIban?: string;
  bankCountry?: string;
  bankAccountNumber?: string;
  bankCode?: string;
};

const STORAGE_KEY = "smava-wizard";

const DEFAULTS: WizardData = {
  borrowers: 1,
  relationship: "Ehepartner",
  maritalStatus: "ledig",
  profession: "Angestellte/r",
  housing: "zur Miete",
  adults: 1,
  children: 0,
  childrenKindergeld: 0,
  incomeVariation: false,
  sideJob: false,
  otherIncome: false,
  rentedProperty: false,
  privateHealth: false,
  alimonySpouse: false,
  alimonyChild: false,
  ownsCar: false,
  birthcountry: "Deutschland",
  nationality: "Deutschland",
  moreNationalities: false,
  country: "Deutschland",
  partTime: false,
  partTimeType: "teilzeit",
  temporaryContract: false,
  contractExtended: false,
  existingLoans: 0,
  loans: [],
  loanAmountAdjust: "increase",
  bankDetailType: "iban",
  bankCountry: "Deutschland",
};

type WizardContextValue = {
  data: WizardData;
  update: (patch: Partial<WizardData>) => void;
  reset: () => void;
};

const WizardContext = createContext<WizardContextValue | null>(null);

function loadQuery(search: Record<string, unknown>): WizardData {
  const fromQuery: WizardData = {};
  if (typeof search["zweck"] === "string" && search["zweck"]) fromQuery.purpose = search["zweck"];
  if (typeof search["betrag"] === "number") fromQuery.amount = search["betrag"];
  if (typeof search["laufzeit"] === "number") fromQuery.termMonths = search["laufzeit"];
  if (typeof search["anzahlung"] === "number") fromQuery.downPayment = search["anzahlung"];
  return fromQuery;
}

function loadInitial(search: Record<string, unknown>): WizardData {
  return { ...DEFAULTS, ...loadQuery(search) };
}

export function WizardProvider({
  search,
  children,
}: {
  search: Record<string, unknown>;
  children: ReactNode;
}) {
  const [data, setData] = useState<WizardData>(() => loadInitial(search));

  const hydrated = useRef(false);
  const searchKey = JSON.stringify(search ?? {});

  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;
    try {
      const stored = JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) ?? "{}") as WizardData;
      setData({ ...DEFAULTS, ...stored, ...loadQuery(JSON.parse(searchKey) as Record<string, unknown>) });
    } catch {
      /* ignore */
    }
  }, [searchKey]);

  useEffect(() => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      /* ignore */
    }
  }, [data]);

  const value = useMemo<WizardContextValue>(
    () => ({
      data,
      update: (patch) => setData((prev) => ({ ...prev, ...patch })),
      reset: () => {
        setData({ ...DEFAULTS });
        try {
          window.sessionStorage.removeItem(STORAGE_KEY);
        } catch {
          /* ignore */
        }
      },
    }),
    [data],
  );

  return <WizardContext.Provider value={value}>{children}</WizardContext.Provider>;
}

export function useWizard(): WizardContextValue {
  const ctx = useContext(WizardContext);
  if (!ctx) throw new Error("useWizard must be used inside WizardProvider");
  return ctx;
}
