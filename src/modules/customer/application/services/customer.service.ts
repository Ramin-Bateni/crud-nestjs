// src/modules/customer/application/services/customer.service.ts
import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { GetAllCustomersQuery } from "../queries/impl/get-all-customers.query";
import { CreateCustomerCommand } from "../commands/impl/create-customer.command";
import { CreateCustomerRequestDto } from "../../presentation/dtos/create-customer-request.dto";
import { CustomerResponseDto } from "../../presentation/dtos/customer.response.dto";
import { Customer as DomainCustomer } from "../../domain/customer.entity";
import { UpdateCustomerCommand } from "../commands/impl/update-customer.command";
import { DeleteCustomerCommand } from "../commands/impl/delete-customer.command";
import { UpdateCustomerRequestDto } from "../../presentation/dtos/update-customer.request.dto";
import { GetCustomerByEmailQuery } from "../queries/impl/get-customer-by-email.query";

@Injectable()
export class CustomerService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  /**
   * fetch all customers via QueryBus
   * @returns customers array
   */
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

  /**
   * fetch all customers via QueryBus
   * @returns customers array
   */
  async findByEmail(email: string): Promise<CustomerResponseDto | null> {
    // Use queryBus
    const domainCustomer = await this.queryBus.execute<
      GetCustomerByEmailQuery,
      DomainCustomer | null
    >(new GetCustomerByEmailQuery(email));

    // Map domain object to dto
    const respDto =
      domainCustomer == null ? null : new CustomerResponseDto(domainCustomer);

    return respDto;
  }

  /**
   * Create a new customer
   * @param dto new customer data
   * @returns created customer
   */
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

  /**
   * Update a customer
   * @param email customer email
   * @param dto customer data to change
   * @returns
   */
  async update(
    email: string,
    dto: UpdateCustomerRequestDto
  ): Promise<CustomerResponseDto> {
    const domainCustomer = await this.commandBus.execute(
      new UpdateCustomerCommand(email, dto)
    );

    // Map domain object to dto
    const respDto = new CustomerResponseDto(domainCustomer);

    return respDto;
  }

  /**
   * Delete a customer
   * @param email customer email
   * @returns
   */
  async delete(email: string): Promise<boolean> {
    return await this.commandBus.execute(new DeleteCustomerCommand(email));
  }
}
