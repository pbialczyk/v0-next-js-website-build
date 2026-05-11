import { Metadata } from "next";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { locales, type Locale } from "@/lib/i18n/config";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/JsonLd";
import Link from "next/link";
import { Clock, ArrowLeft, FileText, Scale, Shield } from "lucide-react";

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
      ? "Business Document Archiving — Requirements & Solutions | LOCKIT"
      : "Archiwizacja dokumentów firmowych — obowiązki i rozwiązania | LOCKIT",
    description: isEn
      ? "How long do you need to keep business documents? Legal requirements for document retention in Poland and storage solutions for your archives."
      : "Ile lat trzeba przechowywać dokumenty firmowe? Wymagania prawne w Polsce i rozwiązania magazynowe dla Twoich archiwów.",
    alternates: {
      canonical: `https://lockit.pl/${locale === "pl" ? "" : "en/"}poradnik/archiwizacja-dokumentow`,
      languages: {
        pl: "https://lockit.pl/poradnik/archiwizacja-dokumentow",
        en: "https://lockit.pl/en/poradnik/archiwizacja-dokumentow",
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

  const retentionPl = [
    { type: "Dokumenty księgowe", period: "5 lat", note: "od końca roku obrotowego" },
    { type: "Deklaracje podatkowe", period: "5 lat", note: "od końca roku podatkowego" },
    { type: "Faktury VAT", period: "5 lat", note: "od końca roku wystawienia" },
    { type: "Akta pracownicze", period: "10-50 lat", note: "w zależności od daty zatrudnienia" },
    { type: "Umowy cywilnoprawne", period: "10 lat", note: "od zakończenia umowy" },
    { type: "Dokumentacja ZUS", period: "10-50 lat", note: "w zależności od rodzaju" },
  ];

  const retentionEn = [
    { type: "Accounting documents", period: "5 years", note: "from end of fiscal year" },
    { type: "Tax declarations", period: "5 years", note: "from end of tax year" },
    { type: "VAT invoices", period: "5 years", note: "from end of issue year" },
    { type: "Employee records", period: "10-50 years", note: "depending on employment date" },
    { type: "Civil contracts", period: "10 years", note: "from contract termination" },
    { type: "Social insurance docs", period: "10-50 years", note: "depending on type" },
  ];

  const retention = isEn ? retentionEn : retentionPl;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: isEn
      ? "Business Document Archiving — Requirements & Solutions"
      : "Archiwizacja dokumentów firmowych — obowiązki i rozwiązania",
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
                    ? "Business Document Archiving"
                    : "Archiwizacja dokumentów firmowych"}
                </h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {isEn ? "8 min read" : "8 min czytania"}
                  </span>
                </div>
              </header>

              <div className="prose prose-slate max-w-none">
                <p className="lead text-lg text-muted-foreground">
                  {isEn
                    ? "Polish law requires businesses to keep various documents for specific periods. Improper storage can lead to fines and complications during audits. Learn the requirements and find the right solution."
                    : "Polskie prawo wymaga od firm przechowywania różnych dokumentów przez określony czas. Niewłaściwe przechowywanie może prowadzić do kar i komplikacji podczas kontroli. Poznaj wymagania i znajdź odpowiednie rozwiązanie."}
                </p>

                <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-3">
                  <Scale className="w-6 h-6 text-brand" />
                  {isEn ? "Legal Requirements" : "Wymagania prawne"}
                </h2>

                <div className="overflow-x-auto my-6">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="border border-slate-200 px-4 py-2 text-left font-semibold">
                          {isEn ? "Document Type" : "Rodzaj dokumentu"}
                        </th>
                        <th className="border border-slate-200 px-4 py-2 text-left font-semibold">
                          {isEn ? "Retention Period" : "Okres przechowywania"}
                        </th>
                        <th className="border border-slate-200 px-4 py-2 text-left font-semibold">
                          {isEn ? "Note" : "Uwaga"}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {retention.map((item, i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                          <td className="border border-slate-200 px-4 py-2">{item.type}</td>
                          <td className="border border-slate-200 px-4 py-2 font-medium">{item.period}</td>
                          <td className="border border-slate-200 px-4 py-2 text-muted-foreground text-sm">{item.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 my-6">
                  <h3 className="font-bold text-amber-800 mb-2">
                    {isEn ? "Important" : "Ważne"}
                  </h3>
                  <p className="text-amber-700 text-sm">
                    {isEn
                      ? "From 2019, employee records for newly hired employees need to be kept for only 10 years. However, records for employees hired before 2019 still require 50-year retention."
                      : "Od 2019 roku akta pracownicze dla nowo zatrudnionych pracowników trzeba przechowywać tylko 10 lat. Jednak akta pracowników zatrudnionych przed 2019 rokiem nadal wymagają przechowywania przez 50 lat."}
                  </p>
                </div>

                <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-3">
                  <Shield className="w-6 h-6 text-brand" />
                  {isEn ? "Storage Requirements" : "Wymagania przechowywania"}
                </h2>

                <p>
                  {isEn
                    ? "Documents must be stored in conditions that protect them from damage, moisture, fire, and unauthorized access. Our storage units meet all these requirements:"
                    : "Dokumenty muszą być przechowywane w warunkach chroniących przed uszkodzeniem, wilgocią, pożarem i nieautoryzowanym dostępem. Nasze boksy spełniają wszystkie te wymagania:"}
                </p>

                <ul className="list-disc list-inside space-y-2 my-6">
                  <li>{isEn ? "Dry, climate-controlled environment" : "Suche, klimatyzowane pomieszczenia"}</li>
                  <li>{isEn ? "24/7 monitoring and security" : "Całodobowy monitoring i ochrona"}</li>
                  <li>{isEn ? "Fire protection systems" : "Systemy przeciwpożarowe"}</li>
                  <li>{isEn ? "Individual access control" : "Indywidualna kontrola dostępu"}</li>
                  <li>{isEn ? "Insurance included" : "Ubezpieczenie w cenie"}</li>
                </ul>

                <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-3">
                  <FileText className="w-6 h-6 text-brand" />
                  {isEn ? "Cost Comparison" : "Porównanie kosztów"}
                </h2>

                <p>
                  {isEn
                    ? "Storing documents in-house means dedicating office space that could be used productively. Compare the costs:"
                    : "Przechowywanie dokumentów w biurze oznacza zajęcie przestrzeni, która mogłaby być wykorzystana produktywnie. Porównaj koszty:"}
                </p>

                <div className="grid md:grid-cols-2 gap-4 my-6">
                  <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                    <h4 className="font-semibold text-red-800 mb-2">
                      {isEn ? "Office Space" : "Przestrzeń biurowa"}
                    </h4>
                    <p className="text-red-700 text-sm">
                      {isEn
                        ? "50-100 PLN/m²/month for office space used for archive storage"
                        : "50-100 zł/m²/mies. za przestrzeń biurową na archiwum"}
                    </p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                    <h4 className="font-semibold text-green-800 mb-2">
                      {isEn ? "LOCKIT Storage" : "Magazyn LOCKIT"}
                    </h4>
                    <p className="text-green-700 text-sm">
                      {isEn
                        ? "From 42 PLN/m²/month — secure, insured, with 24/7 access"
                        : "Od 42 zł/m²/mies. — bezpieczny, ubezpieczony, z dostępem 24/7"}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-100 rounded-xl p-6 my-8">
                  <h3 className="font-bold mb-2">
                    {isEn ? "Need archiving solution?" : "Potrzebujesz rozwiązania archiwizacyjnego?"}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {isEn
                      ? "Contact us — we'll help you calculate space needs and find the most cost-effective solution."
                      : "Skontaktuj się z nami — pomożemy obliczyć potrzebną przestrzeń i znaleźć najbardziej opłacalne rozwiązanie."}
                  </p>
                  <Button asChild>
                    <Link href={`/${locale}/kontakt`}>{dict.common.contactUs}</Link>
                  </Button>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t">
                <div className="bg-brand text-white rounded-xl p-8 text-center">
                  <h3 className="text-xl font-bold mb-2">
                    {isEn ? "Secure your business archives" : "Zabezpiecz archiwum firmowe"}
                  </h3>
                  <p className="text-brand-100 mb-4">
                    {isEn
                      ? "Learn more about our document storage solutions"
                      : "Dowiedz się więcej o naszych rozwiązaniach archiwizacyjnych"}
                  </p>
                  <Button asChild variant="secondary" className="bg-white text-brand hover:bg-slate-100">
                    <Link href={`/${locale}/archiwum-dokumentow`}>{isEn ? "Document Archive" : "Archiwum dokumentów"}</Link>
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
