import { Metadata } from "next"
import Link from "next/link"
import { getDictionary } from "@/lib/i18n/getDictionary"
import { locales, defaultLocale } from "@/lib/i18n/config"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, MapPin, Clock, Shield, ArrowRight, Package, Truck, Users } from "lucide-react"
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
      ? "Boksy magazynowe Szczecin — cennik self storage | LOCKIT"
      : "Storage units Szczecin — self storage pricing | LOCKIT",
    description: isPl
      ? "Boksy magazynowe self storage w Szczecinie. Boks S (3m²), Boks M (6m²), Boks L (12m²). Ceny od 125 zł/mies. Wynajem online w 5 minut."
      : "Self storage units in Szczecin. Box S (3m²), Box M (6m²), Box L (12m²). Prices from 125 PLN/month. Online rental in 5 minutes.",
    alternates: {
      canonical: isPl ? "https://lockit.pl/boksy/szczecin/" : "https://lockit.pl/en/boksy/szczecin/",
      languages: {
        pl: "https://lockit.pl/boksy/szczecin/",
        en: "https://lockit.pl/en/boksy/szczecin/",
      },
    },
    openGraph: {
      title: isPl ? "Boksy magazynowe Szczecin — cennik | LOCKIT" : "Storage units Szczecin — pricing | LOCKIT",
      description: isPl
        ? "Boksy self storage w Szczecinie od 125 zł/mies. Dostęp 24/7, monitoring, ubezpieczenie w cenie."
        : "Self storage units in Szczecin from 125 PLN/month. 24/7 access, monitoring, insurance included.",
      url: isPl ? "https://lockit.pl/boksy/szczecin/" : "https://lockit.pl/en/boksy/szczecin/",
      siteName: 'LOCKIT Self Storage',
      locale: isPl ? 'pl_PL' : 'en_US',
      type: "website",
      images: [{ url: 'https://lockit.pl/og-image.jpg', width: 1200, height: 630, alt: 'LOCKIT Boksy Szczecin' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: isPl ? "Boksy magazynowe Szczecin — cennik | LOCKIT" : "Storage units Szczecin — pricing | LOCKIT",
      description: isPl
        ? "Boksy self storage w Szczecinie od 125 zł/mies. Dostęp 24/7, monitoring, ubezpieczenie w cenie."
        : "Self storage units in Szczecin from 125 PLN/month. 24/7 access, monitoring, insurance included.",
      images: ['https://lockit.pl/og-image.jpg'],
    },
  }
}

const boxes = [
  {
    id: "s",
    size: "3 m²",
    volume: "6 m³",
    height: "2 m",
    pallets: 6,
    priceFrom: 125,
    priceRegular: 250,
    color: "bg-sky-500",
    popular: false,
  },
  {
    id: "m",
    size: "6 m²",
    volume: "12 m³",
    height: "2 m",
    pallets: 12,
    priceFrom: 175,
    priceRegular: 350,
    color: "bg-primary",
    popular: true,
  },
  {
    id: "l",
    size: "12 m²",
    volume: "24 m³",
    height: "2 m",
    pallets: 24,
    priceFrom: 250,
    priceRegular: 500,
    color: "bg-slate-700",
    popular: false,
  },
]

