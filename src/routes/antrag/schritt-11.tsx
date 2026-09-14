import { createFileRoute } from "@tanstack/react-router";

import { useWizard } from "@/lib/wizard-store";
import {
  CheckboxRow,
  ChoiceTiles,
  NavButtons,
  ProgressBar,
  TextField,
  TrustBlock,
  WhyInfo,
} from "@/components/wizard/ui";

export const Route = createFileRoute("/antrag/schritt-11")({
  head: () => ({ meta: [{ title: "Schritt 11: Kontaktdaten – smava Kreditanfrage" }] }),
  component: Step11,
});


function Step11() {
  const { data, update } = useWizard();
  const firstNamePlaceholder = data.salutation === "frau" ? "z.B. Maria" : "z.B. Max";

  return (
    <div className="mx-auto w-full max-w-[590px] px-5 pt-6 md:pt-10">
      <ProgressBar percent={64} />

      <h1 className="mt-6 text-[22px] font-bold leading-[1.3] text-[#323232]">
        Fast geschafft! Gleich erhalten Sie Ihre Kreditangebote.
      </h1>
      <p className="mt-4 text-[15px] leading-[1.6] text-[#323232]">
        Dafür benötigen wir nur noch einige Angaben zu Ihrer Person. Und schon generieren wir Ihre
        persönliche Kreditrate.
      </p>

      <h2 className="mt-5 text-[17px] font-bold text-[#323232]">Kontaktdaten</h2>

      <WhyInfo text="Nur mit den Angaben zu Ihrer Person ermitteln wir das bestmögliche Angebot für Sie. Dabei brauchen Sie sich keine Sorgen machen, denn Ihre Informationen werden von uns vertraulich behandelt und verschlüsselt übermittelt." />

      <div className="mt-5">
        <span className="text-[14px] text-[#323232]">Anrede</span>
        <ChoiceTiles
          options={[
            { value: "herr" as const, label: "Herr" },
            { value: "frau" as const, label: "Frau" },
          ]}
          value={data.salutation}
          onChange={(v) => update({ salutation: v })}
        />
      </div>

      <div className="mt-4 space-y-4">
        <TextField
          id="vorname"
          label="Vorname(n)"
          focusHint="Wichtig: Bitte achten Sie darauf, dass Ihre Angabe mit Ihrem Personalausweis oder Reisepass übereinstimmt."
          placeholder={firstNamePlaceholder}
          value={data.firstName ?? ""}
          onChange={(v) => update({ firstName: v })}
        />

        <TextField
          id="nachname"
          label="Nachname"
          focusHint="Wichtig: Bitte achten Sie darauf, dass Ihre Angabe mit Ihrem Personalausweis oder Reisepass übereinstimmt."
          placeholder="z.B. Mustermann"
          value={data.lastName ?? ""}
          onChange={(v) => update({ lastName: v })}
        />

        <TextField
          id="telefon2"
          label="Mobilfunknummer (alternativ Festnetznummer)"
          focusHint="Die Telefonnummer wird für eventuelle Rückfragen benötigt."
          type="tel"
          placeholder="z.B. +49 172 9925904"
          value={data.phone ?? ""}
          onChange={(v) => update({ phone: v })}
        />

        <TextField
          id="email2"
          label="E-Mail"
          focusHint="An diese E-Mail Adresse werden alle wichtigen Anträge, Unterlagen zu Abschlüssen und Vergleichen geschickt. Bitte stellen Sie sicher, dass Sie die richtige E-Mail-Adresse angeben und überprüfen Sie diese gegebenenfalls noch einmal. Eine korrekte E-Mail-Adresse wird für die Bereitstellung aller Dienstleistungen von smava benötigt."
          type="email"
          placeholder="z.B. max.muster@gmail.com"
          value={data.email ?? ""}
          onChange={(v) => update({ email: v })}
        />
      </div>

      <p className="mt-5 text-[12.5px] leading-[1.6] text-[#5b5b5b]">
        Mit Klick auf den "Weiter"-Button akzeptiere ich die{" "}
        <a
          href="https://www.smava.de/agb/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand hover:underline"
        >
          AGB
        </a>{" "}
        und erteile smava einen kostenlosen Kreditvergleichsauftrag. Ich habe die{" "}
        <a
          href="https://www.smava.de/pflichtinformationen/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand hover:underline"
        >
          Pflichtinformationen
        </a>{" "}
        und die{" "}
        <a
          href="https://www.smava.de/datenschutz/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand hover:underline"
        >
          Datenschutzhinweise
        </a>{" "}
        erhalten.
      </p>

      <div className="mt-4">
        <CheckboxRow
          checked={data.marketingConsent ?? false}
          onChange={(v) => update({ marketingConsent: v })}
        >
          Ich möchte zudem über günstige Kreditangebote und Services von smava informiert werden und
          willige ein, dass smava meine Angaben zur Kontaktaufnahme nutzt. Ich kann meine{" "}
          <a
            href="https://www.smava.de/datenschutz/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand hover:underline"
          >
            freiwillige Einwilligung
          </a>{" "}
          jederzeit mit Wirkung für die Zukunft widerrufen.
        </CheckboxRow>
      </div>

      <NavButtons backTo="/antrag/schritt-10" nextTo="/antrag/schritt-12" />

      <p className="mt-6 text-[12.5px] leading-[1.6] text-[#5b5b5b]">
        smava versendet Informationen und Umfragen zu unserer Dienstleistung unter Verwendung
        elektronischer Post. Dem Erhalt kann ich jederzeit per E-Mail an info@smava.de
        widersprechen.
      </p>

      <TrustBlock />
    </div>
  );
}
