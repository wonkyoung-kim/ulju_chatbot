import pino from 'pino';

import getLoggingLevel from './actions/logging.action';

const serverPino = pino({
  level: 'silent',
  base: {
    env: process.env.NODE_ENV,
  },
});

export async function getPino() {
  const level = await getLoggingLevel();
  serverPino.level = level ?? 'silent';
  return serverPino;
}

export const browserPino = pino({
  level: process.env.NEXT_PUBLIC_LOGGING_LEVEL,
  browser: { asObject: true },
});
