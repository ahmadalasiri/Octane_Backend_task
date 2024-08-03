import { config } from 'dotenv';
import { cleanEnv, num, str } from 'envalid';

if (process.env.NODE_ENV === 'testing') {
  config({ path: 'test.env' });
} else {
  config();
}

const validateEnv = cleanEnv(process.env, {
  PORT: num(),
  NODE_ENV: str(),

  DB_HOST: str(),
  DB_PORT: str(),
  DB_USER: str(),
  DB_PASSWORD: str(),
  DB_NAME: str(),

  FRONTEND_URL: str(),

  SALT_ROUNDS: num(),
  JWT_SECRET_KEY: str(),
  JWT_EXPIRATION: str(),
});

export default validateEnv;
