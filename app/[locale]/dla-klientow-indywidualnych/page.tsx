import { Metadata } from "next";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { locales, type Locale } from "@/lib/i18n/config";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/JsonLd";
import Link from "next/link";
import { Package, ShieldCheck, Clock, MapPin, Truck, CreditCard, CheckCircle2 } from "lucide-react";

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
      ? "Self Storage for Individuals | LOCKIT Szczecin"
      : "Self Storage dla osób prywatnych | LOCKIT Szczecin",
    description: isEn
      ? "Personal storage units in Szczecin. Safe place for your belongings during renovation, moving or just for decluttering. 24/7 access, from 125 PLN/month."
      : "Boks magazynowy dla osób prywatnych w Szczecinie. Bezpieczne miejsce na Twoje rzeczy podczas remontu, przeprowadzki lub gdy potrzebujesz więcej przestrzeni. Dostęp 24/7, od 125 zł/mies.",
    alternates: {
      canonical: `https://lockit.pl/${locale === "pl" ? "" : "en/"}dla-klientow-indywidualnych`,
      languages: {
        pl: "https://lockit.pl/dla-klientow-indywidualnych",
        en: "https://lockit.pl/en/dla-klientow-indywidualnych",
      },
    },
  };
}

const benefitsPl = [
  { icon: ShieldCheck, title: "Bezpieczeństwo 24/7", desc: "Monitoring, ochrona i indywidualne zamki do boksu" },
  { icon: Clock, title: "Dostęp o każdej porze", desc: "Wejdź do swojego boksu kiedy chcesz — dzień i noc" },
  { icon: Package, title: "Elastyczny metraż", desc: "Od 3 m² do 12 m² — płacisz tylko za potrzebną przestrzeń" },
  { icon: CreditCard, title: "Bez zobowiązań", desc: "Najem na dowolny okres — wypowiedz kiedy chcesz" },
  { icon: MapPin, title: "Świetna lokalizacja", desc: "ul. Gdańska 14C — 10 minut z centrum Szczecina" },
  { icon: Truck, title: "Wygodny dojazd", desc: "Duży parking i możliwość wjazdu pod sam boks" },
];

const benefitsEn = [
  { icon: ShieldCheck, title: "24/7 Security", desc: "Monitoring, security and individual locks for your unit" },
  { icon: Clock, title: "Access anytime", desc: "Enter your unit whenever you want — day and night" },
  { icon: Package, title: "Flexible sizes", desc: "From 3 m² to 12 m² — pay only for the space you need" },
  { icon: CreditCard, title: "No commitment", desc: "Rent for any period — cancel whenever you want" },
  { icon: MapPin, title: "Great location", desc: "ul. Gdańska 14C — 10 minutes from Szczecin center" },
  { icon: Truck, title: "Easy access", desc: "Large parking and drive-up to your unit" },
];

const useCasesPl = [
  "Rzeczy z mieszkania, które zajmują za dużo miejsca",
  "Sezonowy sprzęt sportowy — narty, rowery, deski",
  "Meble i kartony podczas remontu lub przeprowadzki",
  "Pamiątki rodzinne, które chcesz zachować bezpiecznie",
  "Kolekcje, hobby, sprzęt fotograficzny",
  "Dokumenty, książki i archiwa domowe",
];

const useCasesEn = [
  "Items from your apartment that take up too much space",
  "Seasonal sports equipment — skis, bikes, boards",
  "Furniture and boxes during renovation or moving",
  "Family memorabilia you want to keep safe",
  "Collections, hobbies, photography equipment",
  "Documents, books and home archives",
];

export default async function IndividualClientsPage({
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
    name: isEn ? "Self Storage for Individuals" : "Self Storage dla osób prywatnych",
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
    description: isEn
      ? "Personal storage units for individuals in Szczecin"
      : "Boksy magazynowe dla osób prywatnych w Szczecinie",
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
                {isEn ? "For Individuals" : "Dla osób prywatnych"}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                {isEn
                  ? "Your personal storage space in Szczecin"
                  : "Twoja prywatna przestrzeń magazynowa w Szczecinie"}
              </h1>
              <p className="text-lg text-muted-foreground mb-8 text-pretty">
                {isEn
                  ? "Need more space at home? Our storage units are a safe place for your belongings — available 24/7, with full security and flexible rental terms."
                  : "Potrzebujesz więcej miejsca w domu? Nasze boksy magazynowe to bezpieczne miejsce na Twoje rzeczy — dostępne 24/7, z pełnym zabezpieczeniem i elastycznymi warunkami najmu."}
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
              {isEn ? "Why choose LOCKIT?" : "Dlaczego warto wybrać LOCKIT?"}
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
                {isEn ? "What can you store?" : "Co możesz przechować?"}
              </h2>
              <p className="text-center text-muted-foreground mb-12">
                {isEn
                  ? "Our clients store a variety of items — from furniture to hobby equipment"
                  : "Nasi klienci przechowują różne rzeczy — od mebli po sprzęt hobbystyczny"}
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
              {isEn ? "Ready to rent your storage unit?" : "Gotowy wynająć swój boks?"}
            </h2>
            <p className="text-brand-100 mb-8 max-w-xl mx-auto">
              {isEn
                ? "Choose your size and rent online in 5 minutes. No long-term commitment."
                : "Wybierz rozmiar i wynajmij online w 5 minut. Bez długoterminowych zobowiązań."}
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
