import { Module } from '@nestjs/common';
import { CustomerModule } from './modules/customer/customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'task',
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
    CustomerModule,
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
