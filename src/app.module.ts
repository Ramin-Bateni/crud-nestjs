import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerModule } from './customer/infrastructure/module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: () => {
        return {
          uri: process.env.MONGODB_URI,
        };
      },
      connectionName: process.env.DATABASE_NAME || 'nestjs_db',
    }),
    CustomerModule,
  ],
})
export class AppModule {}
