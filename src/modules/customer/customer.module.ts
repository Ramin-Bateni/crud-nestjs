import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerOrmEntity } from './infrastructure/typeorm/customer.orm-entity';
import { CustomerRepository } from './infrastructure/typeorm/customer.repository';
import { CreateCustomerHandler } from './application/commands/handlers/create-customer.handler';
import { UpdateCustomerHandler } from './application/commands/handlers/update.customer.handler';
import { DeleteCustomerHandler } from './application/commands/handlers/delete-customer.handler';
import { GetCustomerHandler } from './application/queries/handlers/get-customer.handler';
import { GetCustomersHandler } from './application/queries/handlers/get-customers.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { CustomerController } from './presentation/controllers/customer.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerOrmEntity]), CqrsModule],
  controllers: [CustomerController],
  providers: [
    {
      provide: 'ICustomerRepository',
      useClass: CustomerRepository,
    },
    CreateCustomerHandler,
    UpdateCustomerHandler,
    DeleteCustomerHandler,
    GetCustomerHandler,
    GetCustomersHandler,
  ],
})
export class CustomerModule {}
