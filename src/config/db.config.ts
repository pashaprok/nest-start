import { registerAs } from '@nestjs/config';

export const dbConfig = {
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_USER_PASSWORD,
  database: process.env.DB_NAME,
};

export const dbConfigFactory = registerAs('dbConfig', () => dbConfig);
