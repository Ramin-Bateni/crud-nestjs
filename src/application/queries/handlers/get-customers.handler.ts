import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCustomersQuery } from 'src/application/queries/get-customers.query';
import { Customer } from 'src/domain/entities/customer.entity';
import { ICustomerRepository } from 'src/domain/repositories/customer.repository.interface';
import { Inject } from '@nestjs/common';

@QueryHandler(GetCustomersQuery)
export class GetCustomersHandler implements IQueryHandler<GetCustomersQuery> {
  constructor(
    @Inject('ICustomerRepository')
    private readonly customerRepository: ICustomerRepository,
  ) {}

  async execute(query: GetCustomersQuery): Promise<Customer[]> {
    return this.customerRepository.findAll();
  }
}