export default async function BoksySzczecinPage({ params }: Props) {
  const { locale } = await params
  const dict = await getDictionary(locale)
  const isPl = locale === "pl" || locale === defaultLocale
  const basePath = locale === defaultLocale ? "" : `/${locale}`

  const localBusiness = {
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
  }

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: isPl ? "Boksy magazynowe LOCKIT Szczecin" : "LOCKIT Storage Units Szczecin",
    itemListElement: boxes.map((box, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: `Boks ${box.id.toUpperCase()} — ${box.size}`,
        description: isPl
          ? `Boks magazynowy ${box.size} w Szczecinie. Pojemność ${box.volume}.`
          : `Storage unit ${box.size} in Szczecin. Capacity ${box.volume}.`,
        url: `https://lockit.pl${basePath}/boksy/szczecin/boks-${box.id}/`,
        offers: {
          "@type": "Offer",
          price: box.priceFrom,
          priceCurrency: "PLN",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: box.priceFrom,
            priceCurrency: "PLN",
            unitText: isPl ? "miesiąc" : "month",
          },
        },
      },
    })),
  }

  return (
    <>
      <JsonLd data={localBusiness} />
      <JsonLd data={itemList} />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4">
                <MapPin className="w-3.5 h-3.5 mr-1" />
                ul. Gdańska 14C, Szczecin
              </Badge>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
                {isPl ? "Boksy magazynowe Szczecin" : "Storage Units Szczecin"}
                <span className="block text-primary mt-2">
                  {isPl ? "— wynajem self storage" : "— self storage rental"}
                </span>
              </h1>

              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
                {isPl
                  ? "Wybierz rozmiar boksu dopasowany do swoich potrzeb. Wszystkie boksy dostępne w obiekcie przy ul. Gdańskiej 14C w Szczecinie."
                  : "Choose the box size that fits your needs. All units available at Gdańska 14C Street in Szczecin."}
              </p>

              <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>{isPl ? "Dostęp 24/7" : "24/7 Access"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>{isPl ? "Monitoring i ochrona" : "Monitoring & security"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span>{isPl ? "Ubezpieczenie w cenie" : "Insurance included"}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Boxes Grid */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
              {boxes.map((box) => (
                <Card
                  key={box.id}
                  className={`relative overflow-hidden transition-all hover:shadow-lg ${box.popular ? "ring-2 ring-primary" : ""}`}
                >
                  {box.popular && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-primary text-primary-foreground">
                        {isPl ? "Najpopularniejszy" : "Most Popular"}
                      </Badge>
                    </div>
                  )}

                  <CardHeader className={`${box.color} text-white pb-8`}>
                    <CardTitle className="text-2xl font-bold">Boks {box.id.toUpperCase()}</CardTitle>
                    <CardDescription className="text-white/90 text-lg">{box.size}</CardDescription>
                  </CardHeader>

                  <CardContent className="pt-6">
                    <div className="mb-6">
                      <div className="flex items-baseline gap-1">
                        <span className="text-sm text-muted-foreground line-through">{box.priceRegular} zł</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-foreground">{box.priceFrom}</span>
                        <span className="text-muted-foreground">{isPl ? "zł/mies." : "PLN/mo"}</span>
                      </div>
                      <Badge variant="outline" className="mt-2 text-primary border-primary">
                        {isPl ? "-50% przez pierwszy miesiąc" : "-50% first month"}
                      </Badge>
                    </div>

                    <ul className="space-y-3 mb-6 text-sm">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>
                          {isPl ? "Powierzchnia:" : "Area:"} <strong>{box.size}</strong>
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>
                          {isPl ? "Pojemność:" : "Capacity:"} <strong>{box.volume}</strong>
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>
                          {isPl ? "Wysokość:" : "Height:"} <strong>{box.height}</strong>
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>
                          {isPl ? "Mieści:" : "Fits:"}{" "}
                          <strong>
                            {box.pallets} {isPl ? "europalet" : "europallets"}
                          </strong>
                        </span>
                      </li>
                    </ul>

                    <div className="space-y-3">
                      <Button asChild className="w-full" size="lg">
                        <a href="https://sprytki.pl/lockit" target="_blank" rel="noopener noreferrer">
                          {isPl ? "Wynajmij teraz" : "Rent Now"}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                      <Button asChild variant="outline" className="w-full">
                        <Link href={`${basePath}/boksy/szczecin/boks-${box.id}/`}>
                          {isPl ? "Szczegóły boksu" : "Unit Details"}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* What fits section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
                {isPl ? "Co zmieścisz w boksie?" : "What fits in a unit?"}
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-background rounded-xl p-6 border">
                  <div className="w-12 h-12 rounded-lg bg-sky-100 flex items-center justify-center mb-4">
                    <Package className="w-6 h-6 text-sky-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Boks S — 3 m²</h3>
                  <p className="text-sm text-muted-foreground">
                    {isPl
                      ? "Idealny na kartony, drobne meble, narzędzia ogrodowe. Mieści wyposażenie pokoju studenckiego."
                      : "Perfect for boxes, small furniture, garden tools. Fits a student room setup."}
                  </p>
                </div>

                <div className="bg-background rounded-xl p-6 border ring-2 ring-primary">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Truck className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Boks M — 6 m²</h3>
                  <p className="text-sm text-muted-foreground">
                    {isPl
                      ? "Mieści meble z mieszkania do 50 m². Doskonały na rowery, narty, motor."
                      : "Fits furniture from an apartment up to 50m². Great for bikes, skis, motorcycle."}
                  </p>
                </div>

                <div className="bg-background rounded-xl p-6 border">
                  <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-slate-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Boks L — 12 m²</h3>
                  <p className="text-sm text-muted-foreground">
                    {isPl
                      ? "Duża przestrzeń na meble, sprzęt, maszyny. Idealny dla firm i podczas przeprowadzki."
                      : "Large space for furniture, equipment, machines. Ideal for businesses and moving."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {isPl ? "Nie wiesz, jaki rozmiar wybrać?" : "Not sure which size to choose?"}
              </h2>
              <p className="text-muted-foreground mb-8">
                {isPl
                  ? "Zadzwoń do nas — doradzimy i pomożemy wybrać odpowiedni boks."
                  : "Call us — we'll advise and help you choose the right unit."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <a href="tel:+48123456789">
                    {isPl ? "Zadzwoń: +48 123 456 789" : "Call: +48 123 456 789"}
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
