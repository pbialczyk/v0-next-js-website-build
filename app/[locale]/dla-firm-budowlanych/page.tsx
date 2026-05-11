import { Metadata } from "next";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { locales, type Locale } from "@/lib/i18n/config";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/JsonLd";
import Link from "next/link";
import { HardHat, ShieldCheck, Clock, Package, Truck, CreditCard, CheckCircle2 } from "lucide-react";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";

  return {
    title: isEn
      ? "Storage for Construction Companies | LOCKIT Szczecin"
      : "Magazyn dla firm budowlanych | LOCKIT Szczecin",
    description: isEn
      ? "Secure storage for construction equipment, tools and materials in Szczecin. 24/7 access, drive-up for vans, VAT invoice. From 125 PLN/month."
      : "Bezpieczny magazyn na sprzęt budowlany, narzędzia i materiały w Szczecinie. Dostęp 24/7, wjazd dla busów, faktura VAT. Od 125 zł/mies.",
    alternates: {
      canonical: `https://lockit.pl/${locale === "pl" ? "" : "en/"}dla-firm-budowlanych`,
      languages: {
        pl: "https://lockit.pl/dla-firm-budowlanych",
        en: "https://lockit.pl/en/dla-firm-budowlanych",
      },
    },
  };
}

const benefitsPl = [
  { icon: HardHat, title: "Magazyn dla budowlanki", desc: "Bezpieczne miejsce na sprzęt między projektami" },
  { icon: Clock, title: "Dostęp 24/7", desc: "Zabierz narzędzia nawet o 5 rano przed pracą" },
  { icon: Package, title: "Duże boksy do 12 m²", desc: "Zmieszczą się rusztowania, drabiny i maszyny" },
  { icon: ShieldCheck, title: "Ubezpieczenie sprzętu", desc: "Ochrona Twojego cennego wyposażenia" },
  { icon: Truck, title: "Wjazd dla busów", desc: "Załadunek i rozładunek bezpośrednio pod boksem" },
  { icon: CreditCard, title: "Faktura VAT", desc: "Koszty magazynowania w kosztach firmy" },
];

const benefitsEn = [
  { icon: HardHat, title: "Construction storage", desc: "Safe place for equipment between projects" },
  { icon: Clock, title: "24/7 Access", desc: "Pick up tools even at 5am before work" },
  { icon: Package, title: "Large units up to 12 m²", desc: "Fit scaffolding, ladders and machinery" },
  { icon: ShieldCheck, title: "Equipment insurance", desc: "Protection for your valuable equipment" },
  { icon: Truck, title: "Van access", desc: "Loading and unloading directly at your unit" },
  { icon: CreditCard, title: "VAT Invoice", desc: "Storage costs as business expenses" },
];

const useCasesPl = [
  "Elektronarzędzia i sprzęt budowlany",
  "Rusztowania, drabiny i podnośniki",
  "Materiały budowlane między etapami",
  "Narzędzia ręczne i specjalistyczne",
  "Osprzęt i elementy wykończeniowe",
  "Dokumentacja projektowa i plany",
];

const useCasesEn = [
  "Power tools and construction equipment",
  "Scaffolding, ladders and lifts",
  "Building materials between stages",
  "Hand and specialist tools",
  "Fittings and finishing elements",
  "Project documentation and plans",
];

export default async function ConstructionPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const isEn = locale === "en";

  const benefits = isEn ? benefitsEn : benefitsPl;
  const useCases = isEn ? useCasesEn : useCasesPl;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: isEn ? "Construction Company Storage" : "Magazyn dla firm budowlanych",
    provider: {
      "@type": "LocalBusiness",
      name: "LOCKIT Self Storage",
      address: {
        "@type": "PostalAddress",
        streetAddress: "ul. Gdańska 14C",
        addressLocality: "Szczecin",
        postalCode: "70-661",
        addressCountry: "PL",
      },
    },
    areaServed: "Szczecin",
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <Navbar dict={dict} locale={locale} />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="bg-gradient-to-b from-brand-50 to-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block bg-brand/10 text-brand px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                {isEn ? "For Construction Companies" : "Dla firm budowlanych"}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                {isEn
                  ? "Secure storage for your construction equipment"
                  : "Bezpieczny magazyn na Twój sprzęt budowlany"}
              </h1>
              <p className="text-lg text-muted-foreground mb-8 text-pretty">
                {isEn
                  ? "Need a place for tools and equipment between construction sites? Our storage units offer 24/7 access, drive-up loading, and full security for your valuable equipment."
                  : "Szukasz miejsca na narzędzia i sprzęt między budowami? Nasze boksy oferują dostęp 24/7, załadunek pod boksem i pełne zabezpieczenie Twojego cennego wyposażenia."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-brand hover:bg-brand-dark text-white">
                  <Link href={`/${locale}/boksy/szczecin`}>{dict.common.seePricing}</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href={`/${locale}/kontakt`}>{dict.common.contactUs}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              {isEn ? "Why construction companies choose us" : "Dlaczego firmy budowlane nas wybierają"}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {benefits.map((benefit, i) => (
                <div
                  key={i}
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <benefit.icon className="w-10 h-10 text-brand mb-4" />
                  <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-16 md:py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
                {isEn ? "What construction companies store" : "Co przechowują firmy budowlane"}
              </h2>
              <p className="text-center text-muted-foreground mb-12">
                {isEn
                  ? "Our construction clients store various equipment and materials"
                  : "Nasi klienci z branży budowlanej przechowują różny sprzęt i materiały"}
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {useCases.map((useCase, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-lg border">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{useCase}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-brand">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {isEn ? "Secure your equipment today" : "Zabezpiecz swój sprzęt już dziś"}
            </h2>
            <p className="text-brand-100 mb-8 max-w-xl mx-auto">
              {isEn
                ? "Rent online in 5 minutes. VAT invoice included."
                : "Wynajmij online w 5 minut. Faktura VAT w cenie."}
            </p>
            <Button asChild size="lg" variant="secondary" className="bg-white text-brand hover:bg-slate-100">
              <Link href={`/${locale}/boksy/szczecin`}>{dict.common.seePricing}</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer dict={dict} locale={locale} />
    </>
  );
}
