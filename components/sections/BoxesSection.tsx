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
    image: '/boxes/boks-s-256.webp',
    width: 256,
    height: 236,
    price: 'od 125',
    priceEn: 'from 125',
    priceRegular: '250',
    detailLink: '/boksy/szczecin/boks-s',
    ctaLink: 'https://wynajmij.lockit.pl/rent?step=1&typeId=32769a88-77d9-ef11-88f8-000d3a1d3d62',
    featured: false,
  },
  {
    id: 'm',
    label: 'M',
    image: '/boxes/boks-m-256.webp',
    width: 256,
    height: 200,
    price: 'od 175',
    priceEn: 'from 175',
    priceRegular: '350',
    detailLink: '/boksy/szczecin/boks-m',
    ctaLink: 'https://wynajmij.lockit.pl/rent?step=1&typeId=531f0bd3-77d9-ef11-88f8-000d3a1d3d62',
    featured: true,
  },
  {
    id: 'l',
    label: 'L',
    image: '/boxes/boks-l-256.webp',
    width: 256,
    height: 181,
    price: 'od 250',
    priceEn: 'from 250',
    priceRegular: '500',
    detailLink: '/boksy/szczecin/boks-l',
    ctaLink: 'https://wynajmij.lockit.pl/rent?step=1&typeId=93bd21f7-77d9-ef11-88f8-000d3a1d3d62',
    featured: false,
  },
];

export function BoxesSection({ dict, locale }: BoxesSectionProps) {
  const t = dict;
  const isEn = locale === 'en';

  return (
    <section className="section-padding bg-brand-deep" id="oferta">
      <div className="container-wide mx-auto">
        <h2 className="text-center text-3xl font-extrabold text-primary-foreground mb-4">
          {t.offer.heading}
        </h2>
        <p className="text-center text-brand-light/80 max-w-xl mx-auto mb-12">
          {t.offer.sub}
        </p>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {boxesMeta.map((box, index) => {
            const tBox = t.offer.boxes[index];
            if (!tBox) return null;

            return (
              <AnimatedCard key={box.id} delay={index * 150} className="h-full">
                <div
                  className={`relative rounded-2xl overflow-hidden border-2 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl h-full flex flex-col ${
                    box.featured
                      ? 'border-accent bg-brand/50 scale-[1.03]'
                      : 'border-brand/40 bg-brand/30'
                  }`}
                >
                  {box.featured && (
                    <div className="bg-accent text-accent-foreground text-center py-1.5 text-xs font-bold tracking-wide uppercase">
                      {t.offer.featured}
                    </div>
                  )}

                  <div className="p-6 text-center flex flex-col flex-1">
                    <div className="relative mx-auto mb-3 w-36 h-32 flex items-center justify-center rounded-xl overflow-hidden" style={{ backgroundColor: '#f5f5f5' }}>
                      <Image
                        src={box.image}
                        alt={tBox.name}
                        width={box.width}
                        height={box.height}
                        className="w-full h-auto object-contain mix-blend-multiply"
                        loading="lazy"
                      />
                    </div>

                    <div className="text-3xl font-extrabold text-primary-foreground mb-2">
                      {box.label}
                    </div>

                    <h3 className="text-lg font-bold text-primary-foreground mb-1">
                      {tBox.name}
                    </h3>

                    <p className="text-sm text-brand-light/80 mb-4 flex-1">
                      {tBox.desc}
                    </p>

                    <div className="mb-4">
                      <span className="text-3xl font-extrabold text-primary-foreground">
                        {isEn ? box.priceEn : box.price}
                      </span>
                      <span className="text-brand-light/60 text-sm"> {t.common.monthAbbr}</span>
                      <div className="text-xs text-brand-light/50 line-through">
                        {box.priceRegular} {t.common.monthAbbr}
                      </div>
                      <div className="text-xs text-accent font-semibold mt-1">
                        {t.common.discount}
                      </div>
                    </div>

                    <div className="space-y-2 mt-auto">
                      <a
                        href={box.ctaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block gradient-brand text-foreground py-3 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity"
                      >
                        {t.common.rentNow}
                      </a>
                      <Link
                        href={`/${locale}${box.detailLink}`}
                        className="block text-brand-light/70 hover:text-primary-foreground py-2 text-sm transition-colors"
                      >
                        {t.common.learnMore}
                      </Link>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default BoxesSection;
