import { Metadata } from "next";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { locales, type Locale } from "@/lib/i18n/config";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/JsonLd";
import Link from "next/link";
import { 
  Building2, ShieldCheck, Clock, FileText, Truck, CreditCard, 
  CheckCircle2, Package, ArrowRight, Users, Briefcase, Archive,
  Monitor, Armchair, Box, Layers, MapPin
} from "lucide-react";

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

  const title = isEn 
    ? "Business Storage in Szczecin — Self Storage B2B | LOCKIT" 
    : "Magazyn dla firm w Szczecinie — self storage B2B | LOCKIT";
  const description = isEn
    ? "Flexible storage for businesses in Szczecin. Store inventory, documents, equipment. 24/7 access, VAT invoice, no long-term contracts. From 125 PLN/month."
    : "Elastyczny magazyn dla firm w Szczecinie. Przechowuj towary, dokumenty, sprzęt. Dostęp 24/7, faktura VAT, bez długoterminowych umów. Od 125 zł/mies.";
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

// Benefits data
const benefitsPl = [
  { icon: Building2, title: "Elastyczny magazyn", desc: "Skaluj powierzchnię w zależności od potrzeb firmy — od 3 m² do 12 m²" },
  { icon: Clock, title: "Dostęp 24/7/365", desc: "Twój magazyn dostępny o każdej porze — nawet w święta i weekendy" },
  { icon: FileText, title: "Faktura VAT", desc: "Pełna dokumentacja księgowa dla Twojej firmy — faktura co miesiąc" },
  { icon: ShieldCheck, title: "Ubezpieczenie w cenie", desc: "Ochrona przechowywanego mienia do 10 000 zł w cenie najmu" },
  { icon: Truck, title: "Wjazd dla busów", desc: "Duży parking i możliwość rozładunku bezpośrednio pod boksem" },
  { icon: CreditCard, title: "Bez zobowiązań", desc: "Najem miesięczny — wypowiedz z 7-dniowym okresem wypowiedzenia" },
];

const benefitsEn = [
  { icon: Building2, title: "Flexible storage", desc: "Scale your space according to business needs — from 3 m² to 12 m²" },
  { icon: Clock, title: "24/7/365 Access", desc: "Your storage available anytime — even on holidays and weekends" },
  { icon: FileText, title: "VAT Invoice", desc: "Full accounting documentation for your company — monthly invoice" },
  { icon: ShieldCheck, title: "Insurance included", desc: "Protection of stored property up to 10,000 PLN included in rent" },
  { icon: Truck, title: "Van access", desc: "Large parking and unloading directly at your unit" },
  { icon: CreditCard, title: "No commitment", desc: "Monthly rental — cancel with 7-day notice" },
];

// Case studies data
const caseStudiesPl = [
  {
    company: "Sklep internetowy z elektroniką",
    industry: "E-commerce",
    challenge: "Brak miejsca w mieszkaniu na rosnące zapasy towaru przed sezonem świątecznym",
    solution: "Wynajem Boksu L (12 m²) na 4 miesiące w okresie Q4",
    result: "Obsłużyli 3x więcej zamówień bez stresu o miejsce na towar",
    boxSize: "Boks L",
  },
  {
    company: "Kancelaria prawna",
    industry: "Usługi profesjonalne",
    challenge: "Obowiązek przechowywania dokumentacji przez 10 lat, brak miejsca w biurze",
    solution: "Wynajem Boksu S (3 m²) jako zewnętrzne archiwum",
    result: "Uwolnili 15 m² przestrzeni biurowej, oszczędzając na kosztach najmu",
    boxSize: "Boks S",
  },
  {
    company: "Firma eventowa",
    industry: "Event marketing",
    challenge: "Sezonowe zapotrzebowanie na magazyn na sprzęt eventowy i materiały reklamowe",
    solution: "Wynajem Boksu M (6 m²) z dostępem 24/7 przed i po eventach",
    result: "Elastyczny dostęp do sprzętu o każdej porze, bez długoterminowej umowy",
    boxSize: "Boks M",
  },
];

