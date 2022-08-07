import { getInputFieldStyles } from './inputField.styles';
import useStyles from '../../../contexts/theme/useStyles';
import React, { memo } from 'react';
import {
  TextInput, TextInputProps
} from 'react-native';

type Props = Pick<TextInputProps, 'value' | 'placeholder' | 'onChangeText'>

const InputField = memo<Props>(({
  value, placeholder , onChangeText
}) => {
  const { styles, } = useStyles(getInputFieldStyles);

  return (
    <TextInput
      placeholder={placeholder}
      style={styles.textInput}
      value={value}
      onChangeText={onChangeText}
    />
  );
});
InputField.displayName = 'InputField';

export default InputField;
