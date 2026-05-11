export const locales = ['pl', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'pl';

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
