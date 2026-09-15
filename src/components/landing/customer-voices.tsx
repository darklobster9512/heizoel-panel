import { useRef, useState } from "react";
import eKomiLogo from "@/assets/ekomi.webp.asset.json";
import avatarAsset from "@/assets/avatar.svg.asset.json";
import googleIcon from "@/assets/google-icon.webp.asset.json";
import trustedShopsIcon from "@/assets/trusted-shops-icon.png.asset.json";

type Voice = {
  text: string;
  author: string;
};

const VOICES: Voice[] = [
  {
    text: "Super einfache Preisanfrage und die günstigsten Angebote aus meiner Region. Bestellung war in wenigen Minuten erledigt.",
    author: "Gisela Schmidt",
  },
  {
    text: "Ich habe über 200 € gegenüber dem letzten Jahr gespart. Der Vergleich lohnt sich wirklich, danke!",
    author: "Sabrina Gärtner",
  },
  {
    text: "Unkompliziert und transparent. Die Lieferung kam sogar zwei Tage früher als angegeben.",
    author: "Mario Tiedemann",
  },
  {
    text: "Sehr übersichtliche Angebote. Ich konnte Preise, Lieferzeit und Zahlungsart direkt vergleichen.",
    author: "Jessica Meyer",
  },
  {
    text: "Alles online erledigt, ohne Telefonate. Beim nächsten Tanken bestelle ich wieder über Heizking.",
    author: "Renate Hoffmann",
  },
  {
    text: "Guter Preis, schnelle Lieferung, freundlicher Fahrer. Besser geht es nicht.",
    author: "Tobias Wagner",
  },
  {
    text: "Endlich muss ich nicht mehr fünf Händler einzeln anrufen. Ein Vergleich, ein Klick, fertig.",
    author: "Monika Lorenz",
  },
  {
    text: "Schnelle Antwort auf meine Frage zur Lieferung. Sehr kundenfreundlicher Service.",
    author: "Heike Richter",
  },
  {
    text: "Klare Empfehlung für alle, die Heizöl günstig und stressfrei bestellen wollen.",
    author: "Claudia Vogt",
  },
  {
    text: "Der Preisvergleich hat mir bei meinem neuen Haus wirklich geholfen. Übersichtlich und fair.",
    author: "Stefan Berger",
  },
  {
    text: "Ich habe innerhalb von zwei Tagen das beste Angebot für meine Region bekommen. Top Service!",
    author: "Petra Schäfer",
  },
  {
    text: "Die Abwicklung war unkompliziert und der Fahrer sehr freundlich. Gerne wieder.",
    author: "Andreas Klein",
  },
  {
    text: "Endlich mal eine Plattform, die transparent ist und keine versteckten Kosten hat.",
    author: "Susanne Neumann",
  },
  {
    text: "Ich habe über 150 € gegenüber meinem Stammlieferanten gespart. Absolut empfehlenswert.",
    author: "Frank Müller",
  },
  {
    text: "Alles lief reibungslos von der Anfrage bis zur Lieferung. Daumen hoch für Heizking.",
    author: "Birgit Keller",
  },
];

const RATINGS = [
  { label: "eKomi", sub: null as string | null, value: 4.6, count: "18.400", isEkomi: true, icon: null as string | null },
  { label: "Trusted Shops", sub: null, value: 4.5, count: "2.140", isEkomi: false, icon: trustedShopsIcon.url },
  { label: "Google", sub: null, value: 4.5, count: "860", isEkomi: false, icon: googleIcon.url },
];

