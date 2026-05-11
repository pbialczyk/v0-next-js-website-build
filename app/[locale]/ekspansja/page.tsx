import { Metadata } from "next";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { locales, type Locale } from "@/lib/i18n/config";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/JsonLd";
import Link from "next/link";
import { Building2, MapPin, Handshake, TrendingUp } from "lucide-react";

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
      ? "Expansion — We're Looking for Properties | LOCKIT Self Storage"
      : "Ekspansja — szukamy nieruchomości | LOCKIT Self Storage",
    description: isEn
      ? "LOCKIT Self Storage is expanding. We're looking for commercial properties for new self-storage facilities. Partner with us or sell/lease your property."
      : "LOCKIT Self Storage rozwija się. Szukamy nieruchomości komercyjnych na nowe magazyny samoobsługowe. Współpracuj z nami lub sprzedaj/wynajmij swoją nieruchomość.",
    alternates: {
      canonical: `https://lockit.pl/${locale === "pl" ? "" : "en/"}ekspansja`,
      languages: { pl: "https://lockit.pl/ekspansja", en: "https://lockit.pl/en/ekspansja" },
    },
  };
}

export default async function ExpansionPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const isEn = locale === "en";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: isEn ? "Expansion — LOCKIT Self Storage" : "Ekspansja — LOCKIT Self Storage",
  };

  const requirementsPl = [
    "Powierzchnia od 500 m² do 3000 m²",
    "Lokalizacja w mieście powyżej 100 tys. mieszkańców",
    "Dobry dojazd dla samochodów osobowych i busów",
    "Możliwość adaptacji na magazyn samoobsługowy",
  ];

  const requirementsEn = [
    "Area from 500 m² to 3000 m²",
    "Location in a city with over 100k residents",
    "Good access for cars and vans",
    "Possibility of adaptation for self-storage",
  ];

  const requirements = isEn ? requirementsEn : requirementsPl;

  return (
    <>
      <JsonLd data={jsonLd} />
      <Navbar dict={dict} locale={locale} />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="bg-gradient-to-b from-amber-50 to-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                {isEn ? "Expansion" : "Ekspansja"}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                {isEn
                  ? "We're expanding — and looking for properties"
                  : "Rozwijamy się — szukamy nieruchomości"}
              </h1>
              <p className="text-lg text-muted-foreground mb-8 text-pretty">
                {isEn
                  ? "LOCKIT Self Storage is growing. We're actively looking for commercial properties to open new self-storage facilities in Polish cities."
                  : "LOCKIT Self Storage rozwija się. Aktywnie poszukujemy nieruchomości komercyjnych na otwarcie nowych magazynów samoobsługowych w polskich miastach."}
              </p>
            </div>
          </div>
        </section>

        {/* What we're looking for */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
                {isEn ? "What we're looking for" : "Czego szukamy"}
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card border border-border rounded-xl p-6">
                  <Building2 className="w-10 h-10 text-amber-600 mb-4" />
                  <h3 className="font-semibold text-lg mb-3">
                    {isEn ? "Commercial Properties" : "Nieruchomości komercyjne"}
                  </h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    {requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-600 mt-1">•</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <MapPin className="w-10 h-10 text-amber-600 mb-4" />
                  <h3 className="font-semibold text-lg mb-3">
                    {isEn ? "Priority Cities" : "Priorytetowe miasta"}
                  </h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-1">•</span>
                      {isEn ? "Tri-City (Gdańsk, Gdynia, Sopot)" : "Trójmiasto (Gdańsk, Gdynia, Sopot)"}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-1">•</span>
                      {isEn ? "Poznań" : "Poznań"}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-1">•</span>
                      {isEn ? "Wrocław" : "Wrocław"}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-1">•</span>
                      {isEn ? "Other cities over 100k residents" : "Inne miasta powyżej 100 tys. mieszkańców"}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cooperation models */}
        <section className="py-16 md:py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
                {isEn ? "Cooperation Models" : "Modele współpracy"}
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border border-border rounded-xl p-6">
                  <Handshake className="w-10 h-10 text-brand mb-4" />
                  <h3 className="font-semibold text-lg mb-2">
                    {isEn ? "Long-term Lease" : "Długoterminowy najem"}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {isEn
                      ? "We offer stable, long-term rental agreements with guaranteed income for property owners."
                      : "Oferujemy stabilne, długoterminowe umowy najmu z gwarantowanym dochodem dla właścicieli nieruchomości."}
                  </p>
                </div>

                <div className="bg-white border border-border rounded-xl p-6">
                  <TrendingUp className="w-10 h-10 text-brand mb-4" />
                  <h3 className="font-semibold text-lg mb-2">
                    {isEn ? "Property Purchase" : "Zakup nieruchomości"}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {isEn
                      ? "We're also interested in purchasing properties outright that meet our criteria."
                      : "Jesteśmy również zainteresowani zakupem nieruchomości spełniających nasze kryteria."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-amber-500">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {isEn ? "Have a property to offer?" : "Masz nieruchomość do zaoferowania?"}
            </h2>
            <p className="text-amber-100 mb-8 max-w-xl mx-auto">
              {isEn
                ? "Contact us with details about your property. We respond within 48 hours."
                : "Skontaktuj się z nami z informacjami o Twojej nieruchomości. Odpowiadamy w ciągu 48 godzin."}
            </p>
            <Button asChild size="lg" variant="secondary" className="bg-white text-amber-600 hover:bg-slate-100">
              <Link href={`/${locale}/kontakt`}>{dict.common.contactUs}</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer dict={dict} locale={locale} />
    </>
  );
}
