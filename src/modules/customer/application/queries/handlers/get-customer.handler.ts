import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCustomerQuery } from '../get-customer.query';
import { ICustomerRepository } from '../../../domain/repositories/customer.repository.interface';
import { Inject, NotFoundException } from '@nestjs/common';
import { CustomerOrmEntity } from '../../../infrastructure/typeorm/customer.orm-entity';

@QueryHandler(GetCustomerQuery)
export class GetCustomerHandler implements IQueryHandler<GetCustomerQuery> {
  constructor(
    @Inject('ICustomerRepository')
    private readonly repository: ICustomerRepository,
  ) {}

  async execute(query: GetCustomerQuery): Promise<CustomerOrmEntity> {
    const { id } = query;

    const customer = await this.repository.findById(id);
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return customer;
  }
}
