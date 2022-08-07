import { I18nContext } from './i18n.context';
import {
  CopiesKeys, getCopies
} from './copies/i18n.copies';
import {
  useCallback,
  useContext, useMemo
} from 'react';

const useI18n = () => {
  const context = useContext(I18nContext);

  const copies = useMemo(
    () => getCopies(context.favoriteLanguage.languageTag),
    [context.favoriteLanguage.languageTag]
  );

  const t = useCallback(
    (key: CopiesKeys) => copies[key],
    [copies]
  );

  return useMemo(() => ({
    ...context,
    t,
  }), [context, t]);
};

export default useI18n;
