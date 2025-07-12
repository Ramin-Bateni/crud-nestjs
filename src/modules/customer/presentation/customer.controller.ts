import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Put,
  Param,
  Delete,
  NotFoundException,
} from "@nestjs/common";
import { CustomerService } from "../application/services/customer.service";
import { CustomerResponseDto } from "./dtos/customer.response.dto";
import { CreateCustomerRequestDto } from "./dtos/create-customer-request.dto";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { UpdateCustomerRequestDto } from "./dtos/update-customer.request.dto";
import { NotFoundError } from "rxjs";

@ApiTags("customers")
@Controller("customers")
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  /**
   * Create a new customer
   * @param body customer data
   * @returns an object contains email of the saved customer
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: "Customer created" })
  async create(
    @Body() reqDto: CreateCustomerRequestDto
  ): Promise<CustomerResponseDto> {
    const respDto = await this.customerService.create(reqDto);

    return respDto;
  }

  /**
   * Get all customers
   * @returns array of customers
   */
  @Get()
  async findAll(): Promise<CustomerResponseDto[]> {
    const customers = await this.customerService.findAll();

    return customers;
  }

  /**
   * Get a customer by email
   * @returns array of customers
   */
  @Get(":email")
  async findByEmail(
    @Param("email") email: string
  ): Promise<CustomerResponseDto> {
    const customers = await this.customerService.findByEmail(email);

    if (!customers) {
      throw new NotFoundException("Customer not found");
    }

    return customers;
  }

  /**
   * Update a customer by email
   * @param email customer email
   * @param dto customer data to update
   * @returns saved customer data
   */
  @Put(":email")
  @ApiOkResponse({ description: "Customer updated" })
  async update(
    @Param("email") email: string,
    @Body() dto: UpdateCustomerRequestDto
  ) {
    return await this.customerService.update(email, dto);
  }

  /**
   * Delete a customer by email
   * @param email customer email
   * @returns boolean: true, if delete was successful
   */
  @Delete(":email")
  @HttpCode(204)
  @ApiOkResponse({ description: "Customer deleted" })
  async remove(@Param("email") email: string) {
    return await this.customerService.delete(email);
  }
}
