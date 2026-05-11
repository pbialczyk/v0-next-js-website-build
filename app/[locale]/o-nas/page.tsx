import { Metadata } from "next";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { locales, type Locale } from "@/lib/i18n/config";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/JsonLd";
import Link from "next/link";
import { Building2, Users, Shield, Award } from "lucide-react";

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
    title: isEn ? "About Us | LOCKIT Self Storage Szczecin" : "O nas | LOCKIT Self Storage Szczecin",
    description: isEn
      ? "Learn about LOCKIT Self Storage — Szczecin's modern storage facility. Our mission, values, and commitment to providing safe, accessible storage solutions."
      : "Poznaj LOCKIT Self Storage — nowoczesny magazyn w Szczecinie. Nasza misja, wartości i zaangażowanie w dostarczanie bezpiecznych rozwiązań magazynowych.",
    alternates: {
      canonical: `https://lockit.pl/${locale === "pl" ? "" : "en/"}o-nas`,
      languages: { pl: "https://lockit.pl/o-nas", en: "https://lockit.pl/en/o-nas" },
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const isEn = locale === "en";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    mainEntity: {
      "@type": "LocalBusiness",
      name: "LOCKIT Self Storage",
      description: isEn
        ? "Modern self-storage facility in Szczecin"
        : "Nowoczesny magazyn samoobsługowy w Szczecinie",
    },
  };

  const valuesPl = [
    { icon: Shield, title: "Bezpieczeństwo", desc: "Twoje rzeczy są naszym priorytetem. Monitoring 24/7, ubezpieczenie i kontrola dostępu." },
    { icon: Users, title: "Obsługa klienta", desc: "Zawsze dostępni, zawsze pomocni. Odpowiadamy na pytania i pomagamy wybrać odpowiednie rozwiązanie." },
    { icon: Building2, title: "Nowoczesność", desc: "Inwestujemy w technologię — wynajem online, aplikacja mobilna, inteligentne systemy dostępu." },
    { icon: Award, title: "Jakość", desc: "Utrzymujemy najwyższe standardy czystości i bezpieczeństwa w naszych obiektach." },
  ];

  const valuesEn = [
    { icon: Shield, title: "Security", desc: "Your belongings are our priority. 24/7 monitoring, insurance and access control." },
    { icon: Users, title: "Customer service", desc: "Always available, always helpful. We answer questions and help choose the right solution." },
    { icon: Building2, title: "Innovation", desc: "We invest in technology — online rental, mobile app, smart access systems." },
    { icon: Award, title: "Quality", desc: "We maintain the highest standards of cleanliness and security in our facilities." },
  ];

  const values = isEn ? valuesEn : valuesPl;

  return (
    <>
      <JsonLd data={jsonLd} />
      <Navbar dict={dict} locale={locale} />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="bg-gradient-to-b from-slate-100 to-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                {isEn ? "About LOCKIT" : "O LOCKIT"}
              </h1>
              <p className="text-lg text-muted-foreground">
                {isEn
                  ? "Szczecin's modern self-storage facility, built with your needs in mind"
                  : "Nowoczesny magazyn samoobsługowy w Szczecinie, zbudowany z myślą o Twoich potrzebach"}
              </p>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                {isEn ? "Our Story" : "Nasza historia"}
              </h2>
              <div className="prose prose-slate max-w-none">
                <p className="text-muted-foreground">
                  {isEn
                    ? "LOCKIT Self Storage was founded with a simple mission: to provide Szczecin residents and businesses with safe, accessible, and affordable storage solutions. We saw a need for modern, customer-friendly storage in the region — and we built it."
                    : "LOCKIT Self Storage powstało z prostą misją: zapewnić mieszkańcom i firmom ze Szczecina bezpieczne, dostępne i przystępne cenowo rozwiązania magazynowe. Dostrzegliśmy potrzebę nowoczesnego, przyjaznego klientowi magazynu w regionie — i go zbudowaliśmy."}
                </p>
                <p className="text-muted-foreground">
                  {isEn
                    ? "Located at ul. Gdańska 14C, our facility offers 24/7 access, state-of-the-art security, and a range of unit sizes to fit any need. Whether you're a student storing belongings over summer, a family during renovation, or a business needing extra warehouse space — we're here for you."
                    : "Nasz obiekt przy ul. Gdańskiej 14C oferuje dostęp 24/7, najnowocześniejsze zabezpieczenia i różne rozmiary boksów dopasowane do każdej potrzeby. Niezależnie od tego, czy jesteś studentem przechowującym rzeczy na lato, rodziną podczas remontu, czy firmą potrzebującą dodatkowej przestrzeni — jesteśmy tu dla Ciebie."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 md:py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              {isEn ? "Our Values" : "Nasze wartości"}
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {values.map((value, i) => (
                <div key={i} className="bg-white border border-border rounded-xl p-6">
                  <value.icon className="w-10 h-10 text-brand mb-4" />
                  <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {isEn ? "Ready to store with us?" : "Gotowy przechować u nas?"}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              {isEn
                ? "See our pricing and rent your unit online in 5 minutes"
                : "Zobacz cennik i wynajmij boks online w 5 minut"}
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
        </section>
      </main>
      <Footer dict={dict} locale={locale} />
    </>
  );
}
