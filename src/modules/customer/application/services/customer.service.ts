// src/modules/customer/application/services/customer.service.ts
import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { GetAllCustomersQuery } from "../queries/impl/get-all-customers.query";
import { CreateCustomerCommand } from "../commands/impl/create-customer.command";
import { CreateCustomerRequestDto } from "../../presentation/dtos/create-customer-request.dto";
import { CustomerResponseDto } from "../../presentation/dtos/customer-response.dto";

@Injectable()
export class CustomerService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  /* ------------------------------------------------------------------
   * Read side – fetch all customers via QueryBus
   * ------------------------------------------------------------------ */
  async findAll(): Promise<CustomerResponseDto[]> {
    return this.queryBus.execute(new GetAllCustomersQuery());
  }

  /* ------------------------------------------------------------------
   * Write side – create customer via CommandBus
   * ------------------------------------------------------------------ */
  async create(dto: CreateCustomerRequestDto): Promise<CustomerResponseDto> {
    const cmd = new CreateCustomerCommand(
      dto.firstName,
      dto.lastName,
      new Date(dto.dateOfBirth),
      dto.phoneNumber,
      dto.email,
      dto.bankAccountNumber
    );
    return this.commandBus.execute(cmd);
  }
}
