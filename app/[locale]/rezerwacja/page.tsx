import type { Metadata } from 'next';
import Link from 'next/link';
import { getDictionary } from '@/lib/i18n/getDictionary';
import { locales, type Locale } from '@/lib/i18n/config';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, Phone, Mail, MapPin, Clock, Shield, Truck, Package } from 'lucide-react';
import { JsonLd } from '@/components/seo/JsonLd';

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isPolish = locale === 'pl';

  const title = isPolish
    ? 'Rezerwacja boksu self storage | LOCKIT Szczecin'
    : 'Book a self storage unit | LOCKIT Szczecin';

  const description = isPolish
    ? 'Zarezerwuj boks self storage online. Szybka rezerwacja, elastyczne warunki, dostęp 24/7. Wybierz rozmiar boksu i termin - skontaktujemy się w ciągu 24h.'
    : 'Book a self storage unit online. Fast reservation, flexible terms, 24/7 access. Choose your unit size and date - we will contact you within 24h.';

  return {
    title,
    description,
    alternates: {
      canonical: isPolish ? 'https://lockit.pl/rezerwacja' : 'https://lockit.pl/en/rezerwacja',
      languages: {
        'pl': 'https://lockit.pl/rezerwacja',
        'en': 'https://lockit.pl/en/rezerwacja',
      },
    },
    openGraph: {
      title,
      description,
      url: isPolish ? 'https://lockit.pl/rezerwacja' : 'https://lockit.pl/en/rezerwacja',
      siteName: 'LOCKIT Self Storage',
      locale: isPolish ? 'pl_PL' : 'en_US',
      type: 'website',
    },
  };
}

export default async function ReservationPage({ params }: PageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const isPolish = locale === 'pl';

  const benefits = isPolish
    ? [
        { icon: Clock, text: 'Odpowiedź w ciągu 24h' },
        { icon: Shield, text: 'Bez zobowiązań' },
        { icon: Truck, text: 'Darmowa pomoc przy przeprowadzce' },
        { icon: Package, text: 'Materiały do pakowania gratis' },
      ]
    : [
        { icon: Clock, text: 'Response within 24h' },
        { icon: Shield, text: 'No obligations' },
        { icon: Truck, text: 'Free moving assistance' },
        { icon: Package, text: 'Free packing materials' },
      ];

  const boxSizes = isPolish
    ? [
        { value: 'boks-s', label: 'Boks S (1-3 m²) - od 149 zł/mies.' },
        { value: 'boks-m', label: 'Boks M (4-6 m²) - od 249 zł/mies.' },
        { value: 'boks-l', label: 'Boks L (7-12 m²) - od 399 zł/mies.' },
        { value: 'nie-wiem', label: 'Nie wiem - pomóżcie mi wybrać' },
      ]
    : [
        { value: 'boks-s', label: 'Box S (1-3 m²) - from 149 PLN/mo' },
        { value: 'boks-m', label: 'Box M (4-6 m²) - from 249 PLN/mo' },
        { value: 'boks-l', label: 'Box L (7-12 m²) - from 399 PLN/mo' },
        { value: 'nie-wiem', label: "I don't know - help me choose" },
      ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: isPolish ? 'Rezerwacja boksu self storage' : 'Book a self storage unit',
    description: isPolish
      ? 'Formularz rezerwacji boksu self storage w LOCKIT Szczecin'
      : 'Self storage unit booking form at LOCKIT Szczecin',
    url: isPolish ? 'https://lockit.pl/rezerwacja' : 'https://lockit.pl/en/rezerwacja',
    mainEntity: {
      '@type': 'SelfStorage',
      name: 'LOCKIT Self Storage Szczecin',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'ul. Welecka 18',
        addressLocality: 'Szczecin',
        postalCode: '71-001',
        addressCountry: 'PL',
      },
      telephone: '+48 123 456 789',
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              {isPolish ? 'Zarezerwuj swój boks' : 'Book your storage unit'}
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              {isPolish
                ? 'Wypełnij formularz, a skontaktujemy się z Tobą w ciągu 24 godzin, żeby dopasować idealny boks do Twoich potrzeb.'
                : 'Fill out the form and we will contact you within 24 hours to match the perfect unit to your needs.'}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
            {/* Form */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">
                  {isPolish ? 'Formularz rezerwacji' : 'Reservation form'}
                </CardTitle>
                <CardDescription>
                  {isPolish
                    ? 'Wszystkie pola oznaczone * są wymagane'
                    : 'All fields marked with * are required'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">
                        {isPolish ? 'Imię *' : 'First name *'}
                      </Label>
                      <Input id="firstName" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">
                        {isPolish ? 'Nazwisko *' : 'Last name *'}
                      </Label>
                      <Input id="lastName" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      {isPolish ? 'Telefon *' : 'Phone *'}
                    </Label>
                    <Input id="phone" type="tel" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="boxSize">
                      {isPolish ? 'Rozmiar boksu *' : 'Unit size *'}
                    </Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={isPolish ? 'Wybierz rozmiar' : 'Select size'}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {boxSizes.map((size) => (
                          <SelectItem key={size.value} value={size.value}>
                            {size.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="startDate">
                      {isPolish ? 'Planowana data rozpoczęcia' : 'Planned start date'}
                    </Label>
                    <Input id="startDate" type="date" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">
                      {isPolish ? 'Dodatkowe informacje' : 'Additional information'}
                    </Label>
                    <Textarea
                      id="message"
                      placeholder={
                        isPolish
                          ? 'Opisz co chcesz przechować, jak długo planujesz wynajem, itp.'
                          : 'Describe what you want to store, how long you plan to rent, etc.'
                      }
                      rows={4}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    {isPolish ? 'Wyślij zapytanie' : 'Send inquiry'}
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    {isPolish
                      ? 'Wysyłając formularz, zgadzasz się z naszą '
                      : 'By submitting this form, you agree to our '}
                    <Link
                      href={`/${locale}/polityka-prywatnosci`}
                      className="text-primary underline hover:no-underline"
                    >
                      {isPolish ? 'polityką prywatności' : 'privacy policy'}
                    </Link>
                    .
                  </p>
                </form>
              </CardContent>
            </Card>

            {/* Info Sidebar */}
            <div className="space-y-8">
              {/* Benefits */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    {isPolish ? 'Co zyskujesz?' : 'What do you get?'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <benefit.icon className="h-5 w-5 text-primary" />
                        </div>
                        <span className="font-medium">{benefit.text}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    {isPolish ? 'Wolisz zadzwonić?' : 'Prefer to call?'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <a
                      href="tel:+48123456789"
                      className="font-medium hover:text-primary"
                    >
                      +48 123 456 789
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <a
                      href="mailto:kontakt@lockit.pl"
                      className="font-medium hover:text-primary"
                    >
                      kontakt@lockit.pl
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 shrink-0 text-primary" />
                    <span>
                      LOCKIT Self Storage
                      <br />
                      ul. Welecka 18
                      <br />
                      71-001 Szczecin
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Trust Badges */}
              <div className="rounded-lg border bg-muted/30 p-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <div>
                    <p className="font-semibold">
                      {isPolish ? 'Ponad 500 zadowolonych klientów' : 'Over 500 satisfied customers'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {isPolish
                        ? 'Zaufaj firmie z wieloletnim doświadczeniem'
                        : 'Trust a company with years of experience'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
