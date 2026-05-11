import { Metadata } from "next"
import Link from "next/link"
import { getDictionary } from "@/lib/i18n/getDictionary"
import { locales, defaultLocale } from "@/lib/i18n/config"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  ArrowRight,
  Clock,
  Shield,
  Check,
  Phone,
  Mail,
  Star,
  Car,
  Building2,
  Camera,
  Lock,
} from "lucide-react"
import { JsonLd } from "@/components/seo/JsonLd"

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
    title: isPl
      ? "Self Storage Szczecin — magazyn samoobsługowy | LOCKIT"
      : "Self Storage Szczecin — storage facility | LOCKIT",
    description: isPl
      ? "Self storage w Szczecinie przy ul. Gdańskiej 14C. Boksy od 3m² do 12m². Dostęp 24/7, monitoring, ubezpieczenie. Ceny od 125 zł/mies."
      : "Self storage in Szczecin at Gdańska 14C Street. Units from 3m² to 12m². 24/7 access, monitoring, insurance. Prices from 125 PLN/month.",
    alternates: {
      canonical: isPl ? "https://lockit.pl/self-storage-szczecin/" : "https://lockit.pl/en/self-storage-szczecin/",
      languages: {
        pl: "https://lockit.pl/self-storage-szczecin/",
        en: "https://lockit.pl/en/self-storage-szczecin/",
      },
    },
    openGraph: {
      title: isPl ? "Self Storage Szczecin | LOCKIT" : "Self Storage Szczecin | LOCKIT",
      description: isPl
        ? "Boksy magazynowe w Szczecinie. Dostęp 24/7, monitoring, ubezpieczenie w cenie."
        : "Storage units in Szczecin. 24/7 access, monitoring, insurance included.",
      url: isPl ? "https://lockit.pl/self-storage-szczecin/" : "https://lockit.pl/en/self-storage-szczecin/",
      type: "website",
    },
  }
}

const features = [
  { icon: Clock, key: "access247" },
  { icon: Camera, key: "monitoring" },
  { icon: Shield, key: "insurance" },
  { icon: Lock, key: "security" },
  { icon: Car, key: "parking" },
  { icon: Building2, key: "modern" },
]

const featureTexts = {
  access247: { pl: "Dostęp 24/7", en: "24/7 Access" },
  monitoring: { pl: "Monitoring HD", en: "HD Monitoring" },
  insurance: { pl: "Ubezpieczenie", en: "Insurance" },
  security: { pl: "Kontrola dostępu", en: "Access Control" },
  parking: { pl: "Parking dla klientów", en: "Customer Parking" },
  modern: { pl: "Nowoczesny obiekt", en: "Modern Facility" },
}

