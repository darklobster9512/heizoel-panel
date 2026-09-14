import type { ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Droplet,
  Calculator,
  Truck,
  CreditCard,
  HelpCircle,
  Mail,
} from "lucide-react";

import { SiteHeader } from "@/components/landing/site-header";
import { ReferralBanner, SiteFooter } from "@/components/landing/sections";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const TITLE = "Häufig gestellte Fragen zu Heizöl | Klaro";
const DESCRIPTION =
  "Antworten auf alle Fragen rund um Heizöl: Qualität und Sorten, Bestellung ab 1.500 Litern, Lieferung in ca. 7 Werktagen, Preise und Zahlungsarten.";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/faq" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
  }),
  component: FaqPage,
});

type FaqItem = { q: string; a: ReactNode };
type FaqSection = {
  id: string;
  nav: string;
  title: string;
  icon: typeof Droplet;
  items: FaqItem[];
};

function P({ children }: { children: ReactNode }) {
  return (
    <p className="mt-3 text-[13px] leading-[1.75] text-muted-custom first:mt-0 md:text-[14px]">
      {children}
    </p>
  );
}

function RechnerLink() {
  return (
    <Link to="/preisrechner" className="font-semibold text-brand hover:underline">
      Heizöl-Preisrechner
    </Link>
  );
}

