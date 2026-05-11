import { Metadata } from "next";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { locales, type Locale } from "@/lib/i18n/config";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";

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
      ? "Self Storage Guide | LOCKIT Blog"
      : "Poradnik self storage | Blog LOCKIT",
    description: isEn
      ? "Learn everything about self storage — how to choose the right size, packing tips, storage for businesses, and more. Expert advice from LOCKIT Szczecin."
      : "Dowiedz się wszystkiego o self storage — jak wybrać rozmiar boksu, porady pakowania, magazyn dla firm i więcej. Porady ekspertów z LOCKIT Szczecin.",
    alternates: {
      canonical: `https://lockit.pl/${locale === "pl" ? "" : "en/"}poradnik`,
      languages: {
        pl: "https://lockit.pl/poradnik",
        en: "https://lockit.pl/en/poradnik",
      },
    },
  };
}

const articlesPl = [
  {
    slug: "jak-wybrac-rozmiar-boksu",
    title: "Jak wybrać rozmiar boksu magazynowego?",
    excerpt: "Przewodnik po rozmiarach boksów — od 3 m² do 12 m². Dowiedz się, który rozmiar będzie odpowiedni dla Twoich potrzeb.",
    readTime: "5 min",
    category: "Poradnik",
  },
  {
    slug: "self-storage-dla-firm",
    title: "Self storage dla firm — kompleksowy przewodnik",
    excerpt: "Jak wykorzystać self storage w biznesie? Magazynowanie towarów, archiwizacja dokumentów i elastyczne rozwiązania dla firm.",
    readTime: "7 min",
    category: "Dla firm",
  },
  {
    slug: "przechowywanie-remont",
    title: "Przechowywanie rzeczy podczas remontu",
    excerpt: "Jak zabezpieczyć meble i rzeczy osobiste na czas remontu? Praktyczne porady od ekspertów LOCKIT.",
    readTime: "6 min",
    category: "Poradnik",
  },
  {
    slug: "archiwizacja-dokumentow",
    title: "Archiwizacja dokumentów firmowych — obowiązki i rozwiązania",
    excerpt: "Ile lat trzeba przechowywać dokumenty? Poznaj wymagania prawne i sprawdzone rozwiązania archiwizacyjne.",
    readTime: "8 min",
    category: "Dla firm",
  },
];

const articlesEn = [
  {
    slug: "jak-wybrac-rozmiar-boksu",
    title: "How to choose the right storage unit size?",
    excerpt: "A guide to storage unit sizes — from 3 m² to 12 m². Find out which size is right for your needs.",
    readTime: "5 min",
    category: "Guide",
  },
  {
    slug: "self-storage-dla-firm",
    title: "Self storage for businesses — complete guide",
    excerpt: "How to use self storage in business? Product storage, document archiving and flexible solutions for companies.",
    readTime: "7 min",
    category: "For Business",
  },
  {
    slug: "przechowywanie-remont",
    title: "Storing belongings during renovation",
    excerpt: "How to protect furniture and personal items during renovation? Practical tips from LOCKIT experts.",
    readTime: "6 min",
    category: "Guide",
  },
  {
    slug: "archiwizacja-dokumentow",
    title: "Business document archiving — requirements and solutions",
    excerpt: "How long do you need to keep documents? Learn legal requirements and proven archiving solutions.",
    readTime: "8 min",
    category: "For Business",
  },
];

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const isEn = locale === "en";

  const articles = isEn ? articlesEn : articlesPl;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: isEn ? "LOCKIT Self Storage Guide" : "Poradnik LOCKIT Self Storage",
    description: isEn
      ? "Expert advice on self storage"
      : "Porady ekspertów o self storage",
    publisher: {
      "@type": "Organization",
      name: "LOCKIT Self Storage",
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <Navbar dict={dict} locale={locale} />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="bg-gradient-to-b from-purple-50 to-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                {isEn ? "Self Storage Guide" : "Poradnik self storage"}
              </h1>
              <p className="text-lg text-muted-foreground">
                {isEn
                  ? "Expert advice and tips on storage, packing, and organization"
                  : "Porady ekspertów i wskazówki dotyczące przechowywania, pakowania i organizacji"}
              </p>
            </div>
          </div>
        </section>

        {/* Articles */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/${locale}/poradnik/${article.slug}`}
                  className="group bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all hover:border-purple-300"
                >
                  <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium mb-4">
                    {article.category}
                  </span>
                  <h2 className="text-xl font-semibold mb-3 group-hover:text-purple-700 transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-muted-foreground text-sm mb-4">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                    <span className="flex items-center gap-1 text-sm font-medium text-purple-700 group-hover:gap-2 transition-all">
                      {isEn ? "Read more" : "Czytaj więcej"}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer dict={dict} locale={locale} />
    </>
  );
}
