import { IThemeContext } from '../../contexts/theme/theme.context';
import { StyleSheet } from 'react-native';

export const getContactsStyles =
  ({
    colors, fonts, views
  }: IThemeContext) => StyleSheet.create(
    {
      container: {
        backgroundColor: colors.current.backgroundColor,
        flex: 1,
        ...views.container,
      },
      link: fonts.styles.default,
      title: fonts.styles.title,
    }
  );
