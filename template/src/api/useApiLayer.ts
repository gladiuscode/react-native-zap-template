import { useCallback } from 'react';
import useLoading from '../contexts/loading/useLoading';
import runApi, { ApiLayerParams } from './apiLayer.config';

const useApiLayer = () => {
  const { addLoader, removeLoader } = useLoading();
  return useCallback(
    async <ResponseData, RequestData>(params: ApiLayerParams<RequestData>) => {
      try {
        addLoader();
        const response = await runApi<ResponseData, RequestData>(params);

        const KO_STATUS = 300;
        if (response.status >= KO_STATUS) {
          // TODO: HANDLE ERROR
          throw new Error('Something went wrong');
        }

        removeLoader();

        return response.data;
      } catch (error) {
        removeLoader();
      }
    },
    [addLoader, removeLoader]
  );
};

export default useApiLayer;