const caseStudiesEn = [
  {
    company: "Electronics e-commerce store",
    industry: "E-commerce",
    challenge: "No space at home for growing inventory before Christmas season",
    solution: "Rented Box L (12 m²) for 4 months during Q4",
    result: "Handled 3x more orders without worrying about storage space",
    boxSize: "Box L",
  },
  {
    company: "Law firm",
    industry: "Professional services",
    challenge: "Legal requirement to store documents for 10 years, no office space",
    solution: "Rented Box S (3 m²) as external archive",
    result: "Freed up 15 m² of office space, saving on rent costs",
    boxSize: "Box S",
  },
  {
    company: "Event company",
    industry: "Event marketing",
    challenge: "Seasonal need for storage of event equipment and advertising materials",
    solution: "Rented Box M (6 m²) with 24/7 access before and after events",
    result: "Flexible access to equipment anytime, without long-term contract",
    boxSize: "Box M",
  },
];

// What you can store
const storageItemsPl = [
  { icon: Package, text: "Towary i zapasy e-commerce" },
  { icon: Archive, text: "Dokumentacja i archiwa firmowe" },
  { icon: Truck, text: "Sprzęt i narzędzia budowlane" },
  { icon: Briefcase, text: "Materiały marketingowe i reklamowe" },
  { icon: Monitor, text: "Sprzęt IT i elektronika" },
  { icon: Armchair, text: "Meble biurowe podczas przeprowadzki" },
  { icon: Box, text: "Próbki produktów i wzorniki" },
  { icon: Layers, text: "Sezonowy towar i nadwyżki magazynowe" },
];

const storageItemsEn = [
  { icon: Package, text: "E-commerce goods and inventory" },
  { icon: Archive, text: "Company documentation and archives" },
  { icon: Truck, text: "Construction equipment and tools" },
  { icon: Briefcase, text: "Marketing and advertising materials" },
  { icon: Monitor, text: "IT equipment and electronics" },
  { icon: Armchair, text: "Office furniture during relocation" },
  { icon: Box, text: "Product samples and displays" },
  { icon: Layers, text: "Seasonal goods and excess inventory" },
];

// How it works steps
const stepsPl = [
  { num: 1, title: "Wybierz boks", desc: "Sprawdź dostępne rozmiary i ceny online. Polecamy Boks M lub L dla firm." },
  { num: 2, title: "Wynajmij online", desc: "Wypełnij formularz w 5 minut. Dane do faktury VAT podasz przy rejestracji." },
  { num: 3, title: "Otrzymaj kod dostępu", desc: "Na e-mail otrzymasz indywidualny kod PIN do bramy i boksu." },
  { num: 4, title: "Przyjedź kiedy chcesz", desc: "Dostęp 24/7/365. Duży parking i możliwość wjazdu busem pod boks." },
];

const stepsEn = [
  { num: 1, title: "Choose a unit", desc: "Check available sizes and prices online. We recommend Box M or L for businesses." },
  { num: 2, title: "Rent online", desc: "Fill out the form in 5 minutes. Provide VAT invoice details during registration." },
  { num: 3, title: "Get access code", desc: "You'll receive a personal PIN code for the gate and unit via email." },
  { num: 4, title: "Come whenever you want", desc: "Access 24/7/365. Large parking and van access directly to your unit." },
];

// Recommended boxes for business
const recommendedBoxes = [
  {
    id: "boks-s",
    name: "Boks S",
    nameEn: "Box S",
    size: "3 m²",
    price: 125,
    recommendation: { pl: "Archiwum dokumentów, małe zapasy", en: "Document archive, small inventory" },
    color: "bg-sky-500",
    typeId: "32769a88-77d9-ef11-88f8-000d3a1d3d62",
  },
  {
    id: "boks-m",
    name: "Boks M",
    nameEn: "Box M",
    size: "6 m²",
    price: 175,
    recommendation: { pl: "Najpopularniejszy wybór dla MŚP", en: "Most popular choice for SMBs" },
    color: "bg-primary",
    typeId: "531f0bd3-77d9-ef11-88f8-000d3a1d3d62",
    featured: true,
  },
  {
    id: "boks-l",
    name: "Boks L",
    nameEn: "Box L",
    size: "12 m²",
    price: 250,
    recommendation: { pl: "E-commerce, duże zapasy, sprzęt", en: "E-commerce, large inventory, equipment" },
    color: "bg-slate-700",
    typeId: "93bd21f7-77d9-ef11-88f8-000d3a1d3d62",
  },
];

