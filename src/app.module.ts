import { Module } from '@nestjs/common';
import { CustomerModule } from './modules/customer/customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { HealthModule } from './modules/health/health.module';
import { ConfigurationModule } from './modules/configuration/configuration.module';
import { DBConfigurationService } from './modules/configuration/services/db-configuration.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoConfigurationService } from './modules/configuration/services/mongo-configuration.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigurationModule],
      inject: [DBConfigurationService],
      useFactory: (config: DBConfigurationService) => ({
        type: 'postgres',
        host: config.host,
        port: config.port,
        username: config.username,
        password: config.password,
        database: config.db,
        autoLoadEntities: true,
        migrations: [
          path.join(__dirname, './database/migrations/*.{ts,js}'),
          path.join(__dirname, './database/seeders/*.{ts,js}'),
        ],
        migrationsRun: true,
        migrationsTransactionMode: 'each',
        logging: false,
        namingStrategy: new SnakeNamingStrategy(),
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigurationModule],
      inject: [MongoConfigurationService],
      useFactory: (config: MongoConfigurationService) => ({
        uri: config.uri,
        auth: { username: config.username, password: config.password },
        authSource: config.authSource,
      }),
    }),
    CustomerModule,
    HealthModule,
    ConfigurationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
