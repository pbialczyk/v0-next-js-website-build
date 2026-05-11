import { Metadata } from "next";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { locales, type Locale } from "@/lib/i18n/config";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/JsonLd";
import Link from "next/link";
import { Clock, ArrowLeft, Home, CheckCircle2, AlertTriangle } from "lucide-react";

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
      ? "Storage During Renovation — Tips & Guide | LOCKIT"
      : "Przechowywanie rzeczy podczas remontu — porady | LOCKIT",
    description: isEn
      ? "How to protect your furniture and belongings during home renovation. Practical tips for packing, moving and storing items safely."
      : "Jak zabezpieczyć meble i rzeczy podczas remontu mieszkania. Praktyczne porady pakowania, przenoszenia i bezpiecznego przechowywania.",
    alternates: {
      canonical: `https://lockit.pl/${locale === "pl" ? "" : "en/"}poradnik/przechowywanie-remont`,
      languages: {
        pl: "https://lockit.pl/poradnik/przechowywanie-remont",
        en: "https://lockit.pl/en/poradnik/przechowywanie-remont",
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

  const tipsPl = [
    "Zacznij pakowanie od rzeczy, których rzadko używasz",
    "Opisuj kartony z kilku stron — łatwiej znajdziesz rzeczy",
    "Owijaj delikatne przedmioty folią bąbelkową",
    "Rozkładaj meble na części, jeśli to możliwe",
    "Zachowaj śrubki i łączniki w opisanych woreczkach",
    "Zrób zdjęcia podłączenia elektroniki przed odłączeniem",
  ];

  const tipsEn = [
    "Start packing items you rarely use first",
    "Label boxes on multiple sides — easier to find things",
    "Wrap delicate items in bubble wrap",
    "Disassemble furniture when possible",
    "Keep screws and connectors in labeled bags",
    "Take photos of electronics connections before unplugging",
  ];

  const warningsPl = [
    "Nie zostawiaj rzeczy w remontowanym mieszkaniu — kurz i wilgoć je zniszczą",
    "Nie przeładowuj kartonów — powinny się zamykać bez siły",
    "Nie pakuj jedzenia ani roślin do magazynu",
  ];

  const warningsEn = [
    "Don't leave items in the renovated apartment — dust and moisture will damage them",
    "Don't overload boxes — they should close without force",
    "Don't store food or plants in storage",
  ];

  const tips = isEn ? tipsEn : tipsPl;
  const warnings = isEn ? warningsEn : warningsPl;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: isEn
      ? "Storage During Renovation — Tips & Guide"
      : "Przechowywanie rzeczy podczas remontu",
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
                  {isEn ? "Guide" : "Poradnik"}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {isEn
                    ? "Storing Belongings During Renovation"
                    : "Przechowywanie rzeczy podczas remontu"}
                </h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {isEn ? "6 min read" : "6 min czytania"}
                  </span>
                </div>
              </header>

              <div className="prose prose-slate max-w-none">
                <p className="lead text-lg text-muted-foreground">
                  {isEn
                    ? "Home renovation is exciting but stressful — especially when it comes to protecting your furniture and belongings. This guide will help you plan storage during renovation so everything stays safe."
                    : "Remont mieszkania to ekscytujące, ale też stresujące doświadczenie — szczególnie jeśli chodzi o ochronę mebli i rzeczy osobistych. Ten przewodnik pomoże Ci zaplanować przechowywanie podczas remontu."}
                </p>

                <h2 className="text-2xl font-bold mt-10 mb-4">
                  {isEn ? "Why Use External Storage?" : "Dlaczego zewnętrzny magazyn?"}
                </h2>

                <div className="bg-brand-50 border border-brand/20 rounded-xl p-6 my-6">
                  <div className="flex items-start gap-4">
                    <Home className="w-8 h-8 text-brand flex-shrink-0" />
                    <div>
                      <p className="text-foreground">
                        {isEn
                          ? "During renovation, your home becomes a construction site — dust, debris, and paint get everywhere. Even covered furniture can get damaged. A storage unit keeps your belongings completely safe and gives contractors space to work efficiently."
                          : "Podczas remontu Twoje mieszkanie staje się placem budowy — kurz, gruz i farba dostają się wszędzie. Nawet zakryte meble mogą ulec zniszczeniu. Boks magazynowy chroni rzeczy całkowicie i daje ekipie remontowej miejsce do efektywnej pracy."}
                      </p>
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl font-bold mt-10 mb-4">
                  {isEn ? "Packing Tips" : "Porady pakowania"}
                </h2>

                <div className="bg-green-50 border border-green-200 rounded-xl p-6 my-6">
                  <ul className="space-y-3">
                    {tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-green-800">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <h2 className="text-2xl font-bold mt-10 mb-4">
                  {isEn ? "Common Mistakes to Avoid" : "Częste błędy do unikania"}
                </h2>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 my-6">
                  <ul className="space-y-3">
                    {warnings.map((warning, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                        <span className="text-amber-800">{warning}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <h2 className="text-2xl font-bold mt-10 mb-4">
                  {isEn ? "Choosing the Right Size" : "Wybór odpowiedniego rozmiaru"}
                </h2>

                <ul className="list-disc list-inside space-y-2 my-6">
                  <li>
                    <strong>{isEn ? "Box S (3 m²)" : "Boks S (3 m²)"}</strong> —{" "}
                    {isEn
                      ? "for a small room or bathroom renovation"
                      : "na remont małego pokoju lub łazienki"}
                  </li>
                  <li>
                    <strong>{isEn ? "Box M (6 m²)" : "Boks M (6 m²)"}</strong> —{" "}
                    {isEn
                      ? "for a full apartment up to 50 m²"
                      : "na całe mieszkanie do 50 m²"}
                  </li>
                  <li>
                    <strong>{isEn ? "Box L (12 m²)" : "Boks L (12 m²)"}</strong> —{" "}
                    {isEn
                      ? "for a house or larger apartment"
                      : "na dom lub większe mieszkanie"}
                  </li>
                </ul>

                <div className="bg-slate-100 rounded-xl p-6 my-8">
                  <h3 className="font-bold mb-2">
                    {isEn ? "Need help choosing?" : "Potrzebujesz pomocy w wyborze?"}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {isEn
                      ? "Contact us — we'll help you choose the right size based on your renovation scope."
                      : "Skontaktuj się z nami — pomożemy wybrać odpowiedni rozmiar na podstawie zakresu remontu."}
                  </p>
                  <Button asChild>
                    <Link href={`/${locale}/kontakt`}>{dict.common.contactUs}</Link>
                  </Button>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t">
                <div className="bg-brand text-white rounded-xl p-8 text-center">
                  <h3 className="text-xl font-bold mb-2">
                    {isEn ? "Start your renovation stress-free" : "Zacznij remont bez stresu"}
                  </h3>
                  <p className="text-brand-100 mb-4">
                    {isEn
                      ? "Rent a storage unit and protect your belongings"
                      : "Wynajmij boks i zabezpiecz swoje rzeczy"}
                  </p>
                  <Button asChild variant="secondary" className="bg-white text-brand hover:bg-slate-100">
                    <Link href={`/${locale}/remont-przeprowadzka`}>{isEn ? "Learn more" : "Dowiedz się więcej"}</Link>
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
