import { Metadata } from "next";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { locales, type Locale } from "@/lib/i18n/config";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/JsonLd";
import Link from "next/link";
import { Clock, ArrowLeft, Building2, CheckCircle2 } from "lucide-react";

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
      ? "Self Storage for Business — Complete Guide | LOCKIT"
      : "Self storage dla firm — kompleksowy przewodnik | LOCKIT",
    description: isEn
      ? "How to use self storage in your business. Inventory storage, document archiving, flexible solutions for SMBs. Learn how companies benefit from storage units."
      : "Jak wykorzystać self storage w firmie. Magazynowanie towarów, archiwizacja dokumentów, elastyczne rozwiązania dla MŚP. Sprawdź korzyści dla firm.",
    alternates: {
      canonical: `https://lockit.pl/${locale === "pl" ? "" : "en/"}poradnik/self-storage-dla-firm`,
      languages: {
        pl: "https://lockit.pl/poradnik/self-storage-dla-firm",
        en: "https://lockit.pl/en/poradnik/self-storage-dla-firm",
      },
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const isEn = locale === "en";

  const benefitsPl = [
    "Elastyczność — skaluj przestrzeń w zależności od potrzeb",
    "Brak długoterminowych zobowiązań — najem miesięczny",
    "Dostęp 24/7 — idealne dla firm działających poza standardowymi godzinami",
    "Niższe koszty niż własny magazyn lub wynajem lokalu",
    "Faktura VAT — koszty magazynowania w kosztach firmy",
    "Ubezpieczenie w cenie — ochrona przechowywanego mienia",
  ];

  const benefitsEn = [
    "Flexibility — scale space according to your needs",
    "No long-term commitments — monthly rental",
    "24/7 access — ideal for businesses operating outside standard hours",
    "Lower costs than own warehouse or premises rental",
    "VAT invoice — storage costs as business expenses",
    "Insurance included — protection for stored property",
  ];

  const useCasesPl = [
    { title: "E-commerce i sklepy internetowe", desc: "Magazynowanie zapasów, kompletowanie zamówień, przechowywanie opakowań" },
    { title: "Firmy budowlane i remontowe", desc: "Bezpieczne miejsce na narzędzia, sprzęt i materiały między projektami" },
    { title: "Biura i firmy usługowe", desc: "Archiwizacja dokumentów, przechowywanie mebli i sprzętu biurowego" },
    { title: "Przedstawiciele handlowi", desc: "Magazyn na próbki, materiały reklamowe i towary demonstracyjne" },
  ];

  const useCasesEn = [
    { title: "E-commerce and online stores", desc: "Inventory storage, order fulfillment, packaging materials" },
    { title: "Construction and renovation companies", desc: "Safe place for tools, equipment and materials between projects" },
    { title: "Offices and service companies", desc: "Document archiving, furniture and office equipment storage" },
    { title: "Sales representatives", desc: "Storage for samples, marketing materials and demo products" },
  ];

  const benefits = isEn ? benefitsEn : benefitsPl;
  const useCases = isEn ? useCasesEn : useCasesPl;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: isEn
      ? "Self Storage for Business — Complete Guide"
      : "Self storage dla firm — kompleksowy przewodnik",
    author: { "@type": "Organization", name: "LOCKIT Self Storage" },
    publisher: { "@type": "Organization", name: "LOCKIT Self Storage" },
    datePublished: "2026-04-01",
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <Navbar dict={dict} locale={locale} />
      <main className="min-h-screen bg-background">
        <article className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Link
                href={`/${locale}/poradnik`}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                {isEn ? "Back to Guide" : "Wróć do poradnika"}
              </Link>

              <header className="mb-12">
                <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium mb-4">
                  {isEn ? "For Business" : "Dla firm"}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {isEn
                    ? "Self Storage for Business — Complete Guide"
                    : "Self storage dla firm — kompleksowy przewodnik"}
                </h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {isEn ? "7 min read" : "7 min czytania"}
                  </span>
                </div>
              </header>

              <div className="prose prose-slate max-w-none">
                <p className="lead text-lg text-muted-foreground">
                  {isEn
                    ? "Self storage isn't just for individuals — more and more businesses are discovering the benefits of flexible storage solutions. From e-commerce to construction, learn how your company can benefit."
                    : "Self storage to nie tylko rozwiązanie dla osób prywatnych — coraz więcej firm odkrywa korzyści elastycznych rozwiązań magazynowych. Od e-commerce po budownictwo, sprawdź jak Twoja firma może skorzystać."}
                </p>

                <h2 className="text-2xl font-bold mt-10 mb-4">
                  {isEn ? "Benefits for Businesses" : "Korzyści dla firm"}
                </h2>

                <div className="bg-green-50 border border-green-200 rounded-xl p-6 my-6">
                  <ul className="space-y-3">
                    {benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-green-800">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <h2 className="text-2xl font-bold mt-10 mb-4">
                  {isEn ? "Who Uses Business Storage?" : "Kto korzysta z magazynu firmowego?"}
                </h2>

                <div className="grid gap-4 my-6">
                  {useCases.map((useCase, i) => (
                    <div key={i} className="bg-card border rounded-xl p-5">
                      <div className="flex items-start gap-4">
                        <Building2 className="w-6 h-6 text-brand flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold mb-1">{useCase.title}</h3>
                          <p className="text-muted-foreground text-sm">{useCase.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <h2 className="text-2xl font-bold mt-10 mb-4">
                  {isEn ? "How to Get Started" : "Jak zacząć?"}
                </h2>

                <ol className="list-decimal list-inside space-y-3 my-6">
                  <li>
                    {isEn
                      ? "Assess your storage needs — what and how much you need to store"
                      : "Oceń swoje potrzeby magazynowe — co i ile musisz przechować"}
                  </li>
                  <li>
                    {isEn
                      ? "Choose the right size — from 3 m² to 12 m²"
                      : "Wybierz odpowiedni rozmiar — od 3 m² do 12 m²"}
                  </li>
                  <li>
                    {isEn
                      ? "Rent online in 5 minutes — with VAT invoice"
                      : "Wynajmij online w 5 minut — z fakturą VAT"}
                  </li>
                  <li>
                    {isEn
                      ? "Start using your unit 24/7"
                      : "Zacznij korzystać z boksu 24/7"}
                  </li>
                </ol>

                <div className="bg-slate-100 rounded-xl p-6 my-8">
                  <h3 className="font-bold mb-2">
                    {isEn ? "Need a custom solution?" : "Potrzebujesz rozwiązania na miarę?"}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {isEn
                      ? "Contact us to discuss your business storage needs. We offer flexible terms for long-term corporate clients."
                      : "Skontaktuj się z nami, aby omówić potrzeby magazynowe Twojej firmy. Oferujemy elastyczne warunki dla stałych klientów firmowych."}
                  </p>
                  <Button asChild>
                    <Link href={`/${locale}/kontakt`}>{dict.common.contactUs}</Link>
                  </Button>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t">
                <div className="bg-brand text-white rounded-xl p-8 text-center">
                  <h3 className="text-xl font-bold mb-2">
                    {isEn ? "Ready to optimize your storage?" : "Gotowy zoptymalizować magazynowanie?"}
                  </h3>
                  <p className="text-brand-100 mb-4">
                    {isEn
                      ? "See pricing for business storage solutions"
                      : "Zobacz cennik rozwiązań magazynowych dla firm"}
                  </p>
                  <Button asChild variant="secondary" className="bg-white text-brand hover:bg-slate-100">
                    <Link href={`/${locale}/dla-firm`}>{isEn ? "Business Solutions" : "Dla firm"}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer dict={dict} locale={locale} />
    </>
  );
}
