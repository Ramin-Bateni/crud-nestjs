import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
} from "@nestjs/common";
import { CustomerService } from "../application/services/customer.service";
import { CustomerResponseDto } from "./dtos/customer-response.dto";
import { CreateCustomerRequestDto } from "./dtos/create-customer-request.dto";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";

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
    const respDto = this.customerService.create(reqDto);

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
}
