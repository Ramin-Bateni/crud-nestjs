import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
} from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { CustomerService } from "../application/services/customer.service";
import { CreateCustomerCommand } from "@/modules/customer/application/commands/impl/create-customer.command";
import { CustomerResponseDto } from "./dtos/customer-response.dto";
import { CreateCustomerRequestDto } from "./dtos/create-customer-request.dto";
import { Customer as DomainCustomer } from "../domain/customer.entity";

@Controller("customers")
export class CustomerController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly customerService: CustomerService
  ) {}

  /**
   * Create a new customer
   * @param body customer data
   * @returns an object contains email of the saved customer
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() customerBody: CreateCustomerRequestDto
  ): Promise<CustomerResponseDto> {
    const createCommand = new CreateCustomerCommand(
      customerBody.firstName,
      customerBody.lastName,
      new Date(customerBody.dateOfBirth),
      customerBody.phoneNumber,
      customerBody.email,
      customerBody.bankAccountNumber
    );

    // Execute create command
    const createdCustomer = await this.commandBus.execute<
      CreateCustomerCommand,
      DomainCustomer
    >(createCommand);

    // Convert domain object to related dto
    const dto = new CustomerResponseDto(createdCustomer);

    return dto;
  }

  /**
   * Get all customers
   * @returns array of customers
   */
  @Get()
  async findAll(): Promise<CustomerResponseDto[]> {
    const domainCustomers = await this.customerService.findAll();
    const allCustomers = domainCustomers.map(
      (customer) => new CustomerResponseDto(customer)
    );

    return allCustomers;
  }
}
