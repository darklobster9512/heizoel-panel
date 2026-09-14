import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Calculator, HelpCircle, Info, Mail, Phone, Send } from "lucide-react";

import { SiteHeader } from "@/components/landing/site-header";
import { ReferralBanner, SiteFooter } from "@/components/landing/sections";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const TITLE = "Kontakt & Hilfe | Klaro";
const DESCRIPTION =
  "Kontaktieren Sie Klaro per Telefon oder E-Mail. Hier finden Sie unsere Kontaktdaten und ein Kontaktformular für Ihre Heizöl-Anfragen.";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/kontakt" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/kontakt" }],
  }),
  component: KontaktPage,
});

type ContactItem = {
  icon: typeof Phone;
  title: string;
  value: string;
  hint: string;
  href: string;
  isInternal: boolean;
};

const CONTACTS: ContactItem[] = [
  {
    icon: Phone,
    title: "Telefon",
    value: "0800 - 000 000 00",
    hint: "Kostenlos aus dem deutschen Festnetz",
    href: "tel:080000000000",
    isInternal: false,
  },
  {
    icon: Mail,
    title: "E-Mail",
    value: "service@klaro.de",
    hint: "Wir antworten schnellstmöglich",
    href: "mailto:service@klaro.de",
    isInternal: false,
  },
  {
    icon: HelpCircle,
    title: "Häufige Fragen",
    value: "Zum FAQ-Bereich",
    hint: "Antworten auf häufige Fragen",
    href: "/faq",
    isInternal: true,
  },
];

type TopicGroup = {
  title: string;
  options: { value: string; label: string }[];
};

const TOPICS: TopicGroup[] = [
  {
    title: "Fragen zum Heizölpreis",
    options: [
      { value: "preis-aktuell", label: "Ich möchte den aktuellen Heizölpreis erfahren" },
      { value: "preis-angebot", label: "Bitte machen Sie mir ein Heizöl-Preisangebot" },
    ],
  },
  {
    title: "Fragen zur Bestellung",
    options: [
      { value: "bestellung-neu", label: "Ich möchte Heizöl bestellen" },
      { value: "bestellung-lieferzeit", label: "Ich habe Fragen zur Lieferzeit" },
      { value: "bestellung-haendler", label: "Ich habe Fragen zum Lieferanten" },
    ],
  },
  {
    title: "Ich habe bereits Heizöl bestellt",
    options: [
      { value: "liefertermin", label: "Ich möchte einen Liefertermin vereinbaren" },
    ],
  },
  {
    title: "Sonstiges",
    options: [{ value: "sonstiges", label: "Mein Anliegen ist hier nicht ausgeführt" }],
  },
];

const SALUTATIONS = [
  { value: "herr", label: "Herr" },
  { value: "frau", label: "Frau" },
  { value: "divers", label: "Divers" },
] as const;

type TopicKind = "info" | "calculator" | "full";

const TOPIC_KIND: Record<string, TopicKind> = {
  "preis-aktuell": "calculator",
  "preis-angebot": "calculator",
  "bestellung-neu": "calculator",
  "bestellung-lieferzeit": "calculator",
  "bestellung-haendler": "calculator",
  liefertermin: "info",
  sonstiges: "full",
};

const CALCULATOR_INTRO: Record<string, string> = {
  "preis-aktuell":
    "Den aktuellen Heizölpreis erfahren Sie ausschließlich über unseren Heizöl-Preisrechner.",
  "preis-angebot":
    "Die Erstellung eines Heizöl-Angebotes ist ausschließlich über unseren Heizöl-Preisrechner möglich.",
  "bestellung-neu": "Eine Heizöl-Bestellung ist nur online möglich.",
  "bestellung-lieferzeit":
    "Die aktuelle Lieferzeit wird Ihnen im Heizöl-Preisrechner angezeigt. Nach erfolgter Bestellung wird sich unser zuständiger Partnerhändler in Ihrer Region mit Ihnen in Verbindung setzen, um einen Liefertermin zu vereinbaren.",
  "bestellung-haendler":
    "Unser Partnerhändler in Ihrer Region wird Ihnen im Heizöl-Preisrechner angezeigt. Nach erfolgter Bestellung erhalten Sie umgehend eine Bestellbestätigung mit den Kontaktdaten des Lieferanten. Sie können dann den Lieferanten auch sofort selbst kontaktieren, um individuelle Absprachen zu treffen.",
};

