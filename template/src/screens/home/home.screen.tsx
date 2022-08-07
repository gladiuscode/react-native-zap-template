import InputField from '../../components/atoms/inputField/inputField.atom';
import { RootState } from '../../store/store.config';
import { getHomeStyles } from './home.styles';
import { setUsername } from '../../store/slices/user/user.slice';
import { useAppDispatch } from '../../store/useDispatch';
import useI18n from '../../contexts/localization/useI18n';
import useStyles from '../../contexts/theme/useStyles';
import {
  ConnectedProps, connect
} from 'react-redux';
import {
  MainScreens,
  MainStackNavigationProps
} from '../../navigation/stacks/main/main.types';
import React, { useCallback } from 'react';
import {
  Text, TextInputProps, TouchableOpacity, View
} from 'react-native';

type Props = MainStackNavigationProps<MainScreens.home>
  & ConnectedProps<typeof connector>;

const Home: React.FC<Props> = ({
  navigation , username
}) => {
  const dispatch = useAppDispatch();
  const { t } = useI18n();
  const { styles } = useStyles(getHomeStyles);

  const onPress = useCallback(() => {
    navigation.navigate(MainScreens.contacts);
  }, [navigation]);

  const onChangeText = useCallback<
    NonNullable<TextInputProps['onChangeText']>
  >((text) => {
    dispatch(setUsername(text));
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('zapTemplate')}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.link}>{t('goToContacts')}</Text>
      </TouchableOpacity>
      <InputField
        value={username}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const mapStateToProps = (state: RootState) =>
  ({ username: state.user.username, });
const connector = connect(mapStateToProps);
export default connector(Home);
