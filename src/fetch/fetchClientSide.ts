'use client';

import { AxiosRequestConfig, HttpStatusCode } from 'axios';

import { addSearchText } from 'common/local-storage';
import {
  fetchWithData,
  fetchWithNoData,
} from 'fetch/fetchServerSide';

async function fetchWithNoDataClient<RESPONSE_DATA>(
  method: string,
  url: string,
  config?: AxiosRequestConfig,
): Promise<RESPONSE_DATA | null> {
  if (method === 'get' || method === 'delete') {
    const response = await fetchWithNoData<RESPONSE_DATA>(method, url, config);
    if (response.status === HttpStatusCode.Ok) {
      return response.data;
    }
  } else {
    return null;
  }
  return null;
}

async function fetchWithDataClient<RESPONSE_DATA, REQUEST_BODY>(
  method: string,
  url: string,
  data?: REQUEST_BODY,
  config?: AxiosRequestConfig,
): Promise<RESPONSE_DATA | null> {
  if (method === 'post' || method === 'put' || method === 'patch') {
    const response = await fetchWithData<RESPONSE_DATA, REQUEST_BODY>(method, url, data, config);
    if (response.status === HttpStatusCode.Ok) {
      return response.data;
    } else {
      return null;
    }
  } else {
    return null;
  }
}


export { fetchWithNoDataClient, fetchWithDataClient };
