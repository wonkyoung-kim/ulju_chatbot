'use server';
import { versionURI } from '../../constants/constant';

async function getBaseURL() {
  const baseURL = process.env.ULJUSAFE_BACKEND_API_URL + versionURI;
  return baseURL;
}

async function getUljusafeApiURL() {
  const UljusafeApiURL = process.env.ULJUSAFE_BACKEND_API_URL;
  return UljusafeApiURL;
}

export { getBaseURL, getUljusafeApiURL };
