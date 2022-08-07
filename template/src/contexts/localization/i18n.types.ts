import {
  Locale,
  NumberFormatSettings,
  TemperatureUnit
} from 'react-native-localize';

export const IT_LOCALE = 'it-IT';
export const EN_US_LOCALE = 'en-US';

export type Locales = typeof IT_LOCALE | typeof EN_US_LOCALE;

export interface II18nContext {
  readonly favoriteLanguage: Pick<Locale, 'languageTag' | 'isRTL'>
  readonly numbersFormat: NumberFormatSettings;
  readonly favoriteCurrency: string;
  readonly temperatureUnit: TemperatureUnit;
  readonly timeZone: string;
}
