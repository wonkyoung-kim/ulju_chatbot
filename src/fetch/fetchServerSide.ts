'use server';

import axios, { AxiosRequestConfig, HttpStatusCode, AxiosInstance, isAxiosError, AxiosResponse } from 'axios';

import { getPino } from 'common/logging';

interface Response<RESPONSE_DATA> {
  data: RESPONSE_DATA | null;
  status: number;
  message: string;
}

async function fetchWithNoData<RESPONSE_DATA>(
  method: string,
  url: string,
  config?: AxiosRequestConfig,
): Promise<Response<RESPONSE_DATA>> {
  let instance: AxiosInstance;
  instance = axios.create();

  const pino = await getPino();
  const logger = pino.child({ file: 'fetchServerSide.ts: fetchWithNoData' });
  logger.trace({ url, method, config }, 'fetchWithNoData - request');

  try {
    let response: AxiosResponse<RESPONSE_DATA>;
    if (method === 'get') {
      response = await instance.get<RESPONSE_DATA>(url, config);
      logger.trace(
        { status: response.status, statusText: response.statusText, headers: response.headers, all_response: response },
        'response',
      );
      return { data: response.data, status: response.status, message: response.statusText };
    } else if (method === 'delete') {
      response = await instance.delete<RESPONSE_DATA>(url, config);
      logger.trace({ status: response.status, statusText: response.statusText, headers: response.headers, all_response: response }, 'response');
      return { data: response.data, status: response.status, message: response.statusText };
    }
    return { data: null, status: -1, message: '' };
  } catch (ex) {
    if (isAxiosError<RESPONSE_DATA>(ex)) {
      if (ex.response !== null && ex.response !== undefined) {
        if (ex.response.status === HttpStatusCode.Unauthorized) {
          const resultCode = ex.response.data as { code: number };
          if (resultCode.code !== 200) {
            logger.trace({ status: resultCode.code, message: `fetchWithNoData Error error: ${ex.message}` }, 'axios error');
            return { data: null, status: resultCode.code, message: `fetchWithNoData Error error: ${ex.message}` };
          }
        }
      }
      logger.trace(
        {
          data: ex.response !== undefined ? ex.response.data : null,
          status: ex.response !== undefined ? ex.response.status : -1,
          message: ex.response !== undefined ? ex.response.statusText : '',
        },
        'axios error',
      );
      return {
        data: ex.response !== undefined ? ex.response.data : null,
        status: ex.response !== undefined ? ex.response.status : -1,
        message: ex.response !== undefined ? ex.response.statusText : '',
      };
    } else if (ex instanceof Error) {
      logger.trace({ message: ex.message }, 'Error');
      return { data: null, status: -1, message: ex.message };
    } else {
      logger.trace({}, 'Unknown Error');
      return { data: null, status: -1, message: '' };
    }
  }
}

async function fetchWithData<RESPONSE_DATA, REQUEST_BODY>(
  method: string,
  url: string,
  data?: REQUEST_BODY,
  config?: AxiosRequestConfig,
): Promise<Response<RESPONSE_DATA>> {
  let instance: AxiosInstance;
  instance = axios.create();

  const pino = await getPino();
  const logger = pino.child({ file: 'fetchServerSide.ts: fetchWithData' });
  logger.trace({ url, method, config }, 'request');

  try {
    let res;
    if (method === 'post') {
      res = await instance.post<RESPONSE_DATA>(url, data, config);
    } else if (method === 'put') {
      res = await instance.put<RESPONSE_DATA>(url, data, config);
    } else if (method === 'patch') {
      res = await instance.patch<RESPONSE_DATA>(url, data, config);
    } 
    logger.trace({ status: res?.status, statusText: res?.statusText, headers: res?.headers }, 'response');
    return {
      data: res !== undefined ? res.data : null,
      status: res !== undefined ? res.status : -1,
      message: res !== undefined ? res.statusText : '',
    };
  } catch (ex) {
    if (isAxiosError<RESPONSE_DATA>(ex)) {
      if (ex.response !== null && ex.response !== undefined) {
        if (ex.response.status === HttpStatusCode.Unauthorized) {
          const resultCode = ex.response.data as { code: number };
          if (resultCode.code !== 200) {
            logger.trace({ status: resultCode.code, message: `fetchWithData Error error: ${ex.message}` }, 'axios error');
            return { data: null, status: resultCode.code, message: `fetchWithData Error error: ${ex.message}` };
          }
        }
      }
      logger.trace(
        {
          data: ex.response !== undefined ? ex.response.data : null,
          status: ex.response !== undefined ? ex.response.status : -1,
          message: ex.response !== undefined ? ex.response.statusText : '',
        },
        'axios error',
      );
      return {
        data: ex.response !== undefined ? ex.response.data : null,
        status: ex.response !== undefined ? ex.response.status : -1,
        message: ex.response !== undefined ? ex.response.statusText : '',
      };
    } else if (ex instanceof Error) {
      logger.trace({ message: ex.message }, 'Error');
      return { data: null, status: -1, message: ex.message };
    } else {
      logger.trace({}, 'Unknown Error');
      return { data: null, status: -1, message: '' };
    }
  }
}


export { fetchWithNoData, fetchWithData };
