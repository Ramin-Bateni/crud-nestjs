import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CreateCustomerHandler } from "src/application/commands/handlers/create-customer.handler";
import { DeleteCustomerHandler } from "src/application/commands/handlers/delete-customer.handler";
import { UpdateCustomerHandler } from "src/application/commands/handlers/update-cusromer.handler";
import { GetCustomerListHandler } from "src/application/queries/handlers/get-customer-list.handler";
import { GetCustomerHandler } from "src/application/queries/handlers/get-customer.handler";
import { CustomerValidator } from "src/core/services/customer.validator.service";
import { CustomerOrmEntity } from "src/infrastructure/persistence/entities/customer.typeorm.entity";
import { CustomerTypeOrmRepository } from "src/infrastructure/persistence/repositories/customer.typeorm.repository";
import { PhoneValidator } from "src/infrastructure/validation/phone.validator";
import { CustomerController } from "src/interfaces/rest/controllers/customer.controller";

@Module({
    imports: [
      CqrsModule,
      TypeOrmModule.forFeature([CustomerOrmEntity]),
    ],
    controllers: [CustomerController],
    providers: [
      CreateCustomerHandler,
      DeleteCustomerHandler,
      UpdateCustomerHandler,
      GetCustomerListHandler,
      GetCustomerHandler,
      {
        provide: 'ICustomerRepository',
        useClass: CustomerTypeOrmRepository,
      },
      CustomerValidator,
      PhoneValidator,
    ],
  })
  export class CustomerModule {}