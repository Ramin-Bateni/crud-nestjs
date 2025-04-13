import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerOrmEntity } from './infrastructure/typeorm/customer.orm-entity';
import { CustomerRepository } from './infrastructure/typeorm/customer.repository';
import { CreateCustomerHandler } from './application/commands/handlers/create-customer.handler';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerOrmEntity]), CqrsModule],
  providers: [
    {
      provide: 'ICustomerRepository',
      useClass: CustomerRepository,
    },
    CreateCustomerHandler,
  ],
})
export class CustomerModule {}
