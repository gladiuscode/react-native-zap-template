import { checkLocaleSupport } from '../checkLocaleSupport.helper';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import {
  EN_US_LOCALE, IT_LOCALE, Locales
} from '../i18n.types';

dayjs.extend(localeData);
dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

export const setDatesTimeZone = (tz: string) => dayjs.tz.setDefault(tz);

export const setDatesLocale = (locale: string) => {
  const isSupported = checkLocaleSupport(locale);
  if (!isSupported) {
    return;
  }

  const possibleLocale = locale as Locales;
  const localesLoaders: Record<Locales, () => void> = {
    [EN_US_LOCALE]: () => import('dayjs/locale/en'),
    [IT_LOCALE]: () => import('dayjs/locale/it'),
  };
  localesLoaders[possibleLocale]();

  dayjs.locale(possibleLocale);
};

export const formatDate =
  (date: string | Date, options = {
    format: 'LLLL',
    iso8601: false,
    withTimeZone: false,
  }) => {
    if (options.iso8601) {
      return dayjs(date).format();
    }

    const baseFormattedDate = dayjs(date).format(options.format);
    if (!options.withTimeZone) {
      return baseFormattedDate;
    }

    const formatWithTimeZone = options.format.includes('Z')
      ? options.format
      : `${options.format} Z`;
    return dayjs(baseFormattedDate).tz().format(formatWithTimeZone);
  };
