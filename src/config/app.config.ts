import { registerAs } from '@nestjs/config';

export const appConfig = {
  port: parseInt(process.env.PORT, 10) || 3000,
};

export const appConfigFactory = registerAs('appConfig', () => appConfig);
