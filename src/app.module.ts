import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './customer/customer.module';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './config.service';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available globally
      envFilePath: '.env', // Path to .env file
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: AppConfigService) => ({
        type: 'postgres',
        host: configService.dbHost,
        port: configService.dbPort,
        username: configService.dbUsername,
        password: configService.dbPassword,
        database: configService.dbDatabase,
        // entities: [__dirname + '/**/*.entity{.ts,.js}'],
        entities: [join(__dirname, '..', '..', '/**/*.entity{.ts,.js}')],
        synchronize: false, // Set to false in production
      }),
      inject: [AppConfigService],
    }),
    CustomerModule,
  ],
})
export class AppModule {}
