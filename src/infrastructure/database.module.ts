import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from '../config/database/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: databaseConfig
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}