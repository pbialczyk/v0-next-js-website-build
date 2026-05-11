import { type Locale } from './config';
import { pl, type Dictionary } from './dictionaries/pl';
import { en } from './dictionaries/en';

const dictionaries: Record<Locale, Dictionary> = {
  pl,
  en,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] || dictionaries.pl;
}

export type { Dictionary };
