'use server';

export default async function getLoggingLevel() {
  const baseURL = process.env.LOGGING_LEVEL;
  return baseURL;
}
