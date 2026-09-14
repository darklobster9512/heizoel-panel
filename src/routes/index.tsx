import { createFileRoute } from "@tanstack/react-router";

import { SiteHeader } from "@/components/landing/site-header";
import { Hero } from "@/components/landing/hero";
import { CustomerVoices } from "@/components/landing/customer-voices";
import {
  ConditionsBox,
  HeizoelServiceIntro,
  HeizoelSorten,
  MatchingOffers,
  PersonalDataInfo,
  RegionalSeo,
  SiteFooter,
  Steps,
  ReferralBanner,
  TrustBar,
  TrustLinks,
} from "@/components/landing/sections";


const DESCRIPTION =
  "Klaro – Heizöl-Preisvergleich für Deutschland: Preise von über 300 Händlern aus Ihrer Region vergleichen und Heizöl günstig online bestellen. Kostenlos und unverbindlich.";

const TITLE = "Klaro — Heizöl-Preisvergleich für Deutschland";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background font-body text-ink">
      <SiteHeader />
      <main>
        <Hero onSearch={() => {}} />
        <ConditionsBox mobileOnly />
        <TrustBar />
        <ConditionsBox />
        <CustomerVoices />
        <Steps />
        <PersonalDataInfo />
        <MatchingOffers />
        <HeizoelSorten />
        <ReferralBanner />
        <HeizoelServiceIntro />
        <TrustLinks />
        <RegionalSeo />
      </main>
      <SiteFooter />
    </div>
  );
}
