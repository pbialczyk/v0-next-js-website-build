import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { getDictionary } from "@/lib/i18n/getDictionary"
import { locales, defaultLocale } from "@/lib/i18n/config"
import { Button } from "@/components/ui/button"
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
    letter: "S",
    size: "3m2",
    dimensions: "150x200x200cm",
    priceFrom: 125,
    priceRegular: 250,
    priceVat: "153,75",
    typeId: "32769a88-77d9-ef11-88f8-000d3a1d3d62",
    name: { pl: "Mały box", en: "Small box" },
    description: {
      pl: "Sprawdzi się jako komórka lokatorska do przechowywania kartonów, drobnych mebli czy narzędzi ogrodowych. Towar z 6 EUR/palet",
      en: "Perfect as a tenant's storage for boxes, small furniture or garden tools. Fits 6 EUR/pallets"
    },
  },
  {
    id: "m",
    letter: "M",
    size: "6m2",
    dimensions: "200x300x200cm",
    priceFrom: 175,
    priceRegular: 350,
    priceVat: "215,25",
    typeId: "531f0bd3-77d9-ef11-88f8-000d3a1d3d62",
    name: { pl: "Średni box", en: "Medium box" },
    description: {
      pl: "Doskonałe rozwiązanie do przechowywania rowerów, motoru, nart lub mebli z mieszkania do 50 m2. Towar z 12 EUR/palet.",
      en: "Perfect solution for storing bicycles, motorcycle, skis or furniture from an apartment up to 50 m2. Fits 12 EUR/pallets."
    },
  },
  {
    id: "l",
    letter: "L",
    size: "12m2",
    dimensions: "200x600x200cm",
    priceFrom: 250,
    priceRegular: 500,
    priceVat: "307,50",
    typeId: "93bd21f7-77d9-ef11-88f8-000d3a1d3d62",
    name: { pl: "Duży box", en: "Large box" },
    description: {
      pl: "To duża przestrzeń często wybierana przez firmy. Idealna dla mebli, sprzętu sportowego, maszyn, narzędzi i materiałów budowlanych. To aż 24 m3!",
      en: "A large space often chosen by businesses. Ideal for furniture, sports equipment, machines, tools and construction materials. That's 24 m3!"
    },
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
    telephone: "+48 666 030 717",
    address: {
      "@type": "PostalAddress",
      streetAddress: "ul. Gdańska 14C",
      addressLocality: "Szczecin",
      postalCode: "70-661",
      addressCountry: "PL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 53.4366128,
      longitude: 14.5541361,
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
        "@type": "Product",
        name: `${isPl ? box.name.pl : box.name.en} ${box.size}`,
        description: isPl ? box.description.pl : box.description.en,
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

        {/* Boxes Grid - Screenshot Style */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {boxes.map((box) => (
                <div key={box.id} className="flex flex-col items-center text-center">
                  {/* Black Circle Badge */}
                  <div className="w-20 h-20 rounded-full bg-black flex items-center justify-center mb-6">
                    <span className="text-white text-3xl font-bold">{box.letter}</span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold mb-4">
                    {isPl ? box.name.pl : box.name.en} {box.size}
                  </h2>

                  {/* Box Image */}
                  <div className="relative w-full h-48 mb-4">
                    <Image
                      src={`/boxes/boks-${box.id}.webp`}
                      alt={`${isPl ? box.name.pl : box.name.en} ${box.size}`}
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Dimensions */}
                  <p className="font-semibold mb-3">{box.dimensions}</p>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-6 px-2">
                    {isPl ? box.description.pl : box.description.en}
                  </p>

                  {/* Pricing */}
                  <div className="mb-2">
                    <span className="text-muted-foreground line-through mr-2">{box.priceRegular}</span>
                    <span className="text-2xl font-bold">{box.priceFrom} zł</span>
                    <span className="text-muted-foreground">/{isPl ? "miesiąc" : "month"}</span>
                  </div>

                  {/* Discount Badge */}
                  <p className="text-red-500 font-semibold mb-2">
                    {isPl ? "-50% przez 1 miesiąc" : "-50% for 1 month"}
                  </p>

                  {/* VAT Price */}
                  <p className="text-sm text-muted-foreground mb-2">
                    {box.priceVat} zł {isPl ? "z VAT" : "with VAT"}
                  </p>

                  {/* Legal Note */}
                  <p className="text-xs text-muted-foreground mb-2">
                    {isPl ? "najniższa cena z przed 30 dni przed obniżką:" : "lowest price from 30 days before discount:"}
                  </p>
                  <p className="text-xs text-muted-foreground mb-6">
                    {box.priceFrom}zł/{isPl ? "miesiąc" : "month"}, {isPl ? "cena regularna" : "regular price"} {box.priceRegular} zł/{isPl ? "miesiąc" : "month"}
                  </p>

                  {/* CTA Button */}
                  <Button 
                    asChild 
                    className="w-full max-w-xs"
                    style={{ backgroundColor: '#c8e94d', color: '#000' }}
                  >
                    <a 
                      href={`https://wynajmij.lockit.pl/rent?step=1&typeId=${box.typeId}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {isPl ? "Wynajmij teraz" : "Rent now"}
                    </a>
                  </Button>

                  {/* Details Link */}
                  <Link 
                    href={`${basePath}/boksy/szczecin/boks-${box.id}/`}
                    className="mt-3 text-sm text-primary hover:underline"
                  >
                    {isPl ? "Dowiedz się więcej" : "Learn more"} →
                  </Link>
                </div>
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
                  <a href="tel:+48666030717">
                    {isPl ? "Zadzwoń: +48 666 030 717" : "Call: +48 666 030 717"}
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
