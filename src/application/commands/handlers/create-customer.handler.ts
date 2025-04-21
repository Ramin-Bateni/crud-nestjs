import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateCustomerCommand } from '../create-customer.command';
import { ICustomerRepository } from 'src/domain/repositories/customer.repository.interface';
import { Customer } from 'src/domain/entities/customer.entity';
import { BadRequestException, Inject } from '@nestjs/common';
import { CustomerCreatedEvent } from 'src/domain/events/customer-created.event';

@CommandHandler(CreateCustomerCommand)
export class CreateCustomerHandler
  implements ICommandHandler<CreateCustomerCommand>
{
  constructor(
    @Inject('ICustomerRepository')
    private readonly customerRepository: ICustomerRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateCustomerCommand): Promise<Customer> {
    const { customerDto } = command;

    try {
      const existingCustomerByEmail = await this.customerRepository.findByEmail(
        customerDto.email,
      );
      if (existingCustomerByEmail) {
        throw new BadRequestException(
          'Customer with this email already exists',
        );
      }

      const dateOfBirth = new Date(customerDto.dateOfBirth);
      const existingCustomer = await this.customerRepository.findByNameAndDob(
        customerDto.firstName,
        customerDto.lastName,
        dateOfBirth,
      );

      if (existingCustomer) {
        throw new BadRequestException(
          'Customer with this name and date of birth already exists',
        );
      }
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
    }

    const customer = new Customer();
    customer.firstName = customerDto.firstName;
    customer.lastName = customerDto.lastName;
    customer.dateOfBirth = new Date(customerDto.dateOfBirth);
    customer.phoneNumber = customerDto.phoneNumber;
    customer.email = customerDto.email;
    customer.bankAccountNumber = customerDto.bankAccountNumber;

    const savedCustomer = await this.customerRepository.create(customer);

    this.eventBus.publish(new CustomerCreatedEvent(savedCustomer));

    return savedCustomer;
  }
}
