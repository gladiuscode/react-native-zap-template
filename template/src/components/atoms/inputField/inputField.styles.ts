import { IThemeContext } from '../../../contexts/theme/theme.context';
import { StyleSheet } from 'react-native';

export const getInputFieldStyles =
  ({ colors }: IThemeContext) => StyleSheet.create(
    {
      textInput: {
        borderColor: colors.current.border,
        borderRadius: 8,
        borderWidth: 1,
        color: colors.current.text,
        minHeight: 35,
      }
    }
  );
