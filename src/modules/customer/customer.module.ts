import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CreateCustomerHandler } from "src/application/commands/handlers/create-customer.handler";
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