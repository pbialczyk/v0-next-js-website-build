import { Metadata } from "next";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { locales, type Locale } from "@/lib/i18n/config";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/JsonLd";
import Link from "next/link";
import { ShoppingCart, ShieldCheck, Clock, Package, Truck, CreditCard, CheckCircle2 } from "lucide-react";

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
      ? "E-commerce Storage | LOCKIT Szczecin"
      : "Magazyn dla sklepów internetowych | LOCKIT Szczecin",
    description: isEn
      ? "Warehouse space for e-commerce businesses in Szczecin. Store your inventory with 24/7 access. Scale up during peak seasons. From 125 PLN/month."
      : "Przestrzeń magazynowa dla e-commerce w Szczecinie. Przechowuj zapasy z dostępem 24/7. Skaluj w sezonach szczytowych. Od 125 zł/mies.",
    alternates: {
      canonical: `https://lockit.pl/${locale === "pl" ? "" : "en/"}dla-sklepow-internetowych`,
      languages: {
        pl: "https://lockit.pl/dla-sklepow-internetowych",
        en: "https://lockit.pl/en/dla-sklepow-internetowych",
      },
    },
  };
}

const benefitsPl = [
  { icon: ShoppingCart, title: "Magazyn dla e-commerce", desc: "Idealne miejsce na zapasy Twojego sklepu internetowego" },
  { icon: Clock, title: "Dostęp 24/7", desc: "Kompletuj zamówienia o każdej porze — nawet w nocy" },
  { icon: Package, title: "Elastyczna powierzchnia", desc: "Zwiększ metraż w szczycie sezonu, zmniejsz po" },
  { icon: ShieldCheck, title: "Bezpieczeństwo towaru", desc: "Monitoring, ochrona i ubezpieczenie w cenie" },
  { icon: Truck, title: "Łatwy załadunek", desc: "Wjazd dla kurierów i busów pod same boksy" },
  { icon: CreditCard, title: "Faktura VAT", desc: "Pełna dokumentacja księgowa dla Twojej firmy" },
];

const benefitsEn = [
  { icon: ShoppingCart, title: "E-commerce warehouse", desc: "Perfect place for your online store inventory" },
  { icon: Clock, title: "24/7 Access", desc: "Fulfill orders anytime — even at night" },
  { icon: Package, title: "Flexible space", desc: "Scale up in peak season, scale down after" },
  { icon: ShieldCheck, title: "Product security", desc: "Monitoring, security and insurance included" },
  { icon: Truck, title: "Easy loading", desc: "Access for couriers and vans to your unit" },
  { icon: CreditCard, title: "VAT Invoice", desc: "Full accounting documentation for your business" },
];

const useCasesPl = [
  "Zapasy towarów z Allegro, Amazon, własnego sklepu",
  "Materiały opakowaniowe i kartony",
  "Produkty sezonowe i promocyjne",
  "Zwroty do przetworzenia",
  "Nadwyżki magazynowe",
  "Próbki i materiały marketingowe",
];

const useCasesEn = [
  "Inventory from Allegro, Amazon, your own store",
  "Packaging materials and boxes",
  "Seasonal and promotional products",
  "Returns to process",
  "Excess inventory",
  "Samples and marketing materials",
];

export default async function EcommercePage({
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
    name: isEn ? "E-commerce Storage" : "Magazyn dla sklepów internetowych",
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
                {isEn ? "For E-commerce" : "Dla sklepów internetowych"}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                {isEn
                  ? "Warehouse space for your online store"
                  : "Magazyn dla Twojego sklepu internetowego"}
              </h1>
              <p className="text-lg text-muted-foreground mb-8 text-pretty">
                {isEn
                  ? "Growing your e-commerce business? Our storage units give you flexible warehouse space with 24/7 access — perfect for storing inventory, fulfilling orders, and scaling with demand."
                  : "Rozwijasz swój sklep internetowy? Nasze boksy magazynowe dają Ci elastyczną przestrzeń z dostępem 24/7 — idealne do przechowywania zapasów, kompletowania zamówień i skalowania z popytem."}
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
              {isEn ? "Why e-commerce stores choose us" : "Dlaczego sklepy internetowe nas wybierają"}
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
                {isEn ? "What e-commerce stores keep here" : "Co przechowują sklepy internetowe"}
              </h2>
              <p className="text-center text-muted-foreground mb-12">
                {isEn
                  ? "Our e-commerce clients store a variety of products and materials"
                  : "Nasi klienci e-commerce przechowują różne produkty i materiały"}
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
              {isEn ? "Scale your e-commerce with us" : "Skaluj swój e-commerce z nami"}
            </h2>
            <p className="text-brand-100 mb-8 max-w-xl mx-auto">
              {isEn
                ? "Start storing today. Rent online in 5 minutes."
                : "Zacznij magazynować już dziś. Wynajmij online w 5 minut."}
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
