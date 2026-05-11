import type { MetadataRoute } from 'next';

const baseUrl = 'https://lockit.pl';

// All pages from the sitemap (Phase 1)
const pages = [
  { url: '/', priority: 1.0, changeFrequency: 'weekly' as const },
  { url: '/rezerwacja', priority: 0.9, changeFrequency: 'weekly' as const },
  { url: '/boksy', priority: 0.9, changeFrequency: 'weekly' as const },
  { url: '/boksy/szczecin', priority: 0.8, changeFrequency: 'weekly' as const },
  { url: '/boksy/szczecin/boks-s', priority: 0.7, changeFrequency: 'monthly' as const },
  { url: '/boksy/szczecin/boks-m', priority: 0.7, changeFrequency: 'monthly' as const },
  { url: '/boksy/szczecin/boks-l', priority: 0.7, changeFrequency: 'monthly' as const },
  { url: '/lokalizacje', priority: 0.8, changeFrequency: 'monthly' as const },
  { url: '/self-storage-szczecin', priority: 0.9, changeFrequency: 'weekly' as const },
  { url: '/dla-klientow-indywidualnych', priority: 0.8, changeFrequency: 'monthly' as const },
  { url: '/dla-firm', priority: 0.8, changeFrequency: 'monthly' as const },
  { url: '/dla-sklepow-internetowych', priority: 0.7, changeFrequency: 'monthly' as const },
  { url: '/dla-firm-budowlanych', priority: 0.7, changeFrequency: 'monthly' as const },
  { url: '/remont-przeprowadzka', priority: 0.8, changeFrequency: 'monthly' as const },
  { url: '/archiwum-dokumentow', priority: 0.7, changeFrequency: 'monthly' as const },
  { url: '/dla-studentow', priority: 0.7, changeFrequency: 'monthly' as const },
  { url: '/transport-przeprowadzka', priority: 0.6, changeFrequency: 'monthly' as const },
  { url: '/ubezpieczenie', priority: 0.6, changeFrequency: 'monthly' as const },
  { url: '/pakowanie-organizacja', priority: 0.6, changeFrequency: 'monthly' as const },
  { url: '/poradnik', priority: 0.7, changeFrequency: 'weekly' as const },
  { url: '/poradnik/jak-wybrac-rozmiar-boksu', priority: 0.6, changeFrequency: 'monthly' as const },
  { url: '/poradnik/self-storage-dla-firm', priority: 0.6, changeFrequency: 'monthly' as const },
  { url: '/poradnik/przechowywanie-remont', priority: 0.6, changeFrequency: 'monthly' as const },
  { url: '/poradnik/archiwizacja-dokumentow', priority: 0.6, changeFrequency: 'monthly' as const },
  { url: '/o-nas', priority: 0.6, changeFrequency: 'monthly' as const },
  { url: '/faq', priority: 0.7, changeFrequency: 'monthly' as const },
  { url: '/kontakt', priority: 0.7, changeFrequency: 'monthly' as const },
  { url: '/polityka-prywatnosci', priority: 0.3, changeFrequency: 'yearly' as const },
  { url: '/ekspansja', priority: 0.5, changeFrequency: 'monthly' as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [];

  // Add Polish pages (default, no prefix needed in URL but we use /pl for consistency)
  pages.forEach((page) => {
    entries.push({
      url: `${baseUrl}${page.url === '/' ? '' : page.url}`,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: {
          pl: `${baseUrl}${page.url === '/' ? '' : page.url}`,
          en: `${baseUrl}/en${page.url === '/' ? '' : page.url}`,
        },
      },
    });
  });

  // Add English pages
  pages.forEach((page) => {
    entries.push({
      url: `${baseUrl}/en${page.url === '/' ? '' : page.url}`,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority * 0.9, // Slightly lower priority for EN version
      alternates: {
        languages: {
          pl: `${baseUrl}${page.url === '/' ? '' : page.url}`,
          en: `${baseUrl}/en${page.url === '/' ? '' : page.url}`,
        },
      },
    });
  });

  return entries;
}
