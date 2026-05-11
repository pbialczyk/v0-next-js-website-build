import { Phone } from 'lucide-react';
import type { Dictionary } from '@/lib/i18n/getDictionary';

interface HeroSectionProps {
  dict: Dictionary;
}

export default function HeroSection({ dict }: HeroSectionProps) {
  const t = dict;

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-hero-bg">
        <div className="absolute inset-0 hero-overlay" />
        {/* Decorative gradient */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-brand/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative container-wide mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="max-w-4xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-hero-foreground leading-tight animate-fade-in-up">
            <span className="block">{t.hero.title1}</span>
            <span className="block text-gradient-brand">{t.hero.title2}</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-hero-muted max-w-2xl animate-fade-in-up animation-delay-200">
            {t.hero.subtitle}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-400">
            <a
              href="https://wynajmij.lockit.pl"
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-brand text-foreground px-8 py-4 rounded-xl text-lg font-bold hover:opacity-90 transition-opacity text-center"
            >
              {t.common.rentBox}
            </a>
            <a
              href="tel:+48666030717"
              className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur text-hero-foreground px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/20 transition-colors border border-white/20"
            >
              <Phone className="w-5 h-5" />
              {t.hero.callUs}
            </a>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-brand">24/7</div>
              <div className="text-sm text-hero-muted mt-1">Dostęp</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-brand">3-12</div>
              <div className="text-sm text-hero-muted mt-1">m² boksów</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-brand">5.0</div>
              <div className="text-sm text-hero-muted mt-1">Google</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
