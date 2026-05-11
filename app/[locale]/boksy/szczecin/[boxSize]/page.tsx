import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getDictionary } from "@/lib/i18n/getDictionary"
import { locales, defaultLocale } from "@/lib/i18n/config"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Check,
  MapPin,
  Clock,
  Shield,
  ArrowRight,
  ArrowLeft,
  Ruler,
  Box,
  Layers,
  Package,
  Home,
  Briefcase,
  GraduationCap,
  Truck,
} from "lucide-react"
import JsonLd from "@/components/seo/JsonLd"

type Props = {
  params: Promise<{ locale: string; boxSize: string }>
}

const boxesData = {
  "boks-s": {
    id: "s",
    name: "Boks S",
    subtitle: { pl: "mały magazyn 3 m²", en: "small unit 3 m²" },
    size: "3 m²",
    dimensions: "2 m × 1.5 m × 2 m",
    volume: "6 m³",
    height: "2 m",
    pallets: 6,
    priceFrom: 125,
    priceRegular: 250,
    color: "bg-sky-500",
    icon: Package,
    h1: {
      pl: "Boks S — mały magazyn 3 m² Szczecin",
      en: "Box S — small 3 m² unit Szczecin",
    },
    description: {
      pl: "Mały boks magazynowy 3m² w Szczecinie. Idealny na kartony, drobne meble, narzędzia. Od 125 zł/mies. Dostęp 24/7.",
      en: "Small 3m² storage unit in Szczecin. Perfect for boxes, small furniture, tools. From 125 PLN/month. 24/7 access.",
    },
    intro: {
      pl: "Boks S to idealne rozwiązanie dla osób potrzebujących kompaktowej przestrzeni magazynowej. Mieści wyposażenie pokoju studenckiego, sezonowe ubrania, sprzęt sportowy lub dokumenty firmowe.",
      en: "Box S is the perfect solution for those who need compact storage space. It fits a student room setup, seasonal clothes, sports equipment, or business documents.",
    },
    whatFits: {
      pl: [
        "Kartony z rzeczami osobistymi",
        "Drobne meble (krzesła, stoliki)",
        "Narzędzia ogrodowe",
        "Rowery (2-3 szt.)",
        "Sprzęt sportowy (narty, snowboard)",
        "Dokumenty i archiwum",
        "Wyposażenie pokoju studenckiego",
      ],
      en: [
        "Boxes with personal items",
        "Small furniture (chairs, tables)",
        "Garden tools",
        "Bicycles (2-3 pcs)",
        "Sports equipment (skis, snowboard)",
        "Documents and archives",
        "Student room setup",
      ],
    },
    forWhom: {
      pl: [
        { icon: GraduationCap, text: "Studenci — na czas wakacji lub zmiany akademika" },
        { icon: Home, text: "Osoby prywatne — dodatkowa przestrzeń w domu" },
        { icon: Briefcase, text: "Małe firmy — archiwum dokumentów" },
      ],
      en: [
        { icon: GraduationCap, text: "Students — during vacation or dorm change" },
        { icon: Home, text: "Individuals — extra space at home" },
        { icon: Briefcase, text: "Small businesses — document archive" },
      ],
    },
  },
  "boks-m": {
    id: "m",
    name: "Boks M",
    subtitle: { pl: "średni magazyn 6 m²", en: "medium unit 6 m²" },
    size: "6 m²",
    dimensions: "3 m × 2 m × 2 m",
    volume: "12 m³",
    height: "2 m",
    pallets: 12,
    priceFrom: 175,
    priceRegular: 350,
    color: "bg-primary",
    icon: Box,
    h1: {
      pl: "Boks M — magazyn 6 m² Szczecin",
      en: "Box M — 6 m² unit Szczecin",
    },
    description: {
      pl: "Średni boks magazynowy 6m² w Szczecinie. Mieści meble z mieszkania do 50m². Od 175 zł/mies. Dostęp 24/7.",
      en: "Medium 6m² storage unit in Szczecin. Fits furniture from apartment up to 50m². From 175 PLN/month. 24/7 access.",
    },
    intro: {
      pl: "Boks M to najpopularniejszy wybór naszych klientów. Mieści meble z całego mieszkania do 50 m², co czyni go idealnym rozwiązaniem na czas remontu lub przeprowadzki.",
      en: "Box M is our most popular choice. It fits furniture from an entire apartment up to 50m², making it perfect for renovation or moving.",
    },
    whatFits: {
      pl: [
        "Meble z mieszkania do 50 m²",
        "Sofa, łóżko, szafa",
        "Motor lub skuter",
        "Sprzęt AGD (pralka, lodówka)",
        "Rowery całej rodziny",
        "Sprzęt sportowy i turystyczny",
        "Towar firmowy na 12 europaletach",
      ],
      en: [
        "Furniture from apartment up to 50m²",
        "Sofa, bed, wardrobe",
        "Motorcycle or scooter",
        "Appliances (washing machine, fridge)",
        "Family bicycles",
        "Sports and tourist equipment",
        "Business goods on 12 europallets",
      ],
    },
    forWhom: {
      pl: [
        { icon: Home, text: "Rodziny — podczas remontu mieszkania" },
        { icon: Truck, text: "Przeprowadzki — tymczasowe przechowywanie" },
        { icon: Briefcase, text: "Firmy — magazyn towarów i sprzętu" },
      ],
      en: [
        { icon: Home, text: "Families — during apartment renovation" },
        { icon: Truck, text: "Moving — temporary storage" },
        { icon: Briefcase, text: "Businesses — goods and equipment storage" },
      ],
    },
  },
  "boks-l": {
    id: "l",
    name: "Boks L",
    subtitle: { pl: "duży magazyn 12 m²", en: "large unit 12 m²" },
    size: "12 m²",
    dimensions: "4 m × 3 m × 2 m",
    volume: "24 m³",
    height: "2 m",
    pallets: 24,
    priceFrom: 250,
    priceRegular: 500,
    color: "bg-slate-700",
    icon: Layers,
    h1: {
      pl: "Boks L — duży magazyn 12 m² Szczecin",
      en: "Box L — large 12 m² unit Szczecin",
    },
    description: {
      pl: "Duży boks magazynowy 12m² w Szczecinie. Mieści meble z domu do 100m². Idealny dla firm. Od 250 zł/mies.",
      en: "Large 12m² storage unit in Szczecin. Fits furniture from house up to 100m². Ideal for businesses. From 250 PLN/month.",
    },
    intro: {
      pl: "Boks L to największa przestrzeń w naszej ofercie — aż 24 m³ pojemności. Idealny wybór dla firm potrzebujących profesjonalnego zaplecza magazynowego lub dla dużych przeprowadzek.",
      en: "Box L is the largest space in our offer — up to 24m³ capacity. Perfect for businesses needing professional storage or for large moves.",
    },
    whatFits: {
      pl: [
        "Meble z domu do 100 m²",
        "Pełne wyposażenie mieszkania lub biura",
        "Maszyny i sprzęt budowlany",
        "Towar firmowy na 24 europaletach",
        "Materiały reklamowe i eventowe",
        "Sprzęt sezonowy firmy",
        "Archiwum dokumentów dużej firmy",
      ],
      en: [
        "Furniture from house up to 100m²",
        "Full apartment or office setup",
        "Machines and construction equipment",
        "Business goods on 24 europallets",
        "Advertising and event materials",
        "Seasonal business equipment",
        "Large company document archive",
      ],
    },
    forWhom: {
      pl: [
        { icon: Briefcase, text: "Firmy — profesjonalny magazyn B2B" },
        { icon: Truck, text: "Przeprowadzki — meble z całego domu" },
        { icon: Home, text: "Właściciele nieruchomości — staging" },
      ],
      en: [
        { icon: Briefcase, text: "Businesses — professional B2B storage" },
        { icon: Truck, text: "Moving — furniture from entire house" },
        { icon: Home, text: "Property owners — staging" },
      ],
    },
  },
}

