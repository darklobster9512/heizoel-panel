import targobank from "@/assets/targobank.svg.asset.json";
import vvrb from "@/assets/vvrb.svg.asset.json";
import creditplus from "@/assets/creditplus.svg.asset.json";
import ingdiba from "@/assets/ingdiba.svg.asset.json";
import santander from "@/assets/santander.svg.asset.json";
import postbank from "@/assets/postbank.svg.asset.json";
import skredit from "@/assets/skreditpartnerkredit.svg.asset.json";
import commerzbank from "@/assets/commerzbank.svg.asset.json";
import auxmoney from "@/assets/auxmoney.svg.asset.json";
import hvb from "@/assets/hvb.svg.asset.json";
import bankofscotland from "@/assets/bankofscotland.svg.asset.json";
import dkb from "@/assets/dkb.svg.asset.json";
import vonessen from "@/assets/vonessensubprime.svg.asset.json";
import deutschebank from "@/assets/deutschebank.svg.asset.json";

export const BANK_LOGOS: { key: string; label: string; url: string }[] = [
  { key: "targobank", label: "TARGOBANK", url: targobank.url },
  { key: "vvrb", label: "Vereinigte Volksbank Raiffeisenbank", url: vvrb.url },
  { key: "creditplus", label: "CreditPlus Bank", url: creditplus.url },
  { key: "ingdiba", label: "ING", url: ingdiba.url },
  { key: "santander", label: "Santander", url: santander.url },
  { key: "postbank", label: "Postbank", url: postbank.url },
  { key: "skreditpartnerkredit", label: "S-Kredit-per-Klick", url: skredit.url },
  { key: "commerzbank", label: "Commerzbank", url: commerzbank.url },
  { key: "auxmoney", label: "auxmoney", url: auxmoney.url },
  { key: "hvb", label: "HypoVereinsbank", url: hvb.url },
  { key: "bankofscotland", label: "Bank of Scotland", url: bankofscotland.url },
  { key: "dkb", label: "DKB", url: dkb.url },
  { key: "vonessen", label: "Consors Finanz", url: vonessen.url },
  { key: "deutschebank", label: "Deutsche Bank", url: deutschebank.url },
];

const BY_KEY = new Map(BANK_LOGOS.map((l) => [l.key, l.url]));

export function bankLogoSrc(logoKey?: string | null, logoUrl?: string | null): string | null {
  if (logoKey && BY_KEY.has(logoKey)) return BY_KEY.get(logoKey) ?? null;
  return logoUrl && logoUrl.trim() !== "" ? logoUrl : null;
}
