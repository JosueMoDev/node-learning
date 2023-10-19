import 'dotenv/config';
import * as env from 'env-var';
interface ENVS {
  PORT: number;
  MAILER_MAIL: string;
  MAILER_SECRET_KEY: string;
  IS_PRODUCTION_MODE: boolean;
  MAILER_SERVICE: string;
  MONGO_URL: string;
  MONGO_DB_NAME: string;
  MONGO_USER_NAME: string;
  MONGO_PASS: string;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DB: string;
  POSTGRES_URL: string;
}
export const envs: ENVS = {
  PORT: env.get("PORT").required().asPortNumber(),
  MAILER_MAIL: env.get("MAILER_MAIL").required().asEmailString(),
  MAILER_SECRET_KEY: env.get("MAILER_SECRET_KEY").required().asString(),
  IS_PRODUCTION_MODE: env.get("IS_PRODUCTION_MODE").required().asBool(),
  MAILER_SERVICE: env.get("MAILER_SERVICE").required().asString(),

  // ? Mongo Envs
  MONGO_URL: env.get("MONGO_URL").required().asString(),
  MONGO_DB_NAME: env.get("MONGO_DB_NAME").required().asString(),
  MONGO_USER_NAME: env.get("MONGO_USER_NAME").required().asString(),
  MONGO_PASS: env.get("MONGO_PASS").required().asString(),

  // ? Postgres Envs
  POSTGRES_URL: env.get("POSTGRES_URL").required().asString(),
  POSTGRES_USER: env.get("POSTGRES_USER").required().asString(),
  POSTGRES_PASSWORD: env.get("POSTGRES_PASSWORD").required().asString(),
  POSTGRES_DB: env.get("POSTGRES_DB").required().asString(),
};