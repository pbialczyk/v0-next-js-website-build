import { Metadata } from "next";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { locales, type Locale } from "@/lib/i18n/config";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/JsonLd";
import Link from "next/link";
import { Truck, Clock, Users, Shield, MapPin, CheckCircle2 } from "lucide-react";

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
      ? "Transport & Moving Services | LOCKIT Szczecin"
      : "Transport i przeprowadzka | LOCKIT Szczecin",
    description: isEn
      ? "Professional transport and moving services in Szczecin. We help you move your belongings to our storage units or relocate between addresses."
      : "Profesjonalny transport i przeprowadzki w Szczecinie. Pomożemy przewieźć rzeczy do naszego magazynu lub przeprowadzić się między adresami.",
    alternates: {
      canonical: `https://lockit.pl/${locale === "pl" ? "" : "en/"}transport-przeprowadzka`,
      languages: {
        pl: "https://lockit.pl/transport-przeprowadzka",
        en: "https://lockit.pl/en/transport-przeprowadzka",
      },
    },
  };
}

const servicesPl = [
  { icon: Truck, title: "Transport do magazynu", desc: "Przewieziemy Twoje rzeczy z dowolnego miejsca w Szczecinie do naszego magazynu" },
  { icon: Users, title: "Pomoc przy załadunku", desc: "Nasi pracownicy pomogą Ci załadować i rozładować ciężkie przedmioty" },
  { icon: MapPin, title: "Przeprowadzki lokalne", desc: "Kompleksowa pomoc przy przeprowadzce w obrębie Szczecina i okolic" },
  { icon: Shield, title: "Ubezpieczony transport", desc: "Twoje rzeczy są ubezpieczone podczas transportu" },
];

const servicesEn = [
  { icon: Truck, title: "Transport to storage", desc: "We'll move your belongings from anywhere in Szczecin to our facility" },
  { icon: Users, title: "Loading assistance", desc: "Our team will help you load and unload heavy items" },
  { icon: MapPin, title: "Local moving", desc: "Comprehensive moving assistance within Szczecin and surroundings" },
  { icon: Shield, title: "Insured transport", desc: "Your belongings are insured during transport" },
];

export default async function TransportPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const isEn = locale === "en";

  const services = isEn ? servicesEn : servicesPl;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: isEn ? "Transport & Moving Services" : "Transport i przeprowadzka",
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
        <section className="bg-gradient-to-b from-amber-50 to-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                {isEn ? "Additional Service" : "Usługa dodatkowa"}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                {isEn
                  ? "Transport & Moving Services"
                  : "Transport i przeprowadzka"}
              </h1>
              <p className="text-lg text-muted-foreground mb-8 text-pretty">
                {isEn
                  ? "Need help moving your belongings to storage? We offer professional transport and moving services in Szczecin — from a single item to a full apartment."
                  : "Potrzebujesz pomocy w przewiezieniu rzeczy do magazynu? Oferujemy profesjonalny transport i przeprowadzki w Szczecinie — od pojedynczego przedmiotu po całe mieszkanie."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-brand hover:bg-brand-dark text-white">
                  <Link href={`/${locale}/kontakt`}>{dict.common.contactUs}</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href={`/${locale}/boksy/szczecin`}>{dict.common.seePricing}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              {isEn ? "What we offer" : "Co oferujemy"}
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {services.map((service, i) => (
                <div
                  key={i}
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <service.icon className="w-10 h-10 text-amber-600 mb-4" />
                  <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 md:py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
                {isEn ? "How it works" : "Jak to działa"}
              </h2>
              <div className="space-y-6">
                {(isEn
                  ? [
                      "Contact us and describe what you need to transport",
                      "We'll provide a quote based on volume and distance",
                      "Schedule a convenient pickup date and time",
                      "Our team arrives, loads, transports, and unloads at the storage unit",
                    ]
                  : [
                      "Skontaktuj się z nami i opisz co chcesz przewieźć",
                      "Podamy wycenę na podstawie objętości i dystansu",
                      "Umawiamy dogodny termin odbioru",
                      "Nasz zespół przyjeżdża, ładuje, transportuje i rozładowuje w magazynie",
                    ]
                ).map((step, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center font-bold text-sm">
                      {i + 1}
                    </div>
                    <p className="text-foreground pt-1">{step}</p>
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
              {isEn ? "Need transport help?" : "Potrzebujesz pomocy z transportem?"}
            </h2>
            <p className="text-brand-100 mb-8 max-w-xl mx-auto">
              {isEn
                ? "Contact us for a free quote. We respond within 24 hours."
                : "Skontaktuj się po darmową wycenę. Odpowiadamy w ciągu 24 godzin."}
            </p>
            <Button asChild size="lg" variant="secondary" className="bg-white text-brand hover:bg-slate-100">
              <Link href={`/${locale}/kontakt`}>{dict.common.contactUs}</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer dict={dict} locale={locale} />
    </>
  );
}
