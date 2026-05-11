import { Plus_Jakarta_Sans } from 'next/font/google';
import { notFound } from 'next/navigation';
import { locales, type Locale, isValidLocale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/getDictionary';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-sans',
  display: 'swap',
});

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dict = getDictionary(locale as Locale);

  return (
    <div className={`${plusJakarta.variable} font-sans`}>
      <Navbar dict={dict} locale={locale as Locale} />
      <main className="pt-16 lg:pt-20">{children}</main>
      <Footer dict={dict} locale={locale as Locale} />
    </div>
  );
}
