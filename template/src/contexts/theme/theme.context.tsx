import {
  Appearance, StyleSheet, useColorScheme
} from 'react-native';
import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useMemo, useState
} from 'react';

const defaultThemeType = Appearance.getColorScheme() ?? 'light';

const getColors = (selectedTheme: IThemeContext['type'] = defaultThemeType) => {
  const light = {
    backgroundColor: '#F9F2ED',
    blue: '#3AB0FF',
    border: '#a5a0a0',
    orange: '#FFB562',
    red: '#F87474',
    text: '#000000'
  };
  const dark: typeof light = {
    backgroundColor: '#2d2d2d',
    blue: '#80c2ff',
    border: '#a8a8a8',
    orange: '#fdc579',
    red: '#ff8d8d',
    text: '#FFFFFF'
  };
  const palettes = {
    dark,
    light,
  };

  return {
    current: palettes[selectedTheme],
    palettes,
  };
};

const getFonts = (colors: ReturnType<typeof getColors>) => {
  const selectedColors = colors.current;

  const weights = {
    bold: 'OpenSans-Bold',
    light: 'OpenSans-Light',
    medium: 'OpenSans-Medium',
    regular: 'OpenSans-Regular',
  };
  const sizes = {
    default: 16,
    h1: 31,
    h2: 27,
    h3: 22,
    h4: 20,
    h5: 18,
  };

  const styles = StyleSheet.create({
    default: {
      color: selectedColors.text,
      fontFamily: weights.regular,
      fontSize: sizes.default,
    },
    subTitle: {
      color: selectedColors.text,
      fontFamily: weights.medium,
      fontSize: sizes.h2,
    },
    title: {
      color: selectedColors.text,
      fontFamily: weights.medium,
      fontSize: sizes.h1,
    },
  });

  return {
    sizes,
    styles,
    weights,
  };
};

const getViews = () => {
  return StyleSheet.create({
    container: {
      paddingHorizontal: 12,
      paddingVertical: 10,
    }
  });
};

export interface IThemeContext {
  readonly type: 'light' | 'dark';
  readonly colors: ReturnType<typeof getColors>;
  readonly fonts: ReturnType<typeof getFonts>;
  readonly views: ReturnType<typeof getViews>;
}

const defaultValue: IThemeContext = {
  colors: getColors(),
  fonts: getFonts(getColors()),
  type: defaultThemeType,
  views: getViews(),
};

export const ThemeContext = createContext(defaultValue);

const ThemeContainer: React.FC<PropsWithChildren> = ({ children }) => {
  const userThemeType = useColorScheme();
  const [selectedTheme, setSelectedTheme] =
    useState<IThemeContext['type']>(userThemeType ?? 'light');

  useEffect(() => {
    if (!userThemeType) {
      return;
    }

    if (userThemeType === selectedTheme) {
      return;
    }

    setSelectedTheme(userThemeType);
  }, [selectedTheme, userThemeType]);

  const value = useMemo<IThemeContext>(
    () => {
      const colors = getColors(selectedTheme);
      const fonts = getFonts(colors);
      const views = getViews();
      return ({
        colors,
        fonts,
        type: selectedTheme,
        views,
      });
    },
    [selectedTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContainer;
