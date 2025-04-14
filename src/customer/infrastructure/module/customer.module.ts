import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from '@/customer/domain/models/entities';
import { ConfigModule } from '@nestjs/config';
import { CustomerMongoRepository } from '@/customer/domain/services/repositories';
import { CustomerMongoFactory } from '@/customer/domain/services/factories';
import { CustomerUseCase } from '@/customer/application/use-cases/customer.use-case';
import { V1CustomerController } from '@/customer/presentation/controllers/v1';
import { CommandHandlers } from '@/customer/application/services/commands';
import { CqrsModule } from '@nestjs/cqrs';
import { CustomerValidator } from '@/common/validators/customer.validator';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema }], process.env.DATABASE_NAME?.split('/').pop() || 'nestjs_db'),
    CqrsModule,
  ],
  controllers: [V1CustomerController],
  providers: [
    // Repository
    CustomerMongoRepository,
    // Factory
    CustomerMongoFactory,
    // Use Case
    CustomerUseCase,
    // Handler
    ...CommandHandlers,
    // Validator
    CustomerValidator,
  ],
  exports: [CustomerUseCase],
})
export class CustomerModule {} 