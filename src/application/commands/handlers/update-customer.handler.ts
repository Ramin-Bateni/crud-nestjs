import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { ICustomerRepository } from 'src/domain/repositories/customer.repository.interface';
import { Customer } from 'src/domain/entities/customer.entity';
import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { CustomerUpdatedEvent } from 'src/domain/events/customer-updated.event';
import { UpdateCustomerCommand } from 'src/application/commands/update-customer.command';

@CommandHandler(UpdateCustomerCommand)
export class UpdateCustomerHandler
  implements ICommandHandler<UpdateCustomerCommand>
{
  constructor(
    @Inject('ICustomerRepository')
    private readonly customerRepository: ICustomerRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateCustomerCommand): Promise<Customer> {
    const { id, customerDto } = command;

    const existingCustomer = await this.customerRepository.findById(id);
    if (!existingCustomer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    if (customerDto.email && customerDto.email !== existingCustomer.email) {
      try {
        const customerWithEmail = await this.customerRepository.findByEmail(
          customerDto.email,
        );
        if (customerWithEmail) {
          throw new BadRequestException('Email is already in use');
        }
      } catch (error) {
        if (error instanceof BadRequestException) {
          throw error;
        }
      }
    }

    if (
      (customerDto.firstName &&
        customerDto.firstName !== existingCustomer.firstName) ||
      (customerDto.lastName &&
        customerDto.lastName !== existingCustomer.lastName) ||
      (customerDto.dateOfBirth &&
        new Date(customerDto.dateOfBirth).getTime() !==
          existingCustomer.dateOfBirth.getTime())
    ) {
      const firstName = customerDto.firstName || existingCustomer.firstName;
      const lastName = customerDto.lastName || existingCustomer.lastName;
      const dateOfBirth = customerDto.dateOfBirth
        ? new Date(customerDto.dateOfBirth)
        : existingCustomer.dateOfBirth;

      try {
        const customerWithSameDetails =
          await this.customerRepository.findByNameAndDob(
            firstName,
            lastName,
            dateOfBirth,
          );

        if (customerWithSameDetails && customerWithSameDetails.id !== id) {
          throw new BadRequestException(
            'Customer with this name and date of birth already exists',
          );
        }
      } catch (error) {
        if (error instanceof BadRequestException) {
          throw error;
        }
      }
    }

    const customerUpdateData: Partial<Customer> = {
      ...customerDto,
      dateOfBirth: customerDto.dateOfBirth
        ? new Date(customerDto.dateOfBirth)
        : undefined,
    };

    const updatedCustomer = await this.customerRepository.update(
      id,
      customerUpdateData,
    );

    this.eventBus.publish(new CustomerUpdatedEvent(id, customerUpdateData));

    return updatedCustomer;
  }
}
