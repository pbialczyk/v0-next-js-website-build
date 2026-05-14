'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Dictionary } from '@/lib/i18n/getDictionary';
import type { Locale } from '@/lib/i18n/config';
import { AnimatedCard } from '@/components/ui/AnimatedCard';

interface BoxesSectionProps {
  dict: Dictionary;
  locale: Locale;
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

export function BoxesSection({ dict, locale }: BoxesSectionProps) {
  const t = dict;
  const isEn = locale === 'en';

  return (
    <section className="py-16 md:py-24 bg-background" id="oferta">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl md:text-4xl font-bold text-foreground mb-4">
          {t.offer.heading}
        </h2>
        <p className="text-center text-muted-foreground max-w-xl mx-auto mb-12">
          {t.offer.sub}
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {boxesMeta.map((box, index) => (
            <AnimatedCard key={box.id} delay={index * 150} className="h-full">
              <div className="flex flex-col items-center text-center h-full">
                {/* Black circular badge */}
                <div className="w-20 h-20 rounded-full bg-foreground flex items-center justify-center mb-6">
                  <span className="text-3xl font-bold text-background">{box.label}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground mb-4">
                  {isEn ? box.title.en : box.title.pl}
                </h3>

                {/* Image */}
                <div className="relative w-full h-40 mb-4 flex items-center justify-center">
                  <Image
                    src={box.image}
                    alt={isEn ? box.title.en : box.title.pl}
                    width={box.width}
                    height={box.height}
                    className="w-auto h-full object-contain"
                    loading="lazy"
                  />
                </div>

                {/* Dimensions */}
                <p className="font-bold text-foreground mb-3">{box.dimensions}</p>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  {isEn ? box.description.en : box.description.pl}
                </p>

                {/* Pricing */}
                <div className="mb-4">
                  <div className="flex items-baseline justify-center gap-2 mb-1">
                    <span className="text-lg text-muted-foreground line-through">
                      {box.priceRegular}
                    </span>
                    <span className="text-2xl font-bold text-foreground">
                      {box.pricePromo} {isEn ? 'PLN/month' : 'zł/miesiąc'}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-red-500 mb-2">
                    {isEn ? '-50% for 1 month' : '-50% przez 1 miesiąc'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {box.priceVat} {isEn ? 'PLN incl. VAT' : 'zł z VAT'}
                  </p>
                </div>

                {/* Legal price info */}
                <div className="text-xs text-muted-foreground/70 mb-4 space-y-0.5">
                  <p>{isEn ? 'lowest price from 30 days before discount:' : 'najniższa cena z przed 30 dni przed obniżką:'}</p>
                  <p>
                    {box.pricePromo}{isEn ? 'PLN/month' : 'zł/miesiąc'}, {isEn ? 'regular price' : 'cena regularna'} {box.priceRegular} {isEn ? 'PLN/month' : 'zł/miesiąc'}
                  </p>
                </div>

                {/* CTA Button */}
                <div className="mt-auto w-full space-y-2">
                  <a
                    href={box.ctaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-[#c8e94d] hover:bg-[#b8d93d] text-foreground py-3 px-6 rounded-lg font-bold text-sm transition-colors"
                  >
                    {t.common.rentNow}
                  </a>
                  <Link
                    href={`/${locale}${box.detailLink}`}
                    className="block text-muted-foreground hover:text-foreground py-2 text-sm transition-colors"
                  >
                    {t.common.learnMore}
                  </Link>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BoxesSection;