function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 ${className}`} aria-label={`${rating} von 5 Sternen`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          aria-hidden="true"
          viewBox="0 0 24 24"
          className={`size-4 shrink-0 ${i <= Math.round(rating) ? "fill-[#F5A623]" : "fill-line"}`}
        >
          <path d="M12 2.5l2.95 6.26 6.87.72-5.12 4.63 1.43 6.76L12 17.42l-6.13 3.45 1.43-6.76-5.12-4.63 6.87-.72L12 2.5z" />
        </svg>
      ))}
    </span>
  );
}

function VoiceCard({ voice }: { voice: Voice }) {
  return (
    <figure className="relative overflow-hidden rounded-lg border border-line bg-white p-7 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
      <span className="absolute left-0 right-0 top-0 h-[2px] bg-brand" aria-hidden="true" />
      <span className="flex items-center gap-2">
        <Stars rating={5} />
        <span className="text-[13px] font-semibold text-muted-custom">5/5</span>
      </span>
      <blockquote className="mt-4 min-h-[100px] text-[15px] leading-[1.6] text-conditions">
        „{voice.text}"
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <img
          src={avatarAsset.url}
          alt=""
          width={44}
          height={44}
          className="size-11 shrink-0 rounded-full"
          loading="lazy"
        />
        <span className="text-[14px] font-semibold text-ink">{voice.author}</span>
      </figcaption>
    </figure>
  );
}

const PAGES: Voice[][] = [
  VOICES.slice(0, 3),
  VOICES.slice(3, 6),
  VOICES.slice(6, 9),
  VOICES.slice(9, 12),
  VOICES.slice(12, 15),
];

export function CustomerVoices() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activePage, setActivePage] = useState(0);

  const goToPage = (page: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: track.clientWidth * page, behavior: "smooth" });
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;
    const page = Math.round(track.scrollLeft / track.clientWidth);
    if (page !== activePage) setActivePage(page);
  };

  return (
    <section id="bewertungen" aria-label="Kundenbewertungen" className="overflow-hidden bg-background pb-16 pt-2 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="text-center">
          <h2 className="text-[26px] font-bold leading-[1.3] text-conditions md:text-[32px]">
            Über 25.000 zufriedene Kunden
          </h2>
          <div className="mt-2 flex items-center justify-center gap-2 text-[15px] text-conditions">
            <Stars rating={5} />
            <span>
              <strong className="font-bold">4,9</strong>/5 von <strong className="font-bold">21.400</strong>{" "}
              Bewertungen
            </span>
          </div>
        </div>

        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="mt-10 flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {PAGES.map((page, pageIndex) => (
            <div
              key={pageIndex}
              className="grid w-full shrink-0 snap-start grid-cols-1 gap-5 px-0.5 md:grid-cols-3"
            >
              {page.map((voice) => (
                <VoiceCard key={voice.author} voice={voice} />
              ))}
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-2" role="tablist" aria-label="Bewertungsseiten">
          {PAGES.map((_, pageIndex) => (
            <button
              key={pageIndex}
              type="button"
              role="tab"
              aria-selected={activePage === pageIndex}
              aria-label={`Bewertungen Seite ${pageIndex + 1}`}
              onClick={() => goToPage(pageIndex)}
              className={`size-2.5 rounded-full transition-colors ${
                activePage === pageIndex ? "bg-brand" : "bg-line hover:bg-muted-custom"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-y-8 px-5 md:grid-cols-3">
        {RATINGS.map((r) => (
          <div key={r.label} className="flex flex-col items-center gap-1.5 text-center">
            <span className="flex h-[40px] items-center justify-center">
              {r.isEkomi ? (
                <img src={eKomiLogo.url} alt="eKomi" width={138} height={40} className="h-[40px] w-auto" loading="lazy" />
              ) : r.icon ? (
                <img src={r.icon} alt={r.label} width={40} height={40} className="size-[40px] object-contain" loading="lazy" />
              ) : (
                <span className="text-[15px] font-bold text-ink">{r.label}</span>
              )}
            </span>
            <Stars rating={r.value} />
            <span className="text-[13px] text-muted-custom">
              {r.value.toLocaleString("de-DE")}/5
              {r.count ? ` von ${r.count} Bewertungen` : ""}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
