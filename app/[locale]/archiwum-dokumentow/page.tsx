import { Metadata } from "next";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { locales, type Locale } from "@/lib/i18n/config";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/JsonLd";
import Link from "next/link";
import { FileText, ShieldCheck, Clock, Thermometer, Lock, CreditCard, CheckCircle2 } from "lucide-react";

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

  const title = isEn ? "Document Archive Storage | LOCKIT Szczecin" : "Przechowywanie dokumentów i archiwum | LOCKIT Szczecin";
  const description = isEn
    ? "Secure document and archive storage in Szczecin. Dry, climate-controlled units with 24/7 access. Perfect for business records and personal archives."
    : "Bezpieczne przechowywanie dokumentów i archiwów w Szczecinie. Suche, klimatyzowane boksy z dostępem 24/7. Idealne dla akt firmowych i archiwów osobistych.";
  const url = `https://lockit.pl/${locale === "pl" ? "" : "en/"}archiwum-dokumentow`;

  return {
    title, description,
    alternates: { canonical: url, languages: { pl: "https://lockit.pl/archiwum-dokumentow", en: "https://lockit.pl/en/archiwum-dokumentow" } },
    openGraph: { title, description, url, siteName: 'LOCKIT Self Storage', locale: isEn ? 'en_US' : 'pl_PL', type: 'website', images: [{ url: 'https://lockit.pl/og-image.jpg', width: 1200, height: 630, alt: 'LOCKIT archiwum dokumentów' }] },
    twitter: { card: 'summary_large_image', title, description, images: ['https://lockit.pl/og-image.jpg'] },
  };
}

const benefitsPl = [
  { icon: FileText, title: "Archiwum dla firm i osób", desc: "Bezpieczne miejsce na dokumenty i akta" },
  { icon: Thermometer, title: "Suche warunki", desc: "Kontrolowana wilgotność chroni dokumenty" },
  { icon: Clock, title: "Dostęp 24/7", desc: "Sięgnij po potrzebne dokumenty o każdej porze" },
  { icon: ShieldCheck, title: "Monitoring i ochrona", desc: "Pełne zabezpieczenie Twoich akt" },
  { icon: Lock, title: "Prywatność", desc: "Tylko Ty masz dostęp do swojego boksu" },
  { icon: CreditCard, title: "Faktura VAT", desc: "Koszty archiwizacji w kosztach firmy" },
];

const benefitsEn = [
  { icon: FileText, title: "Archive for businesses", desc: "Safe place for documents and records" },
  { icon: Thermometer, title: "Dry conditions", desc: "Controlled humidity protects documents" },
  { icon: Clock, title: "24/7 Access", desc: "Retrieve documents whenever you need" },
  { icon: ShieldCheck, title: "Monitoring & security", desc: "Full protection for your records" },
  { icon: Lock, title: "Privacy", desc: "Only you have access to your unit" },
  { icon: CreditCard, title: "VAT Invoice", desc: "Archive costs as business expenses" },
];

const useCasesPl = [
  "Dokumentacja księgowa i podatkowa",
  "Akta pracownicze i umowy",
  "Dokumentacja medyczna i prawna",
  "Faktury i dokumenty finansowe",
  "Archiwa osobiste i rodzinne",
  "Dokumentacja projektowa i techniczna",
];

const useCasesEn = [
  "Accounting and tax documentation",
  "Employee records and contracts",
  "Medical and legal documentation",
  "Invoices and financial documents",
  "Personal and family archives",
  "Project and technical documentation",
];

export default async function ArchivePage({
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
    name: isEn ? "Document Archive Storage" : "Przechowywanie dokumentów i archiwum",
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
                {isEn ? "Document Archive" : "Archiwum dokumentów"}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                {isEn
                  ? "Secure storage for your documents and archives"
                  : "Bezpieczne przechowywanie dokumentów i archiwów"}
              </h1>
              <p className="text-lg text-muted-foreground mb-8 text-pretty">
                {isEn
                  ? "Need to store business records or personal archives? Our dry, secure units provide the perfect environment for document preservation with 24/7 access."
                  : "Potrzebujesz przechować akta firmowe lub archiwa osobiste? Nasze suche, bezpieczne boksy zapewniają idealne warunki dla dokumentów z dostępem 24/7."}
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
              {isEn ? "Why archive with LOCKIT?" : "Dlaczego archiwizować w LOCKIT?"}
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
                {isEn ? "What documents can you store?" : "Jakie dokumenty możesz przechować?"}
              </h2>
              <p className="text-center text-muted-foreground mb-12">
                {isEn
                  ? "Our clients archive various types of documentation"
                  : "Nasi klienci archiwizują różne rodzaje dokumentacji"}
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

        {/* Legal note */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto bg-amber-50 border border-amber-200 rounded-xl p-6 md:p-8">
              <h3 className="font-semibold text-amber-800 mb-2">
                {isEn ? "Document retention requirements" : "Obowiązki przechowywania dokumentów"}
              </h3>
              <p className="text-amber-700 text-sm">
                {isEn
                  ? "Polish law requires businesses to retain accounting documents for 5 years and employee records for 50 years. Our storage units help you meet these legal requirements safely and cost-effectively."
                  : "Polskie prawo wymaga przechowywania dokumentów księgowych przez 5 lat, a akt pracowniczych przez 50 lat. Nasze boksy pomagają spełnić te wymogi bezpiecznie i ekonomicznie."}
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-brand">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {isEn ? "Secure your archives today" : "Zabezpiecz swoje archiwa już dziś"}
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
