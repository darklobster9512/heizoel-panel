import {
  DELIVERY_DAYS,
  MIN_LITERS,
  PRICE_PER_100,
  REVIEW_COUNT,
  REVIEW_SCORE,
  SAMPLE_LITERS,
  euro,
  num,
  pricePerLiter,
  sampleTotal,
  todayStamp,
  variantIndex,
  type City,
  type State,
} from "./regions";

export interface CopyBlock {
  heading: string;
  paragraphs: string[];
}

const price = () => `${euro(PRICE_PER_100)} €`;
const perLiter = () => `${euro(pricePerLiter())} €`;
const total = () => `${euro(sampleTotal())} €`;

export function stateBlocks(state: State): CopyBlock[] {
  const [low, high] = state.consumption;
  return [
    {
      heading: `Heizöl-Lieferung in ganz ${state.name}`,
      paragraphs: [
        `Klaro liefert Heizöl in alle ${num(state.cityCount)} Städte und Gemeinden sowie ${num(state.plzCount)} Postleitzahl-Bereiche in ${state.name}. Der aktuelle Heizölpreis beträgt ab ${price()} pro 100 Liter (Stand: ${todayStamp()}). Bei einer durchschnittlichen Bestellung von ${num(SAMPLE_LITERS)} Litern liegt der Gesamtpreis bei ca. ${total()} — kostenlose Lieferung inklusive.`,
        `Heizölpreise in ${state.name} schwanken täglich je nach Rohölpreis, Dollar-Kurs und saisonaler Nachfrage. Wählen Sie unten Ihre Stadt oder berechnen Sie Ihren Preis direkt mit Ihrer Postleitzahl. Mit über ${REVIEW_COUNT} zufriedenen Kunden deutschlandweit und ${REVIEW_SCORE}/5 Sternen gehört Klaro zu den beliebtesten Heizöl-Anbietern Deutschlands.`,
      ],
    },
    {
      heading: `Heizölpreis pro Liter in ${state.name} — was kostet 1 Liter?`,
      paragraphs: [
        `Der Heizölpreis pro Liter in ${state.name} liegt heute bei ca. ${perLiter()} pro Liter — das entspricht ${price()} pro 100 Liter. Im deutschen Heizöl-Markt ist die Angabe €/100 L Standard, da Heizöl nur in größeren Mengen verkauft wird; bei Klaro beträgt die Mindestbestellmenge ${num(MIN_LITERS)} Liter.`,
        `Bei einer typischen Bestellung von ${num(SAMPLE_LITERS)} Litern — dem durchschnittlichen Jahresbedarf eines Einfamilienhauses — zahlen Sie in ${state.name} ca. ${total()} inklusive Lieferung und Mehrwertsteuer. Je größer die Bestellmenge, desto günstiger wird der Preis pro 100 Liter.`,
      ],
    },
    {
      heading: `Heizöl-Verbrauch in ${state.name}: Klimazone & Saison`,
      paragraphs: [
        `Die Heizperiode in ${state.name} reicht typischerweise von ${state.heatingPeriod}. Klimatisch gilt: ${state.climate}. Der durchschnittliche Heizöl-Jahresbedarf eines Einfamilienhauses in ${state.name} liegt bei ca. ${num(low)} bis ${num(high)} Litern.`,
        `In schlecht gedämmten Altbauten oder Höhenlagen kann der Verbrauch auf 4.000 bis 5.000 Liter steigen, in modernen Niedrigenergiehäusern dagegen unter 1.500 Liter sinken. Das günstigste Bestellfenster für Heizöl in ${state.name} liegt traditionell zwischen Mai und August — in dieser Zeit sind die Heizölpreise im Schnitt 8 bis 12 % niedriger als in den Wintermonaten.`,
      ],
    },
    {
      heading: `Heizöl bestellen in ${state.name} — was Sie wissen müssen`,
      paragraphs: [
        `Beim Heizöl bestellen in ${state.name} ist die Liefermenge entscheidend für den Preis pro 100 Liter: Je größer die Bestellmenge, desto günstiger der €/100-L-Preis. Die Mindestbestellmenge bei Klaro beträgt ${num(MIN_LITERS)} Liter. Die Lieferung erfolgt deutschlandweit innerhalb von ${DELIVERY_DAYS} Werktagen und ist im Preis enthalten.`,
        `${state.logistics}. Alle Zahlungsarten — Vorkasse, Rechnung, EC-Karte und Barzahlung bei Lieferung — sind ohne Aufpreis verfügbar. Mit der Festpreisgarantie ist Ihr Heizölpreis ab Bestellabschluss bindend: Auch bei steigenden Marktpreisen bis zur Lieferung zahlen Sie nur den vereinbarten Betrag.`,
      ],
    },
  ];
}

