import { Star } from 'lucide-react';
import type { Dictionary } from '@/lib/i18n/getDictionary';

interface ReviewsSectionProps {
  dict: Dictionary;
}

export default function ReviewsSection({ dict }: ReviewsSectionProps) {
  const t = dict;

  return (
    <section className="section-padding">
      <div className="container-wide mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-brand/10 text-brand px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Star className="w-4 h-4 fill-brand" />
            {t.reviews.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">{t.reviews.heading}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{t.reviews.sub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.reviews.items.slice(0, 3).map((review, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-6 shadow-sm border border-border"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-brand text-brand" />
                ))}
              </div>
              <p className="text-card-foreground leading-relaxed mb-6">&quot;{review.text}&quot;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gradient-brand flex items-center justify-center text-foreground font-bold text-sm">
                  {review.initials}
                </div>
                <div>
                  <div className="font-semibold text-card-foreground">{review.name}</div>
                  <div className="text-sm text-muted-foreground">{t.reviews.googleReview}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="https://www.google.com/maps/place/LOCKIT+self+storage/@53.4366128,14.5515612,17z/data=!4m8!3m7!1s0x47aa09e789ff7e27:0xd8b7c8c8c8c8c8c8!8m2!3d53.4366128!4d14.5541361!9m1!1b1!16s%2Fg%2F11t5p9zqvh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-brand font-semibold hover:underline"
          >
            {t.reviews.seeAll}
          </a>
        </div>
      </div>
    </section>
  );
}
