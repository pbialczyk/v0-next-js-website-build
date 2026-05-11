import { Metadata } from "next"
import Link from "next/link"
import { getDictionary } from "@/lib/i18n/getDictionary"
import { locales, defaultLocale } from "@/lib/i18n/config"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, ArrowRight, Clock, Shield, Check } from "lucide-react"

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isPl = locale === "pl" || locale === defaultLocale

  return {
    title: isPl ? "Boksy i cennik — LOCKIT Self Storage" : "Storage Units & Pricing — LOCKIT Self Storage",
    description: isPl
      ? "Boksy magazynowe self storage. Wybierz lokalizację i rozmiar boksu. Ceny od 125 zł/mies. Wynajem online w 5 minut."
      : "Self storage units. Choose location and box size. Prices from 125 PLN/month. Online rental in 5 minutes.",
    alternates: {
      canonical: isPl ? "https://lockit.pl/boksy/" : "https://lockit.pl/en/boksy/",
      languages: {
        pl: "https://lockit.pl/boksy/",
        en: "https://lockit.pl/en/boksy/",
      },
    },
  }
}

export default async function BoksyPage({ params }: Props) {
  const { locale } = await params
  const dict = await getDictionary(locale)
  const isPl = locale === "pl" || locale === defaultLocale
  const basePath = locale === defaultLocale ? "" : `/${locale}`

  return (
    <main className="min-h-screen bg-background">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {isPl ? "Boksy i cennik" : "Storage Units & Pricing"}
            </h1>
            <p className="text-lg text-muted-foreground">
              {isPl
                ? "Wybierz lokalizację, aby zobaczyć dostępne boksy i ceny."
                : "Choose a location to see available units and prices."}
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="bg-primary text-primary-foreground">
                <div className="flex items-center justify-between">
                  <div>
                    <Badge variant="secondary" className="mb-2">
                      {isPl ? "Aktywna lokalizacja" : "Active Location"}
                    </Badge>
                    <CardTitle className="text-2xl">Szczecin</CardTitle>
                    <p className="text-primary-foreground/80 mt-1">ul. Gdańska 14C</p>
                  </div>
                  <MapPin className="w-12 h-12 text-primary-foreground/50" />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-4 mb-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{isPl ? "Dostęp 24/7" : "24/7 Access"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" />
                    <span>{isPl ? "Monitoring" : "Monitoring"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span>{isPl ? "Ubezpieczenie" : "Insurance"}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-6 text-center">
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="font-bold text-lg">Boks S</div>
                    <div className="text-sm text-muted-foreground">3 m²</div>
                    <div className="text-primary font-semibold">{isPl ? "od 125 zł" : "from 125 PLN"}</div>
                  </div>
                  <div className="p-3 bg-muted rounded-lg ring-2 ring-primary">
                    <div className="font-bold text-lg">Boks M</div>
                    <div className="text-sm text-muted-foreground">6 m²</div>
                    <div className="text-primary font-semibold">{isPl ? "od 175 zł" : "from 175 PLN"}</div>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="font-bold text-lg">Boks L</div>
                    <div className="text-sm text-muted-foreground">12 m²</div>
                    <div className="text-primary font-semibold">{isPl ? "od 250 zł" : "from 250 PLN"}</div>
                  </div>
                </div>

                <Button asChild className="w-full" size="lg">
                  <Link href={`${basePath}/boksy/szczecin/`}>
                    {isPl ? "Zobacz boksy i cennik" : "See units & pricing"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Future locations teaser */}
            <div className="mt-8 text-center">
              <p className="text-muted-foreground">
                {isPl ? "Więcej lokalizacji wkrótce..." : "More locations coming soon..."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
