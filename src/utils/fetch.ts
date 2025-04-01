'use client';

import { AxiosRequestConfig } from 'axios';
import queryString from 'query-string';

import { getBaseURL } from 'common/actions/backendurl';
import {
  fetchWithNoDataClient,
  fetchWithDataClient,
} from 'fetch/fetchClientSide';

/**
 * HTTP client 기능을 하는 함수
 *
 * @param {string} url - 서버 주소는 설정에서 가져오기 때문에 Path와 Parameter만 전달
 * 
 * 참고 : https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_URL
 */

async function getMethod<ResponseData>(
  url: string,
  params: {} | null = null,
): Promise<ResponseData | null> {
 
  const baseURL = await getBaseURL();

  const queryParams = params ? '?' + queryString.stringify(params, { arrayFormat: 'comma' }) : '';

  const endpoint = `${baseURL}${url}${queryParams}`;

  const response = await fetchWithNoDataClient<ResponseData>('get', endpoint);
  return response;
}

/**
 * HTTP client 기능을 하는 함수
 *
 * @param {string} url - 서버 주소는 설정에서 가져오기 때문에 Path와 Parameter만 전달
 * 
 * 참고 : https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_URL
 */
async function deleteMethod<ResponseData>(url: string, hasAccessToken = true): Promise<ResponseData | null> {

  const baseURL = await getBaseURL();
  const endpoint = `${baseURL}${url}`;
  const response = await fetchWithNoDataClient<ResponseData>('delete', endpoint);
  return response;
}


/**
 * HTTP client 기능을 하는 함수
 *
 * @param {string} url - 서버 주소는 설정에서 가져오기 때문에 Path와 Parameter만 전달
 * 
 * 참고 : https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_URL
 */
async function postMethod<ResponseData, ReqeustBody>(
  url: string,
  data: ReqeustBody,
): Promise<ResponseData | null> {

  const baseURL = await getBaseURL();
  const endpoint = `${baseURL}${url}`;
  const response = await fetchWithDataClient<ResponseData, ReqeustBody>('post', endpoint, data);
  return response;
}

/**
 * HTTP client 기능을 하는 함수
 *
 * @param {string} url - 서버 주소는 설정에서 가져오기 때문에 Path와 Parameter, Header 전달
 * 
 * 참고 : https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_URL
 */
async function postMethodWithHeader<ResponseData, ReqeustBody>(
  url: string,
  data: ReqeustBody,
  config: AxiosRequestConfig,
): Promise<ResponseData | null> {

  const baseURL = await getBaseURL();
  const endpoint = `${baseURL}${url}`;
  const response = await fetchWithDataClient<ResponseData, ReqeustBody>(
    'post',
    endpoint,
    data,
    config,
  );
  return response;
}

/**
 * HTTP client 기능을 하는 함수
 *
 * @param {string} url - 서버 주소는 설정에서 가져오기 때문에 Path와 Parameter만 전달
 * 
 * 참고 : https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_URL
 */
async function putMethod<ResponseData, ReqeustBody>(
  url: string,
  data: ReqeustBody,
): Promise<ResponseData | null> {

  const baseURL = await getBaseURL();
  const endpoint = `${baseURL}${url}`;
  const response = await fetchWithDataClient<ResponseData, ReqeustBody>('put', endpoint, data);
  return response;
}

/**
 * HTTP client 기능을 하는 함수
 *
 * @param {string} url - 서버 주소는 설정에서 가져오기 때문에 Path와 Parameter만 전달
 * 
 * 참고 : https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_URL
 */
async function patchMethod<ResponseData, ReqeustBody>(
  url: string,
  data: ReqeustBody,
): Promise<ResponseData | null> {

  const baseURL = await getBaseURL();
  const endpoint = `${baseURL}${url}`;
  const response = await fetchWithDataClient<ResponseData, ReqeustBody>('patch', endpoint, data);
  return response;
}


export {
  getMethod,
  deleteMethod,
  postMethod,
  putMethod,
  patchMethod,
  postMethodWithHeader,
};