export function stateFaq(state: State): { q: string; a: string }[] {
  return [
    {
      q: `Was kostet Heizöl heute in ${state.name}?`,
      a: `Der aktuelle Heizölpreis in ${state.name} beginnt bei ${price()} pro 100 Liter (Stand: ${todayStamp()}), also rund ${perLiter()} pro Liter. Bei ${num(SAMPLE_LITERS)} Litern zahlen Sie ca. ${total()} inklusive kostenloser Lieferung.`,
    },
    {
      q: `Wie lange dauert die Heizöl-Lieferung in ${state.name}?`,
      a: `Die Lieferung erfolgt in ${state.name} innerhalb von ${DELIVERY_DAYS} Werktagen. Ihren Wunschtermin legen Sie direkt bei der Bestellung fest, den genauen Zeitraum kündigt der Fahrer vorab telefonisch an.`,
    },
    {
      q: `Wie hoch ist die Mindestbestellmenge in ${state.name}?`,
      a: `Die Mindestbestellmenge beträgt ${num(MIN_LITERS)} Liter. Größere Mengen senken den Preis pro 100 Liter, weil sich die Liefermenge auf mehr Liter verteilt.`,
    },
    {
      q: `Wann ist Heizöl in ${state.name} am günstigsten?`,
      a: `Statistisch sind die Heizölpreise zwischen Mai und August am niedrigsten — im Schnitt 8 bis 12 % günstiger als in der Heizperiode von ${state.heatingPeriod}.`,
    },
    {
      q: `Welche Zahlungsarten sind in ${state.name} möglich?`,
      a: `Vorkasse, Rechnung, EC-Karte und Barzahlung bei Lieferung — alle Zahlungsarten sind ohne Aufpreis verfügbar. Rechnung ist Bestandskunden vorbehalten.`,
    },
  ];
}

const withState = (city: City, state: State) => `${city.name} (${state.name})`;

