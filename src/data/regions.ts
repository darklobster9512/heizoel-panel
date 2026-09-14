export type StateSlug =
  | "baden-wuerttemberg"
  | "bayern"
  | "berlin"
  | "brandenburg"
  | "bremen"
  | "hamburg"
  | "hessen"
  | "mecklenburg-vorpommern"
  | "niedersachsen"
  | "nordrhein-westfalen"
  | "rheinland-pfalz"
  | "saarland"
  | "sachsen"
  | "sachsen-anhalt"
  | "schleswig-holstein"
  | "thueringen";

export interface State {
  slug: StateSlug;
  name: string;
  /** Anzahl Städte und Gemeinden im Bundesland */
  cityCount: number;
  /** Anzahl Postleitzahl-Bereiche */
  plzCount: number;
  capital: string;
  /** Heizperiode, z. B. "Oktober bis April" */
  heatingPeriod: string;
  /** typischer Jahresbedarf Einfamilienhaus */
  consumption: [number, number];
  /** Klima- und Landschaftsbeschreibung (ein Satz, ohne Punkt am Ende) */
  climate: string;
  /** regionale Besonderheit für den Bestell-Abschnitt */
  logistics: string;
  neighbours: StateSlug[];
}

export interface City {
  slug: string;
  name: string;
  state: StateSlug;
  plz: string;
  population: number;
  district?: string;
}

export const PRICE_PER_100 = 128.78;
export const PRICE_PREMIUM_PER_100 = 133.16;
export const MIN_LITERS = 1500;
export const SAMPLE_LITERS = 3000;
export const DELIVERY_DAYS = 7;
export const REVIEW_SCORE = "4,9";
export const REVIEW_COUNT = "25.000";