const validBoxSizes = ["boks-s", "boks-m", "boks-l"] as const
type BoxSize = (typeof validBoxSizes)[number]

export async function generateStaticParams() {
  const params: { locale: string; boxSize: string }[] = []
  for (const locale of locales) {
    for (const boxSize of validBoxSizes) {
      params.push({ locale, boxSize })
    }
  }
  return params
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, boxSize } = await params

  if (!validBoxSizes.includes(boxSize as BoxSize)) {
    return { title: "Not Found" }
  }

  const box = boxesData[boxSize as BoxSize]
  const isPl = locale === "pl" || locale === defaultLocale

  return {
    title: `${box.name} — ${isPl ? box.subtitle.pl : box.subtitle.en} | LOCKIT Szczecin`,
    description: isPl ? box.description.pl : box.description.en,
    alternates: {
      canonical: isPl
        ? `https://lockit.pl/boksy/szczecin/${boxSize}/`
        : `https://lockit.pl/en/boksy/szczecin/${boxSize}/`,
      languages: {
        pl: `https://lockit.pl/boksy/szczecin/${boxSize}/`,
        en: `https://lockit.pl/en/boksy/szczecin/${boxSize}/`,
      },
    },
    openGraph: {
      title: `${box.name} — ${box.size} | LOCKIT Szczecin`,
      description: isPl ? box.description.pl : box.description.en,
      url: isPl
        ? `https://lockit.pl/boksy/szczecin/${boxSize}/`
        : `https://lockit.pl/en/boksy/szczecin/${boxSize}/`,
      type: "website",
    },
  }
}

