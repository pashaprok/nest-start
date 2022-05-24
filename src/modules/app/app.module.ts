import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { appConfigFactory } from '../../config/app.config';
import { dbConfig, dbConfigFactory } from '../../config/db.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfigFactory, dbConfigFactory],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: dbConfig.host,
      port: dbConfig.port,
      username: dbConfig.username,
      password: dbConfig.password,
      database: dbConfig.database,
      entities: [],
      synchronize: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
