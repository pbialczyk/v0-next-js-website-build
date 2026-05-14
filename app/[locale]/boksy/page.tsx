import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { getDictionary } from "@/lib/i18n/getDictionary"
import { locales, defaultLocale } from "@/lib/i18n/config"
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

  const title = isPl ? "Boksy i cennik — LOCKIT Self Storage" : "Storage Units & Pricing — LOCKIT Self Storage";
  const description = isPl
    ? "Boksy magazynowe self storage. Wybierz lokalizację i rozmiar boksu. Ceny od 125 zł/mies. Wynajem online w 5 minut."
    : "Self storage units. Choose location and box size. Prices from 125 PLN/month. Online rental in 5 minutes.";
  const url = isPl ? "https://lockit.pl/boksy/" : "https://lockit.pl/en/boksy/";

  return {
    title, description,
    alternates: { canonical: url, languages: { pl: "https://lockit.pl/boksy/", en: "https://lockit.pl/en/boksy/" } },
    openGraph: { title, description, url, siteName: 'LOCKIT Self Storage', locale: isPl ? 'pl_PL' : 'en_US', type: 'website', images: [{ url: 'https://lockit.pl/og-image.jpg', width: 1200, height: 630, alt: 'LOCKIT Boksy' }] },
    twitter: { card: 'summary_large_image', title, description, images: ['https://lockit.pl/og-image.jpg'] },
  }
}

const boxesMeta = [
  {
    id: 's',
    label: 'S',
    title: { pl: 'Mały box 3m²', en: 'Small box 3m²' },
    image: '/boxes/boks-s-256.webp',
    width: 256,
    height: 236,
    dimensions: '150×200×200cm',
    description: {
      pl: 'Sprawdzi się jako komórka lokatorska do przechowywania kartonów, drobnych mebli czy narzędzi ogrodowych. Towar z 6 EUR/palet.',
      en: 'Perfect as a storage cell for boxes, small furniture or garden tools. Fits 6 EUR/pallets.',
    },
    pricePromo: 125,
    priceRegular: 250,
    priceVat: '153,75',
    detailLink: '/boksy/szczecin/boks-s',
    ctaLink: 'https://wynajmij.lockit.pl/rent?step=1&typeId=32769a88-77d9-ef11-88f8-000d3a1d3d62',
  },
  {
    id: 'm',
    label: 'M',
    title: { pl: 'Średni box 6m²', en: 'Medium box 6m²' },
    image: '/boxes/boks-m-256.webp',
    width: 256,
    height: 200,
    dimensions: '200×300×200cm',
    description: {
      pl: 'Doskonałe rozwiązanie do przechowywania rowerów, motoru, nart lub mebli z mieszkania do 50 m². Towar z 12 EUR/palet.',
      en: 'Excellent solution for storing bicycles, motorcycles, skis or furniture from an apartment up to 50 m². Fits 12 EUR/pallets.',
    },
    pricePromo: 175,
    priceRegular: 350,
    priceVat: '215,25',
    detailLink: '/boksy/szczecin/boks-m',
    ctaLink: 'https://wynajmij.lockit.pl/rent?step=1&typeId=531f0bd3-77d9-ef11-88f8-000d3a1d3d62',
  },
  {
    id: 'l',
    label: 'L',
    title: { pl: 'Duży box 12m²', en: 'Large box 12m²' },
    image: '/boxes/boks-l-256.webp',
    width: 256,
    height: 181,
    dimensions: '200×600×200cm',
    description: {
      pl: 'To duża przestrzeń często wybierana przez firmy. Idealna dla mebli, sprzętu sportowego, maszyn, narzędzi i materiałów budowlanych. To aż 24 m³!',
      en: 'Large space often chosen by businesses. Ideal for furniture, sports equipment, machinery, tools and building materials. Up to 24 m³!',
    },
    pricePromo: 250,
    priceRegular: 500,
    priceVat: '307,50',
    detailLink: '/boksy/szczecin/boks-l',
    ctaLink: 'https://wynajmij.lockit.pl/rent?step=1&typeId=93bd21f7-77d9-ef11-88f8-000d3a1d3d62',
  },
];

