import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCustomerByIdQuery } from 'src/application/queries/get-customer-by-id.query';
import { Customer } from 'src/domain/entities/customer.entity';
import { ICustomerRepository } from 'src/domain/repositories/customer.repository.interface';
import { Inject, NotFoundException } from '@nestjs/common';

@QueryHandler(GetCustomerByIdQuery)
export class GetCustomerByIdHandler
  implements IQueryHandler<GetCustomerByIdQuery>
{
  constructor(
    @Inject('ICustomerRepository')
    private readonly customerRepository: ICustomerRepository,
  ) {}

  async execute(query: GetCustomerByIdQuery): Promise<Customer> {
    const { id } = query;
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    return customer;
  }
}