const SECTIONS: FaqSection[] = [
  {
    id: "qualitaet",
    nav: "Qualität",
    title: "Fragen zur Qualität der Ware",
    icon: Droplet,
    items: [
      {
        q: "Wie unterscheiden sich die einzelnen Heizölsorten?",
        a: (
          <>
            <P>
              Die Qualität aller in Deutschland in den Handel gebrachten Heizölsorten ist streng in
              der DIN 51603-1 geregelt. Bei Klaro erhalten Sie ausschließlich Heizöle nach DIN
              51603-1. Lediglich für Bio-Heizöl gibt es eine eigene Norm.
            </P>
            <P>
              <strong className="text-ink">Heizöl Standard</strong> ist das Standardprodukt und hat
              einen maximalen Schwefelanteil von 0,005 % bzw. 50 ppm. Es kann bedenkenlos in allen
              Ölheizungen verwendet werden.
            </P>
            <P>
              <strong className="text-ink">Heizöl Premium</strong> — auch Super-Heizöl genannt — ist
              ebenfalls für alle am Markt befindlichen Ölheizungen geeignet. Spezielle
              Additiv-Pakete verstärken gezielt bestimmte Produkteigenschaften und sichern einen
              problemlosen Einsatz des Heizöls auch nach längerer Lagerdauer. Das erhöht die
              Lebensdauer und Betriebssicherheit der Anlage, reduziert den Verbrauch und spart
              Heizkosten. Das Additiv wird bei der Betankung über eine Dosiereinrichtung am
              Tankwagen beigemischt.
            </P>
            <P>
              <strong className="text-ink">Bioheizöl</strong> ist Heizöl mit einem Anteil von
              mindestens 3 Prozent aus nachwachsenden Rohstoffen. Die Qualitätsanforderungen sind in
              DIN V 51603-6 geregelt.
            </P>
            <P>
              Mit unserem <RechnerLink /> erfahren Sie, welche Produkte an Ihrem Wohnort verfügbar
              sind.
            </P>
          </>
        ),
      },
      {
        q: "Welche Qualitäten kommen zur Auslieferung?",
        a: (
          <>
            <P>
              Bei Klaro erhalten Sie ausschließlich Marken-Heizöl der bekannten großen
              Ölgesellschaften wie Aral, Esso, OMV, Shell oder Total.
            </P>
            <P>
              Auch sogenannte „freie Händler“ beliefern Sie ausnahmslos mit genormter, deutscher
              Qualitätsware der großen Raffineriegesellschaften. Das Qualitätsmanagement unserer
              Händler — von der Produktqualität bis zum Lieferservice — spielt bei unserer
              Partnerauswahl eine sehr große Rolle.
            </P>
          </>
        ),
      },
      {
        q: "Darf Heizöl Standard mit Heizöl Premium vermischt werden?",
        a: (
          <P>
            Eine Vermischung aller am deutschen Markt erhältlichen Heizölsorten ist jederzeit völlig
            bedenkenlos möglich. Sie können also gar nicht das falsche Produkt tanken.
          </P>
        ),
      },
    ],
  },
  {
    id: "bestellung",
    nav: "Bestellung",
    title: "Fragen zur Bestellung",
    icon: Calculator,
    items: [
      {
        q: "Wie funktioniert eine Heizölbestellung bei Klaro?",
        a: (
          <>
            <P>
              Ihre Bestellung ist in drei Schritten erledigt: Sie geben im <RechnerLink /> Ihre
              Postleitzahl, die gewünschte Menge und die Anzahl der Abladestellen ein. Anschließend
              wählen Sie Produkt, Zahlungsart und Ihren Wunschtermin. Im letzten Schritt prüfen Sie
              Ihre Daten und senden die Bestellung verbindlich ab.
            </P>
            <P>
              Danach erhalten Sie eine Bestellbestätigung per E-Mail. Der ausführende Händler setzt
              sich mit Ihnen in Verbindung und vereinbart den verbindlichen Liefertermin.
            </P>
          </>
        ),
      },
      {
        q: "Ich habe keine Bestellbestätigung bekommen. Kann das sein?",
        a: (
          <>
            <P>
              Die Bestätigung wird unmittelbar nach Absenden der Bestellung automatisch verschickt.
              Bitte prüfen Sie zuerst Ihren Spam- bzw. Werbeordner.
            </P>
            <P>
              Häufigste Ursache ist ein Tippfehler in der E-Mail-Adresse. Kontaktieren Sie uns in
              diesem Fall einfach — Ihre Bestellung ist trotzdem bei uns eingegangen und wird
              bearbeitet.
            </P>
          </>
        ),
      },
      {
        q: "Gibt es eine Mindestbestellmenge?",
        a: (
          <P>
            Ja, die Mindestbestellmenge beträgt <strong className="text-ink">1.500 Liter</strong> pro
            Abladestelle. Bei Sammelbestellungen mit mehreren Abladestellen gilt diese Menge je
            Abladestelle.
          </P>
        ),
      },
    ],
  },
  {
    id: "lieferung",
    nav: "Lieferung",
    title: "Fragen zur Lieferung",
    icon: Truck,
    items: [
      {
        q: "Ihr Firmensitz ist weit von unserem Wohnort entfernt. Wie funktioniert die Lieferung?",
        a: (
          <P>
            Klaro arbeitet mit über 500 regionalen Heizölhändlern in ganz Deutschland zusammen.
            Geliefert wird immer von einem Händler aus Ihrer Region — dadurch bleiben Lieferwege kurz
            und Preise günstig.
          </P>
        ),
      },
      {
        q: "Was passiert, wenn die Liefermenge von der Bestellmenge (stark) abweicht?",
        a: (
          <P>
            Abgerechnet wird immer litergenau die tatsächlich getankte Menge zum Preis Ihres
            Bestelltages. Passt weniger Heizöl in den Tank als bestellt, zahlen Sie entsprechend
            weniger; bei Vorauskasse wird Ihnen der überschüssige Betrag vom Lieferanten erstattet.
          </P>
        ),
      },
      {
        q: "Wie lange dauert in der Regel die Lieferung?",
        a: (
          <P>
            Die durchschnittliche Lieferzeit beträgt{" "}
            <strong className="text-ink">ca. 7 Werktage</strong> ab Bestelleingang. In Zeiten hoher
            Auslastung kann es etwas länger dauern — den aktuellen Stand sehen Sie auf unserer Seite
            Lieferung &amp; Zahlung.
          </P>
        ),
      },
      {
        q: "Wie ist eine Lieferstelle definiert und wie weit dürfen diese maximal auseinanderliegen?",
        a: (
          <P>
            Jeder Abladevorgang gilt als eine Lieferstelle — unabhängig davon, wie nah die Tanks
            beieinander liegen. Bei Sammelbestellungen dürfen die Lieferstellen maximal 10 km
            voneinander entfernt sein.
          </P>
        ),
      },
      {
        q: "Wie erfahre ich, wann genau geliefert wird?",
        a: (
          <P>
            Der ausführende Händler meldet sich vor der Lieferung telefonisch oder per E-Mail bei
            Ihnen und vereinbart einen verbindlichen Liefertermin. Sie müssen also nicht tagelang zu
            Hause warten.
          </P>
        ),
      },
      {
        q: "Wie können Sie uns so schnell und günstig beliefern?",
        a: (
          <P>
            Wir bündeln Bestellungen und vergeben sie an den günstigsten verfügbaren Händler in Ihrer
            Region. Durch das hohe Bestellvolumen und die schlanke Online-Abwicklung entstehen
            Einkaufsvorteile, die wir direkt an Sie weitergeben.
          </P>
        ),
      },
      {
        q: "Welcher Händler wird mich im Falle der Bestellung beliefern?",
        a: (
          <P>
            Den ausführenden Händler erfahren Sie mit der Auftragsbestätigung. Alle Partner sind
            geprüfte Fachbetriebe mit eigener Tankwagenflotte und liefern ausschließlich genormte
            Qualitätsware.
          </P>
        ),
      },
      {
        q: "Welche Schlauchlänge haben die Auslieferungsfahrzeuge?",
        a: (
          <P>
            Die Tankwagen führen in der Regel 40 bis 60 Meter Schlauch mit. Ist der Weg zu Ihrem Tank
            länger oder schwer zugänglich, geben Sie das bitte bei der Bestellung im Bemerkungsfeld
            an.
          </P>
        ),
      },
      {
        q: "Ist eine Belieferung in Österreich oder der Schweiz möglich?",
        a: (
          <P>
            Nein. Wir liefern ausschließlich innerhalb Deutschlands an Adressen mit deutscher
            Postleitzahl.
          </P>
        ),
      },
    ],
  },
  {
    id: "preise",
    nav: "Preise",
    title: "Fragen zu den Preisen",
    icon: Calculator,
    items: [
      {
        q: "Welcher Preis kommt zur Abrechnung? Der zum Bestellzeitpunkt oder der aktuelle Preis?",
        a: (
          <P>
            Es gilt immer der Preis Ihres Bestelltages —{" "}
            <strong className="text-ink">Festpreisgarantie</strong>. Steigt der Heizölpreis bis zur
            Lieferung, ändert das an Ihrem Preis nichts.
          </P>
        ),
      },
      {
        q: "Kommen zu den angebotenen Preisen noch (versteckte) Kosten für die Belieferung hinzu?",
        a: (
          <P>
            Nein. Alle angezeigten Preise sind Endpreise inklusive Mehrwertsteuer, Energiesteuer und
            Lieferung. Zusätzliche Kosten entstehen nur, wenn Sie ausdrücklich Sonderleistungen
            wählen.
          </P>
        ),
      },
      {
        q: "Warum sind Ihre Preise so günstig?",
        a: (
          <P>
            Weil über 500 Händler um Ihre Bestellung konkurrieren und wir große Mengen bündeln. Der
            Vergleich läuft vollständig digital — das spart Vertriebskosten, die wir an Sie
            weitergeben.
          </P>
        ),
      },
      {
        q: "Wann werden die Preise aktualisiert bzw. sind die Preise immer aktuell?",
        a: (
          <P>
            Die Preise werden mehrfach täglich anhand der aktuellen Börsen- und Händlerpreise
            aktualisiert. Der im <RechnerLink /> angezeigte Preis ist stets der tagesaktuelle Preis
            für Ihre Postleitzahl.
          </P>
        ),
      },
      {
        q: "Warum verlangt der gleiche Händler am Telefon mehr?",
        a: (
          <P>
            Telefonische Bestellungen sind für Händler deutlich aufwendiger. Über Klaro erhält der
            Händler die Bestellung vollständig digital und kalkuliert deshalb mit geringerer Marge.
          </P>
        ),
      },
    ],
  },
  {
    id: "zahlung",
    nav: "Zahlung",
    title: "Fragen zur Bezahlung",
    icon: CreditCard,
    items: [
      {
        q: "Welche Zahlungsmöglichkeiten werden angeboten?",
        a: (
          <>
            <P>
              Zur Verfügung stehen <strong className="text-ink">Barzahlung</strong> nach der
              Betankung, Zahlung per <strong className="text-ink">EC-Karte (Girocard)</strong> am
              Tankwagen sowie <strong className="text-ink">Vorauskasse</strong> per Überweisung. Alle
              Zahlungsarten sind ohne Aufpreis.
            </P>
            <P>
              Welche Zahlungsarten in Ihrer Region verfügbar sind, sehen Sie nach Eingabe Ihrer
              Postleitzahl. Bei Neukunden ist in einigen Regionen eine Anzahlung notwendig.
            </P>
          </>
        ),
      },
      {
        q: "Was ist, wenn bei Zahlungsart Vorauskasse die bestellte Menge nicht in den Tank passt?",
        a: (
          <P>
            Dann wird litergenau die tatsächlich getankte Menge abgerechnet und Ihnen der zu viel
            gezahlte Betrag direkt vom Lieferanten erstattet.
          </P>
        ),
      },
      {
        q: "Kann man auch mit Kreditkarte bezahlen?",
        a: (
          <P>
            Nein, eine Kreditkartenzahlung ist nicht möglich. Bitte nutzen Sie Barzahlung, EC-Karte
            oder Vorauskasse.
          </P>
        ),
      },
    ],
  },
  {
    id: "sonstiges",
    nav: "Sonstiges",
    title: "Fragen zu sonstigen Themen",
    icon: HelpCircle,
    items: [
      {
        q: "Erhält bei Sammelbestellungen jeder Teilnehmer eine eigene Rechnung?",
        a: (
          <P>
            Ja. Jede Abladestelle wird separat abgerechnet, jeder Besteller erhält eine eigene
            Rechnung über die bei ihm getankte Menge.
          </P>
        ),
      },
      {
        q: "Was ist eine Lieferpauschale?",
        a: (
          <P>
            Bei kleineren Mengen erheben manche Händler eine Pauschale für die Anfahrt. Diese ist —
            falls sie anfällt — im angezeigten Endpreis bereits enthalten; versteckte Zuschläge gibt
            es bei uns nicht.
          </P>
        ),
      },
      {
        q: "Ich brauche ein Angebot für ein Jobcenter bzw. eine Arbeitsagentur. Wie gehe ich vor?",
        a: (
          <P>
            Berechnen Sie Ihren Preis im <RechnerLink /> und kontaktieren Sie uns anschließend. Wir
            stellen Ihnen ein schriftliches Angebot mit Menge, Preis und Lieferadresse aus, das Sie
            beim Amt einreichen können.
          </P>
        ),
      },
      {
        q: "Sind Sammelbestellungen immer sinnvoll?",
        a: (
          <P>
            Meistens ja: Eine größere Gesamtmenge senkt den Literpreis. Voraussetzung ist, dass die
            Abladestellen nicht mehr als 10 km auseinanderliegen und jede Stelle mindestens 1.500
            Liter abnimmt.
          </P>
        ),
      },
      {
        q: "Was bedeutet „Heizöl klimaneutral“?",
        a: (
          <P>
            Beim klimaneutralen Heizöl werden die bei Produktion und Verbrennung entstehenden
            CO₂-Emissionen berechnet und über zertifizierte Klimaschutzprojekte ausgeglichen. Das
            Produkt selbst entspricht dabei dem gewohnten Heizöl nach DIN 51603-1.
          </P>
        ),
      },
    ],
  },
];

