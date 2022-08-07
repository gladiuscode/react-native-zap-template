import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '../../types';

export enum MainScreens {
  home = 'Home',
  contacts = 'Contacts',
}

export type MainStackParamList = {
  [MainScreens.home]: undefined,
  [MainScreens.contacts]: undefined,
}

export type MainScreen = Screen<MainScreens>

export type MainStackNavigationProps<T extends MainScreens> =
  NativeStackScreenProps<MainStackParamList, T>
