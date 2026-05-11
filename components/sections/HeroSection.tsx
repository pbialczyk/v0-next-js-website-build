'use client';

import { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import type { Dictionary } from '@/lib/i18n/getDictionary';

interface HeroSectionProps {
  dict: Dictionary;
}

export function HeroSection({ dict }: HeroSectionProps) {
  const [showVideo, setShowVideo] = useState(false);
  const t = dict;

  useEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;
    if (!isDesktop) return;

    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(() => setShowVideo(true), { timeout: 3000 });
    } else {
      timeoutId = setTimeout(() => setShowVideo(true), 2000);
    }

    return () => {
      if (idleId !== undefined && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-black">
      {/* Mobile: Responsive picture with AVIF/WebP */}
      <picture className="md:hidden">
        <source
          type="image/avif"
          srcSet="/hero/hero-storage-640.avif 640w, /hero/hero-storage-1024.avif 1024w"
          sizes="(max-width: 640px) 100vw, 640px"
        />
        <source
          type="image/webp"
          srcSet="/hero/hero-storage-640.webp 640w, /hero/hero-storage-1024.webp 1024w"
          sizes="(max-width: 640px) 100vw, 640px"
        />
        <img
          src="/hero/hero-storage-640.avif"
          alt=""
          fetchPriority="high"
          decoding="async"
          width={640}
          height={853}
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        />
      </picture>

      {/* Desktop: Lazy-loaded video background */}
      {showVideo && (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          className="hidden md:block absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video/hero-bg.mp4" type="video/mp4" />
        </video>
      )}

      {/* Desktop fallback image while video loads */}
      <picture className="hidden md:block">
        <source
          type="image/avif"
          srcSet="/hero/hero-storage-1024.avif"
        />
        <source
          type="image/webp"
          srcSet="/hero/hero-storage-1024.webp"
        />
        <img
          src="/hero/hero-storage-1024.avif"
          alt=""
          fetchPriority="high"
          decoding="async"
          width={1024}
          height={683}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${showVideo ? 'opacity-0' : 'opacity-100'}`}
          aria-hidden="true"
        />
      </picture>

      {/* Dark gradient overlay */}
      <div className="hero-overlay absolute inset-0" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-primary-foreground leading-tight mb-6 animate-fade-in-up">
          <span className="block">{t.hero.title1}</span>
          <span className="block text-gradient-brand">{t.hero.title2}</span>
        </h1>

        <p className="text-lg sm:text-xl text-hero-muted mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
          {t.hero.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
          <a
            href="https://wynajmij.lockit.pl"
            target="_blank"
            rel="noopener noreferrer"
            className="gradient-brand text-foreground px-8 py-4 rounded-xl text-lg font-bold hover:opacity-90 transition-opacity shadow-lg"
          >
            {t.common.rentBox}
          </a>
          <a
            href="tel:+48666030717"
            className="flex items-center justify-center gap-3 border-2 border-brand-light/30 text-primary-foreground px-8 py-4 rounded-xl text-lg font-semibold hover:bg-brand-light/10 transition-colors"
          >
            <Phone className="w-5 h-5" />
            {t.hero.callUs}
          </a>
        </div>

        {/* Stats - value add from v0 */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
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
    </section>
  );
}

export default HeroSection;
