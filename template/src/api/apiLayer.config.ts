import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const axiosInstance = axios.create();

export type ApiLayerParams<RequestData> =
  Pick<
    AxiosRequestConfig<RequestData>,
    'method' | 'headers' | 'params' | 'data'
  > & {
  readonly url: NonNullable<AxiosRequestConfig<RequestData>['url']>;
}

const getHeaders = <RequestData>(params: ApiLayerParams<RequestData>):
  AxiosRequestConfig<RequestData>['headers'] => {
  const { method = 'get' } = params;
  const headers = params.headers ?? {};

  if (method.toLowerCase() === 'post') {
    return { ...headers, 'Content-Type': 'application/json', };
  }
  return headers;
};

const runApi = <ResponseData, RequestData>(
  layerParams: ApiLayerParams<RequestData>
): Promise<AxiosResponse<ResponseData, RequestData>> => {
  const headers = getHeaders(layerParams);

  const {
    url, method = 'get', params, data
  } = layerParams;

  const config: AxiosRequestConfig<RequestData> = {
    baseURL: 'https://www.google.com',
    data,
    headers,
    method,
    params,
    url,
  };

  return axiosInstance(config);
};

export default runApi;
