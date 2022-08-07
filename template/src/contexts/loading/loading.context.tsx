import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, StyleSheet, } from 'react-native';
import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useMemo, useState
} from 'react';

export interface ILoadingContext {
  readonly showLoader: boolean;
  readonly addLoader: () => void;
  readonly removeLoader: () => void;
}

const defaultValue: ILoadingContext = {
  addLoader: () => {
    console.info('Default value not implemented');
  },
  removeLoader: () => {
    console.info('Default value not implemented');
  },
  showLoader: false,
};

export const LoadingContext = createContext(defaultValue);

const LoadingContainer: React.FC<PropsWithChildren> = ({ children }) => {
  const [loaders, setLoaders] = useState<number[]>([]);

  const showLoader = useMemo(() => Boolean(loaders.length), [loaders.length]);

  const addLoader = useCallback(() => {
    setLoaders(current => {
      const OFFSET = 1;
      const lastIndex = current.length - OFFSET;
      return [...current, lastIndex + OFFSET];
    });
  }, []);

  const removeLoader = useCallback(() => {
    setLoaders(current => {
      const START = 0;
      const OFFSET = 1;

      const lastIndex = current.length - OFFSET;
      return current.slice(START, lastIndex);
    });
  }, []);

  const value = useMemo<ILoadingContext>(() => ({
    addLoader,
    removeLoader,
    showLoader,
  }), [addLoader, removeLoader, showLoader]);

  return (
    <LoadingContext.Provider value={value}>
      {children}
      {showLoader && (
        <SafeAreaView style={styles.loaderContainer}>
          <ActivityIndicator size={'large'} />
        </SafeAreaView>
      )}
    </LoadingContext.Provider>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    height: '100%',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    zIndex: 2,
  }
});

export default LoadingContainer;
