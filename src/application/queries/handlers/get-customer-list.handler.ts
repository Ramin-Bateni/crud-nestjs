import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCustomerListQuery } from '../impl/get-customer-list.query';
import { Inject } from '@nestjs/common';
import { Customer } from 'src/core/domain/customer.entity';
import { ICustomerRepository } from 'src/core/repositories/customer.repository.interface';
import { CustomerResponseDto } from 'src/interfaces/rest/dto/customer.dto';

@QueryHandler(GetCustomerListQuery)
export class GetCustomerListHandler implements IQueryHandler<GetCustomerListQuery> {
  constructor(
    @Inject('ICustomerRepository') private readonly repository: ICustomerRepository
  ) {}

  async execute(query: GetCustomerListQuery): Promise<{
    data: CustomerResponseDto[];
    total: number;
  }> {
    const [customers, total] = await this.repository.findAll(
      query.filters,
      query.pagination
    );

    return {
      data: customers.map(customer => this.mapToDto(customer)),
      total
    };
  }

  private mapToDto(customer: Customer): CustomerResponseDto {
    return {
        id: customer.id,
        fullName: `${customer.firstName} ${customer.lastName}`,
        email: customer.email,
        phone: customer.phone,
        dateOfBirth: customer.dateOfBirth.toISOString(),
        bankAccountNumber: customer.bankAccountNumber,
    };
  }
}