function FaqPage() {
  return (
    <div className="min-h-screen bg-background font-body text-ink">
      <SiteHeader />
      <main>
        {/* Seitenkopf */}
        <section className="border-b-[3px] border-b-brand bg-surface" aria-labelledby="faq-title">
          <div className="mx-auto max-w-6xl px-5 py-12 text-center md:py-16">
            <h1
              id="faq-title"
              className="text-[28px] font-bold leading-tight text-conditions md:text-[36px]"
            >
              Häufig gestellte Fragen
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-[1.7] text-muted-custom md:text-[16px]">
              Antworten auf alle Fragen rund um Heizöl, Bestellung, Lieferung und Zahlung
            </p>
          </div>
        </section>

        {/* Schnellnavigation */}
        <section className="bg-background" aria-label="Themen">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 px-5 py-8 md:grid-cols-5 md:gap-4">
            {SECTIONS.filter((s) => s.id !== "sonstiges").map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="flex flex-col items-center gap-2 rounded-xl border border-line bg-card p-4 text-center shadow-sm transition-colors hover:border-brand/50 hover:bg-brand/5"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand">
                  <section.icon className="h-[18px] w-[18px]" aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold text-ink">{section.nav}</span>
              </a>
            ))}
          </div>
        </section>

        {/* FAQ-Blöcke */}
        {SECTIONS.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            aria-labelledby={`${section.id}-title`}
            className={`scroll-mt-24 border-t border-line ${
              index % 2 === 0 ? "bg-background" : "bg-surface"
            }`}
          >
            <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
              <h2
                id={`${section.id}-title`}
                className="text-[22px] font-bold leading-tight text-conditions md:text-[26px]"
              >
                {section.title}
              </h2>
              <Accordion type="multiple" className="mt-6 grid gap-3">

                {section.items.map((item, i) => (
                  <AccordionItem
                    key={item.q}
                    value={`${section.id}-${i}`}
                    className="overflow-hidden rounded-xl border border-line bg-card shadow-sm"
                  >
                    <AccordionTrigger className="gap-4 px-5 py-4 text-left text-[15px] font-semibold text-ink no-underline hover:no-underline md:text-[16px]">
                      <span className="flex items-start gap-3">
                        <HelpCircle
                          className="mt-0.5 h-[18px] w-[18px] shrink-0 text-brand"
                          aria-hidden="true"
                        />
                        <span>{item.q}</span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="border-t border-line px-5 pb-5 pt-4">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>
        ))}

        {/* Frage nicht gefunden? */}
        <section className="border-t border-line bg-background" aria-labelledby="faq-kontakt-title">
          <div className="mx-auto max-w-6xl px-5 pb-10 pt-12 md:pb-12 md:pt-16">
            <div className="rounded-xl border border-line border-l-4 border-l-brand bg-card p-6 shadow-sm md:flex md:items-center md:justify-between md:gap-6">
              <div>
                <h2
                  id="faq-kontakt-title"
                  className="text-[18px] font-bold text-conditions md:text-[20px]"
                >
                  Ihre Frage war nicht dabei?
                </h2>
                <p className="mt-2 text-[13px] leading-[1.7] text-muted-custom md:text-[14px]">
                  Unser Kundenservice hilft Ihnen persönlich weiter — zu Bestellung, Lieferung,
                  Zahlung und Preisen.
                </p>
              </div>
              <a
                href="mailto:service@klaro.de"
                className="mt-4 inline-flex shrink-0 items-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 md:mt-0"
              >
                <Mail className="h-4 w-4 text-white" aria-hidden="true" />
                Kontakt aufnehmen
              </a>
            </div>
          </div>
        </section>

        <ReferralBanner compact />
      </main>
      <SiteFooter />
    </div>
  );
}
