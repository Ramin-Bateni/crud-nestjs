import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { Customer } from 'src/core/domain/customer.entity';
import { GetCustomerQuery } from '../impl/get-customer.query';
import { ICustomerRepository } from 'src/core/repositories/customer.repository.interface';
import { CustomerResponseDto } from 'src/interfaces/rest/dto/customer.dto';

@QueryHandler(GetCustomerQuery)
export class GetCustomerHandler implements IQueryHandler<GetCustomerQuery> {
  constructor(
    @Inject('ICustomerRepository') private readonly repository: ICustomerRepository
  ) {}

  async execute(query: GetCustomerQuery): Promise<CustomerResponseDto|null> {
    const customer = await this.repository.findById(query.customerId);
    
    if (customer) {
        return customer ? this.mapToDto(customer) : null;
    }

    throw new NotFoundException('Customer not found')

}

  private mapToDto(domain: Customer): CustomerResponseDto {
    return {
      id: domain.id,
      fullName: `${domain.firstName} ${domain.lastName}`,
      email: domain.email,
      phone: domain.phone,
      dateOfBirth: new Date(domain.dateOfBirth).toISOString(),
      bankAccountNumber: domain.bankAccountNumber,
    };
  }
}