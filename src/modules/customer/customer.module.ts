import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { CreateCustomerHandler } from './handlers/create-customer.handler';
import { IsValidPhoneNumber } from './validators/phone.validator';
import { IsValidBankAccount } from './validators/bank-account.validator';
import { CustomerController } from './controller/customer.controller';
import { GetCustomerHandler } from './handlers/get-customer.handler';
import { FindCustomerHandler } from './handlers/find-customer.handler';
import { UpdateCustomerHandler } from './handlers/update-customer.handler';
import { DeleteCustomerHandler } from './handlers/delete-customer.handler';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerModel, CustomerModelSchema } from './models/customer.model';
import { CustomerCreatedHandler } from './handlers/customer-created.handler';
import { CustomerUpdatedHandler } from './handlers/customer-updated.handler';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([Customer]),
    MongooseModule.forFeature([
      { name: CustomerModel.name, schema: CustomerModelSchema },
    ]),
  ],
  controllers: [CustomerController],
  providers: [
    CreateCustomerHandler,
    GetCustomerHandler,
    FindCustomerHandler,
    UpdateCustomerHandler,
    DeleteCustomerHandler,
    CustomerCreatedHandler,
    CustomerUpdatedHandler,
    IsValidPhoneNumber,
    IsValidBankAccount,
  ],
})
export class CustomerModule {}
