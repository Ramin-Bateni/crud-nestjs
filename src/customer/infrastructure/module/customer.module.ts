import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from 'src/customer/domain/models/entities';
import { ConfigModule } from '@nestjs/config';
import { CustomerMongoRepository } from 'src/customer/domain/services/repositories';
import { CustomerMongoFactory } from 'src/customer/domain/services/factories';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema }], process.env.DATABASE_NAME?.split('/').pop() || 'nestjs_db'),
  ],
  controllers: [],
  providers: [
    // Repository
    CustomerMongoRepository,
    // Factory
    CustomerMongoFactory,
  ],
  exports: [],
})
export class CustomerModule {} 