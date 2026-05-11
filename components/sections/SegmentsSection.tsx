import Link from 'next/link';
import { User, Building2, Wrench, Archive, GraduationCap, ArrowRight } from 'lucide-react';
import type { Dictionary } from '@/lib/i18n/getDictionary';
import type { Locale } from '@/lib/i18n/config';

interface SegmentsSectionProps {
  dict: Dictionary;
  locale: Locale;
}

const segmentLinks = [
  '/dla-klientow-indywidualnych',
  '/dla-firm',
  '/remont-przeprowadzka',
  '/archiwum-dokumentow',
  '/dla-studentow',
];

const icons = [User, Building2, Wrench, Archive, GraduationCap];

const colors = [
  'bg-brand/10 text-brand',
  'bg-amber-500/10 text-amber-600',
  'bg-purple-500/10 text-purple-600',
  'bg-rose-500/10 text-rose-600',
  'bg-teal-500/10 text-teal-600',
];

export default function SegmentsSection({ dict, locale }: SegmentsSectionProps) {
  const t = dict;
  const prefix = locale === 'en' ? '/en' : '';

  return (
    <section className="section-padding bg-secondary">
      <div className="container-wide mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">{t.segments.heading}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{t.segments.sub}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {t.segments.items.map((item, index) => {
            const Icon = icons[index];
            return (
              <Link
                key={index}
                href={`${prefix}${segmentLinks[index]}`}
                className="group bg-card rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border border-border hover:border-brand/30"
              >
                <div className={`w-12 h-12 rounded-xl ${colors[index]} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-card-foreground group-hover:text-brand transition-colors">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                <div className="mt-4 flex items-center text-sm font-medium text-brand opacity-0 group-hover:opacity-100 transition-opacity">
                  {t.common.learnMore}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