export default async function BoksyPage({ params }: Props) {
  const { locale } = await params
  const dict = await getDictionary(locale)
  const isPl = locale === "pl" || locale === defaultLocale
  const basePath = locale === defaultLocale ? "" : `/${locale}`

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: isPl ? "Boksy magazynowe LOCKIT" : "LOCKIT Storage Units",
    itemListElement: boxesMeta.map((box, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: isPl ? box.title.pl : box.title.en,
        description: isPl ? box.description.pl : box.description.en,
        url: `https://lockit.pl${basePath}${box.detailLink}/`,
        offers: {
          "@type": "Offer",
          price: box.pricePromo,
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
        {/* Boxes Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {boxesMeta.map((box, index) => (
                <div 
                  key={box.id} 
                  className="flex flex-col items-center text-center animate-fade-in-up h-full"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Black circular badge */}
                  <div className="w-20 h-20 rounded-full bg-foreground flex items-center justify-center mb-6">
                    <span className="text-3xl font-bold text-background">{box.label}</span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-foreground mb-4">
                    {isPl ? box.title.pl : box.title.en}
                  </h2>

                  {/* Image */}
                  <div className="relative w-full h-44 mb-4 flex items-center justify-center">
                    <Image
                      src={box.image}
                      alt={isPl ? box.title.pl : box.title.en}
                      width={box.width}
                      height={box.height}
                      className="w-auto h-full object-contain"
                      loading="lazy"
                    />
                  </div>

                  {/* Dimensions */}
                  <p className="font-bold text-foreground mb-3">{box.dimensions}</p>

                  {/* Description - fixed height for alignment */}
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed max-w-xs min-h-[80px]">
                    {isPl ? box.description.pl : box.description.en}
                  </p>

                  {/* Pricing section - pushed to bottom */}
                  <div className="mt-auto w-full">
                    {/* Pricing */}
                    <div className="mb-4">
                      <div className="flex items-baseline justify-center gap-2 mb-1">
                        <span className="text-lg text-muted-foreground line-through">
                          {box.priceRegular}
                        </span>
                        <span className="text-2xl font-bold text-foreground">
                          {box.pricePromo} {isPl ? 'zł/miesiąc' : 'PLN/month'}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-red-500 mb-2">
                        {isPl ? '-50% przez 1 miesiąc' : '-50% for 1 month'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {box.priceVat} {isPl ? 'zł z VAT' : 'PLN incl. VAT'}
                      </p>
                    </div>

                    {/* Legal price info */}
                    <div className="text-xs text-muted-foreground/70 mb-6 space-y-0.5">
                      <p>{isPl ? 'najniższa cena z przed 30 dni przed obniżką:' : 'lowest price from 30 days before discount:'}</p>
                      <p>
                        {box.pricePromo}{isPl ? 'zł/miesiąc' : 'PLN/month'}, {isPl ? 'cena regularna' : 'regular price'} {box.priceRegular} {isPl ? 'zł/miesiąc' : 'PLN/month'}
                      </p>
                    </div>

                    {/* CTA Button */}
                    <div className="w-full max-w-xs mx-auto space-y-3">
                      <a
                        href={box.ctaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-[#c8e94d] hover:bg-[#b8d93d] text-foreground py-3 px-6 rounded-lg font-bold text-sm transition-colors text-center"
                      >
                        {isPl ? 'Wynajmij teraz' : 'Rent now'}
                      </a>
                    <Link
                      href={`${basePath}${box.detailLink}/`}
                      className="block text-muted-foreground hover:text-foreground py-2 text-sm transition-colors"
                    >
                      {isPl ? 'Dowiedz się więcej →' : 'Learn more →'}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
