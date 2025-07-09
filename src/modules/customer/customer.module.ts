// src/modules/customer/customer.module.ts
import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { CustomerController } from "./presentation/customer.controller";
import { CreateCustomerCommandHandler } from "./application/commands/impl/create-customer.command-handler";
import { CustomerService } from "./application/services/customer.service";
import { I_CUSTOMER_REPOSITORY } from "./application/interfaces/customer-repository.interface";
import { GetAllCustomersQueryHandler } from "./application/queries/impl/get-all-customers.query-handler";

@Module({
  providers: [
    CreateCustomerCommandHandler,
    GetAllCustomersQueryHandler,
    CustomerService,
    {
      provide: I_CUSTOMER_REPOSITORY,
      useValue: {
        create: async () => {}, // mock function to temporally have Green BDD before a real DB
      },
    },
  ],
  imports: [CqrsModule],
  controllers: [CustomerController],
})
export class CustomerModule {}
