import { Metadata } from "next";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { locales, type Locale } from "@/lib/i18n/config";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/JsonLd";
import Link from "next/link";
import { Home, ShieldCheck, Clock, Package, Truck, Calendar, CheckCircle2 } from "lucide-react";

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
      ? "Storage During Renovation & Moving | LOCKIT Szczecin"
      : "Magazyn na czas remontu i przeprowadzki | LOCKIT Szczecin",
    description: isEn
      ? "Safe storage for your furniture and belongings during renovation or moving in Szczecin. Flexible rental, 24/7 access. From 125 PLN/month."
      : "Bezpieczne miejsce na meble i rzeczy podczas remontu lub przeprowadzki w Szczecinie. Elastyczny najem, dostęp 24/7. Od 125 zł/mies.",
    alternates: {
      canonical: `https://lockit.pl/${locale === "pl" ? "" : "en/"}remont-przeprowadzka`,
      languages: {
        pl: "https://lockit.pl/remont-przeprowadzka",
        en: "https://lockit.pl/en/remont-przeprowadzka",
      },
    },
  };
}

const benefitsPl = [
  { icon: Home, title: "Schowaj meble z mieszkania", desc: "Bezpieczne miejsce na czas remontu lub między mieszkaniami" },
  { icon: Clock, title: "Dostęp 24/7", desc: "Zabierz lub przywieź rzeczy kiedy potrzebujesz" },
  { icon: Calendar, title: "Najem na dowolny okres", desc: "Tydzień, miesiąc czy pół roku — bez zobowiązań" },
  { icon: ShieldCheck, title: "Ubezpieczenie rzeczy", desc: "Twoje meble i przedmioty pod ochroną" },
  { icon: Truck, title: "Łatwy załadunek", desc: "Możliwość wjazdu busem lub przyczepą pod boks" },
  { icon: Package, title: "Różne rozmiary", desc: "Od 3 m² na kartony do 12 m² na całe mieszkanie" },
];

const benefitsEn = [
  { icon: Home, title: "Store furniture from home", desc: "Safe place during renovation or between apartments" },
  { icon: Clock, title: "24/7 Access", desc: "Pick up or drop off items whenever you need" },
  { icon: Calendar, title: "Flexible rental", desc: "A week, month or half a year — no commitment" },
  { icon: ShieldCheck, title: "Item insurance", desc: "Your furniture and belongings protected" },
  { icon: Truck, title: "Easy loading", desc: "Drive up with a van or trailer to your unit" },
  { icon: Package, title: "Various sizes", desc: "From 3 m² for boxes to 12 m² for entire apartment" },
];

const useCasesPl = [
  "Meble podczas remontu mieszkania lub domu",
  "Kartony i rzeczy osobiste przy przeprowadzce",
  "Sprzęt AGD w oczekiwaniu na nowe mieszkanie",
  "Dywany, zasłony i dekoracje",
  "Rowery, wózki dziecięce, sprzęt sportowy",
  "Pamiątki i przedmioty sentymentalne",
];

const useCasesEn = [
  "Furniture during apartment or house renovation",
  "Boxes and personal items when moving",
  "Appliances while waiting for new apartment",
  "Carpets, curtains and decorations",
  "Bikes, strollers, sports equipment",
  "Memorabilia and sentimental items",
];

export default async function RenovationPage({
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
    name: isEn ? "Renovation & Moving Storage" : "Magazyn na czas remontu i przeprowadzki",
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
                {isEn ? "Renovation & Moving" : "Remont i przeprowadzka"}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                {isEn
                  ? "Safe storage during renovation or moving"
                  : "Bezpieczne miejsce na czas remontu lub przeprowadzki"}
              </h1>
              <p className="text-lg text-muted-foreground mb-8 text-pretty">
                {isEn
                  ? "Renovating your home or moving between apartments? Our storage units keep your furniture and belongings safe while you focus on the transition."
                  : "Remontujesz mieszkanie lub przeprowadzasz się? Nasze boksy magazynowe bezpiecznie przechowają Twoje meble i rzeczy, podczas gdy Ty skupiasz się na zmianie."}
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
              {isEn ? "Why store with us during renovation" : "Dlaczego warto przechować u nas na czas remontu"}
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
                {isEn ? "What can you store during renovation?" : "Co możesz przechować na czas remontu?"}
              </h2>
              <p className="text-center text-muted-foreground mb-12">
                {isEn
                  ? "Our clients store various items during home transitions"
                  : "Nasi klienci przechowują różne rzeczy podczas zmian mieszkaniowych"}
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
              {isEn ? "Start your renovation worry-free" : "Zacznij remont bez stresu"}
            </h2>
            <p className="text-brand-100 mb-8 max-w-xl mx-auto">
              {isEn
                ? "Rent a storage unit in 5 minutes. No long-term commitment."
                : "Wynajmij boks w 5 minut. Bez długoterminowych zobowiązań."}
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
