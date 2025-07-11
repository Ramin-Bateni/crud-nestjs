// src/modules/customer/application/queries/handlers/get-all-customers-query.handler.ts
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { GetAllCustomersQuery } from "../impl/get-all-customers.query";
import { Customer } from "@/modules/customer/domain/customer.entity";
import {
  I_CUSTOMER_REPOSITORY,
  ICustomerRepository,
} from "../../../domain/interfaces/customer-repository.interface";

@QueryHandler(GetAllCustomersQuery)
export class GetAllCustomersQueryHandler
  implements IQueryHandler<GetAllCustomersQuery>
{
  /* ------------------------------------------------------------------
   * Inject the domain-level repository interface, not the service.
   * ------------------------------------------------------------------ */
  constructor(
    @Inject(I_CUSTOMER_REPOSITORY)
    private readonly repo: ICustomerRepository
  ) {}

  async execute(_query: GetAllCustomersQuery): Promise<Customer[]> {
    return this.repo.findAll(); // direct call to repository
  }
}
