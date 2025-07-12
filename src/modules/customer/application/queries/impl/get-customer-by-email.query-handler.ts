import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { GetCustomerByEmailQuery } from "./get-customer-by-email.query";
import {
  I_CUSTOMER_REPOSITORY,
  ICustomerRepository,
} from "@/modules/customer/domain/interfaces/customer-repository.interface";
import { Customer as DomainCustomer } from "@/modules/customer/domain/customer.entity";

@QueryHandler(GetCustomerByEmailQuery)
export class GetCustomerByEmailQueryHandler
  implements IQueryHandler<GetCustomerByEmailQuery>
{
  constructor(
    @Inject(I_CUSTOMER_REPOSITORY)
    private readonly repo: ICustomerRepository
  ) {}

  async execute(
    query: GetCustomerByEmailQuery
  ): Promise<DomainCustomer | null> {
    return await this.repo.findByEmail(query.email);
  }
}
