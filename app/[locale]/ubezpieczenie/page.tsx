import { Metadata } from "next";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { locales, type Locale } from "@/lib/i18n/config";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/JsonLd";
import Link from "next/link";
import { Shield, CheckCircle2, AlertTriangle, FileText } from "lucide-react";

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
      ? "Storage Insurance | LOCKIT Szczecin"
      : "Ubezpieczenie boksu | LOCKIT Szczecin",
    description: isEn
      ? "Protect your stored belongings with our comprehensive insurance. Coverage included in the rental price. Peace of mind for your valuables."
      : "Chroń przechowywane rzeczy z naszym ubezpieczeniem. Ochrona w cenie najmu. Spokój ducha dla Twoich cennych przedmiotów.",
    alternates: {
      canonical: `https://lockit.pl/${locale === "pl" ? "" : "en/"}ubezpieczenie`,
      languages: {
        pl: "https://lockit.pl/ubezpieczenie",
        en: "https://lockit.pl/en/ubezpieczenie",
      },
    },
  };
}

const coveragePl = [
  "Pożar i zadymienie",
  "Zalanie i powódź",
  "Kradzież z włamaniem",
  "Wandalizm",
  "Zniszczenie przez osoby trzecie",
  "Zdarzenia losowe",
];

const coverageEn = [
  "Fire and smoke damage",
  "Water damage and flooding",
  "Burglary and theft",
  "Vandalism",
  "Damage by third parties",
  "Acts of nature",
];

const excludedPl = [
  "Przedmioty niedozwolone (broń, substancje)",
  "Żywe organizmy",
  "Produkty łatwopalne i wybuchowe",
  "Gotówka i papiery wartościowe",
];

const excludedEn = [
  "Prohibited items (weapons, substances)",
  "Living organisms",
  "Flammable and explosive products",
  "Cash and securities",
];

export default async function InsurancePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const isEn = locale === "en";

  const coverage = isEn ? coverageEn : coveragePl;
  const excluded = isEn ? excludedEn : excludedPl;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: isEn ? "Storage Insurance" : "Ubezpieczenie boksu",
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
                  ? "Insurance for your stored belongings"
                  : "Ubezpieczenie przechowywanych rzeczy"}
              </h1>
              <p className="text-lg text-muted-foreground mb-8 text-pretty">
                {isEn
                  ? "Your peace of mind is our priority. All items stored at LOCKIT are covered by our comprehensive insurance — included in your rental price."
                  : "Twój spokój ducha jest dla nas priorytetem. Wszystkie rzeczy przechowywane w LOCKIT są objęte kompleksowym ubezpieczeniem — w cenie najmu."}
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

        {/* Coverage */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {/* What's covered */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Shield className="w-8 h-8 text-green-600" />
                    <h2 className="text-xl font-bold text-green-800">
                      {isEn ? "What's covered" : "Co jest objęte ochroną"}
                    </h2>
                  </div>
                  <ul className="space-y-3">
                    {coverage.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-green-800">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Exclusions */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <AlertTriangle className="w-8 h-8 text-amber-600" />
                    <h2 className="text-xl font-bold text-amber-800">
                      {isEn ? "Exclusions" : "Wyłączenia"}
                    </h2>
                  </div>
                  <ul className="space-y-3">
                    {excluded.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-amber-600 font-bold mt-0.5">×</span>
                        <span className="text-amber-800">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How claims work */}
        <section className="py-16 md:py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-8 justify-center">
                <FileText className="w-8 h-8 text-brand" />
                <h2 className="text-2xl md:text-3xl font-bold">
                  {isEn ? "How to file a claim" : "Jak zgłosić szkodę"}
                </h2>
              </div>
              <div className="space-y-6">
                {(isEn
                  ? [
                      "Document the damage with photos and a written description",
                      "Contact us within 48 hours of discovering the issue",
                      "Fill out our simple claim form",
                      "We process your claim and respond within 14 business days",
                    ]
                  : [
                      "Udokumentuj szkodę zdjęciami i pisemnym opisem",
                      "Skontaktuj się z nami w ciągu 48 godzin od odkrycia problemu",
                      "Wypełnij nasz prosty formularz zgłoszenia szkody",
                      "Rozpatrujemy zgłoszenie i odpowiadamy w ciągu 14 dni roboczych",
                    ]
                ).map((step, i) => (
                  <div key={i} className="flex items-start gap-4 bg-white p-4 rounded-lg border">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center font-bold text-sm">
                      {i + 1}
                    </div>
                    <p className="text-foreground pt-1">{step}</p>
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
              {isEn ? "Store with confidence" : "Przechowuj z pewnością"}
            </h2>
            <p className="text-brand-100 mb-8 max-w-xl mx-auto">
              {isEn
                ? "Insurance included in every rental. Rent your unit today."
                : "Ubezpieczenie w cenie każdego najmu. Wynajmij boks już dziś."}
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
