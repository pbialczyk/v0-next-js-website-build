import { Metadata } from "next";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { locales, type Locale } from "@/lib/i18n/config";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/JsonLd";
import Link from "next/link";
import { Building2, ShieldCheck, Clock, FileText, Truck, CreditCard, CheckCircle2, Package } from "lucide-react";

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

  const title = isEn ? "Business Storage Solutions | LOCKIT Szczecin B2B" : "Magazyn dla firm | LOCKIT Szczecin B2B";
  const description = isEn
    ? "Flexible storage solutions for businesses in Szczecin. Store inventory, documents, equipment. 24/7 access, invoice, no long-term contracts."
    : "Elastyczny magazyn dla firm w Szczecinie. Przechowuj towary, dokumenty, sprzęt. Dostęp 24/7, faktura VAT, bez długoterminowych umów.";
  const url = `https://lockit.pl/${locale === "pl" ? "" : "en/"}dla-firm`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { pl: "https://lockit.pl/dla-firm", en: "https://lockit.pl/en/dla-firm" },
    },
    openGraph: {
      title, description, url,
      siteName: 'LOCKIT Self Storage',
      locale: isEn ? 'en_US' : 'pl_PL',
      type: 'website',
      images: [{ url: 'https://lockit.pl/og-image.jpg', width: 1200, height: 630, alt: 'LOCKIT Self Storage dla firm' }],
    },
    twitter: {
      card: 'summary_large_image',
      title, description,
      images: ['https://lockit.pl/og-image.jpg'],
    },
  };
}

const benefitsPl = [
  { icon: Building2, title: "Elastyczny magazyn", desc: "Skaluj powierzchnię w zależności od potrzeb firmy" },
  { icon: Clock, title: "Dostęp 24/7/365", desc: "Twój magazyn dostępny o każdej porze — nawet w święta" },
  { icon: FileText, title: "Faktura VAT", desc: "Pełna dokumentacja księgowa dla Twojej firmy" },
  { icon: ShieldCheck, title: "Ubezpieczenie", desc: "Ochrona przechowywanego mienia w cenie" },
  { icon: Truck, title: "Wjazd dla busów", desc: "Duży parking i możliwość rozładunku pod boksem" },
  { icon: CreditCard, title: "Bez zobowiązań", desc: "Najem miesięczny — wypowiedz kiedy chcesz" },
];

const benefitsEn = [
  { icon: Building2, title: "Flexible storage", desc: "Scale your space according to business needs" },
  { icon: Clock, title: "24/7/365 Access", desc: "Your storage available anytime — even on holidays" },
  { icon: FileText, title: "VAT Invoice", desc: "Full accounting documentation for your company" },
  { icon: ShieldCheck, title: "Insurance", desc: "Protection of stored property included" },
  { icon: Truck, title: "Van access", desc: "Large parking and unloading at your unit" },
  { icon: CreditCard, title: "No commitment", desc: "Monthly rental — cancel whenever you want" },
];

const useCasesPl = [
  "Towary i zapasy magazynowe e-commerce",
  "Dokumentacja firmowa i archiwa",
  "Sprzęt i narzędzia budowlane",
  "Materiały marketingowe i reklamowe",
  "Meble biurowe podczas przeprowadzki firmy",
  "Sezonowy towar i nadwyżki magazynowe",
];

const useCasesEn = [
  "E-commerce goods and inventory",
  "Company documentation and archives",
  "Construction equipment and tools",
  "Marketing and advertising materials",
  "Office furniture during company relocation",
  "Seasonal goods and excess inventory",
];

export default async function BusinessPage({
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
    name: isEn ? "Business Storage Solutions" : "Magazyn dla firm",
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
      ? "Flexible storage solutions for businesses in Szczecin"
      : "Elastyczne rozwiązania magazynowe dla firm w Szczecinie",
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
                {isEn ? "For Business / B2B" : "Dla firm / B2B"}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                {isEn
                  ? "Flexible storage for your business"
                  : "Elastyczny magazyn dla Twojej firmy"}
              </h1>
              <p className="text-lg text-muted-foreground mb-8 text-pretty">
                {isEn
                  ? "Need extra warehouse space? Our storage units are the perfect solution for businesses — scale up or down as needed, with 24/7 access and full documentation."
                  : "Potrzebujesz dodatkowej przestrzeni magazynowej? Nasze boksy to idealne rozwiązanie dla firm — skaluj w górę lub w dół według potrzeb, z dostępem 24/7 i pełną dokumentacją."}
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
              {isEn ? "Benefits for your business" : "Korzyści dla Twojej firmy"}
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
                {isEn ? "What businesses store with us" : "Co przechowują firmy"}
              </h2>
              <p className="text-center text-muted-foreground mb-12">
                {isEn
                  ? "Our business clients use storage for various needs"
                  : "Nasi klienci biznesowi korzystają z magazynu do różnych celów"}
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

        {/* Pricing hint */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-brand-50 border border-brand/20 rounded-2xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <Package className="w-16 h-16 text-brand" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-bold mb-2">
                    {isEn ? "Need a larger space?" : "Potrzebujesz większej przestrzeni?"}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {isEn
                      ? "For larger storage needs, contact us directly. We offer custom solutions for businesses with special requirements."
                      : "W przypadku większych potrzeb magazynowych skontaktuj się z nami. Oferujemy indywidualne rozwiązania dla firm o specjalnych wymaganiach."}
                  </p>
                  <Button asChild variant="outline">
                    <Link href={`/${locale}/kontakt`}>{dict.common.contactUs}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-brand">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {isEn ? "Start storing today" : "Zacznij magazynować już dziś"}
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
