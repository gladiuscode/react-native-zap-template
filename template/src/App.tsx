import I18nContainer from './contexts/localization/i18n.context';
import LoadingContainer from './contexts/loading/loading.context';
import MainStack from './navigation/stacks/main/main.stack';
import { NavigationContainer } from '@react-navigation/native';
import { NavigationContainerProps }
  from '@react-navigation/core/lib/typescript/src/types';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ThemeContainer from './contexts/theme/theme.context';
import store from './store/store.config';
import React, { useCallback } from 'react';

const App: React.FC = () => {

  const onStateChange = useCallback<
    NonNullable<NavigationContainerProps['onStateChange']>
  >((state) => {
    if (!state) {
      return;
    }

    const currentRoute = state.routes[state.index];
    if (!currentRoute) {
      return;
    }

    console.info('Current route: ', currentRoute.name);
  }, []);

  return (
    <Provider store={store}>
      <I18nContainer>
        <ThemeContainer>
          <SafeAreaProvider>
            <LoadingContainer>
              <NavigationContainer onStateChange={onStateChange}>
                <MainStack />
              </NavigationContainer>
            </LoadingContainer>
          </SafeAreaProvider>
        </ThemeContainer>
      </I18nContainer>
    </Provider>
  );
};

export default App;
