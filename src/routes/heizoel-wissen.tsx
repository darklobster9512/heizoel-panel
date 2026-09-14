import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Droplets, Flame, Wrench } from "lucide-react";

import { SiteHeader } from "@/components/landing/site-header";
import { ReferralBanner, SiteFooter } from "@/components/landing/sections";

const TITLE = "Heizöl-Wissen für Ihr Zuhause | Klaro";
const DESCRIPTION =
  "Heizöl-Wissen von Klaro: Heizöl-Sorten im Vergleich, Tank richtig pflegen, Verbrauch senken und das Heizöl-Glossar mit den wichtigsten Begriffen.";

export const Route = createFileRoute("/heizoel-wissen")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/heizoel-wissen" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/heizoel-wissen" }],
  }),
  component: HeizoelWissenPage,
});

type WissenSection = {
  id: string;
  icon: typeof Flame;
  title: string;
  intro: string;
  points: { heading: string; text: string }[];
};

const SECTIONS: WissenSection[] = [
  {
    id: "sorten",
    icon: Flame,
    title: "Heizöl-Sorten im Vergleich",
    intro:
      "Beim Heizölkauf haben Sie die Wahl zwischen Heizöl EL Standard und Premium-Heizöl. Beide Sorten erfüllen die Norm DIN 51603-1 — der Unterschied liegt in den Additiven und der Lagerstabilität.",
    points: [
      {
        heading: "Heizöl EL Standard (schwefelarm)",
        text: "Die bewährte Standardsorte für nahezu alle Ölheizungen. Schwefelarmes Heizöl EL verbrennt sauberer als frühere Sorten und ist für alle modernen Öl-Brennwertkessel zugelassen. Es ist die günstigste Variante und für die meisten Haushalte völlig ausreichend.",
      },
      {
        heading: "Premium-Heizöl",
        text: "Premium-Heizöl enthält zusätzliche Additive, die die Lagerstabilität erhöhen, Ablagerungen im Tank reduzieren und die Verbrennung weiter optimieren können. Es eignet sich besonders für moderne Brennwertanlagen, lange Lagerzeiten und Haushalte, die Wert auf einen möglichst sauberen Tank legen.",
      },
      {
        heading: "Für wen lohnt sich welche Sorte?",
        text: "Wer regelmäßig bestellt und einen gut gepflegten Tank hat, fährt mit Standard-Heizöl am günstigsten. Bei älteren Tanks, langen Standzeiten oder Brennwerttechnik kann sich der Aufpreis für Premium-Heizöl durch weniger Wartungsaufwand auszahlen.",
      },
    ],
  },
  {
    id: "tank",
    icon: Wrench,
    title: "Den Heizöltank richtig pflegen",
    intro:
      "Ein gut gepflegter Tank sorgt für einen störungsfreien Heizbetrieb und verlängert die Lebensdauer Ihrer Anlage deutlich.",
    points: [
      {
        heading: "Regelmäßige Kontrolle",
        text: "Prüfen Sie Ihren Tank regelmäßig auf äußere Schäden, Korrosion und Undichtigkeiten. Kunststofftanks haben je nach Bauart eine begrenzte Lebensdauer — bei Stahltanks empfiehlt sich eine regelmäßige Dichtheitsprüfung durch einen Fachbetrieb.",
      },
      {
        heading: "Tankinnenreinigung",
        text: "Mit der Zeit sammeln sich Wasser und Schlamm am Tankboden. Eine professionelle Tankreinigung alle paar Jahre verhindert Verstopfungen der Filter und Düsen und schützt Ihre Heizungsanlage vor Ausfällen.",
      },
      {
        heading: "Nicht komplett leerfahren",
        text: "Fahren Sie den Tank nicht vollständig leer — am Boden abgelagerte Sedimente können sonst in die Leitung gesaugt werden. Bestellen Sie rechtzeitig nach, idealerweise bei einem Füllstand von etwa 25 bis 30 Prozent.",
      },
    ],
  },
  {
    id: "verbrauch",
    icon: Droplets,
    title: "Heizölverbrauch senken",
    intro:
      "Mit einfachen Maßnahmen lässt sich der Heizölverbrauch spürbar reduzieren — das schont den Geldbeutel und die Umwelt.",
    points: [
      {
        heading: "Heizung regelmäßig warten",
        text: "Eine jährlich gewartete Heizungsanlage verbrennt effizienter. Schon eine verschmutzte Düse oder ein falsch eingestellter Brenner kann den Verbrauch um mehrere Prozent erhöhen.",
      },
      {
        heading: "Kessel richtig einstellen",
        text: "Vorlauf- und Kesseltemperatur sollten zur Jahreszeit passen. Ein hydraulischer Abgleich sorgt dafür, dass alle Heizkörper gleichmäßig versorgt werden und keine Energie verloren geht.",
      },
      {
        heading: "Raumtemperatur und Nachtabsenkung",
        text: "Jedes Grad weniger Raumtemperatur spart rund 6 Prozent Heizenergie. Eine Nachtabsenkung und programmierbare Thermostate reduzieren den Verbrauch zusätzlich, ohne Komforteinbußen.",
      },
      {
        heading: "Dämmung prüfen",
        text: "Ungedämmte Rohrleitungen, Kellerdecken und alte Fenster sind häufige Wärmeverlustquellen. Bereits kleine Dämmmaßnahmen zahlen sich oft innerhalb weniger Heizperioden aus.",
      },
    ],
  },
  {
    id: "glossar",
    icon: BookOpen,
    title: "Heizöl-Glossar",
    intro: "Die wichtigsten Begriffe rund um Heizöl — kurz erklärt.",
    points: [
      {
        heading: "Heizöl EL",
        text: "Extra leichtflüssiges Heizöl (kurz: Heizöl EL) — die Standard-Heizölsorte in Deutschland nach DIN 51603-1.",
      },
      {
        heading: "Schwefelarm",
        text: "Heizöl mit einem Schwefelgehalt von maximal 50 mg/kg. Schwefelarmes Heizöl ist Voraussetzung für moderne Brennwerttechnik und verbrennt umweltschonender.",
      },
      {
        heading: "Brennwert",
        text: "Die nutzbare Wärmemenge, die bei der Verbrennung inklusive der Abgaswärme gewonnen wird. Brennwertkessel nutzen diese Energie besonders effizient.",
      },
      {
        heading: "Festpreis",
        text: "Ein bei Bestellung verbindlich vereinbarter Preis pro Liter, der bis zur Lieferung nicht mehr verändert wird — unabhängig von kurzfristigen Marktschwankungen.",
      },
      {
        heading: "Lieferstelle",
        text: "Der Ort, an dem das Heizöl abgegeben wird — also Ihr Tank beziehungsweise der Tankanschluss. Mehrere Lieferstellen bedeuten, dass mehrere Tanks oder Objekte beliefert werden.",
      },
      {
        heading: "Mindestbestellmenge",
        text: "Die kleinste Menge Heizöl, die pro Lieferung bestellt werden kann. Bei Klaro liegt die Mindestbestellmenge bei 1.500 Litern.",
      },
      {
        heading: "Sammelbestellung",
        text: "Mehrere Haushalte in einer Region bestellen gemeinsam. Durch die größere Gesamtmenge und gebündelte Anfahrt lassen sich oft bessere Konditionen erzielen.",
      },
    ],
  },
];

function HeizoelWissenPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        <section className="border-b-[3px] border-b-brand bg-surface">
          <div className="mx-auto max-w-6xl px-5 py-12 text-center md:py-16">
            <h1 className="text-2xl font-semibold text-ink md:text-3xl">
              Heizöl-Wissen für Ihr Zuhause
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-custom">
              Sorten, Tankpflege, Verbrauch und die wichtigsten Begriffe — verständlich erklärt.
            </p>
          </div>
        </section>

        {SECTIONS.map((section, index) => {
          const Icon = section.icon;
          return (
            <section
              key={section.id}
              id={section.id}
              className={`scroll-mt-24 ${index % 2 === 0 ? "bg-background" : "bg-surface"}`}
            >
              <div className="mx-auto max-w-4xl px-5 py-12 md:py-16">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h2 className="text-xl font-semibold text-ink md:text-2xl">{section.title}</h2>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-muted-custom">
                  {section.intro}
                </p>

                <div className="mt-6 space-y-4">
                  {section.points.map((point) => (
                    <div
                      key={point.heading}
                      className="rounded-md border border-line border-l-4 border-l-brand bg-background p-5 shadow-card"
                    >
                      <h3 className="text-[15px] font-semibold text-ink">{point.heading}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-custom">
                        {point.text}
                      </p>
                    </div>
                  ))}
                </div>

                <Link
                  to="/preisrechner"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-deep hover:underline"
                >
                  Jetzt Heizölpreis berechnen
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </section>
          );
        })}

        <ReferralBanner compact />
      </main>

      <SiteFooter />
    </div>
  );
}
