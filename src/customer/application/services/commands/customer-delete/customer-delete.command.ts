import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CustomerMongoRepository } from '../../../../domain/services/repositories';
import { localization, Validation } from 'src/common';
import { CustomerDeleteCommand } from './customer-delete.handler';
import { LocalizationMessage } from '@/customer/infrastructure/localization';
import { HttpStatus } from '@nestjs/common';

@CommandHandler(CustomerDeleteCommand)
export class CustomerDeleteHandler implements ICommandHandler<CustomerDeleteCommand> {
  constructor(
    private readonly customerMongoRepository: CustomerMongoRepository,
  ) {}

  async execute(command: CustomerDeleteCommand): Promise<boolean> {
    const lang = command.lang;
    const customerId = command.customerId;

    try {
      if (!Validation.IsMongoId(customerId)) {
        throw {
          ...localization.message(LocalizationMessage.VALIDATE_OBJECT_ID, { lang }, true, HttpStatus.BAD_REQUEST),
        };
      }
    } catch (error) {
      if (error?.response?.meta) throw error;
    }

    const existingCustomer = await this.customerMongoRepository.FindOne({
      _id: customerId,
    });

    if (!existingCustomer) {
      throw {
        ...localization.message(LocalizationMessage.CUSTOMER_NOT_FOUND, { lang }, true, HttpStatus.NOT_FOUND),
      };
    }

    await this.customerMongoRepository.DeleteById(customerId);
    return true;
  }
} 