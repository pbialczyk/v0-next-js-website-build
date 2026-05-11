import { Metadata } from "next";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { locales, type Locale } from "@/lib/i18n/config";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/JsonLd";
import Link from "next/link";
import { GraduationCap, ShieldCheck, Clock, Wallet, MapPin, Calendar, CheckCircle2 } from "lucide-react";

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
      ? "Student Storage | LOCKIT Szczecin"
      : "Magazyn dla studentów | LOCKIT Szczecin",
    description: isEn
      ? "Affordable storage for students in Szczecin. Store your belongings during summer break or semester abroad. From 125 PLN/month, 24/7 access."
      : "Tani magazyn dla studentów w Szczecinie. Przechowaj rzeczy na wakacje lub semestr za granicą. Od 125 zł/mies., dostęp 24/7.",
    alternates: {
      canonical: `https://lockit.pl/${locale === "pl" ? "" : "en/"}dla-studentow`,
      languages: {
        pl: "https://lockit.pl/dla-studentow",
        en: "https://lockit.pl/en/dla-studentow",
      },
    },
  };
}

const benefitsPl = [
  { icon: Wallet, title: "Przystępne ceny", desc: "Boksy już od 125 zł/mies. — idealny budżet studencki" },
  { icon: Calendar, title: "Najem na dowolny okres", desc: "Na wakacje, semestr czy cały rok akademicki" },
  { icon: Clock, title: "Dostęp 24/7", desc: "Przyjdź po rzeczy kiedy chcesz — dzień i noc" },
  { icon: ShieldCheck, title: "Bezpieczeństwo", desc: "Monitoring i ubezpieczenie Twoich rzeczy" },
  { icon: MapPin, title: "Blisko centrum", desc: "10 minut od kampusu — ul. Gdańska 14C" },
  { icon: GraduationCap, title: "Bez zobowiązań", desc: "Wypowiedz kiedy chcesz — zero stresu" },
];

const benefitsEn = [
  { icon: Wallet, title: "Affordable prices", desc: "Units from 125 PLN/month — perfect student budget" },
  { icon: Calendar, title: "Flexible rental", desc: "For summer, semester or whole academic year" },
  { icon: Clock, title: "24/7 Access", desc: "Pick up your stuff whenever — day or night" },
  { icon: ShieldCheck, title: "Security", desc: "Monitoring and insurance for your belongings" },
  { icon: MapPin, title: "Near center", desc: "10 minutes from campus — ul. Gdańska 14C" },
  { icon: GraduationCap, title: "No commitment", desc: "Cancel anytime — zero stress" },
];

const useCasesPl = [
  "Rzeczy z pokoju na wakacje letnie",
  "Meble i kartony na semestr za granicą",
  "Rower, deskorolka, sprzęt sportowy",
  "Książki i materiały z poprzednich lat",
  "Ubrania sezonowe i dodatkowe rzeczy",
  "Sprzęt muzyczny i hobby",
];

const useCasesEn = [
  "Room contents for summer break",
  "Furniture and boxes for semester abroad",
  "Bike, skateboard, sports equipment",
  "Books and materials from previous years",
  "Seasonal clothes and extra stuff",
  "Music and hobby equipment",
];

export default async function StudentPage({
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
    name: isEn ? "Student Storage" : "Magazyn dla studentów",
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
                {isEn ? "For Students" : "Dla studentów"}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                {isEn
                  ? "Affordable storage for students"
                  : "Tani magazyn dla studentów w Szczecinie"}
              </h1>
              <p className="text-lg text-muted-foreground mb-8 text-pretty">
                {isEn
                  ? "Going home for summer or studying abroad? Store your stuff safely instead of dragging it across the country. From just 125 PLN/month."
                  : "Jedziesz na wakacje do domu albo na semestr za granicę? Schowaj rzeczy bezpiecznie zamiast wozić je przez całą Polskę. Już od 125 zł/mies."}
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
              {isEn ? "Why students choose LOCKIT" : "Dlaczego studenci wybierają LOCKIT"}
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
                {isEn ? "What students store with us" : "Co przechowują studenci"}
              </h2>
              <p className="text-center text-muted-foreground mb-12">
                {isEn
                  ? "Our student clients store various items"
                  : "Nasi studenci przechowują różne rzeczy"}
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

        {/* Tip */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto bg-brand-50 border border-brand/20 rounded-xl p-6 md:p-8 text-center">
              <GraduationCap className="w-12 h-12 text-brand mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">
                {isEn ? "Pro tip for students" : "Wskazówka dla studentów"}
              </h3>
              <p className="text-muted-foreground">
                {isEn
                  ? "Rent your unit before the end of the semester when demand is highest. Our smallest 3 m² unit fits contents of a typical student room!"
                  : "Wynajmij boks przed końcem semestru, gdy popyt jest największy. Nasz najmniejszy boks 3 m² zmieści zawartość typowego pokoju studenckiego!"}
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-brand">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {isEn ? "Store your stuff, enjoy your break" : "Schowaj rzeczy i ciesz się wakacjami"}
            </h2>
            <p className="text-brand-100 mb-8 max-w-xl mx-auto">
              {isEn
                ? "Rent online in 5 minutes. No long contracts."
                : "Wynajmij online w 5 minut. Bez długich umów."}
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