export function cityBlocks(city: City, state: State): CopyBlock[] {
  const [low, high] = state.consumption;
  const v = variantIndex(city.slug, 3);
  const intro = [
    `Klaro liefert Heizöl nach ${city.name} und in die umliegenden Orte im Postleitzahl-Bereich ${city.plz}. Der aktuelle Heizölpreis für ${city.name} beträgt ab ${price()} pro 100 Liter (Stand: ${todayStamp()}).`,
    `Heizöl für ${withState(city, state)} bestellen Sie bei Klaro tagesaktuell ab ${price()} pro 100 Liter (Stand: ${todayStamp()}) — geliefert wird im PLZ-Gebiet ${city.plz} und in der gesamten Region.`,
    `In ${city.name} liefern wir Heizöl zum tagesaktuellen Preis ab ${price()} pro 100 Liter (Stand: ${todayStamp()}). Das Liefergebiet umfasst den Postleitzahl-Bereich ${city.plz} sowie die Nachbargemeinden.`,
  ];
  const introSecond = [
    `Bei einer durchschnittlichen Bestellung von ${num(SAMPLE_LITERS)} Litern zahlen Sie in ${city.name} ca. ${total()} — kostenlose Lieferung innerhalb von ${DELIVERY_DAYS} Werktagen inklusive.`,
    `Für ${num(SAMPLE_LITERS)} Liter ergibt das in ${city.name} einen Gesamtpreis von rund ${total()}, inklusive Anlieferung in ${DELIVERY_DAYS} Werktagen und Mehrwertsteuer.`,
    `${num(SAMPLE_LITERS)} Liter kosten in ${city.name} damit ca. ${total()}. Die Lieferung ist kostenfrei und erfolgt innerhalb von ${DELIVERY_DAYS} Werktagen.`,
  ];
  const consumption = [
    `${city.name} liegt in ${state.name}: ${state.climate}. Die Heizperiode reicht von ${state.heatingPeriod}, der Jahresbedarf eines Einfamilienhauses liegt bei ca. ${num(low)} bis ${num(high)} Litern.`,
    `Für den Heizölverbrauch in ${city.name} ist das Klima in ${state.name} maßgeblich: ${state.climate}. Gerechnet wird mit ${num(low)} bis ${num(high)} Litern pro Jahr für ein Einfamilienhaus, geheizt wird von ${state.heatingPeriod}.`,
    `Wie viel Heizöl ein Haushalt in ${city.name} braucht, hängt vom Klima in ${state.name} ab — ${state.climate}. Üblich sind ${num(low)} bis ${num(high)} Liter pro Jahr bei einer Heizperiode von ${state.heatingPeriod}.`,
  ];

  return [
    {
      heading: `Heizöl-Lieferung nach ${city.name}`,
      paragraphs: [
        intro[v] ?? intro[0]!,
        introSecond[v] ?? introSecond[0]!,
        `${city.name}${city.district ? ` im Landkreis ${city.district}` : ""} hat rund ${num(city.population)} Einwohner. Mit über ${REVIEW_COUNT} zufriedenen Kunden und ${REVIEW_SCORE}/5 Sternen gehört Klaro zu den beliebtesten Heizöl-Anbietern Deutschlands.`,
      ],
    },
    {
      heading: `Was kostet 1 Liter Heizöl in ${city.name}?`,
      paragraphs: [
        `Ein Liter Heizöl kostet in ${city.name} heute ca. ${perLiter()} — das entspricht ${price()} pro 100 Liter. Üblich ist im Heizöl-Handel die Angabe je 100 Liter, weil Heizöl nur in größeren Mengen geliefert wird: Die Mindestbestellmenge liegt bei ${num(MIN_LITERS)} Litern.`,
        `Je größer die Liefermenge, desto günstiger wird der Literpreis. Für ${num(SAMPLE_LITERS)} Liter zahlen Sie in ${city.name} rund ${total()}; Premium-Heizöl mit Additiven kostet ab ${euro(133.16)} € pro 100 Liter.`,
      ],
    },
    {
      heading: `Heizölverbrauch in ${city.name}`,
      paragraphs: [
        consumption[v] ?? consumption[0]!,
        `In schlecht gedämmten Altbauten kann der Verbrauch auf 4.000 bis 5.000 Liter steigen, moderne Neubauten kommen mit unter 1.500 Litern aus. Am günstigsten bestellen Kunden in ${city.name} traditionell zwischen Mai und August — dann liegen die Heizölpreise im Schnitt 8 bis 12 % unter dem Winterniveau.`,
      ],
    },
    {
      heading: `Heizöl bestellen in ${city.name} — in 3 Schritten`,
      paragraphs: [
        `Postleitzahl ${city.plz} und Liefermenge eingeben, Heizölsorte wählen (Standard nach DIN 51603-1 oder Premium) und Zahlungsart samt Wunschtermin festlegen — mehr ist für die Bestellung in ${city.name} nicht nötig.`,
        `${state.logistics}. Bezahlt wird per Vorkasse, Rechnung, EC-Karte oder bar bei Lieferung — ohne Aufpreis. Mit der Festpreisgarantie bleibt Ihr Preis ab Bestellabschluss bindend, auch wenn die Marktpreise bis zur Lieferung steigen.`,
      ],
    },
  ];
}

export function cityFaq(city: City, state: State): { q: string; a: string }[] {
  return [
    {
      q: `Was kostet Heizöl heute in ${city.name}?`,
      a: `Der Heizölpreis in ${city.name} beginnt heute bei ${price()} pro 100 Liter (Stand: ${todayStamp()}), also rund ${perLiter()} pro Liter. ${num(SAMPLE_LITERS)} Liter kosten ca. ${total()} inklusive Lieferung.`,
    },
    {
      q: `Liefert Klaro Heizöl nach ${city.name}?`,
      a: `Ja. ${city.name} liegt im Postleitzahl-Bereich ${city.plz} und wird regelmäßig beliefert — innerhalb von ${DELIVERY_DAYS} Werktagen ab Bestellung, deutschlandweit kostenfrei.`,
    },
    {
      q: `Wie viel Heizöl muss ich in ${city.name} mindestens bestellen?`,
      a: `Die Mindestbestellmenge beträgt ${num(MIN_LITERS)} Liter. Typisch für ein Einfamilienhaus in ${state.name} sind ${num(SAMPLE_LITERS)} Liter pro Jahr.`,
    },
    {
      q: `Wie bezahle ich meine Heizöl-Lieferung in ${city.name}?`,
      a: `Per Vorkasse, EC-Karte oder bar bei Lieferung; Bestandskunden können auf Rechnung bestellen. Alle Zahlungsarten sind aufpreisfrei.`,
    },
  ];
}