export default async function SelfStorageSzczecinPage({ params }: Props) {
  const { locale } = await params
  const dict = await getDictionary(locale)
  const isPl = locale === "pl" || locale === defaultLocale
  const basePath = locale === defaultLocale ? "" : `/${locale}`

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "SelfStorage",
    "@id": "https://lockit.pl/#szczecin",
    name: "LOCKIT Self Storage Szczecin",
    description: isPl
      ? "Samoobsługowe boksy magazynowe w Szczecinie przy ul. Gdańskiej 14C. Bezpieczne, nowoczesne, dostępne 24/7."
      : "Self-service storage units in Szczecin at Gdańska 14C Street. Safe, modern, available 24/7.",
    url: "https://lockit.pl/self-storage-szczecin/",
    telephone: "+48 123 456 789",
    email: "kontakt@lockit.pl",
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
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "40",
    },
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isPl ? "Strona główna" : "Home",
        item: `https://lockit.pl${basePath}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: isPl ? "Lokalizacje" : "Locations",
        item: `https://lockit.pl${basePath}/lokalizacje/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Self Storage Szczecin",
        item: `https://lockit.pl${basePath}/self-storage-szczecin/`,
      },
    ],
  }

  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={breadcrumbSchema} />

      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Badge variant="secondary" className="mb-4">
                <MapPin className="w-3.5 h-3.5 mr-1" />
                ul. Gdańska 14C, 70-661 Szczecin
              </Badge>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
                {isPl ? "Self Storage Szczecin" : "Self Storage Szczecin"}
                <span className="block text-primary mt-2">
                  {isPl ? "— magazyn samoobsługowy 24/7" : "— 24/7 storage facility"}
                </span>
              </h1>

              <p className="text-lg text-muted-foreground mb-8 max-w-2xl text-pretty">
                {isPl
                  ? "Nowoczesny obiekt self storage w centrum Szczecina. Boksy magazynowe od 3 m² do 12 m². Bezpieczne przechowywanie dla osób prywatnych i firm."
                  : "Modern self storage facility in central Szczecin. Storage units from 3m² to 12m². Safe storage for individuals and businesses."}
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <Badge className="bg-yellow-500 text-black">
                  <Star className="w-3.5 h-3.5 mr-1 fill-current" />
                  5.0 Google · 40 {isPl ? "opinii" : "reviews"}
                </Badge>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link href={`${basePath}/boksy/szczecin/`}>
                    {isPl ? "Zobacz boksy i cennik" : "See Units & Pricing"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="tel:+48123456789">
                    <Phone className="w-4 h-4 mr-2" />
                    +48 123 456 789
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="opis" className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                {isPl ? "Dlaczego LOCKIT Szczecin?" : "Why LOCKIT Szczecin?"}
              </h2>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {features.map((feature) => {
                  const Icon = feature.icon
                  const text = featureTexts[feature.key as keyof typeof featureTexts]
                  return (
                    <Card key={feature.key}>
                      <CardContent className="p-5 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <span className="font-medium">{isPl ? text.pl : text.en}</span>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="cennik" className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                {isPl ? "Cennik boksów" : "Unit Pricing"}
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { name: "Boks S", size: "3 m²", price: 125, regular: 250 },
                  { name: "Boks M", size: "6 m²", price: 175, regular: 350, popular: true },
                  { name: "Boks L", size: "12 m²", price: 250, regular: 500 },
                ].map((box) => (
                  <Card key={box.name} className={box.popular ? "ring-2 ring-primary" : ""}>
                    <CardContent className="p-6 text-center">
                      {box.popular && (
                        <Badge className="mb-3">{isPl ? "Najpopularniejszy" : "Most Popular"}</Badge>
                      )}
                      <h3 className="text-xl font-bold">{box.name}</h3>
                      <p className="text-muted-foreground mb-4">{box.size}</p>
                      <div className="text-sm text-muted-foreground line-through">{box.regular} zł</div>
                      <div className="text-3xl font-bold text-primary mb-1">{box.price} zł</div>
                      <p className="text-sm text-muted-foreground mb-4">{isPl ? "/ miesiąc" : "/ month"}</p>
                      <Badge variant="outline" className="text-primary border-primary">
                        -50% {isPl ? "pierwszy miesiąc" : "first month"}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-8">
                <Button asChild size="lg">
                  <Link href={`${basePath}/boksy/szczecin/`}>
                    {isPl ? "Szczegóły i rezerwacja" : "Details & Booking"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Location / Map */}
        <section id="dojazd" className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                {isPl ? "Lokalizacja i dojazd" : "Location & Directions"}
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4">{isPl ? "Adres" : "Address"}</h3>
                      <p className="text-lg mb-2">LOCKIT Self Storage</p>
                      <p className="text-muted-foreground mb-4">
                        ul. Gdańska 14C
                        <br />
                        70-661 Szczecin
                      </p>

                      <h3 className="font-semibold mb-4 mt-6">{isPl ? "Kontakt" : "Contact"}</h3>
                      <div className="space-y-2">
                        <a
                          href="tel:+48123456789"
                          className="flex items-center gap-2 text-primary hover:underline"
                        >
                          <Phone className="w-4 h-4" />
                          +48 123 456 789
                        </a>
                        <a
                          href="mailto:kontakt@lockit.pl"
                          className="flex items-center gap-2 text-primary hover:underline"
                        >
                          <Mail className="w-4 h-4" />
                          kontakt@lockit.pl
                        </a>
                      </div>

                      <h3 className="font-semibold mb-4 mt-6">{isPl ? "Godziny otwarcia" : "Opening Hours"}</h3>
                      <p className="text-muted-foreground">
                        {isPl
                          ? "Dostęp do boksów: 24/7, 365 dni w roku"
                          : "Unit access: 24/7, 365 days a year"}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4">{isPl ? "Jak dojechać?" : "How to get here?"}</h3>
                      <ul className="space-y-3 text-sm">
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>
                            {isPl
                              ? "Z centrum Szczecina: 10 minut samochodem"
                              : "From Szczecin center: 10 minutes by car"}
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>
                            {isPl
                              ? "Bezpłatny parking dla klientów"
                              : "Free parking for customers"}
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>
                            {isPl
                              ? "Możliwość wjazdu busem pod boksy"
                              : "Van access directly to units"}
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>
                            {isPl
                              ? "Łatwy dojazd z autostrady A6"
                              : "Easy access from A6 highway"}
                          </span>
                        </li>
                      </ul>

                      <Button asChild className="w-full mt-6" variant="outline">
                        <a
                          href="https://maps.google.com/?q=ul.+Gdańska+14C,+Szczecin"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MapPin className="w-4 h-4 mr-2" />
                          {isPl ? "Otwórz w Google Maps" : "Open in Google Maps"}
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="formularz" className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {isPl ? "Wynajmij boks online w 5 minut" : "Rent a unit online in 5 minutes"}
              </h2>
              <p className="text-primary-foreground/80 mb-8">
                {isPl
                  ? "Wybierz rozmiar, zapłać online i odbierz klucze. Bez formalności, bez czekania."
                  : "Choose size, pay online and pick up keys. No paperwork, no waiting."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary">
                  <a href="https://sprytki.pl/lockit" target="_blank" rel="noopener noreferrer">
                    {isPl ? "Wynajmij teraz" : "Rent Now"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  <Link href={`${basePath}/kontakt/`}>{isPl ? "Kontakt" : "Contact"}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