export const STATES: State[] = [
  {
    slug: "baden-wuerttemberg",
    name: "Baden-Württemberg",
    cityCount: 1101,
    plzCount: 1225,
    capital: "Stuttgart",
    heatingPeriod: "Oktober bis April",
    consumption: [2500, 3500],
    climate:
      "zwischen Rheinebene, Schwarzwald und Schwäbischer Alb liegen sehr unterschiedliche Klimazonen — im Oberrheingraben ist es mild, in den Höhenlagen deutlich kälter",
    logistics:
      "In den Höhenlagen des Schwarzwalds und der Schwäbischen Alb planen wir Lieferungen im Winter mit etwas Puffer, damit der Tankwagen auch bei Schnee sicher zufahren kann",
    neighbours: ["bayern", "hessen", "rheinland-pfalz"],
  },
  {
    slug: "bayern",
    name: "Bayern",
    cityCount: 2056,
    plzCount: 2098,
    capital: "München",
    heatingPeriod: "Oktober bis April",
    consumption: [2600, 3600],
    climate:
      "vom Alpenvorland bis nach Franken reicht die Spanne von rauem Bergklima bis zu milden Flusstälern an Main und Donau",
    logistics:
      "Im Alpenvorland und im Bayerischen Wald sind Zufahrten oft eng — geben Sie bei der Bestellung einfach an, wie viel Schlauch benötigt wird",
    neighbours: ["baden-wuerttemberg", "hessen", "thueringen", "sachsen"],
  },
  {
    slug: "berlin",
    name: "Berlin",
    cityCount: 1,
    plzCount: 190,
    capital: "Berlin",
    heatingPeriod: "Oktober bis April",
    consumption: [2200, 3200],
    climate:
      "Berlin liegt im kontinental geprägten Nordostdeutschen Tiefland mit trockenen, kalten Wintern",
    logistics:
      "In dicht bebauten Innenstadtlagen stimmen wir das Lieferfenster ab, damit der Tankwagen freie Zufahrt zum Grundstück hat",
    neighbours: ["brandenburg"],
  },
  {
    slug: "brandenburg",
    name: "Brandenburg",
    cityCount: 417,
    plzCount: 587,
    capital: "Potsdam",
    heatingPeriod: "Oktober bis April",
    consumption: [2600, 3600],
    climate:
      "Brandenburg ist kontinental geprägt: kalte, trockene Winter und viele Einfamilienhäuser im ländlichen Raum",
    logistics:
      "Im ländlichen Brandenburg liefern wir auch in Streusiedlungen und Einzellagen — längere Schlauchstrecken sind kein Problem",
    neighbours: ["berlin", "mecklenburg-vorpommern", "sachsen", "sachsen-anhalt", "niedersachsen"],
  },
  {
    slug: "bremen",
    name: "Bremen",
    cityCount: 2,
    plzCount: 61,
    capital: "Bremen",
    heatingPeriod: "Oktober bis April",
    consumption: [2200, 3200],
    climate:
      "Bremen liegt im maritim geprägten Nordwesten mit milden Wintern, aber langer, feuchter Heizperiode",
    logistics:
      "In Bremen und Bremerhaven liefern wir werktags in enger Abstimmung mit Ihrem Wunschtermin",
    neighbours: ["niedersachsen"],
  },
  {
    slug: "hamburg",
    name: "Hamburg",
    cityCount: 1,
    plzCount: 105,
    capital: "Hamburg",
    heatingPeriod: "Oktober bis April",
    consumption: [2200, 3200],
    climate:
      "Hamburg hat maritimes Klima mit milden Wintern und einer langen, feuchten Heizsaison",
    logistics:
      "In Hamburg liefern wir auch in dichte Stadtteile — bei schmalen Zufahrten wählen Sie einfach die passende Schlauchlänge",
    neighbours: ["schleswig-holstein", "niedersachsen"],
  },
  {
    slug: "hessen",
    name: "Hessen",
    cityCount: 426,
    plzCount: 785,
    capital: "Wiesbaden",
    heatingPeriod: "Oktober bis April",
    consumption: [2500, 3500],
    climate:
      "im Rhein-Main-Gebiet ist es mild, in Vogelsberg, Taunus und Rothaargebirge deutlich kälter und schneereicher",
    logistics:
      "In den hessischen Mittelgebirgen empfiehlt sich eine Bestellung vor dem ersten Frost, damit die Zufahrt gesichert ist",
    neighbours: ["nordrhein-westfalen", "niedersachsen", "thueringen", "bayern", "baden-wuerttemberg", "rheinland-pfalz"],
  },
  {
    slug: "mecklenburg-vorpommern",
    name: "Mecklenburg-Vorpommern",
    cityCount: 724,
    plzCount: 468,
    capital: "Schwerin",
    heatingPeriod: "Oktober bis April",
    consumption: [2600, 3600],
    climate:
      "an der Ostseeküste ist es maritim mild, im Binnenland der Mecklenburgischen Seenplatte kontinental kalt",
    logistics:
      "Auf Rügen, Usedom und in der Seenplatte planen wir Touren gebündelt — deshalb lohnt sich eine frühzeitige Terminwahl",
    neighbours: ["schleswig-holstein", "brandenburg", "niedersachsen"],
  },
  {
    slug: "niedersachsen",
    name: "Niedersachsen",
    cityCount: 944,
    plzCount: 1268,
    capital: "Hannover",
    heatingPeriod: "Oktober bis April",
    consumption: [2500, 3500],
    climate:
      "von der Nordseeküste über die Lüneburger Heide bis in den Harz reichen milde maritime und raue Berglagen",
    logistics:
      "Im Harz und in den Küstenregionen sind Lieferfenster im Winter stärker nachgefragt — früh bestellen sichert den Wunschtermin",
    neighbours: ["schleswig-holstein", "hamburg", "bremen", "mecklenburg-vorpommern", "brandenburg", "sachsen-anhalt", "thueringen", "hessen", "nordrhein-westfalen"],
  },
  {
    slug: "nordrhein-westfalen",
    name: "Nordrhein-Westfalen",
    cityCount: 396,
    plzCount: 1200,
    capital: "Düsseldorf",
    heatingPeriod: "Oktober bis April",
    consumption: [2400, 3400],
    climate:
      "die Rheinschiene zählt zu den mildesten Regionen Deutschlands, Eifel, Sauerland und Bergisches Land sind deutlich kälter",
    logistics:
      "Im Ruhrgebiet und am Rhein sind die Liefertouren dicht — dadurch sind Termine meist schon vor Ablauf der 7 Werktage möglich",
    neighbours: ["niedersachsen", "hessen", "rheinland-pfalz"],
  },
  {
    slug: "rheinland-pfalz",
    name: "Rheinland-Pfalz",
    cityCount: 2304,
    plzCount: 1032,
    capital: "Mainz",
    heatingPeriod: "Oktober bis April",
    consumption: [2500, 3500],
    climate:
      "in Rheintal und Pfalz wachsen Weinreben bei mildem Klima, Eifel, Westerwald und Hunsrück sind deutlich kühler",
    logistics:
      "In Eifel, Hunsrück und Westerwald sind viele Zufahrten steil oder eng — die Schlauchlänge lässt sich vor der Bestellung anpassen",
    neighbours: ["nordrhein-westfalen", "hessen", "baden-wuerttemberg", "saarland"],
  },
  {
    slug: "saarland",
    name: "Saarland",
    cityCount: 52,
    plzCount: 130,
    capital: "Saarbrücken",
    heatingPeriod: "Oktober bis April",
    consumption: [2400, 3400],
    climate:
      "das Saarland liegt in einer der wärmeren Regionen Deutschlands mit milden Wintern im Saartal",
    logistics:
      "Durch die kurzen Wege im Saarland sind Liefertermine in der Regel schnell verfügbar",
    neighbours: ["rheinland-pfalz"],
  },
  {
    slug: "sachsen",
    name: "Sachsen",
    cityCount: 419,
    plzCount: 690,
    capital: "Dresden",
    heatingPeriod: "Oktober bis April",
    consumption: [2600, 3600],
    climate:
      "im Elbtal ist es relativ mild, im Erzgebirge und Vogtland herrscht raues, schneereiches Bergklima",
    logistics:
      "Im Erzgebirge planen wir Winterlieferungen mit Puffer ein, damit der Tankwagen die Zufahrt sicher erreicht",
    neighbours: ["brandenburg", "sachsen-anhalt", "thueringen", "bayern"],
  },
  {
    slug: "sachsen-anhalt",
    name: "Sachsen-Anhalt",
    cityCount: 218,
    plzCount: 505,
    capital: "Magdeburg",
    heatingPeriod: "Oktober bis April",
    consumption: [2600, 3600],
    climate:
      "die Magdeburger Börde ist trocken und kontinental, der Harzrand deutlich kälter und schneereicher",
    logistics:
      "Im Harz und in der Altmark bündeln wir Touren — eine frühe Terminwahl sichert den Wunschtag",
    neighbours: ["niedersachsen", "brandenburg", "sachsen", "thueringen"],
  },
  {
    slug: "schleswig-holstein",
    name: "Schleswig-Holstein",
    cityCount: 1106,
    plzCount: 654,
    capital: "Kiel",
    heatingPeriod: "Oktober bis April",
    consumption: [2500, 3500],
    climate:
      "zwischen Nordsee und Ostsee sorgt das maritime Klima für milde, aber windige und lange Heizperioden",
    logistics:
      "An der Küste und auf den Inseln fahren wir feste Touren — mit etwas Vorlauf klappt fast jeder Wunschtermin",
    neighbours: ["hamburg", "niedersachsen", "mecklenburg-vorpommern"],
  },
  {
    slug: "thueringen",
    name: "Thüringen",
    cityCount: 631,
    plzCount: 445,
    capital: "Erfurt",
    heatingPeriod: "Oktober bis April",
    consumption: [2600, 3600],
    climate:
      "das Thüringer Becken ist mild und trocken, Thüringer Wald und Rhön sind kalt und schneesicher",
    logistics:
      "Im Thüringer Wald empfehlen wir die Bestellung vor Wintereinbruch, damit die Zufahrt frei ist",
    neighbours: ["niedersachsen", "sachsen-anhalt", "sachsen", "bayern", "hessen"],
  },
];

export const STATE_BY_SLUG: Record<string, State> = Object.fromEntries(
  STATES.map((s) => [s.slug, s]),
);

export function stateName(slug: string): string {
  return STATE_BY_SLUG[slug]?.name ?? slug;
}

export const euro = (value: number) =>
  value.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const num = (value: number) => value.toLocaleString("de-DE");

export const sampleTotal = () => (PRICE_PER_100 / 100) * SAMPLE_LITERS;

export const pricePerLiter = () => PRICE_PER_100 / 100;

export function todayStamp(): string {
  return new Date().toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

/** stabiler Hash für Textvarianten */
export function variantIndex(seed: string, buckets: number): number {
  let h = 0;
  for (let i = 0; i < seed.length; i += 1) h = (h * 31 + seed.charCodeAt(i)) % 100000;
  return h % buckets;
}
