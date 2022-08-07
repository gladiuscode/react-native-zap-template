import { checkLocaleSupport } from '../checkLocaleSupport.helper';
import en from './locales/en';
import it from './locales/it';
import {
  EN_US_LOCALE, IT_LOCALE, Locales
} from '../i18n.types';

export type CopiesKeys = keyof typeof en;

const availableCopies: Record<Locales, typeof en> = {
  [EN_US_LOCALE]: en,
  [IT_LOCALE]: it,
};

export const getCopies = (locale: string) => {
  const isSupported = checkLocaleSupport(locale);
  if (!isSupported) {
    return availableCopies[EN_US_LOCALE];
  }

  const possibleLocale = locale as Locales;
  return availableCopies[possibleLocale];
};
