import { Metadata } from "next";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { locales, type Locale } from "@/lib/i18n/config";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

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

  return {
    title: isEn ? "Privacy Policy | LOCKIT Self Storage" : "Polityka prywatności | LOCKIT Self Storage",
    description: isEn
      ? "LOCKIT Self Storage privacy policy. Learn how we collect, use and protect your personal data."
      : "Polityka prywatności LOCKIT Self Storage. Dowiedz się jak zbieramy, używamy i chronimy Twoje dane osobowe.",
    alternates: {
      canonical: `https://lockit.pl/${locale === "pl" ? "" : "en/"}polityka-prywatnosci`,
      languages: { pl: "https://lockit.pl/polityka-prywatnosci", en: "https://lockit.pl/en/polityka-prywatnosci" },
    },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const isEn = locale === "en";

  return (
    <>
      <Navbar dict={dict} locale={locale} />
      <main className="min-h-screen bg-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-slate">
            <h1>{isEn ? "Privacy Policy" : "Polityka prywatności"}</h1>
            
            <p className="lead">
              {isEn
                ? "This Privacy Policy describes how LOCKIT Self Storage collects, uses and protects your personal data."
                : "Niniejsza Polityka Prywatności opisuje jak LOCKIT Self Storage zbiera, używa i chroni Twoje dane osobowe."}
            </p>

            <h2>{isEn ? "1. Data Controller" : "1. Administrator danych"}</h2>
            <p>
              {isEn
                ? "The data controller is LOCKIT Self Storage with its registered office at ul. Gdańska 14C, 70-661 Szczecin, Poland."
                : "Administratorem danych osobowych jest LOCKIT Self Storage z siedzibą przy ul. Gdańskiej 14C, 70-661 Szczecin."}
            </p>

            <h2>{isEn ? "2. Data We Collect" : "2. Jakie dane zbieramy"}</h2>
            <p>
              {isEn ? "We collect the following personal data:" : "Zbieramy następujące dane osobowe:"}
            </p>
            <ul>
              <li>{isEn ? "Name and surname" : "Imię i nazwisko"}</li>
              <li>{isEn ? "Email address" : "Adres e-mail"}</li>
              <li>{isEn ? "Phone number" : "Numer telefonu"}</li>
              <li>{isEn ? "Address" : "Adres zamieszkania"}</li>
              <li>{isEn ? "Company data (for business clients)" : "Dane firmy (dla klientów biznesowych)"}</li>
            </ul>

            <h2>{isEn ? "3. Purpose of Data Processing" : "3. Cel przetwarzania danych"}</h2>
            <p>
              {isEn ? "We process your data to:" : "Przetwarzamy Twoje dane w celu:"}
            </p>
            <ul>
              <li>{isEn ? "Provide storage rental services" : "Świadczenia usług wynajmu boksów magazynowych"}</li>
              <li>{isEn ? "Issue invoices and process payments" : "Wystawiania faktur i obsługi płatności"}</li>
              <li>{isEn ? "Communicate with you regarding services" : "Komunikacji w sprawach związanych z usługami"}</li>
              <li>{isEn ? "Send marketing communications (with consent)" : "Wysyłania informacji marketingowych (za zgodą)"}</li>
            </ul>

            <h2>{isEn ? "4. Data Retention" : "4. Okres przechowywania danych"}</h2>
            <p>
              {isEn
                ? "We retain your personal data for the duration of the contract and for a period of 5 years after its termination for tax and accounting purposes."
                : "Przechowujemy Twoje dane osobowe przez czas trwania umowy oraz przez okres 5 lat po jej zakończeniu dla celów podatkowych i księgowych."}
            </p>

            <h2>{isEn ? "5. Your Rights" : "5. Twoje prawa"}</h2>
            <p>
              {isEn ? "You have the right to:" : "Masz prawo do:"}
            </p>
            <ul>
              <li>{isEn ? "Access your personal data" : "Dostępu do swoich danych osobowych"}</li>
              <li>{isEn ? "Rectify incorrect data" : "Sprostowania nieprawidłowych danych"}</li>
              <li>{isEn ? "Delete your data" : "Usunięcia danych"}</li>
              <li>{isEn ? "Restrict processing" : "Ograniczenia przetwarzania"}</li>
              <li>{isEn ? "Data portability" : "Przenoszenia danych"}</li>
              <li>{isEn ? "Object to processing" : "Sprzeciwu wobec przetwarzania"}</li>
            </ul>

            <h2>{isEn ? "6. Cookies" : "6. Pliki cookies"}</h2>
            <p>
              {isEn
                ? "Our website uses cookies to improve user experience and analyze traffic. You can manage cookie settings in your browser."
                : "Nasza strona używa plików cookies w celu poprawy doświadczenia użytkownika i analizy ruchu. Możesz zarządzać ustawieniami cookies w przeglądarce."}
            </p>

            <h2>{isEn ? "7. Contact" : "7. Kontakt"}</h2>
            <p>
              {isEn
                ? "For questions about this Privacy Policy or to exercise your rights, contact us at:"
                : "W przypadku pytań dotyczących niniejszej Polityki Prywatności lub realizacji swoich praw, skontaktuj się z nami:"}
            </p>
            <p>
              E-mail: <a href="mailto:kontakt@lockit.pl">kontakt@lockit.pl</a><br />
              {isEn ? "Phone" : "Telefon"}: +48 123 456 789
            </p>

            <p className="text-sm text-muted-foreground mt-8">
              {isEn
                ? "Last updated: April 2026"
                : "Ostatnia aktualizacja: kwiecień 2026"}
            </p>
          </div>
        </div>
      </main>
      <Footer dict={dict} locale={locale} />
    </>
  );
}
