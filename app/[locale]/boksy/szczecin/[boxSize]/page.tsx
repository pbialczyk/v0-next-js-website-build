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
import { JsonLd } from "@/components/seo/JsonLd"

type Props = {
  params: Promise<{ locale: string; boxSize: string }>
}

const boxesData = {
  "boks-s": {
    id: "s",
    name: "Boks S",
    subtitle: { pl: "mały magazyn 3 m²", en: "small unit 3 m²" },
    size: "3 m²",
    dimensions: "1.5 m × 2 m × 2 m",
    volume: "6 m³",
    height: "2 m",
    pallets: 6,
    priceFrom: 125,
    priceRegular: 250,
    color: "bg-sky-500",
    icon: Package,
    typeId: "32769a88-77d9-ef11-88f8-000d3a1d3d62",
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
    faq: {
      pl: [
        { q: "Ile kartonów zmieści się w Boksie S?", a: "W Boksie S (3 m², 6 m³) zmieścisz około 30-40 standardowych kartonów przeprowadzkowych lub wyposażenie jednego pokoju studenckiego." },
        { q: "Czy Boks S wystarczy na rzeczy z akademika?", a: "Tak! Boks S idealnie mieści zawartość typowego pokoju w akademiku: łóżko, biurko, krzesło, kilka kartonów z rzeczami osobistymi i rower." },
        { q: "Czy mogę przechowywać rower w Boksie S?", a: "Oczywiście. W Boksie S zmieścisz 2-3 rowery plus dodatkowe rzeczy. To popularne rozwiązanie na sezon zimowy." },
        { q: "Jaki jest minimalny okres najmu Boksu S?", a: "Minimalny okres najmu to 1 miesiąc. Możesz przedłużyć lub zakończyć najem w dowolnym momencie z 7-dniowym wypowiedzeniem." },
      ],
      en: [
        { q: "How many boxes fit in Box S?", a: "Box S (3 m², 6 m³) fits about 30-40 standard moving boxes or the contents of one student room." },
        { q: "Is Box S enough for dorm items?", a: "Yes! Box S perfectly fits a typical dorm room: bed, desk, chair, several boxes of personal items, and a bicycle." },
        { q: "Can I store a bicycle in Box S?", a: "Of course. Box S fits 2-3 bicycles plus additional items. It's a popular solution for winter storage." },
        { q: "What is the minimum rental period for Box S?", a: "The minimum rental period is 1 month. You can extend or end your rental at any time with 7 days' notice." },
      ],
    },
    segments: {
      pl: [
        { slug: "dla-studentow", name: "Dla studentów" },
        { slug: "archiwum-dokumentow", name: "Archiwum dokumentów" },
      ],
      en: [
        { slug: "dla-studentow", name: "For students" },
        { slug: "archiwum-dokumentow", name: "Document archive" },
      ],
    },
  },
  "boks-m": {
    id: "m",
    name: "Boks M",
    subtitle: { pl: "średni magazyn 6 m²", en: "medium unit 6 m²" },
    size: "6 m²",
    dimensions: "2 m × 3 m × 2 m",
    volume: "12 m³",
    height: "2 m",
    pallets: 12,
    priceFrom: 175,
    priceRegular: 350,
    color: "bg-primary",
    icon: Box,
    typeId: "531f0bd3-77d9-ef11-88f8-000d3a1d3d62",
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
    faq: {
      pl: [
        { q: "Czy w Boksie M zmieszczą się meble z mieszkania?", a: "Tak! Boks M (6 m², 12 m³) mieści meble z mieszkania do 50 m² — sofę, łóżko, szafę, stół z krzesłami i wiele kartonów." },
        { q: "Czy mogę przechowywać motor w Boksie M?", a: "Oczywiście. Boks M bez problemu pomieści motor lub skuter plus dodatkowe rzeczy. Pamiętaj o opróżnieniu zbiornika paliwa." },
        { q: "Ile europalet zmieści się w Boksie M?", a: "Boks M mieści 12 europalet, co sprawia, że jest idealny dla małych firm potrzebujących magazynu na towar." },
        { q: "Czy Boks M to dobry wybór na czas remontu?", a: "Tak, to nasz najpopularniejszy wybór na czas remontu. Mieści meble z typowego mieszkania i jest w przystępnej cenie." },
      ],
      en: [
        { q: "Will furniture from my apartment fit in Box M?", a: "Yes! Box M (6 m², 12 m³) fits furniture from an apartment up to 50 m² — sofa, bed, wardrobe, table with chairs, and many boxes." },
        { q: "Can I store a motorcycle in Box M?", a: "Of course. Box M easily fits a motorcycle or scooter plus additional items. Remember to empty the fuel tank." },
        { q: "How many europallets fit in Box M?", a: "Box M fits 12 europallets, making it ideal for small businesses needing storage for goods." },
        { q: "Is Box M a good choice during renovation?", a: "Yes, it's our most popular choice during renovation. It fits furniture from a typical apartment at an affordable price." },
      ],
    },
    segments: {
      pl: [
        { slug: "remont-przeprowadzka", name: "Remont i przeprowadzka" },
        { slug: "dla-firm", name: "Dla firm" },
      ],
      en: [
        { slug: "remont-przeprowadzka", name: "Renovation & moving" },
        { slug: "dla-firm", name: "For business" },
      ],
    },
  },
  "boks-l": {
    id: "l",
    name: "Boks L",
    subtitle: { pl: "duży magazyn 12 m²", en: "large unit 12 m²" },
    size: "12 m²",
    dimensions: "2 m × 6 m × 2 m",
    volume: "24 m³",
    height: "2 m",
    pallets: 24,
    priceFrom: 250,
    priceRegular: 500,
    color: "bg-slate-700",
    icon: Layers,
    typeId: "93bd21f7-77d9-ef11-88f8-000d3a1d3d62",
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
    faq: {
      pl: [
        { q: "Czy w Boksie L zmieszczą się meble z domu?", a: "Tak! Boks L (12 m², 24 m³) mieści kompletne wyposażenie domu do 100 m² — wszystkie meble, AGD i kartony z rzeczami." },
        { q: "Ile europalet zmieści się w Boksie L?", a: "Boks L mieści 24 europalety, co czyni go profesjonalnym rozwiązaniem magazynowym dla firm z dużą ilością towaru." },
        { q: "Czy mogę przechowywać sprzęt budowlany?", a: "Tak, Boks L idealnie nadaje się do przechowywania maszyn i sprzętu budowlanego. Szeroki wjazd ułatwia załadunek." },
        { q: "Czy Boks L nadaje się dla firm e-commerce?", a: "Zdecydowanie! 24 europalety to duża przestrzeń na towar. Dostęp 24/7 pozwala realizować zamówienia o każdej porze." },
        { q: "Czy wystawiacie faktury VAT?", a: "Tak, wystawiamy faktury VAT dla wszystkich klientów firmowych." },
      ],
      en: [
        { q: "Will furniture from my house fit in Box L?", a: "Yes! Box L (12 m², 24 m³) fits complete furnishings from a house up to 100 m² — all furniture, appliances, and boxes." },
        { q: "How many europallets fit in Box L?", a: "Box L fits 24 europallets, making it a professional storage solution for businesses with large inventory." },
        { q: "Can I store construction equipment?", a: "Yes, Box L is ideal for storing machines and construction equipment. The wide entrance makes loading easy." },
        { q: "Is Box L suitable for e-commerce businesses?", a: "Definitely! 24 europallets provide ample space for inventory. 24/7 access allows order fulfillment at any time." },
        { q: "Do you issue VAT invoices?", a: "Yes, we issue VAT invoices for all business clients." },
      ],
    },
    segments: {
      pl: [
        { slug: "dla-firm", name: "Dla firm" },
        { slug: "dla-sklepow-internetowych", name: "Dla e-commerce" },
        { slug: "dla-firm-budowlanych", name: "Dla firm budowlanych" },
      ],
      en: [
        { slug: "dla-firm", name: "For business" },
        { slug: "dla-sklepow-internetowych", name: "For e-commerce" },
        { slug: "dla-firm-budowlanych", name: "For construction" },
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
      siteName: 'LOCKIT Self Storage',
      locale: isPl ? 'pl_PL' : 'en_US',
      type: "website",
      images: [{
        url: 'https://lockit.pl/og-image.jpg',
        width: 1200,
        height: 630,
        alt: `${box.name} LOCKIT Szczecin`,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${box.name} — ${box.size} | LOCKIT Szczecin`,
      description: isPl ? box.description.pl : box.description.en,
      images: ['https://lockit.pl/og-image.jpg'],
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

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${box.name} — ${box.size}`,
    description: isPl ? box.description.pl : box.description.en,
    brand: {
      "@type": "Brand",
      name: "LOCKIT Self Storage",
    },
    offers: {
      "@type": "Offer",
      price: box.priceFrom,
      priceCurrency: "PLN",
      priceValidUntil: "2026-12-31",
      availability: "https://schema.org/InStock",
      url: `https://lockit.pl${basePath}/boksy/szczecin/${boxSize}/`,
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (isPl ? box.faq.pl : box.faq.en).map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  }

  return (
    <>
      <JsonLd data={productSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

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
                        <a href={`https://wynajmij.lockit.pl/rent?step=1&typeId=${box.typeId}`} target="_blank" rel="noopener noreferrer">
                          {isPl ? "Wynajmij teraz" : "Rent Now"}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                      <Button asChild variant="outline" size="lg">
                        <a href="tel:+48666030717">{isPl ? "Zadzwoń" : "Call"}</a>
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

        {/* Size Comparison Table */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">{isPl ? "Porównaj rozmiary boksów" : "Compare unit sizes"}</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold">{isPl ? "Rozmiar" : "Size"}</th>
                      <th className="text-left py-3 px-4 font-semibold">{isPl ? "Powierzchnia" : "Area"}</th>
                      <th className="text-left py-3 px-4 font-semibold">{isPl ? "Pojemność" : "Capacity"}</th>
                      <th className="text-left py-3 px-4 font-semibold">{isPl ? "Cena od" : "Price from"}</th>
                      <th className="py-3 px-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {validBoxSizes.map((size) => {
                      const b = boxesData[size]
                      const isCurrentBox = size === boxSize
                      return (
                        <tr key={size} className={`border-b ${isCurrentBox ? "bg-primary/5" : ""}`}>
                          <td className="py-3 px-4 font-medium">
                            {b.name}
                            {isCurrentBox && <Badge className="ml-2 text-xs">{isPl ? "Aktualny" : "Current"}</Badge>}
                          </td>
                          <td className="py-3 px-4">{b.size}</td>
                          <td className="py-3 px-4">{b.volume}</td>
                          <td className="py-3 px-4 font-semibold">{b.priceFrom} zł</td>
                          <td className="py-3 px-4">
                            {!isCurrentBox && (
                              <Link 
                                href={`${basePath}/boksy/szczecin/${size}/`}
                                className="text-primary hover:underline text-sm"
                              >
                                {isPl ? "Zobacz" : "View"} →
                              </Link>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Recommended Segments */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">{isPl ? "Polecane dla Ciebie" : "Recommended for you"}</h2>
              <div className="flex flex-wrap gap-3">
                {(isPl ? box.segments.pl : box.segments.en).map((segment) => (
                  <Link
                    key={segment.slug}
                    href={`${basePath}/${segment.slug}/`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-background border rounded-lg hover:border-primary transition-colors"
                  >
                    <ArrowRight className="w-4 h-4 text-primary" />
                    {segment.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">
                {isPl ? `Najczęstsze pytania o ${box.name}` : `FAQ about ${box.name}`}
              </h2>
              <div className="space-y-4">
                {(isPl ? box.faq.pl : box.faq.en).map((item, index) => (
                  <Card key={index}>
                    <CardContent className="p-5">
                      <h3 className="font-semibold mb-2">{item.q}</h3>
                      <p className="text-muted-foreground">{item.a}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-gradient-to-r from-brand-deep to-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                {isPl ? `Wynajmij ${box.name} już dziś` : `Rent ${box.name} today`}
              </h2>
              <p className="text-white/80 mb-8">
                {isPl 
                  ? "Wynajem online w 5 minut. Dostęp 24/7. -50% na pierwszy miesiąc."
                  : "Online rental in 5 minutes. 24/7 access. -50% first month."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary">
                  <a href={`https://wynajmij.lockit.pl/rent?step=1&typeId=${box.typeId}`} target="_blank" rel="noopener noreferrer">
                    {isPl ? `Wynajmij ${box.name}` : `Rent ${box.name}`}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
                  <a href="tel:+48666030717">
                    {isPl ? "Zadzwoń: +48 666 030 717" : "Call: +48 666 030 717"}
                  </a>
                </Button>
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
