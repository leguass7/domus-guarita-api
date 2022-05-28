import 'dotenv/config';
import { resolve } from 'path';

export type NodeEnv = 'development' | 'production' | 'testing';

export const env = {
  PORT: Number(process.env.PORT) || 3333,
  // SECRETS
  APP_SECRET: process.env.APP_SECRET,

  // DATABASE
  DB_URL: process.env.DB_URL,
  DB_SLAVE_URL: process.env.DB_SLAVE_URL,

  // WEB PROXY
  VIRTUAL_HOST: process.env?.VIRTUAL_HOST || '',
};

export const httpPort = env.PORT;
export const nodeEnv = (process.env.NODE_ENV || 'production') as NodeEnv;
export const isDevMode = !!(nodeEnv !== 'production');

export const rootDir = resolve(__dirname, '../..');
