import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAllCustomersQuery } from "../impl/get-all-customers.query";
import { Inject } from "@nestjs/common";
import { CustomerService } from "@/modules/customer/application/services/customer.service";

@QueryHandler(GetAllCustomersQuery)
export class GetAllCustomersQueryHandler
  implements IQueryHandler<GetAllCustomersQuery>
{
  constructor(
    @Inject(CustomerService)
    private readonly customerService: CustomerService
  ) {}

  async execute(query: GetAllCustomersQuery) {
    return this.customerService.findAll();
  }
}