export default async function BoxDetailPage({ params }: Props) {
  const { locale, boxSize } = await params

  if (!validBoxSizes.includes(boxSize as BoxSize)) {
    notFound()
  }

  const box = boxesData[boxSize as BoxSize]
  const dict = await getDictionary(locale)
  const isPl = locale === "pl" || locale === defaultLocale
  const basePath = locale === defaultLocale ? "" : `/${locale}`
  const IconComponent = box.icon

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${box.name} — ${box.size}`,
    description: isPl ? box.description.pl : box.description.en,
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
    areaServed: {
      "@type": "City",
      name: "Szczecin",
    },
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
      availability: "https://schema.org/InStock",
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
        name: isPl ? "Boksy Szczecin" : "Szczecin Units",
        item: `https://lockit.pl${basePath}/boksy/szczecin/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: box.name,
        item: `https://lockit.pl${basePath}/boksy/szczecin/${boxSize}/`,
      },
    ],
  }

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />

      <main className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="border-b bg-muted/30">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href={`${basePath}/`} className="hover:text-foreground transition-colors">
                {isPl ? "Strona główna" : "Home"}
              </Link>
              <span>/</span>
              <Link href={`${basePath}/boksy/szczecin/`} className="hover:text-foreground transition-colors">
                {isPl ? "Boksy Szczecin" : "Szczecin Units"}
              </Link>
              <span>/</span>
              <span className="text-foreground font-medium">{box.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Icon & Badge */}
                <div
                  className={`w-24 h-24 md:w-32 md:h-32 rounded-2xl ${box.color} flex items-center justify-center flex-shrink-0`}
                >
                  <IconComponent className="w-12 h-12 md:w-16 md:h-16 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <Badge variant="secondary" className="mb-3">
                    <MapPin className="w-3.5 h-3.5 mr-1" />
                    ul. Gdańska 14C, Szczecin
                  </Badge>

                  <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                    {isPl ? box.h1.pl : box.h1.en}
                  </h1>

                  <p className="text-lg text-muted-foreground mb-6">{isPl ? box.intro.pl : box.intro.en}</p>

                  <div className="flex flex-wrap gap-4 text-sm">
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
              </div>
            </div>
          </div>
        </section>

        {/* Details Grid */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Ruler className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <div className="text-sm text-muted-foreground">{isPl ? "Powierzchnia" : "Area"}</div>
                    <div className="text-xl font-bold">{box.size}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Box className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <div className="text-sm text-muted-foreground">{isPl ? "Pojemność" : "Capacity"}</div>
                    <div className="text-xl font-bold">{box.volume}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Layers className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <div className="text-sm text-muted-foreground">{isPl ? "Wymiary" : "Dimensions"}</div>
                    <div className="text-xl font-bold">{box.dimensions}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Package className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <div className="text-sm text-muted-foreground">{isPl ? "Mieści" : "Fits"}</div>
                    <div className="text-xl font-bold">
                      {box.pallets} {isPl ? "palet" : "pallets"}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Price Card */}
              <Card className="mb-8">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div>
                      <div className="text-sm text-muted-foreground line-through">{box.priceRegular} zł/mies.</div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold">{box.priceFrom}</span>
                        <span className="text-muted-foreground">{isPl ? "zł/miesiąc" : "PLN/month"}</span>
                      </div>
                      <Badge variant="outline" className="mt-2 text-primary border-primary">
                        {isPl ? "-50% przez pierwszy miesiąc" : "-50% first month"}
                      </Badge>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button asChild size="lg">
                        <a href="https://sprytki.pl/lockit" target="_blank" rel="noopener noreferrer">
                          {isPl ? "Wynajmij teraz" : "Rent Now"}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                      <Button asChild variant="outline" size="lg">
                        <a href="tel:+48123456789">{isPl ? "Zadzwoń" : "Call"}</a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* What fits */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">{isPl ? "Co zmieścisz w tym boksie?" : "What fits in this unit?"}</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {(isPl ? box.whatFits.pl : box.whatFits.en).map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* For whom */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">{isPl ? "Dla kogo?" : "Who is it for?"}</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {(isPl ? box.forWhom.pl : box.forWhom.en).map((item, index) => {
                  const Icon = item.icon
                  return (
                    <Card key={index}>
                      <CardContent className="p-5">
                        <Icon className="w-8 h-8 text-primary mb-3" />
                        <p className="text-sm">{item.text}</p>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Back link */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Button asChild variant="outline" size="lg">
                <Link href={`${basePath}/boksy/szczecin/`}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {isPl ? "Porównaj wszystkie rozmiary" : "Compare all sizes"}
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
