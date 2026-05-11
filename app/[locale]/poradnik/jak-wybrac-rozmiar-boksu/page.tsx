import { Metadata } from "next";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { locales, type Locale } from "@/lib/i18n/config";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/JsonLd";
import Link from "next/link";
import { Clock, ArrowLeft, Package } from "lucide-react";

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
      ? "How to Choose Storage Unit Size | LOCKIT Guide"
      : "Jak wybrać rozmiar boksu magazynowego | Poradnik LOCKIT",
    description: isEn
      ? "Complete guide to choosing the right storage unit size. Learn what fits in 3m², 6m², and 12m² units. Make the right choice for your needs."
      : "Kompletny przewodnik po wyborze rozmiaru boksu. Dowiedz się, co zmieści się w boksie 3m², 6m² i 12m². Wybierz odpowiedni rozmiar.",
    alternates: {
      canonical: `https://lockit.pl/${locale === "pl" ? "" : "en/"}poradnik/jak-wybrac-rozmiar-boksu`,
      languages: {
        pl: "https://lockit.pl/poradnik/jak-wybrac-rozmiar-boksu",
        en: "https://lockit.pl/en/poradnik/jak-wybrac-rozmiar-boksu",
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: isEn
      ? "How to Choose the Right Storage Unit Size"
      : "Jak wybrać rozmiar boksu magazynowego",
    author: {
      "@type": "Organization",
      name: "LOCKIT Self Storage",
    },
    publisher: {
      "@type": "Organization",
      name: "LOCKIT Self Storage",
    },
    datePublished: "2026-04-01",
    dateModified: "2026-04-01",
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <Navbar dict={dict} locale={locale} />
      <main className="min-h-screen bg-background">
        <article className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              {/* Breadcrumb */}
              <Link
                href={`/${locale}/poradnik`}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                {isEn ? "Back to Guide" : "Wróć do poradnika"}
              </Link>

              {/* Header */}
              <header className="mb-12">
                <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium mb-4">
                  {isEn ? "Guide" : "Poradnik"}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {isEn
                    ? "How to Choose the Right Storage Unit Size"
                    : "Jak wybrać rozmiar boksu magazynowego?"}
                </h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {isEn ? "5 min read" : "5 min czytania"}
                  </span>
                </div>
              </header>

              {/* Content */}
              <div className="prose prose-slate max-w-none">
                <p className="lead text-lg text-muted-foreground">
                  {isEn
                    ? "Choosing the right storage unit size is crucial — you don't want to pay for space you don't need, but you also don't want to run out of room. This guide will help you pick the perfect size."
                    : "Wybór odpowiedniego rozmiaru boksu jest kluczowy — nie chcesz płacić za przestrzeń, której nie potrzebujesz, ale nie chcesz też mieć za mało miejsca. Ten przewodnik pomoże Ci wybrać idealny rozmiar."}
                </p>

                <h2 className="text-2xl font-bold mt-10 mb-4">
                  {isEn ? "Our Storage Unit Sizes" : "Nasze rozmiary boksów"}
                </h2>

                <div className="grid gap-6 my-8">
                  {/* Box S */}
                  <div className="bg-brand-50 border border-brand/20 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <Package className="w-8 h-8 text-brand flex-shrink-0" />
                      <div>
                        <h3 className="font-bold text-lg mb-2">
                          {isEn ? "Box S — 3 m² (6 m³)" : "Boks S — 3 m² (6 m³)"}
                        </h3>
                        <p className="text-muted-foreground mb-3">
                          {isEn
                            ? "Perfect for a student room or small apartment contents. Fits about 15-20 moving boxes, a small sofa, and a few chairs."
                            : "Idealny na zawartość pokoju studenckiego lub kawalerki. Zmieści się około 15-20 kartonów przeprowadzkowych, mała sofa i kilka krzeseł."}
                        </p>
                        <p className="text-sm font-medium">
                          {isEn ? "Best for:" : "Najlepszy dla:"}{" "}
                          <span className="text-muted-foreground font-normal">
                            {isEn
                              ? "Students, decluttering, seasonal items"
                              : "Studentów, odgracania, rzeczy sezonowych"}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Box M */}
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <Package className="w-8 h-8 text-green-600 flex-shrink-0" />
                      <div>
                        <h3 className="font-bold text-lg mb-2">
                          {isEn ? "Box M — 6 m² (12 m³)" : "Boks M — 6 m² (12 m³)"}
                        </h3>
                        <p className="text-muted-foreground mb-3">
                          {isEn
                            ? "Our most popular size! Fits contents of a 50 m² apartment — living room furniture, bed, wardrobe, and about 30-40 boxes."
                            : "Nasz najpopularniejszy rozmiar! Zmieści zawartość mieszkania 50 m² — meble z salonu, łóżko, szafę i około 30-40 kartonów."}
                        </p>
                        <p className="text-sm font-medium">
                          {isEn ? "Best for:" : "Najlepszy dla:"}{" "}
                          <span className="text-muted-foreground font-normal">
                            {isEn
                              ? "Apartment renovation, relocation, small business storage"
                              : "Remontu mieszkania, przeprowadzki, małego magazynu firmowego"}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Box L */}
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <Package className="w-8 h-8 text-amber-600 flex-shrink-0" />
                      <div>
                        <h3 className="font-bold text-lg mb-2">
                          {isEn ? "Box L — 12 m² (24 m³)" : "Boks L — 12 m² (24 m³)"}
                        </h3>
                        <p className="text-muted-foreground mb-3">
                          {isEn
                            ? "Our largest unit — fits contents of a house up to 100 m². Great for business inventory, construction equipment, or large furniture sets."
                            : "Nasz największy boks — zmieści zawartość domu do 100 m². Świetny na zapasy firmowe, sprzęt budowlany lub duże zestawy mebli."}
                        </p>
                        <p className="text-sm font-medium">
                          {isEn ? "Best for:" : "Najlepszy dla:"}{" "}
                          <span className="text-muted-foreground font-normal">
                            {isEn
                              ? "House contents, business storage, construction companies"
                              : "Zawartości domu, magazynu firmowego, firm budowlanych"}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl font-bold mt-10 mb-4">
                  {isEn ? "Tips for Choosing the Right Size" : "Wskazówki przy wyborze rozmiaru"}
                </h2>

                <ol className="list-decimal list-inside space-y-4 my-6">
                  <li>
                    <strong>{isEn ? "Make an inventory" : "Zrób spis rzeczy"}</strong> —{" "}
                    {isEn
                      ? "List everything you want to store before deciding"
                      : "Wypisz wszystko, co chcesz przechować, zanim zdecydujesz"}
                  </li>
                  <li>
                    <strong>{isEn ? "Consider stacking" : "Pomyśl o piętrowanie"}</strong> —{" "}
                    {isEn
                      ? "Our units have 2m height — use it to maximize space"
                      : "Nasze boksy mają 2m wysokości — wykorzystaj to"}
                  </li>
                  <li>
                    <strong>{isEn ? "Plan for access" : "Zaplanuj dostęp"}</strong> —{" "}
                    {isEn
                      ? "Leave an aisle if you need to retrieve items regularly"
                      : "Zostaw przejście, jeśli musisz regularnie sięgać po rzeczy"}
                  </li>
                  <li>
                    <strong>{isEn ? "When in doubt, go bigger" : "W razie wątpliwości — większy"}</strong> —{" "}
                    {isEn
                      ? "It's easier to downsize later than to move everything to a larger unit"
                      : "Łatwiej później zmniejszyć niż przenosić wszystko do większego"}
                  </li>
                </ol>

                <div className="bg-slate-100 rounded-xl p-6 my-8">
                  <h3 className="font-bold mb-2">
                    {isEn ? "Still unsure?" : "Nadal nie wiesz?"}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {isEn
                      ? "Contact us — we'll help you choose the perfect size based on what you need to store. You can always change your unit size later!"
                      : "Skontaktuj się z nami — pomożemy wybrać idealny rozmiar na podstawie tego, co chcesz przechować. Zawsze możesz później zmienić rozmiar boksu!"}
                  </p>
                  <Button asChild>
                    <Link href={`/${locale}/kontakt`}>{dict.common.contactUs}</Link>
                  </Button>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-12 pt-8 border-t">
                <div className="bg-brand text-white rounded-xl p-8 text-center">
                  <h3 className="text-xl font-bold mb-2">
                    {isEn ? "Ready to rent your unit?" : "Gotowy wynająć boks?"}
                  </h3>
                  <p className="text-brand-100 mb-4">
                    {isEn
                      ? "See our pricing and rent online in 5 minutes"
                      : "Zobacz cennik i wynajmij online w 5 minut"}
                  </p>
                  <Button asChild variant="secondary" className="bg-white text-brand hover:bg-slate-100">
                    <Link href={`/${locale}/boksy/szczecin`}>{dict.common.seePricing}</Link>
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
