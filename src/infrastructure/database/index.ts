import dotenv from 'dotenv';
import { Pool } from 'pg';

import env from '../../config/validateEnv';
import logger from '../../helpers/log';

dotenv.config();

let client: Pool;
export const pgClient = (): Pool => {
  if (!client) {
    client = new Pool({
      host: env.DB_HOST,
      port: parseInt(`${env.DB_PORT}`),
      user: env.DB_USER,
      password: env.DB_PASSWORD,
      database: env.DB_NAME,
    });

    client.on('error', err => {
      console.error('Unexpected error on idle client', err);
      process.exit(-1);
    });

    client.on('connect', () => {
      logger.info(`Database Connected ✌️ ${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`);
    });
  }
  return client;
};
