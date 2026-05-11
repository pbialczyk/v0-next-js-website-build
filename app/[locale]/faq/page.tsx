import { Metadata } from "next";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { locales, type Locale } from "@/lib/i18n/config";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/JsonLd";
import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";

  const title = isEn ? "FAQ | LOCKIT Self Storage Szczecin" : "FAQ | LOCKIT Self Storage Szczecin";
  const description = isEn
    ? "Frequently asked questions about LOCKIT Self Storage. Learn about pricing, access, security, and how to rent a storage unit in Szczecin."
    : "Najczęściej zadawane pytania o LOCKIT Self Storage. Dowiedz się o cenach, dostępie, bezpieczeństwie i jak wynająć boks w Szczecinie.";
  const url = `https://lockit.pl/${locale === "pl" ? "" : "en/"}faq`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { pl: "https://lockit.pl/faq", en: "https://lockit.pl/en/faq" },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'LOCKIT Self Storage',
      locale: isEn ? 'en_US' : 'pl_PL',
      type: 'website',
      images: [{ url: 'https://lockit.pl/og-image.jpg', width: 1200, height: 630, alt: 'LOCKIT Self Storage Szczecin' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://lockit.pl/og-image.jpg'],
    },
  };
}

const faqsPl = [
  { q: "Czym jest LOCKIT Self Storage?", a: "Jesteśmy szczecińską firmą specjalizującą się w wynajmie samoobsługowych boksów magazynowych. Pomagamy klientom indywidualnym i firmom przechowywać rzeczy w bezpiecznych, monitorowanych magazynach dostępnych 24/7." },
  { q: "Czy magazyny są bezpieczne?", a: "Bezpieczeństwo przechowywanych rzeczy jest dla nas najważniejsze. Każdy magazyn jest zabezpieczony przed dostępem osób nieupoważnionych. Monitoring i ochrona obiektu działają bez przerwy. Dodatkowo ubezpieczamy wszystko co jest magazynowane." },
  { q: "Jak wynająć magazyn?", a: "Umowę najmu zawrzesz online w 5 minut. Wybierasz boks, zakładasz konto, płacisz pierwszy czynsz i możesz od razu przywieźć swoje rzeczy. Zrezygnować możesz w każdym momencie." },
  { q: "Jak duży magazyn potrzebuję?", a: "Boks S (3 m²) — pokój studencki lub kawalerka. Boks M (6 m²) — mieszkanie do 50 m². Boks L (12 m²) — dom do 100 m² lub magazyn firmowy. Zawsze możesz zmienić rozmiar." },
  { q: "Co mogę przechować?", a: "Praktycznie wszystko — meble, sprzęt sportowy, dokumenty, towary firmowe, narzędzia. Nie przechowujemy jedynie broni, materiałów łatwopalnych, żywych organizmów i substancji niedozwolonych." },
  { q: "Jakie są godziny dostępu?", a: "Dostęp do Twojego boksu masz 24 godziny na dobę, 7 dni w tygodniu, 365 dni w roku. Wchodzisz gdy chcesz — nawet o 3 w nocy." },
  { q: "Czy mogę zmienić rozmiar boksu?", a: "Tak, w każdej chwili możesz zmienić rozmiar boksu — zwiększyć lub zmniejszyć w zależności od potrzeb. Skontaktuj się z nami, a pomożemy przenieść rzeczy." },
  { q: "Jaki jest minimalny okres najmu?", a: "Najem jest miesięczny i możesz zrezygnować w każdym momencie. Nie ma minimalnego okresu najmu ani długoterminowych zobowiązań." },
  { q: "Czy oferujecie transport?", a: "Tak, oferujemy usługi transportu i pomocy przy przeprowadzce. Możemy przewieźć Twoje rzeczy z dowolnego miejsca w Szczecinie do naszego magazynu. Skontaktuj się po wycenę." },
  { q: "Czy wystawiacie faktury VAT?", a: "Tak, wystawiamy faktury VAT dla firm. Koszty magazynowania możesz wliczyć w koszty działalności." },
];

const faqsEn = [
  { q: "What is LOCKIT Self Storage?", a: "We are a Szczecin-based company specializing in self-storage unit rental. We help individuals and businesses store their belongings in safe, monitored facilities available 24/7." },
  { q: "Are the storage units secure?", a: "Security is our top priority. Each unit is protected against unauthorized access. Monitoring and security operate 24/7. Additionally, we insure everything stored." },
  { q: "How do I rent a unit?", a: "You can sign the rental agreement online in 5 minutes. Choose a unit, create an account, pay the first month's rent and you can bring your items right away. Cancel anytime." },
  { q: "What size unit do I need?", a: "Box S (3 m²) — student room or studio apartment. Box M (6 m²) — apartment up to 50 m². Box L (12 m²) — house up to 100 m² or business storage. You can always change sizes." },
  { q: "What can I store?", a: "Almost anything — furniture, sports equipment, documents, business goods, tools. We don't store weapons, flammable materials, living organisms or prohibited substances." },
  { q: "What are the access hours?", a: "You have access to your unit 24 hours a day, 7 days a week, 365 days a year. Enter whenever you want — even at 3 AM." },
  { q: "Can I change my unit size?", a: "Yes, you can change your unit size anytime — increase or decrease based on your needs. Contact us and we'll help you move your belongings." },
  { q: "What is the minimum rental period?", a: "Rental is monthly and you can cancel anytime. There is no minimum rental period or long-term commitment." },
  { q: "Do you offer transport?", a: "Yes, we offer transport and moving assistance. We can move your belongings from anywhere in Szczecin to our facility. Contact us for a quote." },
  { q: "Do you issue VAT invoices?", a: "Yes, we issue VAT invoices for businesses. You can include storage costs as business expenses." },
];

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const isEn = locale === "en";

  const faqs = isEn ? faqsEn : faqsPl;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <Navbar dict={dict} locale={locale} />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="bg-gradient-to-b from-slate-100 to-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                {isEn ? "Frequently Asked Questions" : "Najczęściej zadawane pytania"}
              </h1>
              <p className="text-lg text-muted-foreground">
                {isEn
                  ? "Everything you need to know about LOCKIT Self Storage"
                  : "Wszystko co musisz wiedzieć o LOCKIT Self Storage"}
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="bg-card border rounded-xl px-6">
                    <AccordionTrigger className="text-left font-semibold hover:no-underline">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-slate-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {isEn ? "Still have questions?" : "Masz więcej pytań?"}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              {isEn
                ? "Contact us — we're happy to help"
                : "Skontaktuj się z nami — chętnie pomożemy"}
            </p>
            <Button asChild size="lg" className="bg-brand hover:bg-brand-dark text-white">
              <Link href={`/${locale}/kontakt`}>{dict.common.contactUs}</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer dict={dict} locale={locale} />
    </>
  );
}
