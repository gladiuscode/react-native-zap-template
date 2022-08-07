import { IThemeContext } from './theme.context';
import { useMemo } from 'react';
import useTheme from './useTheme';

const useStyles = <T>(stylesGenerator: (_: IThemeContext) => T) => {
  const context = useTheme();

  return useMemo(() => ({
    styles: stylesGenerator(context),
    ...context,
  }), [context, stylesGenerator]);
};

export default useStyles;
