import { Metadata } from "next";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { locales, type Locale } from "@/lib/i18n/config";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/JsonLd";
import Link from "next/link";
import { Package, Box, Layers, Tag, CheckCircle2 } from "lucide-react";

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
      ? "Packing & Organization Supplies | LOCKIT Szczecin"
      : "Pakowanie i organizacja | LOCKIT Szczecin",
    description: isEn
      ? "Professional packing supplies and organization tips for your storage unit. Boxes, tape, labels and more available at our Szczecin facility."
      : "Profesjonalne materiały do pakowania i porady organizacyjne. Kartony, taśmy, etykiety i więcej dostępne w naszym magazynie w Szczecinie.",
    alternates: {
      canonical: `https://lockit.pl/${locale === "pl" ? "" : "en/"}pakowanie-organizacja`,
      languages: {
        pl: "https://lockit.pl/pakowanie-organizacja",
        en: "https://lockit.pl/en/pakowanie-organizacja",
      },
    },
  };
}

const suppliesPl = [
  { icon: Box, name: "Kartony różnych rozmiarów", desc: "Od małych na książki po duże na ubrania" },
  { icon: Layers, name: "Folia bąbelkowa", desc: "Do ochrony delikatnych przedmiotów" },
  { icon: Package, name: "Taśma pakowa", desc: "Mocna taśma do zabezpieczenia kartonów" },
  { icon: Tag, name: "Etykiety i markery", desc: "Do oznaczenia zawartości kartonów" },
];

const suppliesEn = [
  { icon: Box, name: "Boxes of various sizes", desc: "From small for books to large for clothes" },
  { icon: Layers, name: "Bubble wrap", desc: "To protect delicate items" },
  { icon: Package, name: "Packing tape", desc: "Strong tape to secure boxes" },
  { icon: Tag, name: "Labels and markers", desc: "To label box contents" },
];

const tipsPl = [
  "Pakuj ciężkie przedmioty na dno kartonu, lekkie na górę",
  "Opisuj kartony z kilku stron — łatwiej znajdziesz zawartość",
  "Używaj folii bąbelkowej do szkła i ceramiki",
  "Nie przepełniaj kartonów — powinny się zamykać bez siły",
  "Twórz przejście w boksie — nie blokuj dostępu do rzeczy z tyłu",
  "Składaj meble, jeśli to możliwe — zaoszczędzisz miejsce",
];

const tipsEn = [
  "Pack heavy items at the bottom of boxes, light ones on top",
  "Label boxes on multiple sides — easier to find contents",
  "Use bubble wrap for glass and ceramics",
  "Don't overfill boxes — they should close without force",
  "Create an aisle in your unit — don't block access to items in the back",
  "Disassemble furniture if possible — you'll save space",
];

export default async function PackingPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const isEn = locale === "en";

  const supplies = isEn ? suppliesEn : suppliesPl;
  const tips = isEn ? tipsEn : tipsPl;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: isEn ? "Packing & Organization Supplies" : "Pakowanie i organizacja",
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
                  ? "Packing supplies & organization tips"
                  : "Materiały do pakowania i organizacja"}
              </h1>
              <p className="text-lg text-muted-foreground mb-8 text-pretty">
                {isEn
                  ? "Get everything you need to pack and organize your belongings. We offer professional packing supplies and expert tips to maximize your storage space."
                  : "Znajdziesz u nas wszystko, czego potrzebujesz do spakowania i zorganizowania rzeczy. Oferujemy profesjonalne materiały do pakowania i porady, jak maksymalnie wykorzystać przestrzeń."}
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

        {/* Supplies */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              {isEn ? "Available supplies" : "Dostępne materiały"}
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {supplies.map((supply, i) => (
                <div
                  key={i}
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <supply.icon className="w-10 h-10 text-amber-600 mb-4" />
                  <h3 className="font-semibold text-lg mb-2">{supply.name}</h3>
                  <p className="text-muted-foreground text-sm">{supply.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-muted-foreground mt-8">
              {isEn
                ? "Available for purchase at our facility or ask about delivery with your rental."
                : "Dostępne do kupienia w naszym obiekcie lub zapytaj o dostawę wraz z najmem."}
            </p>
          </div>
        </section>

        {/* Tips */}
        <section className="py-16 md:py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
                {isEn ? "Expert packing tips" : "Porady ekspertów"}
              </h2>
              <p className="text-center text-muted-foreground mb-12">
                {isEn
                  ? "Make the most of your storage space with these professional tips"
                  : "Wykorzystaj maksymalnie swoją przestrzeń magazynową dzięki tym profesjonalnym poradom"}
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {tips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-lg border">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{tip}</span>
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
              {isEn ? "Ready to get organized?" : "Gotowy się zorganizować?"}
            </h2>
            <p className="text-brand-100 mb-8 max-w-xl mx-auto">
              {isEn
                ? "Rent your storage unit and pick up supplies in one visit."
                : "Wynajmij boks i odbierz materiały podczas jednej wizyty."}
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
