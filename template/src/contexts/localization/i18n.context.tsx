import { II18nContext, } from './i18n.types';
import { checkLocaleSupport } from './checkLocaleSupport.helper';
import { setNumbersLocale } from './numbers/i18n.numbers';
import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import {
  addEventListener,
  findBestAvailableLanguage,
  getCurrencies,
  getTemperatureUnit,
  getTimeZone,
  removeEventListener
} from 'react-native-localize';
import {
  defaultI18nValue,
  languageTags
} from './i18n.default';
import {
  setDatesLocale,
  setDatesTimeZone
} from './dates/i18n.dates';

setDatesTimeZone(defaultI18nValue.timeZone);
setDatesLocale(defaultI18nValue.favoriteLanguage.languageTag);
setNumbersLocale(defaultI18nValue.favoriteLanguage.languageTag);

export const I18nContext = createContext(defaultI18nValue);

const I18nContainer: React.FC<PropsWithChildren> = ({ children }) => {
  const [language, setLanguage] =
    useState<II18nContext['favoriteLanguage'] >(
      defaultI18nValue.favoriteLanguage
    );
  const [timeZone, setTimeZone] =
    useState<II18nContext['timeZone']>(defaultI18nValue.timeZone);
  const [temperatureUnit, setTemperatureUnit] =
    useState<II18nContext['temperatureUnit']>(defaultI18nValue.temperatureUnit);
  const [currency, setCurrency] =
    useState<II18nContext['favoriteCurrency']>(
      defaultI18nValue.favoriteCurrency
    );

  // ** DATA ** //
  const value = useMemo<II18nContext>(
    () => ({
      ...defaultI18nValue,
      favoriteCurrency: currency,
      language,
      temperatureUnit,
      timeZone,
    }),
    [currency, language, temperatureUnit, timeZone]);

  // ** CALLBACKS ** //
  const onLanguageChange = useCallback(() => {
    const bestAvailableLanguage = findBestAvailableLanguage(languageTags);
    if (!bestAvailableLanguage) {
      return;
    }

    const isSupported = checkLocaleSupport(bestAvailableLanguage.languageTag);
    if (!isSupported) {
      return;
    }

    setLanguage(current => {
      if (current.languageTag === bestAvailableLanguage.languageTag) {
        return current;
      }

      setDatesLocale(bestAvailableLanguage.languageTag);
      setNumbersLocale(bestAvailableLanguage.languageTag);
      return bestAvailableLanguage;
    });
  }, []);

  const onTemperatureUnitChange = useCallback(() => {
    const favoriteTemperatureUnit = getTemperatureUnit();
    setTemperatureUnit(current => {
      if (current === favoriteTemperatureUnit) {
        return current;
      }
      return favoriteTemperatureUnit;
    });
  }, []);

  const onTimeZoneChange = useCallback(() => {
    const userTimeZone = getTimeZone();
    setTimeZone(current => {
      if (current === userTimeZone) {
        return current;
      }
      setDatesTimeZone(userTimeZone);
      return userTimeZone;
    });
  }, []);

  const onCurrencyChange = useCallback(() => {
    const userCurrency = getCurrencies()[0];
    setCurrency(current => {
      if (current === userCurrency) {
        return current;
      }
      return userCurrency;
    });
  }, []);

  const onLocalizationChange = useCallback(() => {
    onLanguageChange();
    onTemperatureUnitChange();
    onTimeZoneChange();
    onCurrencyChange();
  }, [
    onCurrencyChange,
    onLanguageChange,
    onTemperatureUnitChange,
    onTimeZoneChange
  ]);

  useEffect(() => {
    addEventListener('change', onLocalizationChange);
    return () => {
      removeEventListener('change', onLocalizationChange);
    };
  }, [onLocalizationChange]);

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
};

export default I18nContainer;
