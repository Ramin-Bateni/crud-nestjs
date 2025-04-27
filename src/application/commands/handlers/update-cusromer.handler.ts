import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCustomerCommand } from '../impl/update-customer.command';
import { Inject, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { ICustomerRepository } from 'src/core/repositories/customer.repository.interface';
import { PhoneValidator } from 'src/infrastructure/validation/phone.validator';

@CommandHandler(UpdateCustomerCommand)
export class UpdateCustomerHandler implements ICommandHandler<UpdateCustomerCommand> {
  constructor(
    @Inject('ICustomerRepository') private readonly repository: ICustomerRepository,
    private readonly phoneValidator: PhoneValidator
  ) {}

  async execute(command: UpdateCustomerCommand): Promise<void> {
    const existingCustomer = await this.repository.findById(command.id);
    if (!existingCustomer) {
      throw new NotFoundException(`Customer ${command.id} not found`);
    }

    if (command.firstName !== undefined) {
      existingCustomer.firstName = command.firstName;
    }

    if (command.lastName !== undefined) {
      existingCustomer.lastName = command.lastName;
    }

    if (command.bankAccountNumber !== undefined) {
      existingCustomer.bankAccountNumber = command.bankAccountNumber;
    }

    if (command.phone) {
      const validation = this.phoneValidator.validate(command.phone);
      if (!validation.isValid) {
        throw new BadRequestException(validation.error);
      }
      existingCustomer.updatePhoneNumber(validation.normalizedNumber!);
    }

    if (command.email) {
      const emailExists = await this.repository.existsByEmail(command.email);
      if (emailExists && existingCustomer.email !== command.email) {
        throw new ConflictException('Email already in use');
      }
      existingCustomer.updateEmail(command.email);
    }

    await this.repository.save(existingCustomer);
  }
}