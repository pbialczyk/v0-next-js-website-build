import { Clock, Shield, CalendarCheck, Maximize, MapPin, Users } from 'lucide-react';
import type { Dictionary } from '@/lib/i18n/getDictionary';

interface FeaturesSectionProps {
  dict: Dictionary;
}

const icons = [Clock, Shield, CalendarCheck, Maximize, MapPin, Users];

export default function FeaturesSection({ dict }: FeaturesSectionProps) {
  const t = dict;

  return (
    <section className="section-padding bg-brand-50">
      <div className="container-wide mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">{t.features.heading}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{t.features.sub}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.features.items.map((item, index) => {
            const Icon = icons[index];
            return (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-border"
              >
                <div className="w-12 h-12 rounded-xl gradient-brand flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="text-lg font-bold text-card-foreground">{item.title}</h3>
                <p className="mt-2 text-muted-foreground">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