// FAQ data
const faqPl = [
  { q: "Czy wystawiacie faktury VAT?", a: "Tak, wystawiamy faktury VAT dla wszystkich klientów firmowych. Faktura jest generowana automatycznie co miesiąc i wysyłana na podany adres e-mail." },
  { q: "Jaki jest minimalny okres najmu?", a: "Minimalny okres najmu to 1 miesiąc. Możesz przedłużyć lub zakończyć najem w dowolnym momencie z 7-dniowym wypowiedzeniem." },
  { q: "Czy moi pracownicy mogą mieć dostęp do boksu?", a: "Tak, możesz udostępnić kod dostępu swoim pracownikom. Każdy boks ma indywidualny kod PIN. Na życzenie możemy wygenerować dodatkowe kody." },
  { q: "Czy moje towary są ubezpieczone?", a: "Tak, w cenie najmu zawarte jest ubezpieczenie do 10 000 zł. Dla wyższych wartości oferujemy rozszerzone ubezpieczenie." },
  { q: "Czy mogę przechowywać towary niebezpieczne?", a: "Nie, zgodnie z regulaminem nie można przechowywać materiałów łatwopalnych, wybuchowych, toksycznych ani żywności. Pełna lista w regulaminie." },
  { q: "Jak wygląda rozliczenie?", a: "Płatność odbywa się z góry za każdy miesiąc. Akceptujemy przelewy bankowe, karty płatnicze i płatności automatyczne." },
  { q: "Czy mogę zmienić rozmiar boksu w trakcie najmu?", a: "Tak, jeśli potrzebujesz większego lub mniejszego boksu, skontaktuj się z nami. Przeniesiemy Cię do innego boksu bez dodatkowych opłat (w miarę dostępności)." },
];

const faqEn = [
  { q: "Do you issue VAT invoices?", a: "Yes, we issue VAT invoices for all business clients. The invoice is automatically generated monthly and sent to the provided email address." },
  { q: "What is the minimum rental period?", a: "The minimum rental period is 1 month. You can extend or end your rental at any time with 7 days' notice." },
  { q: "Can my employees have access to the unit?", a: "Yes, you can share the access code with your employees. Each unit has an individual PIN code. On request, we can generate additional codes." },
  { q: "Is my inventory insured?", a: "Yes, insurance up to 10,000 PLN is included in the rental price. For higher values, we offer extended insurance." },
  { q: "Can I store hazardous materials?", a: "No, according to our terms, you cannot store flammable, explosive, toxic materials, or food. Full list in the terms of service." },
  { q: "How does billing work?", a: "Payment is made upfront for each month. We accept bank transfers, credit cards, and automatic payments." },
  { q: "Can I change the unit size during rental?", a: "Yes, if you need a larger or smaller unit, contact us. We'll move you to another unit at no additional cost (subject to availability)." },
];

