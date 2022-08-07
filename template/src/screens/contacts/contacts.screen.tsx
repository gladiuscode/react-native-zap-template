import { getContactsStyles } from './contacts.styles';
import useI18n from '../../contexts/localization/useI18n';
import useStyles from '../../contexts/theme/useStyles';
import {
  MainScreens,
  MainStackNavigationProps
} from '../../navigation/stacks/main/main.types';
import React, { useCallback } from 'react';
import {
  Text, TouchableOpacity, View
} from 'react-native';

type Props = MainStackNavigationProps<MainScreens.contacts>

const Contacts: React.FC<Props> = ({ navigation }) => {
  const { t } = useI18n();
  const { styles } = useStyles(getContactsStyles);

  const onPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('zapTemplate')}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.link}>{t('goBack')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Contacts;
