import { Metadata } from "next";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { locales, type Locale } from "@/lib/i18n/config";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/JsonLd";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

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
    title: isEn ? "Contact | LOCKIT Self Storage Szczecin" : "Kontakt | LOCKIT Self Storage Szczecin",
    description: isEn
      ? "Contact LOCKIT Self Storage in Szczecin. Visit us at ul. Gdańska 14C, call +48 123 456 789, or email kontakt@lockit.pl"
      : "Skontaktuj się z LOCKIT Self Storage w Szczecinie. Odwiedź nas przy ul. Gdańskiej 14C, zadzwoń +48 123 456 789 lub napisz kontakt@lockit.pl",
    alternates: {
      canonical: `https://lockit.pl/${locale === "pl" ? "" : "en/"}kontakt`,
      languages: { pl: "https://lockit.pl/kontakt", en: "https://lockit.pl/en/kontakt" },
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const isEn = locale === "en";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    mainEntity: {
      "@type": "LocalBusiness",
      name: "LOCKIT Self Storage",
      telephone: "+48 123 456 789",
      email: "kontakt@lockit.pl",
      address: {
        "@type": "PostalAddress",
        streetAddress: "ul. Gdańska 14C",
        addressLocality: "Szczecin",
        postalCode: "70-661",
        addressCountry: "PL",
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
    },
  };

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
                {isEn ? "Contact Us" : "Skontaktuj się z nami"}
              </h1>
              <p className="text-lg text-muted-foreground">
                {isEn
                  ? "Have questions? We're here to help."
                  : "Masz pytania? Chętnie pomożemy."}
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Contact Details */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">
                  {isEn ? "Get in Touch" : "Dane kontaktowe"}
                </h2>

                <div className="flex items-start gap-4">
                  <div className="bg-brand/10 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-brand" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{isEn ? "Address" : "Adres"}</h3>
                    <p className="text-muted-foreground">
                      ul. Gdańska 14C<br />
                      70-661 Szczecin
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-brand/10 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-brand" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{isEn ? "Phone" : "Telefon"}</h3>
                    <a href="tel:+48123456789" className="text-brand hover:underline">
                      +48 123 456 789
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-brand/10 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-brand" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">E-mail</h3>
                    <a href="mailto:kontakt@lockit.pl" className="text-brand hover:underline">
                      kontakt@lockit.pl
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-brand/10 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-brand" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{isEn ? "Access Hours" : "Godziny dostępu"}</h3>
                    <p className="text-muted-foreground">
                      {isEn ? "24/7 — 365 days a year" : "24/7 — 365 dni w roku"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="bg-slate-100 rounded-xl overflow-hidden h-80 md:h-auto">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2376.8!2d14.55!3d53.43!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTPCsDI1JzQ4LjAiTiAxNMKwMzMnMDAuMCJF!5e0!3m2!1sen!2spl!4v1620000000000!5m2!1sen!2spl"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "320px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={isEn ? "LOCKIT location map" : "Mapa lokalizacji LOCKIT"}
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-brand">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {isEn ? "Ready to rent?" : "Gotowy do wynajmu?"}
            </h2>
            <p className="text-brand-100 mb-8 max-w-xl mx-auto">
              {isEn
                ? "See our pricing and rent online in 5 minutes"
                : "Zobacz cennik i wynajmij online w 5 minut"}
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
