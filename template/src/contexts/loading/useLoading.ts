import { useContext } from 'react';
import { ILoadingContext, LoadingContext } from './loading.context';

const useLoading = (): ILoadingContext => {
  const {
    showLoader, addLoader, removeLoader
  } = useContext(LoadingContext);

  return {
    addLoader,
    removeLoader,
    showLoader,
  };
};

export default useLoading;
