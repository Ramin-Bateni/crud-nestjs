// src/modules/customer/application/services/customer.service.ts
import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { GetAllCustomersQuery } from "../queries/impl/get-all-customers.query";
import { CreateCustomerCommand } from "../commands/impl/create-customer.command";
import { CreateCustomerRequestDto } from "../../presentation/dtos/create-customer-request.dto";
import { CustomerResponseDto } from "../../presentation/dtos/customer-response.dto";
import { Customer as DomainCustomer } from "../../domain/customer.entity";

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
    // Use queryBus
    const domainCustomers = await this.queryBus.execute<
      GetAllCustomersQuery,
      DomainCustomer[]
    >(new GetAllCustomersQuery());

    // Map domain object to dto
    const respDto = domainCustomers.map(
      (domainCustomer) => new CustomerResponseDto(domainCustomer)
    );

    return respDto;
  }

  /* ------------------------------------------------------------------
   * Write side – create customer via CommandBus
   * ------------------------------------------------------------------ */
  async create(dto: CreateCustomerRequestDto): Promise<CustomerResponseDto> {
    // Create customer command from dto
    const cmd = new CreateCustomerCommand(
      dto.firstName,
      dto.lastName,
      new Date(dto.dateOfBirth),
      dto.phoneNumber,
      dto.email,
      dto.bankAccountNumber
    );

    // Use commandBus
    const domainCustomer = await this.commandBus.execute<
      CreateCustomerCommand,
      DomainCustomer
    >(cmd);

    // Map domain object to dto
    const respDto = new CustomerResponseDto(domainCustomer);

    return respDto;
  }
}
