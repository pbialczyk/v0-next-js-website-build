import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { getDictionary } from "@/lib/i18n/getDictionary"
import { locales, defaultLocale } from "@/lib/i18n/config"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, ArrowRight, Clock, Shield, Check, ExternalLink } from "lucide-react"
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
    title: isPl ? "Boksy i cennik — LOCKIT Self Storage" : "Storage Units & Pricing — LOCKIT Self Storage",
    description: isPl
      ? "Boksy magazynowe self storage. Wybierz lokalizację i rozmiar boksu. Ceny od 125 zł/mies. Wynajem online w 5 minut."
      : "Self storage units. Choose location and box size. Prices from 125 PLN/month. Online rental in 5 minutes.",
    alternates: {
      canonical: isPl ? "https://lockit.pl/boksy/" : "https://lockit.pl/en/boksy/",
      languages: {
        pl: "https://lockit.pl/boksy/",
        en: "https://lockit.pl/en/boksy/",
      },
    },
  }
}

const boxes = [
  {
    id: "s",
    name: "Boks S",
    size: "3 m²",
    image: "/boxes/boks-s-256.webp",
    width: 256,
    height: 236,
    priceFrom: 125,
    priceRegular: 250,
    popular: false,
  },
  {
    id: "m",
    name: "Boks M",
    size: "6 m²",
    image: "/boxes/boks-m-256.webp",
    width: 256,
    height: 200,
    priceFrom: 175,
    priceRegular: 350,
    popular: true,
  },
  {
    id: "l",
    name: "Boks L",
    size: "12 m²",
    image: "/boxes/boks-l-256.webp",
    width: 256,
    height: 181,
    priceFrom: 250,
    priceRegular: 500,
    popular: false,
  },
]

export default async function BoksyPage({ params }: Props) {
  const { locale } = await params
  const dict = await getDictionary(locale)
  const isPl = locale === "pl" || locale === defaultLocale
  const basePath = locale === defaultLocale ? "" : `/${locale}`

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: isPl ? "Boksy magazynowe LOCKIT" : "LOCKIT Storage Units",
    itemListElement: boxes.map((box, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: `${box.name} — ${box.size}`,
        description: isPl
          ? `Boks magazynowy ${box.size}. Cena od ${box.priceFrom} zł/mies.`
          : `Storage unit ${box.size}. Price from ${box.priceFrom} PLN/month.`,
        url: `https://lockit.pl${basePath}/boksy/szczecin/boks-${box.id}/`,
        offers: {
          "@type": "Offer",
          price: box.priceFrom,
          priceCurrency: "PLN",
          availability: "https://schema.org/InStock",
        },
      },
    })),
  }

  return (
    <>
      <JsonLd data={itemList} />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                <MapPin className="w-3.5 h-3.5 mr-1" />
                Szczecin
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
                {isPl ? "Boksy i cennik" : "Storage Units & Pricing"}
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                {isPl
                  ? "Wybierz rozmiar boksu dopasowany do swoich potrzeb. Ceny promocyjne -50% przez pierwszy miesiąc."
                  : "Choose the box size that fits your needs. Promotional prices -50% for the first month."}
              </p>

              <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground mt-6">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>{isPl ? "Dostęp 24/7" : "24/7 Access"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>{isPl ? "Monitoring" : "Monitoring"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span>{isPl ? "Ubezpieczenie" : "Insurance"}</span>
                </div>
              </div>
            </div>

            {/* Boxes Grid */}
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
              {boxes.map((box, index) => (
                <Card
                  key={box.id}
                  className={`relative overflow-hidden transition-all hover:shadow-xl animate-fade-in-up ${
                    box.popular ? "ring-2 ring-accent" : ""
                  }`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {box.popular && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-accent text-accent-foreground font-semibold">
                        {isPl ? "Najpopularniejszy" : "Most Popular"}
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="p-0">
                    <div className="relative aspect-[4/3] bg-muted flex items-center justify-center">
                      <Image
                        src={box.image}
                        alt={`${box.name} - ${box.size}`}
                        width={box.width}
                        height={box.height}
                        className="object-contain p-4"
                        loading="lazy"
                      />
                    </div>
                  </CardHeader>

                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <h2 className="text-2xl font-bold text-foreground">{box.name}</h2>
                      <p className="text-muted-foreground">{box.size}</p>
                    </div>

                    <div className="text-center mb-6">
                      <div className="text-sm text-muted-foreground line-through">
                        {box.priceRegular} zł/{isPl ? "mies." : "mo"}
                      </div>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-lg text-muted-foreground">{isPl ? "od" : "from"}</span>
                        <span className="text-4xl font-bold text-primary">{box.priceFrom}</span>
                        <span className="text-muted-foreground">zł/{isPl ? "mies." : "mo"}</span>
                      </div>
                      <Badge variant="outline" className="mt-2 text-primary border-primary">
                        {isPl ? "-50% pierwszy miesiąc" : "-50% first month"}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <Button asChild className="w-full" size="lg">
                        <a
                          href={`https://sprytki.pl/lockit/boks-${box.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {isPl ? "Wynajmij boks" : "Rent Unit"}
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                      <Button asChild variant="outline" className="w-full">
                        <Link href={`${basePath}/boksy/szczecin/boks-${box.id}/`}>
                          {isPl ? "Szczegóły" : "Details"}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Link to Szczecin hub */}
            <div className="mt-12 text-center">
              <Button asChild variant="link" size="lg">
                <Link href={`${basePath}/boksy/szczecin/`}>
                  {isPl ? "Zobacz pełny cennik dla Szczecina" : "See full Szczecin pricing"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Location Info */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {isPl ? "Nasza lokalizacja" : "Our Location"}
              </h2>
              <p className="text-muted-foreground mb-6">
                {isPl
                  ? "Wszystkie boksy dostępne w obiekcie przy ul. Gdańskiej 14C w Szczecinie."
                  : "All units available at Gdańska 14C Street in Szczecin."}
              </p>

              <Card className="overflow-hidden">
                <CardHeader className="bg-primary text-primary-foreground p-6">
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <Badge variant="secondary" className="mb-2">
                        {isPl ? "Aktywna lokalizacja" : "Active Location"}
                      </Badge>
                      <h3 className="text-xl font-bold">Szczecin</h3>
                      <p className="text-primary-foreground/80 mt-1">ul. Gdańska 14C, 70-952</p>
                    </div>
                    <MapPin className="w-12 h-12 text-primary-foreground/50" />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <Button asChild className="w-full" size="lg">
                    <Link href={`${basePath}/self-storage-szczecin/`}>
                      {isPl ? "Zobacz szczegóły lokalizacji" : "See location details"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <p className="text-muted-foreground mt-8 text-sm">
                {isPl ? "Więcej lokalizacji wkrótce..." : "More locations coming soon..."}
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