const CALCULATOR_OUTRO =
  "Bitte geben Sie dazu in nachfolgendes Formular PLZ, Liefermenge und Anzahl der Lieferstellen ein, um den aktuellen Heizölpreis zu berechnen. Sie haben anschließend die Möglichkeit, sofort zum angezeigten Preis verbindlich zu bestellen.";

const LIEFERTERMIN_TEXT =
  "Unmittelbar nach Ihrer Bestellung haben Sie eine Bestellbestätigung per E-Mail erhalten. Darin finden Sie auch die Kontaktdaten des zuständigen Lieferanten in Ihrer Region. Bitte wenden Sie sich direkt an den Lieferanten, um einen Liefertermin zu vereinbaren.";

const LIEFERSTELLEN = ["1", "2", "3", "4", "5+"] as const;

function KontaktPage() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [calcZip, setCalcZip] = useState("");
  const [calcAmount, setCalcAmount] = useState("");
  const [calcLocations, setCalcLocations] = useState("");
  const navigate = useNavigate();

  const topicKind: TopicKind | null = selectedTopic
    ? (TOPIC_KIND[selectedTopic] ?? "full")
    : null;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const handleCalcSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void navigate({ to: "/preisrechner" });
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        <section className="border-b-[3px] border-b-brand bg-surface">
          <div className="mx-auto max-w-6xl px-5 py-12 text-center md:py-16">
            <h1 className="text-2xl font-semibold text-ink md:text-3xl">Kontakt &amp; Hilfe</h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-custom">
              Wir helfen Ihnen gerne — per Telefon, E-Mail oder über unser Kontaktformular.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-10 md:py-14">
          <div className="grid gap-5 md:grid-cols-3">
            {CONTACTS.map((contact) => {
              const Icon = contact.icon;
              const content = (
                <div className="flex flex-col items-center rounded-md border border-line bg-surface p-6 text-center shadow-card transition-colors hover:bg-brand/[0.03]">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h2 className="mt-4 text-sm font-semibold uppercase tracking-wide text-muted-custom">
                    {contact.title}
                  </h2>
                  <p className="mt-2 text-lg font-semibold text-ink">{contact.value}</p>
                  <p className="mt-1 text-xs text-muted-custom">{contact.hint}</p>
                </div>
              );

              return contact.isInternal ? (
                <Link key={contact.title} to={contact.href} className="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
                  {content}
                </Link>
              ) : (
                <a
                  key={contact.title}
                  href={contact.href}
                  className="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  {content}
                </a>
              );
            })}
          </div>

          <div className="mt-10 rounded-md border border-line bg-surface shadow-card md:mt-14">
            <div className="h-[3px] w-full bg-brand" aria-hidden="true" />
            <div className="p-6 md:p-10">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-ink md:text-2xl">
                  Wählen Sie Ihr Anliegen
                </h2>
                <p className="mt-2 text-sm text-muted-custom">
                  Bitte füllen Sie das Formular aus. Sie erhalten umgehend eine Antwort.
                </p>
              </div>

              {submitted ? (
                <div className="mt-8 rounded-md border border-line bg-background p-6 text-center">
                  <p className="text-lg font-semibold text-ink">Vielen Dank für Ihre Nachricht!</p>
                  <p className="mt-2 text-sm text-muted-custom">
                    Dies ist ein Demo-Formular. In der Live-Version würden wir Ihre Anfrage jetzt bearbeiten.
                  </p>
                </div>
              ) : (
                <div className="mt-8">
                  <div className="grid gap-2">
                    <Label htmlFor="topic">Anliegen</Label>
                    <Select value={selectedTopic} onValueChange={setSelectedTopic} required>
                      <SelectTrigger id="topic" className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus:ring-1 focus:ring-ring">
                        <SelectValue placeholder="Bitte wählen Sie Ihr Anliegen" />
                      </SelectTrigger>
                      <SelectContent>
                        {TOPICS.map((group, groupIndex) => (
                          <SelectGroup key={group.title}>
                            <SelectLabel className="font-bold text-ink">
                              {group.title}
                            </SelectLabel>
                            {group.options.map((topic) => (
                              <SelectItem key={topic.value} value={topic.value}>
                                {topic.label}
                              </SelectItem>
                            ))}
                            {groupIndex < TOPICS.length - 1 && (
                              <SelectSeparator className="my-1 bg-line" />
                            )}
                          </SelectGroup>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {topicKind === "info" && (
                    <div className="mt-6 rounded-md border border-line border-l-4 border-l-brand bg-background p-5">
                      <div className="flex items-start gap-3">
                        <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                        <p className="text-sm leading-relaxed text-ink">{LIEFERTERMIN_TEXT}</p>
                      </div>
                    </div>
                  )}

                  {topicKind === "calculator" && (
                    <div className="mt-6">
                      <div className="rounded-md border border-line border-l-4 border-l-brand bg-background p-5">
                        <div className="flex items-start gap-3">
                          <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                          <div className="space-y-3 text-sm leading-relaxed text-ink">
                            <p>{CALCULATOR_INTRO[selectedTopic]}</p>
                            <p>{CALCULATOR_OUTRO}</p>
                          </div>
                        </div>
                      </div>

                      <form onSubmit={handleCalcSubmit} className="mt-5 grid gap-5 md:grid-cols-3">
                        <div className="grid gap-2">
                          <Label htmlFor="calc-zip">Postleitzahl</Label>
                          <Input
                            id="calc-zip"
                            name="calc-zip"
                            inputMode="numeric"
                            placeholder="z. B. 10115"
                            maxLength={5}
                            value={calcZip}
                            onChange={(e) => setCalcZip(e.target.value)}
                            required
                          />
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="calc-amount">Liefermenge in Liter</Label>
                          <Input
                            id="calc-amount"
                            name="calc-amount"
                            inputMode="numeric"
                            placeholder="z. B. 1500"
                            maxLength={6}
                            value={calcAmount}
                            onChange={(e) => setCalcAmount(e.target.value)}
                            required
                          />
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="calc-locations">Anzahl der Lieferstellen</Label>
                          <Select value={calcLocations} onValueChange={setCalcLocations} required>
                            <SelectTrigger id="calc-locations" className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus:ring-1 focus:ring-ring">
                              <SelectValue placeholder="Bitte wählen" />
                            </SelectTrigger>
                            <SelectContent>
                              {LIEFERSTELLEN.map((count) => (
                                <SelectItem key={count} value={count}>
                                  {count}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="md:col-span-3">
                          <Button type="submit" className="w-full sm:w-auto">
                            <Calculator className="h-4 w-4" aria-hidden="true" />
                            Heizölpreis berechnen
                          </Button>
                        </div>
                      </form>
                    </div>
                  )}

                  {topicKind === "full" && (
                    <form onSubmit={handleSubmit} className="mt-6 grid gap-5 md:grid-cols-2">
                      <div className="grid gap-2">
                        <Label htmlFor="salutation">Anrede</Label>
                        <Select name="salutation" required>
                          <SelectTrigger id="salutation" className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus:ring-1 focus:ring-ring">
                            <SelectValue placeholder="Bitte wählen" />
                          </SelectTrigger>
                          <SelectContent>
                            {SALUTATIONS.map((salutation) => (
                              <SelectItem key={salutation.value} value={salutation.value}>
                                {salutation.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" placeholder="Ihr Name" maxLength={100} required />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="email">E-Mail</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="ihre@email.de"
                          maxLength={255}
                          required
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="phone">Telefon</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="z. B. 0176 12345678"
                          maxLength={30}
                          required
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="zip">PLZ</Label>
                        <Input id="zip" name="zip" placeholder="z. B. 10115" maxLength={10} required />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="city">Stadt</Label>
                        <Input id="city" name="city" placeholder="z. B. Berlin" maxLength={100} required />
                      </div>

                      <div className="grid gap-2 md:col-span-2">
                        <Label htmlFor="message">Ihre Nachricht</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Beschreiben Sie Ihr Anliegen..."
                          rows={5}
                          maxLength={1000}
                          required
                        />
                      </div>

                      <div className="flex items-start gap-3 md:col-span-2">
                        <Checkbox id="privacy" name="privacy" required className="mt-0.5" />
                        <Label htmlFor="privacy" className="text-sm font-normal leading-snug text-muted-custom">
                          Ich stimme der Verarbeitung meiner Daten gemäß Datenschutzerklärung zu.
                        </Label>
                      </div>

                      <div className="md:col-span-2">
                        <Button type="submit" className="w-full sm:w-auto">
                          <Send className="h-4 w-4" aria-hidden="true" />
                          Nachricht senden
                        </Button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        <ReferralBanner compact />
      </main>

      <SiteFooter />
    </div>
  );
}