export default async function BusinessPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const isEn = locale === "en";
  const basePath = locale === "pl" ? "" : "/en";

  const benefits = isEn ? benefitsEn : benefitsPl;
  const caseStudies = isEn ? caseStudiesEn : caseStudiesPl;
  const storageItems = isEn ? storageItemsEn : storageItemsPl;
  const steps = isEn ? stepsEn : stepsPl;
  const faq = isEn ? faqEn : faqPl;

  // JSON-LD Schemas
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: isEn ? "Business Storage Solutions" : "Magazyn dla firm",
    serviceType: "Self Storage",
    provider: {
      "@type": "LocalBusiness",
      name: "LOCKIT Self Storage",
      telephone: "+48 666 030 717",
      email: "info@lockit.pl",
      address: {
        "@type": "PostalAddress",
        streetAddress: "ul. Gdańska 14C",
        addressLocality: "Szczecin",
        postalCode: "70-661",
        addressCountry: "PL",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 53.4366128,
        longitude: 14.5541361,
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
    },
    areaServed: {
      "@type": "City",
      name: "Szczecin",
    },
    description: isEn
      ? "Flexible storage solutions for businesses in Szczecin. Store inventory, documents, equipment. 24/7 access, VAT invoice."
      : "Elastyczne rozwiązania magazynowe dla firm w Szczecinie. Przechowuj towary, dokumenty, sprzęt. Dostęp 24/7, faktura VAT.",
    offers: {
      "@type": "Offer",
      priceSpecification: {
        "@type": "PriceSpecification",
        price: "125",
        priceCurrency: "PLN",
        unitText: isEn ? "month" : "miesiąc",
      },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isEn ? "Home" : "Strona główna", item: `https://lockit.pl${basePath}/` },
      { "@type": "ListItem", position: 2, name: isEn ? "For whom" : "Dla kogo", item: `https://lockit.pl${basePath}/` },
      { "@type": "ListItem", position: 3, name: isEn ? "For Business" : "Dla firm" },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />
      <Navbar dict={dict} locale={locale} />
      <main className="min-h-screen bg-background">
        
        {/* Hero */}
        <section className="bg-gradient-to-b from-brand-50 to-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="secondary" className="mb-6 bg-brand/10 text-brand border-0">
                {isEn ? "For Business / B2B" : "Dla firm / B2B"}
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                {isEn
                  ? "Business Storage in Szczecin — Self Storage B2B"
                  : "Magazyn dla firm w Szczecinie — self storage B2B"}
              </h1>
              <p className="text-lg text-muted-foreground mb-8 text-pretty">
                {isEn
                  ? "Flexible warehouse space for your business. Scale up or down as needed, with 24/7 access, VAT invoice, and no long-term contracts. From 125 PLN/month."
                  : "Elastyczna przestrzeń magazynowa dla Twojej firmy. Skaluj według potrzeb, z dostępem 24/7, fakturą VAT i bez długoterminowych umów. Od 125 zł/mies."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-brand hover:bg-brand-dark text-white">
                  <a href="https://wynajmij.lockit.pl" target="_blank" rel="noopener noreferrer">
                    {isEn ? "Rent a unit" : "Wynajmij boks"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href={`${basePath}/kontakt`}>
                    {isEn ? "Request a quote" : "Zapytaj o ofertę"}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
              {isEn ? "Benefits for your business" : "Korzyści dla Twojej firmy"}
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              {isEn 
                ? "Everything your business needs from a storage solution — flexibility, security, and professional service."
                : "Wszystko, czego Twoja firma potrzebuje od magazynu — elastyczność, bezpieczeństwo i profesjonalna obsługa."}
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {benefits.map((benefit, i) => (
                <div
                  key={i}
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-brand/30 transition-all"
                >
                  <div className="w-12 h-12 bg-brand/10 rounded-lg flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-brand" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Badge variant="outline" className="text-xs">
                  {isEn ? "Example" : "Przykład"}
                </Badge>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
                {isEn ? "How businesses use LOCKIT" : "Jak firmy korzystają z LOCKIT"}
              </h2>
              <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                {isEn 
                  ? "See how other businesses solved their storage challenges with our flexible solutions."
                  : "Zobacz, jak inne firmy rozwiązały swoje wyzwania magazynowe dzięki naszym elastycznym rozwiązaniom."}
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                {caseStudies.map((study, i) => (
                  <Card key={i} className="overflow-hidden">
                    <CardContent className="p-6">
                      <Badge variant="secondary" className="mb-4 text-xs">
                        {study.industry}
                      </Badge>
                      <h3 className="font-semibold text-lg mb-3">{study.company}</h3>
                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="font-medium text-muted-foreground">{isEn ? "Challenge:" : "Wyzwanie:"}</span>
                          <p className="text-foreground">{study.challenge}</p>
                        </div>
                        <div>
                          <span className="font-medium text-muted-foreground">{isEn ? "Solution:" : "Rozwiązanie:"}</span>
                          <p className="text-foreground">{study.solution}</p>
                        </div>
                        <div>
                          <span className="font-medium text-muted-foreground">{isEn ? "Result:" : "Efekt:"}</span>
                          <p className="text-brand font-medium">{study.result}</p>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t">
                        <span className="text-xs text-muted-foreground">{isEn ? "Used:" : "Użyty:"}</span>
                        <span className="ml-1 font-semibold">{study.boxSize}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What you can store */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
                {isEn ? "What you can store" : "Co możesz przechowywać"}
              </h2>
              <p className="text-center text-muted-foreground mb-12">
                {isEn
                  ? "Our business clients use storage for various needs"
                  : "Nasi klienci biznesowi korzystają z magazynu do różnych celów"}
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {storageItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-card border rounded-lg p-4 hover:border-brand/30 transition-colors">
                    <div className="w-10 h-10 bg-brand/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-brand" />
                    </div>
                    <span className="text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 md:py-20 bg-brand-deep text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
                {isEn ? "How it works" : "Jak to działa"}
              </h2>
              <p className="text-center text-white/70 mb-12">
                {isEn
                  ? "From online booking to storing your inventory — in 4 simple steps."
                  : "Od rezerwacji online do przechowywania towaru — w 4 prostych krokach."}
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {steps.map((step) => (
                  <div key={step.num} className="relative">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4 text-2xl font-bold text-brand-accent">
                      {step.num}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                    <p className="text-white/70 text-sm">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Recommended boxes */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
                {isEn ? "Recommended for business" : "Polecane dla firm"}
              </h2>
              <p className="text-center text-muted-foreground mb-12">
                {isEn
                  ? "Choose the unit size that best fits your business needs."
                  : "Wybierz rozmiar boksu najlepiej dopasowany do potrzeb Twojej firmy."}
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                {recommendedBoxes.map((box) => (
                  <Card key={box.id} className={`relative overflow-hidden ${box.featured ? 'ring-2 ring-brand' : ''}`}>
                    {box.featured && (
                      <div className="absolute top-0 right-0 bg-brand text-white text-xs px-3 py-1 rounded-bl-lg font-medium">
                        {isEn ? "Most popular" : "Najpopularniejszy"}
                      </div>
                    )}
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 ${box.color} rounded-lg flex items-center justify-center mb-4`}>
                        <Box className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-bold text-xl mb-1">{isEn ? box.nameEn : box.name}</h3>
                      <p className="text-muted-foreground mb-4">{box.size}</p>
                      <p className="text-sm text-muted-foreground mb-4">
                        {isEn ? box.recommendation.en : box.recommendation.pl}
                      </p>
                      <div className="flex items-baseline gap-1 mb-4">
                        <span className="text-2xl font-bold">{box.price} zł</span>
                        <span className="text-muted-foreground text-sm">/{isEn ? "month" : "mies."}</span>
                      </div>
                      <Button asChild className="w-full" variant={box.featured ? "default" : "outline"}>
                        <a href={`https://wynajmij.lockit.pl/rent?step=1&typeId=${box.typeId}`} target="_blank" rel="noopener noreferrer">
                          {isEn ? "Rent now" : "Wynajmij"}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center mt-8">
                <Button asChild variant="ghost">
                  <Link href={`${basePath}/boksy/szczecin`}>
                    {isEn ? "Compare all sizes" : "Porównaj wszystkie rozmiary"} →
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
                {isEn ? "FAQ for business clients" : "FAQ dla klientów firmowych"}
              </h2>
              <p className="text-center text-muted-foreground mb-12">
                {isEn
                  ? "Answers to the most common questions from our business clients."
                  : "Odpowiedzi na najczęstsze pytania naszych klientów firmowych."}
              </p>
              <div className="space-y-4">
                {faq.map((item, i) => (
                  <Card key={i}>
                    <CardContent className="p-5">
                      <h3 className="font-semibold mb-2">{item.q}</h3>
                      <p className="text-muted-foreground text-sm">{item.a}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-20 bg-gradient-to-r from-brand-deep to-brand">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {isEn ? "Rent a unit for your business" : "Wynajmij boks dla firmy"}
              </h2>
              <p className="text-white/80 mb-8">
                {isEn
                  ? "Online rental in 5 minutes. VAT invoice included. 24/7 access. No long-term commitment."
                  : "Wynajem online w 5 minut. Faktura VAT w cenie. Dostęp 24/7. Bez długoterminowych zobowiązań."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary" className="bg-white text-brand hover:bg-white/90">
                  <a href="https://wynajmij.lockit.pl" target="_blank" rel="noopener noreferrer">
                    {isEn ? "Rent a unit" : "Wynajmij boks"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
                  <a href="tel:+48666030717">
                    {isEn ? "Call: +48 666 030 717" : "Zadzwoń: +48 666 030 717"}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Location hint */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
                <MapPin className="w-5 h-5" />
                <span>{isEn ? "Our location" : "Nasza lokalizacja"}</span>
              </div>
              <p className="text-foreground font-medium">ul. Gdańska 14C, 70-661 Szczecin</p>
              <Button asChild variant="link" className="mt-2">
                <Link href={`${basePath}/kontakt`}>
                  {isEn ? "See on map" : "Zobacz na mapie"} →
                </Link>
              </Button>
            </div>
          </div>
        </section>

      </main>
      <Footer dict={dict} locale={locale} />
    </>
  );
}
