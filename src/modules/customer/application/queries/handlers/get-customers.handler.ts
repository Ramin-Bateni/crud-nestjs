import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCustomersQuery } from '../get-customers.query';
import { ICustomerRepository } from '../../../domain/repositories/customer.repository.interface';
import { Inject } from '@nestjs/common';
import { CustomerOrmEntity } from '../../../infrastructure/typeorm/customer.orm-entity';

@QueryHandler(GetCustomersQuery)
export class GetCustomersHandler implements IQueryHandler<GetCustomersQuery> {
  constructor(
    @Inject('ICustomerRepository')
    private readonly repository: ICustomerRepository,
  ) {}

  async execute(): Promise<CustomerOrmEntity[]> {
    return this.repository.findAll();
  }
}
