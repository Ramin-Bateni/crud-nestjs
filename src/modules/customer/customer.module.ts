// src/modules/customer/customer.module.ts
import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
// Infrastructure layer
import { CustomerRepository } from "./infrastructure/repositories/customer.repository";
import { MongooseModule } from "@nestjs/mongoose";
import {
  Customer,
  CustomerSchema,
} from "./infrastructure/repositories/schemas/customer.schema";
// Application layer
import { CreateCustomerCommandHandler } from "./application/commands/impl/create-customer.command-handler";
import { CustomerService } from "./application/services/customer.service";
import { GetAllCustomersQueryHandler } from "./application/queries/impl/get-all-customers.query-handler";
import { GetCustomerByEmailQueryHandler } from "./application/queries/impl/get-customer-by-email.query-handler";
// Presentation layer
import { CustomerController } from "./presentation/customer.controller";
import { I_CUSTOMER_REPOSITORY } from "./domain/interfaces/customer-repository.interface";
import { UpdateCustomerCommandHandler } from "./application/commands/impl/update-customer.handler";
import { DeleteCustomerCommandHandler } from "./application/commands/impl/delete-customer.command-handler";

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
    ]),
  ],
  providers: [
    // query handlers
    GetAllCustomersQueryHandler,
    GetCustomerByEmailQueryHandler,
    // command handlers
    CreateCustomerCommandHandler,
    UpdateCustomerCommandHandler,
    DeleteCustomerCommandHandler,
    // other providers
    CustomerRepository,
    CustomerService,
    {
      provide: I_CUSTOMER_REPOSITORY,
      useClass: CustomerRepository,
    },
  ],
  exports: [CustomerService, CustomerRepository],
  controllers: [CustomerController],
})
export class CustomerModule {}
