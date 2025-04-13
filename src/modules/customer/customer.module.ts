import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerOrmEntity } from './infrastructure/typeorm/customer.orm-entity';
import { CustomerRepository } from './infrastructure/typeorm/customer.repository';
import { CreateCustomerHandler } from './application/commands/handlers/create-customer.handler';
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
  ],
})
export class CustomerModule {}
