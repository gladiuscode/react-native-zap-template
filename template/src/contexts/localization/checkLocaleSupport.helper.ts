import { Locales } from './i18n.types';
import { languageTags } from './i18n.default';

export const checkLocaleSupport = (locale: string) => {
  const possibleSupportedLocale = locale as Locales;
  return languageTags.includes(possibleSupportedLocale);
};
