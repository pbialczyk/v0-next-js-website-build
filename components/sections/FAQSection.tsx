import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { Dictionary } from '@/lib/i18n/getDictionary';
import type { Locale } from '@/lib/i18n/config';

interface FAQSectionProps {
  dict: Dictionary;
  locale: Locale;
}

export default function FAQSection({ dict, locale }: FAQSectionProps) {
  const t = dict;
  const prefix = locale === 'en' ? '/en' : '';

  return (
    <section className="section-padding bg-secondary">
      <div className="container-narrow mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">{t.homeFaq.heading}</h2>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {t.homeFaq.items.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card rounded-xl border border-border px-6"
            >
              <AccordionTrigger className="text-left font-semibold text-card-foreground hover:no-underline py-4">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center mt-10">
          <Link
            href={`${prefix}/faq`}
            className="inline-flex items-center text-brand font-semibold hover:underline"
          >
            {t.homeFaq.seeAll}
          </Link>
        </div>
      </div>
    </section>
  );
}
