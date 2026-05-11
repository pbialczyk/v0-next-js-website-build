import type { Metadata } from 'next';
import { getDictionary } from '@/lib/i18n/getDictionary';
import { type Locale, isValidLocale } from '@/lib/i18n/config';
import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import BoxesSection from '@/components/sections/BoxesSection';
import SegmentsSection from '@/components/sections/SegmentsSection';
import ReviewsSection from '@/components/sections/ReviewsSection';
import FAQSection from '@/components/sections/FAQSection';
import ContactSection from '@/components/sections/ContactSection';
import { JsonLd } from '@/components/seo/JsonLd';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = isValidLocale(locale) ? locale : 'pl';
  const dict = getDictionary(validLocale as Locale);

  const baseUrl = 'https://lockit.pl';
  const url = validLocale === 'en' ? `${baseUrl}/en` : baseUrl;

  return {
    title: dict.seo.home.title,
    description: dict.seo.home.description,
    alternates: {
      canonical: url,
      languages: {
        'pl': baseUrl,
        'en': `${baseUrl}/en`,
      },
    },
    openGraph: {
      title: dict.seo.home.title,
      description: dict.seo.home.description,
      url,
      siteName: 'LOCKIT self storage',
      locale: validLocale === 'en' ? 'en_US' : 'pl_PL',
      type: 'website',
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'LOCKIT Self Storage Szczecin',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.seo.home.title,
      description: dict.seo.home.description,
      images: [`${baseUrl}/og-image.jpg`],
    },
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const validLocale = isValidLocale(locale) ? locale : 'pl';
  const dict = getDictionary(validLocale as Locale);

  // JSON-LD Schema for SelfStorage + FAQPage
  const selfStorageSchema = {
    '@context': 'https://schema.org',
    '@type': 'SelfStorage',
    name: 'LOCKIT Self Storage Szczecin',
    description: dict.seo.home.description,
    url: 'https://lockit.pl',
    telephone: '+48666030717',
    email: 'info@lockit.pl',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ul. Gdańska 14C',
      addressLocality: 'Szczecin',
      postalCode: '70-661',
      addressCountry: 'PL',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 53.4366128,
      longitude: 14.5541361,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
    priceRange: '125-250 PLN/miesiąc',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '40',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: dict.homeFaq.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <>
      <JsonLd data={selfStorageSchema} />
      <JsonLd data={faqSchema} />
      <HeroSection dict={dict} />
      <FeaturesSection dict={dict} />
      <BoxesSection dict={dict} />
      <SegmentsSection dict={dict} locale={validLocale as Locale} />
      <ReviewsSection dict={dict} />
      <FAQSection dict={dict} locale={validLocale as Locale} />
      <ContactSection dict={dict} />
    </>
  );
}
