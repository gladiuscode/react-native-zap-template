import mainScreens from './main.screens';
import useTheme from '../../../contexts/theme/useTheme';
import {
  MainScreens, MainStackParamList
} from './main.types';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator
} from '@react-navigation/native-stack';
import React, {
  useMemo, useRef
} from 'react';

const MainStack: React.FC = () => {
  const { colors } = useTheme();

  const Stack = useRef(
    createNativeStackNavigator<MainStackParamList>()
  ).current;

  const screenOptions = useMemo<NativeStackNavigationOptions>(
    () => ({
      headerStyle: { backgroundColor: colors.current.backgroundColor },
      headerTitleStyle: { color: colors.current.text }
    }),
    [colors]
  );

  return (
    <Stack.Navigator
      initialRouteName={MainScreens.home}
      screenOptions={screenOptions}
    >
      {mainScreens.map(route =>
        <Stack.Screen
          component={route.component}
          key={route.name}
          name={route.name}
        />
      )}
    </Stack.Navigator>
  );
};

export default MainStack;
