import { Phone, Mail, MapPin } from 'lucide-react';
import type { Dictionary } from '@/lib/i18n/getDictionary';

interface ContactSectionProps {
  dict: Dictionary;
}

export default function ContactSection({ dict }: ContactSectionProps) {
  const t = dict;

  return (
    <section className="section-padding">
      <div className="container-narrow mx-auto">
        <div className="bg-brand-deep rounded-3xl p-8 lg:p-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-hero-foreground">{t.homeContact.heading}</h2>
          <p className="mt-4 text-lg text-hero-muted max-w-2xl mx-auto">{t.homeContact.sub}</p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="tel:+48666030717"
              className="flex items-center gap-3 bg-white/10 backdrop-blur text-hero-foreground px-6 py-4 rounded-xl hover:bg-white/20 transition-colors"
            >
              <Phone className="w-5 h-5 text-brand" />
              <span className="font-semibold">+48 666 030 717</span>
            </a>
            <a
              href="mailto:info@lockit.pl"
              className="flex items-center gap-3 bg-white/10 backdrop-blur text-hero-foreground px-6 py-4 rounded-xl hover:bg-white/20 transition-colors"
            >
              <Mail className="w-5 h-5 text-brand" />
              <span className="font-semibold">info@lockit.pl</span>
            </a>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-hero-muted">
            <MapPin className="w-5 h-5 text-brand" />
            <span>{t.homeContact.address}</span>
          </div>

          <div className="mt-10">
            <a
              href="https://wynajmij.lockit.pl"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block gradient-brand text-foreground px-10 py-4 rounded-xl text-lg font-bold hover:opacity-90 transition-opacity"
            >
              {t.common.rentBox}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
