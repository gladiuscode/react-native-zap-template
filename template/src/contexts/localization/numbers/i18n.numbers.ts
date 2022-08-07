import { checkLocaleSupport } from '../checkLocaleSupport.helper';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import languages from 'numbro/dist/languages.min';
import numbro from 'numbro';
import {
  EN_US_LOCALE,
  Locales
} from '../i18n.types';

const getNumbroLanguage = (locale: Locales): numbro.NumbroLanguage => {
  const possibleNumbroLanguage = languages?.[locale];
  if (possibleNumbroLanguage) {
    return possibleNumbroLanguage;
  }

  const registeredLanguages = numbro.languages();
  const registeredLocales = Object.keys(registeredLanguages) as
      Array<keyof typeof registeredLanguages>;
  const firstRegisteredLocale = registeredLocales[0];
  return registeredLanguages[firstRegisteredLocale];
};

const checkRegistration = (locale: Locales) => {
  const registeredLanguages = numbro.languages();
  const registeredLocales = Object.keys(registeredLanguages) as
    Array<keyof typeof registeredLanguages>;
  return registeredLocales.includes(locale);
};

export const setNumbersLocale = (locale: string) => {
  const isSupported = checkLocaleSupport(locale);
  if (!isSupported) {
    return;
  }

  const possibleLocale = locale as Locales;
  const isRegistered = checkRegistration(possibleLocale);
  if (!isRegistered) {
    const language = getNumbroLanguage(possibleLocale);
    numbro.registerLanguage(language);
  }
  
  numbro.setLanguage(possibleLocale, EN_US_LOCALE);
};

export interface IFormatNumberOptions {
  readonly to: numbro.Format['output'];
}
export const formatNumber = (
  number: number,
  options: IFormatNumberOptions = { to: 'number' }
) => {
  return numbro(number).format({
    average: false,
    mantissa: 2,
    output: options.to,
    spaceSeparatedCurrency: true,
    thousandSeparated: true,
  });
};
