import { Metadata } from "next"
import Link from "next/link"
import { getDictionary } from "@/lib/i18n/getDictionary"
import { locales, defaultLocale } from "@/lib/i18n/config"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, ArrowRight, Clock, Shield, Check, Phone } from "lucide-react"
import JsonLd from "@/components/seo/JsonLd"

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isPl = locale === "pl" || locale === defaultLocale

  return {
    title: isPl ? "Lokalizacje self storage — LOCKIT" : "Self Storage Locations — LOCKIT",
    description: isPl
      ? "Lokalizacje magazynów LOCKIT self storage. Obecnie działamy w Szczecinie przy ul. Gdańskiej 14C. Dostęp 24/7, monitoring, ubezpieczenie."
      : "LOCKIT self storage locations. Currently operating in Szczecin at Gdańska 14C Street. 24/7 access, monitoring, insurance.",
    alternates: {
      canonical: isPl ? "https://lockit.pl/lokalizacje/" : "https://lockit.pl/en/lokalizacje/",
      languages: {
        pl: "https://lockit.pl/lokalizacje/",
        en: "https://lockit.pl/en/lokalizacje/",
      },
    },
  }
}

export default async function LokalizacjePage({ params }: Props) {
  const { locale } = await params
  const dict = await getDictionary(locale)
  const isPl = locale === "pl" || locale === defaultLocale
  const basePath = locale === defaultLocale ? "" : `/${locale}`

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://lockit.pl/#organization",
    name: "LOCKIT Self Storage",
    description: isPl
      ? "Samoobsługowe boksy magazynowe w Szczecinie. Bezpieczne, nowoczesne, dostępne 24/7."
      : "Self-service storage units in Szczecin. Safe, modern, available 24/7.",
    url: "https://lockit.pl",
    telephone: "+48 123 456 789",
    address: {
      "@type": "PostalAddress",
      streetAddress: "ul. Gdańska 14C",
      addressLocality: "Szczecin",
      postalCode: "70-661",
      addressCountry: "PL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 53.4285,
      longitude: 14.5528,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    priceRange: "125-500 PLN",
  }

  return (
    <>
      <JsonLd data={localBusinessSchema} />

      <main className="min-h-screen bg-background">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                {isPl ? "Nasze lokalizacje" : "Our Locations"}
              </h1>
              <p className="text-lg text-muted-foreground">
                {isPl
                  ? "Bezpieczne, monitorowane magazyny self storage. Łatwy dojazd i dostęp 24/7."
                  : "Safe, monitored self storage facilities. Easy access and 24/7 availability."}
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {/* Active Location - Szczecin */}
              <Card className="overflow-hidden mb-8">
                <CardHeader className="bg-primary text-primary-foreground">
                  <div className="flex items-center justify-between">
                    <div>
                      <Badge variant="secondary" className="mb-2">
                        {isPl ? "Aktywna lokalizacja" : "Active Location"}
                      </Badge>
                      <CardTitle className="text-3xl">Szczecin</CardTitle>
                      <p className="text-primary-foreground/80 mt-1 text-lg">ul. Gdańska 14C, 70-661 Szczecin</p>
                    </div>
                    <MapPin className="w-16 h-16 text-primary-foreground/30" />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-4">{isPl ? "Udogodnienia" : "Features"}</h3>
                      <ul className="space-y-3">
                        <li className="flex items-center gap-3">
                          <Clock className="w-5 h-5 text-primary" />
                          <span>{isPl ? "Dostęp 24/7, 365 dni w roku" : "24/7 access, 365 days a year"}</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <Shield className="w-5 h-5 text-primary" />
                          <span>{isPl ? "Monitoring i ochrona" : "Monitoring and security"}</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-primary" />
                          <span>{isPl ? "Ubezpieczenie w cenie" : "Insurance included"}</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-primary" />
                          <span>{isPl ? "Łatwy dojazd z centrum" : "Easy access from city center"}</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-4">{isPl ? "Dostępne boksy" : "Available Units"}</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between p-3 bg-muted rounded-lg">
                          <span>Boks S — 3 m²</span>
                          <span className="font-semibold text-primary">{isPl ? "od 125 zł" : "from 125 PLN"}</span>
                        </div>
                        <div className="flex justify-between p-3 bg-muted rounded-lg">
                          <span>Boks M — 6 m²</span>
                          <span className="font-semibold text-primary">{isPl ? "od 175 zł" : "from 175 PLN"}</span>
                        </div>
                        <div className="flex justify-between p-3 bg-muted rounded-lg">
                          <span>Boks L — 12 m²</span>
                          <span className="font-semibold text-primary">{isPl ? "od 250 zł" : "from 250 PLN"}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 mt-6">
                    <Button asChild size="lg" className="flex-1">
                      <Link href={`${basePath}/self-storage-szczecin/`}>
                        {isPl ? "Szczegóły lokalizacji" : "Location Details"}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="flex-1">
                      <Link href={`${basePath}/boksy/szczecin/`}>
                        {isPl ? "Zobacz boksy i cennik" : "See Units & Pricing"}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Future locations */}
              <div className="text-center p-8 border-2 border-dashed border-muted-foreground/20 rounded-xl">
                <Badge variant="outline" className="mb-4">
                  {isPl ? "Wkrótce" : "Coming Soon"}
                </Badge>
                <h3 className="text-xl font-semibold mb-2">
                  {isPl ? "Kolejne lokalizacje w przygotowaniu" : "More locations in preparation"}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {isPl
                    ? "Pracujemy nad otwarciem nowych obiektów. Śledź nas, aby być na bieżąco."
                    : "We're working on opening new facilities. Follow us to stay updated."}
                </p>
                <Button asChild variant="outline">
                  <Link href={`${basePath}/ekspansja/`}>
                    {isPl ? "Dowiedz się więcej" : "Learn More"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">{isPl ? "Masz pytania?" : "Have questions?"}</h2>
              <p className="text-muted-foreground mb-6">
                {isPl
                  ? "Skontaktuj się z nami — pomożemy wybrać odpowiedni boks."
                  : "Contact us — we'll help you choose the right unit."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <a href="tel:+48123456789">
                    <Phone className="w-4 h-4 mr-2" />
                    +48 123 456 789
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href={`${basePath}/kontakt/`}>{isPl ? "Formularz kontaktowy" : "Contact Form"}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
