import { config } from 'dotenv';
config({ path: `.env` });
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { appConfig } from './config/app.config';

async function bootstrap() {
  // app init
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike('NestNotes', {
              prettyPrint: true,
            }),
          ),
        }),
      ],
    }),
  });
  // define server port
  const PORT = appConfig.port;

  // OpenApi init
  const swaggerConfig = new DocumentBuilder()
    .setTitle('NestStart')
    .setDescription('REST API Documentation')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(
    app,
    swaggerConfig,
  );
  SwaggerModule.setup('/api/docs', app, document);

  // listen application at defined port
  await app.listen(PORT);
  Logger.log(`API listening at http://localhost:${PORT}/`);
  Logger.log(`API docs at http://localhost:${PORT}/api/docs`);
}

// nest start
bootstrap();
