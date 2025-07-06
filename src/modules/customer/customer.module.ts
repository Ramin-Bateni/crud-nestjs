import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { CreateCustomerHandler } from './handlers/create-customer.handler';
import { IsValidPhoneNumber } from './validators/phone.validator';
import { IsValidBankAccount } from './validators/bank-account.validator';
import { CustomerController } from './controller/customer.controller';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Customer])],
  controllers: [CustomerController],
  providers: [CreateCustomerHandler, IsValidPhoneNumber, IsValidBankAccount],
})
export class CustomerModule {}
