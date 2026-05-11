import { Badge } from '@/components/ui/badge';
import type { Dictionary } from '@/lib/i18n/getDictionary';

interface BoxesSectionProps {
  dict: Dictionary;
}

const boxData = [
  { size: 'S', area: '3 m²', price: '125', volume: '6 m³' },
  { size: 'M', area: '6 m²', price: '175', volume: '12 m³', featured: true },
  { size: 'L', area: '12 m²', price: '250', volume: '24 m³' },
];

export default function BoxesSection({ dict }: BoxesSectionProps) {
  const t = dict;

  return (
    <section className="section-padding">
      <div className="container-wide mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">{t.offer.heading}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{t.offer.sub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.offer.boxes.map((box, index) => {
            const data = boxData[index];
            return (
              <div
                key={index}
                className={`relative bg-card rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow border ${
                  data.featured ? 'border-brand ring-2 ring-brand/20' : 'border-border'
                }`}
              >
                {data.featured && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-brand text-foreground border-0">
                    {t.offer.featured}
                  </Badge>
                )}

                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-brand text-foreground text-2xl font-bold mb-4">
                    {data.size}
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground">{box.name}</h3>
                  <p className="text-muted-foreground mt-2">{box.desc}</p>
                </div>

                <div className="border-t border-border pt-6">
                  <div className="flex items-baseline justify-center gap-1 mb-4">
                    <span className="text-4xl font-bold text-foreground">{data.price}</span>
                    <span className="text-muted-foreground">{t.common.monthAbbr}</span>
                  </div>
                  <p className="text-sm text-center text-brand font-medium mb-4">{t.common.discount}</p>
                  <div className="flex justify-between text-sm text-muted-foreground mb-6">
                    <span>Powierzchnia: {data.area}</span>
                    <span>Pojemność: {data.volume}</span>
                  </div>
                  <a
                    href="https://wynajmij.lockit.pl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block text-center py-3 px-6 rounded-xl font-bold transition-colors ${
                      data.featured
                        ? 'gradient-brand text-foreground hover:opacity-90'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {t.common.rentNow}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
