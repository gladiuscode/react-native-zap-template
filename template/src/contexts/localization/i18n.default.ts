import {
  EN_US_LOCALE,
  II18nContext,
  IT_LOCALE,
  Locales
} from './i18n.types';
import {
  findBestAvailableLanguage,
  getCurrencies,
  getNumberFormatSettings,
  getTemperatureUnit,
  getTimeZone
} from 'react-native-localize';

export const languageTags: Locales[] = [EN_US_LOCALE, IT_LOCALE];

const defaultFavoriteLanguage: II18nContext['favoriteLanguage'] = {
  isRTL: false,
  languageTag: EN_US_LOCALE,
};
export const defaultI18nValue: II18nContext = {
  favoriteCurrency: getCurrencies()[0],
  favoriteLanguage:
    findBestAvailableLanguage(languageTags) ?? defaultFavoriteLanguage,
  numbersFormat: getNumberFormatSettings(),
  temperatureUnit: getTemperatureUnit(),
  timeZone: getTimeZone(),
};
